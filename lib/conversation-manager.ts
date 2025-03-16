// Conversation state types
export type ConversationState = {
  stage: "greeting" | "loan_type" | "user_info" | "eligibility_check" | "financial_tips" | "general"
  loanType?: string
  userInfo?: {
    income?: number
    age?: number
    occupation?: string
    creditScore?: number
    existingLoans?: boolean
  }
  eligibilityResult?: {
    eligible: boolean
    maxAmount?: number
    interestRate?: number
    reason?: string
  }
}

// Initial conversation state
export const initialConversationState: ConversationState = {
  stage: "greeting",
}

// Get next prompt based on conversation state
export function getNextPrompt(state: ConversationState): string {
  switch (state.stage) {
    case "greeting":
      return "Hey, what can I help you with today?"

    case "loan_type":
      return "What type of loan are you interested in? For example: home loan, personal loan, student loan, auto loan, or business loan?"

    case "user_info":
      return `I'll help you check eligibility for a ${state.loanType}. To provide an accurate assessment, I need some information:
1. What's your monthly income?
2. What's your age?
3. What's your occupation?
4. Do you know your credit score? (Approximate is fine)
5. Do you have any existing loans?`

    case "eligibility_check":
      return "Thanks for providing your information. Let me check your eligibility..."

    case "financial_tips":
      const eligibility = state.eligibilityResult
      if (eligibility?.eligible) {
        return `Congratulations! Based on the information provided, you are eligible for a ${state.loanType} up to ₹${eligibility.maxAmount?.toLocaleString()}. The approximate interest rate would be ${eligibility.interestRate}%. Would you like some financial tips to improve your loan terms?`
      } else {
        return `Based on the information provided, you may not be eligible for a ${state.loanType} at this time. ${eligibility?.reason || ""} Would you like some financial tips to improve your eligibility?`
      }

    default:
      return "How else can I assist you today?"
  }
}

// Process user message and update conversation state
export function processUserMessage(message: string, currentState: ConversationState): ConversationState {
  const lowerMessage = message.toLowerCase()

  // Check for loan-related keywords
  if (
    currentState.stage === "greeting" &&
    (lowerMessage.includes("loan") ||
      lowerMessage.includes("borrow") ||
      lowerMessage.includes("finance") ||
      lowerMessage.includes("credit"))
  ) {
    return {
      ...currentState,
      stage: "loan_type",
    }
  }

  // Identify loan type
  if (currentState.stage === "loan_type") {
    let loanType = ""

    if (lowerMessage.includes("home") || lowerMessage.includes("house") || lowerMessage.includes("mortgage")) {
      loanType = "home loan"
    } else if (lowerMessage.includes("personal")) {
      loanType = "personal loan"
    } else if (lowerMessage.includes("student") || lowerMessage.includes("education")) {
      loanType = "student loan"
    } else if (lowerMessage.includes("auto") || lowerMessage.includes("car") || lowerMessage.includes("vehicle")) {
      loanType = "auto loan"
    } else if (lowerMessage.includes("business")) {
      loanType = "business loan"
    }

    if (loanType) {
      return {
        ...currentState,
        stage: "user_info",
        loanType,
      }
    }
  }

  // Extract user information
  if (currentState.stage === "user_info") {
    // This is a simplified version - in a real app, you'd use more sophisticated parsing
    const incomeMatch =
      message.match(/income.*?(\d[\d,]*)/i) ||
      message.match(/(\d[\d,]*).*?income/i) ||
      message.match(/(\d[\d,]*).*?month/i)
    const ageMatch = message.match(/age.*?(\d+)/i) || message.match(/(\d+).*?years? old/i)
    const occupationMatch =
      message.match(/occupation.*?:?\s*([a-zA-Z ]+)/i) || message.match(/(?:i am|i'm) (?:an?|the) ([a-zA-Z ]+)/i)
    const creditScoreMatch = message.match(/credit score.*?(\d+)/i) || message.match(/(\d+).*?credit score/i)
    const existingLoansMatch =
      message.match(/existing loans?.*?(yes|no)/i) || message.match(/(yes|no).*?existing loans?/i)

    const userInfo = {
      ...currentState.userInfo,
    }

    if (incomeMatch) {
      const incomeStr = incomeMatch[1].replace(/,/g, "")
      userInfo.income = Number.parseInt(incomeStr, 10)
    }

    if (ageMatch) {
      userInfo.age = Number.parseInt(ageMatch[1], 10)
    }

    if (occupationMatch) {
      userInfo.occupation = occupationMatch[1].trim()
    }

    if (creditScoreMatch) {
      userInfo.creditScore = Number.parseInt(creditScoreMatch[1], 10)
    }

    if (existingLoansMatch) {
      userInfo.existingLoans = existingLoansMatch[1].toLowerCase() === "yes"
    }

    // Check if we have enough information to proceed
    if (userInfo.income && userInfo.age && userInfo.occupation) {
      // If credit score is not provided, assume a moderate score
      if (!userInfo.creditScore) {
        userInfo.creditScore = 700
      }

      // If existing loans info is not provided, assume none
      if (userInfo.existingLoans === undefined) {
        userInfo.existingLoans = false
      }

      return {
        ...currentState,
        stage: "eligibility_check",
        userInfo,
      }
    }

    return {
      ...currentState,
      userInfo,
    }
  }

  // After eligibility check, move to financial tips
  if (currentState.stage === "eligibility_check") {
    const eligibilityResult = calculateLoanEligibility(currentState)

    return {
      ...currentState,
      stage: "financial_tips",
      eligibilityResult,
    }
  }

  // After financial tips, move to general conversation
  if (currentState.stage === "financial_tips") {
    return {
      ...currentState,
      stage: "general",
    }
  }

  return currentState
}

// Calculate loan eligibility based on user information
function calculateLoanEligibility(state: ConversationState): ConversationState["eligibilityResult"] {
  const { loanType, userInfo } = state

  if (!userInfo || !loanType) {
    return {
      eligible: false,
      reason: "Insufficient information provided.",
    }
  }

  const { income = 0, age = 0, creditScore = 0, occupation = "", existingLoans = false } = userInfo

  // Basic eligibility checks
  if (age < 21 || age > 65) {
    return {
      eligible: false,
      reason: "Age requirements not met. Most loans require applicants to be between 21 and 65 years old.",
    }
  }

  if (creditScore < 650) {
    return {
      eligible: false,
      reason: "Credit score is below the minimum requirement. Most lenders require a score of at least 650.",
    }
  }

  // Calculate maximum loan amount based on income (simplified)
  // In reality, this would be much more complex and consider many factors
  let maxLoanMultiplier = 0
  let interestRate = 0

  switch (loanType) {
    case "home loan":
      maxLoanMultiplier = 60 // 5 years of income
      interestRate = 7.5 + (existingLoans ? 0.5 : 0) + (creditScore < 700 ? 1 : 0)
      break

    case "personal loan":
      maxLoanMultiplier = 24 // 2 years of income
      interestRate = 12 + (existingLoans ? 1 : 0) + (creditScore < 700 ? 2 : 0)
      break

    case "student loan":
      maxLoanMultiplier = 36 // 3 years of income
      interestRate = 8 + (existingLoans ? 0.5 : 0) + (creditScore < 700 ? 1 : 0)
      break

    case "auto loan":
      maxLoanMultiplier = 18 // 1.5 years of income
      interestRate = 9 + (existingLoans ? 0.5 : 0) + (creditScore < 700 ? 1 : 0)
      break

    case "business loan":
      maxLoanMultiplier = 36 // 3 years of income
      interestRate = 11 + (existingLoans ? 1 : 0) + (creditScore < 700 ? 2 : 0)
      break

    default:
      maxLoanMultiplier = 24
      interestRate = 10
  }

  // Adjust based on occupation stability (simplified)
  const stableOccupations = ["government", "doctor", "engineer", "teacher", "professor", "banker"]
  const isStableOccupation = stableOccupations.some((o) => occupation.toLowerCase().includes(o))

  if (isStableOccupation) {
    maxLoanMultiplier += 12
    interestRate -= 0.5
  }

  // Calculate maximum loan amount
  const maxAmount = income * maxLoanMultiplier

  // Check if income is sufficient (simplified)
  const minimumIncome = 15000 // ₹15,000 per month

  if (income < minimumIncome) {
    return {
      eligible: false,
      reason: `Your income is below the minimum requirement of ₹${minimumIncome.toLocaleString()} per month for this loan type.`,
    }
  }

  return {
    eligible: true,
    maxAmount,
    interestRate: Number.parseFloat(interestRate.toFixed(2)),
  }
}

// Get financial tips based on user profile and loan type
export function getFinancialTips(state: ConversationState): string[] {
  const { loanType, userInfo, eligibilityResult } = state

  if (!loanType || !userInfo) {
    return [
      "Maintain a good credit score by paying bills on time.",
      "Save at least 20-30% of your income regularly.",
      "Avoid taking multiple loans simultaneously.",
      "Create an emergency fund covering 3-6 months of expenses.",
    ]
  }

  const generalTips = [
    "Pay your EMIs and credit card bills on time to maintain a good credit score.",
    "Try to save at least 20-30% of your income regularly.",
    "Compare offers from multiple lenders before finalizing a loan.",
    "Read all terms and conditions carefully before signing loan documents.",
  ]

  const specificTips: Record<string, string[]> = {
    "home loan": [
      "Save for a larger down payment to reduce your loan amount and EMI.",
      "Consider a joint home loan with a family member to increase eligibility.",
      "Check for PMAY or other government subsidies you might be eligible for.",
      "Opt for a longer tenure to reduce EMI burden, but be aware it increases total interest paid.",
    ],
    "personal loan": [
      "Avoid taking multiple personal loans as they carry higher interest rates.",
      "Consider debt consolidation if you have multiple high-interest loans.",
      "Prepay the loan whenever you have surplus funds to save on interest.",
      "Maintain a credit utilization ratio below 30% to improve your credit score.",
    ],
    "student loan": [
      "Look for education loans with moratorium periods until you complete your education.",
      "Check for government subsidies on education loans for certain courses.",
      "Start repaying interest during your study period if possible to reduce overall burden.",
      "Research scholarship opportunities to reduce your loan requirement.",
    ],
    "auto loan": [
      "Make a larger down payment to reduce the loan amount and interest paid.",
      "Choose a loan tenure that balances affordable EMIs with total interest paid.",
      "Consider pre-owned certified vehicles to reduce your loan requirement.",
      "Check if your employer offers any vehicle loan schemes at preferential rates.",
    ],
    "business loan": [
      "Prepare a detailed business plan to improve your loan approval chances.",
      "Consider government schemes like MUDRA loans for small businesses.",
      "Maintain separate business and personal accounts for better financial management.",
      "Explore secured business loans for lower interest rates if you have collateral.",
    ],
  }

  // Add tips based on eligibility
  const eligibilityTips = []

  if (!eligibilityResult?.eligible) {
    if (userInfo.creditScore && userInfo.creditScore < 700) {
      eligibilityTips.push("Work on improving your credit score by paying bills on time and reducing existing debt.")
    }

    if (userInfo.income && userInfo.income < 30000) {
      eligibilityTips.push("Consider ways to increase your income through additional skills or side gigs.")
    }

    if (userInfo.existingLoans) {
      eligibilityTips.push("Try to clear some of your existing loans before applying for a new one.")
    }
  } else {
    if (userInfo.creditScore && userInfo.creditScore < 750) {
      eligibilityTips.push("Improving your credit score further could help you get better interest rates.")
    }

    eligibilityTips.push("Consider opting for loan insurance to protect your repayment in case of emergencies.")
  }

  // Combine general, specific, and eligibility tips
  const allTips = [...generalTips, ...(specificTips[loanType] || []), ...eligibilityTips]

  // Return a subset of tips (to avoid overwhelming the user)
  return allTips.slice(0, 5)
}


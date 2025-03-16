"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator } from "lucide-react"

interface EligibilitySectionProps {
  onButtonClick?: () => void
}

export default function EligibilitySection({ onButtonClick }: EligibilitySectionProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    loanType: "",
    income: "",
    creditScore: "",
    existingLoans: "",
    employmentStatus: "",
  })
  const [result, setResult] = useState<null | { eligible: boolean; amount?: string; rate?: string; reason?: string }>(
    null,
  )
  const [open, setOpen] = useState(false)

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const checkEligibility = () => {
    // Simple eligibility logic - in a real app this would be more complex
    const income = Number.parseInt(formData.income) || 0
    const creditScore = Number.parseInt(formData.creditScore) || 0

    if (income < 30000) {
      setResult({
        eligible: false,
        reason: "Your income is below our minimum requirement of ₹30,000 per month.",
      })
    } else if (creditScore < 650) {
      setResult({
        eligible: false,
        reason: "Your credit score is below our minimum requirement of 650.",
      })
    } else {
      // Calculate loan amount based on income and credit score
      const maxAmount = income * 20
      const rate = creditScore > 750 ? "8.5%" : "10.5%"

      setResult({
        eligible: true,
        amount: `₹${maxAmount.toLocaleString()}`,
        rate,
      })
    }

    setStep(4)
  }

  const resetForm = () => {
    setStep(1)
    setFormData({
      loanType: "",
      income: "",
      creditScore: "",
      existingLoans: "",
      employmentStatus: "",
    })
    setResult(null)
    setOpen(false)
  }

  return (
    <motion.div
      id="eligibility"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className="h-full flex flex-col hover:shadow-xl transition-all duration-300 border-primary/10 overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-primary/10 p-2 text-primary group-hover:bg-primary/20 transition-colors duration-300">
              <Calculator className="h-6 w-6" />
            </div>
            <CardTitle className="text-primary">Loan Eligibility Check</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground">
            Answer a few questions to check your eligibility for different types of loans. Get instant results and find
            out how much you can borrow.
          </p>
        </CardContent>
        <CardFooter>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                className="w-full group-hover:bg-primary/90 transition-colors duration-300"
                onClick={onButtonClick}
              >
                Check Eligibility
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  {step === 4
                    ? result?.eligible
                      ? "Congratulations!"
                      : "Eligibility Result"
                    : "Loan Eligibility Check"}
                </DialogTitle>
                <DialogDescription>
                  {step === 4
                    ? result?.eligible
                      ? "Based on the information provided, you are eligible for a loan."
                      : "Based on the information provided, you are not eligible for a loan at this time."
                    : "Please provide the following information to check your eligibility."}
                </DialogDescription>
              </DialogHeader>

              {step === 1 && (
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="loanType">What type of loan are you interested in?</Label>
                    <Select value={formData.loanType} onValueChange={(value) => handleChange("loanType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select loan type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="home">Home Loan</SelectItem>
                        <SelectItem value="personal">Personal Loan</SelectItem>
                        <SelectItem value="business">Business Loan</SelectItem>
                        <SelectItem value="education">Education Loan</SelectItem>
                        <SelectItem value="vehicle">Vehicle Loan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="income">What is your monthly income?</Label>
                    <Input
                      id="income"
                      type="number"
                      placeholder="Enter amount in ₹"
                      value={formData.income}
                      onChange={(e) => handleChange("income", e.target.value)}
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="creditScore">What is your credit score?</Label>
                    <Select value={formData.creditScore} onValueChange={(value) => handleChange("creditScore", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select credit score range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="550">Below 600</SelectItem>
                        <SelectItem value="625">600 - 650</SelectItem>
                        <SelectItem value="675">650 - 700</SelectItem>
                        <SelectItem value="725">700 - 750</SelectItem>
                        <SelectItem value="775">750 - 800</SelectItem>
                        <SelectItem value="825">Above 800</SelectItem>
                        <SelectItem value="0">I don't know</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Do you have any existing loans?</Label>
                    <RadioGroup
                      value={formData.existingLoans}
                      onValueChange={(value) => handleChange("existingLoans", value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="existingLoans-yes" />
                        <Label htmlFor="existingLoans-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="existingLoans-no" />
                        <Label htmlFor="existingLoans-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label>What is your employment status?</Label>
                    <RadioGroup
                      value={formData.employmentStatus}
                      onValueChange={(value) => handleChange("employmentStatus", value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="salaried" id="employment-salaried" />
                        <Label htmlFor="employment-salaried">Salaried</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="self-employed" id="employment-self" />
                        <Label htmlFor="employment-self">Self-employed</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="business" id="employment-business" />
                        <Label htmlFor="employment-business">Business Owner</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="unemployed" id="employment-unemployed" />
                        <Label htmlFor="employment-unemployed">Unemployed</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              )}

              {step === 4 && result && (
                <div className="py-4">
                  {result.eligible ? (
                    <div className="space-y-4">
                      <div className="rounded-lg bg-green-50 p-4 border border-green-200">
                        <h3 className="font-medium text-green-800 mb-2">You're eligible!</h3>
                        <p className="text-green-700 text-sm">
                          Based on the information you provided, you are eligible for a loan.
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-muted rounded-lg p-4">
                          <p className="text-sm text-muted-foreground">Maximum Loan Amount</p>
                          <p className="text-xl font-bold">{result.amount}</p>
                        </div>
                        <div className="bg-muted rounded-lg p-4">
                          <p className="text-sm text-muted-foreground">Interest Rate</p>
                          <p className="text-xl font-bold">{result.rate}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        This is an estimate based on the information provided. The actual loan amount and interest rate
                        may vary based on additional factors and verification.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="rounded-lg bg-red-50 p-4 border border-red-200">
                        <h3 className="font-medium text-red-800 mb-2">Not eligible at this time</h3>
                        <p className="text-red-700 text-sm">{result.reason}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Don't worry! Here are some steps you can take to improve your eligibility:
                      </p>
                      <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                        <li>Improve your credit score by paying bills on time</li>
                        <li>Reduce existing debt</li>
                        <li>Increase your income or find additional sources of income</li>
                        <li>Consider applying with a co-applicant</li>
                      </ul>
                    </div>
                  )}
                </div>
              )}

              <DialogFooter>
                {step === 1 ? (
                  <Button onClick={nextStep} disabled={!formData.loanType || !formData.income}>
                    Next
                  </Button>
                ) : step === 2 ? (
                  <div className="flex justify-between w-full">
                    <Button variant="outline" onClick={prevStep}>
                      Back
                    </Button>
                    <Button onClick={nextStep} disabled={!formData.creditScore}>
                      Next
                    </Button>
                  </div>
                ) : step === 3 ? (
                  <div className="flex justify-between w-full">
                    <Button variant="outline" onClick={prevStep}>
                      Back
                    </Button>
                    <Button onClick={checkEligibility} disabled={!formData.employmentStatus}>
                      Check Eligibility
                    </Button>
                  </div>
                ) : (
                  <div className="flex justify-between w-full">
                    <Button variant="outline" onClick={resetForm}>
                      Start Over
                    </Button>
                    <Button onClick={() => setOpen(false)}>Close</Button>
                  </div>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </motion.div>
  )
}


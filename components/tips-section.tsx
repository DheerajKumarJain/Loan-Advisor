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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PiggyBank, TrendingUp, CreditCard, LineChart } from "lucide-react"

interface TipsSectionProps {
  onButtonClick?: () => void
}

export default function TipsSection({ onButtonClick }: TipsSectionProps) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      id="tips"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      viewport={{ once: true }}
    >
      <Card className="h-full flex flex-col hover:shadow-xl transition-all duration-300 border-primary/10 overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-primary/10 p-2 text-primary group-hover:bg-primary/20 transition-colors duration-300">
              <PiggyBank className="h-6 w-6" />
            </div>
            <CardTitle className="text-primary">Financial Literacy Tips</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground">
            Learn simple strategies to improve your financial health and credit score. Our expert tips will help you
            make better financial decisions and improve your loan eligibility.
          </p>
        </CardContent>
        <CardFooter>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                className="w-full group-hover:bg-primary/90 transition-colors duration-300"
                onClick={onButtonClick}
              >
                Get Tips
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Financial Literacy Tips</DialogTitle>
                <DialogDescription>
                  Explore these actionable strategies to improve your financial health and loan eligibility.
                </DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="credit" className="w-full">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="credit">Credit Score</TabsTrigger>
                  <TabsTrigger value="savings">Savings</TabsTrigger>
                  <TabsTrigger value="debt">Debt Management</TabsTrigger>
                  <TabsTrigger value="planning">Financial Planning</TabsTrigger>
                </TabsList>

                <TabsContent value="credit" className="space-y-4">
                  <div className="flex items-center gap-3 bg-muted p-4 rounded-lg">
                    <CreditCard className="h-10 w-10 text-primary" />
                    <div>
                      <h3 className="font-medium text-lg">Improving Your Credit Score</h3>
                      <p className="text-sm text-muted-foreground">
                        A good credit score (750+) can help you get better loan terms and interest rates.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Pay Bills on Time</h4>
                      <p className="text-sm text-muted-foreground">
                        Payment history accounts for 35% of your credit score. Set up automatic payments or reminders to
                        ensure you never miss a due date.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Keep Credit Utilization Low</h4>
                      <p className="text-sm text-muted-foreground">
                        Try to use less than 30% of your available credit limit. High utilization can negatively impact
                        your score.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Avoid Multiple Loan Applications</h4>
                      <p className="text-sm text-muted-foreground">
                        Each loan application can trigger a hard inquiry, which can temporarily lower your score. Space
                        out applications when possible.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Monitor Your Credit Report</h4>
                      <p className="text-sm text-muted-foreground">
                        Check your credit report regularly for errors or fraudulent activities. You can get a free
                        report annually from credit bureaus.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Maintain a Diverse Credit Mix</h4>
                      <p className="text-sm text-muted-foreground">
                        Having different types of credit (credit cards, loans) can positively impact your score, showing
                        you can manage various credit types.
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="savings" className="space-y-4">
                  <div className="flex items-center gap-3 bg-muted p-4 rounded-lg">
                    <PiggyBank className="h-10 w-10 text-primary" />
                    <div>
                      <h3 className="font-medium text-lg">Building Savings</h3>
                      <p className="text-sm text-muted-foreground">
                        Creating a strong savings habit is essential for financial security and future investments.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Follow the 50/30/20 Rule</h4>
                      <p className="text-sm text-muted-foreground">
                        Allocate 50% of your income to needs, 30% to wants, and 20% to savings and debt repayment.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Create an Emergency Fund</h4>
                      <p className="text-sm text-muted-foreground">
                        Aim to save 3-6 months of living expenses in an easily accessible account for emergencies.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Automate Your Savings</h4>
                      <p className="text-sm text-muted-foreground">
                        Set up automatic transfers to your savings account on payday to ensure consistent saving.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Explore Tax-Saving Investments</h4>
                      <p className="text-sm text-muted-foreground">
                        Invest in tax-saving instruments like PPF, ELSS, or NPS to reduce tax liability while building
                        wealth.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Save for Specific Goals</h4>
                      <p className="text-sm text-muted-foreground">
                        Create separate savings accounts for different goals like home down payment, education, or
                        vacation.
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="debt" className="space-y-4">
                  <div className="flex items-center gap-3 bg-muted p-4 rounded-lg">
                    <TrendingUp className="h-10 w-10 text-primary" />
                    <div>
                      <h3 className="font-medium text-lg">Debt Management</h3>
                      <p className="text-sm text-muted-foreground">
                        Managing your debt effectively is crucial for financial health and loan eligibility.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Prioritize High-Interest Debt</h4>
                      <p className="text-sm text-muted-foreground">
                        Focus on paying off high-interest debts first (like credit cards) while making minimum payments
                        on others.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Consider Debt Consolidation</h4>
                      <p className="text-sm text-muted-foreground">
                        Combine multiple high-interest debts into a single loan with a lower interest rate to simplify
                        payments and save money.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Avoid Taking on New Debt</h4>
                      <p className="text-sm text-muted-foreground">
                        While paying off existing debt, try to avoid taking on new debt to prevent a debt cycle.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Negotiate with Creditors</h4>
                      <p className="text-sm text-muted-foreground">
                        If you're struggling, contact your creditors to discuss hardship programs or lower interest
                        rates.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Make More Than Minimum Payments</h4>
                      <p className="text-sm text-muted-foreground">
                        Paying more than the minimum amount due can significantly reduce the total interest paid and
                        repayment time.
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="planning" className="space-y-4">
                  <div className="flex items-center gap-3 bg-muted p-4 rounded-lg">
                    <LineChart className="h-10 w-10 text-primary" />
                    <div>
                      <h3 className="font-medium text-lg">Financial Planning</h3>
                      <p className="text-sm text-muted-foreground">
                        Strategic financial planning helps you achieve long-term goals and financial security.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Create a Budget</h4>
                      <p className="text-sm text-muted-foreground">
                        Track your income and expenses to understand your spending patterns and identify areas for
                        improvement.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Set Financial Goals</h4>
                      <p className="text-sm text-muted-foreground">
                        Define short-term (1 year), medium-term (1-5 years), and long-term (5+ years) financial goals.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Invest for Retirement</h4>
                      <p className="text-sm text-muted-foreground">
                        Start retirement planning early through EPF, NPS, or other retirement-focused investments.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Get Adequate Insurance</h4>
                      <p className="text-sm text-muted-foreground">
                        Protect yourself and your family with health, life, and property insurance to avoid financial
                        setbacks.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Review and Adjust Regularly</h4>
                      <p className="text-sm text-muted-foreground">
                        Review your financial plan regularly and make adjustments as your income, expenses, and goals
                        change over time.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <DialogFooter>
                <Button onClick={() => setOpen(false)}>Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </motion.div>
  )
}


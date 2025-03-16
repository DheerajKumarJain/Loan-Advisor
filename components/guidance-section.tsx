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
import { FileText, CheckCircle2, AlertCircle, FileCheck } from "lucide-react"

interface GuidanceSectionProps {
  onButtonClick?: () => void
}

export default function GuidanceSection({ onButtonClick }: GuidanceSectionProps) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      id="guidance"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="h-full flex flex-col hover:shadow-xl transition-all duration-300 border-primary/10 overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-primary/10 p-2 text-primary group-hover:bg-primary/20 transition-colors duration-300">
              <FileText className="h-6 w-6" />
            </div>
            <CardTitle className="text-primary">Loan Application Guidance</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground">
            Get step-by-step guidance on the loan application process and required documents. Our comprehensive guide
            will help you navigate through the application process smoothly.
          </p>
        </CardContent>
        <CardFooter>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                className="w-full group-hover:bg-primary/90 transition-colors duration-300"
                onClick={onButtonClick}
              >
                Get Guidance
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Loan Application Guidance</DialogTitle>
                <DialogDescription>
                  Follow these steps to successfully apply for a loan. Select a loan type to see specific requirements.
                </DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="personal">Personal Loan</TabsTrigger>
                  <TabsTrigger value="home">Home Loan</TabsTrigger>
                  <TabsTrigger value="business">Business Loan</TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium text-lg mb-2 flex items-center">
                      <span className="bg-primary/10 rounded-full p-1 mr-2 text-primary">1</span>
                      Required Documents
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Identity Proof (Aadhaar, PAN, Passport, Voter ID)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Address Proof (Utility bills, Rental agreement)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Income Proof (Salary slips for last 3 months, Form 16, ITR for last 2 years)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Bank Statements (Last 6 months)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Passport-sized photographs</span>
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium text-lg mb-2 flex items-center">
                      <span className="bg-primary/10 rounded-full p-1 mr-2 text-primary">2</span>
                      Application Process
                    </h3>
                    <ol className="space-y-3">
                      <li className="flex items-start">
                        <span className="bg-muted rounded-full h-6 w-6 flex items-center justify-center text-sm mr-2 flex-shrink-0">
                          1
                        </span>
                        <div>
                          <p className="font-medium">Fill the Application Form</p>
                          <p className="text-sm text-muted-foreground">
                            Complete the loan application form with accurate personal, employment, and financial
                            details.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-muted rounded-full h-6 w-6 flex items-center justify-center text-sm mr-2 flex-shrink-0">
                          2
                        </span>
                        <div>
                          <p className="font-medium">Submit Documents</p>
                          <p className="text-sm text-muted-foreground">
                            Submit all required documents along with the completed application form.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-muted rounded-full h-6 w-6 flex items-center justify-center text-sm mr-2 flex-shrink-0">
                          3
                        </span>
                        <div>
                          <p className="font-medium">Verification</p>
                          <p className="text-sm text-muted-foreground">
                            The bank will verify your documents and may conduct a personal interview or phone
                            verification.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-muted rounded-full h-6 w-6 flex items-center justify-center text-sm mr-2 flex-shrink-0">
                          4
                        </span>
                        <div>
                          <p className="font-medium">Credit Assessment</p>
                          <p className="text-sm text-muted-foreground">
                            Your credit history and repayment capacity will be assessed.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-muted rounded-full h-6 w-6 flex items-center justify-center text-sm mr-2 flex-shrink-0">
                          5
                        </span>
                        <div>
                          <p className="font-medium">Loan Approval & Disbursement</p>
                          <p className="text-sm text-muted-foreground">
                            If approved, the loan amount will be disbursed to your bank account.
                          </p>
                        </div>
                      </li>
                    </ol>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium text-lg mb-2 flex items-center">
                      <span className="bg-primary/10 rounded-full p-1 mr-2 text-primary">3</span>
                      Timeline & Tips
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <FileCheck className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Expected Timeline</p>
                          <p className="text-sm text-muted-foreground">
                            Personal loan applications typically take 2-7 business days to process.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Important Tips</p>
                          <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                            <li>Ensure all documents are clear and up-to-date</li>
                            <li>Maintain a good credit score (above 750) for better interest rates</li>
                            <li>Avoid applying for multiple loans simultaneously</li>
                            <li>Be honest about your financial information</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="home" className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium text-lg mb-2 flex items-center">
                      <span className="bg-primary/10 rounded-full p-1 mr-2 text-primary">1</span>
                      Required Documents
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Identity & Address Proof (Aadhaar, PAN, Passport)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Income Proof (Salary slips, Form 16, ITR for last 3 years)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Bank Statements (Last 6-12 months)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Property Documents (Sale deed, approved plan, NOC, etc.)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Employment Details (Appointment letter, business proof)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Passport-sized photographs</span>
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium text-lg mb-2 flex items-center">
                      <span className="bg-primary/10 rounded-full p-1 mr-2 text-primary">2</span>
                      Application Process
                    </h3>
                    <ol className="space-y-3">
                      <li className="flex items-start">
                        <span className="bg-muted rounded-full h-6 w-6 flex items-center justify-center text-sm mr-2 flex-shrink-0">
                          1
                        </span>
                        <div>
                          <p className="font-medium">Pre-approval</p>
                          <p className="text-sm text-muted-foreground">
                            Get pre-approved for a home loan based on your income and credit profile.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-muted rounded-full h-6 w-6 flex items-center justify-center text-sm mr-2 flex-shrink-0">
                          2
                        </span>
                        <div>
                          <p className="font-medium">Property Selection & Verification</p>
                          <p className="text-sm text-muted-foreground">
                            Select a property and submit it for legal and technical verification by the bank.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-muted rounded-full h-6 w-6 flex items-center justify-center text-sm mr-2 flex-shrink-0">
                          3
                        </span>
                        <div>
                          <p className="font-medium">Final Application Submission</p>
                          <p className="text-sm text-muted-foreground">
                            Submit the complete application with all required documents.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-muted rounded-full h-6 w-6 flex items-center justify-center text-sm mr-2 flex-shrink-0">
                          4
                        </span>
                        <div>
                          <p className="font-medium">Loan Sanction</p>
                          <p className="text-sm text-muted-foreground">
                            The bank will issue a sanction letter with loan details.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-muted rounded-full h-6 w-6 flex items-center justify-center text-sm mr-2 flex-shrink-0">
                          5
                        </span>
                        <div>
                          <p className="font-medium">Property Registration & Loan Disbursement</p>
                          <p className="text-sm text-muted-foreground">
                            Complete property registration and mortgage creation for loan disbursement.
                          </p>
                        </div>
                      </li>
                    </ol>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium text-lg mb-2 flex items-center">
                      <span className="bg-primary/10 rounded-full p-1 mr-2 text-primary">3</span>
                      Timeline & Tips
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <FileCheck className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Expected Timeline</p>
                          <p className="text-sm text-muted-foreground">
                            Home loan processing typically takes 2-4 weeks from application to disbursement.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Important Tips</p>
                          <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                            <li>Save for a larger down payment (at least 20%) to reduce EMI burden</li>
                            <li>Check for PMAY or other government subsidies you might be eligible for</li>
                            <li>Compare offers from multiple lenders for the best interest rates</li>
                            <li>Ensure all property documents are clear and legally verified</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="business" className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium text-lg mb-2 flex items-center">
                      <span className="bg-primary/10 rounded-full p-1 mr-2 text-primary">1</span>
                      Required Documents
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Business Registration Documents (Certificate of Incorporation, GST registration)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Business Financial Statements (Last 3 years)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Business Plan or Project Report</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>KYC Documents of Directors/Partners/Proprietor</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Bank Statements (Last 12 months)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Collateral Documents (if applicable)</span>
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium text-lg mb-2 flex items-center">
                      <span className="bg-primary/10 rounded-full p-1 mr-2 text-primary">2</span>
                      Application Process
                    </h3>
                    <ol className="space-y-3">
                      <li className="flex items-start">
                        <span className="bg-muted rounded-full h-6 w-6 flex items-center justify-center text-sm mr-2 flex-shrink-0">
                          1
                        </span>
                        <div>
                          <p className="font-medium">Prepare Business Plan</p>
                          <p className="text-sm text-muted-foreground">
                            Create a detailed business plan outlining your business model, market analysis, and
                            financial projections.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-muted rounded-full h-6 w-6 flex items-center justify-center text-sm mr-2 flex-shrink-0">
                          2
                        </span>
                        <div>
                          <p className="font-medium">Application Submission</p>
                          <p className="text-sm text-muted-foreground">
                            Submit the loan application along with all required documents.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-muted rounded-full h-6 w-6 flex items-center justify-center text-sm mr-2 flex-shrink-0">
                          3
                        </span>
                        <div>
                          <p className="font-medium">Business Assessment</p>
                          <p className="text-sm text-muted-foreground">
                            The bank will assess your business viability, financial health, and repayment capacity.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-muted rounded-full h-6 w-6 flex items-center justify-center text-sm mr-2 flex-shrink-0">
                          4
                        </span>
                        <div>
                          <p className="font-medium">Collateral Evaluation</p>
                          <p className="text-sm text-muted-foreground">
                            If collateral is required, it will be evaluated by the bank.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-muted rounded-full h-6 w-6 flex items-center justify-center text-sm mr-2 flex-shrink-0">
                          5
                        </span>
                        <div>
                          <p className="font-medium">Loan Approval & Disbursement</p>
                          <p className="text-sm text-muted-foreground">
                            Upon approval, the loan will be disbursed as per the agreed terms.
                          </p>
                        </div>
                      </li>
                    </ol>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium text-lg mb-2 flex items-center">
                      <span className="bg-primary/10 rounded-full p-1 mr-2 text-primary">3</span>
                      Timeline & Tips
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <FileCheck className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Expected Timeline</p>
                          <p className="text-sm text-muted-foreground">
                            Business loan processing typically takes 2-6 weeks depending on the loan amount and
                            complexity.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Important Tips</p>
                          <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                            <li>Prepare a detailed and realistic business plan</li>
                            <li>Maintain clean business financial records</li>
                            <li>Consider government schemes like MUDRA loans for small businesses</li>
                            <li>Explore secured business loans for lower interest rates if you have collateral</li>
                            <li>Compare different lenders and loan products</li>
                          </ul>
                        </div>
                      </div>
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


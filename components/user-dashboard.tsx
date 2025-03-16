"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  CreditCard,
  FileText,
  PiggyBank,
  Bell,
  Settings,
  ChevronRight,
  Calendar,
  DollarSign,
  TrendingUp,
} from "lucide-react"

interface UserDashboardProps {
  user: { name?: string; email: string }
}

export default function UserDashboard({ user }: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data
  const loanApplications = [
    { id: "LA-2023-001", type: "Personal Loan", amount: "₹500,000", status: "Approved", date: "15 Mar 2023" },
    { id: "LA-2023-002", type: "Home Loan", amount: "₹3,500,000", status: "In Review", date: "02 Apr 2023" },
  ]

  const upcomingPayments = [{ id: "PMT-001", loanId: "LA-2023-001", amount: "₹15,250", dueDate: "05 Apr 2023" }]

  const creditScore = 780

  return (
    <section className="py-8 bg-muted/30">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/4"
          >
            <Card className="h-full">
              <CardHeader className="pb-4">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-20 w-20 mb-4">
                    <AvatarImage src="/placeholder.svg?height=80&width=80&text=User" alt={user.name || user.email} />
                    <AvatarFallback className="text-lg">{user.name?.charAt(0) || user.email.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <CardTitle>{user.name || "User"}</CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2">
                  <Button
                    variant={activeTab === "overview" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("overview")}
                  >
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Overview
                  </Button>
                  <Button
                    variant={activeTab === "applications" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("applications")}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Loan Applications
                  </Button>
                  <Button
                    variant={activeTab === "payments" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("payments")}
                  >
                    <DollarSign className="mr-2 h-4 w-4" />
                    Payments
                  </Button>
                  <Button
                    variant={activeTab === "credit" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("credit")}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Credit Score
                  </Button>
                  <Button
                    variant={activeTab === "notifications" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("notifications")}
                  >
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                  </Button>
                  <Button
                    variant={activeTab === "settings" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("settings")}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full md:w-3/4"
          >
            <Card>
              <CardHeader>
                <CardTitle>Dashboard</CardTitle>
                <CardDescription>
                  Welcome back, {user.name || "User"}! Here's an overview of your loan applications and financial
                  status.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
                  <TabsContent value="overview" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Active Loans</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">1</div>
                          <p className="text-xs text-muted-foreground">Personal Loan - ₹500,000</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">1</div>
                          <p className="text-xs text-muted-foreground">Home Loan - In Review</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Next Payment</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">₹15,250</div>
                          <p className="text-xs text-muted-foreground">Due on 05 Apr 2023</p>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Credit Score</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Current Score: {creditScore}</span>
                            <span className="text-sm text-green-600 font-medium">Excellent</span>
                          </div>
                          <Progress value={creditScore / 9} className="h-2" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Poor</span>
                            <span>Fair</span>
                            <span>Good</span>
                            <span>Very Good</span>
                            <span>Excellent</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Recent Applications</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {loanApplications.map((app) => (
                              <li key={app.id} className="flex justify-between items-center border-b pb-2">
                                <div>
                                  <p className="font-medium text-sm">{app.type}</p>
                                  <p className="text-xs text-muted-foreground">{app.date}</p>
                                </div>
                                <div className="flex items-center">
                                  <span
                                    className={`text-xs px-2 py-1 rounded-full ${
                                      app.status === "Approved"
                                        ? "bg-green-100 text-green-800"
                                        : app.status === "In Review"
                                          ? "bg-yellow-100 text-yellow-800"
                                          : "bg-red-100 text-red-800"
                                    }`}
                                  >
                                    {app.status}
                                  </span>
                                  <ChevronRight className="h-4 w-4 ml-2 text-muted-foreground" />
                                </div>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Upcoming Payments</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {upcomingPayments.length > 0 ? (
                            <ul className="space-y-2">
                              {upcomingPayments.map((payment) => (
                                <li key={payment.id} className="flex justify-between items-center border-b pb-2">
                                  <div>
                                    <p className="font-medium text-sm">Personal Loan</p>
                                    <p className="text-xs text-muted-foreground">Due: {payment.dueDate}</p>
                                  </div>
                                  <div className="flex items-center">
                                    <span className="font-medium">{payment.amount}</span>
                                    <Button variant="ghost" size="sm" className="ml-2">
                                      <Calendar className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-muted-foreground">No upcoming payments.</p>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="applications">
                    <Card>
                      <CardHeader>
                        <CardTitle>Loan Applications</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {loanApplications.map((app) => (
                            <div key={app.id} className="border rounded-lg p-4">
                              <div className="flex justify-between items-center mb-2">
                                <h3 className="font-medium">{app.type}</h3>
                                <span
                                  className={`text-xs px-2 py-1 rounded-full ${
                                    app.status === "Approved"
                                      ? "bg-green-100 text-green-800"
                                      : app.status === "In Review"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {app.status}
                                </span>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                  <p className="text-muted-foreground">Application ID</p>
                                  <p>{app.id}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Amount</p>
                                  <p>{app.amount}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Date Applied</p>
                                  <p>{app.date}</p>
                                </div>
                              </div>
                              <div className="mt-4">
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="payments">
                    <Card>
                      <CardHeader>
                        <CardTitle>Payment History</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="border rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                              <h3 className="font-medium">Personal Loan - EMI</h3>
                              <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">Paid</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <p className="text-muted-foreground">Payment ID</p>
                                <p>PMT-2023-001</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Amount</p>
                                <p>₹15,250</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Date</p>
                                <p>05 Mar 2023</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Method</p>
                                <p>Auto-debit</p>
                              </div>
                            </div>
                          </div>

                          <div className="border rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                              <h3 className="font-medium">Personal Loan - EMI</h3>
                              <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">Paid</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <p className="text-muted-foreground">Payment ID</p>
                                <p>PMT-2023-002</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Amount</p>
                                <p>₹15,250</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Date</p>
                                <p>05 Feb 2023</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Method</p>
                                <p>Auto-debit</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="credit">
                    <Card>
                      <CardHeader>
                        <CardTitle>Credit Score</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div className="text-center p-6 bg-muted rounded-lg">
                            <div className="text-5xl font-bold text-primary mb-2">{creditScore}</div>
                            <p className="text-green-600 font-medium">Excellent</p>
                            <p className="text-sm text-muted-foreground mt-2">Last updated: 28 Mar 2023</p>
                          </div>

                          <div className="space-y-2">
                            <h3 className="font-medium">Score Breakdown</h3>
                            <div className="space-y-4">
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Payment History (35%)</span>
                                  <span>Excellent</span>
                                </div>
                                <Progress value={95} className="h-2" />
                              </div>
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Credit Utilization (30%)</span>
                                  <span>Very Good</span>
                                </div>
                                <Progress value={85} className="h-2" />
                              </div>
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Length of Credit History (15%)</span>
                                  <span>Good</span>
                                </div>
                                <Progress value={75} className="h-2" />
                              </div>
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Credit Mix (10%)</span>
                                  <span>Very Good</span>
                                </div>
                                <Progress value={85} className="h-2" />
                              </div>
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>New Credit (10%)</span>
                                  <span>Excellent</span>
                                </div>
                                <Progress value={95} className="h-2" />
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="font-medium mb-2">Tips to Improve Your Score</h3>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-start gap-2">
                                <PiggyBank className="h-4 w-4 text-primary mt-0.5" />
                                <span>
                                  Continue to pay all bills on time to maintain your excellent payment history.
                                </span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CreditCard className="h-4 w-4 text-primary mt-0.5" />
                                <span>Keep your credit card balances low relative to your credit limits.</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <FileText className="h-4 w-4 text-primary mt-0.5" />
                                <span>Regularly check your credit report for errors or fraudulent activities.</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


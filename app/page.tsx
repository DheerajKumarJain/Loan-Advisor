"use client"

import { useState, useEffect } from "react"
import NavigationBar from "@/components/navigation-bar"
import FloatingChat from "@/components/floating-chat"
import HeroSection from "@/components/hero-section"
import EligibilitySection from "@/components/eligibility-section"
import GuidanceSection from "@/components/guidance-section"
import TipsSection from "@/components/tips-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import LoanProductsSection from "@/components/loan-products-section"
import WhyChooseUsSection from "@/components/why-choose-us-section"
import UserDashboard from "@/components/user-dashboard"

export default function Home() {
  const [showChat, setShowChat] = useState(true)
  const [chatPrompt, setChatPrompt] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<{ name?: string; email: string } | null>(null)

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
        setIsLoggedIn(true)
      } catch (error) {
        console.error("Error parsing user data:", error)
      }
    }
  }, [])

  const handleFeatureClick = (prompt: string) => {
    setShowChat(true)
    setChatPrompt(prompt)
  }

  return (
    <main className="min-h-screen flex flex-col">
      <NavigationBar isLoggedIn={isLoggedIn} user={user} setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
      <HeroSection />

      {isLoggedIn && user && <UserDashboard user={user} />}

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Our Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We offer comprehensive loan advisory services to help you make informed financial decisions. Our AI-powered
            assistant is available 24/7 to guide you through every step.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <EligibilitySection onButtonClick={() => handleFeatureClick("I want to check my loan eligibility.")} />
          <GuidanceSection onButtonClick={() => handleFeatureClick("Guide me through the loan application process.")} />
          <TipsSection onButtonClick={() => handleFeatureClick("Share some financial tips with me.")} />
        </div>

        <LoanProductsSection />
        <WhyChooseUsSection />
      </div>

      <ContactSection />
      <Footer />

      <FloatingChat initialOpen={showChat} initialPrompt={chatPrompt} />
    </main>
  )
}


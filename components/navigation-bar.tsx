"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, User } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "@/components/ui/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface NavigationBarProps {
  isLoggedIn: boolean
  user: { name?: string; email: string } | null
  setIsLoggedIn: (value: boolean) => void
  setUser: (user: { name?: string; email: string } | null) => void
}

export default function NavigationBar({ isLoggedIn, user, setIsLoggedIn, setUser }: NavigationBarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
    setIsLoggedIn(false)
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })
    router.push("/")
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-sm shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="rounded-md bg-gradient-to-r from-primary to-secondary p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-primary-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <span
            className={`font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent`}
          >
            LoanAdvisor
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="#eligibility"
            className={`text-sm font-medium ${isScrolled ? "text-foreground" : "text-white"} hover:text-primary transition-colors`}
          >
            Eligibility
          </Link>
          <Link
            href="#guidance"
            className={`text-sm font-medium ${isScrolled ? "text-foreground" : "text-white"} hover:text-primary transition-colors`}
          >
            Guidance
          </Link>
          <Link
            href="#tips"
            className={`text-sm font-medium ${isScrolled ? "text-foreground" : "text-white"} hover:text-primary transition-colors`}
          >
            Financial Tips
          </Link>
          <Link
            href="#products"
            className={`text-sm font-medium ${isScrolled ? "text-foreground" : "text-white"} hover:text-primary transition-colors`}
          >
            Loan Products
          </Link>
          <Link
            href="#contact"
            className={`text-sm font-medium ${isScrolled ? "text-foreground" : "text-white"} hover:text-primary transition-colors`}
          >
            Contact
          </Link>

          {isLoggedIn && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32&text=User" alt={user.name || user.email} />
                    <AvatarFallback>{user.name?.charAt(0) || user.email.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name || "User"}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                asChild
                className={`border-primary/20 hover:bg-primary/10 hover:text-primary ${!isScrolled && "border-white/20 text-white hover:bg-white/10 hover:text-white"}`}
              >
                <Link href="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                <Link href="/register">Register</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-foreground" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-background border-b"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link href="#eligibility" className="text-sm font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>
              Eligibility
            </Link>
            <Link href="#guidance" className="text-sm font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>
              Guidance
            </Link>
            <Link href="#tips" className="text-sm font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>
              Financial Tips
            </Link>
            <Link href="#products" className="text-sm font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>
              Loan Products
            </Link>
            <Link href="#contact" className="text-sm font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>
              Contact
            </Link>

            {isLoggedIn && user ? (
              <>
                <div className="flex items-center gap-3 py-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{user.name?.charAt(0) || user.email.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{user.name || "User"}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    // Navigate to profile
                  }}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    handleLogout()
                    setIsMobileMenuOpen(false)
                  }}
                >
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" className="w-full" asChild onClick={() => setIsMobileMenuOpen(false)}>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                  asChild
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link href="/register">Register</Link>
                </Button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}


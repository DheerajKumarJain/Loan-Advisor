"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { CreditCard, Home, Car, Briefcase } from "lucide-react"

export default function LoanProductsSection() {
  const loanTypes = [
    {
      title: "Personal Loans",
      description: "Flexible loans for various personal needs with competitive interest rates.",
      icon: <CreditCard className="h-8 w-8" />,
      image: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Home Loans",
      description: "Realize your dream of homeownership with our affordable mortgage options.",
      icon: <Home className="h-8 w-8" />,
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop",
    },
    {
      title: "Auto Loans",
      description: "Drive your dream car with our quick and hassle-free auto financing.",
      icon: <Car className="h-8 w-8" />,
      image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Business Loans",
      description: "Fuel your business growth with our tailored financing solutions.",
      icon: <Briefcase className="h-8 w-8" />,
      image: "https://images.unsplash.com/photo-1664575602554-2087b04935a5?q=80&w=2070&auto=format&fit=crop",
    },
  ]

  return (
    <section id="products" className="mb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-primary mb-4">Loan Products</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore our range of loan products designed to meet your specific financial needs. Our AI assistant can help
          you understand which option is best for you.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {loanTypes.map((loan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={loan.image || "/placeholder.svg"}
                  alt={loan.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="rounded-full bg-primary/80 p-2">{loan.icon}</div>
                      <h3 className="text-xl font-bold">{loan.title}</h3>
                    </div>
                    <p className="text-white/80">{loan.description}</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}


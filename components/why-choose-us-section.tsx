"use client"

import { motion } from "framer-motion"
import { Landmark, Globe, Mic, Volume2 } from "lucide-react"

export default function WhyChooseUsSection() {
  return (
    <section className="bg-primary/5 rounded-2xl p-8 mb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row items-center gap-8"
      >
        <div className="md:w-1/2">
          <h2 className="text-2xl font-bold text-primary mb-4">Why Choose Our Loan Advisory Service?</h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="rounded-full bg-primary/10 p-1 mt-1">
                <Landmark className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Expert Guidance</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI assistant is trained on the latest financial information and loan products.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="rounded-full bg-primary/10 p-1 mt-1">
                <Globe className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Multilingual Support</h3>
                <p className="text-sm text-muted-foreground">
                  Get assistance in your preferred Indian language with our advanced translation capabilities.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="rounded-full bg-primary/10 p-1 mt-1">
                <Mic className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Voice Interaction</h3>
                <p className="text-sm text-muted-foreground">
                  Speak directly to our assistant for a more natural and convenient experience.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="rounded-full bg-primary/10 p-1 mt-1">
                <Volume2 className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Text-to-Speech</h3>
                <p className="text-sm text-muted-foreground">
                  Listen to responses for an accessible and hands-free experience.
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div className="md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1591696205602-2f950c417cb9?q=80&w=2070&auto=format&fit=crop"
            alt="Loan Advisory Service"
            className="rounded-xl shadow-lg w-full"
          />
        </div>
      </motion.div>
    </section>
  )
}


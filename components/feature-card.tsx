"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { ReactNode } from "react"

interface FeatureCardProps {
  title: string
  description: string
  icon: ReactNode
  actionText: string
  onClick: () => void
}

export default function FeatureCard({ title, description, icon, actionText, onClick }: FeatureCardProps) {
  return (
    <Card className="h-full flex flex-col hover:shadow-xl transition-all duration-300 border-primary/10 overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-primary/10 p-2 text-primary group-hover:bg-primary/20 transition-colors duration-300">
            {icon}
          </div>
          <CardTitle className="text-primary">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={onClick} className="w-full group-hover:bg-primary/90 transition-colors duration-300">
          {actionText}
        </Button>
      </CardFooter>
    </Card>
  )
}


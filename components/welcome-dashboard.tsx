import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function WelcomeDashboard() {
  return (
    <div className="bg-gradient-to-b from-muted to-background py-16">
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Welcome to LoanAdvisor
            </h1>
            <p className="text-xl text-muted-foreground">
              Your trusted companion for all your loan and financial needs. Get personalized advice, check eligibility,
              and learn financial tips in your preferred language.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                Get Started
              </Button>
              <Button variant="outline" size="lg" className="border-primary/20 hover:bg-primary/10 hover:text-primary">
                Learn More
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card className="overflow-hidden border-primary/10 shadow-md hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1579621970795-87facc2f976d?q=80&w=2070&auto=format&fit=crop"
                    alt="Personal Loans"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <span className="p-2 text-white font-medium">Personal Loans</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden border-primary/10 shadow-md hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop"
                    alt="Home Loans"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <span className="p-2 text-white font-medium">Home Loans</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden border-primary/10 shadow-md hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop"
                    alt="Auto Loans"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <span className="p-2 text-white font-medium">Auto Loans</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden border-primary/10 shadow-md hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1664575602554-2087b04935a5?q=80&w=2070&auto=format&fit=crop"
                    alt="Business Loans"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <span className="p-2 text-white font-medium">Business Loans</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}


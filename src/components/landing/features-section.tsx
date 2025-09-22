import { Card, CardContent } from "@/components/ui/card"
import { CreditCard, PiggyBank, Building2, Smartphone, TrendingUp, Users } from "lucide-react"

const features = [
  {
    icon: CreditCard,
    title: "Smart Debit Cards",
    description: "Contactless payments with real-time spending insights and customizable limits.",
    stats: "0% foreign transaction fees",
  },
  {
    icon: PiggyBank,
    title: "High-Yield Savings",
    description: "Earn competitive interest rates with automated savings goals and round-up features.",
    stats: "Up to 4.5% APY",
  },
  {
    icon: Building2,
    title: "Business Banking",
    description: "Comprehensive business solutions with invoicing, payroll, and expense management.",
    stats: "Free business checking",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Award-winning mobile app with biometric security and instant notifications.",
    stats: "4.8★ app rating",
  },
  {
    icon: TrendingUp,
    title: "Investment Tools",
    description: "Commission-free trading with robo-advisors and portfolio management.",
    stats: "$0 minimum balance",
  },
  {
    icon: Users,
    title: "Family Banking",
    description: "Joint accounts, teen debit cards, and financial education tools for families.",
    stats: "Free for all ages",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Everything you need to
            <span className="text-primary block">manage your money</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            From everyday banking to long-term investments, we provide the tools and insights to help you achieve your
            financial goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20"
            >
              <CardContent className="p-8">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-pretty mb-3">{feature.description}</p>
                    <div className="text-sm font-medium text-primary">{feature.stats}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">2M+</div>
            <div className="text-muted-foreground">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">$50B+</div>
            <div className="text-muted-foreground">Assets Under Management</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">99.9%</div>
            <div className="text-muted-foreground">Uptime Guarantee</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">24/7</div>
            <div className="text-muted-foreground">Customer Support</div>
          </div>
        </div>
      </div>
    </section>
  )
}

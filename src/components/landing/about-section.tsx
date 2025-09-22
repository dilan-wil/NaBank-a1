import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Award, Users, Globe, TrendingUp } from "lucide-react"
import Link from "next/link"

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
                Built for the
                <span className="text-primary block">digital generation</span>
              </h2>
              <p className="text-xl text-muted-foreground text-pretty">
                Founded in 2020, NaBank emerged from a simple belief: banking should be intuitive, transparent, and
                accessible to everyone. We're not just another fintech startup—we're your financial partner for life.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Award className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Award-Winning Innovation</h3>
                  <p className="text-muted-foreground">
                    Recognized as "Best Digital Bank 2024" by FinTech Awards and featured in Forbes' "Most Innovative
                    Companies" list.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Customer-Centric Approach</h3>
                  <p className="text-muted-foreground">
                    Every feature we build starts with understanding your needs. Our 98% customer satisfaction rate
                    speaks to our commitment.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Globe className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Global Reach, Local Touch</h3>
                  <p className="text-muted-foreground">
                    Operating in 15 countries with local support teams, we understand the unique financial needs of each
                    market we serve.
                  </p>
                </div>
              </div>
            </div>

            <Link href="/contact">
              <Button size="lg" className="text-lg px-8">
                Learn More About Us
              </Button>
            </Link>
          </div>

          {/* Visual Cards */}
          <div className="grid grid-cols-2 gap-6">
            <Card className="animate-float" style={{ animationDelay: "0s" }}>
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-8 h-8 text-primary mx-auto mb-4" />
                <div className="text-2xl font-bold text-foreground mb-2">150%</div>
                <div className="text-sm text-muted-foreground">Growth in 2024</div>
              </CardContent>
            </Card>

            <Card className="animate-float mt-8" style={{ animationDelay: "1s" }}>
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 text-primary mx-auto mb-4" />
                <div className="text-2xl font-bold text-foreground mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Team Members</div>
              </CardContent>
            </Card>

            <Card className="animate-float" style={{ animationDelay: "2s" }}>
              <CardContent className="p-6 text-center">
                <Award className="w-8 h-8 text-primary mx-auto mb-4" />
                <div className="text-2xl font-bold text-foreground mb-2">25+</div>
                <div className="text-sm text-muted-foreground">Industry Awards</div>
              </CardContent>
            </Card>

            <Card className="animate-float mt-8" style={{ animationDelay: "3s" }}>
              <CardContent className="p-6 text-center">
                <Globe className="w-8 h-8 text-primary mx-auto mb-4" />
                <div className="text-2xl font-bold text-foreground mb-2">15</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

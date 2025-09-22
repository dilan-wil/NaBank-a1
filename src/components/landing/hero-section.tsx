import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Zap, Globe } from "lucide-react"

export function HeroSection() {
  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-8">
          {/* Announcement Banner */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Shield className="w-4 h-4 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">Bank-grade security with 256-bit encryption</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground text-balance leading-tight">
              The Future of
              <span className="text-primary block">Digital Banking</span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Experience seamless banking with instant transfers, smart savings, and business solutions designed for the
              modern world.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth/signup">
              <Button size="lg" className="text-lg px-8 py-6 animate-pulse-glow">
                Open Your Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
                Explore Features
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="pt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-foreground">Instant Transfers</div>
                <div className="text-sm text-muted-foreground">24/7 availability</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-foreground">FDIC Insured</div>
                <div className="text-sm text-muted-foreground">Up to $250,000</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-foreground">Global Access</div>
                <div className="text-sm text-muted-foreground">55,000+ ATMs</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

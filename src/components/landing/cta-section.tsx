import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Smartphone, CreditCard } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-primary/5">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Ready to experience
            <span className="text-primary block">the future of banking?</span>
          </h2>
          <p className="text-xl text-muted-foreground text-pretty">
            Join over 2 million customers who've already made the switch. Open your account in minutes and start banking
            smarter today.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/auth/signup">
            <Button size="lg" className="text-lg px-8 py-6 animate-pulse-glow">
              <CreditCard className="mr-2 h-5 w-5" />
              Open Account Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
              <Smartphone className="mr-2 h-5 w-5" />
              Download App
            </Button>
          </Link>
        </div>

        <div className="pt-8 text-sm text-muted-foreground space-y-2">
          <p>✓ No minimum balance required</p>
          <p>✓ FDIC insured up to $250,000</p>
          <p>✓ Free account setup in under 5 minutes</p>
        </div>
      </div>
    </section>
  )
}

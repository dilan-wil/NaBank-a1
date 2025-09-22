import { Card, CardContent } from "@/components/ui/card"
import { Shield, Lock, Eye, Fingerprint, AlertTriangle, CheckCircle } from "lucide-react"

const securityFeatures = [
  {
    icon: Shield,
    title: "Bank-Grade Encryption",
    description: "256-bit SSL encryption protects all your data in transit and at rest.",
  },
  {
    icon: Lock,
    title: "Multi-Factor Authentication",
    description: "Biometric login, SMS codes, and authenticator app support for maximum security.",
  },
  {
    icon: Eye,
    title: "Real-Time Monitoring",
    description: "AI-powered fraud detection monitors every transaction 24/7 for suspicious activity.",
  },
  {
    icon: Fingerprint,
    title: "Biometric Security",
    description: "Face ID, Touch ID, and voice recognition for secure and convenient access.",
  },
  {
    icon: AlertTriangle,
    title: "Instant Alerts",
    description: "Immediate notifications for all account activity via push, SMS, or email.",
  },
  {
    icon: CheckCircle,
    title: "FDIC Insured",
    description: "Your deposits are protected up to $250,000 by the Federal Deposit Insurance Corporation.",
  },
]

export function SecuritySection() {
  return (
    <section id="security" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Your security is our
            <span className="text-primary block">top priority</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            We employ multiple layers of security to protect your money and personal information, giving you peace of
            mind with every transaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {securityFeatures.map((feature, index) => (
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
                    <p className="text-muted-foreground text-pretty">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Security Certifications */}
        <div className="bg-card rounded-2xl p-8 border border-border/50">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">Trusted & Certified</h3>
            <p className="text-muted-foreground">
              We maintain the highest security standards and regulatory compliance
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-lg font-semibold text-foreground mb-1">SOC 2 Type II</div>
              <div className="text-sm text-muted-foreground">Security Compliance</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-foreground mb-1">PCI DSS</div>
              <div className="text-sm text-muted-foreground">Payment Security</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-foreground mb-1">ISO 27001</div>
              <div className="text-sm text-muted-foreground">Information Security</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-foreground mb-1">GDPR</div>
              <div className="text-sm text-muted-foreground">Privacy Compliant</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

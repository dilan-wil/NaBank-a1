import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Small Business Owner",
    content:
      "NaBank transformed how I manage my business finances. The integrated invoicing and expense tracking saved me hours every week.",
    rating: 5,
    avatar: "/professional-woman-diverse.png",
  },
  {
    name: "Marcus Johnson",
    role: "Software Engineer",
    content:
      "Finally, a bank that gets technology. The API integrations and developer-friendly features make financial automation a breeze.",
    rating: 5,
    avatar: "/professional-man.png",
  },
  {
    name: "Emily Rodriguez",
    role: "Freelance Designer",
    content:
      "The high-yield savings and investment tools helped me grow my emergency fund faster than I ever thought possible.",
    rating: 5,
    avatar: "/creative-professional.png",
  },
  {
    name: "David Kim",
    role: "Family Father",
    content:
      "Teaching my kids about money is so much easier with NaBank's family features. The teen accounts are perfect for financial education.",
    rating: 5,
    avatar: "/family-man.jpg",
  },
  {
    name: "Lisa Thompson",
    role: "Startup Founder",
    content:
      "From personal banking to business growth, NaBank scaled with my company. Their support team truly understands entrepreneurs.",
    rating: 5,
    avatar: "/confident-business-woman.png",
  },
  {
    name: "Alex Rivera",
    role: "Digital Nomad",
    content:
      "Banking without borders. NaBank's global features and zero foreign fees make managing money while traveling seamless.",
    rating: 5,
    avatar: "/lone-traveler-mountain-path.png",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Loved by customers
            <span className="text-primary block">around the world</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Join millions of satisfied customers who've made the switch to smarter banking
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20"
            >
              <CardContent className="p-8">
                <div className="space-y-4">
                  {/* Rating */}
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-muted-foreground text-pretty leading-relaxed">"{testimonial.content}"</p>

                  {/* Author */}
                  <div className="flex items-center space-x-3 pt-4 border-t border-border/50">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 fill-primary text-primary" />
              <span className="font-semibold">4.9/5</span>
              <span>App Store</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 fill-primary text-primary" />
              <span className="font-semibold">4.8/5</span>
              <span>Google Play</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 fill-primary text-primary" />
              <span className="font-semibold">4.9/5</span>
              <span>Trustpilot</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

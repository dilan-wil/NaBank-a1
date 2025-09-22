import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">N</span>
              </div>
              <span className="font-bold text-xl text-foreground">NaBank</span>
            </div>
            <p className="text-muted-foreground text-pretty">
              The future of digital banking. Secure, innovative, and designed for your financial success.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Products</h3>
            <div className="space-y-2">
              <Link href="/auth/signup" className="block text-muted-foreground hover:text-primary transition-colors">
                Personal Banking
              </Link>
              <Link
                href="/business/auth/signup"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Business Banking
              </Link>
              <Link href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Investment Tools
              </Link>
              <Link href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Loans & Credit
              </Link>
              <Link href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Mobile App
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Support</h3>
            <div className="space-y-2">
              <Link href="/support" className="block text-muted-foreground hover:text-primary transition-colors">
                Help Center
              </Link>
              <Link href="/contact" className="block text-muted-foreground hover:text-primary transition-colors">
                Contact Us
              </Link>
              <Link href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Security Center
              </Link>
              <Link href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">1-800-NABANK-1</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">support@nabank.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-primary mt-1" />
                <span className="text-muted-foreground">
                  123 Financial District
                  <br />
                  New York, NY 10004
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-muted-foreground text-sm">© 2024 NaBank. All rights reserved. Member FDIC.</div>
            <div className="flex space-x-6 text-sm">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Terms
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

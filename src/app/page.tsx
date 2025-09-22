import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-2xl">N</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-foreground">Welcome to NaBank</h1>
        <p className="text-xl text-muted-foreground max-w-md">
          Your modern digital banking solution for all your financial needs
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/auth/login">
            <Button size="lg">Sign In</Button>
          </Link>
          <Link href="/auth/signup">
            <Button variant="outline" size="lg">
              Create Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

"use client"

import { Home, CreditCard, ArrowLeftRight, PiggyBank, Receipt, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import Link from "next/link"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Cards", href: "/cards", icon: CreditCard },
  { name: "Transfers", href: "/transfers", icon: ArrowLeftRight },
  { name: "Savings", href: "/savings", icon: PiggyBank },
  { name: "Payments", href: "/payments", icon: Receipt },
  { name: "More", href: "/more", icon: MoreHorizontal },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border md:hidden">
      <nav className="flex items-center justify-around px-2 py-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors",
                isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Wallet, ArrowLeftRight, FileText, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"

const mobileNavItems = [
  {
    title: "Dashboard",
    href: "/business",
    icon: LayoutDashboard,
  },
  {
    title: "Accounts",
    href: "/business/accounts",
    icon: Wallet,
  },
  {
    title: "Transfers",
    href: "/business/transfers",
    icon: ArrowLeftRight,
  },
  {
    title: "Invoices",
    href: "/business/invoices",
    icon: FileText,
  },
  {
    title: "More",
    href: "/business/more",
    icon: MoreHorizontal,
  },
]

export function BusinessMobileNav() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200">
      <nav className="flex items-center justify-around py-2">
        {mobileNavItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/business" && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors min-w-0",
                isActive ? "text-green-600" : "text-gray-500 hover:text-gray-700",
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium truncate">{item.title}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  FileText,
  Users,
  PiggyBank,
  BarChart3,
  Settings,
  Building2,
} from "lucide-react"

import { cn } from "@/lib/utils"

const businessNavItems = [
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
    title: "Payroll",
    href: "/business/payroll",
    icon: Users,
  },
  {
    title: "Savings",
    href: "/business/savings",
    icon: PiggyBank,
  },
  {
    title: "Reports",
    href: "/business/reports",
    icon: BarChart3,
  },
  {
    title: "Team",
    href: "/business/team",
    icon: Settings,
  },
]

export function BusinessSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex items-center gap-2 p-6 border-b border-gray-200">
        <div className="flex items-center justify-center w-8 h-8 bg-green-600 rounded-lg">
          <Building2 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-gray-900">NaBank</h1>
          <p className="text-xs text-gray-500">Business</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {businessNavItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">BU</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Business User</p>
            <p className="text-xs text-gray-500 truncate">business@company.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}

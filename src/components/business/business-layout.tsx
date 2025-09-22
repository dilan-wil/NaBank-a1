"use client"

import type React from "react"
import { BusinessSidebar } from "./business-sidebar"
import { BusinessMobileNav } from "./business-mobile-nav"
import { useIsMobile } from "@/hooks/use-mobile"

interface BusinessLayoutProps {
  children: React.ReactNode
}

export function BusinessLayout({ children }: BusinessLayoutProps) {
  const isMobile = useIsMobile()

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      {!isMobile && <BusinessSidebar />}

      {/* Main Content */}
      <main className={cn("flex-1 overflow-auto", isMobile ? "pb-20" : "")}>{children}</main>

      {/* Mobile Bottom Navigation */}
      {isMobile && <BusinessMobileNav />}
    </div>
  )
}

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

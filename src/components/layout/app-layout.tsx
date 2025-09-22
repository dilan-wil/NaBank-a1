"use client"

import type React from "react"

import { AppSidebar } from "./app-sidebar"
import { MobileNav } from "./mobile-nav"
import { useIsMobile } from "@/hooks/use-mobile"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const isMobile = useIsMobile()

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      {!isMobile && <AppSidebar />}

      {/* Main Content */}
      <main className={cn("flex-1 overflow-auto", isMobile ? "pb-20" : "")}>{children}</main>

      {/* Mobile Bottom Navigation */}
      {isMobile && <MobileNav />}
    </div>
  )
}

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

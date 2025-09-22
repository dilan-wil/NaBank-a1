"use client"

import type React from "react"

import { AppLayout } from "@/components/layout/app-layout"
import { MoreMenuGrid } from "@/components/more/more-menu-grid"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LogOut, User } from "lucide-react"

interface MenuItem {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  href: string
}

export default function MorePage() {
  const handleItemSelect = (item: MenuItem) => {
    // Mock navigation
    console.log("Navigating to:", item.href)
    if (item.id === "logout") {
      // Mock logout
      window.location.href = "/auth/login"
    } else {
      // Mock navigation to other pages
      window.location.href = item.href
    }
  }

  const handleLogout = () => {
    // Mock logout
    window.location.href = "/auth/login"
  }

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">More</h1>
            <p className="text-muted-foreground">Account settings and additional features</p>
          </div>
        </div>

        {/* User Profile Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">John Doe</h3>
                  <p className="text-muted-foreground">john.doe@example.com</p>
                  <p className="text-sm text-muted-foreground">+237 6XX XXX XXX</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Verified
                    </Badge>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      Premium
                    </Badge>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => handleItemSelect({ id: "profile", href: "/profile" } as MenuItem)}
              >
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Menu Grid */}
        <MoreMenuGrid onItemSelect={handleItemSelect} />

        {/* Logout Section */}
        <Card className="border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <LogOut className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-medium">Sign Out</h3>
                  <p className="text-sm text-muted-foreground">Sign out of your NaBank account</p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
              >
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* App Info */}
        <div className="text-center text-sm text-muted-foreground space-y-1">
          <p>NaBank Mobile v2.1.0</p>
          <p>© 2024 NaBank. All rights reserved.</p>
        </div>
      </div>
    </AppLayout>
  )
}

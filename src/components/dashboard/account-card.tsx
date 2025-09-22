"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { formatCurrency, type Account } from "@/lib/mock-data"

interface AccountCardProps {
  account: Account
}

export function AccountCard({ account }: AccountCardProps) {
  const [showBalance, setShowBalance] = useState(true)

  return (
    <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium opacity-90">{account.name}</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowBalance(!showBalance)}
          className="h-8 w-8 p-0 text-primary-foreground hover:bg-primary-foreground/20"
        >
          {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {showBalance ? formatCurrency(account.balance, account.currency) : "••••••"}
        </div>
        <p className="text-xs opacity-75 mt-1">Account: {account.accountNumber}</p>
      </CardContent>
    </Card>
  )
}

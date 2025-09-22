"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Eye, EyeOff, ArrowUpRight, ArrowDownLeft } from "lucide-react"
import { useState } from "react"
import type { BusinessAccount } from "@/lib/business-mock-data"

interface AccountCardProps {
  account: BusinessAccount
  onViewTransactions?: (accountId: string) => void
  onDeposit?: (accountId: string) => void
  onWithdraw?: (accountId: string) => void
}

export function AccountCard({ account, onViewTransactions, onDeposit, onWithdraw }: AccountCardProps) {
  const [showBalance, setShowBalance] = useState(true)

  const getAccountTypeColor = (type: string) => {
    switch (type) {
      case "main":
        return "bg-blue-100 text-blue-800"
      case "project":
        return "bg-green-100 text-green-800"
      case "team":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "frozen":
        return "bg-yellow-100 text-yellow-800"
      case "closed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <CardTitle className="text-lg font-semibold text-gray-900">{account.name}</CardTitle>
          <Badge className={getAccountTypeColor(account.type)} variant="secondary">
            {account.type}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={getStatusColor(account.status)} variant="secondary">
            {account.status}
          </Badge>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Balance</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-gray-900">
                {showBalance ? `${account.balance.toLocaleString()} ${account.currency}` : "••••••"}
              </p>
              <Button variant="ghost" size="sm" onClick={() => setShowBalance(!showBalance)} className="p-1 h-auto">
                {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-500">
          <p>Account Number: {account.accountNumber}</p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 bg-transparent"
            onClick={() => onViewTransactions?.(account.id)}
          >
            View History
          </Button>
          <Button variant="outline" size="sm" onClick={() => onDeposit?.(account.id)}>
            <ArrowDownLeft className="w-4 h-4 mr-1" />
            Deposit
          </Button>
          <Button variant="outline" size="sm" onClick={() => onWithdraw?.(account.id)}>
            <ArrowUpRight className="w-4 h-4 mr-1" />
            Withdraw
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, CreditCard, Smartphone } from "lucide-react"
import { useState } from "react"
import { formatCurrency, type Card as CardType } from "@/lib/mock-data"

interface CardDisplayProps {
  card: CardType
  onAddMoney?: () => void
  onWithdraw?: () => void
  onManage?: () => void
}

export function CardDisplay({ card, onAddMoney, onWithdraw, onManage }: CardDisplayProps) {
  const [showBalance, setShowBalance] = useState(true)

  const getStatusColor = (status: CardType["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "blocked":
        return "bg-red-100 text-red-800"
      case "expired":
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCardGradient = (type: CardType["type"]) => {
    return type === "virtual"
      ? "bg-gradient-to-br from-blue-500 to-purple-600"
      : "bg-gradient-to-br from-gray-800 to-gray-900"
  }

  return (
    <div className="space-y-4">
      {/* Card Visual */}
      <Card className={`${getCardGradient(card.type)} text-white border-0 h-48 relative overflow-hidden`}>
        <CardContent className="p-6 h-full flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              {card.type === "virtual" ? <Smartphone className="h-5 w-5" /> : <CreditCard className="h-5 w-5" />}
              <span className="text-sm opacity-90">{card.type === "virtual" ? "Virtual" : "Physical"}</span>
            </div>
            <Badge className={getStatusColor(card.status)} variant="secondary">
              {card.status}
            </Badge>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm opacity-75">Card Balance</p>
              <div className="flex items-center gap-2">
                <p className="text-xl font-bold">
                  {showBalance ? formatCurrency(card.balance, card.currency) : "••••••"}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowBalance(!showBalance)}
                  className="h-6 w-6 p-0 text-white hover:bg-white/20"
                >
                  {showBalance ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                </Button>
              </div>
            </div>

            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm opacity-75">Card Number</p>
                <p className="font-mono">•••• •••• •••• {card.last4}</p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-75">Expires</p>
                <p className="font-mono">{card.expiryDate}</p>
              </div>
            </div>
          </div>

          {/* Card pattern overlay */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
            <div className="w-full h-full bg-white rounded-full transform translate-x-16 -translate-y-16"></div>
          </div>
        </CardContent>
      </Card>

      {/* Card Actions */}
      <div className="grid grid-cols-3 gap-2">
        <Button variant="outline" size="sm" onClick={onAddMoney} disabled={card.status !== "active"}>
          Add Money
        </Button>
        <Button variant="outline" size="sm" onClick={onWithdraw} disabled={card.status !== "active"}>
          Withdraw
        </Button>
        <Button variant="outline" size="sm" onClick={onManage}>
          Manage
        </Button>
      </div>
    </div>
  )
}

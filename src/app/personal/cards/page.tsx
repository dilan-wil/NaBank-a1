"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { CardDisplay } from "@/components/cards/card-display"
import { RequestCardDialog } from "@/components/cards/request-card-dialog"
import { CardTransactionDialog } from "@/components/cards/card-transaction-dialog"
import { mockCards, type Card as CardType } from "@/lib/mock-data"
import { CreditCard } from "lucide-react"

export default function CardsPage() {
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null)
  const [transactionType, setTransactionType] = useState<"add" | "withdraw">("add")
  const [showTransactionDialog, setShowTransactionDialog] = useState(false)

  const handleAddMoney = (card: CardType) => {
    setSelectedCard(card)
    setTransactionType("add")
    setShowTransactionDialog(true)
  }

  const handleWithdraw = (card: CardType) => {
    setSelectedCard(card)
    setTransactionType("withdraw")
    setShowTransactionDialog(true)
  }

  const handleManage = (card: CardType) => {
    // Mock card management
    console.log("Managing card:", card.id)
  }

  return (
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Cards</h1>
            <p className="text-muted-foreground">Manage your virtual and physical cards</p>
          </div>
        </div>

        {/* Request New Card */}
        <div className="max-w-sm">
          <RequestCardDialog />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCards.map((card) => (
            <CardDisplay
              key={card.id}
              card={card}
              onAddMoney={() => handleAddMoney(card)}
              onWithdraw={() => handleWithdraw(card)}
              onManage={() => handleManage(card)}
            />
          ))}
        </div>

        {/* Empty State */}
        {mockCards.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No cards yet</h3>
            <p className="text-muted-foreground mb-4">Request your first card to get started</p>
            <RequestCardDialog />
          </div>
        )}

        {/* Transaction Dialog */}
        {selectedCard && (
          <CardTransactionDialog
            open={showTransactionDialog}
            onOpenChange={setShowTransactionDialog}
            card={selectedCard}
            type={transactionType}
          />
        )}
      </div>
  )
}

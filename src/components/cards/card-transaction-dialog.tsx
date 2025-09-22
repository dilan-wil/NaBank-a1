"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatCurrency, mockAccounts, type Card as CardType } from "@/lib/mock-data"

interface CardTransactionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  card: CardType
  type: "add" | "withdraw"
}

export function CardTransactionDialog({ open, onOpenChange, card, type }: CardTransactionDialogProps) {
  const [amount, setAmount] = useState("")
  const [selectedAccount, setSelectedAccount] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock transaction
    console.log(`${type} money:`, { cardId: card.id, amount, accountId: selectedAccount })
    onOpenChange(false)
    // Reset form
    setAmount("")
    setSelectedAccount("")
  }

  const title = type === "add" ? "Add Money to Card" : "Withdraw from Card"
  const description =
    type === "add"
      ? `Transfer money from your account to ${card.name}`
      : `Transfer money from ${card.name} to your account`

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (XAF)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              min="1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="account">{type === "add" ? "From Account" : "To Account"}</Label>
            <Select value={selectedAccount} onValueChange={setSelectedAccount} required>
              <SelectTrigger>
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent>
                {mockAccounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.name} - {formatCurrency(account.balance, account.currency)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="bg-muted p-3 rounded-lg">
            <div className="flex justify-between text-sm">
              <span>Card Balance:</span>
              <span className="font-medium">{formatCurrency(card.balance, card.currency)}</span>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{type === "add" ? "Add Money" : "Withdraw"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

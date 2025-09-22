"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArrowUpRight, ArrowDownLeft } from "lucide-react"
import type { BusinessAccount } from "@/lib/business-mock-data"

interface AccountTransactionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  account: BusinessAccount | null
  type: "deposit" | "withdraw"
  onTransaction?: (data: any) => void
}

export function AccountTransactionDialog({
  open,
  onOpenChange,
  account,
  type,
  onTransaction,
}: AccountTransactionDialogProps) {
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    source: "",
    reference: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onTransaction?.({
      accountId: account?.id,
      type,
      ...formData,
      amount: Number.parseFloat(formData.amount),
    })
    onOpenChange(false)
    setFormData({ amount: "", description: "", source: "", reference: "" })
  }

  if (!account) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {type === "deposit" ? (
              <ArrowDownLeft className="w-5 h-5 text-green-600" />
            ) : (
              <ArrowUpRight className="w-5 h-5 text-red-600" />
            )}
            {type === "deposit" ? "Deposit Funds" : "Withdraw Funds"}
          </DialogTitle>
          <DialogDescription>
            {type === "deposit" ? "Add funds to" : "Withdraw funds from"} {account.name}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (XAF)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0"
              value={formData.amount}
              onChange={(e) => setFormData((prev) => ({ ...prev, amount: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder={`Reason for ${type}...`}
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              required
            />
          </div>

          {type === "deposit" && (
            <div className="space-y-2">
              <Label htmlFor="source">Source</Label>
              <Select
                value={formData.source}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, source: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="main">Main Business Account</SelectItem>
                  <SelectItem value="external">External Bank Transfer</SelectItem>
                  <SelectItem value="cash">Cash Deposit</SelectItem>
                  <SelectItem value="client">Client Payment</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="reference">Reference (Optional)</Label>
            <Input
              id="reference"
              placeholder="Transaction reference"
              value={formData.reference}
              onChange={(e) => setFormData((prev) => ({ ...prev, reference: e.target.value }))}
            />
          </div>

          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button
              type="submit"
              className={`flex-1 ${type === "deposit" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}
            >
              {type === "deposit" ? "Deposit" : "Withdraw"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

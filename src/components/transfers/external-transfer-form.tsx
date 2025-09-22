"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency, mockAccounts } from "@/lib/mock-data"

const externalBanks = [
  { id: "ecobank", name: "Ecobank Cameroon" },
  { id: "sgbc", name: "Société Générale" },
  { id: "bicec", name: "BICEC" },
  { id: "cca", name: "Crédit Communautaire d'Afrique" },
  { id: "uba", name: "UBA Cameroon" },
]

interface ExternalTransferFormProps {
  onSubmit: (data: any) => void
}

export function ExternalTransferForm({ onSubmit }: ExternalTransferFormProps) {
  const [formData, setFormData] = useState({
    fromAccount: "",
    recipientBank: "",
    recipientAccount: "",
    recipientName: "",
    amount: "",
    description: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      type: "external",
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>External Bank Transfer</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fromAccount">From Account</Label>
            <Select value={formData.fromAccount} onValueChange={(value) => handleInputChange("fromAccount", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select source account" />
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

          <div className="space-y-2">
            <Label htmlFor="recipientBank">Recipient Bank</Label>
            <Select value={formData.recipientBank} onValueChange={(value) => handleInputChange("recipientBank", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select bank" />
              </SelectTrigger>
              <SelectContent>
                {externalBanks.map((bank) => (
                  <SelectItem key={bank.id} value={bank.id}>
                    {bank.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="recipientName">Recipient Name</Label>
            <Input
              id="recipientName"
              placeholder="Full name as on bank account"
              value={formData.recipientName}
              onChange={(e) => handleInputChange("recipientName", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="recipientAccount">Recipient Account Number</Label>
            <Input
              id="recipientAccount"
              placeholder="Enter account number"
              value={formData.recipientAccount}
              onChange={(e) => handleInputChange("recipientAccount", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount (XAF)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0"
              value={formData.amount}
              onChange={(e) => handleInputChange("amount", e.target.value)}
              required
              min="1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="What's this transfer for?"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={3}
            />
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> External transfers may take 1-3 business days to process and may incur additional
              fees.
            </p>
          </div>

          <Button type="submit" className="w-full">
            Send Money
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

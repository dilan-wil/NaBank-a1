"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import { formatCurrency, mockAccounts } from "@/lib/mock-data"

interface BillCategory {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  cashback: number
}

interface BillPaymentFormProps {
  category: BillCategory
  onBack: () => void
  onSubmit: (data: any) => void
}

// Mock bill providers for each category
const billProviders: Record<string, Array<{ id: string; name: string; fields: string[] }>> = {
  electricity: [
    { id: "eneo", name: "ENEO Cameroon", fields: ["meter_number", "customer_name"] },
    { id: "aes", name: "AES Sonel", fields: ["account_number", "customer_name"] },
  ],
  water: [
    { id: "camwater", name: "Camwater", fields: ["customer_number", "customer_name"] },
    { id: "cde", name: "CDE", fields: ["account_number", "customer_name"] },
  ],
  tv: [
    { id: "dstv", name: "DSTV", fields: ["smartcard_number", "customer_name"] },
    { id: "startimes", name: "Startimes", fields: ["decoder_number", "customer_name"] },
    { id: "canal", name: "Canal+", fields: ["subscription_number", "customer_name"] },
  ],
  internet: [
    { id: "mtn_fiber", name: "MTN Fiber", fields: ["account_number", "customer_name"] },
    { id: "orange_fiber", name: "Orange Fiber", fields: ["customer_id", "customer_name"] },
    { id: "camtel", name: "Camtel", fields: ["line_number", "customer_name"] },
  ],
  airtime: [
    { id: "mtn", name: "MTN", fields: ["phone_number"] },
    { id: "orange", name: "Orange", fields: ["phone_number"] },
    { id: "camtel", name: "Camtel", fields: ["phone_number"] },
  ],
}

export function BillPaymentForm({ category, onBack, onSubmit }: BillPaymentFormProps) {
  const [formData, setFormData] = useState({
    provider: "",
    amount: "",
    account: "",
    meter_number: "",
    customer_number: "",
    account_number: "",
    smartcard_number: "",
    decoder_number: "",
    subscription_number: "",
    customer_id: "",
    line_number: "",
    phone_number: "",
    customer_name: "",
  })

  const providers = billProviders[category.id] || []
  const selectedProvider = providers.find((p) => p.id === formData.provider)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const cashbackAmount = (Number(formData.amount) * category.cashback) / 100
    onSubmit({
      ...formData,
      category: category.id,
      categoryName: category.name,
      providerName: selectedProvider?.name,
      cashbackAmount,
      cashbackRate: category.cashback,
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${category.color} flex items-center justify-center`}>
              <category.icon className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>{category.name} Payment</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {category.cashback}% Cashback
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="account">From Account</Label>
            <Select value={formData.account} onValueChange={(value) => handleInputChange("account", value)}>
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

          <div className="space-y-2">
            <Label htmlFor="provider">Service Provider</Label>
            <Select value={formData.provider} onValueChange={(value) => handleInputChange("provider", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select provider" />
              </SelectTrigger>
              <SelectContent>
                {providers.map((provider) => (
                  <SelectItem key={provider.id} value={provider.id}>
                    {provider.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Dynamic fields based on selected provider */}
          {selectedProvider?.fields.map((field) => (
            <div key={field} className="space-y-2">
              <Label htmlFor={field}>
                {field
                  .split("_")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </Label>
              <Input
                id={field}
                placeholder={`Enter ${field.replace("_", " ")}`}
                value={formData[field as keyof typeof formData]}
                onChange={(e) => handleInputChange(field, e.target.value)}
                required
              />
            </div>
          ))}

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

          {formData.amount && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-green-800">Cashback Reward:</span>
                <span className="font-medium text-green-800">
                  {formatCurrency((Number(formData.amount) * category.cashback) / 100)}
                </span>
              </div>
            </div>
          )}

          <Button type="submit" className="w-full">
            Pay Bill
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

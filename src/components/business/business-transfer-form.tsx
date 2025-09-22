"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { businessAccounts } from "@/lib/business-mock-data"

interface BusinessTransferFormProps {
  transferType: string
  onSubmit: (data: any) => void
  onBack: () => void
}

export function BusinessTransferForm({ transferType, onSubmit, onBack }: BusinessTransferFormProps) {
  const [formData, setFormData] = useState({
    fromAccount: "",
    toAccount: "",
    amount: "",
    description: "",
    reference: "",
    // External bank specific
    bankName: "",
    accountNumber: "",
    accountName: "",
    // Mobile money specific
    provider: "",
    phoneNumber: "",
    recipientName: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ ...formData, transferType })
  }

  const renderNaBankForm = () => (
    <>
      <div className="space-y-2">
        <Label htmlFor="toAccount">Recipient Business Account</Label>
        <Input
          id="toAccount"
          placeholder="Enter NaBank business account number"
          value={formData.toAccount}
          onChange={(e) => setFormData((prev) => ({ ...prev, toAccount: e.target.value }))}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="recipientName">Recipient Business Name</Label>
        <Input
          id="recipientName"
          placeholder="Business name for verification"
          value={formData.recipientName}
          onChange={(e) => setFormData((prev) => ({ ...prev, recipientName: e.target.value }))}
          required
        />
      </div>
    </>
  )

  const renderExternalForm = () => (
    <>
      <div className="space-y-2">
        <Label htmlFor="bankName">Bank Name</Label>
        <Select
          value={formData.bankName}
          onValueChange={(value) => setFormData((prev) => ({ ...prev, bankName: value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select bank" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bicec">BICEC</SelectItem>
            <SelectItem value="sgbc">SGBC</SelectItem>
            <SelectItem value="uba">UBA</SelectItem>
            <SelectItem value="ecobank">Ecobank</SelectItem>
            <SelectItem value="cca">CCA Bank</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="accountNumber">Account Number</Label>
        <Input
          id="accountNumber"
          placeholder="Recipient account number"
          value={formData.accountNumber}
          onChange={(e) => setFormData((prev) => ({ ...prev, accountNumber: e.target.value }))}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="accountName">Account Name</Label>
        <Input
          id="accountName"
          placeholder="Account holder name"
          value={formData.accountName}
          onChange={(e) => setFormData((prev) => ({ ...prev, accountName: e.target.value }))}
          required
        />
      </div>
    </>
  )

  const renderMobileForm = () => (
    <>
      <div className="space-y-2">
        <Label htmlFor="provider">Mobile Money Provider</Label>
        <Select
          value={formData.provider}
          onValueChange={(value) => setFormData((prev) => ({ ...prev, provider: value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select provider" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mtn">MTN Mobile Money</SelectItem>
            <SelectItem value="orange">Orange Money</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          id="phoneNumber"
          placeholder="+237 6XX XXX XXX"
          value={formData.phoneNumber}
          onChange={(e) => setFormData((prev) => ({ ...prev, phoneNumber: e.target.value }))}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="recipientName">Recipient Name</Label>
        <Input
          id="recipientName"
          placeholder="Mobile money account name"
          value={formData.recipientName}
          onChange={(e) => setFormData((prev) => ({ ...prev, recipientName: e.target.value }))}
          required
        />
      </div>
    </>
  )

  const getFormTitle = () => {
    switch (transferType) {
      case "nabank":
        return "NaBank Business Transfer"
      case "external":
        return "External Bank Transfer"
      case "mobile":
        return "Mobile Money Transfer"
      default:
        return "Transfer"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{getFormTitle()}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fromAccount">From Account</Label>
            <Select
              value={formData.fromAccount}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, fromAccount: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select source account" />
              </SelectTrigger>
              <SelectContent>
                {businessAccounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.name} - {account.balance.toLocaleString()} XAF
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {transferType === "nabank" && renderNaBankForm()}
          {transferType === "external" && renderExternalForm()}
          {transferType === "mobile" && renderMobileForm()}

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
              placeholder="Purpose of transfer..."
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              required
            />
          </div>

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
            <Button type="button" variant="outline" onClick={onBack} className="flex-1 bg-transparent">
              Back
            </Button>
            <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
              Continue
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

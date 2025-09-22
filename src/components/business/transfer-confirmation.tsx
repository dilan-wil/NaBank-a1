"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight, Building2, Landmark, Smartphone } from "lucide-react"
import { businessAccounts } from "@/lib/business-mock-data"

interface TransferConfirmationProps {
  transferData: any
  onConfirm: () => void
  onBack: () => void
}

export function TransferConfirmation({ transferData, onConfirm, onBack }: TransferConfirmationProps) {
  const sourceAccount = businessAccounts.find((acc) => acc.id === transferData.fromAccount)

  const getTransferIcon = () => {
    switch (transferData.transferType) {
      case "nabank":
        return <Building2 className="w-5 h-5 text-green-600" />
      case "external":
        return <Landmark className="w-5 h-5 text-blue-600" />
      case "mobile":
        return <Smartphone className="w-5 h-5 text-purple-600" />
      default:
        return <ArrowRight className="w-5 h-5" />
    }
  }

  const getRecipientInfo = () => {
    switch (transferData.transferType) {
      case "nabank":
        return (
          <div>
            <p className="font-medium">{transferData.recipientName}</p>
            <p className="text-sm text-gray-500">Account: {transferData.toAccount}</p>
          </div>
        )
      case "external":
        return (
          <div>
            <p className="font-medium">{transferData.accountName}</p>
            <p className="text-sm text-gray-500">
              {transferData.bankName} - {transferData.accountNumber}
            </p>
          </div>
        )
      case "mobile":
        return (
          <div>
            <p className="font-medium">{transferData.recipientName}</p>
            <p className="text-sm text-gray-500">
              {transferData.provider.toUpperCase()} - {transferData.phoneNumber}
            </p>
          </div>
        )
      default:
        return null
    }
  }

  const calculateFee = () => {
    const amount = Number.parseFloat(transferData.amount)
    switch (transferData.transferType) {
      case "nabank":
        return 0 // Free for NaBank transfers
      case "external":
        return Math.max(500, amount * 0.005) // 0.5% with minimum 500 XAF
      case "mobile":
        return Math.max(200, amount * 0.002) // 0.2% with minimum 200 XAF
      default:
        return 0
    }
  }

  const fee = calculateFee()
  const total = Number.parseFloat(transferData.amount) + fee

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getTransferIcon()}
          Confirm Transfer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Transfer Summary */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">From</span>
            <div className="text-right">
              <p className="font-medium">{sourceAccount?.name}</p>
              <p className="text-sm text-gray-500">{sourceAccount?.accountNumber}</p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <ArrowRight className="w-5 h-5 text-gray-400" />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">To</span>
            <div className="text-right">{getRecipientInfo()}</div>
          </div>
        </div>

        {/* Amount Breakdown */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Transfer Amount</span>
            <span className="font-medium">{Number.parseFloat(transferData.amount).toLocaleString()} XAF</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Transfer Fee</span>
            <span className="font-medium">
              {fee === 0 ? (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Free
                </Badge>
              ) : (
                `${fee.toLocaleString()} XAF`
              )}
            </span>
          </div>
          <div className="border-t pt-3 flex justify-between">
            <span className="font-semibold">Total Amount</span>
            <span className="font-semibold text-lg">{total.toLocaleString()} XAF</span>
          </div>
        </div>

        {/* Transfer Details */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Description</span>
            <span className="font-medium text-right max-w-48 truncate">{transferData.description}</span>
          </div>
          {transferData.reference && (
            <div className="flex justify-between">
              <span className="text-gray-600">Reference</span>
              <span className="font-medium">{transferData.reference}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={onBack} className="flex-1 bg-transparent">
            Back
          </Button>
          <Button onClick={onConfirm} className="flex-1 bg-green-600 hover:bg-green-700">
            <CheckCircle className="w-4 h-4 mr-2" />
            Confirm Transfer
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

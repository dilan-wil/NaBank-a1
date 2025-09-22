"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Gift } from "lucide-react"
import { formatCurrency } from "@/lib/mock-data"

interface PaymentConfirmationProps {
  paymentData: any
  onConfirm: () => void
  onEdit: () => void
}

export function PaymentConfirmation({ paymentData, onConfirm, onEdit }: PaymentConfirmationProps) {
  return (
    <Card>
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-primary" />
          </div>
        </div>
        <CardTitle>Confirm Payment</CardTitle>
        <p className="text-muted-foreground">Please review your bill payment details</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Bill Type</span>
            <Badge variant="secondary">{paymentData.categoryName}</Badge>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{formatCurrency(Number(paymentData.amount))}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Provider</span>
            <span className="text-sm font-medium">{paymentData.providerName}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">From Account</span>
            <span className="text-sm font-medium">Main Account</span>
          </div>

          {paymentData.customer_name && (
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Customer Name</span>
              <span className="text-sm font-medium">{paymentData.customer_name}</span>
            </div>
          )}

          {paymentData.phone_number && (
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Phone Number</span>
              <span className="text-sm font-medium">{paymentData.phone_number}</span>
            </div>
          )}

          {(paymentData.meter_number ||
            paymentData.customer_number ||
            paymentData.account_number ||
            paymentData.smartcard_number ||
            paymentData.decoder_number) && (
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Account/Reference</span>
              <span className="text-sm font-medium">
                {paymentData.meter_number ||
                  paymentData.customer_number ||
                  paymentData.account_number ||
                  paymentData.smartcard_number ||
                  paymentData.decoder_number}
              </span>
            </div>
          )}
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Bill Amount</span>
            <span>{formatCurrency(Number(paymentData.amount))}</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span className="flex items-center gap-1">
              <Gift className="h-4 w-4" />
              Cashback ({paymentData.cashbackRate}%)
            </span>
            <span>+{formatCurrency(paymentData.cashbackAmount)}</span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between font-medium">
          <span>Total to Pay</span>
          <span>{formatCurrency(Number(paymentData.amount))}</span>
        </div>

        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={onEdit} className="flex-1 bg-transparent">
            Edit Payment
          </Button>
          <Button onClick={onConfirm} className="flex-1">
            <CheckCircle className="h-4 w-4 mr-2" />
            Confirm Payment
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

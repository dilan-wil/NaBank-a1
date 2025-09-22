"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, ArrowLeft, Copy } from "lucide-react"
import { useState } from "react"

interface TransferSuccessProps {
  transferData: any
  transactionId: string
  onNewTransfer: () => void
  onBackToDashboard: () => void
}

export function TransferSuccess({
  transferData,
  transactionId,
  onNewTransfer,
  onBackToDashboard,
}: TransferSuccessProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyId = () => {
    navigator.clipboard.writeText(transactionId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownloadReceipt = () => {
    // Mock implementation - would generate and download PDF receipt
    console.log("Downloading receipt for transaction:", transactionId)
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <CardTitle className="text-xl text-green-600">Transfer Successful!</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">
            {Number.parseFloat(transferData.amount).toLocaleString()} XAF
          </p>
          <p className="text-gray-600 mt-1">has been transferred successfully</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Transaction ID</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm">{transactionId}</span>
              <Button variant="ghost" size="sm" onClick={handleCopyId} className="p-1 h-auto">
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
          {copied && <p className="text-xs text-green-600 text-right">Copied!</p>}

          <div className="flex justify-between">
            <span className="text-gray-600">Status</span>
            <span className="font-medium text-green-600">Completed</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Date & Time</span>
            <span className="font-medium">{new Date().toLocaleString()}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Button onClick={handleDownloadReceipt} variant="outline" className="w-full bg-transparent">
            <Download className="w-4 h-4 mr-2" />
            Download Receipt
          </Button>

          <div className="flex gap-2">
            <Button onClick={onBackToDashboard} variant="outline" className="flex-1 bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            <Button onClick={onNewTransfer} className="flex-1 bg-green-600 hover:bg-green-700">
              New Transfer
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

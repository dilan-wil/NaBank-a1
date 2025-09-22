"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { QrCode, Copy, Download, Share } from "lucide-react"
import type { Invoice } from "@/lib/business-mock-data"

interface InvoiceQRDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  invoice: Invoice | null
}

export function InvoiceQRDialog({ open, onOpenChange, invoice }: InvoiceQRDialogProps) {
  const [copied, setCopied] = useState(false)

  if (!invoice) return null

  const paymentLink = `https://nabank.cm/pay/${invoice.id}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(paymentLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownloadQR = () => {
    // Mock implementation - would generate and download QR code image
    console.log("Downloading QR code for invoice:", invoice.id)
  }

  const handleShareQR = () => {
    // Mock implementation - would open share dialog
    console.log("Sharing QR code for invoice:", invoice.id)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-green-600" />
            Payment QR Code
          </DialogTitle>
          <DialogDescription>Share this QR code or link with your client for easy payment</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* QR Code Display */}
          <div className="flex justify-center">
            <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center">
                <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">QR Code</p>
                <p className="text-xs text-gray-400">Invoice #{invoice.invoiceNumber}</p>
              </div>
            </div>
          </div>

          {/* Invoice Details */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Invoice</span>
              <span className="font-medium">{invoice.invoiceNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Amount</span>
              <span className="font-medium">
                {invoice.amount.toLocaleString()} {invoice.currency}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Client</span>
              <span className="font-medium">{invoice.clientName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Due Date</span>
              <span className="font-medium">{new Date(invoice.dueDate).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Payment Link */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Payment Link</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={paymentLink}
                readOnly
                className="flex-1 px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-md"
              />
              <Button variant="outline" size="sm" onClick={handleCopyLink}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            {copied && <p className="text-xs text-green-600">Link copied!</p>}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleDownloadQR} className="flex-1 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" onClick={handleShareQR} className="flex-1 bg-transparent">
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

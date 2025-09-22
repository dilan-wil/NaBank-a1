"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Eye, Send, Download, QrCode } from "lucide-react"
import type { Invoice } from "@/lib/business-mock-data"

interface InvoiceCardProps {
  invoice: Invoice
  onView?: (invoice: Invoice) => void
  onSend?: (invoice: Invoice) => void
  onDownload?: (invoice: Invoice) => void
  onGenerateQR?: (invoice: Invoice) => void
}

export function InvoiceCard({ invoice, onView, onSend, onDownload, onGenerateQR }: InvoiceCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "sent":
        return "bg-blue-100 text-blue-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const isOverdue = new Date(invoice.dueDate) < new Date() && invoice.status !== "paid"

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-semibold text-gray-900">{invoice.invoiceNumber}</CardTitle>
          <p className="text-sm text-gray-600">{invoice.clientName}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={getStatusColor(isOverdue ? "overdue" : invoice.status)} variant="secondary">
            {isOverdue ? "Overdue" : invoice.status}
          </Badge>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Amount</p>
            <p className="text-2xl font-bold text-gray-900">
              {invoice.amount.toLocaleString()} {invoice.currency}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Due Date</p>
            <p className="font-medium text-gray-900">{new Date(invoice.dueDate).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="text-sm text-gray-500">
          <p>Client: {invoice.clientEmail}</p>
          <p>Created: {new Date(invoice.createdAt).toLocaleDateString()}</p>
          {invoice.paidAt && <p>Paid: {new Date(invoice.paidAt).toLocaleDateString()}</p>}
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onView?.(invoice)} className="bg-transparent">
            <Eye className="w-4 h-4 mr-1" />
            View
          </Button>
          {invoice.status === "draft" && (
            <Button variant="outline" size="sm" onClick={() => onSend?.(invoice)}>
              <Send className="w-4 h-4 mr-1" />
              Send
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={() => onGenerateQR?.(invoice)}>
            <QrCode className="w-4 h-4 mr-1" />
            QR
          </Button>
          <Button variant="outline" size="sm" onClick={() => onDownload?.(invoice)}>
            <Download className="w-4 h-4 mr-1" />
            PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

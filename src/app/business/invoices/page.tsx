"use client"

import { useState } from "react"
import { BusinessLayout } from "@/components/business/business-layout"
import { InvoiceCard } from "@/components/business/invoice-card"
import { CreateInvoiceDialog } from "@/components/business/create-invoice-dialog"
import { InvoiceQRDialog } from "@/components/business/invoice-qr-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, FileText, DollarSign, Clock, CheckCircle } from "lucide-react"
import { invoices, type Invoice } from "@/lib/business-mock-data"

export default function BusinessInvoicesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [qrDialog, setQrDialog] = useState<{
    open: boolean
    invoice: Invoice | null
  }>({
    open: false,
    invoice: null,
  })

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || invoice.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const totalInvoices = invoices.length
  const paidInvoices = invoices.filter((inv) => inv.status === "paid").length
  const pendingInvoices = invoices.filter((inv) => inv.status === "sent").length
  const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0)
  const paidAmount = invoices.filter((inv) => inv.status === "paid").reduce((sum, inv) => sum + inv.amount, 0)

  const handleView = (invoice: Invoice) => {
    console.log("View invoice:", invoice.id)
    // Mock implementation - would open invoice detail view
  }

  const handleSend = (invoice: Invoice) => {
    console.log("Send invoice:", invoice.id)
    // Mock implementation - would send invoice to client
  }

  const handleDownload = (invoice: Invoice) => {
    console.log("Download invoice:", invoice.id)
    // Mock implementation - would generate and download PDF
  }

  const handleGenerateQR = (invoice: Invoice) => {
    setQrDialog({
      open: true,
      invoice,
    })
  }

  const handleCreateInvoice = (invoiceData: any) => {
    console.log("Create invoice:", invoiceData)
    // Mock implementation - would create new invoice
  }

  return (
    <BusinessLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Invoice Management</h1>
            <p className="text-gray-600">Create, track, and manage your business invoices</p>
          </div>
          <CreateInvoiceDialog onCreateInvoice={handleCreateInvoice} />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Invoices</CardTitle>
              <FileText className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{totalInvoices}</div>
              <p className="text-xs text-gray-500 mt-1">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Amount</CardTitle>
              <DollarSign className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{totalAmount.toLocaleString()} XAF</div>
              <p className="text-xs text-green-600 mt-1">+{paidAmount.toLocaleString()} paid</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Paid Invoices</CardTitle>
              <CheckCircle className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{paidInvoices}</div>
              <p className="text-xs text-gray-500 mt-1">
                {Math.round((paidInvoices / totalInvoices) * 100)}% completion rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
              <Clock className="w-4 h-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{pendingInvoices}</div>
              <p className="text-xs text-gray-500 mt-1">Awaiting payment</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Invoice Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search invoices or clients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Invoices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInvoices.map((invoice) => (
            <InvoiceCard
              key={invoice.id}
              invoice={invoice}
              onView={handleView}
              onSend={handleSend}
              onDownload={handleDownload}
              onGenerateQR={handleGenerateQR}
            />
          ))}
        </div>

        {filteredInvoices.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500">No invoices found matching your criteria.</p>
            </CardContent>
          </Card>
        )}

        {/* QR Code Dialog */}
        <InvoiceQRDialog
          open={qrDialog.open}
          onOpenChange={(open) => setQrDialog((prev) => ({ ...prev, open }))}
          invoice={qrDialog.invoice}
        />
      </div>
    </BusinessLayout>
  )
}

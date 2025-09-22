"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { adminTransactions } from "@/lib/admin-mock-data"
import { Search, Eye, Flag, Download, AlertTriangle } from "lucide-react"

export function TransactionTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null)

  const filteredTransactions = adminTransactions.filter((transaction) => {
    const matchesSearch =
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter
    const matchesType = typeFilter === "all" || transaction.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Completed
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Pending
          </Badge>
        )
      case "failed":
        return <Badge variant="destructive">Failed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "transfer":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            Transfer
          </Badge>
        )
      case "deposit":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700">
            Deposit
          </Badge>
        )
      case "withdrawal":
        return (
          <Badge variant="outline" className="bg-orange-50 text-orange-700">
            Withdrawal
          </Badge>
        )
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  const handleExportReports = () => {
    // Mock export functionality
    alert("Transaction reports exported successfully!")
  }

  const handleFlagTransaction = (transactionId: string) => {
    // Mock flag functionality
    alert(`Transaction ${transactionId} has been flagged for review`)
  }

  return (
    <div className="space-y-4">
      {/* Filters and Actions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Transaction Oversight</CardTitle>
            <Button onClick={handleExportReports} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Reports
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by ID, user, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="transfer">Transfer</SelectItem>
                <SelectItem value="deposit">Deposit</SelectItem>
                <SelectItem value="withdrawal">Withdrawal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Flags</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-mono text-sm">{transaction.id}</TableCell>
                  <TableCell>
                    <div className="font-medium">{transaction.userName}</div>
                    <div className="text-sm text-muted-foreground">ID: {transaction.userId}</div>
                  </TableCell>
                  <TableCell>{getTypeBadge(transaction.type)}</TableCell>
                  <TableCell className="font-medium">₣{transaction.amount.toLocaleString()}</TableCell>
                  <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>
                    {transaction.flagged && (
                      <Badge variant="destructive" className="gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        Flagged
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedTransaction(transaction)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Transaction Details</DialogTitle>
                            <DialogDescription>
                              Complete transaction information and oversight actions
                            </DialogDescription>
                          </DialogHeader>
                          {selectedTransaction && (
                            <div className="space-y-6">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-medium mb-2">Transaction Information</h4>
                                  <div className="space-y-2 text-sm">
                                    <div>
                                      <span className="font-medium">ID:</span> {selectedTransaction.id}
                                    </div>
                                    <div>
                                      <span className="font-medium">Type:</span> {selectedTransaction.type}
                                    </div>
                                    <div>
                                      <span className="font-medium">Amount:</span> ₣
                                      {selectedTransaction.amount.toLocaleString()}
                                    </div>
                                    <div>
                                      <span className="font-medium">Status:</span>{" "}
                                      {getStatusBadge(selectedTransaction.status)}
                                    </div>
                                    <div>
                                      <span className="font-medium">Date:</span> {selectedTransaction.date}
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-2">User Information</h4>
                                  <div className="space-y-2 text-sm">
                                    <div>
                                      <span className="font-medium">User:</span> {selectedTransaction.userName}
                                    </div>
                                    <div>
                                      <span className="font-medium">User ID:</span> {selectedTransaction.userId}
                                    </div>
                                    <div>
                                      <span className="font-medium">Description:</span>{" "}
                                      {selectedTransaction.description}
                                    </div>
                                    <div>
                                      <span className="font-medium">Flagged:</span>{" "}
                                      {selectedTransaction.flagged ? "Yes" : "No"}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="flex gap-2 pt-4 border-t">
                                {!selectedTransaction.flagged && (
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleFlagTransaction(selectedTransaction.id)}
                                  >
                                    <Flag className="h-4 w-4 mr-2" />
                                    Flag as Suspicious
                                  </Button>
                                )}
                                <Button size="sm" variant="outline">
                                  <Download className="h-4 w-4 mr-2" />
                                  Export Details
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      {!transaction.flagged && (
                        <Button variant="ghost" size="sm" onClick={() => handleFlagTransaction(transaction.id)}>
                          <Flag className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

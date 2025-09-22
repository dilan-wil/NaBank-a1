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
import { adminLoans } from "@/lib/admin-mock-data"
import { Search, Eye, CheckCircle, XCircle, Download } from "lucide-react"

export function LoanManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedLoan, setSelectedLoan] = useState<any>(null)

  const filteredLoans = adminLoans.filter((loan) => {
    const matchesSearch =
      loan.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.purpose.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || loan.status === statusFilter
    const matchesType = typeFilter === "all" || loan.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Approved
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Pending
          </Badge>
        )
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "personal":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            Personal
          </Badge>
        )
      case "business":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700">
            Business
          </Badge>
        )
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  const handleApproveLoan = (loanId: string) => {
    alert(`Loan ${loanId} has been approved`)
  }

  const handleRejectLoan = (loanId: string) => {
    alert(`Loan ${loanId} has been rejected`)
  }

  const handleExportReports = () => {
    alert("Loan reports exported successfully!")
  }

  return (
    <div className="space-y-4">
      {/* Header and Actions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Loan Management</CardTitle>
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
                placeholder="Search loans..."
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
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="business">Business</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Loans Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Loan ID</TableHead>
                <TableHead>Applicant</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Application Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLoans.map((loan) => (
                <TableRow key={loan.id}>
                  <TableCell className="font-mono text-sm">{loan.id}</TableCell>
                  <TableCell>
                    <div className="font-medium">{loan.userName}</div>
                    <div className="text-sm text-muted-foreground">ID: {loan.userId}</div>
                  </TableCell>
                  <TableCell>{getTypeBadge(loan.type)}</TableCell>
                  <TableCell className="font-medium">₣{loan.amount.toLocaleString()}</TableCell>
                  <TableCell>{loan.purpose}</TableCell>
                  <TableCell>{getStatusBadge(loan.status)}</TableCell>
                  <TableCell>{loan.applicationDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedLoan(loan)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Loan Application Details</DialogTitle>
                            <DialogDescription>Complete loan information and approval actions</DialogDescription>
                          </DialogHeader>
                          {selectedLoan && (
                            <div className="space-y-6">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-medium mb-2">Loan Information</h4>
                                  <div className="space-y-2 text-sm">
                                    <div>
                                      <span className="font-medium">ID:</span> {selectedLoan.id}
                                    </div>
                                    <div>
                                      <span className="font-medium">Type:</span> {selectedLoan.type}
                                    </div>
                                    <div>
                                      <span className="font-medium">Amount:</span> ₣
                                      {selectedLoan.amount.toLocaleString()}
                                    </div>
                                    <div>
                                      <span className="font-medium">Purpose:</span> {selectedLoan.purpose}
                                    </div>
                                    <div>
                                      <span className="font-medium">Status:</span> {getStatusBadge(selectedLoan.status)}
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-2">Repayment Details</h4>
                                  <div className="space-y-2 text-sm">
                                    <div>
                                      <span className="font-medium">Period:</span> {selectedLoan.repaymentPeriod} months
                                    </div>
                                    <div>
                                      <span className="font-medium">Monthly Payment:</span> ₣
                                      {selectedLoan.monthlyPayment.toLocaleString()}
                                    </div>
                                    <div>
                                      <span className="font-medium">Application Date:</span>{" "}
                                      {selectedLoan.applicationDate}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-medium mb-2">Applicant Information</h4>
                                <div className="space-y-2 text-sm">
                                  <div>
                                    <span className="font-medium">Name:</span> {selectedLoan.userName}
                                  </div>
                                  <div>
                                    <span className="font-medium">User ID:</span> {selectedLoan.userId}
                                  </div>
                                </div>
                              </div>

                              <div className="flex gap-2 pt-4 border-t">
                                {selectedLoan.status === "pending" && (
                                  <>
                                    <Button
                                      size="sm"
                                      className="bg-green-600 hover:bg-green-700"
                                      onClick={() => handleApproveLoan(selectedLoan.id)}
                                    >
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Approve Loan
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="destructive"
                                      onClick={() => handleRejectLoan(selectedLoan.id)}
                                    >
                                      <XCircle className="h-4 w-4 mr-2" />
                                      Reject Loan
                                    </Button>
                                  </>
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

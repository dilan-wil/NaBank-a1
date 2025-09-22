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
import { adminAlerts } from "@/lib/admin-mock-data"
import { Search, Eye, CheckCircle, Clock } from "lucide-react"

export function AMLAlertsTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedAlert, setSelectedAlert] = useState<any>(null)

  const filteredAlerts = adminAlerts.filter((alert) => {
    const matchesSearch =
      alert.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSeverity = severityFilter === "all" || alert.severity === severityFilter
    const matchesStatus = statusFilter === "all" || alert.status === statusFilter

    return matchesSearch && matchesSeverity && matchesStatus
  })

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "medium":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Medium
          </Badge>
        )
      case "low":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            Low
          </Badge>
        )
      default:
        return <Badge variant="outline">{severity}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Pending
          </Badge>
        )
      case "investigated":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            Investigated
          </Badge>
        )
      case "resolved":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Resolved
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleResolveAlert = (alertId: string) => {
    alert(`Alert ${alertId} has been marked as resolved`)
  }

  const handleInvestigateAlert = (alertId: string) => {
    alert(`Alert ${alertId} is now under investigation`)
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>AML / Fraud Monitoring</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search alerts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="investigated">Investigated</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Alerts Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Alert ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAlerts.map((alertItem) => (
                <TableRow key={alertItem.id}>
                  <TableCell className="font-mono text-sm">{alertItem.id}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {alertItem.type.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{alertItem.userName}</div>
                    <div className="text-sm text-muted-foreground">ID: {alertItem.userId}</div>
                  </TableCell>
                  <TableCell>{getSeverityBadge(alertItem.severity)}</TableCell>
                  <TableCell className="font-medium">
                    {alertItem.amount ? `₣${alertItem.amount.toLocaleString()}` : "-"}
                  </TableCell>
                  <TableCell>{alertItem.date}</TableCell>
                  <TableCell>{getStatusBadge(alertItem.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedAlert(alertItem)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Alert Details</DialogTitle>
                            <DialogDescription>AML/Fraud alert information and investigation actions</DialogDescription>
                          </DialogHeader>
                          {selectedAlert && (
                            <div className="space-y-6">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-medium mb-2">Alert Information</h4>
                                  <div className="space-y-2 text-sm">
                                    <div>
                                      <span className="font-medium">ID:</span> {selectedAlert.id}
                                    </div>
                                    <div>
                                      <span className="font-medium">Type:</span> {selectedAlert.type.replace("_", " ")}
                                    </div>
                                    <div>
                                      <span className="font-medium">Severity:</span>{" "}
                                      {getSeverityBadge(selectedAlert.severity)}
                                    </div>
                                    <div>
                                      <span className="font-medium">Date:</span> {selectedAlert.date}
                                    </div>
                                    <div>
                                      <span className="font-medium">Status:</span>{" "}
                                      {getStatusBadge(selectedAlert.status)}
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-2">User & Transaction</h4>
                                  <div className="space-y-2 text-sm">
                                    <div>
                                      <span className="font-medium">User:</span> {selectedAlert.userName}
                                    </div>
                                    <div>
                                      <span className="font-medium">User ID:</span> {selectedAlert.userId}
                                    </div>
                                    {selectedAlert.amount && (
                                      <div>
                                        <span className="font-medium">Amount:</span> ₣
                                        {selectedAlert.amount.toLocaleString()}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-medium mb-2">Description</h4>
                                <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                                  {selectedAlert.description}
                                </p>
                              </div>

                              <div className="flex gap-2 pt-4 border-t">
                                {selectedAlert.status === "pending" && (
                                  <Button size="sm" onClick={() => handleInvestigateAlert(selectedAlert.id)}>
                                    <Clock className="h-4 w-4 mr-2" />
                                    Start Investigation
                                  </Button>
                                )}
                                {selectedAlert.status !== "resolved" && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleResolveAlert(selectedAlert.id)}
                                  >
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Mark Resolved
                                  </Button>
                                )}
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

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
import { adminUsers } from "@/lib/admin-mock-data"
import { Search, Eye, UserCheck, UserX, Lock, Unlock } from "lucide-react"

export function UserTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<any>(null)

  const filteredUsers = adminUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.kycStatus === statusFilter
    const matchesType = typeFilter === "all" || user.type === typeFilter

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

  const getAccountStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Active
          </Badge>
        )
      case "frozen":
        return <Badge variant="destructive">Frozen</Badge>
      case "suspended":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            Suspended
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="KYC Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Account Type" />
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

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>KYC Status</TableHead>
                <TableHead>Account Status</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                      <div className="text-sm text-muted-foreground">{user.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {user.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(user.kycStatus)}</TableCell>
                  <TableCell>{getAccountStatusBadge(user.accountStatus)}</TableCell>
                  <TableCell className="font-medium">₣{user.balance.toLocaleString()}</TableCell>
                  <TableCell>{user.joinDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedUser(user)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>User Details</DialogTitle>
                            <DialogDescription>Complete user information and account management</DialogDescription>
                          </DialogHeader>
                          {selectedUser && (
                            <div className="space-y-6">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-medium mb-2">Personal Information</h4>
                                  <div className="space-y-2 text-sm">
                                    <div>
                                      <span className="font-medium">Name:</span> {selectedUser.name}
                                    </div>
                                    <div>
                                      <span className="font-medium">Email:</span> {selectedUser.email}
                                    </div>
                                    <div>
                                      <span className="font-medium">Phone:</span> {selectedUser.phone}
                                    </div>
                                    <div>
                                      <span className="font-medium">Type:</span> {selectedUser.type}
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-2">Account Information</h4>
                                  <div className="space-y-2 text-sm">
                                    <div>
                                      <span className="font-medium">Balance:</span> ₣
                                      {selectedUser.balance.toLocaleString()}
                                    </div>
                                    <div>
                                      <span className="font-medium">Join Date:</span> {selectedUser.joinDate}
                                    </div>
                                    <div>
                                      <span className="font-medium">Last Login:</span> {selectedUser.lastLogin}
                                    </div>
                                    <div>
                                      <span className="font-medium">KYC Status:</span>{" "}
                                      {getStatusBadge(selectedUser.kycStatus)}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="flex gap-2 pt-4 border-t">
                                {selectedUser.kycStatus === "pending" && (
                                  <>
                                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                      <UserCheck className="h-4 w-4 mr-2" />
                                      Approve KYC
                                    </Button>
                                    <Button size="sm" variant="destructive">
                                      <UserX className="h-4 w-4 mr-2" />
                                      Reject KYC
                                    </Button>
                                  </>
                                )}
                                <Button size="sm" variant="outline">
                                  {selectedUser.accountStatus === "active" ? (
                                    <>
                                      <Lock className="h-4 w-4 mr-2" />
                                      Freeze Account
                                    </>
                                  ) : (
                                    <>
                                      <Unlock className="h-4 w-4 mr-2" />
                                      Unfreeze Account
                                    </>
                                  )}
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

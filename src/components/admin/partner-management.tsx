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
import { Label } from "@/components/ui/label"
import { adminPartners } from "@/lib/admin-mock-data"
import { Search, Plus, Settings, Power, PowerOff } from "lucide-react"

export function PartnerManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [newPartner, setNewPartner] = useState({
    name: "",
    type: "",
    services: "",
  })

  const filteredPartners = adminPartners.filter((partner) => {
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || partner.type === typeFilter
    const matchesStatus = statusFilter === "all" || partner.status === statusFilter

    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Active
          </Badge>
        )
      case "inactive":
        return (
          <Badge variant="secondary" className="bg-gray-100 text-gray-800">
            Inactive
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleAddPartner = () => {
    // Mock add partner functionality
    alert(`Partner ${newPartner.name} added successfully!`)
    setShowAddDialog(false)
    setNewPartner({ name: "", type: "", services: "" })
  }

  const handleToggleStatus = (partnerId: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active"
    alert(`Partner status changed to ${newStatus}`)
  }

  return (
    <div className="space-y-4">
      {/* Header and Actions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Partner Management</CardTitle>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Partner
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Partner</DialogTitle>
                  <DialogDescription>Add a new biller or service partner to the platform</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="partner-name">Partner Name</Label>
                    <Input
                      id="partner-name"
                      placeholder="e.g., MTN Cameroon"
                      value={newPartner.name}
                      onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="partner-type">Partner Type</Label>
                    <Select
                      value={newPartner.type}
                      onValueChange={(value) => setNewPartner({ ...newPartner, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Telecom">Telecom</SelectItem>
                        <SelectItem value="Utility">Utility</SelectItem>
                        <SelectItem value="Bank">Bank</SelectItem>
                        <SelectItem value="Government">Government</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="partner-services">Services</Label>
                    <Input
                      id="partner-services"
                      placeholder="e.g., Mobile Money, Airtime"
                      value={newPartner.services}
                      onChange={(e) => setNewPartner({ ...newPartner, services: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleAddPartner}>Add Partner</Button>
                    <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search partners..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Partner Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Telecom">Telecom</SelectItem>
                <SelectItem value="Utility">Utility</SelectItem>
                <SelectItem value="Bank">Bank</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Partners Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Partner Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Services</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Integration Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPartners.map((partner) => (
                <TableRow key={partner.id}>
                  <TableCell className="font-medium">{partner.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{partner.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {partner.services.map((service, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(partner.status)}</TableCell>
                  <TableCell>{partner.integrationDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleToggleStatus(partner.id, partner.status)}>
                        {partner.status === "active" ? <PowerOff className="h-4 w-4" /> : <Power className="h-4 w-4" />}
                      </Button>
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

"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { UserPlus } from "lucide-react"

interface AddTeamMemberDialogProps {
  onAddMember?: (memberData: any) => void
}

const availablePermissions = [
  { id: "view_accounts", label: "View Accounts" },
  { id: "manage_payments", label: "Manage Payments" },
  { id: "view_reports", label: "View Reports" },
  { id: "manage_invoices", label: "Manage Invoices" },
  { id: "manage_payroll", label: "Manage Payroll" },
  { id: "manage_team", label: "Manage Team" },
  { id: "all", label: "All Permissions (Admin)" },
]

export function AddTeamMemberDialog({ onAddMember }: AddTeamMemberDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  })
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddMember?.({
      ...formData,
      permissions: selectedPermissions,
      status: "active",
      joinDate: new Date().toISOString(),
      lastActive: new Date().toISOString(),
    })

    setOpen(false)
    setFormData({ name: "", email: "", role: "" })
    setSelectedPermissions([])
  }

  const handleRoleChange = (role: string) => {
    setFormData((prev) => ({ ...prev, role }))
    // Auto-select permissions based on role
    switch (role) {
      case "admin":
        setSelectedPermissions(["all"])
        break
      case "manager":
        setSelectedPermissions(["view_accounts", "manage_payments", "view_reports", "manage_invoices"])
        break
      case "viewer":
        setSelectedPermissions(["view_accounts", "view_reports"])
        break
      default:
        setSelectedPermissions([])
    }
  }

  const handlePermissionToggle = (permission: string) => {
    if (permission === "all") {
      setSelectedPermissions(selectedPermissions.includes("all") ? [] : ["all"])
    } else {
      setSelectedPermissions((prev) =>
        prev.includes(permission)
          ? prev.filter((p) => p !== permission && p !== "all")
          : [...prev.filter((p) => p !== "all"), permission],
      )
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Team Member
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Team Member</DialogTitle>
          <DialogDescription>Invite a new team member and set their role and permissions.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Team member name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="member@company.com"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={formData.role} onValueChange={handleRoleChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin - Full access</SelectItem>
                <SelectItem value="manager">Manager - Limited management</SelectItem>
                <SelectItem value="viewer">Viewer - Read-only access</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Permissions</Label>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {availablePermissions.map((permission) => (
                <div key={permission.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={permission.id}
                    checked={selectedPermissions.includes(permission.id)}
                    onCheckedChange={() => handlePermissionToggle(permission.id)}
                  />
                  <Label htmlFor={permission.id} className="text-sm cursor-pointer">
                    {permission.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
              Add Member
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

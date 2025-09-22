"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { UserPlus } from "lucide-react"

interface AddEmployeeDialogProps {
  onAddEmployee?: (employeeData: any) => void
}

export function AddEmployeeDialog({ onAddEmployee }: AddEmployeeDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    salary: "",
    walletId: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddEmployee?.({
      ...formData,
      salary: Number.parseFloat(formData.salary),
      status: "active",
      joinDate: new Date().toISOString().split("T")[0],
    })

    setOpen(false)
    setFormData({
      name: "",
      email: "",
      phone: "",
      position: "",
      salary: "",
      walletId: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-transparent">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Employee
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Employee</DialogTitle>
          <DialogDescription>Add a new employee to your payroll system.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Employee full name"
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
              placeholder="employee@company.com"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              placeholder="+237 6XX XXX XXX"
              value={formData.phone}
              onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="position">Position</Label>
            <Input
              id="position"
              placeholder="Job title"
              value={formData.position}
              onChange={(e) => setFormData((prev) => ({ ...prev, position: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="salary">Monthly Salary (XAF)</Label>
            <Input
              id="salary"
              type="number"
              placeholder="0"
              value={formData.salary}
              onChange={(e) => setFormData((prev) => ({ ...prev, salary: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="walletId">NaBank Wallet ID</Label>
            <Input
              id="walletId"
              placeholder="WAL001"
              value={formData.walletId}
              onChange={(e) => setFormData((prev) => ({ ...prev, walletId: e.target.value }))}
              required
            />
          </div>

          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
              Add Employee
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

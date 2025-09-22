"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Users } from "lucide-react"
import { employees } from "@/lib/business-mock-data"

interface CreatePayrollDialogProps {
  onCreatePayroll?: (payrollData: any) => void
}

export function CreatePayrollDialog({ onCreatePayroll }: CreatePayrollDialogProps) {
  const [open, setOpen] = useState(false)
  const [batchName, setBatchName] = useState("")
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const selectedEmployeeData = employees.filter((emp) => selectedEmployees.includes(emp.id))
    const totalAmount = selectedEmployeeData.reduce((sum, emp) => sum + emp.salary, 0)

    onCreatePayroll?.({
      batchName,
      employees: selectedEmployeeData.map((emp) => ({
        employeeId: emp.id,
        name: emp.name,
        amount: emp.salary,
        status: "pending",
      })),
      totalAmount,
      employeeCount: selectedEmployeeData.length,
    })

    setOpen(false)
    setBatchName("")
    setSelectedEmployees([])
  }

  const handleEmployeeToggle = (employeeId: string) => {
    setSelectedEmployees((prev) =>
      prev.includes(employeeId) ? prev.filter((id) => id !== employeeId) : [...prev, employeeId],
    )
  }

  const handleSelectAll = () => {
    if (selectedEmployees.length === employees.length) {
      setSelectedEmployees([])
    } else {
      setSelectedEmployees(employees.map((emp) => emp.id))
    }
  }

  const totalAmount = employees
    .filter((emp) => selectedEmployees.includes(emp.id))
    .reduce((sum, emp) => sum + emp.salary, 0)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          Create Payroll Batch
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-green-600" />
            Create Payroll Batch
          </DialogTitle>
          <DialogDescription>Select employees and create a new payroll batch for processing.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="batchName">Batch Name</Label>
            <Input
              id="batchName"
              placeholder="e.g., January 2024 Payroll"
              value={batchName}
              onChange={(e) => setBatchName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">Select Employees</Label>
              <Button type="button" variant="outline" size="sm" onClick={handleSelectAll}>
                {selectedEmployees.length === employees.length ? "Deselect All" : "Select All"}
              </Button>
            </div>

            <div className="space-y-3 max-h-60 overflow-y-auto">
              {employees.map((employee) => (
                <div key={employee.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id={employee.id}
                      checked={selectedEmployees.includes(employee.id)}
                      onCheckedChange={() => handleEmployeeToggle(employee.id)}
                    />
                    <div>
                      <label htmlFor={employee.id} className="font-medium text-gray-900 cursor-pointer">
                        {employee.name}
                      </label>
                      <p className="text-sm text-gray-600">{employee.position}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{employee.salary.toLocaleString()} XAF</p>
                    <p className="text-sm text-gray-500">{employee.walletId}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedEmployees.length > 0 && (
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-green-800">
                    {selectedEmployees.length} employee{selectedEmployees.length !== 1 ? "s" : ""} selected
                  </p>
                  <p className="text-sm text-green-600">Ready for payroll processing</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-800">{totalAmount.toLocaleString()} XAF</p>
                  <p className="text-sm text-green-600">Total amount</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700"
              disabled={selectedEmployees.length === 0}
            >
              Create Batch
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

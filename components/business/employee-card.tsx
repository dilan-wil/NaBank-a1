"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, User, Edit, Trash2 } from "lucide-react"
import type { Employee } from "@/lib/business-mock-data"

interface EmployeeCardProps {
  employee: Employee
  onEdit?: (employee: Employee) => void
  onDelete?: (employee: Employee) => void
  onViewDetails?: (employee: Employee) => void
}

export function EmployeeCard({ employee, onEdit, onDelete, onViewDetails }: EmployeeCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900">{employee.name}</CardTitle>
            <p className="text-sm text-gray-600">{employee.position}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={getStatusColor(employee.status)} variant="secondary">
            {employee.status}
          </Badge>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Monthly Salary</p>
            <p className="text-lg font-bold text-gray-900">{employee.salary.toLocaleString()} XAF</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Wallet ID</p>
            <p className="text-sm font-medium text-gray-900">{employee.walletId}</p>
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-gray-500">Contact</p>
          <p className="text-sm text-gray-900">{employee.email}</p>
          <p className="text-sm text-gray-900">{employee.phone}</p>
        </div>

        <div className="text-sm text-gray-500">
          <p>Joined: {new Date(employee.joinDate).toLocaleDateString()}</p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails?.(employee)}
            className="flex-1 bg-transparent"
          >
            View Details
          </Button>
          <Button variant="outline" size="sm" onClick={() => onEdit?.(employee)}>
            <Edit className="w-4 h-4 mr-1" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete?.(employee)}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

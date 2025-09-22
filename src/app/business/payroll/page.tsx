"use client"

import { useState } from "react"
import { BusinessLayout } from "@/components/business/business-layout"
import { EmployeeCard } from "@/components/business/employee-card"
import { PayrollBatchCard } from "@/components/business/payroll-batch-card"
import { CreatePayrollDialog } from "@/components/business/create-payroll-dialog"
import { AddEmployeeDialog } from "@/components/business/add-employee-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Users, DollarSign, Calendar, TrendingUp } from "lucide-react"
import { employees, payrollBatches, type Employee, type PayrollBatch } from "@/lib/business-mock-data"

export default function BusinessPayrollPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || employee.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const totalEmployees = employees.length
  const activeEmployees = employees.filter((emp) => emp.status === "active").length
  const totalMonthlySalary = employees.reduce((sum, emp) => sum + emp.salary, 0)
  const completedBatches = payrollBatches.filter((batch) => batch.status === "completed").length

  const handleAddEmployee = (employeeData: any) => {
    console.log("Add employee:", employeeData)
    // Mock implementation - would add new employee
  }

  const handleEditEmployee = (employee: Employee) => {
    console.log("Edit employee:", employee.id)
    // Mock implementation - would open edit dialog
  }

  const handleDeleteEmployee = (employee: Employee) => {
    console.log("Delete employee:", employee.id)
    // Mock implementation - would delete employee
  }

  const handleViewEmployeeDetails = (employee: Employee) => {
    console.log("View employee details:", employee.id)
    // Mock implementation - would show detailed view
  }

  const handleCreatePayroll = (payrollData: any) => {
    console.log("Create payroll:", payrollData)
    // Mock implementation - would create new payroll batch
  }

  const handleProcessBatch = (batch: PayrollBatch) => {
    console.log("Process batch:", batch.id)
    // Mock implementation - would process payroll batch
  }

  const handleViewBatch = (batch: PayrollBatch) => {
    console.log("View batch:", batch.id)
    // Mock implementation - would show batch details
  }

  const handleDownloadReport = (batch: PayrollBatch) => {
    console.log("Download report:", batch.id)
    // Mock implementation - would download payroll report
  }

  return (
    <BusinessLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Payroll Management</h1>
            <p className="text-gray-600">Manage employees and process payroll batches</p>
          </div>
          <div className="flex gap-2">
            <AddEmployeeDialog onAddEmployee={handleAddEmployee} />
            <CreatePayrollDialog onCreatePayroll={handleCreatePayroll} />
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Employees</CardTitle>
              <Users className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{totalEmployees}</div>
              <p className="text-xs text-green-600 mt-1">{activeEmployees} active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Monthly Payroll</CardTitle>
              <DollarSign className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{totalMonthlySalary.toLocaleString()} XAF</div>
              <p className="text-xs text-gray-500 mt-1">Total monthly cost</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Completed Batches</CardTitle>
              <Calendar className="w-4 h-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{completedBatches}</div>
              <p className="text-xs text-gray-500 mt-1">This year</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Average Salary</CardTitle>
              <TrendingUp className="w-4 h-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {Math.round(totalMonthlySalary / totalEmployees).toLocaleString()} XAF
              </div>
              <p className="text-xs text-gray-500 mt-1">Per employee</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="employees" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="employees">Employees</TabsTrigger>
            <TabsTrigger value="batches">Payroll Batches</TabsTrigger>
          </TabsList>

          <TabsContent value="employees" className="space-y-6">
            {/* Employee Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Employee Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search employees..."
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
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Employees Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEmployees.map((employee) => (
                <EmployeeCard
                  key={employee.id}
                  employee={employee}
                  onEdit={handleEditEmployee}
                  onDelete={handleDeleteEmployee}
                  onViewDetails={handleViewEmployeeDetails}
                />
              ))}
            </div>

            {filteredEmployees.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <p className="text-gray-500">No employees found matching your criteria.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="batches" className="space-y-6">
            {/* Payroll Batches Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {payrollBatches.map((batch) => (
                <PayrollBatchCard
                  key={batch.id}
                  batch={batch}
                  onProcess={handleProcessBatch}
                  onView={handleViewBatch}
                  onDownload={handleDownloadReport}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </BusinessLayout>
  )
}

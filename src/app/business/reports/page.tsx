"use client"

import { BusinessLayout } from "@/components/business/business-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Download, TrendingUp, TrendingDown, DollarSign, FileText, Calendar } from "lucide-react"
import { businessAccounts, invoices, payrollBatches } from "@/lib/business-mock-data"

export default function BusinessReportsPage() {
  // Mock data for charts
  const monthlyRevenue = [
    { month: "Jan", revenue: 2500000, expenses: 1800000 },
    { month: "Feb", revenue: 3200000, expenses: 2100000 },
    { month: "Mar", revenue: 2800000, expenses: 1900000 },
    { month: "Apr", revenue: 3500000, expenses: 2300000 },
    { month: "May", revenue: 4100000, expenses: 2800000 },
    { month: "Jun", revenue: 3800000, expenses: 2600000 },
  ]

  const cashflowData = [
    { month: "Jan", inflow: 2500000, outflow: 1800000 },
    { month: "Feb", inflow: 3200000, outflow: 2100000 },
    { month: "Mar", inflow: 2800000, outflow: 1900000 },
    { month: "Apr", inflow: 3500000, outflow: 2300000 },
    { month: "May", inflow: 4100000, outflow: 2800000 },
    { month: "Jun", inflow: 3800000, outflow: 2600000 },
  ]

  const expenseBreakdown = [
    { name: "Payroll", value: 45, amount: 1350000 },
    { name: "Operations", value: 25, amount: 750000 },
    { name: "Marketing", value: 15, amount: 450000 },
    { name: "Technology", value: 10, amount: 300000 },
    { name: "Other", value: 5, amount: 150000 },
  ]

  const COLORS = ["#10B981", "#3B82F6", "#8B5CF6", "#F59E0B", "#EF4444"]

  const totalBalance = businessAccounts.reduce((sum, acc) => sum + acc.balance, 0)
  const totalInvoices = invoices.reduce((sum, inv) => sum + inv.amount, 0)
  const paidInvoices = invoices.filter((inv) => inv.status === "paid").reduce((sum, inv) => sum + inv.amount, 0)
  const monthlyPayroll = payrollBatches.reduce((sum, batch) => sum + batch.totalAmount, 0)

  const handleExportReport = (type: string) => {
    console.log("Export report:", type)
    // Mock implementation - would generate and download report
  }

  return (
    <BusinessLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Business Reports</h1>
            <p className="text-gray-600">Financial insights and business analytics</p>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="6months">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => handleExportReport("pdf")}>
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Balance</CardTitle>
              <DollarSign className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{totalBalance.toLocaleString()} XAF</div>
              <div className="flex items-center text-xs text-green-600 mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12.5% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Invoice Revenue</CardTitle>
              <FileText className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{paidInvoices.toLocaleString()} XAF</div>
              <div className="flex items-center text-xs text-blue-600 mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                {Math.round((paidInvoices / totalInvoices) * 100)}% collection rate
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Monthly Payroll</CardTitle>
              <Calendar className="w-4 h-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{monthlyPayroll.toLocaleString()} XAF</div>
              <div className="flex items-center text-xs text-red-600 mt-1">
                <TrendingDown className="w-3 h-3 mr-1" />
                {Math.round((monthlyPayroll / totalBalance) * 100)}% of total balance
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Net Profit</CardTitle>
              <TrendingUp className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {(paidInvoices - monthlyPayroll).toLocaleString()} XAF
              </div>
              <div className="flex items-center text-xs text-green-600 mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +8.2% profit margin
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="revenue" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="revenue">Revenue & Expenses</TabsTrigger>
            <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
            <TabsTrigger value="expenses">Expense Breakdown</TabsTrigger>
          </TabsList>

          <TabsContent value="revenue">
            <Card>
              <CardHeader>
                <CardTitle>Revenue vs Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={monthlyRevenue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${Number(value).toLocaleString()} XAF`} />
                    <Bar dataKey="revenue" fill="#10B981" name="Revenue" />
                    <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cashflow">
            <Card>
              <CardHeader>
                <CardTitle>Cash Flow Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={cashflowData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${Number(value).toLocaleString()} XAF`} />
                    <Line type="monotone" dataKey="inflow" stroke="#10B981" strokeWidth={3} name="Inflow" />
                    <Line type="monotone" dataKey="outflow" stroke="#EF4444" strokeWidth={3} name="Outflow" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="expenses">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Expense Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={expenseBreakdown}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name} ${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {expenseBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Expense Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {expenseBreakdown.map((expense, index) => (
                      <div key={expense.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <span className="font-medium">{expense.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{expense.amount.toLocaleString()} XAF</p>
                          <p className="text-sm text-gray-500">{expense.value}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Export Options */}
        <Card>
          <CardHeader>
            <CardTitle>Export Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" onClick={() => handleExportReport("financial-pdf")} className="bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Financial Report (PDF)
              </Button>
              <Button
                variant="outline"
                onClick={() => handleExportReport("transactions-csv")}
                className="bg-transparent"
              >
                <Download className="w-4 h-4 mr-2" />
                Transactions (CSV)
              </Button>
              <Button variant="outline" onClick={() => handleExportReport("payroll-pdf")} className="bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Payroll Report (PDF)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </BusinessLayout>
  )
}

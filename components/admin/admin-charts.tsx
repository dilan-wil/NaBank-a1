"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const userGrowthData = [
  { month: "Jan", users: 8500 },
  { month: "Feb", users: 9200 },
  { month: "Mar", users: 10100 },
  { month: "Apr", users: 11500 },
  { month: "May", users: 13200 },
  { month: "Jun", users: 15420 },
]

const transactionVolumeData = [
  { month: "Jan", deposits: 35000, withdrawals: 30000 },
  { month: "Feb", deposits: 42000, withdrawals: 30000 },
  { month: "Mar", deposits: 48000, withdrawals: 30000 },
  { month: "Apr", deposits: 52000, withdrawals: 30000 },
  { month: "May", deposits: 56000, withdrawals: 30000 },
  { month: "Jun", deposits: 59650, withdrawals: 30000 },
]

const kycStatusData = [
  { name: "Approved", value: 12500, color: "#22c55e" },
  { name: "Pending", value: 234, color: "#f59e0b" },
  { name: "Rejected", value: 186, color: "#ef4444" },
]

export function AdminCharts() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* User Growth Chart */}
      <Card className="col-span-full lg:col-span-2">
        <CardHeader>
          <CardTitle>User Growth</CardTitle>
          <CardDescription>Monthly user registration trends</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="users"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--primary))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* KYC Status Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>KYC Status</CardTitle>
          <CardDescription>User verification status</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={kycStatusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {kycStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {kycStatusData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>{item.name}</span>
                </div>
                <span className="font-medium">{item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Transaction Volume */}
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Transaction Volume</CardTitle>
          <CardDescription>Monthly deposits vs withdrawals</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={transactionVolumeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="deposits" fill="hsl(var(--primary))" name="Deposits" />
              <Bar dataKey="withdrawals" fill="hsl(var(--muted))" name="Withdrawals" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

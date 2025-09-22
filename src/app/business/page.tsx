import { BusinessLayout } from "@/components/business/business-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownLeft, Plus, FileText, CreditCard, TrendingUp, Wallet } from "lucide-react"
import { businessAccounts, businessTransactions } from "@/lib/business-mock-data"

export default function BusinessDashboard() {
  const mainAccount = businessAccounts.find((acc) => acc.type === "main")
  const totalBalance = businessAccounts.reduce((sum, acc) => sum + acc.balance, 0)
  const recentTransactions = businessTransactions.slice(0, 5)

  // Calculate cashflow
  const thisMonthIncoming = businessTransactions
    .filter((t) => t.type === "credit" && new Date(t.date).getMonth() === new Date().getMonth())
    .reduce((sum, t) => sum + t.amount, 0)

  const thisMonthOutgoing = businessTransactions
    .filter((t) => t.type === "debit" && new Date(t.date).getMonth() === new Date().getMonth())
    .reduce((sum, t) => sum + t.amount, 0)

  return (
    <BusinessLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Business Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's your business overview.</p>
          </div>
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Quick Action
          </Button>
        </div>

        {/* Account Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Main Balance</CardTitle>
              <Wallet className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{mainAccount?.balance.toLocaleString()} XAF</div>
              <p className="text-xs text-gray-500 mt-1">Account: {mainAccount?.accountNumber}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Balance</CardTitle>
              <TrendingUp className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{totalBalance.toLocaleString()} XAF</div>
              <p className="text-xs text-green-600 mt-1">+12.5% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">This Month In</CardTitle>
              <ArrowDownLeft className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+{thisMonthIncoming.toLocaleString()} XAF</div>
              <p className="text-xs text-gray-500 mt-1">Incoming payments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">This Month Out</CardTitle>
              <ArrowUpRight className="w-4 h-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">-{thisMonthOutgoing.toLocaleString()} XAF</div>
              <p className="text-xs text-gray-500 mt-1">Outgoing payments</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                <CreditCard className="w-6 h-6 text-green-600" />
                <span className="text-sm font-medium">Send Payment</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                <ArrowDownLeft className="w-6 h-6 text-blue-600" />
                <span className="text-sm font-medium">Collect Payment</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                <FileText className="w-6 h-6 text-purple-600" />
                <span className="text-sm font-medium">Create Invoice</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900">Recent Transactions</CardTitle>
            <Button variant="ghost" size="sm">
              View All
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === "credit" ? "bg-green-100" : "bg-red-100"
                      }`}
                    >
                      {transaction.type === "credit" ? (
                        <ArrowDownLeft className="w-5 h-5 text-green-600" />
                      ) : (
                        <ArrowUpRight className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{transaction.description}</p>
                      <p className="text-sm text-gray-500">{transaction.reference}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${transaction.type === "credit" ? "text-green-600" : "text-red-600"}`}>
                      {transaction.type === "credit" ? "+" : "-"}
                      {transaction.amount.toLocaleString()} XAF
                    </p>
                    <p className="text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </BusinessLayout>
  )
}

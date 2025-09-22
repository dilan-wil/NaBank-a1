"use client"

import { useState } from "react"
import { BusinessLayout } from "@/components/business/business-layout"
import { AccountCard } from "@/components/business/account-card"
import { CreateAccountDialog } from "@/components/business/create-account-dialog"
import { AccountTransactionDialog } from "@/components/business/account-transaction-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, TrendingUp, Wallet } from "lucide-react"
import { businessAccounts, businessTransactions, type BusinessAccount } from "@/lib/business-mock-data"

export default function BusinessAccountsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [transactionDialog, setTransactionDialog] = useState<{
    open: boolean
    account: BusinessAccount | null
    type: "deposit" | "withdraw"
  }>({
    open: false,
    account: null,
    type: "deposit",
  })

  const filteredAccounts = businessAccounts.filter((account) => {
    const matchesSearch = account.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || account.type === filterType
    return matchesSearch && matchesFilter
  })

  const totalBalance = businessAccounts.reduce((sum, acc) => sum + acc.balance, 0)
  const activeAccounts = businessAccounts.filter((acc) => acc.status === "active").length

  const handleViewTransactions = (accountId: string) => {
    // Mock implementation - would navigate to transaction history
    console.log("View transactions for account:", accountId)
  }

  const handleDeposit = (accountId: string) => {
    const account = businessAccounts.find((acc) => acc.id === accountId)
    setTransactionDialog({
      open: true,
      account: account || null,
      type: "deposit",
    })
  }

  const handleWithdraw = (accountId: string) => {
    const account = businessAccounts.find((acc) => acc.id === accountId)
    setTransactionDialog({
      open: true,
      account: account || null,
      type: "withdraw",
    })
  }

  const handleTransaction = (data: any) => {
    console.log("Transaction:", data)
    // Mock implementation - would process the transaction
  }

  return (
    <BusinessLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Business Accounts</h1>
            <p className="text-gray-600">Manage your main account and sub-accounts</p>
          </div>
          <CreateAccountDialog />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Balance</CardTitle>
              <Wallet className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{totalBalance.toLocaleString()} XAF</div>
              <p className="text-xs text-green-600 mt-1">+8.2% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Accounts</CardTitle>
              <TrendingUp className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{activeAccounts}</div>
              <p className="text-xs text-gray-500 mt-1">Across all types</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">This Month Activity</CardTitle>
              <TrendingUp className="w-4 h-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{businessTransactions.length}</div>
              <p className="text-xs text-gray-500 mt-1">Total transactions</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Account Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search accounts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="main">Main Account</SelectItem>
                  <SelectItem value="project">Project Accounts</SelectItem>
                  <SelectItem value="team">Team Accounts</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Accounts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAccounts.map((account) => (
            <AccountCard
              key={account.id}
              account={account}
              onViewTransactions={handleViewTransactions}
              onDeposit={handleDeposit}
              onWithdraw={handleWithdraw}
            />
          ))}
        </div>

        {filteredAccounts.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500">No accounts found matching your criteria.</p>
            </CardContent>
          </Card>
        )}

        {/* Transaction Dialog */}
        <AccountTransactionDialog
          open={transactionDialog.open}
          onOpenChange={(open) => setTransactionDialog((prev) => ({ ...prev, open }))}
          account={transactionDialog.account}
          type={transactionDialog.type}
          onTransaction={handleTransaction}
        />
      </div>
    </BusinessLayout>
  )
}

"use client"

import { BusinessLayout } from "@/components/business/business-layout"
import { AccountCard } from "@/components/business/account-card"
import { CreateAccountDialog } from "@/components/business/create-account-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PiggyBank, TrendingUp, Target, Calendar } from "lucide-react"
import { businessAccounts } from "@/lib/business-mock-data"

export default function BusinessSavingsPage() {
  const savingsAccounts = businessAccounts.filter((acc) => acc.type === "project")
  const totalSavings = savingsAccounts.reduce((sum, acc) => sum + acc.balance, 0)
  const averageBalance = totalSavings / savingsAccounts.length

  const handleViewTransactions = (accountId: string) => {
    console.log("View transactions for account:", accountId)
  }

  const handleDeposit = (accountId: string) => {
    console.log("Deposit to account:", accountId)
  }

  const handleWithdraw = (accountId: string) => {
    console.log("Withdraw from account:", accountId)
  }

  return (
    <BusinessLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Savings & Funds</h1>
            <p className="text-gray-600">Manage project funds and savings accounts</p>
          </div>
          <CreateAccountDialog />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Savings</CardTitle>
              <PiggyBank className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{totalSavings.toLocaleString()} XAF</div>
              <p className="text-xs text-green-600 mt-1">+15.2% this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Funds</CardTitle>
              <Target className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{savingsAccounts.length}</div>
              <p className="text-xs text-gray-500 mt-1">Project accounts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Average Balance</CardTitle>
              <TrendingUp className="w-4 h-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{averageBalance.toLocaleString()} XAF</div>
              <p className="text-xs text-gray-500 mt-1">Per fund</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Monthly Growth</CardTitle>
              <Calendar className="w-4 h-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+12.5%</div>
              <p className="text-xs text-gray-500 mt-1">Compared to last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Savings Accounts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savingsAccounts.map((account) => (
            <AccountCard
              key={account.id}
              account={account}
              onViewTransactions={handleViewTransactions}
              onDeposit={handleDeposit}
              onWithdraw={handleWithdraw}
            />
          ))}
        </div>

        {savingsAccounts.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <PiggyBank className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Savings Accounts</h3>
              <p className="text-gray-500 mb-4">Create your first project fund to start saving for specific goals.</p>
              <CreateAccountDialog />
            </CardContent>
          </Card>
        )}
      </div>
    </BusinessLayout>
  )
}

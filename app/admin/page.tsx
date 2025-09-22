import { AdminLayout } from "@/components/admin/admin-layout"
import { MetricCard } from "@/components/admin/metric-card"
import { AdminCharts } from "@/components/admin/admin-charts"
import { adminMetrics } from "@/lib/admin-mock-data"
import { Users, CreditCard, FileCheck, Banknote, TrendingUp, TrendingDown } from "lucide-react"

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Overview of NaBank system metrics and performance</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Users"
            value={adminMetrics.totalUsers}
            change="+12% from last month"
            changeType="positive"
            icon={Users}
          />
          <MetricCard
            title="Total Transactions"
            value={adminMetrics.totalTransactions}
            change="+8% from last month"
            changeType="positive"
            icon={CreditCard}
          />
          <MetricCard
            title="Pending KYC"
            value={adminMetrics.pendingKYC}
            change="-5% from last month"
            changeType="positive"
            icon={FileCheck}
          />
          <MetricCard
            title="Active Loans"
            value={adminMetrics.activeLoans}
            change="+15% from last month"
            changeType="positive"
            icon={Banknote}
          />
        </div>

        {/* Financial Metrics */}
        <div className="grid gap-4 md:grid-cols-2">
          <MetricCard
            title="Total Deposits"
            value={`₣${(adminMetrics.totalDeposits / 1000000).toFixed(1)}M`}
            change="+18% from last month"
            changeType="positive"
            icon={TrendingUp}
          />
          <MetricCard
            title="Total Withdrawals"
            value={`₣${(adminMetrics.totalWithdrawals / 1000000).toFixed(1)}M`}
            change="+3% from last month"
            changeType="positive"
            icon={TrendingDown}
          />
        </div>

        {/* Charts */}
        <AdminCharts />
      </div>
    </AdminLayout>
  )
}

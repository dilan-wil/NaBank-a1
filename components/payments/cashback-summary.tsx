import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Gift, TrendingUp, Calendar } from "lucide-react"
import { formatCurrency } from "@/lib/mock-data"

const mockCashbackData = {
  totalEarned: 15750,
  thisMonth: 3250,
  lastMonth: 2890,
  availableToWithdraw: 12500,
  pendingCashback: 3250,
  topCategory: "Electricity",
  topCategoryAmount: 1250,
}

export function CashbackSummary() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Gift className="h-5 w-5 text-primary" />
          Cashback Rewards
        </CardTitle>
        <Button variant="outline" size="sm">
          Withdraw
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Total Earned */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 rounded-lg">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Total Cashback Earned</p>
            <p className="text-2xl font-bold text-primary">{formatCurrency(mockCashbackData.totalEarned)}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">This Month</span>
            </div>
            <p className="font-medium">{formatCurrency(mockCashbackData.thisMonth)}</p>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Available</span>
            </div>
            <p className="font-medium text-green-600">{formatCurrency(mockCashbackData.availableToWithdraw)}</p>
          </div>
        </div>

        {/* Top Category */}
        <div className="border rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Top Earning Category</p>
              <p className="text-xs text-muted-foreground">{mockCashbackData.topCategory}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">{formatCurrency(mockCashbackData.topCategoryAmount)}</p>
              <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                2% rate
              </Badge>
            </div>
          </div>
        </div>

        {/* Pending Cashback */}
        {mockCashbackData.pendingCashback > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-800">Pending Cashback</p>
                <p className="text-xs text-yellow-600">Will be available in 2-3 days</p>
              </div>
              <p className="font-medium text-yellow-800">{formatCurrency(mockCashbackData.pendingCashback)}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

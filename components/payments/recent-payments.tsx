import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Zap, Droplets, Tv, Wifi, Smartphone, Repeat } from "lucide-react"
import { formatCurrency, formatDate } from "@/lib/mock-data"

interface RecentPayment {
  id: string
  type: string
  provider: string
  amount: number
  currency: string
  date: string
  status: "completed" | "pending" | "failed"
  cashback: number
}

const mockRecentPayments: RecentPayment[] = [
  {
    id: "1",
    type: "Electricity",
    provider: "ENEO",
    amount: 25000,
    currency: "XAF",
    date: "2024-01-14T16:30:00Z",
    status: "completed",
    cashback: 500,
  },
  {
    id: "2",
    type: "TV & Cable",
    provider: "DSTV",
    amount: 15000,
    currency: "XAF",
    date: "2024-01-13T10:15:00Z",
    status: "completed",
    cashback: 450,
  },
  {
    id: "3",
    type: "Airtime",
    provider: "MTN",
    amount: 5000,
    currency: "XAF",
    date: "2024-01-12T14:45:00Z",
    status: "completed",
    cashback: 50,
  },
  {
    id: "4",
    type: "Internet",
    provider: "Orange Fiber",
    amount: 35000,
    currency: "XAF",
    date: "2024-01-11T09:20:00Z",
    status: "pending",
    cashback: 875,
  },
]

const getPaymentIcon = (type: string) => {
  switch (type) {
    case "Electricity":
      return <Zap className="h-4 w-4 text-yellow-500" />
    case "Water":
      return <Droplets className="h-4 w-4 text-blue-500" />
    case "TV & Cable":
      return <Tv className="h-4 w-4 text-purple-500" />
    case "Internet":
      return <Wifi className="h-4 w-4 text-green-500" />
    case "Airtime":
      return <Smartphone className="h-4 w-4 text-orange-500" />
    default:
      return <Zap className="h-4 w-4 text-gray-500" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800"
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "failed":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function RecentPayments() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Payments</CardTitle>
        <Button variant="ghost" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockRecentPayments.map((payment) => (
            <div key={payment.id} className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-3">
                {getPaymentIcon(payment.type)}
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm">{payment.provider}</p>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Repeat className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">{payment.type}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(payment.date)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-sm">{formatCurrency(payment.amount, payment.currency)}</p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className={`text-xs ${getStatusColor(payment.status)}`}>
                    {payment.status}
                  </Badge>
                  {payment.status === "completed" && (
                    <span className="text-xs text-green-600">+{formatCurrency(payment.cashback)} cashback</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

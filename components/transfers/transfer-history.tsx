import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Building2, Smartphone } from "lucide-react"
import { formatCurrency, formatDate, mockTransactions } from "@/lib/mock-data"

const getTransferIcon = (category: string) => {
  switch (category) {
    case "Transfer":
      return <ArrowUpRight className="h-4 w-4 text-blue-500" />
    case "Mobile Money":
      return <Smartphone className="h-4 w-4 text-orange-500" />
    default:
      return <Building2 className="h-4 w-4 text-green-500" />
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

export function TransferHistory() {
  // Filter for transfer-related transactions
  const transferTransactions = mockTransactions.filter((t) =>
    ["Transfer", "Mobile Money", "Bank Transfer"].includes(t.category),
  )

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Transfer History</CardTitle>
        <Button variant="ghost" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transferTransactions.length > 0 ? (
            transferTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  {getTransferIcon(transaction.category)}
                  <div>
                    <p className="font-medium text-sm">{transaction.description}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(transaction.date)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm text-red-600">
                    -{formatCurrency(transaction.amount, transaction.currency)}
                  </p>
                  <Badge variant="secondary" className={`text-xs ${getStatusColor(transaction.status)}`}>
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No transfers yet</p>
              <p className="text-sm text-muted-foreground">Your transfer history will appear here</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

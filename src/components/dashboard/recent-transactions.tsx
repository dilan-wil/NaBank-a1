import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle,
  XCircle,
  ArrowLeftRight,
} from "lucide-react";
import { formatCurrency, formatDate, mockTransactions } from "@/lib/mock-data";
import { Transaction } from "@/lib/type";

const getTransactionIcon = (type: Transaction["type"]) => {
  return type === "DEPOSIT" ? (
    <ArrowDownLeft className="h-4 w-4 text-green-500" />
  ) : type === "RECEIVED_MOBILE" ? (
    <ArrowUpRight className="h-4 w-4 text-red-500" />
  ) : (
    <ArrowLeftRight />
  );
};

const getStatusIcon = (status: Transaction["status"]) => {
  switch (status) {
    case "DONE":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "PENDING":
      return <Clock className="h-4 w-4 text-yellow-500" />;
    case "failed":
      return <XCircle className="h-4 w-4 text-red-500" />;
  }
};

const getStatusColor = (status: Transaction["status"]) => {
  switch (status) {
    case "DONE":
      return "bg-green-100 text-green-800";
    case "PENDING":
      return "bg-yellow-100 text-yellow-800";
    case "failed":
      return "bg-red-100 text-red-800";
  }
};

export function RecentTransactions({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const recentTransactions = mockTransactions.slice(0, 5);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Transactions</CardTitle>
        <Button variant="ghost" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions?.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 rounded-lg border"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {getTransactionIcon(transaction.type)}
                  {getStatusIcon(transaction.status)}
                </div>
                <div>
                  <p className="font-medium text-sm">
                    {transaction.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(transaction.created)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`font-medium text-sm ${
                    transaction.type === "DEPOSIT"
                      ? "text-green-600"
                      : transaction.type === "RECEIVED_MOBILE"
                      ? "text-red-600"
                      : ""
                  }`}
                >
                  {transaction.type === "DEPOSIT"
                    ? "+"
                    : transaction.type === "RECEIVED_MOBILE"
                    ? "-"
                    : ""}
                  {formatCurrency(transaction.amount, "XAF")}
                </p>
                <Badge
                  variant="secondary"
                  className={`text-xs ${getStatusColor(transaction.status)}`}
                >
                  {transaction.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

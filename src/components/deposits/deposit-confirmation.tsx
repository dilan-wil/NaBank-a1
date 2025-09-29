"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Building2, Smartphone } from "lucide-react";

interface DepositConfirmationProps {
  depositData: any;
  onConfirm: () => void;
  onEdit: () => void;
}

export function DepositConfirmation({
  depositData,
  onConfirm,
  onEdit,
}: DepositConfirmationProps) {
  const getDepositIcon = () => {
    switch (depositData.method) {
      case "bank":
        return <Building2 className="h-6 w-6 text-blue-600" />;
      case "mobile":
        return <Smartphone className="h-6 w-6 text-orange-600" />;
      default:
        return <CheckCircle className="h-6 w-6 text-green-600" />;
    }
  };

  const getDepositTitle = () => {
    switch (depositData.method) {
      case "bank":
        return "Bank Transfer Deposit";
      case "mobile":
        return "Mobile Money Deposit";
      default:
        return "Deposit";
    }
  };

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} XAF`;
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">{getDepositIcon()}</div>
        <CardTitle>Confirm Deposit</CardTitle>
        <p className="text-muted-foreground">
          Please review your deposit details
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Deposit Method
            </span>
            <Badge variant="secondary">{getDepositTitle()}</Badge>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">
              {formatCurrency(Number(depositData.amount))}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">To Account</span>
            <span className="text-sm font-medium">Main Account</span>
          </div>

          {depositData.method === "bank" && (
            <>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Bank Name</span>
                <span className="text-sm font-medium">
                  {depositData.bankName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Account Number
                </span>
                <span className="text-sm font-medium font-mono">
                  {depositData.accountNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Account Holder
                </span>
                <span className="text-sm font-medium">
                  {depositData.accountHolder}
                </span>
              </div>
            </>
          )}

          {depositData.method === "mobile" && (
            <>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Network</span>
                <span className="text-sm font-medium">
                  {depositData.network}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Phone Number
                </span>
                <span className="text-sm font-medium font-mono">
                  {depositData.phoneNumber}
                </span>
              </div>
            </>
          )}
        </div>

        <Separator />

        <div className="flex justify-between font-medium">
          <span>Total Deposit</span>
          <span>{formatCurrency(Number(depositData.amount))}</span>
        </div>

        <div className="text-sm text-muted-foreground bg-blue-50 p-3 rounded-lg">
          <p className="font-medium text-blue-900 mb-1">Next Steps:</p>
          <p>
            {depositData.method === "bank"
              ? "Complete the bank transfer using the provided account details. Your deposit will be processed within 1-2 business hours."
              : "Send the money using your mobile money service. Your deposit will be processed instantly upon confirmation."}
          </p>
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            onClick={onEdit}
            className="flex-1 bg-transparent"
          >
            Edit Deposit
          </Button>
          <Button onClick={onConfirm} className="flex-1">
            <CheckCircle className="h-4 w-4 mr-2" />
            Confirm Deposit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

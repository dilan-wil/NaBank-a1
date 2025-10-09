"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Building2, Smartphone, Loader2 } from "lucide-react";
import { formatCurrency } from "@/lib/mock-data";

interface TransferConfirmationProps {
  transferData: any;
  onConfirm: () => void;
  onEdit: () => void;
  loading: boolean;
}

export function TransferConfirmation({
  transferData,
  onConfirm,
  onEdit,
  loading,
}: TransferConfirmationProps) {
  const getTransferIcon = () => {
    switch (transferData.type) {
      case "nabank":
        return <Building2 className="h-6 w-6 text-blue-600" />;
      case "external":
        return <Building2 className="h-6 w-6 text-green-600" />;
      case "mobile":
        return <Smartphone className="h-6 w-6 text-orange-600" />;
    }
  };

  const getTransferTitle = () => {
    switch (transferData.type) {
      case "nabank":
        return "NaBank Transfer";
      case "external":
        return "External Bank Transfer";
      case "mobile":
        return "Mobile Money Transfer";
    }
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">{getTransferIcon()}</div>
        <CardTitle>Confirm Transfer</CardTitle>
        <p className="text-muted-foreground">
          Please review your transfer details
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Transfer Type</span>
            <Badge variant="secondary">{getTransferTitle()}</Badge>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">
              {formatCurrency(Number(transferData.amount))}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">From</span>
            <span className="text-sm font-medium">Main Account</span>
          </div>

          {transferData.type === "nabank" && (
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">To Account</span>
              <span className="text-sm font-medium">
                {transferData.recipientAccount}
              </span>
            </div>
          )}

          {transferData.type === "external" && (
            <>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">To Bank</span>
                <span className="text-sm font-medium">
                  {transferData.recipientBank}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Account</span>
                <span className="text-sm font-medium">
                  {transferData.recipientAccount}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Recipient</span>
                <span className="text-sm font-medium">
                  {transferData.recipientName}
                </span>
              </div>
            </>
          )}

          {transferData.type === "mobile" && (
            <>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Provider</span>
                <span className="text-sm font-medium">
                  {transferData.apiUserTransfer}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Phone</span>
                <span className="text-sm font-medium">
                  {transferData.phoneNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Recipient</span>
                <span className="text-sm font-medium">
                  {transferData.recipientName}
                </span>
              </div>
            </>
          )}

          {transferData.description && (
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Description</span>
              <span className="text-sm font-medium">
                {transferData.description}
              </span>
            </div>
          )}
        </div>

        <Separator />

        <div className="flex justify-between font-medium">
          <span>Total Amount</span>
          <span>{formatCurrency(Number(transferData.amount))}</span>
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            onClick={onEdit}
            className="flex-1 bg-transparent"
          >
            Edit Transfer
          </Button>
          <Button disabled={loading} onClick={onConfirm} className="flex-1">
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <CheckCircle className="h-4 w-4 mr-2" />
            )}
            Confirm Transfer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

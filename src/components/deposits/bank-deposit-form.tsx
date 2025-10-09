"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Building2, QrCode, Copy, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useCustomerStore } from "@/lib/store";
// import { useToast } from "@/hooks/use-toast";

interface BankDepositFormProps {
  onBack: () => void;
  onSubmit: (data: any) => void;
}

export function BankDepositForm({ onBack, onSubmit }: BankDepositFormProps) {
  const { accounts } = useCustomerStore();
  const [amount, setAmount] = useState("");
  const [showQR, setShowQR] = useState(false);
  //   const { toast } = useToast();

  // Mock bank details
  const bankDetails = {
    bankName: "Commercial Bank of Cameroon",
    accountNumber: "1234567890123",
    accountHolder: "NaBank Ltd",
    swiftCode: "CBCMCMCX",
  };

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(bankDetails.accountNumber);
    // toast({
    //   title: "Copied!",
    //   description: "Account number copied to clipboard",
    // });
    toast.success("Account number copied to clipboard");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      //   toast({
      //     title: "Invalid Amount",
      //     description: "Please enter a valid amount greater than zero",
      //     variant: "destructive",
      //   });
      toast.error("Please enter a valid amount greater than zero");

      return;
    }

    onSubmit({
      method: "bank",
      amount,
      ...bankDetails,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-xl font-semibold">Bank Deposit</h2>
          <p className="text-muted-foreground">
            Transfer money from your bank account
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Amount Input */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Deposit Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (XAF)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount to deposit"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                min="1"
              />
            </div>
          </CardContent>
        </Card>

        {/* Bank Details */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-3">
            <Building2 className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-lg">Bank Account Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Bank Name</span>
                <span className="font-medium">NaBank</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Account Number
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-medium">
                    {accounts![0].accountNumber}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyAccount}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Account Holder
                </span>
                <span className="font-medium">{bankDetails.accountHolder}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  SWIFT Code
                </span>
                <span className="font-mono font-medium">
                  {bankDetails.swiftCode}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowQR(true)}
                className="flex-1"
              >
                <QrCode className="h-4 w-4 mr-2" />
                Show QR Code
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCopyAccount}
                className="flex-1 bg-transparent"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Account
              </Button>
            </div>

            <div className="text-sm text-muted-foreground bg-blue-50 p-3 rounded-lg">
              <p className="font-medium text-blue-900 mb-1">Instructions:</p>
              <p>
                Scan the QR code or copy the account number to make a transfer
                from your bank. Include your phone number in the transfer
                description for faster processing.
              </p>
            </div>
          </CardContent>
        </Card>

        <Button type="submit" className="w-full" size="lg">
          Continue to Confirmation
        </Button>
      </form>

      {/* QR Code Dialog */}
      <Dialog open={showQR} onOpenChange={setShowQR}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5 text-blue-600" />
              Bank Transfer QR Code
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Bank Transfer QR</p>
                  <p className="text-xs text-gray-400">
                    {bankDetails.accountNumber}
                  </p>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Scan this QR code with your banking app to transfer money directly
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

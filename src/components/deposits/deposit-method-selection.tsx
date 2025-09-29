"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Smartphone } from "lucide-react";

interface DepositMethodSelectionProps {
  onMethodSelect: (method: "bank" | "mobile") => void;
}

export function DepositMethodSelection({
  onMethodSelect,
}: DepositMethodSelectionProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Choose Deposit Method</h2>
        <p className="text-muted-foreground">
          Select how you'd like to deposit money
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Bank Deposit */}
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="text-center pb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle className="text-lg">Bank Transfer</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Transfer money from your bank account using our account details
            </p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• QR code for easy scanning</li>
              <li>• Copy account details</li>
              <li>• Instant processing</li>
            </ul>
            <Button onClick={() => onMethodSelect("bank")} className="w-full">
              Select Bank Transfer
            </Button>
          </CardContent>
        </Card>

        {/* Mobile Money */}
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="text-center pb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Smartphone className="h-6 w-6 text-orange-600" />
            </div>
            <CardTitle className="text-lg">Mobile Money</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Deposit using MTN Mobile Money, Orange Money, or other providers
            </p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Multiple network support</li>
              <li>• QR code generation</li>
              <li>• Fast and secure</li>
            </ul>
            <Button onClick={() => onMethodSelect("mobile")} className="w-full">
              Select Mobile Money
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

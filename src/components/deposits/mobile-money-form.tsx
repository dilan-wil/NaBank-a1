"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Smartphone, QrCode, Copy, ArrowLeft } from "lucide-react";
// import { useToast } from "@/hooks/use-toast"
import { toast } from "sonner";

interface MobileMoneyFormProps {
  onBack: () => void;
  onSubmit: (data: any) => void;
}

const mobileNetworks = [
  { id: "MTN", name: "MTN Mobile Money", color: "bg-yellow-500" },
  { id: "OM", name: "Orange Money", color: "bg-orange-500" },
  // { id: "express", name: "Express Union", color: "bg-blue-500" },
  // { id: "nexttel", name: "Nexttel", color: "bg-purple-500" },
];

export function MobileMoneyForm({ onBack, onSubmit }: MobileMoneyFormProps) {
  const [amount, setAmount] = useState("");
  const [network, setNetwork] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showQR, setShowQR] = useState(false);
  //   const { toast } = useToast()

  const selectedNetwork = mobileNetworks.find((n) => n.id === network);

  const handleCopyNumber = () => {
    if (phoneNumber) {
      navigator.clipboard.writeText(phoneNumber);
      //   toast({
      //     title: "Copied!",
      //     description: "Phone number copied to clipboard",
      //   })
      toast.success("Phone number copied to clipboard");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      //   toast({
      //     title: "Invalid Amount",
      //     description: "Please enter a valid amount greater than zero",
      //     variant: "destructive",
      //   })
      toast.error("Please enter a valid amount greater than zero");

      return;
    }

    if (!network) {
      //   toast({
      //     title: "Network Required",
      //     description: "Please select a mobile money network",
      //     variant: "destructive",
      //   })
      toast.error("Please select a mobile money network");
      return;
    }

    if (!phoneNumber || phoneNumber.length < 9) {
      //   toast({
      //     title: "Invalid Phone Number",
      //     description: "Please enter a valid phone number",
      //     variant: "destructive",
      //   })
      toast.error("Please enter a valid phone number");

      return;
    }

    onSubmit({
      method: "mobile",
      amount,
      apiUserTransfer: network,
      phoneNumber: `237${phoneNumber}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-xl font-semibold">Mobile Money Deposit</h2>
          <p className="text-muted-foreground">
            Deposit using mobile money services
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

        {/* Network Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Mobile Money Network</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="network">Select Network</Label>
              <Select value={network} onValueChange={setNetwork}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose your mobile money provider" />
                </SelectTrigger>
                <SelectContent>
                  {mobileNetworks.map((net) => (
                    <SelectItem key={net.id} value={net.id}>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${net.color}`} />
                        {net.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Your Mobile Number</Label>
              <div className="flex">
                <div className="flex items-center px-3 bg-muted border border-r-0 rounded-l-md">
                  <span className="text-sm text-muted-foreground">+237</span>
                </div>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="6XXXXXXXX"
                  value={phoneNumber}
                  onChange={(e) =>
                    setPhoneNumber(
                      e.target.value.replace(/\D/g, "").slice(0, 9)
                    )
                  }
                  className="rounded-l-none"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        {/* {network && phoneNumber && (
          <Card>
            <CardHeader className="flex flex-row items-center gap-3">
              <Smartphone className="h-5 w-5 text-orange-600" />
              <CardTitle className="text-lg">Deposit Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Network</span>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${selectedNetwork?.color}`}
                    />
                    <span className="font-medium">{selectedNetwork?.name}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Your Number
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-medium">
                      +237{phoneNumber}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleCopyNumber}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={() => setShowQR(true)}
                className="w-full"
              >
                <QrCode className="h-4 w-4 mr-2" />
                Show QR Code
              </Button>

              <div className="text-sm text-muted-foreground bg-orange-50 p-3 rounded-lg">
                <p className="font-medium text-orange-900 mb-1">
                  Instructions:
                </p>
                <p>
                  Send the amount to this number or scan the QR code to complete
                  the deposit. You will receive a confirmation SMS once the
                  transaction is processed.
                </p>
              </div>
            </CardContent>
          </Card>
        )} */}

        <Button type="submit" className="w-full" size="lg">
          Continue to Confirmation
        </Button>
      </form>

      {/* QR Code Dialog */}
      <Dialog open={showQR} onOpenChange={setShowQR}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5 text-orange-600" />
              Mobile Money QR Code
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">
                    {selectedNetwork?.name}
                  </p>
                  <p className="text-xs text-gray-400">+237{phoneNumber}</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Scan this QR code with your mobile money app to send money
              directly
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

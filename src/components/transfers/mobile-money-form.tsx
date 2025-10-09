"use client";

import type React from "react";

import { useEffect, useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, mockAccounts } from "@/lib/mock-data";
import { customerAccountApi } from "@/lib/api";
import { useCustomerStore } from "@/lib/store";

const mobileProviders = [
  { id: "MTN", name: "MTN Mobile Money", color: "text-yellow-600" },
  { id: "OM", name: "Orange Money", color: "text-orange-600" },
];

interface MobileMoneyFormProps {
  onSubmit: (data: any) => void;
}

export function MobileMoneyForm({ onSubmit }: MobileMoneyFormProps) {
  const [balances, setBalances] = useState<Record<string, number>>({});
  const { accounts } = useCustomerStore();

  const [formData, setFormData] = useState({
    fromAccount: "",
    apiUserTransfer: "",
    phoneNumber: "",
    recipientName: "",
    amount: "",
    description: "",
  });

  useEffect(() => {
    const fetchBalances = async () => {
      const result: Record<string, number> = {};
      for (const account of accounts!) {
        const balance = await customerAccountApi.getAccountBalance(
          account.accountNumber
        );
        result[account.id] = balance.amount;
      }
      setBalances(result);
    };

    fetchBalances();
  }, [accounts]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      type: "mobile",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mobile Money Transfer</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fromAccount">From Account</Label>
            <Select
              value={formData.fromAccount}
              onValueChange={(value) => handleInputChange("fromAccount", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select source account" />
              </SelectTrigger>
              <SelectContent>
                {accounts?.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.accountType} -{" "}
                    {balances[account.id] !== undefined
                      ? formatCurrency(balances[account.id], "XAF")
                      : "••••••"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="provider">Mobile Money Provider</Label>
            <Select
              value={formData.apiUserTransfer}
              onValueChange={(value) =>
                handleInputChange("apiUserTransfer", value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select provider" />
              </SelectTrigger>
              <SelectContent>
                {mobileProviders.map((provider) => (
                  <SelectItem key={provider.id} value={provider.id}>
                    <span className={provider.color}>{provider.name}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="recipientPhone">Recipient Phone Number</Label>
            <div className="flex">
              <div className="flex items-center px-3 border border-r-0 rounded-l-md">
                <span className="text-sm">+237</span>
              </div>
              <Input
                id="recipientPhone"
                placeholder="6XX XXX XXX"
                value={formData.phoneNumber}
                onChange={(e) =>
                  handleInputChange("phoneNumber", e.target.value)
                }
                className="rounded-l-none"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="recipientName">Recipient Name</Label>
            <Input
              id="recipientName"
              placeholder="Full name of recipient"
              value={formData.recipientName}
              onChange={(e) =>
                handleInputChange("recipientName", e.target.value)
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount (XAF)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0"
              value={formData.amount}
              onChange={(e) => handleInputChange("amount", e.target.value)}
              required
              min="1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="What's this transfer for?"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={3}
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Mobile money transfers are usually instant
              but may take up to 30 minutes during peak hours.
            </p>
          </div>

          <Button type="submit" className="w-full">
            Send Money
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

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
import { useCustomerStore } from "@/lib/store";
import { customerAccountApi } from "@/lib/api";
import { Account } from "@/lib/type";

interface NaBankTransferFormProps {
  onSubmit: (data: any) => void;
}

export function NaBankTransferForm({ onSubmit }: NaBankTransferFormProps) {
  const { accounts } = useCustomerStore();
  const [balances, setBalances] = useState<Record<string, number>>({});
  const [formData, setFormData] = useState({
    fromAccountNumber: "",
    toAccountNumber: "",
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
      type: "nabank",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const getBalance = async (account: Account) => {
    const balance = await customerAccountApi.getAccountBalance(
      account.accountNumber
    );
    console.log(balance);
    return balance;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>NaBank Transfer</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fromAccount">From Account</Label>
            <Select
              value={formData.fromAccountNumber}
              onValueChange={(value) =>
                handleInputChange("fromAccountNumber", value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select source account" />
              </SelectTrigger>
              <SelectContent>
                {accounts?.map((account) => (
                  <SelectItem key={account.id} value={account.accountNumber}>
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
            <Label htmlFor="recipientAccount">Recipient Account Number</Label>
            <Input
              id="recipientAccount"
              placeholder="Enter NaBank account number"
              value={formData.toAccountNumber}
              onChange={(e) =>
                handleInputChange("toAccountNumber", e.target.value)
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

          <Button type="submit" className="w-full">
            Send Money
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

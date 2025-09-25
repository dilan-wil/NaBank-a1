"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DollarSign, Clock, CheckCircle, Calculator } from "lucide-react";
import { useState } from "react";

export default function LoanPage() {
  const [loanType, setLoanType] = useState("");
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("");

  const calculateMonthlyPayment = () => {
    if (!amount || !duration) return 0;
    const principal = Number.parseFloat(amount);
    const months = Number.parseInt(duration);
    const interestRate = 0.15 / 12; // 15% annual rate
    const monthlyPayment =
      (principal * interestRate * Math.pow(1 + interestRate, months)) /
      (Math.pow(1 + interestRate, months) - 1);
    return monthlyPayment;
  };

  const existingLoans = [
    {
      id: "1",
      type: "Personal Loan",
      amount: 500000,
      remaining: 350000,
      monthlyPayment: 45000,
      nextPayment: "2024-02-15",
      status: "active",
      progress: 30,
    },
    {
      id: "2",
      type: "Business Loan",
      amount: 2000000,
      remaining: 0,
      monthlyPayment: 0,
      nextPayment: null,
      status: "completed",
      progress: 100,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Request Loan</h1>
        <p className="text-muted-foreground">
          Apply for personal or business loans with competitive rates
        </p>
      </div>

      {/* Loan Calculator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Loan Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="loan-type">Loan Type</Label>
              <Select value={loanType} onValueChange={setLoanType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select loan type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">Personal Loan</SelectItem>
                  <SelectItem value="business">Business Loan</SelectItem>
                  <SelectItem value="emergency">Emergency Loan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="amount">Amount (FCFA)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="500,000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="duration">Duration (months)</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">6 months</SelectItem>
                  <SelectItem value="12">12 months</SelectItem>
                  <SelectItem value="24">24 months</SelectItem>
                  <SelectItem value="36">36 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {amount && duration && (
            <div className="bg-muted p-4 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Monthly Payment
                  </p>
                  <p className="text-lg font-semibold">
                    {calculateMonthlyPayment().toLocaleString()} FCFA
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Interest Rate</p>
                  <p className="text-lg font-semibold">15% APR</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Interest
                  </p>
                  <p className="text-lg font-semibold">
                    {(
                      calculateMonthlyPayment() *
                        Number.parseInt(duration || "0") -
                      Number.parseFloat(amount || "0")
                    ).toLocaleString()}{" "}
                    FCFA
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="text-lg font-semibold">
                    {(
                      calculateMonthlyPayment() *
                      Number.parseInt(duration || "0")
                    ).toLocaleString()}{" "}
                    FCFA
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Loan Application Form */}
      <Card>
        <CardHeader>
          <CardTitle>Loan Application</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="full-name">Full Name</Label>
              <Input id="full-name" placeholder="John Doe" />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" placeholder="+237 6XX XXX XXX" />
            </div>
            <div>
              <Label htmlFor="employment">Employment Status</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select employment status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employed">Employed</SelectItem>
                  <SelectItem value="self-employed">Self Employed</SelectItem>
                  <SelectItem value="business-owner">Business Owner</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="income">Monthly Income (FCFA)</Label>
              <Input id="income" type="number" placeholder="200,000" />
            </div>
          </div>

          <div>
            <Label htmlFor="purpose">Loan Purpose</Label>
            <Textarea
              id="purpose"
              placeholder="Describe what you'll use the loan for..."
            />
          </div>

          <div className="flex gap-4">
            <Button className="flex-1">Submit Application</Button>
            <Button variant="outline">Save as Draft</Button>
          </div>
        </CardContent>
      </Card>

      {/* Existing Loans */}
      <Card>
        <CardHeader>
          <CardTitle>Your Loans</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {existingLoans.map((loan) => (
            <div key={loan.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-medium">{loan.type}</h3>
                    <p className="text-sm text-muted-foreground">
                      {loan.amount.toLocaleString()} FCFA
                    </p>
                  </div>
                </div>
                <Badge
                  variant={loan.status === "active" ? "default" : "secondary"}
                >
                  {loan.status === "active" ? (
                    <>
                      <Clock className="h-3 w-3 mr-1" /> Active
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-3 w-3 mr-1" /> Completed
                    </>
                  )}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{loan.progress}%</span>
                </div>
                <Progress value={loan.progress} className="h-2" />
              </div>

              {loan.status === "active" && (
                <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Remaining</p>
                    <p className="font-medium">
                      {loan.remaining.toLocaleString()} FCFA
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Next Payment</p>
                    <p className="font-medium">{loan.nextPayment}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

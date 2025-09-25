"use client";

import type React from "react";

import { useState } from "react";
import { BillCategoryGrid } from "@/components/payments/bill-category-grid";
import { BillPaymentForm } from "@/components/payments/bill-payment-form";
import { PaymentConfirmation } from "@/components/payments/payment-confirmation";
import { RecentPayments } from "@/components/payments/recent-payments";
import { CashbackSummary } from "@/components/payments/cashback-summary";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

type PaymentStep = "categories" | "form" | "confirm" | "success";

interface BillCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  cashback: number;
}

export default function PaymentsPage() {
  const [currentStep, setCurrentStep] = useState<PaymentStep>("categories");
  const [selectedCategory, setSelectedCategory] = useState<BillCategory | null>(
    null
  );
  const [paymentData, setPaymentData] = useState<any>(null);

  const handleCategorySelect = (category: BillCategory) => {
    setSelectedCategory(category);
    setCurrentStep("form");
  };

  const handleFormSubmit = (data: any) => {
    setPaymentData(data);
    setCurrentStep("confirm");
  };

  const handleConfirmPayment = () => {
    // Mock payment processing
    console.log("Processing payment:", paymentData);
    setCurrentStep("success");
  };

  const handleStartNew = () => {
    setCurrentStep("categories");
    setSelectedCategory(null);
    setPaymentData(null);
  };

  const renderSuccessScreen = () => (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="h-8 w-8 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
      <p className="text-muted-foreground mb-2">
        Your bill has been paid successfully
      </p>
      {paymentData?.cashbackAmount > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 max-w-sm mx-auto">
          <p className="text-sm text-green-800">
            🎉 You earned{" "}
            <strong>{paymentData.cashbackAmount.toLocaleString()} XAF</strong>{" "}
            in cashback!
          </p>
        </div>
      )}
      <div className="space-y-3">
        <Button onClick={handleStartNew} className="w-full max-w-sm">
          Pay Another Bill
        </Button>
        <Button
          variant="outline"
          onClick={() => (window.location.href = "/dashboard")}
          className="w-full max-w-sm"
        >
          Back to Dashboard
        </Button>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Bill Payments</h1>
          <p className="text-muted-foreground">
            Pay your bills and earn cashback rewards
          </p>
        </div>
        {currentStep !== "categories" && currentStep !== "success" && (
          <Button variant="outline" onClick={handleStartNew}>
            Pay Different Bill
          </Button>
        )}
      </div>

      {/* Payment Flow */}
      <div className="max-w-4xl mx-auto">
        {currentStep === "categories" && (
          <div className="space-y-6">
            <BillCategoryGrid onCategorySelect={handleCategorySelect} />
          </div>
        )}

        {currentStep === "form" && selectedCategory && (
          <div className="max-w-2xl mx-auto">
            <BillPaymentForm
              category={selectedCategory}
              onBack={() => setCurrentStep("categories")}
              onSubmit={handleFormSubmit}
            />
          </div>
        )}

        {currentStep === "confirm" && paymentData && (
          <div className="max-w-2xl mx-auto">
            <PaymentConfirmation
              paymentData={paymentData}
              onConfirm={handleConfirmPayment}
              onEdit={() => setCurrentStep("form")}
            />
          </div>
        )}

        {currentStep === "success" && renderSuccessScreen()}
      </div>

      {/* Recent Activity & Cashback */}
      {currentStep === "categories" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentPayments />
          <CashbackSummary />
        </div>
      )}
    </div>
  );
}

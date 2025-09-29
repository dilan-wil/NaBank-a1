"use client";

import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { DepositMethodSelection } from "@/components/deposits/deposit-method-selection";
import { BankDepositForm } from "@/components/deposits/bank-deposit-form";
import { MobileMoneyForm } from "@/components/deposits/mobile-money-form";
import { DepositConfirmation } from "@/components/deposits/deposit-confirmation";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { toast } from "sonner";
// import { useToast } from "@/hooks/use-toast";

type DepositStep = "method" | "form" | "confirm" | "success";
type DepositMethod = "bank" | "mobile" | null;

interface DepositData {
  method: DepositMethod;
  amount: string;
  // Bank deposit fields
  bankName?: string;
  accountNumber?: string;
  accountHolder?: string;
  // Mobile money fields
  network?: string;
  phoneNumber?: string;
}

export default function DepositsPage() {
  const [currentStep, setCurrentStep] = useState<DepositStep>("method");
  const [selectedMethod, setSelectedMethod] = useState<DepositMethod>(null);
  const [depositData, setDepositData] = useState<DepositData | null>(null);
  //   const { toast } = useToast();

  const handleMethodSelect = (method: DepositMethod) => {
    setSelectedMethod(method);
    setCurrentStep("form");
  };

  const handleFormSubmit = (data: DepositData) => {
    setDepositData(data);
    setCurrentStep("confirm");
  };

  const handleConfirmDeposit = async () => {
    try {
      // Mock API call - simulate deposit processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setCurrentStep("success");
      //   toast({
      //     title: "Deposit Successful!",
      //     description: `Your deposit of ${Number(
      //       depositData?.amount || 0
      //     ).toLocaleString()} XAF has been processed.`,
      //   });
      toast.success(
        `Your deposit of ${Number(
          depositData?.amount || 0
        ).toLocaleString()} XAF has been processed.`
      );
    } catch (error) {
      //   toast({
      //     title: "Deposit Failed",
      //     description:
      //       "There was an error processing your deposit. Please try again.",
      //     variant: "destructive",
      //   });
      toast.error(
        "There was an error processing your deposit. Please try again."
      );
    }
  };

  const handleStartNew = () => {
    setCurrentStep("method");
    setSelectedMethod(null);
    setDepositData(null);
  };

  const renderSuccessScreen = () => (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="h-8 w-8 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Deposit Successful!</h2>
      <p className="text-muted-foreground mb-6">
        Your deposit of{" "}
        <strong>{Number(depositData?.amount || 0).toLocaleString()} XAF</strong>{" "}
        has been processed
      </p>
      <div className="space-y-3">
        <Button onClick={handleStartNew} className="w-full max-w-sm">
          Make Another Deposit
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
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Deposit Funds
            </h1>
            <p className="text-muted-foreground">
              Add money to your NaBank account
            </p>
          </div>
          {currentStep !== "method" && currentStep !== "success" && (
            <Button variant="outline" onClick={handleStartNew}>
              Change Method
            </Button>
          )}
        </div>

        {/* Deposit Flow */}
        <div className="max-w-2xl mx-auto">
          {currentStep === "method" && (
            <DepositMethodSelection onMethodSelect={handleMethodSelect} />
          )}

          {currentStep === "form" && selectedMethod === "bank" && (
            <BankDepositForm
              onBack={() => setCurrentStep("method")}
              onSubmit={handleFormSubmit}
            />
          )}

          {currentStep === "form" && selectedMethod === "mobile" && (
            <MobileMoneyForm
              onBack={() => setCurrentStep("method")}
              onSubmit={handleFormSubmit}
            />
          )}

          {currentStep === "confirm" && depositData && (
            <DepositConfirmation
              depositData={depositData}
              onConfirm={handleConfirmDeposit}
              onEdit={() => setCurrentStep("form")}
            />
          )}

          {currentStep === "success" && renderSuccessScreen()}
        </div>
      </div>
    </AppLayout>
  );
}

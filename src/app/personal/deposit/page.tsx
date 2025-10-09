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
import { useRouter } from "next/navigation";
import { customerAccountApi } from "@/lib/api";
import { useCustomerStore } from "@/lib/store";
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
  const [depositData, setDepositData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const { customer } = useCustomerStore();
  const router = useRouter();
  //   const { toast } = useToast();

  const handleMethodSelect = (method: DepositMethod) => {
    setSelectedMethod(method);
    setCurrentStep("form");
  };

  const handleFormSubmit = (data: DepositData) => {
    console.log(data);
    setDepositData(data);
    setCurrentStep("confirm");
  };

  const handleConfirmDeposit = async () => {
    setLoading(true);

    try {
      const succeed =
        await customerAccountApi.depositIntoMainAccountUsingMobileMoney(
          customer!.id,
          depositData
        );
      toast.success(
        `Your deposit of ${Number(
          depositData?.amount || 0
        ).toLocaleString()} XAF has been processed.`
      );
      setCurrentStep("success");
    } catch (error) {
      toast.error(
        "There was an error processing your deposit. Please try again."
      );
    } finally {
      setLoading(false);
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
          onClick={() => router.push("/personal/dashboard")}
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
          <h1 className="text-2xl font-bold text-foreground">Deposit Funds</h1>
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
            loading={loading}
          />
        )}

        {currentStep === "success" && renderSuccessScreen()}
      </div>
    </div>
  );
}

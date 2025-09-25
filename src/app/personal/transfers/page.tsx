"use client";

import { useState } from "react";
import { TransferTypeSelector } from "@/components/transfers/transfer-type-selector";
import { NaBankTransferForm } from "@/components/transfers/nabank-transfer-form";
import { ExternalTransferForm } from "@/components/transfers/external-transfer-form";
import { MobileMoneyForm } from "@/components/transfers/mobile-money-form";
import { TransferConfirmation } from "@/components/transfers/transfer-confirmation";
import { TransferHistory } from "@/components/transfers/transfer-history";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

type TransferStep = "select" | "form" | "confirm" | "success";

export default function TransfersPage() {
  const [currentStep, setCurrentStep] = useState<TransferStep>("select");
  const [selectedType, setSelectedType] = useState("");
  const [transferData, setTransferData] = useState<any>(null);

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    setCurrentStep("form");
  };

  const handleFormSubmit = (data: any) => {
    setTransferData(data);
    setCurrentStep("confirm");
  };

  const handleConfirmTransfer = () => {
    // Mock transfer processing
    console.log("Processing transfer:", transferData);
    setCurrentStep("success");
  };

  const handleStartNew = () => {
    setCurrentStep("select");
    setSelectedType("");
    setTransferData(null);
  };

  const renderTransferForm = () => {
    switch (selectedType) {
      case "nabank":
        return <NaBankTransferForm onSubmit={handleFormSubmit} />;
      case "external":
        return <ExternalTransferForm onSubmit={handleFormSubmit} />;
      case "mobile":
        return <MobileMoneyForm onSubmit={handleFormSubmit} />;
      default:
        return null;
    }
  };

  const renderSuccessScreen = () => (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="h-8 w-8 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Transfer Successful!</h2>
      <p className="text-muted-foreground mb-6">
        Your money has been sent successfully
      </p>
      <div className="space-y-3">
        <Button onClick={handleStartNew} className="w-full max-w-sm">
          Make Another Transfer
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
          <h1 className="text-2xl font-bold text-foreground">Transfers</h1>
          <p className="text-muted-foreground">
            Send money to accounts and mobile wallets
          </p>
        </div>
        {currentStep !== "select" && currentStep !== "success" && (
          <Button variant="outline" onClick={handleStartNew}>
            Start New Transfer
          </Button>
        )}
      </div>

      {/* Transfer Flow */}
      <div className="max-w-2xl mx-auto">
        {currentStep === "select" && (
          <div className="space-y-6">
            <TransferTypeSelector
              selectedType={selectedType}
              onTypeSelect={handleTypeSelect}
            />
          </div>
        )}

        {currentStep === "form" && renderTransferForm()}

        {currentStep === "confirm" && transferData && (
          <TransferConfirmation
            transferData={transferData}
            onConfirm={handleConfirmTransfer}
            onEdit={() => setCurrentStep("form")}
          />
        )}

        {currentStep === "success" && renderSuccessScreen()}
      </div>

      {/* Transfer History */}
      {currentStep === "select" && (
        <div className="max-w-4xl mx-auto">
          <TransferHistory />
        </div>
      )}
    </div>
  );
}

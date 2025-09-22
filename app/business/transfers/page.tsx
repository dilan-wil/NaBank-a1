"use client"

import { useState } from "react"
import { BusinessLayout } from "@/components/business/business-layout"
import { TransferTypeSelector } from "@/components/business/transfer-type-selector"
import { BusinessTransferForm } from "@/components/business/business-transfer-form"
import { TransferConfirmation } from "@/components/business/transfer-confirmation"
import { TransferSuccess } from "@/components/business/transfer-success"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeftRight, Clock, CheckCircle, XCircle } from "lucide-react"
import { businessTransactions } from "@/lib/business-mock-data"

type TransferStep = "select" | "form" | "confirm" | "success"

export default function BusinessTransfersPage() {
  const [currentStep, setCurrentStep] = useState<TransferStep>("select")
  const [selectedType, setSelectedType] = useState("")
  const [transferData, setTransferData] = useState<any>(null)
  const [transactionId, setTransactionId] = useState("")

  const handleTypeSelect = (type: string) => {
    setSelectedType(type)
    setCurrentStep("form")
  }

  const handleFormSubmit = (data: any) => {
    setTransferData(data)
    setCurrentStep("confirm")
  }

  const handleConfirmTransfer = () => {
    // Generate mock transaction ID
    const mockId = `TXN-${Date.now()}`
    setTransactionId(mockId)
    setCurrentStep("success")
  }

  const handleNewTransfer = () => {
    setCurrentStep("select")
    setSelectedType("")
    setTransferData(null)
    setTransactionId("")
  }

  const handleBackToDashboard = () => {
    // Would navigate to dashboard
    console.log("Navigate to dashboard")
  }

  const recentTransfers = businessTransactions.slice(0, 3)

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "select":
        return <TransferTypeSelector selectedType={selectedType} onTypeSelect={handleTypeSelect} />
      case "form":
        return (
          <BusinessTransferForm
            transferType={selectedType}
            onSubmit={handleFormSubmit}
            onBack={() => setCurrentStep("select")}
          />
        )
      case "confirm":
        return (
          <TransferConfirmation
            transferData={transferData}
            onConfirm={handleConfirmTransfer}
            onBack={() => setCurrentStep("form")}
          />
        )
      case "success":
        return (
          <TransferSuccess
            transferData={transferData}
            transactionId={transactionId}
            onNewTransfer={handleNewTransfer}
            onBackToDashboard={handleBackToDashboard}
          />
        )
      default:
        return null
    }
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case "select":
        return "Choose Transfer Type"
      case "form":
        return "Transfer Details"
      case "confirm":
        return "Review Transfer"
      case "success":
        return "Transfer Complete"
      default:
        return "Business Transfers"
    }
  }

  return (
    <BusinessLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Business Transfers</h1>
            <p className="text-gray-600">{getStepTitle()}</p>
          </div>
          {currentStep !== "select" && (
            <Button variant="outline" onClick={handleNewTransfer}>
              <ArrowLeftRight className="w-4 h-4 mr-2" />
              New Transfer
            </Button>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center space-x-4 py-4">
          {["select", "form", "confirm", "success"].map((step, index) => {
            const isActive = currentStep === step
            const isCompleted = ["select", "form", "confirm", "success"].indexOf(currentStep) > index

            return (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    isActive
                      ? "bg-green-600 text-white"
                      : isCompleted
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {index + 1}
                </div>
                {index < 3 && <div className={`w-12 h-0.5 mx-2 ${isCompleted ? "bg-green-600" : "bg-gray-200"}`} />}
              </div>
            )
          })}
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto">{renderCurrentStep()}</div>

        {/* Recent Transfers - Only show on select step */}
        {currentStep === "select" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Recent Transfers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransfers.map((transfer) => (
                  <div key={transfer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <ArrowLeftRight className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{transfer.description}</p>
                        <p className="text-sm text-gray-500">{transfer.reference}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{transfer.amount.toLocaleString()} XAF</p>
                      <div className="flex items-center gap-1">
                        {transfer.status === "completed" ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : transfer.status === "pending" ? (
                          <Clock className="w-4 h-4 text-yellow-600" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-600" />
                        )}
                        <span className="text-sm text-gray-500 capitalize">{transfer.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </BusinessLayout>
  )
}

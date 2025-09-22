"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Users, Play, Eye, Download } from "lucide-react"
import type { PayrollBatch } from "@/lib/business-mock-data"

interface PayrollBatchCardProps {
  batch: PayrollBatch
  onProcess?: (batch: PayrollBatch) => void
  onView?: (batch: PayrollBatch) => void
  onDownload?: (batch: PayrollBatch) => void
}

export function PayrollBatchCard({ batch, onProcess, onView, onDownload }: PayrollBatchCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <Users className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900">{batch.batchName}</CardTitle>
            <p className="text-sm text-gray-600">{batch.employeeCount} employees</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={getStatusColor(batch.status)} variant="secondary">
            {batch.status}
          </Badge>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Total Amount</p>
            <p className="text-2xl font-bold text-gray-900">{batch.totalAmount.toLocaleString()} XAF</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Average Salary</p>
            <p className="text-lg font-medium text-gray-900">
              {Math.round(batch.totalAmount / batch.employeeCount).toLocaleString()} XAF
            </p>
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-gray-500">Created: {new Date(batch.createdAt).toLocaleDateString()}</p>
          {batch.processedAt && (
            <p className="text-sm text-gray-500">Processed: {new Date(batch.processedAt).toLocaleDateString()}</p>
          )}
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onView?.(batch)} className="flex-1 bg-transparent">
            <Eye className="w-4 h-4 mr-1" />
            View
          </Button>
          {batch.status === "draft" && (
            <Button size="sm" onClick={() => onProcess?.(batch)} className="bg-green-600 hover:bg-green-700">
              <Play className="w-4 h-4 mr-1" />
              Process
            </Button>
          )}
          {batch.status === "completed" && (
            <Button variant="outline" size="sm" onClick={() => onDownload?.(batch)}>
              <Download className="w-4 h-4 mr-1" />
              Report
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

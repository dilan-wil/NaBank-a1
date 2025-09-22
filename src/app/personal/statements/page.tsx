"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, FileText, Calendar } from "lucide-react"

export default function StatementsPage() {
  const [selectedAccount, setSelectedAccount] = useState("")
  const [selectedPeriod, setSelectedPeriod] = useState("")
  const [selectedFormat, setSelectedFormat] = useState("pdf")

  const mockStatements = [
    {
      id: "1",
      period: "January 2024",
      account: "Main Account",
      transactions: 45,
      size: "2.3 MB",
      date: "2024-02-01",
    },
    {
      id: "2",
      period: "December 2023",
      account: "Main Account",
      transactions: 38,
      size: "2.1 MB",
      date: "2024-01-01",
    },
    {
      id: "3",
      period: "November 2023",
      account: "Savings Account",
      transactions: 12,
      size: "0.8 MB",
      date: "2023-12-01",
    },
  ]

  const handleDownload = (statementId: string) => {
    console.log("Downloading statement:", statementId)
    // Mock download
  }

  const handleGenerateStatement = () => {
    console.log("Generating statement:", { selectedAccount, selectedPeriod, selectedFormat })
    // Mock statement generation
  }

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => (window.location.href = "/more")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Account Statements</h1>
            <p className="text-muted-foreground">Download your account statements in PDF or CSV format</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          {/* Generate New Statement */}
          <Card>
            <CardHeader>
              <CardTitle>Generate Statement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Account</label>
                <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select account" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main">Main Account</SelectItem>
                    <SelectItem value="savings">Savings Account</SelectItem>
                    <SelectItem value="all">All Accounts</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Period</label>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current">Current Month</SelectItem>
                    <SelectItem value="last">Last Month</SelectItem>
                    <SelectItem value="quarter">Last 3 Months</SelectItem>
                    <SelectItem value="year">Last 12 Months</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Format</label>
                <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF Document</SelectItem>
                    <SelectItem value="csv">CSV Spreadsheet</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleGenerateStatement}
                className="w-full"
                disabled={!selectedAccount || !selectedPeriod}
              >
                <FileText className="h-4 w-4 mr-2" />
                Generate Statement
              </Button>
            </CardContent>
          </Card>

          {/* Previous Statements */}
          <Card>
            <CardHeader>
              <CardTitle>Previous Statements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockStatements.map((statement) => (
                  <div key={statement.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{statement.period}</p>
                        <p className="text-sm text-muted-foreground">{statement.account}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {statement.transactions} transactions
                          </Badge>
                          <span className="text-xs text-muted-foreground">{statement.size}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Button variant="outline" size="sm" onClick={() => handleDownload(statement.id)}>
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                      <p className="text-xs text-muted-foreground mt-1">
                        <Calendar className="h-3 w-3 inline mr-1" />
                        {statement.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Statement Info */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">About Account Statements</h4>
                  <ul className="text-sm text-blue-800 mt-2 space-y-1">
                    <li>• Statements are generated monthly and available for download</li>
                    <li>• PDF format includes detailed transaction information</li>
                    <li>• CSV format is suitable for importing into spreadsheet applications</li>
                    <li>• Statements are kept for 7 years for your records</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}

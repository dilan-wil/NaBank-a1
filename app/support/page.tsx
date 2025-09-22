"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { HelpCircle, MessageSquare, Phone, Mail, Search, Book, Video, FileText, Clock } from "lucide-react"
import { useState } from "react"

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const faqItems = [
    {
      id: "1",
      question: "How do I transfer money to another bank?",
      answer: "Go to Transfers > External Transfer, enter recipient details, amount, and confirm with your PIN.",
      category: "Transfers",
    },
    {
      id: "2",
      question: "What are the transaction limits?",
      answer:
        "Daily limits: 500,000 FCFA for transfers, 1,000,000 FCFA for bill payments. Monthly limits vary by account type.",
      category: "Limits",
    },
    {
      id: "3",
      question: "How do I request a new card?",
      answer: "Go to Cards > Request New Card, choose virtual or physical, and follow the verification steps.",
      category: "Cards",
    },
    {
      id: "4",
      question: "How do I enable 2FA?",
      answer: "Go to Security > Two-Factor Authentication and toggle on SMS Authentication.",
      category: "Security",
    },
  ]

  const supportTickets = [
    {
      id: "TK-001",
      subject: "Unable to complete transfer",
      status: "open",
      priority: "high",
      created: "2024-01-15",
      lastUpdate: "2024-01-15",
    },
    {
      id: "TK-002",
      subject: "Card activation issue",
      status: "in_progress",
      priority: "medium",
      created: "2024-01-12",
      lastUpdate: "2024-01-14",
    },
    {
      id: "TK-003",
      subject: "Account verification",
      status: "resolved",
      priority: "low",
      created: "2024-01-08",
      lastUpdate: "2024-01-10",
    },
  ]

  const filteredFAQ = faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Help & Support</h1>
          <p className="text-muted-foreground">Get help with your NaBank account and services</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-medium mb-1">Live Chat</h3>
              <p className="text-xs text-muted-foreground">Chat with our support team</p>
              <Badge variant="secondary" className="mt-2 bg-green-100 text-green-800">
                Online
              </Badge>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Phone className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium mb-1">Call Us</h3>
              <p className="text-xs text-muted-foreground">+237 233 XX XX XX</p>
              <Badge variant="secondary" className="mt-2">
                24/7 Available
              </Badge>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Mail className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-medium mb-1">Email</h3>
              <p className="text-xs text-muted-foreground">support@nabank.cm</p>
              <Badge variant="secondary" className="mt-2">
                Response in 24h
              </Badge>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Video className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-medium mb-1">Video Call</h3>
              <p className="text-xs text-muted-foreground">Schedule a video session</p>
              <Badge variant="secondary" className="mt-2">
                Book Now
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Search FAQ */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search Help Articles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredFAQ.map((faq) => (
                <div key={faq.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium">{faq.question}</h3>
                    <Badge variant="outline">{faq.category}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
              {filteredFAQ.length === 0 && searchQuery && (
                <div className="text-center py-8">
                  <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No articles found for "{searchQuery}"</p>
                  <Button variant="outline" className="mt-4 bg-transparent">
                    Contact Support
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Submit Ticket */}
        <Card>
          <CardHeader>
            <CardTitle>Submit Support Ticket</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ticket-subject">Subject</Label>
                <Input id="ticket-subject" placeholder="Brief description of your issue" />
              </div>
              <div>
                <Label htmlFor="ticket-category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="account">Account Issues</SelectItem>
                    <SelectItem value="transfers">Transfers</SelectItem>
                    <SelectItem value="cards">Cards</SelectItem>
                    <SelectItem value="payments">Payments</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="ticket-priority">Priority</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="ticket-description">Description</Label>
              <Textarea
                id="ticket-description"
                placeholder="Please provide detailed information about your issue..."
                rows={4}
              />
            </div>

            <Button className="w-full">Submit Ticket</Button>
          </CardContent>
        </Card>

        {/* My Tickets */}
        <Card>
          <CardHeader>
            <CardTitle>My Support Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {supportTickets.map((ticket) => (
                <div key={ticket.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{ticket.subject}</h3>
                      <p className="text-sm text-muted-foreground">Ticket #{ticket.id}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          Created: {ticket.created} | Updated: {ticket.lastUpdate}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        ticket.status === "open"
                          ? "destructive"
                          : ticket.status === "in_progress"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {ticket.status.replace("_", " ")}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={
                        ticket.priority === "high"
                          ? "border-red-200 text-red-600"
                          : ticket.priority === "medium"
                            ? "border-orange-200 text-orange-600"
                            : "border-gray-200 text-gray-600"
                      }
                    >
                      {ticket.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Resources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="h-5 w-5" />
              Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-start bg-transparent">
                <Book className="h-5 w-5 mb-2" />
                <span className="font-medium">User Guide</span>
                <p className="text-sm text-muted-foreground text-left">Complete guide to using NaBank</p>
              </Button>

              <Button variant="outline" className="h-auto p-4 flex flex-col items-start bg-transparent">
                <Video className="h-5 w-5 mb-2" />
                <span className="font-medium">Video Tutorials</span>
                <p className="text-sm text-muted-foreground text-left">Step-by-step video guides</p>
              </Button>

              <Button variant="outline" className="h-auto p-4 flex flex-col items-start bg-transparent">
                <FileText className="h-5 w-5 mb-2" />
                <span className="font-medium">API Documentation</span>
                <p className="text-sm text-muted-foreground text-left">For developers and integrations</p>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}

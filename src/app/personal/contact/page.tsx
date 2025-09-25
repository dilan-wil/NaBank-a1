"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  Building,
  Users,
  Headphones,
} from "lucide-react";

export default function ContactPage() {
  const contactMethods = [
    {
      id: "phone",
      title: "Phone Support",
      description: "Speak directly with our support team",
      contact: "+237 233 XX XX XX",
      availability: "24/7 Available",
      icon: Phone,
      color: "bg-green-100 text-green-600",
      status: "online",
    },
    {
      id: "email",
      title: "Email Support",
      description: "Send us an email for detailed inquiries",
      contact: "support@nabank.cm",
      availability: "Response within 24 hours",
      icon: Mail,
      color: "bg-blue-100 text-blue-600",
      status: "online",
    },
    {
      id: "chat",
      title: "Live Chat",
      description: "Chat with our support agents in real-time",
      contact: "Available in app",
      availability: "Mon-Fri 8AM-8PM",
      icon: MessageSquare,
      color: "bg-purple-100 text-purple-600",
      status: "online",
    },
    {
      id: "whatsapp",
      title: "WhatsApp",
      description: "Message us on WhatsApp for quick support",
      contact: "+237 6XX XXX XXX",
      availability: "Mon-Fri 8AM-6PM",
      icon: MessageSquare,
      color: "bg-green-100 text-green-600",
      status: "online",
    },
  ];

  const offices = [
    {
      id: "douala",
      name: "Douala Head Office",
      address: "123 Boulevard de la Liberté, Akwa, Douala",
      phone: "+237 233 XX XX XX",
      hours: "Mon-Fri: 8AM-5PM, Sat: 9AM-2PM",
      services: ["Account Opening", "Customer Service", "Business Banking"],
    },
    {
      id: "yaounde",
      name: "Yaoundé Branch",
      address: "456 Avenue Kennedy, Centre-ville, Yaoundé",
      phone: "+237 222 XX XX XX",
      hours: "Mon-Fri: 8AM-5PM, Sat: 9AM-2PM",
      services: ["Customer Service", "Loan Applications", "Card Services"],
    },
    {
      id: "bafoussam",
      name: "Bafoussam Branch",
      address: "789 Rue des Martyrs, Bafoussam",
      phone: "+237 233 XX XX XX",
      hours: "Mon-Fri: 8AM-4PM",
      services: ["Customer Service", "Money Transfers"],
    },
  ];

  const departments = [
    {
      id: "general",
      name: "General Support",
      description: "General inquiries and account support",
      email: "support@nabank.cm",
      icon: Headphones,
    },
    {
      id: "business",
      name: "Business Banking",
      description: "Business accounts and corporate services",
      email: "business@nabank.cm",
      icon: Building,
    },
    {
      id: "sales",
      name: "Sales & Partnerships",
      description: "New partnerships and business opportunities",
      email: "sales@nabank.cm",
      icon: Users,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Contact Us</h1>
        <p className="text-muted-foreground">
          Get in touch with our support team for assistance
        </p>
      </div>

      {/* Contact Methods */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {contactMethods.map((method) => (
          <Card
            key={method.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
          >
            <CardContent className="p-6 text-center">
              <div
                className={`w-12 h-12 ${method.color} rounded-lg flex items-center justify-center mx-auto mb-3`}
              >
                <method.icon className="h-6 w-6" />
              </div>
              <h3 className="font-medium mb-1">{method.title}</h3>
              <p className="text-xs text-muted-foreground mb-2">
                {method.description}
              </p>
              <p className="text-sm font-medium mb-2">{method.contact}</p>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                {method.status === "online" ? "Available" : "Offline"}
              </Badge>
              <p className="text-xs text-muted-foreground mt-2">
                {method.availability}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contact Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            Send us a Message
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="first-name">First Name</Label>
              <Input id="first-name" placeholder="John" />
            </div>
            <div>
              <Label htmlFor="last-name">Last Name</Label>
              <Input id="last-name" placeholder="Doe" />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" placeholder="+237 6XX XXX XXX" />
            </div>
          </div>

          <div>
            <Label htmlFor="department">Department</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" placeholder="How can we help you?" />
          </div>

          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Please describe your inquiry in detail..."
              rows={5}
            />
          </div>

          <Button className="w-full">
            <Send className="h-4 w-4 mr-2" />
            Send Message
          </Button>
        </CardContent>
      </Card>

      {/* Department Contacts */}
      <Card>
        <CardHeader>
          <CardTitle>Department Contacts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {departments.map((dept) => (
              <div key={dept.id} className="border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <dept.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{dept.name}</h3>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {dept.description}
                </p>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{dept.email}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Office Locations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Office Locations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {offices.map((office) => (
              <div key={office.id} className="border rounded-lg p-4">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-medium text-lg mb-2">{office.name}</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{office.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>{office.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{office.hours}</span>
                      </div>
                    </div>
                  </div>

                  <div className="md:w-64">
                    <h4 className="font-medium mb-2">Services Available</h4>
                    <div className="flex flex-wrap gap-2">
                      {office.services.map((service, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Emergency Contact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="font-medium text-red-800 mb-2">
              Lost or Stolen Card?
            </h3>
            <p className="text-sm text-red-700 mb-3">
              If your card is lost or stolen, contact us immediately to block it
              and prevent unauthorized use.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="destructive" className="flex-1">
                <Phone className="h-4 w-4 mr-2" />
                Call Emergency Line: +237 233 XX XX XX
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
              >
                Block Card in App
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

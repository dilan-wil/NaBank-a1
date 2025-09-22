"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Building2, Smartphone } from "lucide-react"

interface TransferType {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
}

const transferTypes: TransferType[] = [
  {
    id: "nabank",
    name: "NaBank Transfer",
    description: "Send money to another NaBank account",
    icon: Building2,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: "external",
    name: "External Bank",
    description: "Transfer to other banks",
    icon: Building2,
    color: "bg-green-100 text-green-600",
  },
  {
    id: "mobile",
    name: "Mobile Money",
    description: "Send to MTN/Orange Money",
    icon: Smartphone,
    color: "bg-orange-100 text-orange-600",
  },
]

interface TransferTypeSelectorProps {
  selectedType: string
  onTypeSelect: (type: string) => void
}

export function TransferTypeSelector({ selectedType, onTypeSelect }: TransferTypeSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {transferTypes.map((type) => (
        <Card
          key={type.id}
          className={`cursor-pointer transition-all hover:shadow-md ${
            selectedType === type.id ? "ring-2 ring-primary shadow-md" : ""
          }`}
          onClick={() => onTypeSelect(type.id)}
        >
          <CardContent className="p-6 text-center">
            <div className={`w-12 h-12 rounded-lg ${type.color} flex items-center justify-center mx-auto mb-3`}>
              <type.icon className="h-6 w-6" />
            </div>
            <h3 className="font-medium mb-1">{type.name}</h3>
            <p className="text-sm text-muted-foreground">{type.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Building2, Landmark, Smartphone } from "lucide-react"

interface TransferTypeSelectorProps {
  selectedType: string
  onTypeSelect: (type: string) => void
}

export function TransferTypeSelector({ selectedType, onTypeSelect }: TransferTypeSelectorProps) {
  const transferTypes = [
    {
      id: "nabank",
      title: "NaBank Transfer",
      description: "Transfer to another NaBank business account",
      icon: Building2,
      color: "green",
    },
    {
      id: "external",
      title: "External Bank",
      description: "Transfer to other banks in Cameroon",
      icon: Landmark,
      color: "blue",
    },
    {
      id: "mobile",
      title: "Mobile Money",
      description: "Transfer to MTN/Orange mobile wallets",
      icon: Smartphone,
      color: "purple",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {transferTypes.map((type) => {
        const isSelected = selectedType === type.id
        const Icon = type.icon

        return (
          <Card
            key={type.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              isSelected ? `ring-2 ring-${type.color}-500 bg-${type.color}-50` : "hover:bg-gray-50"
            }`}
            onClick={() => onTypeSelect(type.id)}
          >
            <CardContent className="p-6 text-center">
              <div
                className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  isSelected ? `bg-${type.color}-600 text-white` : `bg-${type.color}-100 text-${type.color}-600`
                }`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{type.title}</h3>
              <p className="text-sm text-gray-600">{type.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Zap, Droplets, Tv, Wifi, Smartphone, Car, GraduationCap, Heart } from "lucide-react"

interface BillCategory {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  cashback: number
}

const billCategories: BillCategory[] = [
  {
    id: "electricity",
    name: "Electricity",
    description: "ENEO bills",
    icon: Zap,
    color: "bg-yellow-100 text-yellow-600",
    cashback: 2,
  },
  {
    id: "water",
    name: "Water",
    description: "Camwater bills",
    icon: Droplets,
    color: "bg-blue-100 text-blue-600",
    cashback: 1.5,
  },
  {
    id: "tv",
    name: "TV & Cable",
    description: "DSTV, Startimes",
    icon: Tv,
    color: "bg-purple-100 text-purple-600",
    cashback: 3,
  },
  {
    id: "internet",
    name: "Internet",
    description: "ISP bills",
    icon: Wifi,
    color: "bg-green-100 text-green-600",
    cashback: 2.5,
  },
  {
    id: "airtime",
    name: "Airtime",
    description: "MTN, Orange, Camtel",
    icon: Smartphone,
    color: "bg-orange-100 text-orange-600",
    cashback: 1,
  },
  {
    id: "transport",
    name: "Transport",
    description: "Fuel, parking",
    icon: Car,
    color: "bg-red-100 text-red-600",
    cashback: 1.5,
  },
  {
    id: "education",
    name: "Education",
    description: "School fees",
    icon: GraduationCap,
    color: "bg-indigo-100 text-indigo-600",
    cashback: 2,
  },
  {
    id: "health",
    name: "Healthcare",
    description: "Medical bills",
    icon: Heart,
    color: "bg-pink-100 text-pink-600",
    cashback: 2.5,
  },
]

interface BillCategoryGridProps {
  onCategorySelect: (category: BillCategory) => void
}

export function BillCategoryGrid({ onCategorySelect }: BillCategoryGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {billCategories.map((category) => (
        <Card
          key={category.id}
          className="cursor-pointer transition-all hover:shadow-md hover:scale-105"
          onClick={() => onCategorySelect(category)}
        >
          <CardContent className="p-6 text-center">
            <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mx-auto mb-3`}>
              <category.icon className="h-6 w-6" />
            </div>
            <h3 className="font-medium mb-1">{category.name}</h3>
            <p className="text-xs text-muted-foreground mb-2">{category.description}</p>
            <div className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full">
              {category.cashback}% cashback
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Minus, ArrowLeftRight, CreditCard } from "lucide-react";

const actions = [
  {
    name: "Deposit",
    icon: Plus,
    color: "bg-green-500 hover:bg-green-600",
    href: "/personal/deposit",
  },
  {
    name: "Withdraw",
    icon: Minus,
    color: "bg-red-500 hover:bg-red-600",
    href: "/personal/transfers",
  },
  {
    name: "Transfer",
    icon: ArrowLeftRight,
    color: "bg-blue-500 hover:bg-blue-600",
    href: "/personal/transfers",
  },
  {
    name: "Cards",
    icon: CreditCard,
    color: "bg-purple-500 hover:bg-purple-600",
    href: "/personal//cards",
  },
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {actions.map((action) => (
            <Button
              key={action.name}
              variant="outline"
              className="h-20 flex-col gap-2 hover:scale-105 transition-transform bg-transparent"
              onClick={() => (window.location.href = action.href)}
            >
              <div className={`p-2 rounded-lg ${action.color}`}>
                <action.icon className="h-5 w-5 text-white" />
              </div>
              <span className="text-sm">{action.name}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import type React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  User,
  UserPlus,
  DollarSign,
  FileText,
  Shield,
  HelpCircle,
  Settings,
  Gift,
  Bell,
  Phone,
} from "lucide-react";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  href: string;
}

const menuItems: MenuItem[] = [
  {
    id: "profile",
    name: "Profile",
    description: "View and update your profile",
    icon: User,
    color: "bg-blue-100 text-blue-600",
    href: "/personal/profile",
  },
  {
    id: "invite",
    name: "Invite Friends",
    description: "Share referral link and earn rewards",
    icon: UserPlus,
    color: "bg-green-100 text-green-600",
    href: "/personal/invite",
  },
  {
    id: "loan",
    name: "Request Loan",
    description: "Apply for personal or business loans",
    icon: DollarSign,
    color: "bg-purple-100 text-purple-600",
    href: "/personal/loan",
  },
  {
    id: "statements",
    name: "Statements",
    description: "Download account statements",
    icon: FileText,
    color: "bg-orange-100 text-orange-600",
    href: "/personal/statements",
  },
  {
    id: "rewards",
    name: "Rewards",
    description: "View cashback and rewards",
    icon: Gift,
    color: "bg-pink-100 text-pink-600",
    href: "/personal/rewards",
  },
  {
    id: "notifications",
    name: "Notifications",
    description: "Manage your notifications",
    icon: Bell,
    color: "bg-yellow-100 text-yellow-600",
    href: "/personal/notifications",
  },
  {
    id: "security",
    name: "Security",
    description: "Security settings and 2FA",
    icon: Shield,
    color: "bg-red-100 text-red-600",
    href: "/personal/security",
  },
  {
    id: "settings",
    name: "Settings",
    description: "App preferences and settings",
    icon: Settings,
    color: "bg-gray-100 text-gray-600",
    href: "/personal/settings",
  },
  {
    id: "support",
    name: "Help & Support",
    description: "Get help and contact support",
    icon: HelpCircle,
    color: "bg-indigo-100 text-indigo-600",
    href: "/personal/support",
  },
  {
    id: "contact",
    name: "Contact Us",
    description: "Phone, email, and live chat",
    icon: Phone,
    color: "bg-teal-100 text-teal-600",
    href: "/personal/contact",
  },
];

interface MoreMenuGridProps {
  onItemSelect: (item: MenuItem) => void;
}

export function MoreMenuGrid({ onItemSelect }: MoreMenuGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {menuItems.map((item) => (
        <Card
          key={item.id}
          className="cursor-pointer transition-all hover:shadow-md hover:scale-105"
          onClick={() => onItemSelect(item)}
        >
          <CardContent className="p-6 text-center">
            <div
              className={`w-12 h-12 rounded-lg ${item.color} flex items-center justify-center mx-auto mb-3`}
            >
              <item.icon className="h-6 w-6" />
            </div>
            <h3 className="font-medium mb-1 text-sm">{item.name}</h3>
            <p className="text-xs text-muted-foreground">{item.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

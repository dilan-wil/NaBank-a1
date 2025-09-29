"use client";

import {
  Home,
  CreditCard,
  ArrowLeftRight,
  PiggyBank,
  Receipt,
  MoreHorizontal,
  User,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const navigation = [
  { name: "Dashboard", href: "/personal/dashboard", icon: Home },
  { name: "Cards", href: "/personal/cards", icon: CreditCard },
  { name: "Transfers", href: "/personal/transfers", icon: ArrowLeftRight },
  { name: "Savings", href: "/personal/savings", icon: PiggyBank },
  { name: "Payments", href: "/personal/payments", icon: Receipt },
  { name: "More", href: "/personal/more", icon: MoreHorizontal },
];

const moreItems = [
  { name: "Profile", href: "/personal/profile", icon: User },
  { name: "Settings", href: "/personal/settings", icon: Settings },
  { name: "Help", href: "/personal/help", icon: HelpCircle },
  { name: "Logout", href: "/personal/logout", icon: LogOut },
];

interface AppSidebarProps {
  className?: string;
}

export function AppSidebar({ className }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "flex h-full w-64 flex-col bg-card border-r border-border",
        className
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-border">
        <div className="flex items-center gap-2">
          {/* <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">N</span>
          </div> */}
          <Image src="/NaBank-Icon.png" alt="logo" width={25} height={25} />
          <span className="font-bold text-lg text-foreground">NaBank</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-12",
                  isActive && "bg-primary text-primary-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              John Doe
            </p>
            <p className="text-xs text-muted-foreground truncate">
              john@example.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

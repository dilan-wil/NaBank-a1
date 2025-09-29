"use client";

import { AccountCard } from "@/components/dashboard/account-card";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { NewsFeed } from "@/components/dashboard/news-feed";
import { mockAccounts } from "@/lib/mock-data";
import { useCustomerStore } from "@/lib/store";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { accounts } = useCustomerStore();
  const [loadingAccounts, setLoadingAccounts] = useState(!accounts);
  useEffect(() => {
    if (accounts) setLoadingAccounts(false);
  }, [accounts]);
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Good morning, John
          </h1>
          <p className="text-muted-foreground">
            Welcome back to your NaBank dashboard
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Today</p>
          <p className="text-sm font-medium">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Account Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loadingAccounts ? (
          <>
            <AccountCardSkeleton />
            <AccountCardSkeleton />
          </>
        ) : (
          accounts?.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))
        )}
        {/* {accounts?.map((account) => (
          <AccountCard key={account.id} account={account} />
        ))} */}
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentTransactions />
        <NewsFeed />
      </div>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function AccountCardSkeleton() {
  return (
    <Card className="bg-gradient-to-br from-primary to-primary/40 text-primary-foreground animate-pulse">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium opacity-50">
          Loading...
        </CardTitle>
        <div className="h-4 w-4 rounded-full bg-primary-foreground/30" />
      </CardHeader>
      <CardContent>
        <div className="h-7 w-28 bg-primary-foreground/30 rounded mb-2" />
        <div className="h-3 w-40 bg-primary-foreground/20 rounded" />
      </CardContent>
    </Card>
  );
}

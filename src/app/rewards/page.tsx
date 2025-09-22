"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Gift, Star, Trophy, Coins, ArrowRight, Calendar, Target } from "lucide-react"

export default function RewardsPage() {
  const totalCashback = 45750
  const availablePoints = 2340
  const nextTierPoints = 5000

  const rewardHistory = [
    {
      id: "1",
      type: "Cashback",
      description: "ENEO Bill Payment",
      amount: 250,
      date: "2024-01-15",
      status: "credited",
    },
    {
      id: "2",
      type: "Referral Bonus",
      description: "Friend joined NaBank",
      amount: 5000,
      date: "2024-01-12",
      status: "credited",
    },
    {
      id: "3",
      type: "Cashback",
      description: "MTN Airtime Purchase",
      amount: 150,
      date: "2024-01-10",
      status: "pending",
    },
  ]

  const availableRewards = [
    {
      id: "1",
      title: "Free Transfer",
      description: "Get 5 free transfers to any bank",
      pointsCost: 500,
      icon: ArrowRight,
      category: "Banking",
    },
    {
      id: "2",
      title: "Airtime Bonus",
      description: "500 FCFA airtime credit",
      pointsCost: 750,
      icon: Coins,
      category: "Telecom",
    },
    {
      id: "3",
      title: "Premium Account",
      description: "1 month premium features",
      pointsCost: 2000,
      icon: Star,
      category: "Premium",
    },
  ]

  const challenges = [
    {
      id: "1",
      title: "Bill Payment Master",
      description: "Pay 5 different bills this month",
      progress: 3,
      target: 5,
      reward: 1000,
      deadline: "2024-01-31",
    },
    {
      id: "2",
      title: "Savings Champion",
      description: "Save 50,000 FCFA this month",
      progress: 32000,
      target: 50000,
      reward: 2500,
      deadline: "2024-01-31",
    },
  ]

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Rewards</h1>
          <p className="text-muted-foreground">Earn cashback and points on every transaction</p>
        </div>

        {/* Rewards Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Coins className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Cashback</p>
                  <p className="text-2xl font-bold text-green-600">{totalCashback.toLocaleString()} FCFA</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Available Points</p>
                  <p className="text-2xl font-bold text-blue-600">{availablePoints.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Tier</p>
                  <p className="text-2xl font-bold text-purple-600">Silver</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tier Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Tier Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Silver</span>
              <span className="text-sm text-muted-foreground">
                {availablePoints} / {nextTierPoints} points to Gold
              </span>
            </div>
            <Progress value={(availablePoints / nextTierPoints) * 100} className="h-3" />
            <p className="text-sm text-muted-foreground">
              Earn {nextTierPoints - availablePoints} more points to unlock Gold tier benefits
            </p>
          </CardContent>
        </Card>

        {/* Active Challenges */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Active Challenges
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {challenges.map((challenge) => (
              <div key={challenge.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium">{challenge.title}</h3>
                    <p className="text-sm text-muted-foreground">{challenge.description}</p>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    +{challenge.reward} points
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>
                      {typeof challenge.progress === "number" && challenge.progress > 1000
                        ? `${challenge.progress.toLocaleString()} / ${challenge.target.toLocaleString()}`
                        : `${challenge.progress} / ${challenge.target}`}
                    </span>
                  </div>
                  <Progress value={(challenge.progress / challenge.target) * 100} className="h-2" />
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>Ends {challenge.deadline}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Available Rewards */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5" />
              Redeem Rewards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableRewards.map((reward) => (
                <div key={reward.id} className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <reward.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{reward.title}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {reward.category}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{reward.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{reward.pointsCost} points</span>
                    <Button
                      size="sm"
                      disabled={availablePoints < reward.pointsCost}
                      variant={availablePoints >= reward.pointsCost ? "default" : "secondary"}
                    >
                      Redeem
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reward History */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Rewards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {rewardHistory.map((reward) => (
                <div key={reward.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Gift className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{reward.type}</h3>
                      <p className="text-sm text-muted-foreground">{reward.description}</p>
                      <p className="text-xs text-muted-foreground">{reward.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">+{reward.amount} FCFA</p>
                    <Badge variant={reward.status === "credited" ? "default" : "secondary"} className="text-xs">
                      {reward.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}

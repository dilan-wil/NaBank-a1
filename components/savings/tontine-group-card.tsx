"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, TrendingUp } from "lucide-react"
import { formatCurrency, type TontineGroup } from "@/lib/mock-data"

interface TontineGroupCardProps {
  group: TontineGroup
  onContribute?: () => void
  onViewDetails?: () => void
}

export function TontineGroupCard({ group, onContribute, onViewDetails }: TontineGroupCardProps) {
  const memberProgress = (group.currentMembers / group.totalMembers) * 100
  const nextPayoutDate = new Date(group.nextPayout).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })

  const getStatusColor = (status: TontineGroup["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "waiting":
        return "bg-yellow-100 text-yellow-800"
    }
  }

  const getFrequencyColor = (frequency: TontineGroup["frequency"]) => {
    switch (frequency) {
      case "daily":
        return "bg-orange-100 text-orange-800"
      case "weekly":
        return "bg-purple-100 text-purple-800"
      case "monthly":
        return "bg-blue-100 text-blue-800"
    }
  }

  const totalPayout = group.contributionAmount * group.totalMembers

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-1">{group.name}</CardTitle>
            <p className="text-sm text-muted-foreground line-clamp-2">{group.description}</p>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary" className={getFrequencyColor(group.frequency)}>
              {group.frequency}
            </Badge>
            <Badge variant="secondary" className={getStatusColor(group.status)}>
              {group.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Contribution Info */}
        <div className="bg-muted p-3 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Your Contribution</span>
            <span className="font-bold text-primary">{formatCurrency(group.contributionAmount, group.currency)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total Payout</span>
            <span className="font-medium">{formatCurrency(totalPayout, group.currency)}</span>
          </div>
        </div>

        {/* Members Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Members</span>
            <span className="font-medium">
              {group.currentMembers}/{group.totalMembers}
            </span>
          </div>
          <Progress value={memberProgress} className="h-2" />
        </div>

        {/* Position & Next Payout */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-muted-foreground">Your Position</p>
              <p className="font-medium">#{group.position}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-muted-foreground">Next Payout</p>
              <p className="font-medium">{nextPayoutDate}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" onClick={onContribute} disabled={group.status !== "active"}>
            Contribute
          </Button>
          <Button variant="outline" size="sm" onClick={onViewDetails} className="flex-1 bg-transparent">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, Plus } from "lucide-react"
import { formatCurrency, type SavingsProject } from "@/lib/mock-data"

interface SavingsProjectCardProps {
  project: SavingsProject
  onAddMoney?: () => void
  onWithdraw?: () => void
  onViewDetails?: () => void
}

export function SavingsProjectCard({ project, onAddMoney, onWithdraw, onViewDetails }: SavingsProjectCardProps) {
  const progress = (project.currentAmount / project.targetAmount) * 100
  const daysLeft = Math.ceil((new Date(project.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

  const getStatusColor = (status: SavingsProject["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "paused":
        return "bg-yellow-100 text-yellow-800"
    }
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Emergency: "bg-red-100 text-red-800",
      Technology: "bg-purple-100 text-purple-800",
      Travel: "bg-blue-100 text-blue-800",
      Education: "bg-green-100 text-green-800",
      Health: "bg-pink-100 text-pink-800",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-1">{project.name}</CardTitle>
            <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary" className={getCategoryColor(project.category)}>
              {project.category}
            </Badge>
            <Badge variant="secondary" className={getStatusColor(project.status)}>
              {project.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-sm">
            <span className="font-medium">{formatCurrency(project.currentAmount, project.currency)}</span>
            <span className="text-muted-foreground">of {formatCurrency(project.targetAmount, project.currency)}</span>
          </div>
        </div>

        {/* Deadline */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>
            {project.status === "completed" ? "Completed" : daysLeft > 0 ? `${daysLeft} days left` : "Deadline passed"}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" onClick={onAddMoney} disabled={project.status !== "active"}>
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
          <Button variant="outline" size="sm" onClick={onWithdraw} disabled={project.status !== "active"}>
            Withdraw
          </Button>
          <Button variant="outline" size="sm" onClick={onViewDetails} className="flex-1 bg-transparent">
            Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

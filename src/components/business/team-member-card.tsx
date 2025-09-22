"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, User, Shield, Eye, Settings } from "lucide-react"
import type { TeamMember } from "@/lib/business-mock-data"

interface TeamMemberCardProps {
  member: TeamMember
  onEdit?: (member: TeamMember) => void
  onRemove?: (member: TeamMember) => void
  onViewActivity?: (member: TeamMember) => void
}

export function TeamMemberCard({ member, onEdit, onRemove, onViewActivity }: TeamMemberCardProps) {
  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800"
      case "manager":
        return "bg-blue-100 text-blue-800"
      case "viewer":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="w-4 h-4" />
      case "manager":
        return <Settings className="w-4 h-4" />
      case "viewer":
        return <Eye className="w-4 h-4" />
      default:
        return <User className="w-4 h-4" />
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900">{member.name}</CardTitle>
            <p className="text-sm text-gray-600">{member.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={getStatusColor(member.status)} variant="secondary">
            {member.status}
          </Badge>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className={getRoleColor(member.role)} variant="secondary">
              {getRoleIcon(member.role)}
              <span className="ml-1 capitalize">{member.role}</span>
            </Badge>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Last Active</p>
            <p className="text-sm font-medium text-gray-900">{new Date(member.lastActive).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-500">Permissions</p>
          <div className="flex flex-wrap gap-1">
            {member.permissions.slice(0, 3).map((permission) => (
              <Badge key={permission} variant="outline" className="text-xs">
                {permission.replace("_", " ")}
              </Badge>
            ))}
            {member.permissions.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{member.permissions.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        <div className="text-sm text-gray-500">
          <p>Joined: {new Date(member.joinDate).toLocaleDateString()}</p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewActivity?.(member)}
            className="flex-1 bg-transparent"
          >
            View Activity
          </Button>
          <Button variant="outline" size="sm" onClick={() => onEdit?.(member)}>
            <Settings className="w-4 h-4 mr-1" />
            Edit
          </Button>
          {member.role !== "admin" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onRemove?.(member)}
              className="text-red-600 hover:text-red-700"
            >
              Remove
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { useState } from "react"
import { BusinessLayout } from "@/components/business/business-layout"
import { TeamMemberCard } from "@/components/business/team-member-card"
import { AddTeamMemberDialog } from "@/components/business/add-team-member-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Users, Shield, Settings, Eye } from "lucide-react"
import { teamMembers, type TeamMember } from "@/lib/business-mock-data"

export default function BusinessTeamPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")

  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterRole === "all" || member.role === filterRole
    return matchesSearch && matchesFilter
  })

  const totalMembers = teamMembers.length
  const activeMembers = teamMembers.filter((member) => member.status === "active").length
  const adminCount = teamMembers.filter((member) => member.role === "admin").length
  const managerCount = teamMembers.filter((member) => member.role === "manager").length

  const handleAddMember = (memberData: any) => {
    console.log("Add team member:", memberData)
    // Mock implementation - would add new team member
  }

  const handleEditMember = (member: TeamMember) => {
    console.log("Edit member:", member.id)
    // Mock implementation - would open edit dialog
  }

  const handleRemoveMember = (member: TeamMember) => {
    console.log("Remove member:", member.id)
    // Mock implementation - would remove team member
  }

  const handleViewActivity = (member: TeamMember) => {
    console.log("View activity:", member.id)
    // Mock implementation - would show activity log
  }

  return (
    <BusinessLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Team Management</h1>
            <p className="text-gray-600">Manage team members, roles, and permissions</p>
          </div>
          <AddTeamMemberDialog onAddMember={handleAddMember} />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Members</CardTitle>
              <Users className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{totalMembers}</div>
              <p className="text-xs text-green-600 mt-1">{activeMembers} active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Administrators</CardTitle>
              <Shield className="w-4 h-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{adminCount}</div>
              <p className="text-xs text-gray-500 mt-1">Full access</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Managers</CardTitle>
              <Settings className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{managerCount}</div>
              <p className="text-xs text-gray-500 mt-1">Limited management</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Viewers</CardTitle>
              <Eye className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{totalMembers - adminCount - managerCount}</div>
              <p className="text-xs text-gray-500 mt-1">Read-only access</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search team members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              onEdit={handleEditMember}
              onRemove={handleRemoveMember}
              onViewActivity={handleViewActivity}
            />
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500">No team members found matching your criteria.</p>
            </CardContent>
          </Card>
        )}

        {/* Permissions Guide */}
        <Card>
          <CardHeader>
            <CardTitle>Role Permissions Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-red-600" />
                  <h3 className="font-semibold text-red-600">Administrator</h3>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Full system access</li>
                  <li>• Manage all accounts</li>
                  <li>• Process all transactions</li>
                  <li>• Manage team members</li>
                  <li>• Access all reports</li>
                </ul>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-blue-600">Manager</h3>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• View accounts</li>
                  <li>• Manage payments</li>
                  <li>• Create invoices</li>
                  <li>• Process payroll</li>
                  <li>• View reports</li>
                </ul>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-green-600">Viewer</h3>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• View accounts (read-only)</li>
                  <li>• View transaction history</li>
                  <li>• View reports</li>
                  <li>• No editing permissions</li>
                  <li>• No financial operations</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </BusinessLayout>
  )
}

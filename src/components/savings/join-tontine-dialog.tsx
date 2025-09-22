"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Users } from "lucide-react"

const availableTontines = [
  {
    id: "new1",
    name: "Tech Professionals",
    contributionAmount: 25000,
    frequency: "weekly",
    totalMembers: 10,
    currentMembers: 7,
  },
  {
    id: "new2",
    name: "Young Entrepreneurs",
    contributionAmount: 100000,
    frequency: "monthly",
    totalMembers: 15,
    currentMembers: 12,
  },
  {
    id: "new3",
    name: "Daily Savers",
    contributionAmount: 3000,
    frequency: "daily",
    totalMembers: 30,
    currentMembers: 25,
  },
]

export function JoinTontineDialog() {
  const [open, setOpen] = useState(false)
  const [selectedTontine, setSelectedTontine] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock tontine joining
    console.log("Joining tontine:", selectedTontine)
    setOpen(false)
    setSelectedTontine("")
  }

  const selectedGroup = availableTontines.find((t) => t.id === selectedTontine)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Users className="h-4 w-4 mr-2" />
          Join Tontine
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Join Tontine Group</DialogTitle>
          <DialogDescription>Choose a tontine group that matches your savings goals.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <Label>Available Tontine Groups</Label>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {availableTontines.map((tontine) => (
                <Card
                  key={tontine.id}
                  className={`cursor-pointer transition-colors ${
                    selectedTontine === tontine.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedTontine(tontine.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{tontine.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {tontine.contributionAmount.toLocaleString()} XAF • {tontine.frequency}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {tontine.currentMembers}/{tontine.totalMembers} members
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="w-3 h-3 rounded-full border-2 border-primary">
                          {selectedTontine === tontine.id && <div className="w-full h-full bg-primary rounded-full" />}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {selectedGroup && (
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-medium mb-2">Group Details</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Contribution:</span>
                  <span className="font-medium">{selectedGroup.contributionAmount.toLocaleString()} XAF</span>
                </div>
                <div className="flex justify-between">
                  <span>Frequency:</span>
                  <span className="font-medium capitalize">{selectedGroup.frequency}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Payout:</span>
                  <span className="font-medium">
                    {(selectedGroup.contributionAmount * selectedGroup.totalMembers).toLocaleString()} XAF
                  </span>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!selectedTontine}>
              Join Group
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

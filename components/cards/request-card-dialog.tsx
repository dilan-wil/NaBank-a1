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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import { CreditCard, Smartphone, Plus } from "lucide-react"

export function RequestCardDialog() {
  const [open, setOpen] = useState(false)
  const [cardType, setCardType] = useState<"virtual" | "physical">("virtual")
  const [cardName, setCardName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock card request
    console.log("Requesting card:", { type: cardType, name: cardName })
    setOpen(false)
    // Reset form
    setCardName("")
    setCardType("virtual")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Request New Card
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request New Card</DialogTitle>
          <DialogDescription>Choose the type of card you'd like to request.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardName">Card Name</Label>
              <Input
                id="cardName"
                placeholder="e.g., Shopping Card, Travel Card"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-3">
              <Label>Card Type</Label>
              <RadioGroup value={cardType} onValueChange={(value) => setCardType(value as "virtual" | "physical")}>
                <div className="space-y-3">
                  <Card
                    className={`cursor-pointer transition-colors ${cardType === "virtual" ? "ring-2 ring-primary" : ""}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="virtual" id="virtual" />
                        <div className="flex items-center gap-3 flex-1">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Smartphone className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <Label htmlFor="virtual" className="font-medium cursor-pointer">
                              Virtual Card
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Instant delivery, perfect for online shopping
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card
                    className={`cursor-pointer transition-colors ${cardType === "physical" ? "ring-2 ring-primary" : ""}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="physical" id="physical" />
                        <div className="flex items-center gap-3 flex-1">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <CreditCard className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <Label htmlFor="physical" className="font-medium cursor-pointer">
                              Physical Card
                            </Label>
                            <p className="text-sm text-muted-foreground">Delivered in 5-7 days, use anywhere</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </RadioGroup>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Request Card</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

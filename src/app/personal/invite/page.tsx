"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Copy, Share, Users, Gift, CheckCircle } from "lucide-react"

export default function InvitePage() {
  const [referralCode] = useState("JOHN2024")
  const [referralLink] = useState("https://nabank.app/join/JOHN2024")
  const [copied, setCopied] = useState(false)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Join NaBank",
        text: "Join me on NaBank and get 5,000 XAF bonus!",
        url: referralLink,
      })
    } else {
      handleCopyLink()
    }
  }

  const mockReferrals = [
    { name: "Alice Johnson", status: "completed", reward: 5000, date: "2024-01-10" },
    { name: "Bob Smith", status: "pending", reward: 5000, date: "2024-01-12" },
    { name: "Carol Brown", status: "completed", reward: 5000, date: "2024-01-14" },
  ]

  const totalEarned = mockReferrals.filter((r) => r.status === "completed").reduce((sum, r) => sum + r.reward, 0)
  const pendingRewards = mockReferrals.filter((r) => r.status === "pending").reduce((sum, r) => sum + r.reward, 0)

  return (
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => (window.location.href = "/more")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Invite Friends</h1>
            <p className="text-muted-foreground">Share NaBank and earn rewards together</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          {/* Referral Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">{mockReferrals.length}</p>
                <p className="text-sm text-muted-foreground">Friends Invited</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Gift className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold">{totalEarned.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">XAF Earned</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold">{mockReferrals.filter((r) => r.status === "completed").length}</p>
                <p className="text-sm text-muted-foreground">Successful Referrals</p>
              </CardContent>
            </Card>
          </div>

          {/* How it Works */}
          <Card>
            <CardHeader>
              <CardTitle>How Referrals Work</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 rounded-lg">
                <div className="text-center">
                  <Gift className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="font-semibold">Earn 5,000 XAF for each successful referral!</p>
                  <p className="text-sm text-muted-foreground mt-1">Your friend gets 5,000 XAF bonus too</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-3">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                    1
                  </div>
                  <p className="text-sm font-medium">Share your link</p>
                  <p className="text-xs text-muted-foreground">Send to friends & family</p>
                </div>
                <div className="p-3">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                    2
                  </div>
                  <p className="text-sm font-medium">They sign up</p>
                  <p className="text-xs text-muted-foreground">Using your referral code</p>
                </div>
                <div className="p-3">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                    3
                  </div>
                  <p className="text-sm font-medium">Both earn rewards</p>
                  <p className="text-xs text-muted-foreground">5,000 XAF each</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Referral Code & Link */}
          <Card>
            <CardHeader>
              <CardTitle>Your Referral Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Referral Code</label>
                <div className="flex gap-2">
                  <Input value={referralCode} readOnly className="font-mono" />
                  <Button variant="outline" onClick={handleCopyLink}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Referral Link</label>
                <div className="flex gap-2">
                  <Input value={referralLink} readOnly className="text-sm" />
                  <Button variant="outline" onClick={handleCopyLink}>
                    {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <Button onClick={handleShare} className="w-full">
                <Share className="h-4 w-4 mr-2" />
                Share Referral Link
              </Button>
            </CardContent>
          </Card>

          {/* Referral History */}
          <Card>
            <CardHeader>
              <CardTitle>Referral History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockReferrals.map((referral, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{referral.name}</p>
                      <p className="text-sm text-muted-foreground">Joined on {referral.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{referral.reward.toLocaleString()} XAF</p>
                      <Badge
                        variant="secondary"
                        className={
                          referral.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {referral.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              {pendingRewards > 0 && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>{pendingRewards.toLocaleString()} XAF</strong> in pending rewards will be credited once your
                    friends complete their first transaction.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { adminCardRequests } from "@/lib/admin-card-mock-data"

export default function CardApprovalTable() {
  const [requests, setRequests] = useState(adminCardRequests)

  const handleApprove = (id: string) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: "approved" } : req
      )
    )
  }

  const handleReject = (id: string) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: "rejected" } : req
      )
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge variant="default" className="bg-green-100 text-green-800">Approuvée</Badge>
      case "pending":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">En attente</Badge>
      case "rejected":
        return <Badge variant="destructive">Refusée</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Demandes de création de carte</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Utilisateur</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Type de carte</TableHead>
              <TableHead>Date de demande</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((req) => (
              <TableRow key={req.id}>
                <TableCell>{req.user.name}</TableCell>
                <TableCell>{req.user.email}</TableCell>
                <TableCell>{req.type}</TableCell>
                <TableCell>{req.requestedAt}</TableCell>
                <TableCell>{getStatusBadge(req.status)}</TableCell>
                <TableCell>
                  {req.status === "pending" && (
                    <div className="flex gap-2">
                      <Button size="sm" variant="default" onClick={() => handleApprove(req.id)}>
                        Approuver
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleReject(req.id)}>
                        Refuser
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

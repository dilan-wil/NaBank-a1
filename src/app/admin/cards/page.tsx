"use client"
import { AdminLayout } from "@/components/admin/admin-layout";
import CardApprovalTable from "@/components/admin/card-approval-table";

export default function AdminCardApprovalPage() {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-6">Approbation des créations de cartes</h1>
        <CardApprovalTable />
      </div>
    </AdminLayout>
  );
}

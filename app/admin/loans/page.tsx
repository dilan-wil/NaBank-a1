import { AdminLayout } from "@/components/admin/admin-layout"
import { LoanManagement } from "@/components/admin/loan-management"

export default function AdminLoansPage() {
  return (
    <AdminLayout>
      <div className="p-6">
        <LoanManagement />
      </div>
    </AdminLayout>
  )
}

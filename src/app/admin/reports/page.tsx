import { AdminLayout } from "@/components/admin/admin-layout"
import { AdminReports } from "@/components/admin/admin-reports"

export default function AdminReportsPage() {
  return (
    <AdminLayout>
      <div className="p-6">
        <AdminReports />
      </div>
    </AdminLayout>
  )
}

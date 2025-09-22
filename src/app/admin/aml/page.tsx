import { AdminLayout } from "@/components/admin/admin-layout"
import { AMLAlertsTable } from "@/components/admin/aml-alerts-table"

export default function AdminAMLPage() {
  return (
    <AdminLayout>
      <div className="p-6">
        <AMLAlertsTable />
      </div>
    </AdminLayout>
  )
}

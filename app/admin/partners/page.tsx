import { AdminLayout } from "@/components/admin/admin-layout"
import { PartnerManagement } from "@/components/admin/partner-management"

export default function AdminPartnersPage() {
  return (
    <AdminLayout>
      <div className="p-6">
        <PartnerManagement />
      </div>
    </AdminLayout>
  )
}

import { AdminLayout } from "@/components/admin/admin-layout"
import { UserTable } from "@/components/admin/user-table"

export default function AdminUsersPage() {
  return (
    <AdminLayout>
      <div className="p-6">
        <UserTable />
      </div>
    </AdminLayout>
  )
}

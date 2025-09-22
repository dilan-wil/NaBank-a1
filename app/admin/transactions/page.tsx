import { AdminLayout } from "@/components/admin/admin-layout"
import { TransactionTable } from "@/components/admin/transaction-table"

export default function AdminTransactionsPage() {
  return (
    <AdminLayout>
      <div className="p-6">
        <TransactionTable />
      </div>
    </AdminLayout>
  )
}

export interface BusinessAccount {
  id: string
  name: string
  type: "main" | "project" | "team"
  balance: number
  currency: string
  accountNumber: string
  status: "active" | "frozen" | "closed"
}

export interface BusinessTransaction {
  id: string
  accountId: string
  type: "credit" | "debit"
  amount: number
  currency: string
  description: string
  reference: string
  date: string
  status: "completed" | "pending" | "failed"
  category: "transfer" | "payment" | "invoice" | "payroll" | "fee"
}

export interface Invoice {
  id: string
  invoiceNumber: string
  clientName: string
  clientEmail: string
  amount: number
  currency: string
  dueDate: string
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled"
  items: InvoiceItem[]
  createdAt: string
  paidAt?: string
}

export interface InvoiceItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  total: number
}

export interface Employee {
  id: string
  name: string
  email: string
  phone: string
  position: string
  salary: number
  walletId: string
  status: "active" | "inactive"
  joinDate: string
}

export interface PayrollBatch {
  id: string
  batchName: string
  totalAmount: number
  employeeCount: number
  status: "draft" | "processing" | "completed" | "failed"
  createdAt: string
  processedAt?: string
  employees: PayrollEmployee[]
}

export interface PayrollEmployee {
  employeeId: string
  name: string
  amount: number
  status: "pending" | "completed" | "failed"
}

export interface TeamMember {
  id: string
  name: string
  email: string
  role: "admin" | "manager" | "viewer"
  permissions: string[]
  status: "active" | "inactive"
  joinDate: string
  lastActive: string
}

// Mock Data
export const businessAccounts: BusinessAccount[] = [
  {
    id: "1",
    name: "Main Business Account",
    type: "main",
    balance: 2500000,
    currency: "XAF",
    accountNumber: "BUS001234567",
    status: "active",
  },
  {
    id: "2",
    name: "Marketing Project",
    type: "project",
    balance: 450000,
    currency: "XAF",
    accountNumber: "PRJ001234568",
    status: "active",
  },
  {
    id: "3",
    name: "Development Team",
    type: "team",
    balance: 800000,
    currency: "XAF",
    accountNumber: "TEAM01234569",
    status: "active",
  },
  {
    id: "4",
    name: "Emergency Fund",
    type: "project",
    balance: 1200000,
    currency: "XAF",
    accountNumber: "EMG001234570",
    status: "active",
  },
]

export const businessTransactions: BusinessTransaction[] = [
  {
    id: "1",
    accountId: "1",
    type: "credit",
    amount: 500000,
    currency: "XAF",
    description: "Client payment - Invoice #INV-001",
    reference: "TXN-001",
    date: "2024-01-15T10:30:00Z",
    status: "completed",
    category: "invoice",
  },
  {
    id: "2",
    accountId: "1",
    type: "debit",
    amount: 150000,
    currency: "XAF",
    description: "Monthly payroll disbursement",
    reference: "TXN-002",
    date: "2024-01-14T14:20:00Z",
    status: "completed",
    category: "payroll",
  },
  {
    id: "3",
    accountId: "2",
    type: "credit",
    amount: 200000,
    currency: "XAF",
    description: "Budget allocation from main account",
    reference: "TXN-003",
    date: "2024-01-13T09:15:00Z",
    status: "completed",
    category: "transfer",
  },
]

export const invoices: Invoice[] = [
  {
    id: "1",
    invoiceNumber: "INV-001",
    clientName: "Tech Solutions Ltd",
    clientEmail: "billing@techsolutions.com",
    amount: 500000,
    currency: "XAF",
    dueDate: "2024-02-15",
    status: "paid",
    createdAt: "2024-01-01T00:00:00Z",
    paidAt: "2024-01-15T10:30:00Z",
    items: [
      {
        id: "1",
        description: "Web Development Services",
        quantity: 1,
        unitPrice: 300000,
        total: 300000,
      },
      {
        id: "2",
        description: "Mobile App Development",
        quantity: 1,
        unitPrice: 200000,
        total: 200000,
      },
    ],
  },
  {
    id: "2",
    invoiceNumber: "INV-002",
    clientName: "Digital Marketing Co",
    clientEmail: "accounts@digitalmarketing.com",
    amount: 250000,
    currency: "XAF",
    dueDate: "2024-02-20",
    status: "sent",
    createdAt: "2024-01-10T00:00:00Z",
    items: [
      {
        id: "3",
        description: "SEO Optimization",
        quantity: 1,
        unitPrice: 150000,
        total: 150000,
      },
      {
        id: "4",
        description: "Social Media Management",
        quantity: 1,
        unitPrice: 100000,
        total: 100000,
      },
    ],
  },
]

export const employees: Employee[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@company.com",
    phone: "+237 6XX XXX XXX",
    position: "Software Developer",
    salary: 300000,
    walletId: "WAL001",
    status: "active",
    joinDate: "2023-06-01",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@company.com",
    phone: "+237 6XX XXX XXY",
    position: "Marketing Manager",
    salary: 250000,
    walletId: "WAL002",
    status: "active",
    joinDate: "2023-08-15",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@company.com",
    phone: "+237 6XX XXX XXZ",
    position: "Designer",
    salary: 200000,
    walletId: "WAL003",
    status: "active",
    joinDate: "2023-09-01",
  },
]

export const payrollBatches: PayrollBatch[] = [
  {
    id: "1",
    batchName: "January 2024 Payroll",
    totalAmount: 750000,
    employeeCount: 3,
    status: "completed",
    createdAt: "2024-01-01T00:00:00Z",
    processedAt: "2024-01-14T14:20:00Z",
    employees: [
      { employeeId: "1", name: "John Doe", amount: 300000, status: "completed" },
      { employeeId: "2", name: "Jane Smith", amount: 250000, status: "completed" },
      { employeeId: "3", name: "Mike Johnson", amount: 200000, status: "completed" },
    ],
  },
  {
    id: "2",
    batchName: "February 2024 Payroll",
    totalAmount: 750000,
    employeeCount: 3,
    status: "draft",
    createdAt: "2024-02-01T00:00:00Z",
    employees: [
      { employeeId: "1", name: "John Doe", amount: 300000, status: "pending" },
      { employeeId: "2", name: "Jane Smith", amount: 250000, status: "pending" },
      { employeeId: "3", name: "Mike Johnson", amount: 200000, status: "pending" },
    ],
  },
]

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@company.com",
    role: "admin",
    permissions: ["all"],
    status: "active",
    joinDate: "2023-01-01",
    lastActive: "2024-01-15T16:30:00Z",
  },
  {
    id: "2",
    name: "Finance Manager",
    email: "finance@company.com",
    role: "manager",
    permissions: ["view_accounts", "manage_payments", "view_reports"],
    status: "active",
    joinDate: "2023-03-15",
    lastActive: "2024-01-15T14:20:00Z",
  },
  {
    id: "3",
    name: "Accountant",
    email: "accountant@company.com",
    role: "viewer",
    permissions: ["view_accounts", "view_reports"],
    status: "active",
    joinDate: "2023-06-01",
    lastActive: "2024-01-14T12:15:00Z",
  },
]

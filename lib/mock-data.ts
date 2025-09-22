// Mock data for the neobank application
export interface Account {
  id: string
  name: string
  type: "main" | "savings"
  balance: number
  currency: string
  accountNumber: string
}

export interface Transaction {
  id: string
  type: "credit" | "debit"
  amount: number
  currency: string
  description: string
  date: string
  category: string
  status: "completed" | "pending" | "failed"
}

export interface Card {
  id: string
  name: string
  type: "virtual" | "physical"
  last4: string
  balance: number
  currency: string
  status: "active" | "blocked" | "expired"
  expiryDate: string
}

export interface NewsItem {
  id: string
  title: string
  description: string
  date: string
  type: "promotion" | "update" | "security"
}

export interface SavingsProject {
  id: string
  name: string
  description: string
  targetAmount: number
  currentAmount: number
  currency: string
  deadline: string
  category: string
  status: "active" | "completed" | "paused"
  createdDate: string
}

export interface TontineGroup {
  id: string
  name: string
  description: string
  contributionAmount: number
  frequency: "daily" | "weekly" | "monthly"
  totalMembers: number
  currentMembers: number
  currency: string
  nextPayout: string
  status: "active" | "completed" | "waiting"
  joinedDate: string
  position: number
}

// Mock accounts data
export const mockAccounts: Account[] = [
  {
    id: "1",
    name: "Main Account",
    type: "main",
    balance: 125000,
    currency: "XAF",
    accountNumber: "1234567890",
  },
  {
    id: "2",
    name: "Savings Account",
    type: "savings",
    balance: 75000,
    currency: "XAF",
    accountNumber: "0987654321",
  },
]

// Mock transactions data
export const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "credit",
    amount: 50000,
    currency: "XAF",
    description: "Salary Payment",
    date: "2024-01-15T10:30:00Z",
    category: "Income",
    status: "completed",
  },
  {
    id: "2",
    type: "debit",
    amount: 15000,
    currency: "XAF",
    description: "Grocery Shopping",
    date: "2024-01-14T16:45:00Z",
    category: "Shopping",
    status: "completed",
  },
  {
    id: "3",
    type: "debit",
    amount: 25000,
    currency: "XAF",
    description: "Rent Payment",
    date: "2024-01-13T09:15:00Z",
    category: "Bills",
    status: "completed",
  },
  {
    id: "4",
    type: "credit",
    amount: 10000,
    currency: "XAF",
    description: "Cashback Reward",
    date: "2024-01-12T14:20:00Z",
    category: "Rewards",
    status: "completed",
  },
  {
    id: "5",
    type: "debit",
    amount: 5000,
    currency: "XAF",
    description: "Mobile Money Transfer",
    date: "2024-01-11T11:30:00Z",
    category: "Transfer",
    status: "pending",
  },
]

// Mock cards data
export const mockCards: Card[] = [
  {
    id: "1",
    name: "NaBank Virtual Card",
    type: "virtual",
    last4: "4532",
    balance: 50000,
    currency: "XAF",
    status: "active",
    expiryDate: "12/27",
  },
  {
    id: "2",
    name: "NaBank Physical Card",
    type: "physical",
    last4: "8901",
    balance: 25000,
    currency: "XAF",
    status: "active",
    expiryDate: "08/26",
  },
  {
    id: "3",
    name: "Premium Card",
    type: "physical",
    last4: "2345",
    balance: 0,
    currency: "XAF",
    status: "blocked",
    expiryDate: "03/25",
  },
]

// Mock news data
export const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "New Cashback Program Launched",
    description: "Earn up to 5% cashback on all your purchases with our new rewards program.",
    date: "2024-01-15T08:00:00Z",
    type: "promotion",
  },
  {
    id: "2",
    title: "Enhanced Security Features",
    description: "We've added biometric authentication for enhanced account security.",
    date: "2024-01-14T12:00:00Z",
    type: "security",
  },
  {
    id: "3",
    title: "Mobile App Update Available",
    description: "Update to the latest version for improved performance and new features.",
    date: "2024-01-13T16:00:00Z",
    type: "update",
  },
]

// Mock savings projects data
export const mockSavingsProjects: SavingsProject[] = [
  {
    id: "1",
    name: "Emergency Fund",
    description: "Building an emergency fund for unexpected expenses",
    targetAmount: 500000,
    currentAmount: 125000,
    currency: "XAF",
    deadline: "2024-12-31T23:59:59Z",
    category: "Emergency",
    status: "active",
    createdDate: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "New Laptop",
    description: "Saving for a new MacBook Pro for work",
    targetAmount: 800000,
    currentAmount: 320000,
    currency: "XAF",
    deadline: "2024-06-30T23:59:59Z",
    category: "Technology",
    status: "active",
    createdDate: "2024-01-15T00:00:00Z",
  },
  {
    id: "3",
    name: "Vacation Fund",
    description: "Family vacation to Dubai",
    targetAmount: 1200000,
    currentAmount: 1200000,
    currency: "XAF",
    deadline: "2024-03-31T23:59:59Z",
    category: "Travel",
    status: "completed",
    createdDate: "2023-10-01T00:00:00Z",
  },
]

// Mock tontine groups data
export const mockTontineGroups: TontineGroup[] = [
  {
    id: "1",
    name: "Friends Circle",
    description: "Monthly tontine with close friends",
    contributionAmount: 50000,
    frequency: "monthly",
    totalMembers: 12,
    currentMembers: 12,
    currency: "XAF",
    nextPayout: "2024-02-15T00:00:00Z",
    status: "active",
    joinedDate: "2024-01-01T00:00:00Z",
    position: 3,
  },
  {
    id: "2",
    name: "Office Colleagues",
    description: "Weekly savings group with office colleagues",
    contributionAmount: 15000,
    frequency: "weekly",
    totalMembers: 8,
    currentMembers: 8,
    currency: "XAF",
    nextPayout: "2024-01-22T00:00:00Z",
    status: "active",
    joinedDate: "2023-12-01T00:00:00Z",
    position: 1,
  },
  {
    id: "3",
    name: "Business Network",
    description: "Daily micro-savings for entrepreneurs",
    contributionAmount: 5000,
    frequency: "daily",
    totalMembers: 20,
    currentMembers: 18,
    currency: "XAF",
    nextPayout: "2024-01-25T00:00:00Z",
    status: "waiting",
    joinedDate: "2024-01-10T00:00:00Z",
    position: 15,
  },
]

// Utility functions
export const formatCurrency = (amount: number, currency = "XAF") => {
  return new Intl.NumberFormat("fr-CM", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
  }).format(amount)
}

export const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateString))
}

"use client";
import ProtectedRoute from "@/components/protected-route";
import { AppLayout } from "@/components/layout/app-layout";
import { customerAccountApi, customerApi } from "@/lib/api";
import { useCustomerStore } from "@/lib/store";
import { useEffect } from "react";
import { useAuth } from "@/context/auth-context";
// export const metadata: Metadata = {
//   title: "NaBank - The Future of Digital Banking",
//   description:
//     "Experience seamless banking with instant transfers, smart savings, and business solutions designed for the modern world. FDIC insured, bank-grade security.",
//   icons: {
//     icon: "/NaBank-Icon.png",
//     shortcut: "/NaBank-Icon.png",
//     apple: "/NaBank-Icon.png",
//   },
// };

export default function PersonalDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { accounts, setAccounts, customer, setCustomer } = useCustomerStore();
  const { user } = useAuth();
  useEffect(() => {
    if (!user || customer) return; // Only fetch if no customer yet

    const fetchCustomer = async () => {
      try {
        const customer = await customerApi.getById(user.user_metadata.mansarID);
        setCustomer(customer);
      } catch (err) {
        console.error("Failed to fetch customer", err);
      }
    };

    fetchCustomer();
  }, [user, customer, setCustomer]); // include setCustomer to satisfy linter

  useEffect(() => {
    if (!customer?.id || accounts) return; // Only fetch if no accounts yet

    const fetchAccounts = async () => {
      try {
        const userAccounts = await customerAccountApi.getAccountsByCustomerId(
          customer.id
        );
        console.log(userAccounts);
        setAccounts(userAccounts.content);
      } catch (err) {
        console.error("Failed to fetch accounts", err);
      }
    };

    fetchAccounts();
  }, [customer, accounts, setAccounts]);

  return (
    <>
      <ProtectedRoute allowedRoles={["personal"]}>
        <AppLayout>{children}</AppLayout>
      </ProtectedRoute>
    </>
  );
}

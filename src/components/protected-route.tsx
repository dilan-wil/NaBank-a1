// components/ProtectedRoute.tsx
"use client";
import { useAuth } from "../context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Landmark } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[]; // e.g. ["admin", "business"]
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/auth/login");
      } else if (
        allowedRoles &&
        !allowedRoles.includes(user.user_metadata.role)
      ) {
        // router.replace("/unauthorized"); // redirect to a "Not allowed" page
        router.replace("/auth/login");
      }
    }
  }, [user, loading, router, allowedRoles]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="relative flex items-center justify-center">
          {/* Spinner */}
          <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>

          {/* Bank Icon in the center */}
          <Landmark className="absolute w-6 h-6 text-gray-600" />
        </div>
      </div>
    );

  return <>{children}</>;
};

export default ProtectedRoute;

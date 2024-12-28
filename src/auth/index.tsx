import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface ProtectRouteProps {
  children: React.ReactNode;
}

export const ProtectRoute: React.FC<ProtectRouteProps> = ({ children }) => {
  const router = useRouter();

  const publicRoutes = ["/authentication/sign-in"];
  const protectedRoutes = [
    "/",
    "doctors/",
    "schedule/",
    "loyaltyPoints/,",
    "appointments/,",
    "pharmacy/products/",
    "pharmacy/customers/",
    "pharmacy/shipment/",
    "pharmacy/order-details/",
    "services/sub-service/",
  ];

  const isRouteProtected = (route: string) =>
    protectedRoutes.some((protectedRoute) => route.startsWith(protectedRoute));

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token && isRouteProtected(router.pathname)) {
      // Redirect to sign-in if not authenticated and on a protected route
      router.replace("/authentication/sign-in");
    } else if (token && publicRoutes.includes(router.pathname)) {
      router.replace("/");
    }
  }, [router]);

  return <>{children}</>;
};

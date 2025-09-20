"use client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "../store";
import Orders from "../components/Orders";

export default function OrdersPage() {
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  if (!user) return null; // don’t render until redirect check

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Orders />
    </div>
  );
}

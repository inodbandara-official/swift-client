"use client";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../store";
import { logout } from "../store/authSlice";

export default function Navbar() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  if (!user) return null;

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="flex space-x-4">
        <Link href="/orders" className="hover:underline">
          Orders
        </Link>
        <Link href="/place-order" className="hover:underline">
          Place Order
        </Link>
      </div>
      <button onClick={() => dispatch(logout())} className="hover:underline">
        Logout
      </button>
    </nav>
  );
}

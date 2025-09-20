"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { getOrders } from "../store/orderSlice";

export default function Orders() {
  const dispatch = useAppDispatch();
  const { orders, loading } = useAppSelector((state) => state.orders);
  const [filter, setFilter] = useState<"ALL" | "PENDING" | "ACCEPTED">("ALL");

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const filteredOrders =
    filter === "ALL" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="max-w-3xl mx-auto mt-6 p-6 bg-white shadow rounded-xl">
      <h2 className="text-xl font-bold mb-4">Orders</h2>
      <div className="flex space-x-4 mb-4">
        {["ALL", "PENDING", "ACCEPTED"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status as any)}
            className={`px-3 py-1 rounded ${
              filter === status ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {status}
          </button>
        ))}
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Product</th>
              <th className="p-2 border">Qty</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td className="p-2 border">{order.product}</td>
                <td className="p-2 border">{order.quantity}</td>
                <td className="p-2 border">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

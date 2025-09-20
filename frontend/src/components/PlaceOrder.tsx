"use client";
import { useState } from "react";
import { useAppDispatch } from "../store";
import { addOrder } from "../store/orderSlice";

export default function PlaceOrder() {
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addOrder({ product, quantity }));
    setProduct("");
    setQuantity(1);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded-xl">
      <h2 className="text-xl font-bold mb-4">Place New Order</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Order
        </button>
      </form>
    </div>
  );
}

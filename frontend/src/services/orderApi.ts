import { Order } from "../store/orderSlice";

let mockOrders: Order[] = [
  { id: "1", product: "Laptop", quantity: 2, status: "PENDING" },
  { id: "2", product: "Phone", quantity: 1, status: "ACCEPTED" },
];

export async function fetchOrders(): Promise<Order[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockOrders), 500);
  });
}

export async function createOrder(order: { product: string; quantity: number }): Promise<Order> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newOrder: Order = {
        id: Date.now().toString(),
        product: order.product,
        quantity: order.quantity,
        status: "PENDING",
      };
      mockOrders.push(newOrder);
      resolve(newOrder);
    }, 500);
  });
}

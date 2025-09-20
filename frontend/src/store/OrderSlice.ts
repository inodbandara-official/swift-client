import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchOrders, createOrder } from "../services/orderApi";

export interface Order {
  id: string;
  product: string;
  quantity: number;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
}

interface OrderState {
  orders: Order[];
  loading: boolean;
}

const initialState: OrderState = {
  orders: [],
  loading: false,
};

export const getOrders = createAsyncThunk("orders/fetch", async () => {
  return await fetchOrders();
});

export const addOrder = createAsyncThunk(
  "orders/add",
  async (order: Omit<Order, "id" | "status">) => {
    return await createOrder(order);
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(addOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.orders.push(action.payload);
      });
  },
});

export default orderSlice.reducer;

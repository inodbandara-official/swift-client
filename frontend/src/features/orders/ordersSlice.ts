import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

export type OrderStatus = 'received' | 'warehouse' | 'processing' | 'awaiting_delivery' | 'delivering' | 'delivered'

export interface Order {
  id: string
  reference: string
  status: OrderStatus
  createdAt: string
}

interface OrdersState {
  items: Order[]
  loading: boolean
  error?: string
}

const initialState: OrdersState = {
  items: [],
  loading: false,
}

export const fetchMyOrders = createAsyncThunk<Order[], string>(
  'orders/fetchMyOrders',
  async (userId: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api'
    const res = await fetch(`${baseUrl}/orders?userId=${encodeURIComponent(userId)}`)
    if (!res.ok) throw new Error('Failed to fetch orders')
    return res.json()
  }
)

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders(state, action: PayloadAction<Order[]>) {
      state.items = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMyOrders.pending, state => {
        state.loading = true
        state.error = undefined
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export const { setOrders } = ordersSlice.actions
export default ordersSlice.reducer

import { configureStore } from '@reduxjs/toolkit'
import ordersReducer from '@/features/orders/ordersSlice'
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    orders: ordersReducer,
  },
})

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<AppStore['getState']>

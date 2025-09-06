"use client"

import { Provider } from 'react-redux'
import { store } from '@/store/store'
import { AppUIProvider } from '@/providers/ui-context'
import type { ReactNode } from 'react'

export default function RootProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <AppUIProvider>
        {children}
      </AppUIProvider>
    </Provider>
  )
}

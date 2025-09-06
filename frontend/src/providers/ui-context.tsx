"use client"

import { createContext, useContext, useState, useMemo } from 'react'

type TabKey = 'overview' | 'orders' | 'billing' | 'contracts'

interface AppUIContextValue {
  activeTab: TabKey
  setActiveTab: (tab: TabKey) => void
}

const AppUIContext = createContext<AppUIContextValue | undefined>(undefined)

export function AppUIProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<TabKey>('overview')

  const value = useMemo(() => ({ activeTab, setActiveTab }), [activeTab])

  return (
    <AppUIContext.Provider value={value}>{children}</AppUIContext.Provider>
  )
}

export function useAppUI(): AppUIContextValue {
  const ctx = useContext(AppUIContext)
  if (!ctx) throw new Error('useAppUI must be used within AppUIProvider')
  return ctx
}

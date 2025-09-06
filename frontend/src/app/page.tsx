"use client"

import { useAppUI } from '@/providers/ui-context'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/store/store'
import { fetchMyOrders } from '@/features/orders/ordersSlice'
import { useEffect } from 'react'
import clsx from 'clsx'

export default function HomePage() {
  const { activeTab, setActiveTab } = useAppUI()
  const dispatch = useDispatch()
  const { items: orders, loading } = useSelector((s: RootState) => s.orders)

  useEffect(() => {
    if (activeTab === 'orders') {
      dispatch(fetchMyOrders('demo-user') as any)
    }
  }, [activeTab, dispatch])

  return (
    <main className="container py-8">
      <Header />
      <Tabs active={activeTab} onChange={setActiveTab} />
      <section className="mt-8">
        {activeTab === 'overview' && <Overview />}
        {activeTab === 'orders' && <MyOrders orders={orders} loading={loading} />}
        {activeTab === 'billing' && <Billing />}
        {activeTab === 'contracts' && <Contracts />}
      </section>
    </main>
  )
}

function Header() {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-semibold tracking-tight">SwiftTrack</h1>
      <p className="text-sm text-gray-300 mt-1">Swift Logistics portal for orders, billing, and contracts.</p>
    </div>
  )
}

function Tabs({ active, onChange }: { active: string; onChange: (k: any) => void }) {
  const tabs: { key: any; label: string }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'orders', label: 'My Orders' },
    { key: 'billing', label: 'Billing' },
    { key: 'contracts', label: 'Contracts' },
  ]

  return (
    <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2">
      {tabs.map(t => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          className={clsx(
            'rounded-md px-4 py-2 text-sm border border-cyan-800/40',
            active === t.key ? 'bg-cyan-600/20 text-cyan-200' : 'bg-white/5 text-gray-200 hover:bg-white/10'
          )}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}

function Overview() {
  return (
    <div className="rounded-lg border border-white/10 p-6 bg-white/5">
      <h2 className="text-xl font-medium">Logistics Flow</h2>
      <p className="text-gray-300 mt-2 text-sm leading-6">
        Orders are received via SOAP/XML, converted to REST/JSON by a Spring Boot adapter, routed through the API Gateway to microservices (ROS/Mobile backend & Order Service). Kafka coordinates order workflows and notifications. Track your delivery status from warehouse to delivered.
      </p>
    </div>
  )
}

function MyOrders({ orders, loading }: { orders: any[]; loading: boolean }) {
  if (loading) {
    return <div className="text-gray-300">Loading orders…</div>
  }
  if (!orders?.length) {
    return <div className="text-gray-300">No orders yet.</div>
  }
  return (
    <div className="grid gap-3">
      {orders.map(o => (
        <div key={o.id} className="rounded-md border border-white/10 p-4 bg-white/5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-300">Ref</div>
              <div className="font-medium">{o.reference}</div>
            </div>
            <StatusBadge status={o.status} />
          </div>
        </div>
      ))}
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const color = {
    received: 'bg-gray-600/30 text-gray-200',
    warehouse: 'bg-yellow-600/30 text-yellow-200',
    processing: 'bg-blue-600/30 text-blue-200',
    awaiting_delivery: 'bg-purple-600/30 text-purple-200',
    delivering: 'bg-cyan-600/30 text-cyan-200',
    delivered: 'bg-emerald-600/30 text-emerald-200',
  } as any
  return (
    <span className={clsx('px-3 py-1 rounded-md text-xs font-medium', color[status] || 'bg-white/10 text-white')}>{status}</span>
  )
}

function Billing() {
  return (
    <div className="rounded-lg border border-white/10 p-6 bg-white/5">
      <h2 className="text-xl font-medium">Billing</h2>
      <p className="text-gray-300 mt-2 text-sm">View invoices and manage payments (placeholder).</p>
    </div>
  )
}

function Contracts() {
  return (
    <div className="rounded-lg border border-white/10 p-6 bg-white/5">
      <h2 className="text-xl font-medium">Client Contracts</h2>
      <p className="text-gray-300 mt-2 text-sm">Review and manage client contracts (placeholder).</p>
    </div>
  )
}

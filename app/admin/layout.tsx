'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AdminSidebar } from '@/components/admin-sidebar'
import { AdminTopbar } from '@/components/admin-topbar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const userRole = localStorage.getItem('userRole')
    if (userRole !== 'admin') {
      router.push('/auth/signin')
    }
  }, [router])

  if (!mounted) return null

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden md:ml-64">
        <AdminTopbar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

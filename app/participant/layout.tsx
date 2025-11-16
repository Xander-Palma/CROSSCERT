'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ParticipantSidebar } from '@/components/participant-sidebar'
import { ParticipantTopbar } from '@/components/participant-topbar'

export default function ParticipantLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const userRole = localStorage.getItem('userRole')
    if (userRole !== 'participant') {
      router.push('/auth/signin')
    }
  }, [router])

  if (!mounted) return null

  return (
    <div className="flex h-screen bg-background">
      <ParticipantSidebar />
      <div className="flex-1 flex flex-col overflow-hidden md:ml-64">
        <ParticipantTopbar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

'use client'

import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Bell } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function AdminTopbar() {
  const router = useRouter()

  return (
    <div className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-6">
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-foreground">Admin Dashboard</h2>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Button
          variant="ghost"
          size="icon"
        >
          <Bell className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}

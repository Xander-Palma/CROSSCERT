'use client'

import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Bell, Search } from 'lucide-react'
import { useState } from 'react'

export function ParticipantTopbar() {
  const [userEmail] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userEmail') || 'user'
    }
    return 'user'
  })

  return (
    <div className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-6">
      <div className="flex-1 flex items-center gap-4">
        <div className="relative hidden md:block w-96">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search events..."
            className="w-full pl-10 pr-4 py-2 bg-muted rounded-lg text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Button variant="ghost" size="icon">
          <Bell className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
            {userEmail.charAt(0).toUpperCase()}
          </div>
          <span className="text-sm text-foreground hidden sm:inline">{userEmail}</span>
        </div>
      </div>
    </div>
  )
}

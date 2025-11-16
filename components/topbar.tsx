'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Bell, User, Plus } from 'lucide-react'

export function TopBar() {
  const router = useRouter()
  const [time, setTime] = useState(new Date().toLocaleTimeString())

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="sticky top-0 z-40 border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
      <div className="px-6 py-4 flex items-center justify-between gap-4">
        {/* Search */}
        <div className="hidden sm:flex flex-1 max-w-md items-center">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search events, participants..."
              className="pl-10 bg-background border-border"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 ml-auto">
          <span className="hidden sm:block text-sm text-muted-foreground font-mono">{time}</span>
          <Button
            size="icon"
            variant="ghost"
            className="relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
          </Button>
          <Button
            size="default"
            className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
            onClick={() => router.push('/events/create')}
          >
            <Plus className="w-4 h-4" />
            Create Event
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => router.push('/profile')}
          >
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, Calendar, Bookmark, Award, Settings, LogOut, Search } from 'lucide-react'
import { useState } from 'react'
import { Input } from '@/components/ui/input'

export function ParticipantSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState('')

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/participant/dashboard' },
    { icon: Calendar, label: 'Events', href: '/participant/events' },
    { icon: Bookmark, label: 'Bookmarks', href: '/participant/bookmarks' },
    { icon: Calendar, label: 'My Events', href: '/participant/my-events' },
    { icon: Award, label: 'Certificates', href: '/participant/certificates' },
    { icon: Settings, label: 'Settings', href: '/participant/settings' },
  ]

  const isActive = (href: string) => pathname === href

  const handleLogout = () => {
    localStorage.removeItem('userRole')
    localStorage.removeItem('userEmail')
    router.push('/')
  }

  return (
    <>
      <aside className="hidden md:flex fixed left-0 top-0 w-64 h-screen bg-card border-r border-border flex-col pt-16 z-30">
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/participant/dashboard')}>
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">C</span>
            </div>
            <span className="font-bold text-foreground">CROSSCERT</span>
          </div>
          
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-9 text-sm bg-background border-border"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.href}
                variant={isActive(item.href) ? 'default' : 'ghost'}
                className={`w-full justify-start gap-3 ${
                  isActive(item.href)
                    ? 'bg-secondary text-secondary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
                onClick={() => router.push(item.href)}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Button>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-destructive hover:bg-destructive/10"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile sidebar */}
      <aside className="md:hidden fixed left-0 top-16 w-64 h-[calc(100vh-64px)] bg-card border-r border-border flex-col z-30 overflow-y-auto">
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.href}
                variant={isActive(item.href) ? 'default' : 'ghost'}
                className={`w-full justify-start gap-3 ${
                  isActive(item.href)
                    ? 'bg-secondary text-secondary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
                onClick={() => router.push(item.href)}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Button>
            )
          })}
        </nav>

        <div className="p-4 border-t border-border mt-auto">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-destructive hover:bg-destructive/10"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            Logout
          </Button>
        </div>
      </aside>
    </>
  )
}

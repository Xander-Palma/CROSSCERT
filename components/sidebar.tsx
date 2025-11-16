'use client'

import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, Calendar, Award, Users, BarChart3, Settings, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'Events', icon: Calendar, href: '/events' },
  { label: 'Certificates', icon: Award, href: '/certificates' },
  { label: 'Participants', icon: Users, href: '/participants' },
  { label: 'Insights', icon: BarChart3, href: '/insights' },
  { label: 'Settings', icon: Settings, href: '/settings' },
]

export function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className="fixed bottom-4 right-4 z-40 p-2 rounded-lg bg-primary text-primary-foreground lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border transform transition-transform lg:translate-x-0 z-30 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border flex items-center gap-3 cursor-pointer" onClick={() => router.push('/')}>
          <div className="w-10 h-10 bg-sidebar-primary rounded-lg flex items-center justify-center">
            <span className="text-sidebar-primary-foreground font-bold">C</span>
          </div>
          <span className="font-bold text-sidebar-foreground">CROSSCERT</span>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <button
                key={item.href}
                onClick={() => {
                  router.push(item.href)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => router.push('/profile')}
          >
            <Users className="w-5 h-5 mr-2" />
            Profile
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-destructive"
            onClick={() => {
              // TODO: Handle logout
              router.push('/')
            }}
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

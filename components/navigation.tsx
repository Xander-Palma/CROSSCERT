'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { Bell, Menu, X } from 'lucide-react'

export function Navigation() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">C</span>
            </div>
            <span className="text-lg font-bold text-foreground hidden sm:inline">CROSSCERT</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:inline-flex"
            >
              <Bell className="w-5 h-5" />
            </Button>
            <Button
              variant="default"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => router.push('/auth/signin')}
            >
              Sign In
            </Button>

            {/* Mobile Menu */}
            <button
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Content */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
          </div>
        )}
      </div>
    </nav>
  )
}

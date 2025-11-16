'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useRef, useState } from 'react'

export function LandingHero() {
  const router = useRouter()
  const logoRef = useRef<HTMLDivElement | null>(null)
  const [skew, setSkew] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = logoRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const dx = (x - 0.5) * 2
    const dy = (y - 0.5) * 2
    const maxSkew = 8
    setSkew({ x: dx * -maxSkew, y: dy * maxSkew })
  }

  function resetTilt() {
    setHovered(false)
    setSkew({ x: 0, y: 0 })
  }

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block bg-accent/10 px-4 py-2 rounded-full">
                <span className="text-accent font-semibold text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  CROSSCERT
                </span>
              </div>
              <h1 className="text-5xl sm:text-6xl font-bold text-foreground leading-tight text-balance">
                Smart events start with automation.
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed text-balance">
                Organize, monitor attendance and generate verified certificates without the manual work.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => router.push('/auth/signin')}
              >
                Create an Event
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border"
                onClick={() => router.push('/discover')}
              >
                Explore Events
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">Trusted by leading institutions</p>
              <div className="flex flex-wrap gap-8 items-center opacity-60">
                <span className="font-semibold text-foreground">HCDC Campus-Wide Events</span>
                <span className="font-semibold text-foreground">Departmental Events</span>
                <span className="font-semibold text-foreground">VPAA Seminars</span>
              </div>
            </div>
          </div>

          {/* Right - Logo/Visual */}
          <div className="hidden lg:flex items-center justify-center">
            <div
              ref={logoRef}
              onMouseEnter={() => setHovered(true)}
              onMouseMove={handleMouseMove}
              onMouseLeave={resetTilt}
              className="relative w-full aspect-square max-w-md flex items-center justify-center"
            >
              {/* Animated color-cycling glow behind the logo */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl opacity-80 glow-cycle" />
              {/* Logo */}
              <div
                className="relative w-5/6 aspect-square transition-transform duration-150 ease-out"
                style={{ transform: `skewX(${skew.x}deg) skewY(${skew.y}deg)`, willChange: 'transform' }}
              >
                <Image src="/crosscert-logo.png" alt="CROSSCERT logo" fill className="object-contain select-none" priority />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

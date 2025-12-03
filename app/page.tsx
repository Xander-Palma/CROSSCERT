'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Navigation } from '@/components/navigation'
import { LandingHero } from '@/components/landing-hero'

export default function Home() {
  const router = useRouter()
  const [showSplash, setShowSplash] = useState(true)
  const departments = ['STE', 'CET', 'SBME', 'CHATME', 'HUSOCOM', 'COME', 'CCJE']

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 1000)
    return () => clearTimeout(t)
  }, [])

  if (showSplash) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">CROSSCERT</h1>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <LandingHero />

      {/* Marquee */}
      <div className="py-2 sm:py-3 -mt-4 sm:-mt-6 overflow-hidden flex items-center justify-center marquee-mask">
        <div className="marquee whitespace-nowrap select-none">
          {departments.map((d) => (
            <span
              key={`vis-${d}`}
              className="mx-4 sm:mx-6 md:mx-8 text-base sm:text-lg md:text-xl lg:text-2xl font-bold tracking-wide uppercase text-foreground/80 border border-border rounded-full px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 bg-background/60 backdrop-blur-[1px]"
            >
              {d}
            </span>
          ))}
          {/* full duplicate for seamless loop, hidden from assistive tech */}
          {departments.map((d) => (
            <span
              key={`dup-${d}`}
              className="mx-4 sm:mx-6 md:mx-8 text-base sm:text-lg md:text-xl lg:text-2xl font-bold tracking-wide uppercase text-foreground/80 border border-border rounded-full px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 bg-background/60 backdrop-blur-[1px]"
              aria-hidden
            >
              {d}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

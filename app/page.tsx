'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Navigation } from '@/components/navigation'
import { LandingHero } from '@/components/landing-hero'

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <LandingHero />
    </div>
  )
}

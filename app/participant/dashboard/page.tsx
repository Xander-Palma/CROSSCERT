'use client'

import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar, Award, Clock, Zap } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getStoredEvents } from '@/lib/event-context'

export default function ParticipantDashboard() {
  const router = useRouter()
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([])

  useEffect(() => {
    const storedEvents = getStoredEvents()
    setUpcomingEvents(storedEvents.slice(0, 3))
  }, [])

  const stats = [
    {
      label: 'Upcoming Events',
      value: upcomingEvents.length.toString(),
      icon: Clock,
      color: 'text-blue-500',
    },
    {
      label: 'Events Joined',
      value: '8',
      icon: Calendar,
      color: 'text-purple-500',
    },
    {
      label: 'Pending Evaluations',
      value: '2',
      icon: Zap,
      color: 'text-orange-500',
    },
    {
      label: 'Certificates Earned',
      value: '6',
      icon: Award,
      color: 'text-green-500',
    },
  ]

  return (
    <div className="p-6 space-y-8">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-foreground">Welcome Back!</h1>
          <p className="text-muted-foreground mt-1">Here's your activity summary</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="p-6 border border-border bg-card">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                </div>
                <Icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <Card className="p-6 border border-border bg-card">
        <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
            onClick={() => router.push('/participant/events')}
          >
            Browse Events
          </Button>
          <Button
            variant="outline"
            className="border-border text-foreground"
            onClick={() => router.push('/participant/my-events')}
          >
            My Events
          </Button>
          <Button
            variant="outline"
            className="border-border text-foreground"
            onClick={() => router.push('/participant/certificates')}
          >
            My Certificates
          </Button>
        </div>
      </Card>

      {/* Upcoming Events */}
      <Card className="p-6 border border-border bg-card">
        <h2 className="text-xl font-semibold text-foreground mb-4">Upcoming Events</h2>
        <div className="space-y-3">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                <div>
                  <p className="font-medium text-foreground">{event.name}</p>
                  <p className="text-sm text-muted-foreground">{event.date} • {event.startTime}</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => router.push(`/participant/event/${event.id}`)}
                >
                  View
                </Button>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No upcoming events yet</p>
          )}
        </div>
      </Card>
    </div>
  )
}

'use client'

import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar, Users, CheckCircle, Award } from 'lucide-react'
import { getStoredEvents } from '@/lib/event-context'
import { useState, useEffect } from 'react'

export default function AdminDashboard() {
  const router = useRouter()
  const [events, setEvents] = useState<any[]>([])
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalParticipants: 0,
    attendedToday: 0,
    certificatesIssued: 0,
  })

  useEffect(() => {
    const storedEvents = getStoredEvents()
    setEvents(storedEvents.slice(0, 5))
    
    const totalParticipants = storedEvents.reduce((sum, event) => sum + (event.participants || 0), 0)
    const attendedToday = storedEvents.reduce((sum, event) => sum + (event.attended || 0), 0)
    const certificatesIssued = storedEvents.reduce((sum, event) => sum + (event.certificates || 0), 0)
    
    setStats({
      totalEvents: storedEvents.length,
      totalParticipants,
      attendedToday,
      certificatesIssued,
    })
  }, [])

  const statsArray = [
    {
      label: 'Total Events',
      value: stats.totalEvents.toString(),
      icon: Calendar,
      color: 'text-blue-500',
    },
    {
      label: 'Total Participants',
      value: stats.totalParticipants.toString(),
      icon: Users,
      color: 'text-purple-500',
    },
    {
      label: 'Attended Today',
      value: stats.attendedToday.toString(),
      icon: CheckCircle,
      color: 'text-green-500',
    },
    {
      label: 'Certificates Issued',
      value: stats.certificatesIssued.toString(),
      icon: Award,
      color: 'text-red-500',
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
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome to your admin panel</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsArray.map((stat) => {
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
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => router.push('/admin/events/create')}
          >
            Create New Event
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push('/admin/events')}
          >
            Manage Events
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push('/admin/participants')}
          >
            View Participants
          </Button>
        </div>
      </Card>

      {/* Recent Events */}
      <Card className="p-6 border border-border bg-card">
        <h2 className="text-xl font-semibold text-foreground mb-4">Recent Events</h2>
        <div className="space-y-3">
          {events.length > 0 ? (
            events.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer">
                <div>
                  <p className="font-medium text-foreground">{event.name}</p>
                  <p className="text-sm text-muted-foreground">{event.date}</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => router.push(`/admin/events/${event.id}`)}
                >
                  View
                </Button>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No events created yet</p>
          )}
        </div>
      </Card>
    </div>
  )
}

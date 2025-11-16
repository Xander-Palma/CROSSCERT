'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Search, Plus, MoreVertical, Calendar, Users, CheckCircle } from 'lucide-react'

const mockEvents = [
  { id: 1, name: 'Python Workshop', date: 'Nov 20, 2025', status: 'scheduled', participants: 45, registrations: 48 },
  { id: 2, name: 'Leadership Seminar', date: 'Nov 25, 2025', status: 'scheduled', participants: 120, registrations: 125 },
  { id: 3, name: 'Web Dev Bootcamp', date: 'Dec 1, 2025', status: 'draft', participants: 0, registrations: 78 },
  { id: 4, name: 'Data Science Webinar', date: 'Nov 28, 2025', status: 'live', participants: 156, registrations: 156 },
  { id: 5, name: 'Soft Skills Training', date: 'Dec 8, 2025', status: 'draft', participants: 0, registrations: 0 },
]

export default function EventsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = activeTab === 'all' || event.status === activeTab
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-primary/10 text-primary'
      case 'live':
        return 'bg-accent/10 text-accent'
      case 'draft':
        return 'bg-muted text-muted-foreground'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Events</h1>
          <p className="text-muted-foreground mt-1">Manage and create events</p>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
          onClick={() => router.push('/events/create')}
        >
          <Plus className="w-4 h-4" />
          Create Event
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="all">All Events</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="live">Live</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredEvents.length > 0 ? (
            <div className="space-y-4">
              {filteredEvents.map((event) => (
                <Card
                  key={event.id}
                  className="p-6 border border-border hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3
                          className="font-semibold text-lg text-foreground cursor-pointer hover:text-primary"
                          onClick={() => router.push(`/events/${event.id}`)}
                        >
                          {event.name}
                        </h3>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mt-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {event.participants} attending
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" />
                          {event.registrations} registered
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => router.push(`/events/${event.id}`)}
                      >
                        Manage
                      </Button>
                      <Button size="icon" variant="ghost">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center border border-dashed border-border">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground mb-4">No events found</p>
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => router.push('/events/create')}
              >
                Create your first event
              </Button>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

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
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Events</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">Manage and create events</p>
        </div>
        <Button
          size="sm"
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 w-full sm:w-auto text-sm sm:text-base"
          onClick={() => router.push('/events/create')}
        >
          <Plus className="w-4 h-4" />
          Create Event
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
        <Input
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 sm:pl-10 text-sm sm:text-base h-9 sm:h-10"
        />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-4 sm:mb-6 h-9 sm:h-10">
          <TabsTrigger value="all" className="text-xs sm:text-sm">All Events</TabsTrigger>
          <TabsTrigger value="scheduled" className="text-xs sm:text-sm">Scheduled</TabsTrigger>
          <TabsTrigger value="live" className="text-xs sm:text-sm">Live</TabsTrigger>
          <TabsTrigger value="draft" className="text-xs sm:text-sm">Draft</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-3 sm:space-y-4">
          {filteredEvents.length > 0 ? (
            <div className="space-y-3 sm:space-y-4">
              {filteredEvents.map((event) => (
                <Card
                  key={event.id}
                  className="p-4 sm:p-5 md:p-6 border border-border hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <h3
                          className="font-semibold text-base sm:text-lg text-foreground cursor-pointer hover:text-primary truncate"
                          onClick={() => router.push(`/events/${event.id}`)}
                        >
                          {event.name}
                        </h3>
                        <div className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${getStatusColor(event.status)}`}>
                          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          {event.participants} attending
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          {event.registrations} registered
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 sm:flex-initial text-xs sm:text-sm"
                        onClick={() => router.push(`/events/${event.id}`)}
                      >
                        Manage
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 sm:h-9 sm:w-9">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 sm:p-12 text-center border border-dashed border-border">
              <Calendar className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground mx-auto mb-3 sm:mb-4 opacity-50" />
              <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">No events found</p>
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm sm:text-base"
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

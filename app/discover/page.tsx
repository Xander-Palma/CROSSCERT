'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Navigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, MapPin, Users, Clock, ArrowRight } from 'lucide-react'

const categories = [
  { id: 'all', label: 'All Events' },
  { id: 'hcdc', label: 'HCDC-Wide Events' },
  { id: 'cet', label: 'CET Events / IT' },
  { id: 'training', label: 'Trainings & Seminars' },
  { id: 'webinar', label: 'Webinars / Hybrid' },
]

const mockEvents = [
  {
    id: 1,
    title: 'Advanced Python Workshop',
    category: 'cet',
    date: 'Nov 20, 2025',
    time: '2:00 PM - 5:00 PM',
    location: 'Tech Hub',
    attendees: 45,
    image: '/python-workshop.jpg',
    organizer: 'CET Events',
  },
  {
    id: 2,
    title: 'Leadership Development Seminar',
    category: 'training',
    date: 'Nov 25, 2025',
    time: '9:00 AM - 12:00 PM',
    location: 'HCDC Conference Room',
    attendees: 120,
    image: '/leadership-seminar.jpg',
    organizer: 'VPAA',
  },
  {
    id: 3,
    title: 'Web Development Bootcamp',
    category: 'cet',
    date: 'Dec 1, 2025',
    time: '1:00 PM - 4:00 PM',
    location: 'Online',
    attendees: 78,
    image: '/web-development-concept.png',
    organizer: 'CET Events',
  },
  {
    id: 4,
    title: 'HCDC General Assembly',
    category: 'hcdc',
    date: 'Dec 5, 2025',
    time: '10:00 AM - 1:00 PM',
    location: 'Main Auditorium',
    attendees: 250,
    image: '/assembly-event.jpg',
    organizer: 'HCDC',
  },
  {
    id: 5,
    title: 'Data Science Webinar',
    category: 'webinar',
    date: 'Nov 28, 2025',
    time: '7:00 PM - 8:30 PM',
    location: 'Online',
    attendees: 156,
    image: '/data-science-concept.png',
    organizer: 'CET Events',
  },
  {
    id: 6,
    title: 'Soft Skills Training',
    category: 'training',
    date: 'Dec 8, 2025',
    time: '9:00 AM - 4:00 PM',
    location: 'HCDC Training Center',
    attendees: 89,
    image: '/soft-skills-training.jpg',
    organizer: 'HR',
  },
]

export default function DiscoverPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredEvents = mockEvents.filter(event => {
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">Discover Events</h1>
          <p className="text-lg text-muted-foreground mb-8 text-balance">Find and join seminars, trainings, and workshops that matter</p>
          
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-base"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Categories */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-2">
                <h3 className="font-semibold text-foreground mb-4">Categories</h3>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === cat.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Events Grid */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <p className="text-sm text-muted-foreground">{filteredEvents.length} events found</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredEvents.map(event => (
                  <Card
                    key={event.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                    onClick={() => router.push(`/event/${event.id}`)}
                  >
                    {/* Event Image */}
                    <div className="relative h-40 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                      <img
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                        {event.category === 'hcdc' ? 'HCDC' : event.category === 'cet' ? 'CET' : event.category === 'training' ? 'Training' : 'Webinar'}
                      </Badge>
                    </div>

                    {/* Event Details */}
                    <div className="p-4 space-y-3">
                      <h3 className="font-semibold text-foreground line-clamp-2">{event.title}</h3>
                      
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{event.attendees} attending</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <span className="text-xs text-muted-foreground">{event.organizer}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="group/btn"
                          onClick={(e) => {
                            e.stopPropagation()
                            router.push(`/event/${event.id}/register`)
                          }}
                        >
                          Register
                          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

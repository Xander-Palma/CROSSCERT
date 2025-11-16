'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Plus, Edit, Trash2, Eye } from 'lucide-react'

export default function AdminEvents() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null)
  const [events, setEvents] = useState([
    {
      id: 1,
      name: 'Python Workshop',
      date: 'Dec 15, 2024',
      participants: 32,
      attended: 28,
      evaluated: 25,
      certificates: 25,
    },
    {
      id: 2,
      name: 'Leadership Seminar',
      date: 'Dec 18, 2024',
      participants: 50,
      attended: 48,
      evaluated: 45,
      certificates: 45,
    },
  ])

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem('events') || '[]')
    if (savedEvents.length > 0) {
      // Format saved events to match table structure
      const formattedEvents = savedEvents.map((event: any) => ({
        id: event.id,
        name: event.name,
        date: event.date,
        participants: event.participants || 0,
        attended: event.attended || 0,
        evaluated: event.evaluated || 0,
        certificates: event.certificates || 0,
      }))
      setEvents([...events, ...formattedEvents])
    }
  }, [])

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = (id: number) => {
    setEvents(events.filter(e => e.id !== id))
    const savedEvents = JSON.parse(localStorage.getItem('events') || '[]')
    const updatedEvents = savedEvents.filter((e: any) => e.id !== id)
    localStorage.setItem('events', JSON.stringify(updatedEvents))
    setShowDeleteConfirm(null)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-foreground">Manage Events</h1>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
          onClick={() => router.push('/admin/events/create')}
        >
          <Plus className="w-4 h-4" />
          Create Event
        </Button>
      </div>

      {/* Search */}
      <Input
        placeholder="Search events..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-md bg-background border-border"
      />

      {/* Events Table */}
      <Card className="border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Event Name</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Date</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Participants</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Attended</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Evaluated</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Certificates</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredEvents.map((event) => (
                <tr key={event.id} className="hover:bg-muted transition-colors">
                  <td className="px-6 py-4 text-foreground font-medium">{event.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{event.date}</td>
                  <td className="px-6 py-4 text-foreground">{event.participants}</td>
                  <td className="px-6 py-4 text-foreground">{event.attended}</td>
                  <td className="px-6 py-4 text-foreground">{event.evaluated}</td>
                  <td className="px-6 py-4 text-foreground">{event.certificates}</td>
                  <td className="px-6 py-4 space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      title="View event details"
                      onClick={() => router.push(`/admin/events/${event.id}`)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      title="Edit event"
                      onClick={() => router.push(`/admin/events/${event.id}/edit`)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                      title="Delete event"
                      onClick={() => setShowDeleteConfirm(event.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="p-6 border border-border bg-card max-w-sm">
            <h2 className="text-lg font-bold text-foreground mb-2">Delete Event</h2>
            <p className="text-muted-foreground mb-6">Are you sure you want to delete this event? This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(null)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(showDeleteConfirm)}
              >
                Delete
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

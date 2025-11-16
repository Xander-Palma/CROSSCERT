'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Upload, MapPin, Clock, CalendarIcon, Users } from 'lucide-react'

const THEMES = [
  { id: 1, name: 'Professional Blue', color: 'bg-blue-600' },
  { id: 2, name: 'Tech Purple', color: 'bg-purple-600' },
  { id: 3, name: 'Vibrant Red', color: 'bg-red-600' },
  { id: 4, name: 'Forest Green', color: 'bg-green-600' },
  { id: 5, name: 'Ocean Teal', color: 'bg-teal-600' },
  { id: 6, name: 'Sunset Orange', color: 'bg-orange-600' },
  { id: 7, name: 'Midnight Navy', color: 'bg-slate-800' },
  { id: 8, name: 'Rose Pink', color: 'bg-pink-600' },
  { id: 9, name: 'Gold Yellow', color: 'bg-yellow-500' },
  { id: 10, name: 'Indigo', color: 'bg-indigo-600' },
]

const DEPARTMENT_ABBR = {
  'College of Criminal Justice Education': 'CCJE',
  'College of Engineering and Technology': 'CET',
  'College of Hospitality & Tourism Management': 'CHATME',
  'College of Arts & Sciences': 'HUSOCOM',
  'College of Maritime Education': 'COME',
  'School of Business & Management': 'SBME',
  'School of Teacher Education': 'STE',
}

export default function CreateEventPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  // Step 1: Event Details
  const [eventName, setEventName] = useState('')
  const [eventDescription, setEventDescription] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [timezone, setTimezone] = useState('Asia/Manila')
  const [speakers, setSpeakers] = useState('')
  const [venue, setVenue] = useState('')
  const [eventCategory, setEventCategory] = useState('HCDC') // added category
  const [departmentCategory, setDepartmentCategory] = useState('') // added department

  // Step 2: Options
  const [hasCapacityLimit, setHasCapacityLimit] = useState(false)
  const [capacity, setCapacity] = useState('')
  const [requireApproval, setRequireApproval] = useState(false)
  const [isPaidEvent, setIsPaidEvent] = useState(false)
  const [ticketPrice, setTicketPrice] = useState('')
  const [isPublic, setIsPublic] = useState(true)

  // Step 3: Theme
  const [selectedTheme, setSelectedTheme] = useState(1)

  const isStep1Valid = eventName && eventDescription && eventDate && startTime && endTime && venue
  const isStep2Valid = !hasCapacityLimit || capacity
  const isStep3Valid = selectedTheme

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setCoverImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCreateEvent = async () => {
    setIsLoading(true)
    
    await new Promise(resolve => setTimeout(resolve, 1500))

    const newEvent = {
      id: Date.now(),
      name: eventName,
      description: eventDescription,
      date: eventDate,
      startTime,
      endTime,
      timezone,
      speakers,
      venue,
      coverImage,
      capacity: hasCapacityLimit ? capacity : 'Unlimited',
      requireApproval,
      isPaidEvent,
      ticketPrice: isPaidEvent ? ticketPrice : 0,
      isPublic,
      theme: selectedTheme,
      participants: 0,
      attended: 0,
      evaluated: 0,
      certificates: 0,
      createdAt: new Date().toISOString(),
      category: eventCategory, // added category
      department: departmentCategory, // added department
      status: 'Upcoming',
    }

    const existingEvents = JSON.parse(localStorage.getItem('events') || '[]')
    existingEvents.push(newEvent)
    localStorage.setItem('events', JSON.stringify(existingEvents))

    setIsLoading(false)
    router.push('/admin/events')
  }

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <h1 className="text-3xl font-bold text-foreground">Create New Event</h1>
        <p className="text-muted-foreground">Follow the steps below to create your event</p>
      </div>

      {/* Progress Steps */}
      <div className="flex gap-4">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center gap-2">
            <button
              onClick={() => setCurrentStep(step)}
              disabled={step > currentStep + 1}
              className={`w-10 h-10 rounded-full font-semibold flex items-center justify-center transition-colors ${
                step < currentStep
                  ? 'bg-primary text-primary-foreground'
                  : step === currentStep
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed'
              }`}
            >
              {step}
            </button>
            {step < 4 && (
              <div className={`h-1 w-12 ${step < currentStep ? 'bg-primary' : 'bg-muted'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Event Details */}
      {currentStep === 1 && (
        <Card className="p-8 border border-border bg-card space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Step 1: Event Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Event Info */}
            <div className="space-y-4">
              <div>
                <Label className="text-foreground">Event Name *</Label>
                <Input
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  placeholder="e.g., Python Workshop 2025"
                  className="mt-1 bg-background border-border text-foreground"
                />
              </div>

              <div>
                <Label className="text-foreground">Event Description *</Label>
                <Textarea
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  placeholder="Describe your event in detail..."
                  className="mt-1 bg-background border-border text-foreground min-h-24"
                />
              </div>

              <div>
                <Label className="text-foreground">Date *</Label>
                <Input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="mt-1 bg-background border-border text-foreground"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-foreground">Start Time *</Label>
                  <Input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="mt-1 bg-background border-border text-foreground"
                  />
                </div>
                <div>
                  <Label className="text-foreground">End Time *</Label>
                  <Input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="mt-1 bg-background border-border text-foreground"
                  />
                </div>
              </div>

              <div>
                <Label className="text-foreground">Timezone</Label>
                <Input
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  placeholder="Asia/Manila"
                  className="mt-1 bg-background border-border text-foreground"
                />
              </div>

              <div>
                <Label className="text-foreground">Event Category</Label>
                <select
                  value={eventCategory}
                  onChange={(e) => {
                    setEventCategory(e.target.value)
                    if (e.target.value !== 'HCDC') setDepartmentCategory(e.target.value)
                  }}
                  className="w-full mt-1 px-3 py-2 rounded-md border border-border bg-background text-foreground"
                >
                  <option value="HCDC">HCDC Wide Event</option>
                  <option value="CET">CET - College of Engineering and Technology</option>
                  <option value="STE">STE - School of Teacher Education</option>
                  <option value="SBME">SBME - School of Business & Management</option>
                  <option value="HUSOCOM">HUSOCOM - College of Arts & Sciences</option>
                  <option value="CHATME">CHATME - College of Hospitality & Tourism Management</option>
                  <option value="COME">COME - College of Maritime Education</option>
                  <option value="CCJE">CCJE - College of Criminal Justice Education</option>
                </select>
              </div>
            </div>

            {/* Right: Cover Image & Additional Info */}
            <div className="space-y-4">
              <div>
                <Label className="text-foreground">Cover Image</Label>
                <div className="mt-1 border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="cover-upload"
                  />
                  <label htmlFor="cover-upload" className="cursor-pointer">
                    {coverImage ? (
                      <img src={coverImage || "/placeholder.svg"} alt="Cover" className="w-full h-40 object-cover rounded" />
                    ) : (
                      <div className="space-y-2">
                        <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Click to upload image</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div>
                <Label className="text-foreground">Speakers</Label>
                <Input
                  value={speakers}
                  onChange={(e) => setSpeakers(e.target.value)}
                  placeholder="e.g., John Doe, Jane Smith"
                  className="mt-1 bg-background border-border text-foreground"
                />
              </div>

              <div>
                <Label className="text-foreground">Venue / Location *</Label>
                <div className="flex gap-2 mt-1">
                  <div className="flex-1">
                    <Input
                      value={venue}
                      onChange={(e) => setVenue(e.target.value)}
                      placeholder="Enter venue address"
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                  <Button variant="outline" size="icon" className="border-border">
                    <MapPin className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              disabled={!isStep1Valid}
              onClick={() => setCurrentStep(2)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Next Step
            </Button>
          </div>
        </Card>
      )}

      {/* Step 2: Options */}
      {currentStep === 2 && (
        <Card className="p-8 border border-border bg-card space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Step 2: Event Options</h2>

          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <Label className="text-foreground font-semibold">Limit Capacity</Label>
                <p className="text-sm text-muted-foreground mt-1">Restrict number of participants</p>
              </div>
              <button
                onClick={() => {
                  setHasCapacityLimit(!hasCapacityLimit)
                  if (!hasCapacityLimit) setCapacity('')
                }}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  hasCapacityLimit ? 'bg-primary' : 'bg-muted-foreground'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    hasCapacityLimit ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {hasCapacityLimit && (
              <div>
                <Label className="text-foreground">Maximum Capacity</Label>
                <Input
                  type="number"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  placeholder="e.g., 100"
                  min="1"
                  className="mt-2 bg-background border-border text-foreground"
                />
              </div>
            )}

            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <Label className="text-foreground font-semibold">Require Approval</Label>
                <p className="text-sm text-muted-foreground mt-1">Approve registrations manually</p>
              </div>
              <button
                onClick={() => setRequireApproval(!requireApproval)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  requireApproval ? 'bg-primary' : 'bg-muted-foreground'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    requireApproval ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <Label className="text-foreground font-semibold">Paid Event</Label>
                <p className="text-sm text-muted-foreground mt-1">Charge ticket price</p>
              </div>
              <button
                onClick={() => {
                  setIsPaidEvent(!isPaidEvent)
                  if (!isPaidEvent) setTicketPrice('')
                }}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  isPaidEvent ? 'bg-primary' : 'bg-muted-foreground'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    isPaidEvent ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {isPaidEvent && (
              <div>
                <Label className="text-foreground">Ticket Price (PHP)</Label>
                <Input
                  type="number"
                  value={ticketPrice}
                  onChange={(e) => setTicketPrice(e.target.value)}
                  placeholder="e.g., 500"
                  min="0"
                  className="mt-2 bg-background border-border text-foreground"
                />
              </div>
            )}

            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <Label className="text-foreground font-semibold">Public Event</Label>
                <p className="text-sm text-muted-foreground mt-1">{isPublic ? 'Visible to everyone' : 'Private/Invite only'}</p>
              </div>
              <button
                onClick={() => setIsPublic(!isPublic)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  isPublic ? 'bg-primary' : 'bg-muted-foreground'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    isPublic ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(1)}
            >
              Back
            </Button>
            <Button
              disabled={!isStep2Valid}
              onClick={() => setCurrentStep(3)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Next Step
            </Button>
          </div>
        </Card>
      )}

      {/* Step 3: Theme Selection */}
      {currentStep === 3 && (
        <Card className="p-8 border border-border bg-card space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Step 3: Choose Theme</h2>
          <p className="text-muted-foreground">Select a theme for your event. You can customize it later.</p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {THEMES.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setSelectedTheme(theme.id)}
                className={`relative p-4 rounded-lg border-2 transition-all ${
                  selectedTheme === theme.id
                    ? 'border-primary ring-2 ring-primary'
                    : 'border-border hover:border-primary'
                }`}
              >
                <div className={`w-full h-24 ${theme.color} rounded-lg mb-2`} />
                <p className="text-sm font-medium text-foreground text-center">{theme.name}</p>
                {selectedTheme === theme.id && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="p-6 bg-muted rounded-lg border border-border">
            <h3 className="font-semibold text-foreground mb-2">Live Preview</h3>
            <div className={`${THEMES.find(t => t.id === selectedTheme)?.color} h-32 rounded-lg text-white p-4 flex flex-col justify-between`}>
              <div>
                <p className="font-bold text-lg">{eventName || 'Your Event Title'}</p>
                <p className="text-sm opacity-90">{venue || 'Event Venue'}</p>
              </div>
              <p className="text-sm opacity-75">{eventDate} at {startTime}</p>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(2)}
            >
              Back
            </Button>
            <Button
              onClick={() => setCurrentStep(4)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Review & Create
            </Button>
          </div>
        </Card>
      )}

      {/* Step 4: Final Review */}
      {currentStep === 4 && (
        <Card className="p-8 border border-border bg-card space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Step 4: Review & Create</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Event Name</p>
                <p className="font-semibold text-foreground">{eventName}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Venue</p>
                <p className="font-semibold text-foreground">{venue}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Date & Time</p>
                <p className="font-semibold text-foreground">{eventDate} • {startTime} - {endTime}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Capacity</p>
                <p className="font-semibold text-foreground">{hasCapacityLimit ? capacity : 'Unlimited'}</p>
              </div>
            </div>

            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-3">Event Preview</p>
              <div className={`${THEMES.find(t => t.id === selectedTheme)?.color} rounded-lg overflow-hidden text-white shadow-lg`}>
                {coverImage && (
                  <img src={coverImage || "/placeholder.svg"} alt="Cover" className="w-full h-40 object-cover" />
                )}
                <div className="p-6 space-y-3">
                  <h3 className="font-bold text-xl">{eventName}</h3>
                  <div className="flex items-center gap-2 text-sm opacity-90">
                    <CalendarIcon className="w-4 h-4" />
                    <span>{eventDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm opacity-90">
                    <Clock className="w-4 h-4" />
                    <span>{startTime} - {endTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm opacity-90">
                    <MapPin className="w-4 h-4" />
                    <span>{venue}</span>
                  </div>
                  {hasCapacityLimit && (
                    <div className="flex items-center gap-2 text-sm opacity-90">
                      <Users className="w-4 h-4" />
                      <span>Max {capacity} participants</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-primary/10 border border-primary rounded-lg">
            <p className="text-sm text-foreground">
              By creating this event, you agree to our terms and conditions. Events are subject to moderation.
            </p>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(3)}
              disabled={isLoading}
            >
              Back
            </Button>
            <Button
              onClick={handleCreateEvent}
              disabled={isLoading}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isLoading ? 'Creating Event...' : 'Create Event'}
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}

"""
Event models for CROSSCERT.
"""
from django.db import models
from django.contrib.auth.models import User


class Event(models.Model):
    """Event model for managing seminars and workshops."""
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('scheduled', 'Scheduled'),
        ('live', 'Live'),
        ('completed', 'Completed'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField()
    organizer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='organized_events')
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    location = models.CharField(max_length=255)
    capacity = models.IntegerField(default=50)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    speakers = models.JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return self.title


class EventRegistration(models.Model):
    """Event registration model for participants."""
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='registrations')
    email = models.EmailField()
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    affiliation = models.CharField(max_length=100)
    registered_at = models.DateTimeField(auto_now_add=True)
    qr_code = models.CharField(max_length=255, unique=True, null=True, blank=True)

    class Meta:
        unique_together = ('event', 'email')

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.event.title}"


class CheckIn(models.Model):
    """Check-in model for attendance tracking."""
    registration = models.OneToOneField(EventRegistration, on_delete=models.CASCADE, related_name='check_in')
    checked_in_at = models.DateTimeField(auto_now_add=True)
    check_out_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.registration.first_name} - {self.registration.event.title}"

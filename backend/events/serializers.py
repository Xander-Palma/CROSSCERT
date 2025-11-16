"""
Serializers for Event app.
"""
from rest_framework import serializers
from .models import Event, EventRegistration, CheckIn


class EventSerializer(serializers.ModelSerializer):
    """Serializer for Event model."""
    registration_count = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = ['id', 'title', 'description', 'date', 'start_time', 'end_time', 
                  'location', 'capacity', 'status', 'speakers', 'registration_count']

    def get_registration_count(self, obj):
        return obj.registrations.count()


class EventRegistrationSerializer(serializers.ModelSerializer):
    """Serializer for EventRegistration model."""
    class Meta:
        model = EventRegistration
        fields = ['id', 'event', 'email', 'first_name', 'last_name', 'affiliation', 'registered_at', 'qr_code']


class CheckInSerializer(serializers.ModelSerializer):
    """Serializer for CheckIn model."""
    participant_name = serializers.SerializerMethodField()
    event_title = serializers.SerializerMethodField()

    class Meta:
        model = CheckIn
        fields = ['id', 'registration', 'checked_in_at', 'check_out_at', 'participant_name', 'event_title']

    def get_participant_name(self, obj):
        return f"{obj.registration.first_name} {obj.registration.last_name}"

    def get_event_title(self, obj):
        return obj.registration.event.title

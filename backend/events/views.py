"""
Views for Event app.
"""
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Event, EventRegistration, CheckIn
from .serializers import EventSerializer, EventRegistrationSerializer, CheckInSerializer
import qrcode
import io
import base64


class EventViewSet(viewsets.ModelViewSet):
    """ViewSet for Event CRUD operations."""
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    @action(detail=True, methods=['get'])
    def registrations(self, request, pk=None):
        """Get all registrations for an event."""
        event = self.get_object()
        registrations = event.registrations.all()
        serializer = EventRegistrationSerializer(registrations, many=True)
        return Response(serializer.data)


class EventRegistrationViewSet(viewsets.ModelViewSet):
    """ViewSet for Event Registration management."""
    queryset = EventRegistration.objects.all()
    serializer_class = EventRegistrationSerializer

    def create(self, request, *args, **kwargs):
        """Register a participant for an event."""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Generate QR code
        registration = serializer.save()
        qr = qrcode.QRCode(version=1, box_size=10, border=5)
        qr.add_data(f"checkin_{registration.id}")
        qr.make(fit=True)
        
        img = qr.make_image(fill_color="black", back_color="white")
        img_io = io.BytesIO()
        img.save(img_io, 'PNG')
        img_io.seek(0)
        qr_code_base64 = base64.b64encode(img_io.getvalue()).decode()
        
        registration.qr_code = qr_code_base64
        registration.save()
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CheckInViewSet(viewsets.ModelViewSet):
    """ViewSet for Check-In management."""
    queryset = CheckIn.objects.all()
    serializer_class = CheckInSerializer

    @action(detail=False, methods=['post'])
    def check_in(self, request):
        """Check in a participant using registration ID."""
        registration_id = request.data.get('registration_id')
        
        try:
            registration = EventRegistration.objects.get(id=registration_id)
            check_in, created = CheckIn.objects.get_or_create(registration=registration)
            
            if not created:
                return Response(
                    {'message': 'Already checked in'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            serializer = self.get_serializer(check_in)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except EventRegistration.DoesNotExist:
            return Response(
                {'error': 'Registration not found'},
                status=status.HTTP_404_NOT_FOUND
            )

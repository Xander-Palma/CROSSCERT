"""
URL configuration for CROSSCERT project.
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from events.views import EventViewSet, EventRegistrationViewSet, CheckInViewSet
from participants.views import ParticipantViewSet, EvaluationViewSet
from certificates.views import CertificateViewSet

router = DefaultRouter()
router.register(r'events', EventViewSet, basename='event')
router.register(r'registrations', EventRegistrationViewSet, basename='registration')
router.register(r'check-ins', CheckInViewSet, basename='check-in')
router.register(r'participants', ParticipantViewSet, basename='participant')
router.register(r'evaluations', EvaluationViewSet, basename='evaluation')
router.register(r'certificates', CertificateViewSet, basename='certificate')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
]

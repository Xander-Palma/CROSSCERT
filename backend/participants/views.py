"""
Views for Participants app.
"""
from rest_framework import viewsets
from .models import Evaluation
from .serializers import EvaluationSerializer


class ParticipantViewSet(viewsets.ViewSet):
    """ViewSet for Participant management."""
    
    def list(self, request):
        """List all participants."""
        return Response([])


class EvaluationViewSet(viewsets.ModelViewSet):
    """ViewSet for Evaluation management."""
    queryset = Evaluation.objects.all()
    serializer_class = EvaluationSerializer

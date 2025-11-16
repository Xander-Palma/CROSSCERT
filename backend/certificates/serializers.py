"""
Serializers for Certificates app.
"""
from rest_framework import serializers
from .models import Certificate


class CertificateSerializer(serializers.ModelSerializer):
    """Serializer for Certificate model."""
    class Meta:
        model = Certificate
        fields = ['id', 'registration', 'certificate_number', 'issue_date', 'status', 'pdf_file']

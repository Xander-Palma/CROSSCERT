"""
Certificate generation module for CROSSCERT.
Handles PDF generation with customizable templates.
"""
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image, Table, TableStyle
from reportlab.lib import colors
from datetime import datetime
import io
import os
from pathlib import Path


class CertificateGenerator:
    """Generate PDF certificates with customizable templates."""
    
    def __init__(self, template_path=None):
        """
        Initialize certificate generator.
        
        Args:
            template_path: Optional path to custom certificate template image
        """
        self.template_path = template_path
        self.page_width, self.page_height = A4
        self.primary_color = HexColor('#bf1818')  # CROSSCERT Red
        self.secondary_color = HexColor('#0840bf')  # CROSSCERT Blue
        self.text_color = HexColor('#212121')  # Dark text
        
    def generate_certificate(self, participant_data, event_data, output_path=None):
        """
        Generate a certificate PDF.
        
        Args:
            participant_data: Dict with keys - name, email, year_level
            event_data: Dict with keys - title, date, start_time, end_time, duration, speakers, organizer
            output_path: Path to save PDF (if None, returns BytesIO object)
            
        Returns:
            Path to generated PDF or BytesIO object
        """
        if output_path is None:
            pdf_buffer = io.BytesIO()
        else:
            os.makedirs(os.path.dirname(output_path) or '.', exist_ok=True)
            pdf_buffer = output_path
            
        doc = SimpleDocTemplate(
            pdf_buffer,
            pagesize=A4,
            rightMargin=0.5*inch,
            leftMargin=0.5*inch,
            topMargin=0.5*inch,
            bottomMargin=0.5*inch,
        )
        
        # Create content
        elements = []
        
        # Header with decorative line
        elements.extend(self._create_header(doc))
        elements.append(Spacer(1, 0.3*inch))
        
        # Certificate title
        elements.extend(self._create_title(doc))
        elements.append(Spacer(1, 0.3*inch))
        
        # Participant name (main focus)
        elements.extend(self._create_participant_section(participant_data, doc))
        elements.append(Spacer(1, 0.3*inch))
        
        # Event details
        elements.extend(self._create_event_details(participant_data, event_data, doc))
        elements.append(Spacer(1, 0.4*inch))
        
        # Signature section
        elements.extend(self._create_signature_section(event_data, doc))
        
        # Build PDF
        doc.build(elements)
        
        if output_path is None:
            pdf_buffer.seek(0)
            return pdf_buffer
        return output_path
    
    def _create_header(self, doc):
        """Create header with CROSSCERT branding."""
        elements = []
        
        # Decorative top border
        styles = getSampleStyleSheet()
        style_center = ParagraphStyle(
            'CustomCenter',
            parent=styles['Normal'],
            alignment=1,  # Center
            fontSize=11,
            textColor=self.secondary_color,
            fontName='Helvetica-Bold',
        )
        
        header_text = Paragraph(
            "CROSSCERT - Certificate of Attendance",
            style_center
        )
        elements.append(header_text)
        
        return elements
    
    def _create_title(self, doc):
        """Create main certificate title."""
        elements = []
        
        styles = getSampleStyleSheet()
        title_style = ParagraphStyle(
            'CertTitle',
            parent=styles['Heading1'],
            fontSize=28,
            textColor=self.primary_color,
            alignment=1,  # Center
            fontName='Helvetica-Bold',
            spaceAfter=12,
        )
        
        title = Paragraph("Certificate of Achievement", title_style)
        elements.append(title)
        
        return elements
    
    def _create_participant_section(self, participant_data, doc):
        """Create participant name section."""
        elements = []
        
        styles = getSampleStyleSheet()
        
        # Intro text
        intro_style = ParagraphStyle(
            'Intro',
            parent=styles['Normal'],
            fontSize=12,
            alignment=1,  # Center
            textColor=self.text_color,
        )
        intro = Paragraph("This certificate is presented to", intro_style)
        elements.append(intro)
        elements.append(Spacer(1, 0.15*inch))
        
        # Participant name - emphasized
        name_style = ParagraphStyle(
            'ParticipantName',
            parent=styles['Heading2'],
            fontSize=24,
            alignment=1,  # Center
            textColor=self.primary_color,
            fontName='Helvetica-Bold',
            underline=True,
        )
        name = Paragraph(participant_data.get('name', 'Participant Name').upper(), name_style)
        elements.append(name)
        
        return elements
    
    def _create_event_details(self, participant_data, event_data, doc):
        """Create event details section."""
        elements = []
        
        styles = getSampleStyleSheet()
        
        body_style = ParagraphStyle(
            'Body',
            parent=styles['Normal'],
            fontSize=11,
            alignment=1,  # Center
            textColor=self.text_color,
            leading=14,
        )
        
        # Main text
        event_title = event_data.get('title', 'Event')
        date = event_data.get('date', 'Date')
        duration = event_data.get('duration', 'Duration')
        
        recognition_text = f"""
        For successfully attending and completing the requirements for<br/>
        <b>{event_title}</b><br/>
        held on <b>{date}</b><br/>
        Duration: <b>{duration}</b>
        """
        
        recognition = Paragraph(recognition_text, body_style)
        elements.append(recognition)
        
        return elements
    
    def _create_signature_section(self, event_data, doc):
        """Create signature and official seal section."""
        elements = []
        
        styles = getSampleStyleSheet()
        
        footer_style = ParagraphStyle(
            'Footer',
            parent=styles['Normal'],
            fontSize=10,
            alignment=1,  # Center
            textColor=self.text_color,
        )
        
        # Signature lines
        elements.append(Spacer(1, 0.3*inch))
        
        # Table for signatures
        sig_data = [
            ['___________________', '', '___________________'],
            ['Organizer Signature', '', 'Date'],
            ['', '', ''],
            [event_data.get('organizer', 'VPAA'), '', datetime.now().strftime('%B %d, %Y')],
        ]
        
        sig_table = Table(sig_data, colWidths=[2*inch, 0.5*inch, 2*inch])
        sig_table.setStyle(TableStyle([
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, -1), (-1, -1), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 10),
            ('TEXTCOLOR', (0, 0), (-1, -1), self.text_color),
        ]))
        
        elements.append(sig_table)
        
        # Footer text
        elements.append(Spacer(1, 0.2*inch))
        footer_text = Paragraph(
            "This certificate is issued in recognition of successful participation.<br/>" +
            "Certificate No: CERT-" + datetime.now().strftime('%Y-%m-%d-%H%M%S'),
            footer_style
        )
        elements.append(footer_text)
        
        return elements


class CertificateService:
    """Service class to manage certificate generation and storage."""
    
    def __init__(self, storage_path='certificates'):
        """
        Initialize certificate service.
        
        Args:
            storage_path: Path to store generated certificates
        """
        self.storage_path = Path(storage_path)
        self.storage_path.mkdir(parents=True, exist_ok=True)
        self.generator = CertificateGenerator()
    
    def generate_for_participant(self, registration, event):
        """
        Generate certificate for a participant.
        
        Args:
            registration: EventRegistration instance
            event: Event instance
            
        Returns:
            Path to generated certificate PDF
        """
        participant_data = {
            'name': f"{registration.first_name} {registration.last_name}",
            'email': registration.email,
            'year_level': registration.affiliation,
        }
        
        event_data = {
            'title': event.title,
            'date': event.date.strftime('%B %d, %Y'),
            'start_time': event.start_time.strftime('%I:%M %p'),
            'end_time': event.end_time.strftime('%I:%M %p'),
            'duration': f"{event.start_time.strftime('%I:%M %p')} - {event.end_time.strftime('%I:%M %p')}",
            'speakers': ', '.join(event.speakers) if event.speakers else 'N/A',
            'organizer': event.organizer.get_full_name() or event.organizer.username,
        }
        
        # Generate unique filename
        filename = f"{registration.id}_{event.id}_{datetime.now().strftime('%Y%m%d%H%M%S')}.pdf"
        filepath = self.storage_path / filename
        
        # Generate PDF
        self.generator.generate_certificate(
            participant_data,
            event_data,
            str(filepath)
        )
        
        return str(filepath)
    
    def generate_batch_certificates(self, event, registrations_list):
        """
        Generate certificates for multiple participants.
        
        Args:
            event: Event instance
            registrations_list: List of EventRegistration instances
            
        Returns:
            List of generated certificate paths
        """
        certificate_paths = []
        
        for registration in registrations_list:
            try:
                path = self.generate_for_participant(registration, event)
                certificate_paths.append(path)
            except Exception as e:
                print(f"Error generating certificate for {registration.email}: {e}")
        
        return certificate_paths


# Utility function for Django management commands
def generate_certificates_for_event(event_id):
    """
    Generate certificates for all eligible participants of an event.
    
    Args:
        event_id: ID of the event
    """
    from events.models import Event, EventRegistration
    from certificates.models import Certificate
    from django.utils import timezone
    import uuid
    
    try:
        event = Event.objects.get(id=event_id)
        service = CertificateService()
        
        # Get registrations with completed evaluations and check-ins
        eligible_registrations = EventRegistration.objects.filter(
            event=event,
            check_in__isnull=False,
            evaluation__isnull=False,
        ).exclude(certificate__isnull=False)  # Exclude already generated
        
        print(f"Generating certificates for {eligible_registrations.count()} participants...")
        
        for registration in eligible_registrations:
            # Generate PDF
            pdf_path = service.generate_for_participant(registration, event)
            
            # Create certificate record
            cert_number = f"CERT-{event.id}-{uuid.uuid4().hex[:8].upper()}"
            certificate = Certificate.objects.create(
                registration=registration,
                certificate_number=cert_number,
                pdf_file=pdf_path,
                status='generated',
                created_at=timezone.now(),
            )
            
            print(f"Generated certificate {cert_number} for {registration.first_name} {registration.last_name}")
        
        print("Certificate generation complete!")
        return True
        
    except Event.DoesNotExist:
        print(f"Event with ID {event_id} not found")
        return False

<h1 align="center" style="font-family: Helvetica, Arial, sans-serif; font-size: 110px; font-weight: 900; margin: 18px 0 6px 0; letter-spacing: 1px; color: #D32F2F;">
  CROSSCERT
    <br><br>
  <span style="color: #000000;">A Web-Based Event Management and Certificate Automation Platform</span>
</h1>

<div align="center" style="margin-top: 22px;">
  <h3 style="font-family: Helvetica, Arial, sans-serif; margin-bottom: 6px;">WS 101 – Finals Project</h3>
  <p style="margin: 4px 0 14px 0; font-family: Helvetica, Arial, sans-serif;">
    <strong>Developed by:</strong><br>
    Arnado, Catherine &nbsp;&middot;&nbsp; Asakil, Norman &nbsp;&middot;&nbsp; Madriñan, Ashlee &nbsp;&middot;&nbsp; Salazar, Joey &nbsp;&middot;&nbsp; Palma, Xander
    <br><br>
    <strong>Adviser:</strong> John Rey Silverio
  </p>
</div>

<hr style="border: 0; border-top: 1px solid #e6e6e6; margin: 22px 0;">


## Project 1: VPAA – Seminar Certificate Automation

### About
The **VPAA Seminar Certificate Automation System** helps schools manage seminars more efficiently — from registration and attendance tracking to feedback and certificate delivery.  
It minimizes manual work, improves accuracy, and keeps all records organized within one simple platform.


## Core Features

**Event Creation System**  
Admins can create and customize seminars or events with details such as title, date, and description.  

**Auto-Generated Registration Link**  
Each event automatically generates its own registration form link for participants.  

**Participant Registration Storage**  
All participant information is securely stored and organized per event.  

**Attendance Tracking**  
Participants can check in through QR or barcode scanning for accurate attendance recording.  

**Evaluation System**  
Feedback forms are automatically linked to each event to gather participant evaluations.  

**Certificate Automation**  
Certificates are automatically generated and emailed to participants who have completed both attendance and evaluation.  

**Data Export and Reporting**  
Admins can export participant and event data as CSV files or sync them directly to Google Sheets for reports.  


## Technology Stack

<div align="center" style="margin-bottom: 14px;">
  <img src="https://img.shields.io/badge/React-17.0-blue?logo=react&logoColor=ffffff" alt="React" style="margin-right: 6px;">
  <img src="https://img.shields.io/badge/Python-3.11-3776AB?logo=python&logoColor=ffffff" alt="Python" style="margin-right: 6px;">
  <img src="https://img.shields.io/badge/Firebase-Firestore-FFCA28?logo=firebase&logoColor=ffffff" alt="Firebase" style="margin-right: 6px;">
  <img src="https://img.shields.io/badge/Supabase-Postgres-3ECF8E?logo=supabase&logoColor=ffffff" alt="Supabase" style="margin-right: 6px;">
  <img src="https://img.shields.io/badge/Vercel-Hosting-black?logo=vercel&logoColor=ffffff" alt="Vercel">
</div>

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" width="42" height="42" style="margin: 0 10px;">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" width="42" height="42" style="margin: 0 10px;">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" alt="Firebase" width="42" height="42" style="margin: 0 10px;">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" alt="Supabase" width="42" height="42" style="margin: 0 10px;">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" alt="Vercel" width="42" height="42" style="margin: 0 10px;">
</p>


## System Overview

| **Component** | **Technology** | **Hosting** | **Description** |
|----------------|----------------|--------------|------------------|
| **Frontend** | React.js + Tailwind CSS | Vercel | Manages UI, dashboards, and event forms |
| **Authentication** | Firebase / Supabase Auth | Supabase / Firebase | Handles user authentication and security |
| **Database** | **PostgreSQL (Supabase)** | Supabase | Stores event details, participant info, and evaluations |
| **Backend / Automation** | Python (Flask or FastAPI) | Render / Railway | Handles automation tasks like QR generation and data export |
| **Storage (Optional)** | Supabase Storage | Supabase | Stores generated certificates, event images, and files |


## Conclusion

**CROSSCERT** transforms how institutions handle events and certificates — making the process faster, smarter, and fully automated.  
Built using **React**, **Firebase**, **Supabase**, and **Python**, the platform ensures secure, scalable, and efficient seminar management from start to finish.

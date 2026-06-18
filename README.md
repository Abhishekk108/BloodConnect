# BloodConnect — Blood Donor Management System

A web-based blood donor management platform that connects eligible donors with patients and healthcare providers through real-time availability tracking and location-based donor discovery.

---

## Overview

BloodConnect streamlines the process of blood donation by allowing users to register as donors, manage their availability, and be discovered during emergencies. The platform validates donor eligibility, maintains donation history, and provides an interactive map for locating nearby donors.

**Live Demo:** https://blood-donor-app-psi.vercel.app/

> **Note:** The application is currently optimized for desktop. Mobile responsiveness is under development.

---

## Features

* Secure user authentication with Firebase Authentication
* Donor registration and profile management
* Blood group and location-based donor records
* Automatic eligibility validation based on donation history
* Real-time availability status management
* Interactive donor map using Leaflet
* Toast notifications for user actions
* Cloud-based data storage with Firestore

---

## Tech Stack

### Frontend

* React 19
* React Router
* Bootstrap 5
* Custom CSS

### Backend & Database

* Firebase Authentication
* Cloud Firestore

### Maps

* Leaflet
* React Leaflet
* Leaflet GeoSearch

### Tooling

* Vite
* ESLint
* React Toastify

---

## Architecture

```
User Authentication
        │
        ▼
Donor Registration
        │
        ▼
Eligibility Validation
        │
        ▼
Firestore Database
        │
        ▼
Availability Management
        │
        ▼
Location-Based Donor Search
        │
        ▼
Interactive Donor Map
```

---

## Project Structure

```
src/
├── components/
├── firebase.js
├── App.jsx
├── main.jsx
└── App.css
```

---

## Getting Started

### Prerequisites

* Node.js v18+
* Firebase project with Authentication and Firestore enabled

### Installation

```bash
git clone https://github.com/Abhishekk108/blood-donor-app.git

cd blood-donor-app

npm install
```

Create a `.env` file:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Start the development server:

```bash
npm run dev
```

---

## How It Works

1. Users register or log in securely.
2. Donors create and update their profiles.
3. The system validates donation eligibility.
4. Donor availability is updated in real time.
5. Nearby donors are displayed on an interactive map.
6. Patients and hospitals can identify suitable donors quickly.

---

## Future Improvements

* Mobile responsive interface
* Distance-based donor search
* Advanced filtering by blood group and location
* Emergency SMS and email notifications
* Admin dashboard for donor verification
* Progressive Web App (PWA) support

---

## License

This project is intended for educational and demonstration purposes.

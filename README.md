# BloodConnect 🩸

> A web-based blood donor management system — connecting donors with those in need, when every second counts.

**Live Demo:** [blood-donor-app-psi.vercel.app](https://blood-donor-app-psi.vercel.app/)

> ⚠️ Currently optimized for desktop. Mobile responsiveness is in progress.

---

## Overview

BloodConnect is a centralized platform where blood donors can register, manage their availability, and be discovered by patients or hospitals during urgent situations. The system enforces donor eligibility rules and uses Firebase for real-time data management.

---

## Features

### 🔐 Authentication
- Secure sign-up and login via Firebase Authentication
- Email and password-based flow

### 📝 Donor Registration
- Create and manage a personal donor profile
- Store blood group, contact details, and location
- Track donation history
- Automatic eligibility validation (minimum 90-day gap between donations)

### ⏱ Availability Management
Donors can set their current status to one of three states:

| Status | Description |
|---|---|
| ✅ Available Now | Ready for regular donation requests |
| 🚨 Emergency Only | Available for critical situations only |
| ❌ Not Available | Currently unavailable |

### 🗺 Donor Map
- Interactive map powered by Leaflet
- Location-based visualization of registered donors
- Quickly identify nearby donors during emergencies

### 🔔 Notifications
- Real-time toast notifications for all user actions
- Clear success and error feedback throughout the app

---

## Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, React Router, Bootstrap 5, Custom CSS |
| **Backend & Auth** | Firebase Authentication, Firestore |
| **Maps** | Leaflet, react-leaflet, leaflet-geosearch |
| **Tooling** | Vite, ESLint, react-toastify |

---

## Project Structure

```
src/
├── components/
│   ├── DonorForm.jsx         # Donor registration and profile form
│   ├── DonorMap.jsx          # Interactive Leaflet map
│   ├── DonorList.jsx         # List view of registered donors
│   ├── UpdateAvailability.jsx # Availability status management
│   └── Navbar.jsx            # Navigation bar
│
├── firebase.js               # Firebase configuration
├── App.jsx                   # Root component and routing
├── main.jsx                  # Entry point
└── App.css                   # Global styles
```

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- A Firebase project with Firestore and Authentication enabled

### 1. Clone the Repository

```bash
git clone https://github.com/Abhishekk108/blood-donor-app.git
cd blood-donor-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Start the Development Server

```bash
npm run dev
```

---

## Data Model

Each donor document in the Firestore `donors` collection contains:

```json
{
  "bloodGroup": "O+",
  "phone": "+91XXXXXXXXXX",
  "city": "Mumbai",
  "lat": 19.0760,
  "lng": 72.8777,
  "isAvailable": true,
  "availabilityStatus": "available",
  "eligibility": true,
  "lastDonationDate": "2024-12-01"
}
```

---

## Known Limitations

- Desktop-first design — mobile responsiveness is a work in progress

---

## Roadmap

- [ ] Distance-based donor search
- [ ] Advanced filtering by blood group and city
- [ ] SMS / Email alerts for emergency requests
- [ ] Admin dashboard for donor verification
- [ ] Progressive Web App (PWA) support

---

## Author

**Abhishek Kallimath**
GitHub: [@Abhishekk108](https://github.com/Abhishekk108)

---

## License

This project is intended for educational and demonstration purposes.


🏥 MediTrack Pro - Health Management Application



A comprehensive healthcare application for tracking medications, monitoring vital signs, and visualizing health data with professional medical analytics.

🚀 Live Demo

👉 Try MediTrack Pro Now
https://meditrack-kohl-omega.vercel.app/

📋 Features

💊 Medication Management

· Add and track medications with dosage information
· Set frequency (once daily, twice daily, etc.)
· Mark medications as taken with timestamps
· Delete medications as needed

❤️ Vital Signs Tracking

· Record blood pressure (systolic/diastolic)
· Track heart rate and weight
· Monitor blood sugar levels
· Add notes and timestamps for each entry

📊 Health Analytics Dashboard

· Interactive charts showing health trends
· Blood pressure trend analysis
· Weight progression tracking
· Heart rate monitoring
· Health status indicators

🔐 Secure Authentication

· Professional Clerk authentication system
· Secure user data isolation
· Social login options (Google, GitHub)
· HIPAA-compliant data protection

🛠️ Technology Stack

Frontend

· React with Vite for fast development
· Tailwind CSS for beautiful, responsive design
· Recharts for interactive data visualization
· Clerk for authentication

Backend

· Node.js with Express.js
· MongoDB with Mongoose ODM
· CORS enabled for cross-origin requests

Deployment

· Frontend: Vercel
· Backend: Replit/Cyclic
· Database: MongoDB Atlas

🎯 Quick Start

Prerequisites

· Node.js (v18 or higher)
· MongoDB Atlas account
· Clerk account for authentication

Local Development

1. Clone the repository
   ```bash
   git clone https://github.com/LidiaAlemu/meditrack.git
   cd meditrack
   ```
2. Backend Setup
   ```bash
   cd server
   npm install
   cp .env.example .env
   npm run dev
   ```
3. Frontend Setup
   ```bash
   cd client
   npm install
   cp .env.example .env
   npm run dev
   ```

Environment Variables

Backend (.env)

```env
MONGODB_URI=mongodb+srv://meditrack_app:MediTrack123@cluster0.8ycmpiv.mongodb.net/meditrack
CLERK_SECRET_KEY=sk_test_2m89dnZ08AZmcoHfpLN21Aka8yaKmdoruMRrX59zdY
PORT=5000
NODE_ENV=development
```

Frontend (.env)

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_Y2xvc2luZy1wYXJyb3QtNzAuY2xlcmsuYWNjb3VudHMuZGV2JA
VITE_API_BASE_URL=http://localhost:5000/api
```

📁 Project Structure

```
meditrack/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API services
│   │   └── ...
│   └── package.json
├── server/                 # Express backend
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Auth middleware
│   └── server.js
└── README.md
```

🎨 Key Components

· Dashboard: Health metrics and chart visualizations
· Medications: Complete medication management
· Vital Logs: Comprehensive health tracking
· Authentication: Secure user login/signup

🔧 API Endpoints

Medications

· GET /api/medications - Get user's medications
· POST /api/medications - Add new medication
· PATCH /api/medications/:id/taken - Toggle medication taken status
· DELETE /api/medications/:id - Delete medication

Vital Logs

· GET /api/vitals - Get user's vital logs
· POST /api/vitals - Add new vital log
· DELETE /api/vitals/:id - Delete vital log

🌟 Why MediTrack Pro?

· Professional Healthcare UI/UX designed for medical use
· Real-time Data Visualization with interactive charts
· Secure Data Management with user isolation
· Responsive Design works on all devices
· Production Ready with proper error handling

👩‍💻 Developer

Lidia Alemu

· GitHub: LidiaAlemu
· Project Repository: MediTrack


🆘 Support

If you encounter any issues or have questions, please open an issue on the GitHub repository.

---

Built with ❤️ for better health management using the MERN stack

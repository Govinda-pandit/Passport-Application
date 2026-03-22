# Passport Application Experience Redesign

An elegant, intuitive, and highly functional redesign of the Passport Services web application, built around a user-centric flow.

## 🎯 Problem Solved
The traditional passport application process is often confusing for first-time users, dense with long forms, and lacks clarity on document requirements. This redesign tackles these issues by focusing on:
1. **Clear Onboarding:** Easy entry points with visually guided sign-up and login.
2. **Simplified Form Flow:** A step-by-step smart wizard replaces the gigantic single-page form.
3. **Auto-Save & Sync (Drafts):** Never lose your progress. The app automatically saves form data to the cloud as you type.
4. **Intuitive Document Uploads:** Clear visual indicators for required proofs (Aadhar, PAN) with verification badges.
5. **Modern Appointment Booking:** Selecting PSK centers and time slots is integrated directly into the final step.
6. **Premium Aesthetics:** Clean typography (Outfit & Inter), glassmorphism UI elements, smooth micro-animations, and vibrant visual hierarchy to build trust.

## 🚀 Tech Stack
- **Frontend:** React, Vite, React Router, Axios, plain CSS (with advanced CSS variables for theme management & micro-animations). Tailwind was avoided in favor of raw CSS architectural control, as preferred by modern vanilla frameworks.
- **Backend:** Node.js, Express, jsonwebtoken. (Using a robust JSON-based mock DB for easy local persistence via `data.json`).

## ⚙️ Setup Instructions

### 1. Backend Setup
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   npm start
   ```
   *The backend runs on `http://localhost:5000`.*

### 2. Frontend Setup
1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite dev server:
   ```bash
   npm run dev
   ```
   *The frontend runs on `http://localhost:5173`. Open this URL in your browser.*

---

## 🔑 Demo Access (Mandatory)

Reviewers can directly test the experience using the pre-seeded demo user account without needing to sign up:

- **Email:** `hire-me@anshumat.org`
- **Password:** `HireMe@2025!`

*(Upon logging in, you can view existing drafts or start a new application flow.)*

## 🎨 Key Features Implemented

### 1. Cloud Sync & Auto-Save
As applicants fill out the long passport form, changes are automatically pushed to the draft via debounced API calls. A persistent sync indicator at the top right assures users their data is safe ("Saved at 10:45 AM").

### 2. Premium Design Language
The UI operates on a `bg-main` / glassmorphism card structure. Micro-animations (`fade-in`, `slide-right`, `.card-hover`) guide the user's focus seamlessly without overwhelming them.

### 3. Clear Export / Record Access
At the confirmation screen, clear steps denote exactly what original documents to bring to the Passport Seva Kendra (PSK). Mock hooks are provided for "Export PDF" and "Share Web Record."

# 📈 Full Stack Stock Trading Platform — Zerodha Clone

A full-stack web application inspired by **Zerodha's Kite** platform, built with React, Node.js, Express, and MongoDB Atlas. Includes a landing page, a trader dashboard, and a REST API backend.

---

## 🚀 Live Demo

| Service | URL |
|---------|-----|
| 🌐 **Frontend** (Landing Page) | [zerodha-frontend-flax.vercel.app](https://zerodha-frontend-flax.vercel.app) |
| 📊 **Dashboard** | [zerodha-dashboard-rust.vercel.app](https://zerodha-dashboard-rust.vercel.app) |
| ⚙️ **Backend API** | [zerodha-backend-4811.onrender.com](https://zerodha-backend-4811.onrender.com) |

---

## ✨ Features

- 🔐 **User Auth** — Signup & Login with passport-local-mongoose
- 📊 **Live Market Tickers** — Simulated NIFTY 50 & SENSEX live updates
- 📋 **WatchList** — Browse and manage stocks
- 💼 **Holdings & Positions** — View current portfolio performance
- 📦 **Orders** — Place Buy/Sell orders with real-time feedback
- 💰 **Funds** — View available margin and used balance
- 📱 **Mobile Responsive** — Fully responsive across all screen sizes

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, React Router DOM, Bootstrap, Axios |
| **Dashboard** | React 19, Chart.js, Recharts, MUI Icons, Axios |
| **Backend** | Node.js, Express 5, Passport.js, Mongoose |
| **Database** | MongoDB Atlas |
| **Hosting** | Vercel (frontend & dashboard), Render (backend) |

---

## 📁 Project Structure

```
Full Stack Stock Trading Platform/
├── frontend/         # Landing page (Home, About, Products, Pricing, Support, Signup/Login)
├── dashboard/        # Trader dashboard (Holdings, Orders, Positions, Funds, WatchList)
└── backend/          # REST API (Express server + MongoDB models)
    ├── model/        # Mongoose models
    ├── schemas/      # Database schemas
    └── tests/        # API tests (Jest + Supertest)
```

---

## ⚙️ Getting Started (Local Development)

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)

### 1. Clone the Repository
```bash
git clone https://github.com/themukeshmali/Full-Stack-Stock-Trading-Platform-Zerodha-Clone.git
cd Full-Stack-Stock-Trading-Platform-Zerodha-Clone
```

### 2. Setup Backend
```bash
cd backend
npm install
```
Create a `.env` file in `backend/`:
```env
MONGO_URL=your_mongodb_atlas_connection_string
PORT=3002
FRONTEND_URL=http://localhost:3000
DASHBOARD_URL=http://localhost:3001
```
```bash
npm start
```

### 3. Setup Frontend
```bash
cd frontend
npm install
```
Create a `.env` file in `frontend/`:
```env
REACT_APP_API_URL=http://localhost:3002
REACT_APP_DASHBOARD_URL=http://localhost:3001
```
```bash
npm start
```

### 4. Setup Dashboard
```bash
cd dashboard
npm install
```
Create a `.env` file in `dashboard/`:
```env
REACT_APP_API_URL=http://localhost:3002
```
```bash
npm start
```

| App | Port |
|-----|------|
| Backend | `http://localhost:3002` |
| Frontend | `http://localhost:3000` |
| Dashboard | `http://localhost:3001` |

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/allHoldings` | Get all holdings |
| `GET` | `/allPositions` | Get all positions |
| `GET` | `/allOrders` | Get all orders |
| `POST` | `/newOrder` | Place a new order |
| `POST` | `/signup` | Register a new user |
| `POST` | `/login` | Login a user |

---

## 🌿 Git Branches

| Branch | Contents |
|--------|----------|
| `main` | Full project |
| `backend` | Backend API only |
| `frontend` | Landing page only |
| `dashboard` | Trader dashboard only |

---

## 📸 Screenshots

> Coming soon — add screenshots of your app here!

---

## 📄 License

This project is for educational purposes. Inspired by [Zerodha Kite](https://kite.zerodha.com/).

---

## 👨‍💻 Author

**Mukesh Mali** — [@themukeshmali](https://github.com/themukeshmali)

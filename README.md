# 🐬 GymDaulphin — Modern E-Commerce Fitness Store

A high-performance, responsive e-commerce web application built for fitness enthusiasts. **GymDaulphin** features a dark-themed slate/cyan aesthetic with glassmorphism UI elements, dynamic product filtering, live search, an integrated Redux Toolkit cart with `localStorage` persistence, and a free shipping progress indicator.

---

## 🚀 Live Demo & Features

- **🛒 Centralized State Management:** Built using Redux Toolkit to handle global cart interactions seamlessly.
- **💾 LocalStorage Persistence:** Cart state automatically saves and reloads across page sessions.
- **🔍 Live Search & Filter:** Instantly query products by keywords or filter by categories (Apparel, Gear, Supplements).
- **🚚 Free Shipping Progress Tracker:** Visual progress indicator inside the cart drawer notifying users when they unlock free shipping ($75 threshold).
- **🔔 Toast Notifications:** Real-time feedback alerts when items are added to the cart.
- **📱 Fully Responsive Design:** Sleek, modern grid layout optimized for mobile, tablet, and desktop viewports.

---

## 🛠️ Tech Stack

- **Framework:** [React 18](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) & [React-Redux](https://react-redux.js.org/)
- **Styling:** Custom CSS3 with Flexbox, CSS Grid, Glassmorphism, and CSS Variables
- **Icons & Imagery:** Unsplash curated high-resolution photography

---

## 📁 Project Structure

```text
gymdaulphin-app/
├── public/
│   └── favicon.ico
├── src/
│   ├── redux/
│   │   ├── cartSlice.js    # Redux cart state, reducers & localStorage sync
│   │   └── store.js        # Redux store configuration
│   ├── App.css             # Main styling rules, glassmorphism & layouts
│   ├── App.jsx             # Core application component & UI layout
│   ├── index.css           # Global CSS resets & typography
│   └── main.jsx            # Application entry point with Redux Provider
├── .gitignore
├── package.json
├── README.md
└── vite.config.js
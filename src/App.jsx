import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';
import Dashboard from './pages/Dashboard';
import PropertiesPage from './pages/PropertiesPage';
import AdminPanel from './pages/AdminPanel';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AuthProvider from './contexts/AuthContext';
import LoginPage from './pages/Login';
import ProtectRoute from './components/ProtectRoute';
export function App() {
  return <BrowserRouter>
    <div className="flex flex-col min-h-screen bg-white">
      <AuthProvider>
        <Navbar />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route element={<ProtectRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
              <Route path="/properties" element={<PropertiesPage />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </AuthProvider>
    </div>
  </BrowserRouter>;
}
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
import { Toaster } from 'sonner';
import ScrollToTop from './components/ScrollToTop';
import UserProvider from './contexts/UserContext';
import PropertyProvider from './contexts/PropertyContext';
import ProtectAdmin from './components/ProtectAdmin';
import AdminDashboard from './components/layout/AdminDashboard';
export function App() {
  return <BrowserRouter>
    <div className="flex flex-col min-h-screen bg-white">
      <AuthProvider>
        <UserProvider>
          <PropertyProvider>
            <Navbar />
            <Toaster richColors closeButton position='top-right' />
            <ScrollToTop />
            <main className="flex-grow">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/signup" element={<SignUpPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route element={<ProtectRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                  </Route>
                  <Route element={<ProtectAdmin />}>
                    {/* <Route element={<AdminDashboard />}> */}
                      <Route path="/admin" element={<AdminPanel /> } />
                    {/* </Route> */}
                  </Route>
                  <Route path="/properties" element={<PropertiesPage />} />
                </Routes>
              </AnimatePresence>
            </main>
            <Footer />
          </PropertyProvider>
        </UserProvider>
      </AuthProvider>
    </div>
  </BrowserRouter>;
}
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/authContext'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Courses from './pages/Courses'
import CourseDetails from './pages/CourseDetails'
import About from './pages/About'
import CourseContentNew from './pages/CourseContent_new'
import ContactUs from "./pages/ContactUs";
import Checkout from "./pages/Checkout";
import ThankYou from "./pages/Thankyou";
import Blogs from './pages/Blogs';
import MentalHealth from './pages/MentalHealth';
import PrivacyStatement from './pages/PrivacyStatement'
import Disclaimer from './pages/Disclaimer';
import Error from './pages/404';
import './styles/standardColors.css'

const App = () => {
  return (
    <AuthProvider>
      <div className="font-fitzgerald font-thin bg-white text-black min-h-screen">
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 5000,
            dismissible: true,
            style: {
              background: '#f5f5dc',
              color: '#bd6334',
              border: '1px solid #bd6334',
              fontSize: '14px',
              fontWeight: '500',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              maxWidth: '400px',
              position: 'relative',
              padding: '12px 40px 12px 16px',
            },
            success: {
              duration: 4000,
              dismissible: true,
              iconTheme: {
                primary: '#bd6334',
                secondary: '#f5f5dc',
              },
              style: {
                background: '#f0f9f0',
                color: '#2e7d32',
                border: '1px solid #4caf50',
                position: 'relative',
                padding: '12px 40px 12px 16px',
              }
            },
            error: {
              duration: 7000,
              dismissible: true,
              iconTheme: {
                primary: '#dc2626',
                secondary: '#fef2f2',
              },
              style: {
                background: '#fef2f2',
                color: '#dc2626',
                border: '1px solid #ef4444',
                fontWeight: '600',
                position: 'relative',
                padding: '12px 40px 12px 16px',
              }
            },
            loading: {
              dismissible: false,
              iconTheme: {
                primary: '#bd6334',
                secondary: '#f5f5dc',
              },
            },
          }}
        />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:id" element={<CourseDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/course-content/:id" element={
              <ProtectedRoute>
                <CourseContentNew />
              </ProtectedRoute>
            } />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/support" element={<ContactUs />} />
            <Route path="/checkout/:id" element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } />
            <Route path="/thankyou/:id" element={
              <ProtectedRoute>
                <ThankYou />
              </ProtectedRoute>
            } />
            <Route path="/thankyou" element={
              <ProtectedRoute>
                <ThankYou />
              </ProtectedRoute>
            } />
            <Route path="/privacy-statement" element={<PrivacyStatement />} />
            <Route path="/Blogs" element={<Blogs />} />
            <Route path="/mental-health" element={<MentalHealth />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  )
}

export default App
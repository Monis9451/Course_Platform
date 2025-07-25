import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/authContext';
import ProtectedRoute from './components/protectedRoutes';
import Home from './pages/Home';
import Login from './pages/Login';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import About from './pages/About';
import CourseContentNew from './pages/CourseContent_new';
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
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/courses" element={<Courses />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
            <Route path="/course/:id" element={<CourseDetails />} />
            <Route path="/course-content/:id" element={<CourseContentNew />} />
            <Route path="/checkout/:id" element={<Checkout />} />
            <Route path="/thankyou/:id" element={<ThankYou />} />
            <Route path="/thankyou" element={<ThankYou />} />
            </Route>

            <Route path="/about" element={<About />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/support" element={<ContactUs />} />
            <Route path="/privacy-statement" element={<PrivacyStatement />} />
            <Route path="/Blogs" element={<Blogs />} />
            <Route path="/mental-health" element={<MentalHealth />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Router>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#333',
              borderRadius: '0px',
              border: '1px solid #ddd',
            },
            success: {
              style: {
                border: '1px solid #10b981',
                color: '#10b981',
              },
            },
            error: {
              style: {
                border: '1px solid #ef4444',
                color: '#ef4444',
              },
            },
          }}
        />
      </div>
    </AuthProvider>
  )
}

export default App
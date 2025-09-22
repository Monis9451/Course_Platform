import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/authContext';
import { UserResponsesProvider } from './context/userResponsesContext';
import { CourseProgressProvider } from './context/courseProgressContext';
import ProtectedRoute from './components/protectedRoutes';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import About from './pages/About';
import CourseContent_new from './pages/CourseContent_new';
import ContactUs from "./pages/ContactUs";
import Checkout from "./pages/Checkout";
import ThankYou from "./pages/Thankyou";
import Blogs from './pages/Blogs';
import MentalHealth from './pages/MentalHealth';
import PrivacyStatement from './pages/PrivacyStatement'
import Disclaimer from './pages/Disclaimer';
import AdminDashboard from './pages/AdminDashboard';
import UserAnalytics from './pages/UserAnalytics';
import AddCourse from './pages/AddCourse';
import EditCoursesList from './pages/EditCoursesList';
import EditCourseContent from './pages/EditCourseContent';
import DeleteCoursesList from './pages/DeleteCoursesList';
import UserCourses from './pages/UserCourses';
import Error from './pages/404';
import './styles/standardColors.css'

const App = () => {
  return (
    <AuthProvider>
      <UserResponsesProvider>
        <CourseProgressProvider>
          <div className="font-fitzgerald font-thin bg-white text-black min-h-screen">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/courses" element={<Courses />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
            <Route path="/course/:id" element={<CourseDetails />} />
            <Route path="/checkout/:id" element={<Checkout />} />
            <Route path="/thankyou/:id" element={<ThankYou />} />
            <Route path="/thankyou" element={<ThankYou />} />
            <Route path="/my-courses" element={<UserCourses />} />
            </Route>

            {/* Admin Protected Routes */}
            <Route element={<AdminProtectedRoute />}>
              <Route path="/course-content/:id" element={<CourseContent_new />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/analytics" element={<UserAnalytics />} />
              <Route path="/admin/add-course" element={<AddCourse />} />
              <Route path="/admin/edit-courses" element={<EditCoursesList />} />
              <Route path="/admin/edit-course/:courseId" element={<EditCourseContent />} />
              <Route path="/admin/delete-courses" element={<DeleteCoursesList />} />
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
              borderRadius: '8px',
              border: '1px solid #ddd',
              fontSize: '14px',
              maxWidth: '400px',
            },
            success: {
              style: {
                border: '1px solid #10b981',
                color: '#10b981',
                background: '#f0fdf4',
              },
              iconTheme: {
                primary: '#10b981',
                secondary: '#f0fdf4',
              },
            },
            error: {
              style: {
                border: '1px solid #ef4444',
                color: '#ef4444',
                background: '#fef2f2',
              },
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fef2f2',
              },
            },
            loading: {
              style: {
                border: '1px solid #3b82f6',
                color: '#3b82f6',
                background: '#eff6ff',
              },
            },
          }}
        />
      </div>
      </CourseProgressProvider>
      </UserResponsesProvider>
    </AuthProvider>
  )
}

export default App
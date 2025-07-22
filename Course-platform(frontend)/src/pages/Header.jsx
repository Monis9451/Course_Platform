import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiUser, FiSearch, FiShoppingCart, FiMenu, FiX, FiLogOut, FiChevronDown, FiWifi, FiWifiOff } from 'react-icons/fi'
import { useAuth } from '../context/authContext'
import toast from 'react-hot-toast'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = React.useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'All Courses', path: '/courses' },
    { name: 'About The Founder', path: '/about' },
    { name: 'Contact Us', path: '/contact-us' },
    { name: 'Blogs', path: '/blogs' },
  ];

  const handleLogout = async () => {
    try {
      toast.loading('Signing out...', { id: 'logout' });
      await logout();
      setIsProfileDropdownOpen(false);
      toast.success('Signed out successfully!', { id: 'logout' });
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Error signing out. Please try again.', { id: 'logout' });
    }
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.profile-dropdown')) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div className="pt-40">
      <nav className="bg-primary px-4 py-11.5 fixed top-0 w-full z-50 shadow-lg text-base">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Left - Hamburger Menu */}
          <div className="flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-gray-200 focus:outline-none transition-colors duration-200 pl-1"
            >
              <svg 
                aria-hidden="true" 
                focusable="false" 
                role="presentation" 
                className="h-7 w-7" 
                viewBox="0 0 64 64"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <title>icon-hamburger</title>
                <path d="M7 15h51M7 32h51M7 49h51"></path>
              </svg>
            </button>
          </div>

          {/* Center - Logo */}          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link to="/" className="flex items-center">
              <img 
                src="/mindplanner_new_logo.png" 
                alt="The Mind Planner" 
                className="h-14 md:h-19 w-auto cursor-pointer hover:opacity-90 transition-opacity duration-200 pb-0.5" 
              />
            </Link>
          </div>          {/* Right - Icons */}
          <div className="flex items-center space-x-2 md:space-x-6.5">
            {/* User Profile */}
            {currentUser ? (
              <div className="relative profile-dropdown">
                <button 
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center text-white hover:text-gray-200 transition-colors duration-200 space-x-1"
                >
                  {currentUser.photoURL ? (
                    <img 
                      src={currentUser.photoURL} 
                      alt="Profile" 
                      className="h-6 w-6 rounded-full"
                    />
                  ) : (
                    <svg 
                      className="h-7 w-7" 
                      viewBox="0 0 64 64" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                    >
                      <path d="M35 39.84v-2.53c3.3-1.91 6-6.66 6-11.41 0-7.63 0-13.82-9-13.82s-9 6.19-9 13.82c0 4.75 2.7 9.51 6 11.41v2.53c-10.18.85-18 6-18 12.16h42c0-6.19-7.82-11.31-18-12.16Z"></path>
                    </svg>
                  )}
                  <FiChevronDown className="h-3 w-3 hidden md:block" />
                </button>
                
                {/* Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 z-50 border">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm text-gray-900 font-medium">Signed in as</p>
                      <p className="text-sm text-gray-600 truncate">{currentUser.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <FiLogOut className="h-4 w-4 mr-3" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                to="/login" 
                className="text-white hover:text-gray-200 transition-colors duration-200"
              >
                <svg 
                  className="h-7 w-7" 
                  viewBox="0 0 64 64" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M35 39.84v-2.53c3.3-1.91 6-6.66 6-11.41 0-7.63 0-13.82-9-13.82s-9 6.19-9 13.82c0 4.75 2.7 9.51 6 11.41v2.53c-10.18.85-18 6-18 12.16h42c0-6.19-7.82-11.31-18-12.16Z"></path>
                </svg>
              </Link>
            )}
            
            <button className="text-white hover:text-gray-200 transition-colors duration-200">
              <svg 
                aria-hidden="true" 
                focusable="false" 
                role="presentation" 
                className="h-7 w-7" 
                viewBox="0 0 64 64"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <title>icon-search</title>
                <path d="M47.16 28.58A18.58 18.58 0 1 1 28.58 10a18.58 18.58 0 0 1 18.58 18.58ZM54 54 41.94 42"></path>
              </svg>
            </button>
            <Link to="/checkout" className="hidden md:block text-white hover:text-gray-200 transition-colors duration-200">
              <svg 
                aria-hidden="true" 
                focusable="false" 
                role="presentation" 
                className="h-7 w-7" 
                viewBox="0 0 64 64"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path style={{strokeMiterlimit: 10}} d="M14 17.44h46.79l-7.94 25.61H20.96l-9.65-35.1H3"></path>
                <circle cx="27" cy="53" r="2"></circle>
                <circle cx="47" cy="53" r="2"></circle>
              </svg>
            </Link>
          </div>
        </div>        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 z-40 transition-opacity duration-500 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Mobile Menu */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-80 transition-transform duration-500 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } bg-white shadow-2xl flex flex-col`}
        >
          {/* Close Button */}
          <div className="flex justify-end p-4">
            <button
              className="text-black hover:text-gray-700 focus:outline-none transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FiX className="h-6 w-6" />
            </button>
          </div>          {/* Menu Items */}
          <div className="flex-1 px-6 py-4">
            {/* User info in mobile menu */}
            {currentUser && (
              <div className="mb-6 pb-4 border-b border-gray-200">
                <div className="flex items-center space-x-3 mb-3">
                  {currentUser.photoURL ? (
                    <img 
                      src={currentUser.photoURL} 
                      alt="Profile" 
                      className="h-10 w-10 rounded-full"
                    />
                  ) : (
                    <div className="h-10 w-10 bg-black rounded-full flex items-center justify-center">
                      <FiUser className="h-5 w-5 text-white" />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-black">Signed in as</p>
                    <p className="text-xs text-gray-600 truncate">{currentUser.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full text-left text-black hover:text-gray-700 text-sm py-2 transition-colors duration-200"
                >
                  <FiLogOut className="h-4 w-4 mr-3" />
                  Sign out
                </button>
              </div>
            )}
            
            <div className="space-y-1">
              <div className="border-t border-gray-200"></div>
              {navigationItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="block text-black hover:text-gray-700 text-base py-3 border-b border-gray-200 transition-colors duration-200 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header
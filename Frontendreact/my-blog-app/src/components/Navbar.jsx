import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <style>
        {`
          .modern-navbar {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            background-color: rgba(255, 255, 255, 0.95);
            transition: all 0.3s ease;
            padding: 15px 0;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          }
          
          .navbar-scrolled {
            padding: 8px 0;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
            background-color: #ffffff;
          }
          
          .navbar-container {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
          }
          
          .navbar-logo {
            display: flex;
            align-items: center;
            text-decoration: none;
          }
          
          .logo-icon {
            width: 40px;
            height: 40px;
            border-radius: 8px;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(to right, #4776E6, #8E54E9);
            transition: transform 0.3s ease;
          }
          
          .logo-icon:hover {
            transform: scale(1.05);
          }
          
          .logo-text {
            font-size: 20px;
            color: #333;
            font-weight: 600;
            margin-left: 10px;
            transition: color 0.3s ease;
          }
          
          .navbar-logo:hover .logo-text {
            color: #6d46e4;
          }
          
          .navbar-links {
            display: flex;
            align-items: center;
          }
          
          .nav-link {
            color: #333;
            text-decoration: none;
            padding: 8px 16px;
            margin: 0 5px;
            border-radius: 6px;
            font-size: 16px;
            font-weight: 500;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
          }
          
          .nav-link:hover {
            background-color: rgba(109, 70, 228, 0.1);
            color: #6d46e4;
          }
          
          .nav-link svg {
            margin-right: 6px;
          }
          
          .btn-primary {
            background: linear-gradient(to right, #4776E6, #8E54E9);
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
          }
          
          .btn-primary:hover {
            box-shadow: 0 4px 12px rgba(109, 70, 228, 0.3);
            transform: translateY(-2px);
          }
          
          .mobile-menu-btn {
            display: none;
            background: none;
            border: none;
            cursor: pointer;
            padding: 5px;
            color: #333;
          }
          
          .mobile-menu {
            display: none;
            width: 100%;
            padding-top: 15px;
            overflow: hidden;
            transition: max-height 0.3s ease, opacity 0.3s ease;
          }
          
          .mobile-menu.open {
            display: block;
            max-height: 500px;
            opacity: 1;
          }
          
          .mobile-menu.closed {
            max-height: 0;
            opacity: 0;
          }
          
          .mobile-menu-links {
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding: 10px 0;
          }
          
          @media (max-width: 768px) {
            .navbar-links {
              display: none;
            }
            
            .mobile-menu-btn {
              display: block;
            }
            
            .mobile-menu {
              display: block;
            }
          }
        `}
      </style>
      <nav className={`modern-navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Logo */}
          <a href="/" className="navbar-logo">
            <div className="logo-icon">
              <span style={{ color: 'white', fontWeight: 'bold' }}>B</span>
            </div>
            <span className="logo-text">BlogSpace</span>
          </a>
          
          {/* Desktop Links */}
          <div className="navbar-links">
            <a href="/" className="nav-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              Home
            </a>
            <a href="/addBlog" className="btn-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
              Add Blog
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : 'closed'}`}>
          <div className="navbar-container">
            <div className="mobile-menu-links">
              <a href="/" className="nav-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                Home
              </a>
              <a href="/addBlog" className="btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
                Add Blog
              </a>
            </div>
          </div>
        </div>
      </nav>
      {/* Add spacing below navbar to prevent content from hiding under it */}
      <div style={{ height: '70px' }}></div>
    </>
  );
}
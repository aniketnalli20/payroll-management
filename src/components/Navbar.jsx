import React, { useState, useEffect } from 'react';
import '../index.css';

function Navbar() {
  // State for managing dropdowns
  const [activeDropdown, setActiveDropdown] = useState(null);
  // State for mobile menu toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // State for login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle profile modal opening
  const openProfileModal = () => {
    // Add your profile modal opening logic here
    console.log('Opening profile modal');
  };

  // Function to toggle dropdown visibility
  const toggleDropdown = (dropdownId, event) => {
    event.stopPropagation();
    setActiveDropdown(activeDropdown === dropdownId ? null : dropdownId);
  };

  // Function to handle login button click
  const handleLogin = () => {
    alert('Login functionality will be implemented soon!');
  };

  // Function to handle get started button click
  const handleGetStarted = () => {
    // Dispatch custom event to open contact form
    const event = new CustomEvent('openContactForm');
    document.dispatchEvent(event);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Skip if the click is on a nav-link button that controls a dropdown
      if (event.target.classList.contains('nav-link') && 
          event.target.getAttribute('aria-haspopup') === 'true') {
        return;
      }
      
      if (!event.target.closest('.dropdown')) {
        setActiveDropdown(null);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <header className="header" role="banner">
      <div className="navbar-container">
        <span className="logo" aria-label="Orbisyn Home">Orbisyn</span>
        <button 
          className="menu-toggle" 
          aria-label="Toggle menu" 
          aria-expanded={mobileMenuOpen}
          aria-controls="mainNav"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >&#9776;</button>
        <div className="nav-and-cta">
          <ul 
            className={`nav ${mobileMenuOpen ? 'show' : ''}`} 
            id="mainNav" 
            role="menubar" 
            aria-label="Primary navigation"
          >
            {/* HR & Payroll Dropdown */}
            <li role="none">
              <button 
                className="nav-link" 
                aria-haspopup="true" 
                aria-expanded={activeDropdown === 'dropdown-hrpayroll'} 
                aria-controls="dropdown-hrpayroll" 
                role="menuitem" 
                onClick={(e) => toggleDropdown('dropdown-hrpayroll', e)}
              >
                HR & Payroll
              </button>
              <div 
                id="dropdown-hrpayroll" 
                role="menu" 
                className={`dropdown ${activeDropdown === 'dropdown-hrpayroll' ? 'open' : ''}`}
              >
                <div className="dropdown-section">
                  <div className="dropdown-title">Payroll Services</div>
                  <a href="#">Compare payroll plans</a>
                  <a href="#">Small business payroll</a>
                </div>
                <div className="dropdown-section">
                  <div className="dropdown-title">Human Resources</div>
                  <a href="#">Compare HR plans</a>
                  <a href="#">Professional employer organization</a>
                  <a href="#">Human Resources overview</a>
                </div>
                <div className="dropdown-section">
                  <div className="dropdown-title">Workforce Planning</div>
                  <a href="#">Time n attendance</a>
                  <a href="#">Time clocks n zones</a>
                  <a href="#">HR analytics & reporting</a>
                  <a href="#">Workforce planning overview</a>
                </div>
              </div>
            </li>

            {/* Employee Benefits Dropdown */}
            <li role="none">
              <button 
                className="nav-link" 
                aria-haspopup="true" 
                aria-expanded={activeDropdown === 'dropdown-benefits'} 
                aria-controls="dropdown-benefits" 
                role="menuitem" 
                onClick={(e) => toggleDropdown('dropdown-benefits', e)}
              >
                Employee Benefits
              </button>
              <div 
                id="dropdown-benefits" 
                role="menu" 
                className={`dropdown ${activeDropdown === 'dropdown-benefits' ? 'open' : ''}`}
              >
                <a href="#">Health insurance</a>
                <a href="#">Voluntary benefits</a>
                <a href="#">Workers Compensation</a>
                <a href="#">Employee benefits overview</a>
              </div>
            </li>

            {/* Solutions Dropdown */}
            <li role="none">
              <button 
                className="nav-link" 
                aria-haspopup="true" 
                aria-expanded={activeDropdown === 'dropdown-solutions'} 
                aria-controls="dropdown-solutions" 
                role="menuitem" 
                onClick={(e) => toggleDropdown('dropdown-solutions', e)}
              >
                Solutions
              </button>
              <div 
                id="dropdown-solutions" 
                role="menu" 
                className={`dropdown ${activeDropdown === 'dropdown-solutions' ? 'open' : ''}`}
              >
                <div className="dropdown-section">
                  <div className="dropdown-title">Business size</div>
                  <a href="#">Startup</a>
                  <a href="#">Self employed</a>
                  <a href="#">1-19 employees</a>
                  <a href="#">20-49 employees</a>
                  <a href="#">Business solution</a>
                </div>
                <div className="dropdown-section">
                  <div className="dropdown-title">Industries</div>
                  <a href="#">Restaurants n Hospitality</a>
                  <a href="#">Professional services</a>
                  <a href="#">Retail</a>
                  <a href="#">Skilled trades</a>
                  <a href="#">Healthcare</a>
                  <a href="#">Manufacturing</a>
                  <a href="#">Non profits</a>
                  <a href="#">All industries</a>
                </div>
                <div className="dropdown-section">
                  <a href="#">Full-service hr n benefits</a>
                </div>
              </div>
            </li>

            {/* Resources Dropdown */}
            <li role="none">
              <button 
                className="nav-link" 
                aria-haspopup="true" 
                aria-expanded={activeDropdown === 'dropdown-resources'} 
                aria-controls="dropdown-resources" 
                role="menuitem" 
                onClick={(e) => toggleDropdown('dropdown-resources', e)}
              >
                Resources
              </button>
              <div 
                id="dropdown-resources" 
                role="menu" 
                className={`dropdown ${activeDropdown === 'dropdown-resources' ? 'open' : ''}`}
              >
                <div className="dropdown-section">
                  <div className="dropdown-title">Worx blog</div>
                  <a href="#">All content</a>
                  <a href="#">Articles</a>
                  <a href="#">Guides</a>
                </div>
                <div className="dropdown-section">
                  <a href="#">State compliance resourcs</a>
                </div>
                <div className="dropdown-section">
                  <div className="dropdown-title">Calc</div>
                  <a href="#">Retirement</a>
                  <a href="#">Secure act crrdit estimator</a>
                  <a href="#">Business expenses calc</a>
                  <a href="#">Time calc</a>
                  <a href="#">Financial calc</a>
                  <a href="#">FSA calc</a>
                  <a href="#">FICA tip calc</a>
                  <a href="#">SUI calc</a>
                </div>
              </div>
            </li>

            {/* Contact Dropdown with Nested Support Dropdown */}
            <li role="none">
              <button 
                className="nav-link" 
                aria-haspopup="true" 
                aria-expanded={activeDropdown === 'dropdown-contact'} 
                aria-controls="dropdown-contact" 
                role="menuitem" 
                onClick={(e) => toggleDropdown('dropdown-contact', e)}
              >
                Contact
              </button>
              <div 
                id="dropdown-contact" 
                role="menu" 
                className={`dropdown ${activeDropdown === 'dropdown-contact' ? 'open' : ''}`}
              >
                <a href="#" onClick={(e) => {
                  e.preventDefault();
                  // Find and use the openForm function from MultiStepForm
                  const event = new CustomEvent('openContactForm');
                  document.dispatchEvent(event);
                }}>Contact sales</a>
                <button 
                  className="nav-link" 
                  aria-haspopup="true" 
                  aria-expanded={activeDropdown === 'dropdown-support'} 
                  aria-controls="dropdown-support" 
                  style={{paddingLeft: 0}} 
                  onClick={(e) => toggleDropdown('dropdown-support', e)}
                >
                  Contact Support ▾
                </button>
                <div 
                  id="dropdown-support" 
                  role="menu" 
                  className={`dropdown nested-dropdown ${activeDropdown === 'dropdown-support' ? 'open' : ''}`}
                  style={{left: '100%', top: 0, minWidth: '220px', maxWidth: '240px'}}
                >
                  <a href="#" style={{paddingLeft: '1rem'}}>All support options</a>
                </div>
              </div>
            </li>

            {/* About Us Link */}
            <li role="none">
              <a href="#" className="nav-link" role="menuitem">About Us</a>
            </li>

            {/* Login Button (Before Login) */}
            <li role="none" className={isLoggedIn ? 'before-login hidden' : 'before-login'}>
              <button className="login-btn" role="menuitem" onClick={handleLogin}>
                Login
              </button>
            </li>

            {/* Profile Button (After Login) */}
            <li role="none" className={isLoggedIn ? 'after-login' : 'after-login hidden'}>
              <button className="nav-link nav-profile-btn" onClick={openProfileModal} role="menuitem" aria-label="Open profile">
                <span className="header-avatar" id="headerAvatar">
                  <span className="material-icons">person</span>
                </span>
              </button>
            </li>
          </ul>
          
          {/* Get Started Button */}
          <button 
            className={isLoggedIn ? 'get-started-btn before-login hidden' : 'get-started-btn before-login'} 
            role="link" 
            tabIndex="0" 
            onClick={handleGetStarted}
          >
            Let's Get Started
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
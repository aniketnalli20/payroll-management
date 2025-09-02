import React, { useState, useEffect } from 'react';
import '../index.css';

function LoginModal() {
  // State for modal visibility
  const [isVisible, setIsVisible] = useState(false);
  // State for login type (employer/employee)
  const [loginType, setLoginType] = useState('employer');
  // State for form fields
  const [formData, setFormData] = useState({
    loginField: '',
    password: ''
  });
  // State for error messages
  const [errorMsg, setErrorMsg] = useState('');
  // State for attempt warning
  const [showAttemptWarning, setShowAttemptWarning] = useState(false);
  // State for success message
  const [successMsg, setSuccessMsg] = useState('');
  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);
  // State for attempt count
  const [attemptCount, setAttemptCount] = useState(0);

  // Mock user database (in a real app, this would be handled by a backend)
  const mockUsers = {
    employer: [
      { id: 'emp_001', email: 'john.smith@techcorp.com', password: 'TechCorp@2024', name: 'John Smith' },
      { id: 'emp_002', email: 'sarah.johnson@innovate.biz', password: 'Innovation!123', name: 'Sarah Johnson' },
      { id: 'emp_003', email: 'michael.chen@globaltech.net', password: 'Finance#2024', name: 'Michael Chen' }
    ],
    employee: [
      { id: 'emp_101', username: 'dev_alex_2024', password: 'DevCode@123', name: 'Alex Rodriguez' },
      { id: 'emp_102', username: 'marketing_lisa', password: 'Market!ng456', name: 'Lisa Williams' },
      { id: 'emp_103', username: 'sales_robert', password: 'Sales&Rep789', name: 'Robert Davis' },
      { id: 'emp_104', username: 'hr_assistant_jane', password: 'HumanRes@2024', name: 'Jane Miller' }
    ]
  };

  // Function to open the login modal
  const openModal = () => {
    setIsVisible(true);
    resetForm();
  };

  // Function to close the login modal
  const closeModal = () => {
    setIsVisible(false);
    resetForm();
  };

  // Function to reset the form
  const resetForm = () => {
    setFormData({
      loginField: '',
      password: ''
    });
    setErrorMsg('');
    setSuccessMsg('');
    setShowAttemptWarning(false);
    setAttemptCount(0);
  };

  // Function to handle login type toggle
  const handleLoginTypeToggle = (type) => {
    setLoginType(type);
    resetForm();
  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.loginField || !formData.password) {
      setErrorMsg('Please enter both email/username and password.');
      return;
    }

    // Attempt login
    const users = mockUsers[loginType];
    const fieldType = loginType === 'employer' ? 'email' : 'username';
    
    const user = users.find(u => 
      u[fieldType] === formData.loginField && 
      u.password === formData.password
    );

    if (user) {
      // Successful login
      setSuccessMsg(`Welcome back, ${user.name}!`);
      setErrorMsg('');
      setShowAttemptWarning(false);
      
      // In a real app, you would set authentication state/token here
      setTimeout(() => {
        closeModal();
        // Notify parent component about successful login
        const event = new CustomEvent('loginSuccess', { 
          detail: { userId: user.id, name: user.name } 
        });
        document.dispatchEvent(event);
      }, 1500);
    } else {
      // Failed login
      setErrorMsg('Invalid username or password.');
      setAttemptCount(prev => prev + 1);
      
      if (attemptCount >= 2) { // Show warning after 3 attempts (0, 1, 2)
        setShowAttemptWarning(true);
      }
    }
  };

  // Listen for custom event to open the login modal
  useEffect(() => {
    const handleOpenLogin = () => openModal();
    document.addEventListener('openLoginModal', handleOpenLogin);
    
    return () => {
      document.removeEventListener('openLoginModal', handleOpenLogin);
    };
  }, []);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isVisible && e.target.classList.contains('login-backdrop')) {
        closeModal();
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isVisible]);

  return (
    <div className={`login-backdrop ${isVisible ? 'show' : ''}`} id="loginBackdrop">
      <div className="login-card">
        <button className="login-close-btn" type="button" aria-label="Close" onClick={closeModal}>
          <span className="material-icons">close</span>
        </button>
        
        <div className="brand-logo">
          <h1>Orbisyn</h1>
        </div>
        
        <div className="login-toggle">
          <button 
            className={`toggle-btn ${loginType === 'employer' ? 'active' : ''}`} 
            onClick={() => handleLoginTypeToggle('employer')}
          >
            Employer
          </button>
          <button 
            className={`toggle-btn ${loginType === 'employee' ? 'active' : ''}`} 
            onClick={() => handleLoginTypeToggle('employee')}
          >
            Employee
          </button>
        </div>
        
        <h2 className="login-title">Please sign in</h2>
        
        <div className="security-warning">
          <div className="warning-title">
            <span className="material-icons">lock</span>
            Security Guidelines
          </div>
          <ul>
            <li>Use your official company email address</li>
            <li>Ensure you're on a secure network connection</li>
            <li>Never share your login credentials</li>
            <li>Log out completely when finished</li>
          </ul>
        </div>
        
        {errorMsg && (
          <div className="error-message">
            <span className="material-icons">error</span>
            <span>{errorMsg}</span>
          </div>
        )}
        
        {showAttemptWarning && (
          <div className="attempt-warning">
            <span className="material-icons">warning</span>
            <span>Account will be locked after 3 more failed attempts. Contact your system administrator if you need assistance.</span>
          </div>
        )}
        
        {successMsg && (
          <div className="success-message">
            <span className="material-icons">check_circle</span>
            <span>{successMsg}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="login-form-fields">
            <div className="login-input-group">
              <label htmlFor="loginField" className="login-label">
                {loginType === 'employer' ? 'Email Address' : 'Username'}
              </label>
              <input 
                type={loginType === 'employer' ? 'email' : 'text'} 
                id="loginField" 
                name="loginField" 
                className="login-input" 
                value={formData.loginField}
                onChange={handleInputChange}
                required 
              />
            </div>
            
            <div className="login-input-group">
              <label htmlFor="loginPassword" className="login-label">Password</label>
              <input 
                type={showPassword ? 'text' : 'password'} 
                id="loginPassword" 
                name="password" 
                className="login-input" 
                value={formData.password}
                onChange={handleInputChange}
                required 
              />
              <button 
                type="button" 
                className="password-toggle" 
                onClick={togglePasswordVisibility}
              >
                <span className="material-icons">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>
          
          <div className="password-guidelines">
            <div className="guideline-title">
              <span className="material-icons">info</span>
              Password Requirements:
            </div>
            <div>
              Minimum 8 characters, including uppercase, lowercase, number and special character.
            </div>
          </div>
          
          <button type="submit" className="login-submit-btn">
            <span className="material-icons">login</span>
            <span>Sign in to {loginType === 'employer' ? 'OrbiWave' : 'OrbiFlex'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
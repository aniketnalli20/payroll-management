import React, { useState, useEffect } from 'react';
import '../index.css';

function MultiStepForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    employees: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  // Calculate progress based on current step
  useEffect(() => {
    const progressPercentage = ((currentStep - 1) / 3) * 100;
    setProgress(progressPercentage);
  }, [currentStep]);

  // Function to open the form modal
  const openForm = () => {
    setIsVisible(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  // Function to close the form modal
  const closeForm = () => {
    setIsVisible(false);
    document.body.style.overflow = ''; // Re-enable scrolling
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Check if current step is valid
  const isStepValid = () => {
    if (currentStep === 1) {
      return formData.name.trim() !== '' && formData.email.trim() !== '';
    } else if (currentStep === 2) {
      return formData.company.trim() !== '' && formData.employees.trim() !== '';
    } else if (currentStep === 3) {
      return formData.phone.trim() !== '';
    }
    return false;
  };

  // Handle next button click
  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit the form
      handleSubmit();
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsComplete(true);
      
      // Reset form after some time
      setTimeout(() => {
        setIsVisible(false);
        setCurrentStep(1);
        setFormData({
          name: '',
          email: '',
          company: '',
          employees: '',
          phone: ''
        });
        setIsComplete(false);
      }, 3000);
    }, 1500);
  };

  return (
    <>
      {/* Button to open the form (can be placed anywhere) */}
      <button onClick={openForm} className="demo-btn">Open Contact Form</button>
      
      {/* Form Modal */}
      <div className={`form-backdrop ${isVisible ? 'show' : ''}`}>
        <div className="glass-card">
          <button className="close-btn" onClick={closeForm} aria-label="Close form">&times;</button>
          
          {/* Progress Bar */}
          <div className="progress-container">
            <div className="progress-bar-wrapper">
              <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="progress-steps">
              <div className={`progress-step ${currentStep >= 1 ? 'active' : ''}`} data-num="1">Info</div>
              <div className={`progress-step ${currentStep >= 2 ? 'active' : ''}`} data-num="2">Company</div>
              <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`} data-num="3">Contact</div>
            </div>
          </div>
          
          {/* Step 1: Basic Info */}
          <div className={`step-content ${currentStep === 1 ? 'active' : ''}`}>
            <h2 className="form-title">Tell us about yourself</h2>
            <p className="form-description">We'll use this information to personalize your experience.</p>
            
            <div className="form-fields">
              <div className="input-wrap">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  className="form-input" 
                  placeholder="Your name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              
              <div className="input-wrap">
                <label htmlFor="email" className="form-label">Work Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  className="form-input" 
                  placeholder="you@company.com" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required 
                />
              </div>
            </div>
          </div>
          
          {/* Step 2: Company Info */}
          <div className={`step-content ${currentStep === 2 ? 'active' : ''}`}>
            <h2 className="form-title">Company Details</h2>
            <p className="form-description">Tell us about your business needs.</p>
            
            <div className="form-fields">
              <div className="input-wrap">
                <label htmlFor="company" className="form-label">Company Name</label>
                <input 
                  type="text" 
                  id="company" 
                  name="company" 
                  className="form-input" 
                  placeholder="Your company" 
                  value={formData.company}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              
              <div className="input-wrap">
                <label htmlFor="employees" className="form-label">Number of Employees</label>
                <input 
                  type="text" 
                  id="employees" 
                  name="employees" 
                  className="form-input" 
                  placeholder="e.g. 1-50" 
                  value={formData.employees}
                  onChange={handleInputChange}
                  required 
                />
              </div>
            </div>
          </div>
          
          {/* Step 3: Contact Info */}
          <div className={`step-content ${currentStep === 3 ? 'active' : ''}`}>
            <h2 className="form-title">Contact Information</h2>
            <p className="form-description">How can our team reach you?</p>
            
            <div className="form-fields">
              <div className="input-wrap">
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  className="form-input" 
                  placeholder="Your phone number" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  required 
                />
              </div>
            </div>
          </div>
          
          {/* Thank You Message (after submission) */}
          {isComplete && (
            <div className="step-content active">
              <div className="thank-you-text">
                Thank you for your interest! Our team will contact you shortly.
              </div>
            </div>
          )}
          
          {/* Next/Submit Button */}
          {!isComplete && (
            <button 
              className="form-next-btn" 
              onClick={handleNext} 
              disabled={!isStepValid() || isSubmitting}
            >
              {isSubmitting ? (
                <div className="chaotic-orbit" style={{ '--uib-color': '#fff', '--uib-size': '20px' }}></div>
              ) : currentStep < 3 ? 'Continue' : 'Submit'}
            </button>
          )}
          
          {/* Privacy Note */}
          <p className="privacy-note">
            By submitting, you agree to our <a href="/privacy-policy.html">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </>
  );
}

export default MultiStepForm;
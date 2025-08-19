import React, { useState, useEffect } from 'react';
import '../index.css';

function MultiStepForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  // Calculate progress based on current step
  useEffect(() => {
    const progressPercentage = ((currentStep - 1) / 2) * 100;
    setProgress(progressPercentage);
  }, [currentStep]);

  // Function to open the form modal
  const openForm = () => {
    setIsVisible(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };
  
  // Listen for custom event to open form
  useEffect(() => {
    const handleOpenContactForm = () => openForm();
    document.addEventListener('openContactForm', handleOpenContactForm);
    
    return () => {
      document.removeEventListener('openContactForm', handleOpenContactForm);
    };
  }, []);

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
      return formData.phone.trim() !== '';
    }
    return false;
  };

  // Handle next button click
  const handleNext = () => {
    if (currentStep < 2) {
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
          phone: ''
        });
        setIsComplete(false);
      }, 3000);
    }, 1500);
  };

  return (
    <>
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
            <div className={`progress-step ${currentStep >= 2 ? 'active' : ''}`} data-num="2">Contact</div>
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
          
          {/* Step 2: Contact Info */}
          <div className={`step-content ${currentStep === 2 ? 'active' : ''}`}>
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
              ) : currentStep < 2 ? 'Continue' : 'Submit'}
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
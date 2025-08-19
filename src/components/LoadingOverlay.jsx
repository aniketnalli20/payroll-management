import React, { useState, useEffect } from 'react';
import '../index.css';

function LoadingOverlay({ type = 'main', message = 'Loading...', submessage = '', isVisible = false, progress = 0 }) {
  const [progressValue, setProgressValue] = useState(progress);
  
  // Simulate progress increase if progress is not provided externally
  useEffect(() => {
    let interval;
    if (isVisible && progress === 0) {
      interval = setInterval(() => {
        setProgressValue(prev => {
          const newValue = prev + Math.random() * 10;
          return newValue > 90 ? 90 : newValue; // Cap at 90% for automatic progress
        });
      }, 500);
    } else {
      setProgressValue(progress);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isVisible, progress]);
  
  if (type === 'main') {
    return (
      <div className={`main-loading-overlay ${isVisible ? 'show' : ''}`}>
        <div className="main-loading-content">
          <div className="chaotic-orbit" style={{ '--uib-size': '50px' }}></div>
          <div className="main-loading-message">{message}</div>
          {submessage && <div className="main-loading-submessage">{submessage}</div>}
          <div className="main-loading-progress">
            <div className="main-loading-progress-bar" style={{ width: `${progressValue}%` }}></div>
          </div>
        </div>
      </div>
    );
  } else if (type === 'login') {
    return (
      <div className={`login-loading-overlay ${isVisible ? 'show' : ''}`}>
        <div className="login-loading-content">
          <div className="chaotic-orbit" style={{ '--uib-size': '35px' }}></div>
          <div className="login-loading-message">{message}</div>
          {submessage && <div className="login-loading-submessage">{submessage}</div>}
          <div className="login-loading-progress">
            <div className="login-loading-progress-bar" style={{ width: `${progressValue}%` }}></div>
          </div>
        </div>
      </div>
    );
  }
  
  return null;
}

export default LoadingOverlay;
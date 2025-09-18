import React from 'react'
import './App.css'
import './index.css'
import Navbar from './components/Navbar'
import MultiStepForm from './components/MultiStepForm'
import LoadingOverlay from './components/LoadingOverlay'
import Dashboard from './components/Dashboard'

function App() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentView, setCurrentView] = React.useState('home'); // 'home' or 'dashboard'
  
  // Simulate initial loading
  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navbar />
      <LoadingOverlay 
        type="main" 
        isVisible={isLoading} 
        message="Loading your dashboard..." 
        submessage="Please wait while we prepare your experience" 
      />
      
      <main>
        {currentView === 'home' ? (
          <>
            <section className="hero-section">
              <div className="container">
                <h1>Modern Payroll & HR Management</h1>
                <p>Streamline your HR operations with our comprehensive solution</p>
                <div className="hero-actions">
                  <button 
                    className="btn-primary"
                    onClick={() => setCurrentView('dashboard')}
                  >
                    View Dashboard
                  </button>
                </div>
              </div>
            </section>
            <div className="container">
              <MultiStepForm />
            </div>
          </>
        ) : (
          <>
            <div className="dashboard-nav-header">
              <button 
                className="btn-secondary"
                onClick={() => setCurrentView('home')}
              >
                ← Back to Home
              </button>
            </div>
            <Dashboard />
          </>
        )}
      </main>
    </>
  )
}

export default App

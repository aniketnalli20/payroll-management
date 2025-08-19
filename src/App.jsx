import React from 'react'
import './App.css'
import './index.css'
import Navbar from './components/Navbar'
import MultiStepForm from './components/MultiStepForm'
import LoadingOverlay from './components/LoadingOverlay'

function App() {
  const [isLoading, setIsLoading] = React.useState(false);
  
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
      <MultiStepForm />
      <LoadingOverlay 
        type="main" 
        isVisible={isLoading} 
        message="Loading your dashboard..." 
        submessage="Please wait while we prepare your experience" 
      />
      
      <main className="container">
        <section className="hero-section">
          <h1>Modern Payroll Management</h1>
          <p>Streamline your HR & payroll operations with our comprehensive solution</p>
        </section>
      </main>
  )
}

export default App

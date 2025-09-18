import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [userType, setUserType] = useState('employee'); // 'employee' or 'employer'
  const [employeeData, setEmployeeData] = useState(null);
  const [employerData, setEmployerData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    const mockEmployeeData = {
      personalInfo: {
        name: 'John Doe',
        employeeId: 'EMP001',
        department: 'Engineering',
        position: 'Senior Developer',
        joinDate: '2022-01-15',
        email: 'john.doe@company.com'
      },
      payroll: {
        baseSalary: 75000,
        currentPay: 6250,
        ytdEarnings: 68750,
        nextPayDate: '2024-01-31',
        taxDeductions: 1250,
        benefits: 450
      },
      timeOff: {
        vacationDays: 15,
        usedVacation: 8,
        sickDays: 10,
        usedSick: 2
      }
    };

    const mockEmployerData = {
      companyInfo: {
        name: 'TechCorp Solutions',
        totalEmployees: 245,
        departments: 8,
        activeProjects: 12
      },
      payrollSummary: {
        totalPayroll: 1850000,
        monthlyPayroll: 154167,
        avgSalary: 75510,
        totalBenefits: 185000
      },
      employeeStats: {
        newHires: 12,
        departures: 3,
        promotions: 8,
        performanceReviews: 45
      },
      upcomingEvents: [
        { date: '2024-01-31', event: 'Payroll Processing' },
        { date: '2024-02-05', event: 'Benefits Enrollment Deadline' },
        { date: '2024-02-15', event: 'Performance Review Cycle' }
      ]
    };

    // Simulate API call
    setTimeout(() => {
      setEmployeeData(mockEmployeeData);
      setEmployerData(mockEmployerData);
      setLoading(false);
    }, 1000);
  }, []);

  const StatCard = ({ title, value, subtitle, icon }) => (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <h3>{title}</h3>
        <div className="stat-value">{value}</div>
        {subtitle && <div className="stat-subtitle">{subtitle}</div>}
      </div>
    </div>
  );

  const EmployeeDashboard = () => (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <h1>Employee Dashboard</h1>
        <p>Welcome back, {employeeData?.personalInfo.name}!</p>
      </div>

      <div className="dashboard-grid">
        {/* Personal Info Section */}
        <div className="dashboard-section">
          <h2>Personal Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>Employee ID:</label>
              <span>{employeeData?.personalInfo.employeeId}</span>
            </div>
            <div className="info-item">
              <label>Department:</label>
              <span>{employeeData?.personalInfo.department}</span>
            </div>
            <div className="info-item">
              <label>Position:</label>
              <span>{employeeData?.personalInfo.position}</span>
            </div>
            <div className="info-item">
              <label>Join Date:</label>
              <span>{employeeData?.personalInfo.joinDate}</span>
            </div>
          </div>
        </div>

        {/* Payroll Section */}
        <div className="dashboard-section">
          <h2>Payroll Information</h2>
          <div className="stats-grid">
            <StatCard
              title="Current Pay"
              value={`$${employeeData?.payroll.currentPay.toLocaleString()}`}
              subtitle="This period"
              icon="💰"
            />
            <StatCard
              title="YTD Earnings"
              value={`$${employeeData?.payroll.ytdEarnings.toLocaleString()}`}
              subtitle="Year to date"
              icon="📊"
            />
            <StatCard
              title="Next Pay Date"
              value={employeeData?.payroll.nextPayDate}
              subtitle="Upcoming"
              icon="📅"
            />
            <StatCard
              title="Benefits"
              value={`$${employeeData?.payroll.benefits}`}
              subtitle="Monthly"
              icon="🏥"
            />
          </div>
        </div>

        {/* Time Off Section */}
        <div className="dashboard-section">
          <h2>Time Off Balance</h2>
          <div className="time-off-grid">
            <div className="time-off-item">
              <h3>Vacation Days</h3>
              <div className="progress-bar">
                <div 
                  className="progress-fill vacation"
                  style={{ width: `${(employeeData?.timeOff.usedVacation / employeeData?.timeOff.vacationDays) * 100}%` }}
                ></div>
              </div>
              <span>{employeeData?.timeOff.usedVacation} / {employeeData?.timeOff.vacationDays} used</span>
            </div>
            <div className="time-off-item">
              <h3>Sick Days</h3>
              <div className="progress-bar">
                <div 
                  className="progress-fill sick"
                  style={{ width: `${(employeeData?.timeOff.usedSick / employeeData?.timeOff.sickDays) * 100}%` }}
                ></div>
              </div>
              <span>{employeeData?.timeOff.usedSick} / {employeeData?.timeOff.sickDays} used</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const EmployerDashboard = () => (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <h1>Employer Dashboard</h1>
        <p>Company Overview - {employerData?.companyInfo.name}</p>
      </div>

      <div className="dashboard-grid">
        {/* Company Stats */}
        <div className="dashboard-section">
          <h2>Company Overview</h2>
          <div className="stats-grid">
            <StatCard
              title="Total Employees"
              value={employerData?.companyInfo.totalEmployees}
              subtitle="Active workforce"
              icon="👥"
            />
            <StatCard
              title="Departments"
              value={employerData?.companyInfo.departments}
              subtitle="Business units"
              icon="🏢"
            />
            <StatCard
              title="Active Projects"
              value={employerData?.companyInfo.activeProjects}
              subtitle="In progress"
              icon="📋"
            />
          </div>
        </div>

        {/* Payroll Summary */}
        <div className="dashboard-section">
          <h2>Payroll Summary</h2>
          <div className="stats-grid">
            <StatCard
              title="Total Payroll"
              value={`$${(employerData?.payrollSummary.totalPayroll / 1000000).toFixed(1)}M`}
              subtitle="Annual"
              icon="💼"
            />
            <StatCard
              title="Monthly Payroll"
              value={`$${employerData?.payrollSummary.monthlyPayroll.toLocaleString()}`}
              subtitle="Current month"
              icon="📈"
            />
            <StatCard
              title="Average Salary"
              value={`$${employerData?.payrollSummary.avgSalary.toLocaleString()}`}
              subtitle="Per employee"
              icon="💵"
            />
            <StatCard
              title="Total Benefits"
              value={`$${employerData?.payrollSummary.totalBenefits.toLocaleString()}`}
              subtitle="Annual cost"
              icon="🎯"
            />
          </div>
        </div>

        {/* Employee Statistics */}
        <div className="dashboard-section">
          <h2>Employee Statistics</h2>
          <div className="stats-grid">
            <StatCard
              title="New Hires"
              value={employerData?.employeeStats.newHires}
              subtitle="This quarter"
              icon="🆕"
            />
            <StatCard
              title="Departures"
              value={employerData?.employeeStats.departures}
              subtitle="This quarter"
              icon="👋"
            />
            <StatCard
              title="Promotions"
              value={employerData?.employeeStats.promotions}
              subtitle="This quarter"
              icon="⬆️"
            />
            <StatCard
              title="Reviews Due"
              value={employerData?.employeeStats.performanceReviews}
              subtitle="Pending"
              icon="📝"
            />
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="dashboard-section">
          <h2>Upcoming Events</h2>
          <div className="events-list">
            {employerData?.upcomingEvents.map((event, index) => (
              <div key={index} className="event-item">
                <div className="event-date">{event.date}</div>
                <div className="event-name">{event.event}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-nav">
        <button 
          className={`nav-btn ${userType === 'employee' ? 'active' : ''}`}
          onClick={() => setUserType('employee')}
        >
          Employee View
        </button>
        <button 
          className={`nav-btn ${userType === 'employer' ? 'active' : ''}`}
          onClick={() => setUserType('employer')}
        >
          Employer View
        </button>
      </div>

      {userType === 'employee' ? <EmployeeDashboard /> : <EmployerDashboard />}
    </div>
  );
};

export default Dashboard;
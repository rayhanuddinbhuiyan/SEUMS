import './App.css'
import { useState } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import StudentDashboard from './pages/StudentDashboard'

function App() {
  // currentPage: 'login' | 'register' | 'student' | 'teacher' | 'coordinator' | 'admin'
  const [currentPage, setCurrentPage] = useState('login')
  const [userData, setUserData] = useState({})

  // Called by both Login and Register after successful auth
  const handleAuth = (role, data = {}) => {
    setUserData(data)
    setCurrentPage(role) // role === 'student' | 'teacher' | etc.
  }

  if (currentPage === 'student')
    return <StudentDashboard
      enrollment={userData.enrollment}
      fullName={userData.fullName}
      email={userData.email}
      department={userData.department}
      onLogout={() => setCurrentPage('login')}
    />

  // Placeholder for roles that don't have a dedicated dashboard yet
  if (['teacher', 'coordinator', 'admin'].includes(currentPage))
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f4f6f9', fontFamily: 'inherit' }}>
        <div style={{ background: '#fff', borderRadius: 16, padding: '48px 40px', boxShadow: '0 4px 24px rgba(26,46,90,0.10)', textAlign: 'center', maxWidth: 400 }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#eef1f8', border: '3px solid #c8d0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1a2e5a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3.27 1.82 8.73 1.82 12 0v-5" />
            </svg>
          </div>
          <h2 style={{ color: '#1a2e5a', fontSize: 22, fontWeight: 800, marginBottom: 8 }}>
            Welcome, {userData.fullName || currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}!
          </h2>
          <p style={{ color: '#777', fontSize: 14, marginBottom: 6 }}>Role: <strong style={{ color: '#1a2e5a' }}>{currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}</strong></p>
          {userData.department && <p style={{ color: '#777', fontSize: 14, marginBottom: 24 }}>Department: <strong style={{ color: '#1a2e5a' }}>{userData.department}</strong></p>}
          <p style={{ color: '#aaa', fontSize: 13, marginBottom: 28 }}>
            Your dashboard is coming soon. Stay tuned!
          </p>
          <button
            onClick={() => setCurrentPage('login')}
            style={{ background: '#1a2e5a', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}
          >
            Logout
          </button>
        </div>
      </div>
    )

  if (currentPage === 'register')
    return <Register onNavigateLogin={() => setCurrentPage('login')} onRegister={handleAuth} />

  return <Login onLogin={handleAuth} onNavigateRegister={() => setCurrentPage('register')} />
}

export default App


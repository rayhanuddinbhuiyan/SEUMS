import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';

// Auth
import Login        from './pages/auth/Login';
import Register     from './pages/auth/Register';

// Student
import StudentDashboard from './pages/student/StudentDashboard';
import TodaysLecture    from './pages/student/TodaysLecture';
import Attendance       from './pages/student/Attendance';
import Syllabus         from './pages/student/Syllabus';
import Timetable        from './pages/student/Timetable';
import Faculties        from './pages/student/Faculties';
import Exams            from './pages/student/Exams';
import Results          from './pages/student/Results';
import Fees             from './pages/student/Fees';
import AttendRequest    from './pages/student/AttendRequest';
import DownloadIDCard   from './pages/student/DownloadIDCard';

// Teacher
import TeacherDashboard from './pages/teacher/TeacherDashboard';

// Simple protected route — redirects to /login if no session
function Protected({ children, role }) {
    const user = JSON.parse(localStorage.getItem("seu_current_user") || "null");
    if (!user) return <Navigate to="/login" replace />;
    if (role && user.role !== role) return <Navigate to="/login" replace />;
    return children;
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Default */}
                <Route path="/" element={<Navigate to="/login" replace />} />

                {/* Auth */}
                <Route path="/login"    element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Student routes */}
                <Route path="/student-dashboard"   element={<Protected role="student"><StudentDashboard /></Protected>} />
                <Route path="/student/lecture"     element={<Protected role="student"><TodaysLecture /></Protected>} />
                <Route path="/student/attendance"  element={<Protected role="student"><Attendance /></Protected>} />
                <Route path="/student/syllabus"    element={<Protected role="student"><Syllabus /></Protected>} />
                <Route path="/student/timetable"   element={<Protected role="student"><Timetable /></Protected>} />
                <Route path="/student/faculties"   element={<Protected role="student"><Faculties /></Protected>} />
                <Route path="/student/exams"       element={<Protected role="student"><Exams /></Protected>} />
                <Route path="/student/results"     element={<Protected role="student"><Results /></Protected>} />
                <Route path="/student/fees"        element={<Protected role="student"><Fees /></Protected>} />
                <Route path="/student/request"     element={<Protected role="student"><AttendRequest /></Protected>} />
                <Route path="/student/id-card"     element={<Protected role="student"><DownloadIDCard /></Protected>} />

                {/* Teacher routes */}
                <Route path="/teacher-dashboard"   element={<Protected role="teacher"><TeacherDashboard /></Protected>} />

                {/* Catch-all */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

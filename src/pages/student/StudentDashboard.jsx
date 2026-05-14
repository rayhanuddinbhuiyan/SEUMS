import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentDashboard.css";

// Feature menu cards with their routes
const menuItems = [
    { icon: "📋", label: "Today's Lecture",  route: "/student/lecture" },
    { icon: "📊", label: "Attendance Inc.",  route: "/student/attendance" },
    { icon: "📚", label: "Syllabus",         route: "/student/syllabus" },
    { icon: "🗓️", label: "Time table",      route: "/student/timetable" },
    { icon: "👨‍🏫", label: "Faculties",      route: "/student/faculties" },
    { icon: "📝", label: "Exams",            route: "/student/exams" },
    { icon: "📈", label: "Results",          route: "/student/results" },
    { icon: "💳", label: "Fees",             route: "/student/fees" },
    { icon: "✅", label: "Attendance",       route: "/student/attendance" },
    { icon: "📨", label: "Attend. request",  route: "/student/request" },
    { icon: "🪪", label: "Download ID-Card", route: "/student/id-card" },
];

const ROLL_NAMES = {
    1: "Arif Hossain", 2: "Nadia Sultana", 3: "Karim Molla",
    4: "Sumi Akter", 5: "Rafiq Ahmed", 6: "Puja Saha",
    7: "Mahbub Alam", 8: "Tania Begum", 9: "Shakil Khan",
    10: "Rupa Roy", 11: "Imran Hossen", 12: "Mitu Das",
    13: "Farhan Reza", 14: "Lipi Mondal", 15: "Sumon Barua",
    16: "Bristy Paul", 17: "Nazmul Huda", 18: "Shanta Islam",
    19: "Ashik Mahmud", 20: "Priya Ghosh", 21: "Rubel Mia",
    22: "Mousumi Khatun", 23: "Tanvir Chowdhury", 24: "Rima Biswas",
    25: "Sabbir Rahman", 26: "Nusrat Jahan", 27: "Sajib Sarkar",
    28: "Laboni Dey", 29: "Hasnat Karim", 30: "Rayhan Uddin",
    31: "Bidhan Deb", 32: "Monjurul Islam", 33: "Urmi Dutta",
    34: "Arman Ali", 35: "Trishna Sen", 36: "Zahid Hasan",
    37: "Bristy Chakraborty", 38: "Milon Talukder", 39: "Sonia Akter",
    40: "Rashed Iqbal", 41: "Champa Begum", 42: "Shohag Mridha",
    43: "Keya Halder", 44: "Touhid Parvez", 45: "Dipti Nath",
    46: "Bayezid Bostami", 47: "Mita Podder", 48: "Enamul Haq",
    49: "Suchona Roy", 50: "Iftekhar Jaman", 51: "Tamanna Binte",
    52: "Sadman Sakib", 53: "Fariha Tasnim", 54: "Mehedi Hasan",
    55: "Sharmin Sultana", 56: "Rakibul Hasan", 57: "Nasrin Akhter",
    58: "Asaduzzaman", 59: "Kohinoor Begum", 60: "Shahin Alam",
    61: "Mukta Rani", 62: "Delwar Hossain", 63: "Sabina Yasmin",
    64: "Kamrul Islam", 65: "Josna Khatun", 66: "Monir Hossain",
    67: "Shahida Parvin", 68: "Belal Uddin", 69: "Rumana Akter",
    70: "Golam Mustafa", 71: "Afsana Mimi", 72: "Shafiqul Islam",
    73: "Lubna Nahar", 74: "Mizanur Rahman", 75: "Tahmina Begum",
    76: "Habibur Rahman", 77: "Selina Khanam", 78: "Jahangir Alam",
    79: "Fatema Khatun", 80: "Mamunur Rashid", 81: "Shirin Akhter",
    82: "Abdur Rahim", 83: "Morsheda Begum", 84: "Nurul Islam",
    85: "Hasina Begum", 86: "Sirajul Islam", 87: "Amena Khatun",
    88: "Liton Chandra", 89: "Roksana Begum", 90: "Mahabub Hossain",
    91: "Anjuara Khatun", 92: "Jobayer Ahmed", 93: "Naznin Akter",
    94: "Shahadat Hossain", 95: "Halima Khatun", 96: "Sumaiya Islam",
    97: "Torikul Islam", 98: "Marium Begum", 99: "Anisur Rahman",
};

const getStudentInfo = (user = {}) => {
    const enrollment = user.enrollment || "2023100010001";
    const roll = parseInt(enrollment.slice(11), 10);
    const name = user.fullName || ROLL_NAMES[roll] || `Student ${String(roll).padStart(2, "0")}`;
    const admissionYear = parseInt(enrollment.slice(0, 4), 10);
    const batchYear = admissionYear - 2000;
    const sem = parseInt(enrollment.slice(7, 10), 10) || 1;
    return {
        rollNo: roll,
        name,
        enrollment,
        department: user.department || "CSE",
        batch: batchYear,
        sem,
        email: user.email || `${enrollment}@seu.edu.bd`,
    };
};

const StudentDashboard = () => {
    const navigate = useNavigate();
    // Read session from localStorage (persists on refresh)
    const raw = JSON.parse(localStorage.getItem("seu_current_user") || "{}");
    const student = getStudentInfo(raw);

    const handleLogout = () => {
        localStorage.removeItem("seu_current_user");
        navigate("/login");
    };

    return (
        <div className="sd-page">

            {/* ── Top App Bar ─────────────────────────── */}
            <div className="sd-topbar">
                <div className="sd-topbar-left">
                    <div className="sd-avatar">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                            stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="8" r="4" />
                            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                        </svg>
                    </div>
                    <span className="sd-campus">Southeast University</span>
                </div>
                <button className="sd-bell" title="Notifications">🔔</button>
            </div>

            {/* ── Student Info Strip ───────────────────── */}
            <div className="sd-info-strip">
                <p className="sd-full-name">{student.name}</p>
                <p className="sd-enrollment">{student.enrollment}</p>
                <p className="sd-email">{student.email}</p>
                <div className="sd-meta">
                    <span><strong>Department</strong><br />{student.department}</span>
                    <span><strong>Batch</strong><br />{student.batch}</span>
                    <span><strong>Semester</strong><br />{student.sem}</span>
                    <span><strong>Roll No.</strong><br />{student.rollNo}</span>
                </div>
            </div>

            {/* ── Feature Grid ─────────────────────────── */}
            <div className="sd-grid">
                {menuItems.map((item) => (
                    <button
                        key={item.label}
                        className="sd-card"
                        onClick={() => navigate(item.route)}
                    >
                        <span className="sd-card-icon">{item.icon}</span>
                        <span className="sd-card-label">{item.label}</span>
                    </button>
                ))}
            </div>

            {/* ── Footer ───────────────────────────────── */}
            <div className="sd-footer">
                <span>App Version 5.83</span>
                <button className="sd-logout" onClick={handleLogout}>Logout</button>
            </div>

        </div>
    );
};

export default StudentDashboard;

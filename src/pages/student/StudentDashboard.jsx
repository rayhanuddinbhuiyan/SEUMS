import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import presenterIcon from "../../assets/icons/presenter.png";
import calendarIcon from "../../assets/icons/calendar.png";
import syllabusIcon from "../../assets/icons/stack-of-books.png";
import clockIcon from "../../assets/icons/clock.png";
import teacherIcon from "../../assets/icons/teacher.png";
import examIcon from "../../assets/icons/exam.png";
import feesIcon from "../../assets/icons/tuition-fees.png";
import markIcon from "../../assets/icons/good-mark.png";
import receptionistIcon from "../../assets/icons/receptionist.gif";
import idCardIcon from "../../assets/icons/id-card.gif";
import "./StudentDashboard.css";

// Feature menu cards with their routes
const menuItems = [
    { icon: presenterIcon, label: "Today's Lecture",  route: "/student/lecture" },
    { icon: calendarIcon, label: "Attendance Inc.",  route: "/student/attendance" },
    { icon: syllabusIcon, label: "Syllabus",         route: "/student/syllabus" },
    { icon: clockIcon, label: "Time table",      route: "/student/timetable" },
    { icon: teacherIcon, label: "Faculties",      route: "/student/faculties" },
    { icon: examIcon, label: "Exams",            route: "/student/exams" },
    { icon: markIcon, label: "Results",          route: "/student/results" },
    { icon: feesIcon, label: "Fees",             route: "/student/fees" },
    { icon: calendarIcon, label: "Attendance",       route: "/student/attendance" },
    { icon: receptionistIcon, label: "Attend. request",  route: "/student/request" },
    { icon: idCardIcon, label: "Download ID-Card", route: "/student/id-card" },
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

const formatDate = (isoString) => {
    try {
        const diff = Date.now() - new Date(isoString).getTime();
        const mins = Math.floor(diff / 60000);
        if (mins < 60) return mins <= 1 ? "Just now" : `${mins} mins ago`;
        const hours = Math.floor(mins / 60);
        if (hours < 24) return `${hours} hours ago`;
        const days = Math.floor(hours / 24);
        if (days === 1) return "Yesterday";
        return new Date(isoString).toLocaleDateString("en-US", { month: "short", day: "numeric" });
    } catch {
        return "Recent";
    }
};

const StudentDashboard = () => {
    const navigate = useNavigate();
    // Read session from localStorage (persists on refresh)
    const raw = JSON.parse(localStorage.getItem("seu_current_user") || "{}");
    const student = getStudentInfo(raw);

    const [announcements, setAnnouncements] = useState([]);
    const [selectedAnn, setSelectedAnn] = useState(null);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("seu_announcements") || "[]");
        // Sort by date descending
        const sorted = stored.sort((a, b) => new Date(b.date) - new Date(a.date));
        setAnnouncements(sorted);
    }, []);

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
                <button className="sd-bell" title="Notifications" onClick={() => {
                    if (announcements.length > 0) {
                        setSelectedAnn(announcements[0]);
                    }
                }}>🔔</button>
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

            {/* ── Announcements Widget ─────────────────── */}
            {announcements.length > 0 && (
                <div className="sd-announcements-widget">
                    <div className="sd-ann-header">
                        <h3>📢 Recent Announcements</h3>
                        <span className="sd-ann-pulse"></span>
                    </div>
                    <div className="sd-ann-list">
                        {announcements.map((ann) => {
                            const isImportant = ann.tag === "Exam" || ann.tag === "Assignment";
                            return (
                                <div 
                                    key={ann.id} 
                                    className={`sd-ann-item ${isImportant ? "important" : ""}`}
                                    onClick={() => setSelectedAnn(ann)}
                                >
                                    <div className="sd-ann-item-meta">
                                        <span className={`sd-ann-tag tag-${ann.tag.toLowerCase()}`}>{ann.tag}</span>
                                        <span className="sd-ann-course">{ann.courseCode}</span>
                                        <span className="sd-ann-date">{formatDate(ann.date)}</span>
                                    </div>
                                    <p className="sd-ann-title">{ann.title}</p>
                                    <p className="sd-ann-preview">{ann.content}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* ── Feature Grid ─────────────────────────── */}
            <div className="sd-grid">
                {menuItems.map((item) => (
                    <button
                        key={item.label}
                        className="sd-card"
                        onClick={() => navigate(item.route)}
                    >
                        <span className="sd-card-icon">
                            {typeof item.icon === "string" && item.icon.length <= 2 ? (
                                item.icon
                            ) : (
                                <img src={item.icon} alt={item.label} className="sd-icon-img" />
                            )}
                        </span>
                        <span className="sd-card-label">{item.label}</span>
                    </button>
                ))}
            </div>

            {/* ── Announcement Detail Modal ────────────── */}
            {selectedAnn && (
                <div className="sd-modal-backdrop" onClick={() => setSelectedAnn(null)}>
                    <div className="sd-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="sd-modal-close" onClick={() => setSelectedAnn(null)}>✕</button>
                        <div className="sd-modal-header">
                            <span className={`sd-modal-tag tag-${selectedAnn.tag.toLowerCase()}`}>{selectedAnn.tag}</span>
                            <span className="sd-modal-course">{selectedAnn.courseCode} • {selectedAnn.courseName}</span>
                        </div>
                        <h2 className="sd-modal-title">{selectedAnn.title}</h2>
                        <div className="sd-modal-author">
                            <span className="sd-author-icon">👤</span>
                            <div>
                                <p className="sd-author-name">{selectedAnn.postedBy}</p>
                                <p className="sd-author-date">{new Date(selectedAnn.date).toLocaleString("en-US", { 
                                    weekday: 'long', 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}</p>
                            </div>
                        </div>
                        <div className="sd-modal-body">
                            <p>{selectedAnn.content}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Footer ───────────────────────────────── */}
            <div className="sd-footer">
                <span>App Version 5.83</span>
                <button className="sd-logout" onClick={handleLogout}>Logout</button>
            </div>

        </div>
    );
};

export default StudentDashboard;

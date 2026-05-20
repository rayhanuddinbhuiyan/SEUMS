import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AcademicBackground from "./AcademicBackground";
import "./Login.css";

const FIXED_PREFIX = "20231000100";

const validateStudentEnrollment = (value) => {
    if (value.length !== 13) return false;
    if (!value.startsWith(FIXED_PREFIX)) return false;
    const suffix = parseInt(value.slice(11), 10);
    return suffix >= 1 && suffix <= 99;
};

const Login = () => {
    const navigate = useNavigate();
    const [enrollment, setEnrollment] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");


    useEffect(() => {
        // Seed default materials if empty
        if (!localStorage.getItem("seu_materials")) {
            const defaultMaterials = [
                {
                    id: "mat-1",
                    courseCode: "CSE-301",
                    courseName: "Computer Networks",
                    title: "Introduction to TCP/IP Protocols",
                    type: "PDF",
                    size: "2.4 MB",
                    date: "2026-05-15T09:00:00.000Z",
                    description: "Overview of TCP/IP layering model, IP addressing basics, and port routing rules.",
                    downloadUrl: "#",
                    teacherName: "Dr. Rayhan Uddin"
                },
                {
                    id: "mat-2",
                    courseCode: "CSE-301",
                    courseName: "Computer Networks",
                    title: "Subnetting & IP Addressing Guide",
                    type: "Slide",
                    size: "4.1 MB",
                    date: "2026-05-18T14:30:00.000Z",
                    description: "Interactive slides detailing Classless Inter-Domain Routing (CIDR) and Variable Length Subnet Masking (VLSM).",
                    downloadUrl: "#",
                    teacherName: "Dr. Rayhan Uddin"
                },
                {
                    id: "mat-3",
                    courseCode: "CSE-205",
                    courseName: "Data Structures",
                    title: "Binary Search Tree Visuals",
                    type: "Video",
                    size: "18.5 MB",
                    date: "2026-05-10T11:00:00.000Z",
                    description: "Recorded lecture video explaining insertion, deletion, and rotation operations on Binary Search Trees (BST).",
                    downloadUrl: "#",
                    teacherName: "Prof. H. Rahman"
                },
                {
                    id: "mat-4",
                    courseCode: "CSE-303",
                    courseName: "Database Systems",
                    title: "SQL Query Exercises & Solutions",
                    type: "Zip",
                    size: "1.2 MB",
                    date: "2026-05-12T10:15:00.000Z",
                    description: "Lab sheet containing complex SQL queries, JOIN operations, subqueries, and their sample relational model tables.",
                    downloadUrl: "#",
                    teacherName: "Faculty Member"
                }
            ];
            localStorage.setItem("seu_materials", JSON.stringify(defaultMaterials));
        }

        // Seed default announcements if empty
        if (!localStorage.getItem("seu_announcements")) {
            const defaultAnnouncements = [
                {
                    id: "ann-1",
                    courseCode: "CSE-301",
                    courseName: "Computer Networks",
                    title: "Mid-Term Exam Syllabus Update",
                    content: "The mid-term exam will cover Chapters 1 to 4. Please study VLSM and subnetting calculation exercises deeply. The exam is scheduled for next Monday at Room 402.",
                    tag: "Exam",
                    date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
                    postedBy: "Dr. Rayhan Uddin"
                },
                {
                    id: "ann-2",
                    courseCode: "CSE-205",
                    courseName: "Data Structures",
                    title: "Assignment 2 Submission Deadline",
                    content: "Please submit your AVL Tree implementation by Friday midnight. Make sure to upload both the code files (.cpp/.java) and a brief design report in PDF format.",
                    tag: "Assignment",
                    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
                    postedBy: "Prof. H. Rahman"
                },
                {
                    id: "ann-3",
                    courseCode: "General",
                    courseName: "All Departments",
                    title: "Southeast University Cultural Fest 2026",
                    content: "Join us for the annual SEU Cultural Fest starting this Thursday at the Main Campus Auditorium. Features include student performances, technical project showcases, and food stalls!",
                    tag: "General",
                    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
                    postedBy: "Admin Office"
                }
            ];
            localStorage.setItem("seu_announcements", JSON.stringify(defaultAnnouncements));
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        setError("");

        if (!enrollment || !password) {
            setError("Please enter both Enrollment Number and Password.");
            return;
        }

        const users = JSON.parse(localStorage.getItem("seu_users") || "[]");
        const found = users.find(
            (u) => u.enrollment.toLowerCase() === enrollment.toLowerCase()
        );
        if (found) {
            if (found.password !== password) {
                setError("Incorrect password. Please try again.");
                return;
            }
            localStorage.setItem("seu_current_user", JSON.stringify({
                enrollment: found.enrollment,
                fullName: found.fullName,
                email: found.email,
                department: found.department,
                role: found.role.toLowerCase(),
            }));
            const role = found.role.toLowerCase();
            if (role === "student") navigate("/student-dashboard");
            else if (role === "teacher") navigate("/teacher-dashboard");
            else if (role === "coordinator") navigate("/coordinator-dashboard");
            else if (role === "admin") navigate("/admin-dashboard");
            return;
        }

        if (validateStudentEnrollment(enrollment)) {
            localStorage.setItem("seu_current_user", JSON.stringify({
                enrollment, fullName: "", email: "", department: "CSE", role: "student",
            }));
            navigate("/student-dashboard");
            return;
        }

        setError("Enrollment / ID not found. Please register first.");
    };

    return (
        <div className="login-page">
            <AcademicBackground />
            <div className="campus-page-bg">
                <svg viewBox="0 0 200 60" className="campus-vector campus-vector-bg" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="10" y1="50" x2="190" y2="50" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" />
                    <g className="campus-vector-building">
                        <line x1="85" y1="9" x2="85" y2="15" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.8" />
                        <line x1="115" y1="9" x2="115" y2="15" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.8" />
                        <rect x="58" y="0" width="84" height="9" rx="1.5" fill="rgba(15, 23, 42, 0.9)" stroke="rgba(14, 165, 233, 0.4)" strokeWidth="0.75" className="campus-signboard-rect" />
                        <text x="100" y="6.5" fill="#38bdf8" fontSize="4.6" fontWeight="800" fontFamily="'Outfit', 'Inter', sans-serif" textAnchor="middle" letterSpacing="0.2" className="campus-signboard-text">SOUTHEAST UNIVERSITY</text>
                        <rect x="65" y="48" width="70" height="2" fill="rgba(255, 255, 255, 0.4)" />
                        <rect x="70" y="46" width="60" height="2" fill="rgba(255, 255, 255, 0.4)" />
                        <rect x="75" y="26" width="4" height="20" fill="rgba(255, 255, 255, 0.3)" />
                        <rect x="85" y="26" width="4" height="20" fill="rgba(255, 255, 255, 0.3)" />
                        <rect x="95" y="26" width="4" height="20" fill="rgba(255, 255, 255, 0.3)" />
                        <rect x="105" y="26" width="4" height="20" fill="rgba(255, 255, 255, 0.3)" />
                        <rect x="115" y="26" width="4" height="20" fill="rgba(255, 255, 255, 0.3)" />
                        <rect x="125" y="26" width="4" height="20" fill="rgba(255, 255, 255, 0.3)" />
                        <rect x="72" y="22" width="56" height="4" fill="rgba(255, 255, 255, 0.4)" />
                        <polygon points="72,22 100,8 128,22" fill="rgba(255, 255, 255, 0.15)" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1" />
                        <circle cx="100" cy="16" r="2.5" fill="rgba(255, 255, 255, 0.6)" />
                        <path d="M40,48 L40,32 L72,32 L72,48 Z" fill="rgba(255, 255, 255, 0.1)" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
                        <path d="M128,48 L128,32 L160,32 L160,48 Z" fill="rgba(255, 255, 255, 0.1)" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
                        <rect x="46" y="36" width="5" height="8" rx="1" fill="rgba(255, 255, 255, 0.2)" />
                        <rect x="56" y="36" width="5" height="8" rx="1" fill="rgba(255, 255, 255, 0.2)" />
                        <rect x="139" y="36" width="5" height="8" rx="1" fill="rgba(255, 255, 255, 0.2)" />
                        <rect x="149" y="36" width="5" height="8" rx="1" fill="rgba(255, 255, 255, 0.2)" />
                    </g>
                    <path d="M 22 48 L 22 40" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1.5" />
                    <circle cx="22" cy="35" r="7" fill="rgba(167, 139, 250, 0.15)" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1" />
                    <circle cx="18" cy="33" r="4" fill="rgba(167, 139, 250, 0.1)" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.8" />
                    <path d="M 178 48 L 178 40" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1.5" />
                    <circle cx="178" cy="35" r="7" fill="rgba(167, 139, 250, 0.15)" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1" />
                    <circle cx="182" cy="33" r="4" fill="rgba(167, 139, 250, 0.1)" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.8" />
                </svg>
            </div>
            <div className="glass-card">
                <div className="login-brand">
                    <div className="campus-divider-section">
                        <svg viewBox="0 0 200 60" className="campus-vector" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="10" y1="50" x2="190" y2="50" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" />
                            <g className="campus-vector-building">
                                <line x1="85" y1="9" x2="85" y2="15" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.8" />
                                <line x1="115" y1="9" x2="115" y2="15" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.8" />
                                <rect x="58" y="0" width="84" height="9" rx="1.5" fill="rgba(15, 23, 42, 0.9)" stroke="rgba(14, 165, 233, 0.4)" strokeWidth="0.75" className="campus-signboard-rect" />
                                <text x="100" y="6.5" fill="#38bdf8" fontSize="4.6" fontWeight="800" fontFamily="'Outfit', 'Inter', sans-serif" textAnchor="middle" letterSpacing="0.2" className="campus-signboard-text">SOUTHEAST UNIVERSITY</text>
                                <rect x="65" y="48" width="70" height="2" fill="rgba(255, 255, 255, 0.4)" />
                                <rect x="70" y="46" width="60" height="2" fill="rgba(255, 255, 255, 0.4)" />
                                <rect x="75" y="26" width="4" height="20" fill="rgba(255, 255, 255, 0.3)" />
                                <rect x="85" y="26" width="4" height="20" fill="rgba(255, 255, 255, 0.3)" />
                                <rect x="95" y="26" width="4" height="20" fill="rgba(255, 255, 255, 0.3)" />
                                <rect x="105" y="26" width="4" height="20" fill="rgba(255, 255, 255, 0.3)" />
                                <rect x="115" y="26" width="4" height="20" fill="rgba(255, 255, 255, 0.3)" />
                                <rect x="125" y="26" width="4" height="20" fill="rgba(255, 255, 255, 0.3)" />
                                <rect x="72" y="22" width="56" height="4" fill="rgba(255, 255, 255, 0.4)" />
                                <polygon points="72,22 100,8 128,22" fill="rgba(255, 255, 255, 0.15)" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1" />
                                <circle cx="100" cy="16" r="2.5" fill="rgba(255, 255, 255, 0.6)" />
                                <path d="M40,48 L40,32 L72,32 L72,48 Z" fill="rgba(255, 255, 255, 0.1)" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
                                <path d="M128,48 L128,32 L160,32 L160,48 Z" fill="rgba(255, 255, 255, 0.1)" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
                                <rect x="46" y="36" width="5" height="8" rx="1" fill="rgba(255, 255, 255, 0.2)" />
                                <rect x="56" y="36" width="5" height="8" rx="1" fill="rgba(255, 255, 255, 0.2)" />
                                <rect x="139" y="36" width="5" height="8" rx="1" fill="rgba(255, 255, 255, 0.2)" />
                                <rect x="149" y="36" width="5" height="8" rx="1" fill="rgba(255, 255, 255, 0.2)" />
                            </g>
                            <path d="M 22 48 L 22 40" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1.5" />
                            <circle cx="22" cy="35" r="7" fill="rgba(167, 139, 250, 0.15)" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1" />
                            <circle cx="18" cy="33" r="4" fill="rgba(167, 139, 250, 0.1)" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.8" />
                            <path d="M 178 48 L 178 40" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1.5" />
                            <circle cx="178" cy="35" r="7" fill="rgba(167, 139, 250, 0.15)" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1" />
                            <circle cx="182" cy="33" r="4" fill="rgba(167, 139, 250, 0.1)" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.8" />
                        </svg>
                    </div>
                    <h1>SEUMS</h1>
                    <p className="tagline">Sign in to your account</p>
                </div>

                <form onSubmit={handleLogin} className="login-form">
                    <div className="field-group">
                        <label className="field-label">Enrollment Number</label>
                        <div className={`input-row ${error && enrollment.length > 0 && !validateStudentEnrollment(enrollment) ? "input-error" : ""}`}>
                            <span className="input-icon">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="5" width="20" height="14" rx="2" />
                                    <circle cx="9" cy="12" r="2" />
                                    <path d="M13 10h4M13 14h4" />
                                </svg>
                            </span>
                            <input
                                type="text"
                                placeholder="e.g. 2023100010030 or T-101"
                                value={enrollment}
                                maxLength={20}
                                onChange={(e) => { setError(""); setEnrollment(e.target.value); }}
                                required
                            />
                        </div>
                    </div>

                    <div className="field-group">
                        <label className="field-label">Password</label>
                        <div className="input-row">
                            <span className="input-icon">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="11" width="18" height="11" rx="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                            </span>
                            <input
                                type="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => { setError(""); setPassword(e.target.value); }}
                                required
                            />
                        </div>
                    </div>

                    {error && <p className="login-error">{error}</p>}

                    <label className="remember-row">
                        <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                        <span>Remember Me</span>
                    </label>

                    <button type="submit" className="login-btn">Sign In</button>
                </form>

                <div className="role-tags">
                    <span className="role-tag">Student</span>
                    <span className="role-tag">Teacher</span>
                    <span className="role-tag">Coordinator</span>
                    <span className="role-tag">Admin</span>
                </div>

                <p className="reg-link-text">
                    Don&apos;t have an account?{" "}
                    <Link to="/register">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;

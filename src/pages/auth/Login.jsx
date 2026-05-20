import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import seuLogo from "../../assets/icons/SEU_LOGO.png";
import GalaxyBackground from "./GalaxyBackground";
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
            <GalaxyBackground />
            <div className="glass-card">
                <div className="login-brand">
                    <div className="login-logo">
                        <img src={seuLogo} alt="SEU Logo" />
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

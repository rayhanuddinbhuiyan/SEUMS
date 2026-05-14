import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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

    const handleLogin = (e) => {
        e.preventDefault();
        setError("");

        if (!enrollment || !password) {
            setError("Please enter both Enrollment Number and Password.");
            return;
        }

        // 1️⃣ Check registered users in localStorage
        const users = JSON.parse(localStorage.getItem("seu_users") || "[]");
        const found = users.find(
            (u) => u.enrollment.toLowerCase() === enrollment.toLowerCase()
        );
        if (found) {
            if (found.password !== password) {
                setError("Incorrect password. Please try again.");
                return;
            }
            // Save current user session
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

        // 2️⃣ Fallback: hardcoded student pattern
        if (validateStudentEnrollment(enrollment)) {
            localStorage.setItem("seu_current_user", JSON.stringify({
                enrollment, fullName: "", email: "", department: "CSE", role: "student",
            }));
            navigate("/student-dashboard");
            return;
        }

        setError("Enrollment / ID not found. Please register first, or check your credentials.");
    };

    return (
        <div className="login-page">

            {/* ── LEFT PANEL ── */}
            <div className="login-left">
                <div className="login-left-overlay" />
                <div className="login-brand">
                    <div className="login-logo">
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
                            stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                            <path d="M6 12v5c3.27 1.82 8.73 1.82 12 0v-5" />
                        </svg>
                    </div>
                    <h1>SEUManage</h1>
                    <p className="tagline">University Management System</p>
                    <p className="desc">
                        Your all-in-one platform for students, teachers,
                        coordinators and administrators.
                    </p>
                </div>
            </div>

            {/* ── RIGHT PANEL ── */}
            <div className="login-right">
                <div className="login-form-box">
                    <h2>Login for all</h2>
                    <p className="form-sub">Sign in to your account to continue</p>

                    <form onSubmit={handleLogin} className="login-form">

                        {/* Enrollment */}
                        <div className="field-group">
                            <label className="field-label">Enrollment Number</label>
                            <div className={`input-row ${error && enrollment.length > 0 && !validateStudentEnrollment(enrollment) ? "input-error" : ""}`}>
                                <span className="input-icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                        stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                                {enrollment.length > 0 && (
                                    <span className="char-count">{enrollment.length} chars</span>
                                )}
                            </div>
                        </div>

                        {/* Password */}
                        <div className="field-group">
                            <label className="field-label">Password</label>
                            <div className="input-row">
                                <span className="input-icon">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                                        stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

                        <button type="submit" className="login-btn">Login</button>
                    </form>

                    <div className="enrollment-hint">
                        <span>💡 Student enrollment: <strong>20231000100</strong> + 01–99</span>
                    </div>

                    <div className="role-tags">
                        <span className="role-tag">Student</span>
                        <span className="role-tag">Teacher</span>
                        <span className="role-tag">Coordinator</span>
                        <span className="role-tag">Admin</span>
                    </div>

                    <p style={{ textAlign: "center", marginTop: "20px", fontSize: "clamp(12px,1vw,14px)", color: "#777" }}>
                        Don&apos;t have an account?{" "}
                        <Link to="/register" style={{ color: "#1a2e5a", fontWeight: 700, textDecoration: "underline" }}>
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;

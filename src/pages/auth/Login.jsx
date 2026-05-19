import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import seuLogo from "../../assets/icons/SEU_____________________________logo.png";
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

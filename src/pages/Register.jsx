import { useState } from "react";
import "./Register.css";

const ROLES = ["Student", "Teacher", "Coordinator", "Admin"];

const DEPARTMENTS = ["CSE", "EEE", "BBA", "English", "Law", "Pharmacy", "Civil Engineering"];

const Register = ({ onNavigateLogin, onRegister }) => {
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        enrollment: "",
        role: "Student",
        department: "CSE",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const update = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: "" }));
    };

    const validate = () => {
        const e = {};
        if (!form.fullName.trim()) e.fullName = "Full name is required.";
        if (!form.email.trim()) {
            e.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            e.email = "Enter a valid email address.";
        }
        if (!form.enrollment.trim()) {
            e.enrollment = "Enrollment / ID is required.";
        }
        if (!form.password) {
            e.password = "Password is required.";
        } else if (form.password.length < 6) {
            e.password = "Password must be at least 6 characters.";
        }
        if (!form.confirmPassword) {
            e.confirmPassword = "Please confirm your password.";
        } else if (form.password !== form.confirmPassword) {
            e.confirmPassword = "Passwords do not match.";
        }
        return e;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }
        // Check for duplicate enrollment
        const users = JSON.parse(localStorage.getItem("seu_users") || "[]");
        const duplicate = users.find(
            (u) => u.enrollment.toLowerCase() === form.enrollment.toLowerCase()
        );
        if (duplicate) {
            setErrors((prev) => ({ ...prev, enrollment: "This Enrollment / ID is already registered." }));
            return;
        }
        // Save to localStorage
        const newUser = {
            fullName: form.fullName,
            email: form.email,
            enrollment: form.enrollment,
            role: form.role,
            department: form.department,
            password: form.password,
            createdAt: new Date().toISOString(),
        };
        users.push(newUser);
        localStorage.setItem("seu_users", JSON.stringify(users));
        // Redirect to the appropriate dashboard
        if (onRegister) {
            onRegister(form.role.toLowerCase(), {
                enrollment: form.enrollment,
                fullName: form.fullName,
                email: form.email,
                department: form.department,
            });
        }
    };


    return (
        <div className="reg-page">

            {/* ── LEFT PANEL ── */}
            <div className="reg-left">
                <div className="reg-left-overlay" />
                <div className="reg-brand">
                    <div className="reg-logo">
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
                            stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                            <path d="M6 12v5c3.27 1.82 8.73 1.82 12 0v-5" />
                        </svg>
                    </div>
                    <h1>SEUManage</h1>
                    <p className="tagline">University Management System</p>
                    <p className="desc">
                        Create your account to access courses, results,
                        schedules, and university services — all in one place.
                    </p>
                </div>
            </div>

            {/* ── RIGHT PANEL ── */}
            <div className="reg-right">
                <div className="reg-form-box">

                    <h2>Create Account</h2>
                    <p className="form-sub">Fill in your details to register</p>

                    <form onSubmit={handleSubmit} className="reg-form" noValidate>

                        {/* Full Name */}
                        <div className="field-group">
                            <label className="field-label">Full Name</label>
                            <div className={`input-row ${errors.fullName ? "input-error" : ""}`}>
                                <span className="input-icon">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                                        stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    placeholder="e.g. Md. Rakibul Islam"
                                    value={form.fullName}
                                    onChange={(e) => update("fullName", e.target.value)}
                                />
                            </div>
                            {errors.fullName && <p className="field-error">{errors.fullName}</p>}
                        </div>

                        {/* Email */}
                        <div className="field-group">
                            <label className="field-label">Email Address</label>
                            <div className={`input-row ${errors.email ? "input-error" : ""}`}>
                                <span className="input-icon">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                                        stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="4" width="20" height="16" rx="2" />
                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                    </svg>
                                </span>
                                <input
                                    type="email"
                                    placeholder="e.g. yourname@seu.edu.bd"
                                    value={form.email}
                                    onChange={(e) => update("email", e.target.value)}
                                />
                            </div>
                            {errors.email && <p className="field-error">{errors.email}</p>}
                        </div>

                        {/* Enrollment / ID */}
                        <div className="field-group">
                            <label className="field-label">Enrollment / Staff ID</label>
                            <div className={`input-row ${errors.enrollment ? "input-error" : ""}`}>
                                <span className="input-icon">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                                        stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="5" width="20" height="14" rx="2" />
                                        <circle cx="9" cy="12" r="2" />
                                        <path d="M13 10h4M13 14h4" />
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    placeholder="e.g. 2023100010030 or T-204"
                                    value={form.enrollment}
                                    onChange={(e) => update("enrollment", e.target.value.trim())}
                                />
                            </div>
                            {errors.enrollment && <p className="field-error">{errors.enrollment}</p>}
                        </div>

                        {/* Role + Department — side by side */}
                        <div className="reg-row-two">
                            <div className="field-group">
                                <label className="field-label">Role</label>
                                <div className="input-row select-row">
                                    <span className="input-icon">
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                                            stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                            <circle cx="9" cy="7" r="4" />
                                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                        </svg>
                                    </span>
                                    <select
                                        value={form.role}
                                        onChange={(e) => update("role", e.target.value)}
                                    >
                                        {ROLES.map((r) => (
                                            <option key={r} value={r}>{r}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="field-group">
                                <label className="field-label">Department</label>
                                <div className="input-row select-row">
                                    <span className="input-icon">
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                                            stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                            <polyline points="9 22 9 12 15 12 15 22" />
                                        </svg>
                                    </span>
                                    <select
                                        value={form.department}
                                        onChange={(e) => update("department", e.target.value)}
                                    >
                                        {DEPARTMENTS.map((d) => (
                                            <option key={d} value={d}>{d}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Password */}
                        <div className="field-group">
                            <label className="field-label">Password</label>
                            <div className={`input-row ${errors.password ? "input-error" : ""}`}>
                                <span className="input-icon">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                                        stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="11" width="18" height="11" rx="2" />
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    </svg>
                                </span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Min. 6 characters"
                                    value={form.password}
                                    onChange={(e) => update("password", e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="eye-btn"
                                    onClick={() => setShowPassword((v) => !v)}
                                    aria-label="Toggle password visibility"
                                >
                                    {showPassword ? (
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                                            stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                            <line x1="1" y1="1" x2="23" y2="23" />
                                        </svg>
                                    ) : (
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                                            stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {errors.password && <p className="field-error">{errors.password}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div className="field-group">
                            <label className="field-label">Confirm Password</label>
                            <div className={`input-row ${errors.confirmPassword ? "input-error" : ""}`}>
                                <span className="input-icon">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                                        stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    </svg>
                                </span>
                                <input
                                    type={showConfirm ? "text" : "password"}
                                    placeholder="Re-enter your password"
                                    value={form.confirmPassword}
                                    onChange={(e) => update("confirmPassword", e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="eye-btn"
                                    onClick={() => setShowConfirm((v) => !v)}
                                    aria-label="Toggle confirm password visibility"
                                >
                                    {showConfirm ? (
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                                            stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                            <line x1="1" y1="1" x2="23" y2="23" />
                                        </svg>
                                    ) : (
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                                            stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {errors.confirmPassword && <p className="field-error">{errors.confirmPassword}</p>}
                        </div>

                        {/* Submit */}
                        <button type="submit" className="reg-btn">
                            Create Account
                        </button>

                    </form>

                    {/* Login link */}
                    <p className="reg-login-link">
                        Already have an account?{" "}
                        <button className="link-btn" onClick={onNavigateLogin}>
                            Sign in
                        </button>
                    </p>

                </div>
            </div>

        </div>
    );
};

export default Register;

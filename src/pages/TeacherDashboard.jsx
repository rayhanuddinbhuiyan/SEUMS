import { useState } from "react";
import "./TeacherDashboard.css";

/* ── Feature menu cards ─────────────────────────────────────── */
const menuItems = [
    { icon: "📋", label: "My Courses",       badge: null },
    { icon: "✅", label: "Take Attendance",   badge: "Today" },
    { icon: "📊", label: "Attendance Report", badge: null },
    { icon: "📝", label: "Assign Marks",      badge: null },
    { icon: "📈", label: "Results",           badge: null },
    { icon: "🗓️", label: "Class Schedule",   badge: null },
    { icon: "📚", label: "Upload Material",   badge: null },
    { icon: "📨", label: "Attend. Requests",  badge: "3" },
    { icon: "👥", label: "My Students",       badge: null },
    { icon: "📢", label: "Announcements",     badge: null },
    { icon: "💬", label: "Messages",          badge: "2" },
    { icon: "🪪", label: "Staff ID Card",     badge: null },
];

/* ── Quick stats shown in the coloured strip ────────────────── */
const STATS = [
    { label: "Courses",   value: "4" },
    { label: "Students",  value: "187" },
    { label: "Avg Attend.", value: "82%" },
    { label: "Pending",   value: "3" },
];

/* ── Recent activity feed ───────────────────────────────────── */
const ACTIVITY = [
    { time: "09:15 AM", text: "Attendance marked for CSE-301 (Section A)", type: "success" },
    { time: "Yesterday", text: "Marks uploaded for Mid-Term — CSE-205",    type: "info" },
    { time: "Yesterday", text: "3 attendance requests pending review",      type: "warn" },
    { time: "Mon",       text: "New message from Admin Office",             type: "info" },
];

/* ── Derive teacher info from props / overrides ─────────────── */
const getTeacherInfo = (enrollment = "T-001", overrides = {}) => ({
    staffId: enrollment,
    name:       overrides.fullName   || "Faculty Member",
    department: overrides.department || "CSE",
    email:      overrides.email      || `${enrollment.toLowerCase().replace(/\s+/g, "")}@seu.edu.bd`,
    designation: "Assistant Professor",
});

/* ════════════════════════════════════════════════════════════ */
const TeacherDashboard = ({ enrollment, fullName, email, department, onLogout }) => {
    const teacher = getTeacherInfo(enrollment, { fullName, email, department });
    const [activeCard, setActiveCard] = useState(null);

    return (
        <div className="td-page">

            {/* ── Top App Bar ─────────────────────────────── */}
            <div className="td-topbar">
                <div className="td-topbar-left">
                    <div className="td-avatar">
                        {/* Mortar-board icon */}
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                            stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                            <path d="M6 12v5c3.27 1.82 8.73 1.82 12 0v-5" />
                        </svg>
                    </div>
                    <span className="td-campus">Southeast University</span>
                </div>
                <div className="td-topbar-right">
                    <button className="td-bell" title="Notifications">🔔</button>
                    <span className="td-role-badge">Teacher</span>
                </div>
            </div>

            {/* ── Teacher Info Strip ───────────────────────── */}
            <div className="td-info-strip">
                <div className="td-profile-row">
                    <div className="td-profile-icon">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                            stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="8" r="4" />
                            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                        </svg>
                    </div>
                    <div className="td-profile-text">
                        <p className="td-full-name">{teacher.name}</p>
                        <p className="td-designation">{teacher.designation}</p>
                        <p className="td-email">{teacher.email}</p>
                    </div>
                </div>

                {/* Meta row */}
                <div className="td-meta">
                    <span><strong>Staff ID</strong><br />{teacher.staffId}</span>
                    <span><strong>Department</strong><br />{teacher.department}</span>
                    <span><strong>Campus</strong><br />SEU</span>
                    <span><strong>Status</strong><br />Active</span>
                </div>
            </div>

            {/* ── Quick Stats Bar ──────────────────────────── */}
            <div className="td-stats-bar">
                {STATS.map((s) => (
                    <div key={s.label} className="td-stat">
                        <span className="td-stat-value">{s.value}</span>
                        <span className="td-stat-label">{s.label}</span>
                    </div>
                ))}
            </div>

            {/* ── Main Content Area ────────────────────────── */}
            <div className="td-main">

                {/* Feature Grid */}
                <div className="td-section">
                    <h3 className="td-section-title">Quick Actions</h3>
                    <div className="td-grid">
                        {menuItems.map((item) => (
                            <button
                                key={item.label}
                                className={`td-card ${activeCard === item.label ? "td-card-active" : ""}`}
                                onClick={() => setActiveCard(item.label)}
                            >
                                {item.badge && (
                                    <span className="td-badge">{item.badge}</span>
                                )}
                                <span className="td-card-icon">{item.icon}</span>
                                <span className="td-card-label">{item.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="td-section">
                    <h3 className="td-section-title">Recent Activity</h3>
                    <div className="td-activity">
                        {ACTIVITY.map((a, i) => (
                            <div key={i} className={`td-activity-item td-activity-${a.type}`}>
                                <span className="td-activity-dot" />
                                <div className="td-activity-body">
                                    <p className="td-activity-text">{a.text}</p>
                                    <p className="td-activity-time">{a.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* ── Footer ───────────────────────────────────── */}
            <div className="td-footer">
                <span>SEUManage • App Version 5.83</span>
                <button className="td-logout" onClick={onLogout}>Logout</button>
            </div>

        </div>
    );
};

export default TeacherDashboard;

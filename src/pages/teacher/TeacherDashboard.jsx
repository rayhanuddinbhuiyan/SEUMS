import { useNavigate } from "react-router-dom";
import "./TeacherDashboard.css";

const menuItems = [
    { 
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 11 12 14 22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
        ), 
        label: "Take Attendance", 
        badge: "Today" 
    },
    { 
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
        ), 
        label: "Class Schedule", 
        badge: null 
    },
    { 
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                <polyline points="12 11 12 17" />
                <polyline points="9 14 12 11 15 14" />
            </svg>
        ), 
        label: "Upload Material", 
        badge: null 
    },
    { 
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a5b4fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
        ), 
        label: "Assign Marks", 
        badge: null 
    },
    { 
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ), 
        label: "My Students", 
        badge: null 
    },
];

const STATS = [
    { label: "Courses",     value: "4" },
    { label: "Students",    value: "187" },
    { label: "Avg Attend.", value: "82%" },
    { label: "Pending",     value: "3" },
];

const ACTIVITY = [
    { time: "09:15 AM",  text: "Attendance marked for CSE-301 (Section A)", type: "success" },
    { time: "Yesterday", text: "Marks uploaded for Mid-Term — CSE-205",     type: "info" },
    { time: "Yesterday", text: "3 attendance requests pending review",       type: "warn" },
    { time: "Mon",       text: "New message from Admin Office",              type: "info" },
];

const TeacherDashboard = () => {
    const navigate = useNavigate();
    const raw = JSON.parse(localStorage.getItem("seu_current_user") || "{}");
    const teacher = {
        staffId:     raw.enrollment    || "T-001",
        name:        raw.fullName      || "Faculty Member",
        department:  raw.department    || "CSE",
        email:       raw.email         || "faculty@seu.edu.bd",
        designation: "Assistant Professor",
    };

    const handleLogout = () => {
        localStorage.removeItem("seu_current_user");
        navigate("/login");
    };

    return (
        <div className="td-page">

            {/* ── Top App Bar ─────────────────────────────── */}
            <div className="td-topbar">
                <div className="td-topbar-left">
                    <div className="td-avatar">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                            stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                            <path d="M6 12v5c3.27 1.82 8.73 1.82 12 0v-5" />
                        </svg>
                    </div>
                    <span className="td-campus">Southeast University</span>
                </div>
                <div className="td-topbar-right">
                    <button className="td-bell" title="Notifications">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                        </svg>
                    </button>
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

            {/* ── Main Content ────────────────────────────── */}
            <div className="td-main">
                <div className="td-section">
                    <h3 className="td-section-title">Quick Actions</h3>
                    <div className="td-grid">
                        {menuItems.map((item) => (
                            <button key={item.label} className="td-card">
                                {item.badge && <span className="td-badge">{item.badge}</span>}
                                <span className="td-card-icon">{item.icon}</span>
                                <span className="td-card-label">{item.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

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
                <button className="td-logout" onClick={handleLogout}>Logout</button>
            </div>

        </div>
    );
};

export default TeacherDashboard;

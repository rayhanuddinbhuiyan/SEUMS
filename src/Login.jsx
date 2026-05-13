import { useState } from "react";

const Login = () => {
    const [enrollment, setEnrollment] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        alert(`Logging in with Enrollment: ${enrollment}`);
    };

    return (
        <div style={styles.pageWrapper}>
            <div style={styles.phoneFrame}>

                {/* ── Header ─────────────────────────────── */}
                <div style={styles.header}>
                    <h1 style={styles.headerTitle}>Login for all</h1>
                </div>
                {/* ── Status bar ─────────────────────────── */} 
                <div style={styles.statusBar}>
                    <span style={styles.statusTime}>9:41</span>
                    <span style={styles.statusIcons}>▪▪▪ ≋ 🔋</span>
                </div>

                {/* ── University building image + wave ───── */}
                <div style={styles.imageSection}>
                    <img
                        src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=560&q=80"
                        alt="University campus"
                        style={styles.campusImg}
                    />
                    {/* white wave that "cuts" the image into the card below */}
                    <svg
                        viewBox="0 0 210 36"
                        style={styles.waveSvg}
                        preserveAspectRatio="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M0,18 Q52,36 105,18 Q158,0 210,18 L210,36 L0,36 Z"
                            fill="#f0f0f0"
                        />
                    </svg>
                </div>

                {/* ── Form card ──────────────────────────── */}
                <div style={styles.card}>
                    <form onSubmit={handleLogin}>

                        {/* Enrollment */}
                        <div style={styles.field}>
                            <span style={styles.fieldIcon}>
                                {/* ID-card icon */}
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                                    stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="5" width="20" height="14" rx="2" />
                                    <circle cx="9" cy="12" r="2" />
                                    <path d="M13 10h4M13 14h4" />
                                </svg>
                            </span>
                            <input
                                type="text"
                                placeholder="Enter Enrollment"
                                value={enrollment}
                                onChange={(e) => setEnrollment(e.target.value)}
                                style={styles.input}
                            />
                        </div>

                        {/* Password */}
                        <div style={styles.field}>
                            <span style={styles.fieldIcon}>
                                {/* Lock icon */}
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                                    stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="11" width="18" height="11" rx="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                            </span>
                            <input
                                type="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={styles.input}
                            />
                        </div>

                        {/* Remember me */}
                        <label style={styles.rememberRow}>
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                style={styles.checkbox}
                            />
                            <span style={styles.rememberText}>Remember Me</span>
                        </label>

                        {/* Login button */}
                        <button type="submit" style={styles.loginBtn}>
                            Login
                        </button>
                    </form>
                </div>

                {/* ── University logo ─────────────────────── */}
                <div style={styles.logoRow}>
                    <div style={styles.logoBadge}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                            stroke="#1a2e5a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                            <path d="M6 12v5c3.27 1.82 8.73 1.82 12 0v-5" />
                        </svg>
                    </div>
                </div>

                {/* Home-bar indicator */}
                <div style={styles.homeBar} />

            </div>
        </div>
    );
};

/* ── Styles ──────────────────────────────────────────── */
const NAV = "#1a2e5a";

const styles = {
    pageWrapper: {
        minHeight: "100vh",
        background: "#d6d6d6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, Helvetica, sans-serif",
    },

    /* phone shell */
    phoneFrame: {
        width: "212px",
        background: "#f0f0f0",
        boxShadow: "0 10px 40px rgba(0,0,0,0.30)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
    },

    /* dark navy top bar */
    header: {
        background: NAV,
        padding: "11px 14px 10px",
        textAlign: "center",
    },
    headerTitle: {
        margin: 0,
        color: "#fff",
        fontSize: "17px",
        fontWeight: "bold",
        fontStyle: "italic",
        letterSpacing: "0.3px",
    },

    /* status row (time + icons) */
    statusBar: {
        background: NAV,
        display: "flex",
        justifyContent: "space-between",
        padding: "2px 10px 5px",
        color: "#fff",
        fontSize: "9px",
    },
    statusTime: { fontWeight: "700", fontSize: "10px" },
    statusIcons: { letterSpacing: "2px" },

    /* campus photo + wave */
    imageSection: {
        position: "relative",
        height: "105px",
        overflow: "hidden",
    },
    campusImg: {
        width: "100%",
        height: "105px",
        objectFit: "cover",
        objectPosition: "center 40%",
        display: "block",
    },
    waveSvg: {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "36px",
        display: "block",
    },

    /* white login card */
    card: {
        background: "#fff",
        margin: "0 14px",
        borderRadius: "6px",
        padding: "13px 11px 14px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
        position: "relative",
        zIndex: 1,
        marginTop: "-2px",
    },

    /* input rows */
    field: {
        display: "flex",
        alignItems: "center",
        border: "1px solid #ddd",
        borderRadius: "4px",
        padding: "6px 8px",
        marginBottom: "9px",
        background: "#fafafa",
        gap: "7px",
    },
    fieldIcon: {
        display: "flex",
        alignItems: "center",
        flexShrink: 0,
    },
    input: {
        border: "none",
        outline: "none",
        background: "transparent",
        fontSize: "10.5px",
        color: "#555",
        width: "100%",
        fontFamily: "inherit",
    },

    /* remember me */
    rememberRow: {
        display: "flex",
        alignItems: "center",
        gap: "6px",
        cursor: "pointer",
        marginBottom: "11px",
    },
    checkbox: {
        width: "11px",
        height: "11px",
        cursor: "pointer",
        accentColor: NAV,
    },
    rememberText: {
        fontSize: "10px",
        color: "#444",
    },

    /* login button */
    loginBtn: {
        display: "block",
        width: "100%",
        padding: "8px 0",
        background: NAV,
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        fontSize: "13px",
        fontWeight: "bold",
        cursor: "pointer",
        letterSpacing: "0.5px",
        transition: "opacity 0.15s",
    },

    /* university badge at bottom */
    logoRow: {
        display: "flex",
        justifyContent: "center",
        padding: "12px 0 6px",
    },
    logoBadge: {
        width: "52px",
        height: "52px",
        borderRadius: "50%",
        background: "#fff",
        border: `3px solid ${NAV}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 10px rgba(0,0,0,0.18)",
    },

    /* bottom home indicator line */
    homeBar: {
        width: "60px",
        height: "3px",
        background: "#333",
        borderRadius: "3px",
        margin: "4px auto 8px",
    },
};

export default Login;

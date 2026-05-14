import { useNavigate } from "react-router-dom";
import "./StudentModule.css";

export default function AttendRequest() {
    const navigate = useNavigate();
    return (
        <div className="smp-page">
            <div className="smp-topbar">
                <button className="smp-back-btn" onClick={() => navigate("/student-dashboard")}>←</button>
                <div className="smp-topbar-title">
                    <h1>Attendance Request</h1>
                    <p>Southeast University</p>
                </div>
                <span className="smp-topbar-icon">📨</span>
            </div>
            <div className="smp-content">
                <div className="smp-empty">
                    <p style={{ fontSize: 40, marginBottom: 12 }}>📨</p>
                    <p style={{ fontSize: 16, fontWeight: 700, color: "#1a2e5a" }}>Coming Soon</p>
                    <p style={{ fontSize: 13, color: "#aaa", marginTop: 6 }}>This section is under construction.</p>
                </div>
            </div>
        </div>
    );
}

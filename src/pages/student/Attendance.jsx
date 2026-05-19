import { useNavigate } from "react-router-dom";
import calendarIcon from "../../assets/icons/calendar.png";
import "./StudentModule.css";

export default function Attendance() {
    const navigate = useNavigate();
    return (
        <div className="smp-page">
            <div className="smp-topbar">
                <button className="smp-back-btn" onClick={() => navigate("/student-dashboard")}>←</button>
                <div className="smp-topbar-title">
                    <h1>Attendance</h1>
                    <p>Southeast University</p>
                </div>
                <span className="smp-topbar-icon" style={{ display: "flex", alignItems: "center" }}>
                    <img src={calendarIcon} alt="Attendance" style={{ width: 28, height: 28, objectFit: "contain" }} />
                </span>
            </div>
            <div className="smp-content">
                <div className="smp-empty">
                    <img src={calendarIcon} alt="Attendance" style={{ width: 64, height: 64, objectFit: "contain", marginBottom: 12 }} />
                    <p style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>Coming Soon</p>
                    <p style={{ fontSize: 13, color: "#aaa", marginTop: 6 }}>This section is under construction.</p>
                </div>
            </div>
        </div>
    );
}

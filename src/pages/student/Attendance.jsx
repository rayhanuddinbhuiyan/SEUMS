import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import calendarIcon from "../../assets/icons/calendar.png";
import "./StudentModule.css";

const DEFAULT_COURSES = [
    {
        courseCode: "CSE-301",
        courseName: "Computer Networks",
        credits: 3,
        conducted: 24,
        attended: 21,
        absent: 3,
        instructor: "Dr. Rayhan Uddin"
    },
    {
        courseCode: "CSE-205",
        courseName: "Data Structures & Algorithms",
        credits: 4,
        conducted: 28,
        attended: 24,
        absent: 4,
        instructor: "Prof. H. Rahman"
    },
    {
        courseCode: "CSE-303",
        courseName: "Database Management Systems",
        credits: 3,
        conducted: 22,
        attended: 16,
        absent: 6,
        instructor: "Faculty Member"
    },
    {
        courseCode: "CSE-401",
        courseName: "Artificial Intelligence",
        credits: 3,
        conducted: 18,
        attended: 15,
        absent: 3,
        instructor: "Prof. Farhana Alam"
    },
    {
        courseCode: "ENG-101",
        courseName: "Academic Writing & Composition",
        credits: 2,
        conducted: 16,
        attended: 9,
        absent: 7,
        instructor: "Ms. Tasnim Tabassum"
    }
];

const DEFAULT_LOGS = [
    { id: 1, date: "2026-05-20", day: "Wednesday", courseCode: "CSE-301", courseName: "Computer Networks", topic: "Introduction to TCP/IP Layers & Encapsulation", status: "Present", checkIn: "09:02 AM", instructor: "Dr. Rayhan Uddin" },
    { id: 2, date: "2026-05-19", day: "Tuesday", courseCode: "CSE-205", courseName: "Data Structures & Algorithms", topic: "AVL Tree Rotations and Balancing Concepts", status: "Present", checkIn: "11:05 AM", instructor: "Prof. H. Rahman" },
    { id: 3, date: "2026-05-19", day: "Tuesday", courseCode: "CSE-303", courseName: "Database Management Systems", topic: "SQL Relational Division and Complex Set Operators", status: "Absent", checkIn: "—", instructor: "Faculty Member" },
    { id: 4, date: "2026-05-18", day: "Monday", courseCode: "CSE-401", courseName: "Artificial Intelligence", topic: "A* Pathfinding Search and Graph Heuristics", status: "Present", checkIn: "02:10 PM", instructor: "Prof. Farhana Alam" },
    { id: 5, date: "2026-05-18", day: "Monday", courseCode: "ENG-101", courseName: "Academic Writing & Composition", topic: "Structural Outlines of Persuasive Essays", status: "Absent", checkIn: "—", instructor: "Ms. Tasnim Tabassum" },
    { id: 6, date: "2026-05-17", day: "Sunday", courseCode: "CSE-301", courseName: "Computer Networks", topic: "Subnetting Principles & VLSM Address Assignment", status: "Late", checkIn: "09:18 AM", instructor: "Dr. Rayhan Uddin" },
    { id: 7, date: "2026-05-16", day: "Saturday", courseCode: "CSE-205", courseName: "Data Structures & Algorithms", topic: "Binary Search Tree (BST) Node Deletion Cases", status: "Present", checkIn: "11:01 AM", instructor: "Prof. H. Rahman" },
    { id: 8, date: "2026-05-15", day: "Friday", courseCode: "CSE-303", courseName: "Database Management Systems", topic: "Mapping E-R Diagrams into Relational Database Schemas", status: "Present", checkIn: "01:05 PM", instructor: "Faculty Member" },
    { id: 9, date: "2026-05-14", day: "Thursday", courseCode: "CSE-401", courseName: "Artificial Intelligence", topic: "Graph Search Strategies: Depth-First & Breadth-First", status: "Present", checkIn: "02:02 PM", instructor: "Prof. Farhana Alam" },
    { id: 10, date: "2026-05-14", day: "Thursday", courseCode: "ENG-101", courseName: "Academic Writing & Composition", topic: "Active vs Passive Voice and Structural Concord", status: "Absent", checkIn: "—", instructor: "Ms. Tasnim Tabassum" },
    { id: 11, date: "2026-05-13", day: "Wednesday", courseCode: "CSE-301", courseName: "Computer Networks", topic: "IPv4 Classful Addressing and Default Subnet Masks", status: "Present", checkIn: "09:05 AM", instructor: "Dr. Rayhan Uddin" },
    { id: 12, date: "2026-05-12", day: "Tuesday", courseCode: "CSE-205", courseName: "Data Structures & Algorithms", topic: "Implementing Double-Ended Queues using Linked Lists", status: "Present", checkIn: "11:00 AM", instructor: "Prof. H. Rahman" },
    { id: 13, date: "2026-05-12", day: "Tuesday", courseCode: "CSE-303", courseName: "Database Management Systems", topic: "Relational Algebra Operations: Projection, Selection, Join", status: "Absent", checkIn: "—", instructor: "Faculty Member" },
    { id: 14, date: "2026-05-11", day: "Monday", courseCode: "CSE-401", courseName: "Artificial Intelligence", topic: "Properties and Environments of Intelligent Agents", status: "Present", checkIn: "02:08 PM", instructor: "Prof. Farhana Alam" },
    { id: 15, date: "2026-05-11", day: "Monday", courseCode: "ENG-101", courseName: "Academic Writing & Composition", topic: "Academic Integrity: Paraphrasing vs Direct Quotes", status: "Present", checkIn: "09:02 AM", instructor: "Ms. Tasnim Tabassum" },
    { id: 16, date: "2026-05-10", day: "Sunday", courseCode: "CSE-301", courseName: "Computer Networks", topic: "OSI Reference Model: Functions of the 7 Layers", status: "Present", checkIn: "09:04 AM", instructor: "Dr. Rayhan Uddin" },
    { id: 17, date: "2026-05-09", day: "Saturday", courseCode: "CSE-205", courseName: "Data Structures & Algorithms", topic: "Stack Application: Infix to Postfix String Parsing", status: "Present", checkIn: "11:03 AM", instructor: "Prof. H. Rahman" },
    { id: 18, date: "2026-05-08", day: "Friday", courseCode: "CSE-303", courseName: "Database Management Systems", topic: "DBMS Architecture & Three-Schema Storage Hierarchy", status: "Present", checkIn: "01:00 PM", instructor: "Faculty Member" },
    { id: 19, date: "2026-05-07", day: "Thursday", courseCode: "CSE-401", courseName: "Artificial Intelligence", topic: "Course Syllabus Overview and Agent Definition", status: "Absent", checkIn: "—", instructor: "Prof. Farhana Alam" },
    { id: 20, date: "2026-05-07", day: "Thursday", courseCode: "ENG-101", courseName: "Academic Writing & Composition", topic: "Parts of Speech, Modifiers, and Sentence Types", status: "Present", checkIn: "09:01 AM", instructor: "Ms. Tasnim Tabassum" },
    { id: 21, date: "2026-05-06", day: "Wednesday", courseCode: "CSE-301", courseName: "Computer Networks", topic: "Course Objectives and Network Edge Terminology", status: "Present", checkIn: "09:05 AM", instructor: "Dr. Rayhan Uddin" }
];

export default function Attendance() {
    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);
    const [logs, setLogs] = useState([]);

    // Filtering states
    const [courseFilter, setCourseFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    // Modal state
    const [activeDetailCourse, setActiveDetailCourse] = useState(null);

    // Simulation states
    const [simCourseCode, setSimCourseCode] = useState("CSE-303");
    const [simConductedAdd, setSimConductedAdd] = useState(4);
    const [simAttendedAdd, setSimAttendedAdd] = useState(4);

    useEffect(() => {
        if (!localStorage.getItem("seu_attendance")) {
            localStorage.setItem("seu_attendance", JSON.stringify(DEFAULT_COURSES));
        }
        if (!localStorage.getItem("seu_attendance_logs")) {
            localStorage.setItem("seu_attendance_logs", JSON.stringify(DEFAULT_LOGS));
        }

        setCourses(JSON.parse(localStorage.getItem("seu_attendance")));
        setLogs(JSON.parse(localStorage.getItem("seu_attendance_logs")));
    }, []);

    // Global stats summaries
    const totalConducted = courses.reduce((acc, c) => acc + c.conducted, 0);
    const totalAttended = courses.reduce((acc, c) => acc + c.attended, 0);
    const totalAbsent = courses.reduce((acc, c) => acc + c.absent, 0);
    const overallPercentage = totalConducted > 0 ? ((totalAttended / totalConducted) * 100) : 0;

    // Filtered chronological logs
    const filteredLogs = logs.filter((log) => {
        const matchesCourse = courseFilter === "All" || log.courseCode === courseFilter;
        const matchesStatus = statusFilter === "All" || log.status.toLowerCase() === statusFilter.toLowerCase();
        const matchesSearch = log.topic.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             log.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             log.courseName.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCourse && matchesStatus && matchesSearch;
    });

    // Helper functions for percentages and badges
    const getPercentage = (attended, conducted) => {
        return conducted > 0 ? ((attended / conducted) * 100).toFixed(1) : "0.0";
    };

    const getProgClass = (pct) => {
        if (pct >= 75) return "good";
        if (pct >= 60) return "warn";
        return "danger";
    };

    const getStatusBadge = (pct) => {
        if (pct >= 75) return <span className="badge badge-green">ELIGIBLE</span>;
        if (pct >= 60) return <span className="badge badge-yellow">SHORTAGE</span>;
        return <span className="badge badge-red">INELIGIBLE</span>;
    };

    const getGlobalPulseClass = (pct) => {
        if (pct >= 75) return "pulse-glow-eligible";
        if (pct >= 60) return "pulse-glow-shortage";
        return "pulse-glow-danger";
    };

    // Attendance Simulator details
    const selectedCourseObj = courses.find(c => c.courseCode === simCourseCode) || courses[0];
    const simNewConducted = selectedCourseObj ? selectedCourseObj.conducted + simConductedAdd : 0;
    const simNewAttended = selectedCourseObj ? selectedCourseObj.attended + simAttendedAdd : 0;
    const simNewPercentage = simNewConducted > 0 ? ((simNewAttended / simNewConducted) * 100) : 0;
    
    // Dynamic Simulator message generator
    const getSimulatorGuidance = () => {
        if (!selectedCourseObj) return "";
        const curPct = parseFloat(getPercentage(selectedCourseObj.attended, selectedCourseObj.conducted));
        const diffTo75 = Math.ceil(0.75 * selectedCourseObj.conducted - selectedCourseObj.attended);
        
        if (curPct >= 75) {
            return `Awesome! You are already ELIGIBLE in this course. You can miss up to ${Math.floor(selectedCourseObj.attended - 0.75 * selectedCourseObj.conducted)} more classes and still remain eligible!`;
        }

        if (diffTo75 > 0) {
            // Find how many consecutive classes they must attend
            // (attended + X) / (conducted + X) >= 0.75 => X >= (0.75 * conducted - attended) / 0.25
            const consecutiveNeeded = Math.ceil((0.75 * selectedCourseObj.conducted - selectedCourseObj.attended) / 0.25);
            
            if (simNewPercentage >= 75) {
                return `Success! By attending ${simAttendedAdd} of the next ${simConductedAdd} simulated classes, your attendance jumps to ${simNewPercentage.toFixed(1)}%, successfully clearing your shortage! 🎉`;
            } else {
                return `Warning: The simulated attendance (${simNewPercentage.toFixed(1)}%) is still below the 75% requirement. You must attend at least ${consecutiveNeeded} consecutive future lectures without absence to reach safety. ⚠️`;
            }
        }
        return "";
    };

    return (
        <div className="smp-page">
            {/* ── Top Bar ──────────────────────────────────── */}
            <div className="smp-topbar">
                <button className="smp-back-btn" onClick={() => navigate("/student-dashboard")}>←</button>
                <div className="smp-topbar-title">
                    <h1>Attendance Hub</h1>
                    <p>Southeast University • Student Academic Profile</p>
                </div>
                <span className="smp-topbar-icon" style={{ display: "flex", alignItems: "center" }}>
                    <img src={calendarIcon} alt="Attendance" style={{ width: 28, height: 28, objectFit: "contain" }} />
                </span>
            </div>

            {/* ── Content Area ─────────────────────────────── */}
            <div className="smp-content">
                
                {/* ── Global Stats Row ───────────────────────── */}
                <div className="smp-stats-row">
                    <div className="smp-stat-box">
                        <div className="stat-val">{totalConducted}</div>
                        <div className="stat-label">Conducted</div>
                    </div>
                    <div className="smp-stat-box">
                        <div className="stat-val" style={{ color: "#34d399" }}>{totalAttended}</div>
                        <div className="stat-label">Attended</div>
                    </div>
                    <div className="smp-stat-box">
                        <div className="stat-val" style={{ color: "#f87171" }}>{totalAbsent}</div>
                        <div className="stat-label">Absent Classes</div>
                    </div>
                    <div className={`smp-stat-box ${getGlobalPulseClass(overallPercentage)}`} style={{ transition: "all 0.3s ease" }}>
                        <div className="stat-val" style={{ color: overallPercentage >= 75 ? "#38bdf8" : overallPercentage >= 60 ? "#fbbf24" : "#ef4444" }}>
                            {overallPercentage.toFixed(1)}%
                        </div>
                        <div className="stat-label" style={{ fontSize: 9, fontWeight: 800, marginTop: 4 }}>
                            {overallPercentage >= 75 ? "🎓 EXAM ELIGIBLE" : overallPercentage >= 60 ? "⚠️ SHORTAGE WARNING" : "❌ INELIGIBLE FOR EXAMS"}
                        </div>
                    </div>
                </div>

                {/* ── Course Breakdown Table Card ────────────── */}
                <div className="smp-card">
                    <div className="smp-card-header">
                        <span>📊</span>
                        <h2>Course-wise Attendance Breakdown</h2>
                    </div>
                    <div className="smp-card-body" style={{ overflowX: "auto" }}>
                        <table className="smp-table">
                            <thead>
                                <tr>
                                    <th>Course</th>
                                    <th style={{ textAlign: "center" }}>Conducted</th>
                                    <th style={{ textAlign: "center" }}>Attended</th>
                                    <th style={{ textAlign: "center" }}>Absent</th>
                                    <th style={{ minWidth: 120 }}>Progress Bar</th>
                                    <th style={{ textAlign: "center" }}>Percentage</th>
                                    <th style={{ textAlign: "center" }}>Status</th>
                                    <th style={{ textAlign: "center" }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.map((course) => {
                                    const pct = parseFloat(getPercentage(course.attended, course.conducted));
                                    const progClass = getProgClass(pct);
                                    return (
                                        <tr key={course.courseCode} style={{ transition: "background 0.2s" }}>
                                            <td style={{ padding: "16px 20px" }}>
                                                <div style={{ fontWeight: 700, fontSize: 13.5, color: "#fff" }}>{course.courseCode}</div>
                                                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 2 }}>{course.courseName}</div>
                                            </td>
                                            <td style={{ textAlign: "center", fontWeight: 600 }}>{course.conducted}</td>
                                            <td style={{ textAlign: "center", color: "#34d399", fontWeight: 600 }}>{course.attended}</td>
                                            <td style={{ textAlign: "center", color: "#f87171", fontWeight: 600 }}>{course.absent}</td>
                                            <td>
                                                <div className="smp-progress-wrap" style={{ height: 6 }}>
                                                    <div className={`smp-progress-bar ${progClass}`} style={{ width: `${pct}%` }}></div>
                                                </div>
                                            </td>
                                            <td style={{ textAlign: "center", fontWeight: 700, color: pct >= 75 ? "#86efac" : pct >= 60 ? "#fde047" : "#fca5a5" }}>
                                                {pct}%
                                            </td>
                                            <td style={{ textAlign: "center" }}>
                                                {getStatusBadge(pct)}
                                            </td>
                                            <td style={{ textAlign: "center" }}>
                                                <button 
                                                    onClick={() => setActiveDetailCourse(course)}
                                                    style={{
                                                        background: "rgba(255,255,255,0.06)",
                                                        border: "1px solid rgba(255,255,255,0.12)",
                                                        borderRadius: 8,
                                                        padding: "6px 12px",
                                                        color: "#c084fc",
                                                        fontSize: 11.5,
                                                        fontWeight: 700,
                                                        cursor: "pointer",
                                                        transition: "all 0.2s"
                                                    }}
                                                    onMouseOver={(e) => {
                                                        e.target.style.background = "rgba(255,255,255,0.15)";
                                                        e.target.style.borderColor = "rgba(167, 139, 250, 0.4)";
                                                    }}
                                                    onMouseOut={(e) => {
                                                        e.target.style.background = "rgba(255,255,255,0.06)";
                                                        e.target.style.borderColor = "rgba(255,255,255,0.12)";
                                                    }}
                                                >
                                                    📋 Logs
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ── Attendance Increment Simulator Card ────── */}
                {selectedCourseObj && (
                    <div className="smp-card" style={{
                        background: "rgba(30, 27, 75, 0.2)",
                        border: "1px solid rgba(167, 139, 250, 0.25)",
                        boxShadow: "0 8px 32px 0 rgba(167, 139, 250, 0.05)"
                    }}>
                        <div className="smp-card-header" style={{ borderBottom: "1px solid rgba(167, 139, 250, 0.15)" }}>
                            <span>🚀</span>
                            <h2 style={{ color: "#c084fc" }}>Attendance Increment Simulator</h2>
                        </div>
                        <div style={{ padding: "20px clamp(16px, 3vw, 24px)" }}>
                            <p style={{ margin: "0 0 20px", fontSize: 13, color: "rgba(255, 255, 255, 0.75)", lineHeight: 1.5 }}>
                                Are you facing an eligibility shortage? Pick a course below and simulate attending future lectures to see exactly how many classes you must complete to clear shortages and ensure exam clearance.
                            </p>

                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
                                {/* Inputs Panel */}
                                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                        <label style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.5, color: "#a78bfa" }}>
                                            1. Choose Course
                                        </label>
                                        <select 
                                            value={simCourseCode}
                                            onChange={(e) => {
                                                setSimCourseCode(e.target.value);
                                                setSimConductedAdd(3);
                                                setSimAttendedAdd(3);
                                            }}
                                            style={{
                                                border: "1.5px solid rgba(167, 139, 250, 0.2)",
                                                borderRadius: 10,
                                                padding: "10px 12px",
                                                fontSize: 13,
                                                color: "#fff",
                                                background: "rgba(255, 255, 255, 0.05)",
                                                outline: "none",
                                                cursor: "pointer"
                                            }}
                                        >
                                            {courses.map(c => (
                                                <option key={c.courseCode} value={c.courseCode} style={{ background: "#1e1b4b" }}>
                                                    {c.courseCode} — {c.courseName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Conducted increment */}
                                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <label style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.5, color: "#a78bfa" }}>
                                                2. Future conducted classes
                                            </label>
                                            <span style={{ fontSize: 12, fontWeight: 700, color: "#c084fc" }}>+{simConductedAdd} classes</span>
                                        </div>
                                        <input 
                                            type="range" 
                                            min="1" 
                                            max="15" 
                                            value={simConductedAdd}
                                            onChange={(e) => {
                                                const val = parseInt(e.target.value);
                                                setSimConductedAdd(val);
                                                if (simAttendedAdd > val) setSimAttendedAdd(val);
                                            }}
                                            style={{ cursor: "pointer", accentColor: "#a855f7" }}
                                        />
                                    </div>

                                    {/* Attended increment */}
                                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <label style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.5, color: "#a78bfa" }}>
                                                3. Classes you will attend
                                            </label>
                                            <span style={{ fontSize: 12, fontWeight: 700, color: "#34d399" }}>+ {simAttendedAdd} attended</span>
                                        </div>
                                        <input 
                                            type="range" 
                                            min="0" 
                                            max={simConductedAdd} 
                                            value={simAttendedAdd}
                                            onChange={(e) => setSimAttendedAdd(parseInt(e.target.value))}
                                            style={{ cursor: "pointer", accentColor: "#10b981" }}
                                        />
                                    </div>
                                </div>

                                {/* Results display */}
                                <div style={{ 
                                    background: "rgba(255, 255, 255, 0.03)", 
                                    border: "1px solid rgba(255, 255, 255, 0.06)", 
                                    borderRadius: 14, 
                                    padding: 16,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between"
                                }}>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                        <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
                                            Simulation Results for {simCourseCode}
                                        </div>

                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 8 }}>
                                            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>Current Ratio:</span>
                                            <span style={{ fontSize: 13, fontWeight: 700 }}>
                                                {selectedCourseObj.attended}/{selectedCourseObj.conducted} ({getPercentage(selectedCourseObj.attended, selectedCourseObj.conducted)}%)
                                            </span>
                                        </div>

                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 8 }}>
                                            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>Simulated Additions:</span>
                                            <span style={{ fontSize: 13, fontWeight: 700, color: "#a78bfa" }}>
                                                +{simAttendedAdd}/+{simConductedAdd} classes
                                            </span>
                                        </div>

                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 4 }}>
                                            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>New Ratio:</span>
                                            <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>
                                                {simNewAttended}/{simNewConducted}
                                            </span>
                                        </div>

                                        {/* New percentage progress display */}
                                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 4 }}>
                                            <div className="smp-progress-wrap" style={{ height: 10, flex: 1 }}>
                                                <div className={`smp-progress-bar ${getProgClass(simNewPercentage)}`} style={{ width: `${simNewPercentage}%` }}></div>
                                            </div>
                                            <span style={{ fontSize: 15, fontWeight: 800, color: simNewPercentage >= 75 ? "#34d399" : simNewPercentage >= 60 ? "#fbbf24" : "#f87171" }}>
                                                {simNewPercentage.toFixed(1)}%
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action Advice Box */}
                                    <div style={{ 
                                        marginTop: 14, 
                                        padding: "10px 12px", 
                                        background: simNewPercentage >= 75 ? "rgba(56, 161, 105, 0.12)" : "rgba(239, 68, 68, 0.1)", 
                                        border: simNewPercentage >= 75 ? "1px solid rgba(56, 161, 105, 0.25)" : "1px solid rgba(239, 68, 68, 0.2)",
                                        borderRadius: 8,
                                        fontSize: 11.5,
                                        lineHeight: 1.4,
                                        color: simNewPercentage >= 75 ? "#86efac" : "#fca5a5"
                                    }}>
                                        {getSimulatorGuidance()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── Chronological Logs Card ────────────────── */}
                <div className="smp-card">
                    <div className="smp-card-header" style={{ justifyContent: "space-between", flexWrap: "wrap", gap: 14 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <span>📋</span>
                            <h2>Daily Attendance registry log</h2>
                        </div>
                        {/* Summary Badges count */}
                        <div style={{ display: "flex", gap: 6, fontSize: 10.5 }}>
                            <span className="badge badge-green" style={{ padding: "2px 8px" }}>
                                Total Matches: {filteredLogs.length}
                            </span>
                        </div>
                    </div>

                    {/* Filter bars */}
                    <div style={{
                        padding: "16px 20px",
                        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                        gap: 12,
                        background: "rgba(255,255,255,0.015)"
                    }}>
                        {/* Course Filter */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                            <label style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>Course Code</label>
                            <select 
                                value={courseFilter}
                                onChange={(e) => setCourseFilter(e.target.value)}
                                style={{
                                    border: "1px solid rgba(255, 255, 255, 0.15)",
                                    borderRadius: 8,
                                    padding: "8px 10px",
                                    fontSize: 12.5,
                                    color: "#fff",
                                    background: "rgba(255, 255, 255, 0.05)",
                                    outline: "none",
                                    cursor: "pointer"
                                }}
                            >
                                <option value="All" style={{ background: "#1e1b4b" }}>All Courses</option>
                                {courses.map(c => (
                                    <option key={c.courseCode} value={c.courseCode} style={{ background: "#1e1b4b" }}>{c.courseCode}</option>
                                ))}
                            </select>
                        </div>

                        {/* Status Filter */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                            <label style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>Attendance Status</label>
                            <select 
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                style={{
                                    border: "1px solid rgba(255, 255, 255, 0.15)",
                                    borderRadius: 8,
                                    padding: "8px 10px",
                                    fontSize: 12.5,
                                    color: "#fff",
                                    background: "rgba(255, 255, 255, 0.05)",
                                    outline: "none",
                                    cursor: "pointer"
                                }}
                            >
                                <option value="All" style={{ background: "#1e1b4b" }}>All Statuses</option>
                                <option value="Present" style={{ background: "#1e1b4b" }}>Present</option>
                                <option value="Absent" style={{ background: "#1e1b4b" }}>Absent</option>
                                <option value="Late" style={{ background: "#1e1b4b" }}>Late</option>
                            </select>
                        </div>

                        {/* Search Input */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                            <label style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>Search Topic</label>
                            <input 
                                type="text" 
                                placeholder="Search details..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    border: "1px solid rgba(255, 255, 255, 0.15)",
                                    borderRadius: 8,
                                    padding: "8px 10px",
                                    fontSize: 12.5,
                                    color: "#fff",
                                    background: "rgba(255, 255, 255, 0.05)",
                                    outline: "none"
                                }}
                            />
                        </div>
                    </div>

                    {/* Registry list table */}
                    <div className="smp-card-body" style={{ overflowX: "auto" }}>
                        {filteredLogs.length > 0 ? (
                            <table className="smp-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Course</th>
                                        <th>Lecture Topic Covered</th>
                                        <th style={{ textAlign: "center" }}>Check-In</th>
                                        <th style={{ textAlign: "center" }}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredLogs.map((log) => (
                                        <tr key={log.id}>
                                            <td style={{ padding: "12px 16px", whiteSpace: "nowrap" }}>
                                                <div style={{ fontWeight: 600, fontSize: 13 }}>
                                                    {new Date(log.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                                </div>
                                                <div style={{ fontSize: 9.5, color: "rgba(255,255,255,0.4)" }}>{log.day}</div>
                                            </td>
                                            <td style={{ padding: "12px 16px" }}>
                                                <span style={{
                                                    fontSize: 11,
                                                    fontWeight: 700,
                                                    padding: "2px 6px",
                                                    borderRadius: 6,
                                                    background: "rgba(255,255,255,0.06)",
                                                    border: "1px solid rgba(255,255,255,0.1)",
                                                    color: "#c084fc"
                                                }}>
                                                    {log.courseCode}
                                                </span>
                                            </td>
                                            <td style={{ padding: "12px 16px", fontSize: 12.5, color: "rgba(255,255,255,0.85)" }}>
                                                {log.topic}
                                                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>Lecturer: {log.instructor}</div>
                                            </td>
                                            <td style={{ padding: "12px 16px", textAlign: "center", fontStyle: log.checkIn === "—" ? "italic" : "normal", color: log.checkIn === "—" ? "rgba(255,255,255,0.3)" : "#fff", fontSize: 12 }}>
                                                {log.checkIn}
                                            </td>
                                            <td style={{ padding: "12px 16px", textAlign: "center" }}>
                                                {log.status === "Present" && <span className="badge badge-green" style={{ fontSize: 9.5, padding: "2px 8px" }}>PRESENT</span>}
                                                {log.status === "Late" && <span className="badge badge-yellow" style={{ fontSize: 9.5, padding: "2px 8px" }}>LATE</span>}
                                                {log.status === "Absent" && <span className="badge badge-red" style={{ fontSize: 9.5, padding: "2px 8px" }}>ABSENT</span>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="smp-empty" style={{ padding: 48 }}>
                                <span style={{ fontSize: 24 }}>🔍</span>
                                <p style={{ margin: "8px 0 0", fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.6)" }}>No Matching Registry Logs Found</p>
                                <p style={{ margin: "4px 0 0", fontSize: 12, color: "rgba(255,255,255,0.35)" }}>Modify your filter queries to search through historical class lists.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Detailed Course Logs Modal Component ──── */}
            {activeDetailCourse && (
                <div style={{
                    position: "fixed",
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: "rgba(15, 23, 42, 0.75)",
                    backdropFilter: "blur(8px)",
                    zIndex: 2000,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    animation: "modal-fade-in 0.25s ease-out"
                }}>
                    <div className="smp-card" style={{
                        width: "90%",
                        maxWidth: "520px",
                        maxHeight: "80vh",
                        display: "flex",
                        flexDirection: "column",
                        animation: "modal-slide-up 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                        border: "1px solid rgba(167, 139, 250, 0.3)"
                    }}>
                        {/* Modal Header */}
                        <div className="smp-card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <span style={{
                                    fontSize: 11,
                                    fontWeight: 800,
                                    padding: "2px 6px",
                                    borderRadius: 6,
                                    background: "rgba(167, 139, 250, 0.15)",
                                    color: "#c084fc",
                                    border: "1px solid rgba(167, 139, 250, 0.3)"
                                }}>
                                    {activeDetailCourse.courseCode}
                                </span>
                                <div>
                                    <h2 style={{ margin: 0, fontSize: 14 }}>{activeDetailCourse.courseName}</h2>
                                    <p style={{ margin: "1px 0 0", fontSize: 10, color: "rgba(255,255,255,0.4)" }}>Instructor: {activeDetailCourse.instructor}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setActiveDetailCourse(null)}
                                style={{
                                    background: "rgba(255,255,255,0.08)",
                                    border: "1px solid rgba(255,255,255,0.15)",
                                    borderRadius: "50%",
                                    width: 28, height: 28,
                                    color: "#fff",
                                    cursor: "pointer",
                                    display: "flex", alignItems: "center", justifyContent: "center"
                                }}
                            >
                                ✕
                            </button>
                        </div>

                        {/* Modal Scrollable Content */}
                        <div style={{ overflowY: "auto", padding: "16px 20px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, background: "rgba(255,255,255,0.03)", padding: "10px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)" }}>
                                <div style={{ textAlign: "center" }}>
                                    <div style={{ fontSize: 14, fontWeight: 800 }}>{activeDetailCourse.conducted}</div>
                                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>Conducted</div>
                                </div>
                                <div style={{ textAlign: "center" }}>
                                    <div style={{ fontSize: 14, fontWeight: 800, color: "#34d399" }}>{activeDetailCourse.attended}</div>
                                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>Attended</div>
                                </div>
                                <div style={{ textAlign: "center" }}>
                                    <div style={{ fontSize: 14, fontWeight: 800, color: "#f87171" }}>{activeDetailCourse.absent}</div>
                                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>Absent</div>
                                </div>
                                <div style={{ textAlign: "center" }}>
                                    <div style={{ fontSize: 14, fontWeight: 800, color: "#38bdf8" }}>
                                        {getPercentage(activeDetailCourse.attended, activeDetailCourse.conducted)}%
                                    </div>
                                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>Ratio</div>
                                </div>
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                <h4 style={{ margin: "0 0 4px", fontSize: 11, fontWeight: 800, textTransform: "uppercase", color: "#a78bfa" }}>
                                    Timeline Log Registry
                                </h4>
                                {logs.filter(log => log.courseCode === activeDetailCourse.courseCode).map((log, index) => (
                                    <div key={log.id} style={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        justifyContent: "space-between",
                                        padding: "10px 12px",
                                        borderRadius: 8,
                                        border: "1px solid rgba(255,255,255,0.06)",
                                        background: "rgba(255,255,255,0.01)"
                                    }}>
                                        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                                            <span style={{ fontSize: 14, marginTop: 1 }}>📅</span>
                                            <div>
                                                <div style={{ fontSize: 12, fontWeight: 700 }}>{log.topic}</div>
                                                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", marginTop: 2 }}>
                                                    {new Date(log.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })} ({log.day}) • {log.checkIn}
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            {log.status === "Present" && <span className="badge badge-green" style={{ fontSize: 8.5, padding: "1px 6px" }}>P</span>}
                                            {log.status === "Late" && <span className="badge badge-yellow" style={{ fontSize: 8.5, padding: "1px 6px" }}>L</span>}
                                            {log.status === "Absent" && <span className="badge badge-red" style={{ fontSize: 8.5, padding: "1px 6px" }}>A</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Keyframes Style Injector ────────────────── */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes modal-fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes modal-slide-up {
                    from { transform: scale(0.9) translateY(20px); opacity: 0; }
                    to { transform: scale(1) translateY(0); opacity: 1; }
                }
                .pulse-glow-eligible {
                    box-shadow: 0 0 15px rgba(56, 161, 105, 0.4);
                    border: 1px solid rgba(56, 161, 105, 0.6) !important;
                }
                .pulse-glow-shortage {
                    box-shadow: 0 0 15px rgba(233, 160, 32, 0.4);
                    border: 1px solid rgba(233, 160, 32, 0.6) !important;
                }
                .pulse-glow-danger {
                    box-shadow: 0 0 15px rgba(229, 62, 62, 0.4);
                    border: 1px solid rgba(229, 62, 62, 0.6) !important;
                }
            `}} />
        </div>
    );
}

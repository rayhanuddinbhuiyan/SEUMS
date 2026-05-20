import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import teacherIcon from "../../assets/icons/teacher.png";
import "./StudentModule.css";

const DEFAULT_FACULTIES = [
    {
        id: 1,
        name: "Dr. Rayhan Uddin",
        role: "Associate Professor & Chairman",
        department: "CSE",
        room: "Room 402, Main Building",
        email: "rayhan.uddin@seu.edu.bd",
        specialization: ["Computer Networks", "Cyber Security", "Cryptography"],
        status: "Available", // Available, Online, In Meeting, On Leave
        bio: "Dr. Rayhan Uddin holds a Ph.D. in Computer Networks and has over 15 years of academic and industry experience. His research focuses on network security protocols, threat mitigation, and VLSM architectures.",
        consultationSlots: [
            { day: "Monday", time: "10:00 AM - 12:00 PM" },
            { day: "Wednesday", time: "02:00 PM - 04:00 PM" }
        ],
        courses: ["CSE-301: Computer Networks", "CSE-305: Algorithms"]
    },
    {
        id: 2,
        name: "Dr. Farhana Alam",
        role: "Professor",
        department: "CSE",
        room: "Room 511, IT Building",
        email: "farhana.alam@seu.edu.bd",
        specialization: ["Artificial Intelligence", "Deep Learning", "Computer Vision"],
        status: "In Meeting",
        bio: "Dr. Farhana is a leading researcher in Artificial Intelligence. She has published over 40 journals and actively advises the SEU Robotics & AI Hub. Her research is focused on convolutional neural networks and autonomous systems.",
        consultationSlots: [
            { day: "Sunday", time: "09:00 AM - 11:00 AM" },
            { day: "Thursday", time: "01:00 PM - 03:00 PM" }
        ],
        courses: ["CSE-401: Artificial Intelligence", "CSE-409: Neural Networks"]
    },
    {
        id: 3,
        name: "Prof. H. Rahman",
        role: "Professor & Dean of Engineering",
        department: "CSE",
        room: "Room 401, Main Building",
        email: "h.rahman@seu.edu.bd",
        specialization: ["Data Structures", "Algorithms", "Formal Languages"],
        status: "Online",
        bio: "Prof. H. Rahman is one of the founding members of the SEU Engineering Faculty. His textbooks on Algorithms are widely used in national curricula, and he has mentored hundreds of software engineers.",
        consultationSlots: [
            { day: "Tuesday", time: "11:00 AM - 01:00 PM" },
            { day: "Wednesday", time: "11:00 AM - 01:00 PM" }
        ],
        courses: ["CSE-205: Data Structures & Algorithms"]
    },
    {
        id: 4,
        name: "Ms. Tasnim Tabassum",
        role: "Senior Lecturer",
        department: "English",
        room: "Room 304, Humanities Block",
        email: "tasnim.t@seu.edu.bd",
        specialization: ["Academic Writing", "Linguistics", "Critical Thinking"],
        status: "Available",
        bio: "Ms. Tasnim has an M.A. in Applied Linguistics. She runs the SEU Writing Center and focuses on enhancing research paper writing, composition, and presentation skills for undergraduate students.",
        consultationSlots: [
            { day: "Monday", time: "09:00 AM - 11:00 AM" },
            { day: "Tuesday", time: "02:00 PM - 04:00 PM" }
        ],
        courses: ["ENG-101: Academic Writing & Composition"]
    },
    {
        id: 5,
        name: "Dr. S. M. K. Hasan",
        role: "Assistant Professor",
        department: "EEE",
        room: "Room 203, Lab Building",
        email: "smk.hasan@seu.edu.bd",
        specialization: ["VLSI Design", "Solid State Devices", "Robotics"],
        status: "On Leave",
        bio: "Dr. Hasan specializes in VLSI design and microchip fabrication. He coordinates EEE lab courses and serves as the advisor to the SEU Electronics Club, leading research in industrial automation.",
        consultationSlots: [
            { day: "Sunday", time: "02:00 PM - 04:00 PM" },
            { day: "Thursday", time: "10:00 AM - 12:00 PM" }
        ],
        courses: ["EEE-201: Microelectronics", "EEE-303: Digital VLSI"]
    },
    {
        id: 6,
        name: "Prof. M. A. Karim",
        role: "Professor",
        department: "BBA",
        room: "Room 602, Business Building",
        email: "ma.karim@seu.edu.bd",
        specialization: ["Corporate Finance", "Portfolio Management", "Macroeconomics"],
        status: "Online",
        bio: "Prof. M. A. Karim is a senior economist and financial strategist with over 20 years of experience. He is a corporate consultant and handles executive training seminars for business leadership courses.",
        consultationSlots: [
            { day: "Tuesday", time: "10:00 AM - 12:00 PM" },
            { day: "Thursday", time: "03:00 PM - 05:00 PM" }
        ],
        courses: ["BUS-302: Financial Management", "BUS-401: Economics"]
    }
];

export default function Faculties() {
    const navigate = useNavigate();

    // Directory State
    const [faculties, setFaculties] = useState([]);
    const [bookings, setBookings] = useState([]);

    // Filter States
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDept, setSelectedDept] = useState("All");
    const [selectedStatus, setSelectedStatus] = useState("All");

    // Modal Active State
    const [activeFaculty, setActiveFaculty] = useState(null);

    // Consultation Form States
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [agenda, setAgenda] = useState("");
    const [bookingDate, setBookingDate] = useState("");
    const [bookingCourse, setBookingCourse] = useState("");
    const [bookingSuccess, setBookingSuccess] = useState(false);

    // Initial Database Seeding
    useEffect(() => {
        if (!localStorage.getItem("seu_faculties")) {
            localStorage.setItem("seu_faculties", JSON.stringify(DEFAULT_FACULTIES));
        }
        if (!localStorage.getItem("seu_faculty_bookings")) {
            localStorage.setItem("seu_faculty_bookings", JSON.stringify([]));
        }

        setFaculties(JSON.parse(localStorage.getItem("seu_faculties")));
        setBookings(JSON.parse(localStorage.getItem("seu_faculty_bookings")));
    }, []);

    // Filter Logic
    const filteredFaculties = faculties.filter((f) => {
        const matchesSearch = 
            f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            f.specialization.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
            f.room.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesDept = selectedDept === "All" || f.department === selectedDept;
        
        const matchesStatus = selectedStatus === "All" || f.status === selectedStatus;

        return matchesSearch && matchesDept && matchesStatus;
    });

    // Handle consultation slot selection
    const handleSlotClick = (slot) => {
        setSelectedSlot(slot);
        setBookingSuccess(false);
    };

    // Submitting simulated appointment booking
    const handleBookConsultation = (e) => {
        e.preventDefault();
        if (!selectedSlot || !bookingDate || !agenda || !bookingCourse) {
            alert("Please fill out all booking fields and select a consultation slot!");
            return;
        }

        const newBooking = {
            id: Date.now(),
            facultyId: activeFaculty.id,
            facultyName: activeFaculty.name,
            facultyDept: activeFaculty.department,
            slotDay: selectedSlot.day,
            slotTime: selectedSlot.time,
            date: bookingDate,
            course: bookingCourse,
            agenda: agenda,
            status: "CONFIRMED"
        };

        const updatedBookings = [newBooking, ...bookings];
        localStorage.setItem("seu_faculty_bookings", JSON.stringify(updatedBookings));
        setBookings(updatedBookings);

        setBookingSuccess(true);
        setAgenda("");
        setBookingDate("");
        setBookingCourse("");
        setSelectedSlot(null);

        // Flash screen message and close modal after 1.5s
        setTimeout(() => {
            setBookingSuccess(false);
            setActiveFaculty(null);
        }, 1500);
    };

    // Cancel existing consultation
    const handleCancelBooking = (bookingId) => {
        const updated = bookings.filter(b => b.id !== bookingId);
        localStorage.setItem("seu_faculty_bookings", JSON.stringify(updated));
        setBookings(updated);
    };

    // Helper for Status Badge indicator rings
    const getStatusIndicator = (status) => {
        switch (status) {
            case "Available":
                return <span className="fac-status-indicator fac-status-available" title="Available on Campus" />;
            case "Online":
                return <span className="fac-status-indicator fac-status-online" title="Online via LMS" />;
            case "In Meeting":
                return <span className="fac-status-indicator fac-status-busy" title="Currently Busy/In Meeting" />;
            case "On Leave":
                return <span className="fac-status-indicator fac-status-leave" title="On Leave" />;
            default:
                return <span className="fac-status-indicator fac-status-offline" />;
        }
    };

    // Helper for initials
    const getInitials = (name) => {
        const parts = name.replace("Dr. ", "").replace("Prof. ", "").replace("Ms. ", "").split(" ");
        if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
        return parts[0] ? parts[0][0].toUpperCase() : "F";
    };

    return (
        <div className="smp-page">
            
            {/* ── Top Bar ──────────────────────────────────── */}
            <div className="smp-topbar">
                <button className="smp-back-btn" onClick={() => navigate("/student-dashboard")}>←</button>
                <div className="smp-topbar-title">
                    <h1>Faculties Directory</h1>
                    <p>Southeast University • Office Hours & Consultation Hub</p>
                </div>
                <span className="smp-topbar-icon" style={{ display: "flex", alignItems: "center" }}>
                    <img src={teacherIcon} alt="Faculties" style={{ width: 28, height: 28, objectFit: "contain" }} />
                </span>
            </div>

            {/* ── Content Area ─────────────────────────────── */}
            <div className="smp-content">

                {/* ── Active Bookings Widget ─────────────────── */}
                {bookings.length > 0 && (
                    <div className="smp-card fac-bookings-widget" style={{
                        background: "rgba(30, 27, 75, 0.25)",
                        border: "1px solid rgba(167, 139, 250, 0.25)",
                        boxShadow: "0 8px 32px 0 rgba(167, 139, 250, 0.05)"
                    }}>
                        <div className="smp-card-header" style={{ borderBottom: "1px solid rgba(167, 139, 250, 0.15)" }}>
                            <span>📅</span>
                            <h2 style={{ color: "#c084fc" }}>My Scheduled Consultations ({bookings.length})</h2>
                        </div>
                        <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
                            {bookings.map(b => (
                                <div key={b.id} className="fac-booking-item" style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "12px 16px",
                                    borderRadius: 12,
                                    background: "rgba(255, 255, 255, 0.03)",
                                    border: "1px solid rgba(255, 255, 255, 0.06)",
                                    flexWrap: "wrap",
                                    gap: 12
                                }}>
                                    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                                        <span style={{ fontSize: 20 }}>👤</span>
                                        <div>
                                            <div style={{ fontWeight: 700, fontSize: 13.5 }}>{b.facultyName}</div>
                                            <div style={{ fontSize: 10, color: "rgba(255, 255, 255, 0.4)", marginTop: 2 }}>
                                                {b.facultyDept} Department • Room Office
                                            </div>
                                            <div style={{ fontSize: 11.5, color: "#86efac", fontWeight: 600, marginTop: 4 }}>
                                                📅 {b.date} ({b.slotDay}) • ⏰ {b.slotTime}
                                            </div>
                                            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", marginTop: 6, fontStyle: "italic" }}>
                                                <strong>Topic:</strong> {b.agenda}
                                            </div>
                                            <div style={{ fontSize: 10, color: "#a78bfa", marginTop: 4 }}>
                                                <strong>Course:</strong> {b.course}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                        <span className="badge badge-green" style={{ fontSize: 9, padding: "2px 8px" }}>CONFIRMED</span>
                                        <button 
                                            onClick={() => handleCancelBooking(b.id)}
                                            style={{
                                                background: "rgba(239, 68, 68, 0.12)",
                                                border: "1px solid rgba(239, 68, 68, 0.25)",
                                                borderRadius: 8,
                                                padding: "6px 10px",
                                                color: "#fca5a5",
                                                fontSize: 11,
                                                fontWeight: 700,
                                                cursor: "pointer",
                                                transition: "all 0.2s"
                                            }}
                                            onMouseOver={(e) => { e.target.style.background = "rgba(239, 68, 68, 0.25)"; }}
                                            onMouseOut={(e) => { e.target.style.background = "rgba(239, 68, 68, 0.12)"; }}
                                        >
                                            ✕ Cancel
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── Filters Card ───────────────────────────── */}
                <div className="smp-card fac-filter-card" style={{ padding: "16px 20px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                        
                        {/* Keyword Search */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            <label style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.5, color: "#a78bfa" }}>
                                Search Faculty
                            </label>
                            <input 
                                type="text"
                                placeholder="Search by name, specialization, room..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    border: "1px solid rgba(255, 255, 255, 0.15)",
                                    borderRadius: 10,
                                    padding: "10px 12px",
                                    fontSize: 13,
                                    color: "#fff",
                                    background: "rgba(255, 255, 255, 0.05)",
                                    outline: "none"
                                }}
                            />
                        </div>

                        {/* Department Dropdown */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            <label style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.5, color: "#a78bfa" }}>
                                Filter Department
                            </label>
                            <select
                                value={selectedDept}
                                onChange={(e) => setSelectedDept(e.target.value)}
                                style={{
                                    border: "1px solid rgba(255, 255, 255, 0.15)",
                                    borderRadius: 10,
                                    padding: "10px 12px",
                                    fontSize: 13,
                                    color: "#fff",
                                    background: "rgba(255, 255, 255, 0.05)",
                                    outline: "none",
                                    cursor: "pointer"
                                }}
                            >
                                <option value="All" style={{ background: "#1e1b4b" }}>All Departments</option>
                                <option value="CSE" style={{ background: "#1e1b4b" }}>Computer Science & Eng. (CSE)</option>
                                <option value="EEE" style={{ background: "#1e1b4b" }}>Electrical & Electronics (EEE)</option>
                                <option value="BBA" style={{ background: "#1e1b4b" }}>School of Business (BBA)</option>
                                <option value="English" style={{ background: "#1e1b4b" }}>Department of English</option>
                            </select>
                        </div>

                        {/* Availability Status Filter */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            <label style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.5, color: "#a78bfa" }}>
                                Live Availability Status
                            </label>
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                style={{
                                    border: "1px solid rgba(255, 255, 255, 0.15)",
                                    borderRadius: 10,
                                    padding: "10px 12px",
                                    fontSize: 13,
                                    color: "#fff",
                                    background: "rgba(255, 255, 255, 0.05)",
                                    outline: "none",
                                    cursor: "pointer"
                                }}
                            >
                                <option value="All" style={{ background: "#1e1b4b" }}>All Statuses</option>
                                <option value="Available" style={{ background: "#1e1b4b" }}>🟢 Available on Campus</option>
                                <option value="Online" style={{ background: "#1e1b4b" }}>🔵 Online on LMS</option>
                                <option value="In Meeting" style={{ background: "#1e1b4b" }}>🟡 Busy / In Meeting</option>
                                <option value="On Leave" style={{ background: "#1e1b4b" }}>🔴 On Leave</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* ── Faculties Directory Grid ────────────────── */}
                {filteredFaculties.length > 0 ? (
                    <div className="smp-faculty-grid" style={{ padding: 0 }}>
                        {filteredFaculties.map((f) => (
                            <div key={f.id} className="smp-faculty-card fac-hover-card" style={{
                                position: "relative",
                                overflow: "hidden",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                height: "100%",
                                boxSizing: "border-box"
                            }}>
                                
                                {/* Status Orb Ring */}
                                <div style={{ position: "absolute", top: 12, right: 12, display: "flex", alignItems: "center" }}>
                                    {getStatusIndicator(f.status)}
                                    <span style={{ fontSize: 9.5, fontWeight: 700, color: "rgba(255, 255, 255, 0.45)", marginLeft: 6 }}>
                                        {f.status}
                                    </span>
                                </div>

                                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    
                                    {/* Initials Avatar */}
                                    <div className="smp-faculty-avatar" style={{
                                        position: "relative",
                                        background: "rgba(167, 139, 250, 0.1)",
                                        border: "2.5px solid rgba(167, 139, 250, 0.3)",
                                        color: "#c084fc",
                                        fontWeight: 800,
                                        width: 60, height: 60,
                                        borderRadius: "50%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: 20
                                    }}>
                                        {getInitials(f.name)}
                                    </div>

                                    {/* Titles */}
                                    <h3 className="smp-faculty-name" style={{ margin: "10px 0 2px", fontSize: 15.5 }}>
                                        {f.name}
                                    </h3>
                                    <p className="smp-faculty-role" style={{ margin: "0 0 4px", fontSize: 11, fontWeight: 600 }}>
                                        {f.role}
                                    </p>
                                    <span className="smp-faculty-dept" style={{
                                        fontSize: 10.5,
                                        fontWeight: 700,
                                        background: "rgba(255, 255, 255, 0.06)",
                                        padding: "2px 8px",
                                        borderRadius: 6,
                                        color: "#a78bfa"
                                    }}>
                                        {f.department} Department
                                    </span>

                                    {/* Research Interests Tags */}
                                    <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center", margin: "12px 0" }}>
                                        {f.specialization.map((spec, i) => (
                                            <span key={i} style={{
                                                fontSize: 9.5,
                                                padding: "2.5px 6px",
                                                borderRadius: 6,
                                                background: "rgba(167, 139, 250, 0.08)",
                                                border: "1px solid rgba(167, 139, 250, 0.15)",
                                                color: "rgba(255,255,255,0.85)"
                                            }}>
                                                {spec}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.06)", paddingTop: 12, display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
                                    
                                    {/* Room details */}
                                    <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.5)", textAlign: "center" }}>
                                        📍 {f.room}
                                    </div>

                                    {/* Contact Options */}
                                    <div style={{ display: "flex", gap: 8, width: "100%" }}>
                                        <a 
                                            href={`mailto:${f.email}`}
                                            className="fac-btn-outline"
                                            style={{
                                                flex: 1,
                                                textAlign: "center",
                                                textDecoration: "none",
                                                fontSize: 12,
                                                padding: "8px 0",
                                                borderRadius: 8,
                                                fontWeight: 700,
                                                border: "1px solid rgba(255,255,255,0.12)",
                                                background: "rgba(255,255,255,0.03)",
                                                color: "#fff",
                                                cursor: "pointer",
                                                transition: "all 0.2s"
                                            }}
                                            onMouseOver={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.3)"; e.target.style.background = "rgba(255,255,255,0.07)"; }}
                                            onMouseOut={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.12)"; e.target.style.background = "rgba(255,255,255,0.03)"; }}
                                        >
                                            📧 Email
                                        </a>
                                        <button 
                                            onClick={() => {
                                                setActiveFaculty(f);
                                                setSelectedSlot(null);
                                                setBookingSuccess(false);
                                            }}
                                            className="fac-btn-primary"
                                            style={{
                                                flex: 1.5,
                                                fontSize: 12,
                                                padding: "8px 0",
                                                borderRadius: 8,
                                                fontWeight: 800,
                                                border: "none",
                                                background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
                                                color: "#fff",
                                                cursor: "pointer",
                                                transition: "all 0.2s"
                                            }}
                                            onMouseOver={(e) => { e.target.style.filter = "brightness(1.15)"; }}
                                            onMouseOut={(e) => { e.target.style.filter = "none"; }}
                                        >
                                            📅 Book Consult
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="smp-empty smp-card" style={{ padding: 48 }}>
                        <span style={{ fontSize: 32 }}>🔍</span>
                        <p style={{ margin: "12px 0 0", fontSize: 16, fontWeight: 700, color: "rgba(255,255,255,0.6)" }}>No Faculties Found</p>
                        <p style={{ margin: "4px 0 0", fontSize: 13, color: "rgba(255,255,255,0.35)" }}>Modify your filter variables or search keywords to check historical profiles.</p>
                    </div>
                )}
            </div>

            {/* ── Consultation Booking & Profile Slide-over ── */}
            {activeFaculty && (
                <div className="fac-slideover-backdrop" onClick={() => setActiveFaculty(null)}>
                    <div className="fac-slideover-panel" onClick={(e) => e.stopPropagation()}>
                        
                        {/* Slide-over Header */}
                        <div className="fac-slideover-header">
                            <div>
                                <h2 style={{ margin: 0, fontSize: 16, color: "#fff" }}>Faculty Profile Details</h2>
                                <p style={{ margin: "2px 0 0", fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Southeast University Consultation Scheduler</p>
                            </div>
                            <button className="fac-close-btn" onClick={() => setActiveFaculty(null)}>✕</button>
                        </div>

                        {/* Slide-over Content */}
                        <div className="fac-slideover-body">
                            
                            {/* Short Profile Info */}
                            <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 20 }}>
                                <div style={{
                                    background: "rgba(139, 92, 246, 0.15)",
                                    border: "2px solid rgba(139, 92, 246, 0.3)",
                                    borderRadius: "50%",
                                    width: 52, height: 52,
                                    fontSize: 18, fontWeight: 800,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    color: "#c084fc"
                                }}>
                                    {getInitials(activeFaculty.name)}
                                </div>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: 16 }}>{activeFaculty.name}</h3>
                                    <p style={{ margin: "1px 0 0", fontSize: 11.5, color: "#a78bfa", fontWeight: 600 }}>{activeFaculty.role}</p>
                                    <p style={{ margin: "2px 0 0", fontSize: 10.5, color: "rgba(255,255,255,0.5)" }}>📧 {activeFaculty.email} • 📍 {activeFaculty.room}</p>
                                </div>
                            </div>

                            {/* Biography */}
                            <div style={{ marginBottom: 20 }}>
                                <h4 style={{ margin: "0 0 6px", fontSize: 11, fontWeight: 800, textTransform: "uppercase", color: "#a78bfa", letterSpacing: 0.5 }}>Biography</h4>
                                <p style={{ margin: 0, fontSize: 12.5, color: "rgba(255, 255, 255, 0.75)", lineHeight: 1.5 }}>{activeFaculty.bio}</p>
                            </div>

                            {/* Courses taught */}
                            <div style={{ marginBottom: 24 }}>
                                <h4 style={{ margin: "0 0 6px", fontSize: 11, fontWeight: 800, textTransform: "uppercase", color: "#a78bfa", letterSpacing: 0.5 }}>Current Courses Taught</h4>
                                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                    {activeFaculty.courses.map((course, idx) => (
                                        <div key={idx} style={{
                                            fontSize: 12,
                                            padding: "8px 12px",
                                            borderRadius: 8,
                                            background: "rgba(255, 255, 255, 0.03)",
                                            border: "1px solid rgba(255, 255, 255, 0.06)"
                                        }}>
                                            📖 {course}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Consultation Booking Simulator */}
                            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 20 }}>
                                <h4 style={{ margin: "0 0 12px", fontSize: 12, fontWeight: 800, textTransform: "uppercase", color: "#c084fc", letterSpacing: 0.5 }}>
                                    📅 Schedule a Consultation
                                </h4>

                                {bookingSuccess ? (
                                    <div style={{
                                        background: "rgba(74, 222, 128, 0.1)",
                                        border: "1px solid rgba(74, 222, 128, 0.3)",
                                        borderRadius: 12,
                                        padding: "16px 20px",
                                        textAlign: "center",
                                        animation: "modal-fade-in 0.3s ease-out"
                                    }}>
                                        <span style={{ fontSize: 28 }}>✅</span>
                                        <h4 style={{ color: "#86efac", margin: "10px 0 4px", fontSize: 14 }}>Appointment Registered!</h4>
                                        <p style={{ margin: 0, fontSize: 11.5, color: "rgba(255,255,255,0.6)" }}>Consultation session successfully queued in active scheduler dashboard.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleBookConsultation} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                                        
                                        {/* Select Slot */}
                                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                            <label style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>
                                                1. Select Weekly Consultation Slot
                                            </label>
                                            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                                {activeFaculty.consultationSlots.map((slot, index) => {
                                                    const isSelected = selectedSlot?.day === slot.day && selectedSlot?.time === slot.time;
                                                    return (
                                                        <div 
                                                            key={index} 
                                                            onClick={() => handleSlotClick(slot)}
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "space-between",
                                                                alignItems: "center",
                                                                padding: "10px 14px",
                                                                borderRadius: 10,
                                                                cursor: "pointer",
                                                                border: isSelected ? "1.5px solid #a855f7" : "1.5px solid rgba(255,255,255,0.08)",
                                                                background: isSelected ? "rgba(168, 85, 247, 0.12)" : "rgba(255,255,255,0.02)",
                                                                transition: "all 0.2s"
                                                            }}
                                                        >
                                                            <span style={{ fontSize: 12, fontWeight: 700 }}>📅 {slot.day}</span>
                                                            <span style={{ fontSize: 12, color: isSelected ? "#c084fc" : "rgba(255,255,255,0.6)" }}>⏰ {slot.time}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* Input Date */}
                                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                            <label style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>
                                                2. Appointment Date
                                            </label>
                                            <input 
                                                type="date"
                                                required
                                                value={bookingDate}
                                                onChange={(e) => setBookingDate(e.target.value)}
                                                style={{
                                                    border: "1.5px solid rgba(255, 255, 255, 0.12)",
                                                    borderRadius: 10,
                                                    padding: "10px 12px",
                                                    fontSize: 13,
                                                    color: "#fff",
                                                    background: "rgba(255, 255, 255, 0.05)",
                                                    outline: "none"
                                                }}
                                            />
                                        </div>

                                        {/* Select Course Context */}
                                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                            <label style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>
                                                3. Select Course Context
                                            </label>
                                            <select
                                                required
                                                value={bookingCourse}
                                                onChange={(e) => setBookingCourse(e.target.value)}
                                                style={{
                                                    border: "1.5px solid rgba(255, 255, 255, 0.12)",
                                                    borderRadius: 10,
                                                    padding: "10px 12px",
                                                    fontSize: 13,
                                                    color: "#fff",
                                                    background: "rgba(255, 255, 255, 0.05)",
                                                    outline: "none",
                                                    cursor: "pointer"
                                                }}
                                            >
                                                <option value="" disabled style={{ background: "#1e1b4b" }}>Choose course context...</option>
                                                {activeFaculty.courses.map((course, idx) => (
                                                    <option key={idx} value={course} style={{ background: "#1e1b4b" }}>{course}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Input Agenda */}
                                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                            <label style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>
                                                4. Meeting Agenda Description
                                            </label>
                                            <input 
                                                type="text"
                                                required
                                                placeholder="e.g. Discuss Assignment 2 issues..."
                                                value={agenda}
                                                onChange={(e) => setAgenda(e.target.value)}
                                                style={{
                                                    border: "1.5px solid rgba(255, 255, 255, 0.12)",
                                                    borderRadius: 10,
                                                    padding: "10px 12px",
                                                    fontSize: 13,
                                                    color: "#fff",
                                                    background: "rgba(255, 255, 255, 0.05)",
                                                    outline: "none"
                                                }}
                                            />
                                        </div>

                                        {/* Submit button */}
                                        <button 
                                            type="submit"
                                            style={{
                                                background: "linear-gradient(135deg, #a855f7 0%, #6366f1 100%)",
                                                border: "none",
                                                borderRadius: 10,
                                                padding: "12px",
                                                fontSize: 13.5,
                                                fontWeight: 800,
                                                color: "#fff",
                                                cursor: "pointer",
                                                transition: "all 0.2s"
                                            }}
                                            onMouseOver={(e) => { e.target.style.filter = "brightness(1.1)"; }}
                                            onMouseOut={(e) => { e.target.style.filter = "none"; }}
                                        >
                                            Confirm Consultation Session
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Keyframe Animations Injector ─────────────── */}
            <style dangerouslySetInnerHTML={{__html: `
                .fac-hover-card {
                    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
                }
                .fac-hover-card:hover {
                    transform: translateY(-4px) scale(1.01);
                    border-color: rgba(167, 139, 250, 0.35) !important;
                    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35), 0 0 15px rgba(167, 139, 250, 0.1) !important;
                    background: rgba(255, 255, 255, 0.07) !important;
                }
                .fac-status-indicator {
                    display: inline-block;
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                }
                .fac-status-available {
                    background: #34d399;
                    box-shadow: 0 0 8px #34d399;
                    animation: fac-pulse 2s infinite;
                }
                .fac-status-online {
                    background: #38bdf8;
                    box-shadow: 0 0 8px #38bdf8;
                    animation: fac-pulse 2.2s infinite;
                }
                .fac-status-busy {
                    background: #fbbf24;
                    box-shadow: 0 0 8px #fbbf24;
                }
                .fac-status-leave {
                    background: #f87171;
                }
                .fac-status-offline {
                    background: #94a3b8;
                }
                @keyframes fac-pulse {
                    0% { transform: scale(0.95); opacity: 0.9; }
                    50% { transform: scale(1.1); opacity: 1; box-shadow: 0 0 12px currentColor; }
                    100% { transform: scale(0.95); opacity: 0.9; }
                }
                .fac-slideover-backdrop {
                    position: fixed;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(15, 23, 42, 0.65);
                    backdrop-filter: blur(6px);
                    z-index: 1000;
                    display: flex;
                    justify-content: flex-end;
                    animation: fac-fade-in 0.25s ease-out;
                }
                .fac-slideover-panel {
                    width: 100%;
                    maxWidth: 420px;
                    height: 100%;
                    background: rgba(15, 23, 42, 0.92);
                    backdrop-filter: blur(12px);
                    border-left: 1px solid rgba(255, 255, 255, 0.1);
                    display: flex;
                    flex-direction: column;
                    box-sizing: border-box;
                    animation: fac-slide-in 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
                    box-shadow: -10px 0 32px rgba(0, 0, 0, 0.5);
                }
                .fac-slideover-header {
                    padding: 20px 24px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .fac-close-btn {
                    background: rgba(255, 255, 255, 0.08);
                    border: 1px solid rgba(255, 255, 255, 0.12);
                    width: 28px; height: 28px;
                    border-radius: 50%;
                    color: #fff;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .fac-slideover-body {
                    flex: 1;
                    overflow-y: auto;
                    padding: 24px;
                    box-sizing: border-box;
                }
                @keyframes fac-fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes fac-slide-in {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
            `}} />
        </div>
    );
}

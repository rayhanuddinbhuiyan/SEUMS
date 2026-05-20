import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import presenterIcon from "../../assets/icons/presenter.png";
import "./StudentModule.css";

export default function TodaysLecture() {
    const navigate = useNavigate();
    const [materials, setMaterials] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("All");
    const [selectedType, setSelectedType] = useState("All");
    const [downloadingId, setDownloadingId] = useState(null);
    const [toastMessage, setToastMessage] = useState("");

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("seu_materials") || "[]");
        setMaterials(stored);
    }, []);

    // Get list of unique courses for filters
    const courses = ["All", ...new Set(materials.map((m) => m.courseCode))];
    const types = ["All", "PDF", "Slide", "Video", "Zip"];

    // Filter materials
    const filtered = materials.filter((m) => {
        const matchesSearch = 
            m.title.toLowerCase().includes(search.toLowerCase()) ||
            m.description.toLowerCase().includes(search.toLowerCase()) ||
            (m.teacherName && m.teacherName.toLowerCase().includes(search.toLowerCase())) ||
            m.courseCode.toLowerCase().includes(search.toLowerCase());
        
        const matchesCourse = selectedCourse === "All" || m.courseCode === selectedCourse;
        const matchesType = selectedType === "All" || m.type === selectedType;

        return matchesSearch && matchesCourse && matchesType;
    });

    const handleDownload = (id, title) => {
        if (downloadingId) return; // Prevent double download clicks
        setDownloadingId(id);
        
        // Simulate downloading animation (1.5 seconds)
        setTimeout(() => {
            setDownloadingId(null);
            setToastMessage(`"${title}" downloaded successfully!`);
            
            // Auto hide toast after 3 seconds
            setTimeout(() => {
                setToastMessage("");
            }, 3000);
        }, 1500);
    };

    const getFileIcon = (type) => {
        switch (type.toUpperCase()) {
            case "PDF": return "📄";
            case "SLIDE": return "📊";
            case "VIDEO": return "🎥";
            case "ZIP": return "📦";
            default: return "📝";
        }
    };

    return (
        <div className="smp-page">
            {/* ── Top Bar ──────────────────────────────────── */}
            <div className="smp-topbar">
                <button className="smp-back-btn" onClick={() => navigate("/student-dashboard")}>←</button>
                <div className="smp-topbar-title">
                    <h1>Today&apos;s Lecture Hub</h1>
                    <p>Southeast University • Academic Portal</p>
                </div>
                <span className="smp-topbar-icon" style={{ display: "flex", alignItems: "center" }}>
                    <img src={presenterIcon} alt="Today's Lecture" style={{ width: 28, height: 28, objectFit: "contain" }} />
                </span>
            </div>

            {/* ── Content Area ─────────────────────────────── */}
            <div className="smp-content">
                
                {/* ── Filter Controls Panel ──────────────────── */}
                <div className="smp-card tl-filters-card" style={{ padding: "16px 20px" }}>
                    <div className="tl-filters-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14 }}>
                        {/* Search */}
                        <div className="tl-filter-group" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            <label style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, color: "#a78bfa" }}>Search Lecture</label>
                            <input 
                                type="text" 
                                placeholder="Search title or teacher..." 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                style={{
                                    border: "1.5px solid rgba(255, 255, 255, 0.15)",
                                    borderRadius: 10,
                                    padding: "10px 12px",
                                    fontSize: 13,
                                    color: "#fff",
                                    background: "rgba(255, 255, 255, 0.05)",
                                    outline: "none"
                                }}
                            />
                        </div>

                        {/* Course Code */}
                        <div className="tl-filter-group" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            <label style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, color: "#a78bfa" }}>Course</label>
                            <select 
                                value={selectedCourse}
                                onChange={(e) => setSelectedCourse(e.target.value)}
                                style={{
                                    border: "1.5px solid rgba(255, 255, 255, 0.15)",
                                    borderRadius: 10,
                                    padding: "10px 12px",
                                    fontSize: 13,
                                    color: "#fff",
                                    background: "rgba(255, 255, 255, 0.05)",
                                    outline: "none",
                                    cursor: "pointer"
                                }}
                            >
                                {courses.map((c) => (
                                    <option key={c} value={c} style={{ background: "#1e1b4b" }}>{c}</option>
                                ))}
                            </select>
                        </div>

                        {/* Material Type */}
                        <div className="tl-filter-group" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            <label style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, color: "#a78bfa" }}>Resource Type</label>
                            <select 
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                style={{
                                    border: "1.5px solid rgba(255, 255, 255, 0.15)",
                                    borderRadius: 10,
                                    padding: "10px 12px",
                                    fontSize: 13,
                                    color: "#fff",
                                    background: "rgba(255, 255, 255, 0.05)",
                                    outline: "none",
                                    cursor: "pointer"
                                }}
                            >
                                {types.map((t) => (
                                    <option key={t} value={t} style={{ background: "#1e1b4b" }}>{t}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* ── Materials Grid ─────────────────────────── */}
                {filtered.length > 0 ? (
                    <div className="tl-materials-list" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {filtered.map((mat) => (
                            <div key={mat.id} className="smp-card tl-material-card" style={{ display: "flex", flexDirection: "column" }}>
                                <div className="tl-material-header" style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    justifyContent: "space-between",
                                    padding: "16px 20px",
                                    borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                                    gap: 12,
                                    flexWrap: "wrap"
                                }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                        <span style={{
                                            fontSize: 24,
                                            width: 44,
                                            height: 44,
                                            borderRadius: 10,
                                            background: "rgba(255, 255, 255, 0.08)",
                                            border: "1px solid rgba(255, 255, 255, 0.15)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}>
                                            {getFileIcon(mat.type)}
                                        </span>
                                        <div>
                                            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#fff" }}>{mat.title}</h3>
                                            <p style={{ margin: "2px 0 0", fontSize: 11, color: "rgba(255, 255, 255, 0.5)", fontWeight: 500 }}>
                                                Course: <span style={{ color: "#a78bfa", fontWeight: 700 }}>{mat.courseCode}</span> • {mat.courseName}
                                            </p>
                                        </div>
                                    </div>

                                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                                        <span className={`badge badge-gray`} style={{ fontSize: 10, padding: "3px 10px" }}>{mat.type}</span>
                                        <span className={`badge badge-blue`} style={{ fontSize: 10, padding: "3px 10px" }}>{mat.size}</span>
                                    </div>
                                </div>

                                <div className="tl-material-body" style={{ padding: "14px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
                                    <p style={{ margin: 0, fontSize: 13, color: "rgba(255, 255, 255, 0.8)", lineHeight: 1.5 }}>
                                        {mat.description}
                                    </p>

                                    <div style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        borderTop: "1px solid rgba(255, 255, 255, 0.04)",
                                        paddingTop: 12,
                                        flexWrap: "wrap",
                                        gap: 12
                                    }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                            <span style={{ fontSize: 14 }}>👤</span>
                                            <div>
                                                <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: "#fff" }}>{mat.teacherName || "Faculty Member"}</p>
                                                <p style={{ margin: 0, fontSize: 9, color: "rgba(255, 255, 255, 0.4)" }}>Uploaded: {new Date(mat.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                                            </div>
                                        </div>

                                        <button 
                                            onClick={() => handleDownload(mat.id, mat.title)}
                                            style={{
                                                background: downloadingId === mat.id ? "rgba(255, 255, 255, 0.15)" : "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
                                                color: "#fff",
                                                border: "none",
                                                borderRadius: 10,
                                                padding: "10px 18px",
                                                fontSize: 12,
                                                fontWeight: 700,
                                                cursor: downloadingId === mat.id ? "default" : "pointer",
                                                transition: "all 0.2s",
                                                boxShadow: downloadingId === mat.id ? "none" : "0 4px 12px rgba(99, 102, 241, 0.25)",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 8
                                            }}
                                        >
                                            {downloadingId === mat.id ? (
                                                <>
                                                    <span className="tl-download-spinner" style={{
                                                        width: 12,
                                                        height: 12,
                                                        border: "2px solid rgba(255, 255, 255, 0.3)",
                                                        borderTopColor: "#fff",
                                                        borderRadius: "50%",
                                                        animation: "tl-spin 0.8s linear infinite"
                                                    }}></span>
                                                    Securing Link...
                                                </>
                                            ) : (
                                                <>
                                                    <span>⬇</span> Download Resource
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="smp-card smp-empty" style={{ padding: 60, textAlign: "center" }}>
                        <img src={presenterIcon} alt="No lecture material" style={{ width: 64, height: 64, objectFit: "contain", marginBottom: 12, opacity: 0.5 }} />
                        <p style={{ fontSize: 16, fontWeight: 700, color: "#fff", margin: 0 }}>No Materials Found</p>
                        <p style={{ fontSize: 13, color: "#aaa", marginTop: 6, margin: 0 }}>Try clearing search queries or checking other course tabs.</p>
                    </div>
                )}
            </div>

            {/* ── Simulated Toast Notification ───────────── */}
            {toastMessage && (
                <div style={{
                    position: "fixed",
                    bottom: 24,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "rgba(30, 27, 75, 0.95)",
                    border: "1.5px solid rgba(167, 139, 250, 0.4)",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3), 0 0 15px rgba(167, 139, 250, 0.2)",
                    borderRadius: 14,
                    padding: "12px 20px",
                    zIndex: 200,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    animation: "tl-toast-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                }}>
                    <span style={{ fontSize: 16, color: "#86efac" }}>✅</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{toastMessage}</span>
                </div>
            )}

            {/* ── Keyframes Style Injector ────────────────── */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes tl-spin {
                    to { transform: rotate(360deg); }
                }
                @keyframes tl-toast-in {
                    from { transform: translate(-50%, 20px); opacity: 0; }
                    to { transform: translate(-50%, 0); opacity: 1; }
                }
            `}} />
        </div>
    );
}

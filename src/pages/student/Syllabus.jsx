import { useState } from "react";
import { useNavigate } from "react-router-dom";
import syllabusIcon from "../../assets/icons/stack-of-books.png";
import "./StudentModule.css";

const SYLLABI = [
    {
        courseCode: "CSE-301",
        courseName: "Computer Networks",
        credits: "3.0",
        type: "Theory",
        instructor: "Dr. Rayhan Uddin",
        referenceBooks: [
            "Computer Networking: A Top-Down Approach (8th Edition) — Kurose & Ross",
            "Data Communications and Networking — Behrouz A. Forouzan"
        ],
        grading: { mid: 30, final: 40, lab: 20, attend: 10 },
        description: "Covers the fundamental architecture and routing protocols of the global Internet, applying a modern top-down protocol layer framework.",
        modules: [
            "Module 1: Introduction to Network Architecture & Edge Networks",
            "Module 2: Application Layer Protocols (HTTP, DNS, SMTP, Socket Programming)",
            "Module 3: Transport Layer Protocols (Reliable Data Transfer, TCP Congestion Control, UDP)",
            "Module 4: Network Layer Addressing, CIDR Subnetting, and Routing Algorithms (OSPF, BGP)",
            "Module 5: Link Layer Error Detection, Multiple Access Protocols (CSMA/CD), and Local Area Networks (LANs)"
        ]
    },
    {
        courseCode: "CSE-205",
        courseName: "Data Structures",
        credits: "4.0 (3.0 Theory + 1.0 Lab)",
        type: "Theory & Practical",
        instructor: "Prof. H. Rahman",
        referenceBooks: [
            "Data Structures and Algorithms in C++ — Michael T. Goodrich & Roberto Tamassia",
            "Introduction to Algorithms — Cormen, Leiserson, Rivest & Stein"
        ],
        grading: { mid: 30, final: 40, lab: 20, attend: 10 },
        description: "Introduces core linear and non-linear mathematical abstractions of computer data organization, focusing on memory efficiency and speed.",
        modules: [
            "Module 1: Performance Analysis (Big O Notation) and Recursion Concepts",
            "Module 2: Linear Structures: Vectors, Linked Lists, Stacks, and Queues",
            "Module 3: Non-Linear Structures: Binary Trees, Binary Search Trees (BST), and AVL Trees",
            "Module 4: Heaps, Hash Tables, and Priority Queues",
            "Module 5: Sorting & Searching Algorithms, Graph Operations (DFS, BFS, Dijkstra's)"
        ]
    },
    {
        courseCode: "CSE-303",
        courseName: "Database Management Systems",
        credits: "3.0",
        type: "Theory",
        instructor: "Faculty Member",
        referenceBooks: [
            "Database System Concepts (7th Edition) — Silberschatz, Korth & Sudarshan",
            "Fundamentals of Database Systems — Elmasri & Navathe"
        ],
        grading: { mid: 30, final: 40, lab: 15, attend: 15 },
        description: "Introduces standard techniques and tools for modeling relational database warehouses, structured querying, and transactional recovery protocols.",
        modules: [
            "Module 1: Database System Concepts, 3-Schema Architecture, and E-R Diagram Modeling",
            "Module 2: Relational Model, Relational Algebra, and Key Constraints",
            "Module 3: Structured Query Language (SQL): JOINs, Nested Queries, Aggregates, and Triggers",
            "Module 4: Relational Design Theory: Functional Dependencies and Normalization (1NF, 2NF, 3NF, BCNF)",
            "Module 5: Transaction Management: ACID Properties, Serialization, and Concurrency Controls"
        ]
    },
    {
        courseCode: "CSE-401",
        courseName: "Artificial Intelligence",
        credits: "3.0",
        type: "Theory",
        instructor: "Prof. Farhana Alam",
        referenceBooks: [
            "Artificial Intelligence: A Modern Approach (4th Edition) — Stuart Russell & Peter Norvig",
            "Artificial Intelligence: Structures and Strategies for Complex Problem Solving — George F. Luger"
        ],
        grading: { mid: 30, final: 40, lab: 20, attend: 10 },
        description: "Covers computational methods for human-like reasoning, intelligent search techniques, neural nets, and probability reasoning frameworks.",
        modules: [
            "Module 1: Foundations of Intelligent Agents and Searching Paradigms (BFS, DFS, A* Search)",
            "Module 2: Heuristic Search & Constraint Satisfaction Problems (CSP)",
            "Module 3: Adversarial Game Search (Minimax Algorithm, Alpha-Beta Pruning)",
            "Module 4: Knowledge Representation, First-Order Logic, and Expert Systems",
            "Module 5: Introduction to Machine Learning (Classification, Regression, Neural Networks)"
        ]
    }
];

export default function Syllabus() {
    const navigate = useNavigate();
    const [expandedCode, setExpandedCode] = useState("CSE-301"); // First one expanded by default

    const toggleExpand = (code) => {
        setExpandedCode(expandedCode === code ? null : code);
    };

    return (
        <div className="smp-page">
            {/* ── Top Bar ──────────────────────────────────── */}
            <div className="smp-topbar">
                <button className="smp-back-btn" onClick={() => navigate("/student-dashboard")}>←</button>
                <div className="smp-topbar-title">
                    <h1>Course Syllabus Explorer</h1>
                    <p>Southeast University • CSE Curriculum Details</p>
                </div>
                <span className="smp-topbar-icon" style={{ display: "flex", alignItems: "center" }}>
                    <img src={syllabusIcon} alt="Syllabus" style={{ width: 28, height: 28, objectFit: "contain" }} />
                </span>
            </div>

            {/* ── Content Area ─────────────────────────────── */}
            <div className="smp-content">
                <div className="sy-intro-card smp-card" style={{ padding: "16px 20px" }}>
                    <p style={{ margin: 0, fontSize: 13, color: "rgba(255, 255, 255, 0.8)", lineHeight: 1.5 }}>
                        Below are the active syllabus details for your current CSE semester. Click on any course card to expand and view the full module outlines, reference textbooks, and grading distribution profiles.
                    </p>
                </div>

                <div className="sy-accordion" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {SYLLABI.map((sy) => {
                        const isExpanded = expandedCode === sy.courseCode;
                        return (
                            <div 
                                key={sy.courseCode} 
                                className="smp-card sy-card" 
                                style={{ 
                                    transition: "all 0.3s ease",
                                    borderColor: isExpanded ? "rgba(167, 139, 250, 0.3)" : "rgba(255,255,255,0.1)",
                                    boxShadow: isExpanded ? "0 8px 30px rgba(167, 139, 250, 0.15)" : "0 4px 15px rgba(0,0,0,0.2)"
                                }}
                            >
                                {/* Card Title Header (Toggle) */}
                                <div 
                                    onClick={() => toggleExpand(sy.courseCode)}
                                    style={{
                                        padding: "16px 20px",
                                        background: isExpanded ? "rgba(255, 255, 255, 0.04)" : "transparent",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        userSelect: "none"
                                    }}
                                >
                                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                        <span style={{
                                            fontSize: 12,
                                            fontWeight: 800,
                                            padding: "3px 9px",
                                            borderRadius: 8,
                                            background: "rgba(167, 139, 250, 0.15)",
                                            color: "#c084fc",
                                            border: "1px solid rgba(167, 139, 250, 0.3)"
                                        }}>
                                            {sy.courseCode}
                                        </span>
                                        <div>
                                            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#fff" }}>{sy.courseName}</h3>
                                            <p style={{ margin: "2px 0 0", fontSize: 11, color: "rgba(255, 255, 255, 0.5)" }}>
                                                Credits: {sy.credits} • {sy.type}
                                            </p>
                                        </div>
                                    </div>
                                    <span style={{ 
                                        fontSize: 16, 
                                        color: "rgba(255, 255, 255, 0.5)",
                                        transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                                        transition: "transform 0.3s ease"
                                    }}>
                                        ▼
                                    </span>
                                </div>

                                {/* Expanded Content Panel */}
                                {isExpanded && (
                                    <div style={{ 
                                        padding: "20px", 
                                        borderTop: "1px solid rgba(255,255,255,0.06)",
                                        background: "rgba(255, 255, 255, 0.01)",
                                        animation: "sy-slide-down 0.25s cubic-bezier(0.16, 1, 0.3, 1)"
                                    }}>
                                        {/* Description */}
                                        <p style={{ margin: "0 0 16px", fontSize: 13, color: "rgba(255, 255, 255, 0.8)", lineHeight: 1.5, fontStyle: "italic" }}>
                                            &ldquo;{sy.description}&rdquo;
                                        </p>

                                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
                                            {/* Left Column: Modules */}
                                            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                                <h4 style={{ margin: "0 0 4px", fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.5, color: "#a78bfa" }}>
                                                    📋 Syllabus Outline
                                                </h4>
                                                <ul style={{ margin: 0, paddingLeft: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                                                    {sy.modules.map((m, i) => (
                                                        <li key={i} style={{ fontSize: 12.5, color: "rgba(255, 255, 255, 0.9)", lineHeight: 1.4 }}>
                                                            {m}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Right Column: References & Grading */}
                                            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                                                {/* References */}
                                                <div>
                                                    <h4 style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.5, color: "#a78bfa" }}>
                                                        📚 Reference Books
                                                    </h4>
                                                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                                        {sy.referenceBooks.map((book, i) => (
                                                            <div key={i} style={{ 
                                                                background: "rgba(255, 255, 255, 0.03)", 
                                                                border: "1px solid rgba(255,255,255,0.06)", 
                                                                borderRadius: 8, 
                                                                padding: "8px 12px", 
                                                                fontSize: 11.5, 
                                                                color: "rgba(255, 255, 255, 0.9)",
                                                                lineHeight: 1.4
                                                            }}>
                                                                {book}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Grading Profile */}
                                                <div>
                                                    <h4 style={{ margin: "0 0 10px", fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.5, color: "#a78bfa" }}>
                                                        📊 Marks Distribution
                                                    </h4>
                                                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                                        {/* Mid */}
                                                        <div>
                                                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "rgba(255,255,255,0.7)", marginBottom: 4 }}>
                                                                <span>Midterm Exam</span>
                                                                <span style={{ fontWeight: 700, color: "#fff" }}>{sy.grading.mid}%</span>
                                                            </div>
                                                            <div className="smp-progress-wrap" style={{ height: 6 }}>
                                                                <div className="smp-progress-bar good" style={{ width: `${sy.grading.mid}%`, background: "linear-gradient(90deg, #818cf8, #6366f1)" }}></div>
                                                            </div>
                                                        </div>

                                                        {/* Final */}
                                                        <div>
                                                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "rgba(255,255,255,0.7)", marginBottom: 4 }}>
                                                                <span>Semester Final</span>
                                                                <span style={{ fontWeight: 700, color: "#fff" }}>{sy.grading.final}%</span>
                                                            </div>
                                                            <div className="smp-progress-wrap" style={{ height: 6 }}>
                                                                <div className="smp-progress-bar good" style={{ width: `${sy.grading.final}%`, background: "linear-gradient(90deg, #ec4899, #d946ef)" }}></div>
                                                            </div>
                                                        </div>

                                                        {/* Lab */}
                                                        <div>
                                                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "rgba(255,255,255,0.7)", marginBottom: 4 }}>
                                                                <span>Lab & Quizzes</span>
                                                                <span style={{ fontWeight: 700, color: "#fff" }}>{sy.grading.lab}%</span>
                                                            </div>
                                                            <div className="smp-progress-wrap" style={{ height: 6 }}>
                                                                <div className="smp-progress-bar good" style={{ width: `${sy.grading.lab}%`, background: "linear-gradient(90deg, #34d399, #10b981)" }}></div>
                                                            </div>
                                                        </div>

                                                        {/* Attend */}
                                                        <div>
                                                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "rgba(255,255,255,0.7)", marginBottom: 4 }}>
                                                                <span>Attendance / Participation</span>
                                                                <span style={{ fontWeight: 700, color: "#fff" }}>{sy.grading.attend}%</span>
                                                            </div>
                                                            <div className="smp-progress-wrap" style={{ height: 6 }}>
                                                                <div className="smp-progress-bar good" style={{ width: `${sy.grading.attend}%`, background: "linear-gradient(90deg, #fbbf24, #f59e0b)" }}></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ── Keyframes style injection ───────────── */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes sy-slide-down {
                    from { opacity: 0; transform: translateY(-8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}} />
        </div>
    );
}

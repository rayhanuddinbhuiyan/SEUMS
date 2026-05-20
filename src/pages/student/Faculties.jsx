import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import teacherIcon from "../../assets/icons/teacher.png";
import "./StudentModule.css";

// ── Faculty Database ─────────────────────────────────────────────────────────
const DEFAULT_FACULTIES = [
    {
        id: 1,
        name: "Dr. Rayhan Uddin",
        role: "Associate Professor & Chairman",
        department: "CSE",
        room: "Room 402, Main Building",
        email: "rayhan.uddin@seu.edu.bd",
        specialization: ["Computer Networks", "Cyber Security", "Cryptography"],
        status: "Available",
        bio: "Dr. Rayhan Uddin holds a Ph.D. in Computer Networks and has over 15 years of academic and industry experience. His research focuses on network security protocols, threat mitigation, and VLSM architectures.",
        consultationSlots: [
            { day: "Monday", time: "10:00 AM - 12:00 PM" },
            { day: "Wednesday", time: "02:00 PM - 04:00 PM" }
        ],
        courses: ["CSE-301: Computer Networks", "CSE-305: Algorithms"],
        quickSuggestions: [
            "Book a consultation session",
            "I missed my midterm exam/quiz",
            "How do I appeal my grade?",
            "VLSM Subnetting assistance"
        ],
        aiPersonality: "strict but encouraging professor and CSE Chairman. You answer questions about grades, make-up exams, and syllabus with clear rules, but always guide the student on how to improve."
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
        courses: ["CSE-401: Artificial Intelligence", "CSE-409: Neural Networks"],
        quickSuggestions: [
            "Book consultation",
            "Graduation project supervision",
            "How to prepare for AI exams?",
            "Neural network project help"
        ],
        aiPersonality: "enthusiastic AI researcher who encourages innovation. When students ask about projects or research supervision, explain your GPA requirement (minimum 3.3) and look for strong programming skills."
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
        courses: ["CSE-205: Data Structures & Algorithms"],
        quickSuggestions: [
            "Schedule a booking",
            "Need a recommendation letter",
            "I failed the lab evaluation",
            "AVL tree rotations help"
        ],
        aiPersonality: "respected Dean who values academic discipline and logical structure. You give detailed checklists for recommendation letters and stress the importance of understanding data structure complexities."
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
        courses: ["ENG-101: Academic Writing & Composition"],
        quickSuggestions: [
            "Book office meeting",
            "Thesis statement consultation",
            "Format research citations",
            "Grammar or essay check"
        ],
        aiPersonality: "supportive and structured English writing advisor. You guide students step-by-step to improve their prose and help them format citations according to APA guidelines."
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
        courses: ["EEE-201: Microelectronics", "EEE-303: Digital VLSI"],
        quickSuggestions: [
            "Schedule consultation",
            "Missed VLSI lab class",
            "Project proposal review",
            "MOSFET calculation help"
        ],
        aiPersonality: "methodical EEE advisor. You expect students to follow laboratory safety protocols strictly and write detailed lab reports with full schematic analysis."
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
        courses: ["BUS-302: Financial Management", "BUS-401: Economics"],
        quickSuggestions: [
            "Book consultation slot",
            "WACC case study questions",
            "Recommendation for internship",
            "NPV/IRR calculation help"
        ],
        aiPersonality: "experienced finance advisor. You teach students how to apply theoretical finance to corporate decisions. For recommendation letters, you require a brief statement explaining the student's career goals."
    }
];

// ── Local AI Response Engine ─────────────────────────────────────────────────
function getLocalAIResponse(faculty, message) {
    const msg = message.toLowerCase();

    // Slang and Profanity tone filter
    const slangRegex = /\b(yo|bruh|bro|dude|sup|wanna|gonna|hella|fuck|shit|ass|bitch|bastard|crap|damn|idiot|stupid|dumb|fool|jerk|suck|wtf|lmao|omg)\b/i;
    if (slangRegex.test(msg)) {
        return {
            text: `As your professor, I expect a professional and respectful communication tone. Please rephrase your question using appropriate language, and I will be glad to assist you with your academic query.`
        };
    }


    // Check if the student wants to book a slot
    if (msg.includes("book") || msg.includes("schedule") || msg.includes("appointment") || msg.includes("meet") || msg.includes("consultation")) {
        return {
            text: `I would be happy to schedule a consultation with you. Please select one of my official weekly slots below to book it instantly for my next session:`,
            isBookingTrigger: true
        };
    }

    // 1. Grade appeals or re-evaluations
    if (msg.includes("grade") || msg.includes("mark") || msg.includes("result") || msg.includes("fail") || msg.includes("midterm") || msg.includes("script")) {
        return {
            text: `For grade reviews or script checking in my courses:
1. Please download the official Grade Re-evaluation Form from the controller's office.
2. I can only re-examine scripts for total calculation errors or completely unmarked answers.
3. Bring your midterm answer script and class notes to my office (${faculty.room}) during my consultation hours: ${faculty.consultationSlots.map(s => `${s.day} ${s.time}`).join(" or ")}. We will sit together and review it.`
        };
    }

    // 2. Missed exams, quizzes, or lab evaluations
    if (msg.includes("miss") || msg.includes("absent") || msg.includes("make-up") || msg.includes("makeup") || msg.includes("quiz") || msg.includes("test")) {
        return {
            text: `Under Southeast University policies, make-up quizzes or exams are only granted under exceptional circumstances:
- **Medical Emergencies**: Must present an official certificate signed by the SEU Medical Officer.
- **Accidents/Tragedy**: Official letter verified by your parents and the department head.
Please submit the formal application along with supporting documents to my email (${faculty.email}) within 3 days. I will review and let you know if you are approved to sit for the make-up.`
        };
    }

    // 3. Recommendation letter requests
    if (msg.includes("recommendation") || msg.includes("reference") || msg.includes("letter") || msg.includes("lor")) {
        return {
            text: `I am happy to write recommendation letters for students who have performed well in my classes. To process this, please email me at ${faculty.email} with the subject "LOR Request - [Your Name]" containing:
1. Your updated CV and academic transcript showing a minimum CGPA of 3.0.
2. A short paragraph explaining the purpose of the letter (e.g., job application, higher studies abroad).
3. The courses you took with me and the grades you achieved.
Allow me at least 7 working days to write a comprehensive letter for you.`
        };
    }

    // 4. Thesis and project supervision
    if (msg.includes("supervise") || msg.includes("thesis") || msg.includes("project") || msg.includes("graduation") || msg.includes("advisor")) {
        if (faculty.department === "CSE") {
            return {
                text: `For Thesis/Graduation Project supervision in CSE:
1. Your group must have a minimum average CGPA of 3.25.
2. You must present a concrete project proposal or research outline matching my specializations: ${faculty.specialization.join(", ")}.
3. Schedule an advising session during my consultation hours to pitch your idea. If I find your proposal viable and matching my research interests, I will gladly sign as your supervisor.`
            };
        } else {
            return {
                text: `For project or academic advising:
1. Prepare a 1-page overview of your topic or case study.
2. I accept students who show proactive research habits and strong analytical skills.
3. Bring your draft proposal to my office (${faculty.room}) to discuss further.`
            };
        }
    }

    // 5. General course/syllabus content answers
    if (msg.includes("syllabus") || msg.includes("teach") || msg.includes("course") || msg.includes("topic")) {
        return {
            text: `I teach the following courses: ${faculty.courses.join(", ")}. 
The complete syllabus, reading materials, grading rubrics, and schedule are uploaded on our LMS. For technical guidance on specific topics, please feel free to ask me here directly!`
        };
    }

    // 6. Specific technical concepts
    if (faculty.id === 1) { // Dr. Rayhan - Networks
        if (msg.includes("vlsm") || msg.includes("subnet")) {
            return {
                text: "VLSM (Variable Length Subnet Masking) is essential for efficient IP assignment. Instead of dividing a block into subnets of equal size, you allocate masks of varying lengths. **Rule of thumb**: Sort subnets from largest host requirement to smallest, assign IP blocks sequentially, and apply the matching CIDR prefix. This prevents IP address wastage in point-to-point links!"
            };
        }
        if (msg.includes("osi") || msg.includes("layer")) {
            return {
                text: "The OSI model consists of 7 layers (Physical, Data Link, Network, Transport, Session, Presentation, Application). Each layer provides services to the layer above it. In CSE-301, we focus heavily on Layer 2 (switching/MAC addressing), Layer 3 (routing/IP addressing), and Layer 4 (TCP/UDP segments). Knowing how packets traverse these layers is crucial for passing my exams."
            };
        }
    }

    if (faculty.id === 2) { // Dr. Farhana - AI
        if (msg.includes("neural") || msg.includes("deep learning")) {
            return {
                text: "Artificial Neural Networks model mathematical relations using artificial neurons. A 'Deep' network stacks multiple hidden layers which automatically extract high-level abstract features. For instance, in computer vision, early layers detect simple lines, while deeper layers assemble those lines into structures and faces. It's optimization via matrix multiplications!"
            };
        }
    }

    if (faculty.id === 3) { // Prof. H. Rahman - Algorithms
        if (msg.includes("avl") || msg.includes("rotation")) {
            return {
                text: "In an AVL tree, we maintain a balance factor: Height(Left Subtree) - Height(Right Subtree) must be in {-1, 0, 1}. When an insertion breaks this, we perform rotations to restore balance: Single Left (L), Single Right (R), Double Left-Right (LR), or Double Right-Left (RL). This keeps search, insertion, and deletion complexity bounded to O(log n)."
            };
        }
    }

    // Greetings
    if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey") || msg.includes("good morning") || msg.includes("good afternoon")) {
        return {
            text: `Hello! I am the AI Clone of ${faculty.name}. How can I assist you with your academic inquiries, consultation scheduling, or course topics today?`
        };
    }

    // Default Fallback
    return {
        text: `As your professor, I encourage you to bring detailed questions to my office (${faculty.room}) during consultation hours, or email me at ${faculty.email}. If you'd like to book an advising session right now, just say: "I want to book an appointment".`
    };
}

// ── Gemini API Response Engine ────────────────────────────────────────────────
async function callGeminiAPI(apiKey, faculty, conversationHistory, userMessage) {
    const systemInstruction = `You are the AI clone of ${faculty.name}, a ${faculty.role} in the ${faculty.department} Department at Southeast University (SEU), Bangladesh.
Your office is located at ${faculty.room}. Your email is ${faculty.email}.
Your consultation hours are: ${faculty.consultationSlots.map(s => `${s.day} (${s.time})`).join(", ")}.
You currently teach: ${faculty.courses.join(", ")}.
Your background: ${faculty.bio}
Your research specializations: ${faculty.specialization.join(", ")}.
You are a ${faculty.aiPersonality}

CRITICAL RULES FOR CONSULTATIONS:
1. If the student uses inappropriate slang, informal greetings (e.g. 'yo', 'bruh', 'dude', 'sup', 'wanna'), or profanity, you MUST politely correct them first and ask them to maintain professional academic decorum when speaking to faculty, and refuse to answer until they rephrase.
2. If the student asks to book, meet, schedule, or make an appointment, you MUST output the following special sentence at the end of your response: "SCHEDULE_TRIGGER: Please select one of my available consultation slots below to register it."
3. Answer academic queries about grade reviews, recommendations, make-up quizzes, and projects professionally as this professor.
4. Keep responses concise (3-5 sentences) and focused on university academic procedures.`;

    const contents = conversationHistory.map(m => ({
        role: m.role === "ai" ? "model" : "user",
        parts: [{ text: m.text }]
    }));
    contents.push({ role: "user", parts: [{ text: userMessage }] });

    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                system_instruction: { parts: [{ text: systemInstruction }] },
                contents,
                generationConfig: { maxOutputTokens: 400, temperature: 0.7 }
            })
        }
    );

    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't generate a response. Please try again.";
}

export default function Faculties() {
    const navigate = useNavigate();

    // Directory state
    const [faculties, setFaculties] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDept, setSelectedDept] = useState("All");
    const [selectedStatus, setSelectedStatus] = useState("All");

    // Modal state
    const [activeFaculty, setActiveFaculty] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [agenda, setAgenda] = useState("");
    const [bookingDate, setBookingDate] = useState("");
    const [bookingCourse, setBookingCourse] = useState("");
    const [bookingSuccess, setBookingSuccess] = useState(false);

    // Chat state
    const [chatFaculty, setChatFaculty] = useState(null);
    const [chatMessages, setChatMessages] = useState([]);
    const [chatInput, setChatInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);

    // Settings state
    const [showSettings, setShowSettings] = useState(false);
    const [apiKey, setApiKey] = useState("");
    const [apiKeyInput, setApiKeyInput] = useState("");
    const [usingLiveAI, setUsingLiveAI] = useState(false);

    const chatEndRef = useRef(null);

    // Load data from Local Storage
    useEffect(() => {
        if (!localStorage.getItem("seu_faculties")) {
            localStorage.setItem("seu_faculties", JSON.stringify(DEFAULT_FACULTIES));
        }
        if (!localStorage.getItem("seu_faculty_bookings")) {
            localStorage.setItem("seu_faculty_bookings", JSON.stringify([]));
        }
        const savedKey = localStorage.getItem("seu_gemini_api_key") || "";
        setApiKey(savedKey);
        setApiKeyInput(savedKey);
        setUsingLiveAI(!!savedKey);
        setFaculties(JSON.parse(localStorage.getItem("seu_faculties")));
        setBookings(JSON.parse(localStorage.getItem("seu_faculty_bookings")));
    }, []);

    // Scroll chat to bottom
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatMessages, isTyping]);

    // Open chat window
    const openChat = (faculty) => {
        setChatFaculty(faculty);
        setChatMessages([
            {
                role: "ai",
                text: `Hello, I am the AI Clone of ${faculty.name}. You can consult me regarding: \n• Grade re-evaluations\n• Missed quiz/exam policies\n• Thesis/Project supervision queries\n• Booking consultation meetings`,
                time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
            }
        ]);
        setChatInput("");
        setChatOpen(true);
    };

    const closeChat = () => {
        setChatOpen(false);
        setTimeout(() => {
            setChatFaculty(null);
            setChatMessages([]);
        }, 300);
    };

    // Chat booking action handler
    const handleBookSlotFromChat = (slot) => {
        // Calculate date of next occurrence for the day of the week
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const targetDayIndex = daysOfWeek.indexOf(slot.day);
        const today = new Date();
        const currentDayIndex = today.getDay();
        
        let daysToAdd = targetDayIndex - currentDayIndex;
        if (daysToAdd <= 0) daysToAdd += 7; // Next week's slot
        
        const appointmentDate = new Date();
        appointmentDate.setDate(today.getDate() + daysToAdd);
        const dateString = appointmentDate.toISOString().split("T")[0];

        const newBooking = {
            id: Date.now(),
            facultyId: chatFaculty.id,
            facultyName: chatFaculty.name,
            facultyDept: chatFaculty.department,
            slotDay: slot.day,
            slotTime: slot.time,
            date: dateString,
            course: chatFaculty.courses[0] || "Academic Advising",
            agenda: "Scheduled via AI Clone Chat Advisor",
            status: "CONFIRMED"
        };

        const updated = [newBooking, ...bookings];
        localStorage.setItem("seu_faculty_bookings", JSON.stringify(updated));
        setBookings(updated);

        // Add confirmation to chat bubbles
        setChatMessages(prev => [
            ...prev,
            {
                role: "ai",
                text: `📅 Appointment Registered!\nI have booked a slot for you on **${dateString} (${slot.day})** at **${slot.time}**. It is now registered on your consultations dashboard.`,
                time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
            }
        ]);
    };

    // Send Message
    const sendMessage = async (customText) => {
        const text = (customText || chatInput).trim();
        if (!text || isTyping) return;

        const userMsg = {
            role: "user",
            text,
            time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
        };
        
        setChatMessages(prev => [...prev, userMsg]);
        setChatInput("");
        setIsTyping(true);

        // Client-side Slang & Decorum filter (guarantees tone check in both Local & Live modes)
        const slangRegex = /\b(yo|bruh|bro|dude|sup|wanna|gonna|hella|fuck|shit|ass|bitch|bastard|crap|damn|idiot|stupid|dumb|fool|jerk|suck|wtf|lmao|omg)\b/i;
        if (slangRegex.test(text.toLowerCase())) {
            await new Promise(r => setTimeout(r, 500)); // Simulated thinking pause
            setChatMessages(prev => [
                ...prev,
                {
                    role: "ai",
                    text: `As your professor, I expect a professional and respectful communication tone. Please rephrase your question using appropriate language, and I will be glad to assist you with your academic query.`,
                    time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
                }
            ]);
            setIsTyping(false);
            return;
        }

        try {
            let aiTextResponse = "";
            let triggerBooking = false;

            if (apiKey) {
                try {
                    const rawResponse = await callGeminiAPI(apiKey, chatFaculty, chatMessages, text);
                    if (rawResponse.includes("SCHEDULE_TRIGGER")) {
                        aiTextResponse = rawResponse.replace("SCHEDULE_TRIGGER:", "").trim();
                        triggerBooking = true;
                    } else {
                        aiTextResponse = rawResponse;
                    }
                    setUsingLiveAI(true);
                } catch (err) {
                    console.warn("Gemini API call failed, falling back to local engine:", err);
                    const localRes = getLocalAIResponse(chatFaculty, text);
                    aiTextResponse = localRes.text;
                    triggerBooking = !!localRes.isBookingTrigger;
                    setUsingLiveAI(false);
                }
            } else {
                // Simulate thinking time
                await new Promise(r => setTimeout(r, 900));
                const localRes = getLocalAIResponse(chatFaculty, text);
                aiTextResponse = localRes.text;
                triggerBooking = !!localRes.isBookingTrigger;
                setUsingLiveAI(false);
            }

            setChatMessages(prev => [
                ...prev,
                {
                    role: "ai",
                    text: aiTextResponse,
                    isBookingOptions: triggerBooking,
                    time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
                }
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    // Save Gemini Key
    const saveApiKey = () => {
        localStorage.setItem("seu_gemini_api_key", apiKeyInput);
        setApiKey(apiKeyInput);
        setUsingLiveAI(!!apiKeyInput);
        setShowSettings(false);
    };

    // Form Booking
    const handleBookConsultation = (e) => {
        e.preventDefault();
        if (!selectedSlot || !bookingDate || !agenda || !bookingCourse) return;
        const newBooking = {
            id: Date.now(),
            facultyId: activeFaculty.id,
            facultyName: activeFaculty.name,
            facultyDept: activeFaculty.department,
            slotDay: selectedSlot.day,
            slotTime: selectedSlot.time,
            date: bookingDate,
            course: bookingCourse,
            agenda,
            status: "CONFIRMED"
        };
        const updated = [newBooking, ...bookings];
        localStorage.setItem("seu_faculty_bookings", JSON.stringify(updated));
        setBookings(updated);
        setBookingSuccess(true);
        setAgenda(""); setBookingDate(""); setBookingCourse(""); setSelectedSlot(null);
        setTimeout(() => { setBookingSuccess(false); setActiveFaculty(null); }, 1500);
    };

    const handleCancelBooking = (id) => {
        const updated = bookings.filter(b => b.id !== id);
        localStorage.setItem("seu_faculty_bookings", JSON.stringify(updated));
        setBookings(updated);
    };

    // Filters
    const filteredFaculties = faculties.filter(f => {
        const q = searchQuery.toLowerCase();
        const matchesSearch = !q || f.name.toLowerCase().includes(q) ||
            f.specialization.some(s => s.toLowerCase().includes(q)) ||
            f.room.toLowerCase().includes(q);
        const matchesDept = selectedDept === "All" || f.department === selectedDept;
        const matchesStatus = selectedStatus === "All" || f.status === selectedStatus;
        return matchesSearch && matchesDept && matchesStatus;
    });

    const getInitials = (name) => {
        const clean = name.replace(/Dr\.\s|Prof\.\s|Ms\.\s/g, "").split(" ");
        return clean.length >= 2 ? (clean[0][0] + clean[1][0]).toUpperCase() : clean[0][0].toUpperCase();
    };

    const getStatusIndicator = (status) => {
        const cls = { Available: "fac-status-available", Online: "fac-status-online", "In Meeting": "fac-status-busy", "On Leave": "fac-status-leave" }[status] || "fac-status-offline";
        return <span className={`fac-status-indicator ${cls}`} />;
    };

    const getStatusColor = (status) => ({
        Available: "#34d399", Online: "#38bdf8", "In Meeting": "#fbbf24", "On Leave": "#f87171"
    }[status] || "#94a3b8");

    return (
        <div className="smp-page">

            {/* ── Top Bar ─────────────────────────────── */}
            <div className="smp-topbar">
                <button className="smp-back-btn" onClick={() => navigate("/student-dashboard")}>←</button>
                <div className="smp-topbar-title">
                    <h1>Faculties Directory</h1>
                    <p>Southeast University • Office Hours & Consultation Hub</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <button onClick={() => setShowSettings(true)} title="AI Settings" style={{
                        background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
                        borderRadius: 8, padding: "6px 10px", color: "#c084fc", fontSize: 16,
                        cursor: "pointer", transition: "all 0.2s"
                    }}
                        onMouseOver={e => e.target.style.background = "rgba(167,139,250,0.15)"}
                        onMouseOut={e => e.target.style.background = "rgba(255,255,255,0.08)"}
                    >⚙️</button>
                    <img src={teacherIcon} alt="Faculties" style={{ width: 28, height: 28, objectFit: "contain" }} />
                </div>
            </div>

            {/* ── Content Area ─────────────────────────── */}
            <div className="smp-content">

                {/* AI Mode Info Banner */}
                <div style={{
                    display: "flex", alignItems: "center", gap: 10, padding: "10px 16px",
                    borderRadius: 10, fontSize: 12, fontWeight: 600,
                    background: usingLiveAI ? "rgba(52, 211, 153, 0.08)" : "rgba(167, 139, 250, 0.08)",
                    border: `1px solid ${usingLiveAI ? "rgba(52,211,153,0.2)" : "rgba(167,139,250,0.2)"}`,
                    color: usingLiveAI ? "#34d399" : "#c084fc"
                }}>
                    <span style={{ fontSize: 16 }}>{usingLiveAI ? "🟢" : "🤖"}</span>
                    {usingLiveAI
                        ? "Live Gemini LLM is active — AI Clones are generating dynamic, contextual responses."
                        : "AI Academic Advising Engine active (Local Mode). Click the gear icon to add an API key."}
                </div>

                {/* ── Active Bookings Widget ─────────────────── */}
                {bookings.length > 0 && (
                    <div className="smp-card" style={{ border: "1px solid rgba(167,139,250,0.25)", background: "rgba(30,27,75,0.25)" }}>
                        <div className="smp-card-header" style={{ borderBottom: "1px solid rgba(167,139,250,0.15)" }}>
                            <span>📅</span>
                            <h2 style={{ color: "#c084fc" }}>My Consultations ({bookings.length})</h2>
                        </div>
                        <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                            {bookings.map(b => (
                                <div key={b.id} style={{
                                    display: "flex", justifyContent: "space-between", alignItems: "center",
                                    padding: "12px 16px", borderRadius: 12, flexWrap: "wrap", gap: 10,
                                    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)"
                                }}>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: 13.5 }}>{b.facultyName}</div>
                                        <div style={{ fontSize: 11.5, color: "#86efac", marginTop: 3 }}>📅 {b.date} ({b.slotDay}) • ⏰ {b.slotTime}</div>
                                        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 4, fontStyle: "italic" }}>"{b.agenda}"</div>
                                        <div style={{ fontSize: 10.5, color: "#a78bfa", marginTop: 2 }}>{b.course}</div>
                                    </div>
                                    <div style={{ display: "flex", gap: 8 }}>
                                        <span className="badge badge-green" style={{ fontSize: 9 }}>CONFIRMED</span>
                                        <button onClick={() => handleCancelBooking(b.id)} style={{
                                            background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)",
                                            borderRadius: 8, padding: "5px 10px", color: "#fca5a5", fontSize: 11,
                                            fontWeight: 700, cursor: "pointer"
                                        }}>✕ Cancel</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── Search and Filters ────────────────────── */}
                <div className="smp-card" style={{ padding: "16px 20px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            <label style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", color: "#a78bfa" }}>Search Faculty</label>
                            <input type="text" placeholder="Name, specialization, room..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                                style={{ border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "10px 12px", fontSize: 13, color: "#fff", background: "rgba(255,255,255,0.05)", outline: "none" }} />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            <label style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", color: "#a78bfa" }}>Department</label>
                            <select value={selectedDept} onChange={e => setSelectedDept(e.target.value)}
                                style={{ border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "10px 12px", fontSize: 13, color: "#fff", background: "rgba(255,255,255,0.05)", outline: "none", cursor: "pointer" }}>
                                {["All", "CSE", "EEE", "BBA", "English"].map(d => (
                                    <option key={d} value={d} style={{ background: "#1e1b4b" }}>{d === "All" ? "All Departments" : d}</option>
                                ))}
                            </select>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            <label style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", color: "#a78bfa" }}>Availability</label>
                            <select value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)}
                                style={{ border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "10px 12px", fontSize: 13, color: "#fff", background: "rgba(255,255,255,0.05)", outline: "none", cursor: "pointer" }}>
                                {[["All", "All Statuses"], ["Available", "🟢 Available"], ["Online", "🔵 Online"], ["In Meeting", "🟡 In Meeting"], ["On Leave", "🔴 On Leave"]].map(([v, l]) => (
                                    <option key={v} value={v} style={{ background: "#1e1b4b" }}>{l}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* ── Faculty Cards Grid ────────────────────── */}
                {filteredFaculties.length > 0 ? (
                    <div className="smp-faculty-grid" style={{ padding: 0 }}>
                        {filteredFaculties.map(f => (
                            <div key={f.id} className="smp-faculty-card fac-hover-card" style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", boxSizing: "border-box" }}>

                                {/* Availability Indicator */}
                                <div style={{ position: "absolute", top: 12, right: 12, display: "flex", alignItems: "center", gap: 5 }}>
                                    {getStatusIndicator(f.status)}
                                    <span style={{ fontSize: 9.5, color: getStatusColor(f.status), fontWeight: 700 }}>{f.status}</span>
                                </div>

                                {/* Advising Clone tag */}
                                <div style={{ position: "absolute", top: 10, left: 10 }}>
                                    <span style={{ fontSize: 9, background: "rgba(167,139,250,0.15)", border: "1px solid rgba(167,139,250,0.3)", color: "#c084fc", padding: "2px 7px", borderRadius: 20, fontWeight: 800, letterSpacing: 0.3 }}>
                                        🎓 Advisor Bot
                                    </span>
                                </div>

                                {/* Profile info */}
                                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 18 }}>
                                    <div style={{ position: "relative", background: "rgba(167,139,250,0.1)", border: "2.5px solid rgba(167,139,250,0.3)", color: "#c084fc", fontWeight: 800, width: 60, height: 60, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, margin: "0 auto 10px" }}>
                                        {getInitials(f.name)}
                                        <span style={{ position: "absolute", bottom: 0, right: 0, width: 14, height: 14, borderRadius: "50%", background: getStatusColor(f.status), border: "2px solid #0f172a" }} />
                                    </div>
                                    <h3 className="smp-faculty-name" style={{ margin: "0 0 2px", fontSize: 15 }}>{f.name}</h3>
                                    <p className="smp-faculty-role" style={{ margin: "0 0 4px", fontSize: 10.5 }}>{f.role}</p>
                                    <span style={{ fontSize: 10, fontWeight: 700, background: "rgba(255,255,255,0.06)", padding: "2px 8px", borderRadius: 6, color: "#a78bfa" }}>{f.department}</span>

                                    <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center", margin: "10px 0 4px" }}>
                                        {f.specialization.map((s, i) => (
                                            <span key={i} style={{ fontSize: 9, padding: "2px 6px", borderRadius: 6, background: "rgba(167,139,250,0.07)", border: "1px solid rgba(167,139,250,0.13)", color: "rgba(255,255,255,0.8)" }}>{s}</span>
                                        ))}
                                    </div>
                                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", margin: "6px 0 10px" }}>📍 {f.room}</div>
                                </div>

                                {/* Quick buttons */}
                                <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                                    <button onClick={() => openChat(f)} style={{
                                        width: "100%", padding: "10px 0", borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 800, fontSize: 13,
                                        background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
                                        color: "#fff", boxShadow: "0 4px 15px rgba(124,58,237,0.35)", transition: "all 0.2s"
                                    }}
                                        onMouseOver={e => { e.target.style.filter = "brightness(1.15)"; e.target.style.boxShadow = "0 6px 20px rgba(124,58,237,0.5)"; }}
                                        onMouseOut={e => { e.target.style.filter = ""; e.target.style.boxShadow = "0 4px 15px rgba(124,58,237,0.35)"; }}
                                    >
                                        💬 Academic Consultation
                                    </button>
                                    <div style={{ display: "flex", gap: 8 }}>
                                        <a href={`mailto:${f.email}`} style={{ flex: 1, textAlign: "center", textDecoration: "none", fontSize: 11.5, padding: "8px 0", borderRadius: 8, fontWeight: 700, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", color: "#fff" }}>📧 Email</a>
                                        <button onClick={() => { setActiveFaculty(f); setSelectedSlot(null); setBookingSuccess(false); }} style={{ flex: 1.5, fontSize: 11.5, padding: "8px 0", borderRadius: 8, fontWeight: 700, background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.25)", color: "#818cf8", cursor: "pointer" }}>📅 Book Consult</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="smp-empty smp-card" style={{ padding: 48 }}>
                        <span style={{ fontSize: 32 }}>🔍</span>
                        <p style={{ margin: "12px 0 0", fontSize: 16, fontWeight: 700, color: "rgba(255,255,255,0.6)" }}>No Faculties Found</p>
                    </div>
                )}
            </div>

            {/* ── Floating Advisor Chat Window ─────────────────────────────────── */}
            {chatFaculty && (
                <div className={`fac-chat-window ${chatOpen ? "fac-chat-open" : "fac-chat-close"}`}>

                    {/* Chat Header */}
                    <div style={{ background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)", padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid rgba(255,255,255,0.1)", flexShrink: 0 }}>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, flexShrink: 0 }}>
                            {getInitials(chatFaculty.name)}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontWeight: 800, fontSize: 13.5, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{chatFaculty.name} AI Clone</div>
                            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.75)", display: "flex", alignItems: "center", gap: 5 }}>
                                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#34d399", display: "inline-block" }} />
                                {usingLiveAI ? "Live Consultation AI" : "Local Advising Engine"}
                            </div>
                        </div>
                        <button onClick={closeChat} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 6, width: 28, height: 28, color: "#fff", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>✕</button>
                    </div>

                    {/* Suggestion Chips */}
                    <div style={{ padding: "10px 12px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: 6, flexWrap: "wrap", flexShrink: 0, background: "rgba(255,255,255,0.02)" }}>
                        {chatFaculty.quickSuggestions.map((q, i) => (
                            <button key={i} onClick={() => sendMessage(q)} style={{
                                fontSize: 10, padding: "4px 10px", borderRadius: 20, cursor: "pointer", fontWeight: 600,
                                border: "1px solid rgba(167,139,250,0.25)", background: "rgba(167,139,250,0.08)", color: "#c084fc",
                                transition: "all 0.2s"
                            }}
                                onMouseOver={e => { e.target.style.background = "rgba(167,139,250,0.2)"; }}
                                onMouseOut={e => { e.target.style.background = "rgba(167,139,250,0.08)"; }}
                            >{q}</button>
                        ))}
                    </div>

                    {/* Chat Messages list */}
                    <div style={{ flex: 1, overflowY: "auto", padding: "12px", display: "flex", flexDirection: "column", gap: 12 }}>
                        {chatMessages.map((msg, i) => (
                            <div key={i} style={{ display: "flex", flexDirection: msg.role === "user" ? "row-reverse" : "row", gap: 8, alignItems: "flex-end" }}>
                                {msg.role === "ai" && (
                                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(124,58,237,0.3)", border: "1px solid rgba(124,58,237,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#c084fc", flexShrink: 0 }}>
                                        {getInitials(chatFaculty.name)}
                                    </div>
                                )}
                                <div style={{ maxWidth: "80%" }}>
                                    <div style={{
                                        padding: "10px 14px", borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                                        fontSize: 12.5, lineHeight: 1.6, fontWeight: 500, whiteSpace: "pre-line",
                                        background: msg.role === "user" ? "linear-gradient(135deg, #7c3aed, #4f46e5)" : "rgba(255,255,255,0.07)",
                                        color: "#fff", border: msg.role === "user" ? "none" : "1px solid rgba(255,255,255,0.08)"
                                    }}>
                                        {msg.text}

                                        {/* Clickable inline slots booking triggers */}
                                        {msg.isBookingOptions && (
                                            <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
                                                <div style={{ fontSize: 9.5, fontWeight: 700, color: "#c084fc", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 2 }}>Available Consultation Slots:</div>
                                                {chatFaculty.consultationSlots.map((slot, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => handleBookSlotFromChat(slot)}
                                                        style={{
                                                            width: "100%", textAlign: "left", padding: "8px 12px", borderRadius: 8, cursor: "pointer",
                                                            border: "1px solid rgba(167, 139, 250, 0.4)", background: "rgba(167, 139, 250, 0.12)",
                                                            color: "#fff", fontSize: 11.5, fontWeight: 700, transition: "all 0.2s", display: "flex", justifyContent: "space-between"
                                                        }}
                                                        onMouseOver={e => { e.target.style.background = "rgba(167, 139, 250, 0.25)"; }}
                                                        onMouseOut={e => { e.target.style.background = "rgba(167, 139, 250, 0.12)"; }}
                                                    >
                                                        <span>📅 {slot.day}</span>
                                                        <span>⏰ {slot.time} (Book)</span>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div style={{ fontSize: 9.5, color: "rgba(255,255,255,0.3)", marginTop: 4, textAlign: msg.role === "user" ? "right" : "left" }}>{msg.time}</div>
                                </div>
                            </div>
                        ))}

                        {/* Typing indicator */}
                        {isTyping && (
                            <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
                                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(124,58,237,0.3)", border: "1px solid rgba(124,58,237,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#c084fc", flexShrink: 0 }}>
                                    {getInitials(chatFaculty.name)}
                                </div>
                                <div style={{ padding: "10px 14px", borderRadius: "16px 16px 16px 4px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", gap: 4, alignItems: "center" }}>
                                    {[0, 1, 2].map(j => (
                                        <span key={j} className="fac-typing-dot" style={{ animationDelay: `${j * 0.15}s` }} />
                                    ))}
                                </div>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>

                    {/* Chat inputs */}
                    <div style={{ padding: "10px 12px", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", gap: 8, flexShrink: 0, background: "rgba(255,255,255,0.02)" }}>
                        <input
                            type="text"
                            placeholder="Ask about grades, make-ups, thesis or schedule a slot..."
                            value={chatInput}
                            onChange={e => setChatInput(e.target.value)}
                            onKeyDown={e => { if (e.key === "Enter") sendMessage(); }}
                            style={{ flex: 1, border: "1px solid rgba(255,255,255,0.12)", borderRadius: 20, padding: "9px 14px", fontSize: 12.5, color: "#fff", background: "rgba(255,255,255,0.06)", outline: "none" }}
                        />
                        <button onClick={() => sendMessage()} disabled={isTyping || !chatInput.trim()} style={{
                            background: chatInput.trim() && !isTyping ? "linear-gradient(135deg, #7c3aed, #4f46e5)" : "rgba(255,255,255,0.05)",
                            border: "none", borderRadius: "50%", width: 38, height: 38, color: "#fff", cursor: chatInput.trim() && !isTyping ? "pointer" : "not-allowed",
                            fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s"
                        }}>➤</button>
                    </div>
                </div>
            )}

            {/* ── Consultation Booking Slide-over Drawer ───────────────────────── */}
            {activeFaculty && (
                <div className="fac-slideover-backdrop" onClick={() => setActiveFaculty(null)}>
                    <div className="fac-slideover-panel" onClick={e => e.stopPropagation()}>
                        <div className="fac-slideover-header">
                            <div>
                                <h2 style={{ margin: 0, fontSize: 15, color: "#fff" }}>Faculty Profile</h2>
                                <p style={{ margin: "2px 0 0", fontSize: 10.5, color: "rgba(255,255,255,0.4)" }}>Office Hours Scheduler</p>
                            </div>
                            <button className="fac-close-btn" onClick={() => setActiveFaculty(null)}>✕</button>
                        </div>
                        <div className="fac-slideover-body">
                            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 18 }}>
                                <div style={{ background: "rgba(139,92,246,0.15)", border: "2px solid rgba(139,92,246,0.3)", borderRadius: "50%", width: 48, height: 48, fontSize: 17, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", color: "#c084fc", flexShrink: 0 }}>
                                    {getInitials(activeFaculty.name)}
                                </div>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: 15 }}>{activeFaculty.name}</h3>
                                    <p style={{ margin: "1px 0 0", fontSize: 11, color: "#a78bfa" }}>{activeFaculty.role}</p>
                                    <p style={{ margin: "2px 0 0", fontSize: 10, color: "rgba(255,255,255,0.45)" }}>📍 {activeFaculty.room}</p>
                                </div>
                            </div>

                            <div style={{ marginBottom: 18 }}>
                                <h4 style={{ margin: "0 0 6px", fontSize: 10, fontWeight: 800, textTransform: "uppercase", color: "#a78bfa" }}>Bio</h4>
                                <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>{activeFaculty.bio}</p>
                            </div>

                            <div style={{ marginBottom: 20 }}>
                                <h4 style={{ margin: "0 0 8px", fontSize: 10, fontWeight: 800, textTransform: "uppercase", color: "#a78bfa" }}>Courses</h4>
                                {activeFaculty.courses.map((c, i) => (
                                    <div key={i} style={{ fontSize: 12, padding: "7px 12px", borderRadius: 8, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", marginBottom: 6 }}>📖 {c}</div>
                                ))}
                            </div>

                            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 18 }}>
                                <h4 style={{ margin: "0 0 12px", fontSize: 11, fontWeight: 800, textTransform: "uppercase", color: "#c084fc" }}>📅 Book a Consultation</h4>
                                {bookingSuccess ? (
                                    <div style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.3)", borderRadius: 12, padding: "16px 20px", textAlign: "center" }}>
                                        <span style={{ fontSize: 28 }}>✅</span>
                                        <h4 style={{ color: "#86efac", margin: "10px 0 4px", fontSize: 14 }}>Appointment Confirmed!</h4>
                                        <p style={{ margin: 0, fontSize: 11.5, color: "rgba(255,255,255,0.6)" }}>Successfully scheduled.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleBookConsultation} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                                        <div>
                                            <label style={{ fontSize: 9.5, fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", display: "block", marginBottom: 6 }}>1. Select Slot</label>
                                            {activeFaculty.consultationSlots.map((slot, i) => {
                                                const sel = selectedSlot?.day === slot.day;
                                                return (
                                                    <div key={i} onClick={() => setSelectedSlot(slot)} style={{ display: "flex", justifyContent: "space-between", padding: "9px 12px", borderRadius: 9, cursor: "pointer", marginBottom: 6, border: sel ? "1.5px solid #a855f7" : "1.5px solid rgba(255,255,255,0.07)", background: sel ? "rgba(168,85,247,0.12)" : "rgba(255,255,255,0.02)", transition: "all 0.2s" }}>
                                                        <span style={{ fontSize: 12, fontWeight: 700 }}>📅 {slot.day}</span>
                                                        <span style={{ fontSize: 12, color: sel ? "#c084fc" : "rgba(255,255,255,0.55)" }}>⏰ {slot.time}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div>
                                            <label style={{ fontSize: 9.5, fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", display: "block", marginBottom: 6 }}>2. Date</label>
                                            <input type="date" required value={bookingDate} onChange={e => setBookingDate(e.target.value)} style={{ width: "100%", boxSizing: "border-box", border: "1.5px solid rgba(255,255,255,0.1)", borderRadius: 9, padding: "9px 12px", fontSize: 12.5, color: "#fff", background: "rgba(255,255,255,0.05)", outline: "none" }} />
                                        </div>
                                        <div>
                                            <label style={{ fontSize: 9.5, fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", display: "block", marginBottom: 6 }}>3. Course</label>
                                            <select required value={bookingCourse} onChange={e => setBookingCourse(e.target.value)} style={{ width: "100%", boxSizing: "border-box", border: "1.5px solid rgba(255,255,255,0.1)", borderRadius: 9, padding: "9px 12px", fontSize: 12.5, color: "#fff", background: "rgba(255,255,255,0.05)", outline: "none", cursor: "pointer" }}>
                                                <option value="" disabled style={{ background: "#1e1b4b" }}>Select course...</option>
                                                {activeFaculty.courses.map((c, i) => <option key={i} value={c} style={{ background: "#1e1b4b" }}>{c}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label style={{ fontSize: 9.5, fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", display: "block", marginBottom: 6 }}>4. Agenda</label>
                                            <input type="text" required placeholder="e.g. Discuss Assignment 2 issues..." value={agenda} onChange={e => setAgenda(e.target.value)} style={{ width: "100%", boxSizing: "border-box", border: "1.5px solid rgba(255,255,255,0.1)", borderRadius: 9, padding: "9px 12px", fontSize: 12.5, color: "#fff", background: "rgba(255,255,255,0.05)", outline: "none" }} />
                                        </div>
                                        <button type="submit" style={{ background: "linear-gradient(135deg, #a855f7, #6366f1)", border: "none", borderRadius: 10, padding: "12px", fontSize: 13, fontWeight: 800, color: "#fff", cursor: "pointer" }}>
                                            Confirm Appointment
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── API Key Settings Modal ────────────────────────────────────────── */}
            {showSettings && (
                <div style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.8)", backdropFilter: "blur(8px)", zIndex: 3000, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setShowSettings(false)}>
                    <div style={{ background: "rgba(15,23,42,0.95)", border: "1px solid rgba(167,139,250,0.25)", borderRadius: 20, padding: 28, width: "90%", maxWidth: 420, boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }} onClick={e => e.stopPropagation()}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                            <div>
                                <h3 style={{ margin: 0, fontSize: 15 }}>⚙️ AI Settings</h3>
                                <p style={{ margin: "4px 0 0", fontSize: 11.5, color: "rgba(255,255,255,0.5)" }}>Configure Gemini API for live AI consultations</p>
                            </div>
                            <button onClick={() => setShowSettings(false)} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "50%", width: 28, height: 28, color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
                        </div>

                        <div style={{ background: "rgba(167,139,250,0.08)", border: "1px solid rgba(167,139,250,0.2)", borderRadius: 10, padding: "12px 14px", marginBottom: 20, fontSize: 12, color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>
                            💡 <strong>How it works:</strong> When a Gemini API key is provided, faculty AI clones use Google's live Gemini 1.5 Flash model. Without a key, the intelligent local response engine activates automatically — no setup needed!
                        </div>

                        <div style={{ marginBottom: 16 }}>
                            <label style={{ display: "block", fontSize: 10, fontWeight: 800, textTransform: "uppercase", color: "#a78bfa", marginBottom: 8 }}>Google Gemini API Key</label>
                            <input
                                type="password"
                                placeholder="AIza..."
                                value={apiKeyInput}
                                onChange={e => setApiKeyInput(e.target.value)}
                                style={{ width: "100%", boxSizing: "border-box", border: "1.5px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#fff", background: "rgba(255,255,255,0.05)", outline: "none" }}
                            />
                            <p style={{ margin: "6px 0 0", fontSize: 10.5, color: "rgba(255,255,255,0.4)" }}>
                                Get a free key at <strong style={{ color: "#a78bfa" }}>aistudio.google.com</strong>. Your key is stored locally only.
                            </p>
                        </div>

                        <div style={{ display: "flex", gap: 10 }}>
                            <button onClick={saveApiKey} style={{ flex: 1, background: "linear-gradient(135deg, #7c3aed, #4f46e5)", border: "none", borderRadius: 10, padding: "11px", fontSize: 13, fontWeight: 800, color: "#fff", cursor: "pointer" }}>
                                {apiKeyInput ? "Save & Enable Live AI" : "Save (Use Local Engine)"}
                            </button>
                            {apiKey && (
                                <button onClick={() => { setApiKeyInput(""); }} style={{ padding: "11px 14px", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10, background: "rgba(239,68,68,0.1)", color: "#fca5a5", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* ── CSS Styles ────────────────────────────────────────────────────── */}
            <style dangerouslySetInnerHTML={{ __html: `
                .fac-hover-card { transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); }
                .fac-hover-card:hover { transform: translateY(-5px) scale(1.01); border-color: rgba(167,139,250,0.35) !important; box-shadow: 0 14px 32px rgba(0,0,0,0.4), 0 0 18px rgba(167,139,250,0.12) !important; background: rgba(255,255,255,0.08) !important; }

                .fac-status-indicator { display: inline-block; width: 10px; height: 10px; border-radius: 50%; }
                .fac-status-available { background: #34d399; box-shadow: 0 0 8px #34d399; animation: fac-pulse 2s infinite; }
                .fac-status-online { background: #38bdf8; box-shadow: 0 0 8px #38bdf8; animation: fac-pulse 2.2s infinite; }
                .fac-status-busy { background: #fbbf24; box-shadow: 0 0 8px #fbbf24; }
                .fac-status-leave { background: #f87171; }
                @keyframes fac-pulse {
                    0% { transform: scale(0.95); }
                    50% { transform: scale(1.15); }
                    100% { transform: scale(0.95); }
                }

                .fac-chat-window {
                    position: fixed;
                    bottom: 24px; right: 24px;
                    width: 380px;
                    max-width: calc(100vw - 32px);
                    height: 550px;
                    max-height: calc(100vh - 40px);
                    background: rgba(10, 10, 25, 0.96);
                    backdrop-filter: blur(16px);
                    border: 1px solid rgba(124, 58, 237, 0.3);
                    border-radius: 20px;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(124,58,237,0.1);
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    z-index: 1500;
                    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                }
                .fac-chat-open { transform: scale(1) translateY(0); opacity: 1; }
                .fac-chat-close { transform: scale(0.85) translateY(30px); opacity: 0; pointer-events: none; }

                .fac-typing-dot {
                    display: inline-block;
                    width: 7px; height: 7px;
                    border-radius: 50%;
                    background: #c084fc;
                    animation: fac-typing-bounce 1.2s ease-in-out infinite;
                }
                @keyframes fac-typing-bounce {
                    0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
                    30% { transform: translateY(-5px); opacity: 1; }
                }

                .fac-slideover-backdrop { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(15,23,42,0.65); backdrop-filter: blur(6px); z-index: 1000; display: flex; justify-content: flex-end; animation: fac-fade-in 0.25s ease-out; }
                .fac-slideover-panel { width: 100%; max-width: 400px; height: 100%; background: rgba(10,10,25,0.97); backdrop-filter: blur(12px); border-left: 1px solid rgba(255,255,255,0.1); display: flex; flex-direction: column; box-sizing: border-box; animation: fac-slide-in 0.3s cubic-bezier(0.25,0.8,0.25,1); box-shadow: -10px 0 40px rgba(0,0,0,0.5); }
                .fac-slideover-header { padding: 18px 22px; border-bottom: 1px solid rgba(255,255,255,0.08); display: flex; justify-content: space-between; align-items: center; }
                .fac-slideover-body { flex: 1; overflow-y: auto; padding: 22px; box-sizing: border-box; }
                .fac-close-btn { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); width: 28px; height: 28px; border-radius: 50%; color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 13px; }

                @keyframes fac-fade-in { from { opacity: 0; } to { opacity: 1; } }
                @keyframes fac-slide-in { from { transform: translateX(100%); } to { transform: translateX(0); } }

                @media (max-width: 500px) {
                    .fac-chat-window { bottom: 0; right: 0; width: 100%; max-width: 100%; height: 75vh; border-radius: 20px 20px 0 0; }
                }
            `}} />
        </div>
    );
}

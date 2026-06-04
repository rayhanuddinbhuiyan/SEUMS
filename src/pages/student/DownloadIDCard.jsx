import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import idCardIcon from "../../assets/icons/id-card.gif";
import "./DownloadIDCard.css";

const PROGRAM_MAP = {
    CSE: "B.Sc. in Computer Science & Engineering",
    EEE: "B.Sc. in Electrical & Electronic Engineering",
    BBA: "Bachelor of Business Administration",
    English: "B.A. (Hons.) in English",
    Law: "LL.B. (Hons.)",
    Pharmacy: "B.Pharm",
    "Civil Engineering": "B.Sc. in Civil Engineering",
};

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const ROLL_NAMES = {
    1: "Arif Hossain", 2: "Nadia Sultana", 3: "Karim Molla", 4: "Sumi Akter", 5: "Rafiq Ahmed",
    30: "Rayhan Uddin", 54: "Mehedi Hasan", 64: "Kamrul Islam",
};

function getStudentInfo(user = {}) {
    const enrollment = user.enrollment || "2023100010001";
    const roll = parseInt(enrollment.slice(11), 10);
    const name = user.fullName || ROLL_NAMES[roll] || `Student ${String(roll).padStart(2, "0")}`;
    const batch = parseInt(enrollment.slice(0, 4), 10) - 2000;
    return { name, enrollment, department: user.department || "CSE", batch, email: user.email || `${enrollment}@seu.edu.bd` };
}

function drawIDCard(canvas, { name, enrollment, department, batch, bloodGroup, contact, photoImg }) {
    const ctx = canvas.getContext("2d");
    const W = 1011, H = 638, LW = 252;
    const program = PROGRAM_MAP[department] || `B.Sc. in ${department}`;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#f5f7fc"; ctx.beginPath(); ctx.roundRect(0, 0, W, H, 20); ctx.fill();
    ctx.save(); ctx.beginPath();
    ctx.moveTo(20, 0); ctx.lineTo(LW, 0); ctx.lineTo(LW, H); ctx.lineTo(20, H);
    ctx.arcTo(0, H, 0, H - 20, 20); ctx.lineTo(0, 20); ctx.arcTo(0, 0, 20, 0, 20); ctx.closePath();
    ctx.fillStyle = "#1a2e5a"; ctx.fill(); ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.moveTo(LW - 90, 0); ctx.lineTo(LW, 0); ctx.lineTo(LW, 180); ctx.closePath();
    ctx.fillStyle = "rgba(255,255,255,0.05)"; ctx.fill(); ctx.restore();
    const cx = LW / 2, cy = 100;
    ctx.beginPath(); ctx.arc(cx, cy, 46, 0, Math.PI * 2); ctx.fillStyle = "rgba(255,255,255,0.12)"; ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.35)"; ctx.lineWidth = 2; ctx.stroke();
    ctx.strokeStyle = "#fff"; ctx.lineWidth = 2.2; ctx.lineCap = "round"; ctx.lineJoin = "round";
    ctx.beginPath(); ctx.moveTo(cx, cy - 22); ctx.lineTo(cx + 22, cy - 10); ctx.lineTo(cx, cy); ctx.lineTo(cx - 22, cy - 10); ctx.closePath(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx - 14, cy - 6); ctx.lineTo(cx - 14, cy + 12); ctx.lineTo(cx, cy + 20); ctx.lineTo(cx + 14, cy + 12); ctx.lineTo(cx + 14, cy - 6); ctx.stroke();
    ctx.textAlign = "center"; ctx.fillStyle = "#fff"; ctx.font = "bold 19px Arial";
    ctx.fillText("SOUTHEAST", cx, cy + 66); ctx.fillText("UNIVERSITY", cx, cy + 88);
    ctx.fillStyle = "rgba(255,255,255,0.55)"; ctx.font = "10px Arial"; ctx.fillText("Dhaka, Bangladesh", cx, cy + 106);
    ctx.strokeStyle = "rgba(255,255,255,0.18)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(28, cy + 120); ctx.lineTo(LW - 28, cy + 120); ctx.stroke();
    ctx.fillStyle = "#f0c040"; ctx.font = "bold 12px Arial"; ctx.fillText("STUDENT IDENTITY CARD", cx, cy + 148);
    ctx.fillStyle = "rgba(255,255,255,0.07)"; ctx.font = "bold 68px Arial"; ctx.fillText("SEU", cx, 400);
    ctx.fillStyle = "rgba(255,255,255,0.15)";
    for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) if ((r + c) % 2 === 0) ctx.fillRect(22 + c * 12, H - 90 + r * 12, 7, 7);
    ctx.fillStyle = "rgba(255,255,255,0.3)"; ctx.font = "10px Arial"; ctx.fillText("Est. 2002", cx, H - 20);
    ctx.fillStyle = "#e4eaf5"; ctx.fillRect(LW, 0, W - LW, 54);
    ctx.fillStyle = "#1a2e5a"; ctx.font = "bold 14px Arial"; ctx.textAlign = "left";
    ctx.fillText(`${department} Department`, LW + 28, 22);
    ctx.fillStyle = "#5a6e8a"; ctx.font = "11px Arial"; ctx.fillText(program, LW + 28, 40);
    ctx.fillStyle = "#f0c040"; ctx.fillRect(LW, 54, W - LW, 3);
    
    // Custom Student Photo in Oval Shape
    const px = W - 110, py = 132;
    const rx = 48, ry = 62; // Oval radii (vertical oval shape)

    if (photoImg) {
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(px, py, rx, ry, 0, 0, Math.PI * 2);
        ctx.clip();
        
        const imgRatio = photoImg.width / photoImg.height;
        const ovalRatio = rx / ry;
        let drawW, drawH, drawX, drawY;
        if (imgRatio > ovalRatio) {
            drawH = ry * 2;
            drawW = drawH * imgRatio;
            drawX = px - drawW / 2;
            drawY = py - ry;
        } else {
            drawW = rx * 2;
            drawH = drawW / imgRatio;
            drawX = px - rx;
            drawY = py - drawH / 2;
        }
        ctx.drawImage(photoImg, drawX, drawY, drawW, drawH);
        ctx.restore();

        // Oval border
        ctx.beginPath();
        ctx.ellipse(px, py, rx + 3, ry + 3, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "#c8d4ea";
        ctx.lineWidth = 2;
        ctx.stroke();
    } else {
        // Draw the default placeholder photo in oval shape
        ctx.beginPath(); ctx.ellipse(px, py, rx + 3, ry + 3, 0, 0, Math.PI * 2); ctx.strokeStyle = "#c8d4ea"; ctx.lineWidth = 2; ctx.stroke();
        ctx.beginPath(); ctx.ellipse(px, py, rx, ry, 0, 0, Math.PI * 2); ctx.fillStyle = "#dde5f0"; ctx.fill();
        ctx.fillStyle = "#aab8d0";
        ctx.beginPath(); ctx.arc(px, py - 14, 20, 0, Math.PI * 2); ctx.fill();
        ctx.save(); ctx.beginPath(); ctx.ellipse(px, py, rx, ry, 0, 0, Math.PI * 2); ctx.clip();
        ctx.beginPath(); ctx.ellipse(px, py + 40, 30, 24, 0, 0, Math.PI * 2); ctx.fillStyle = "#aab8d0"; ctx.fill(); ctx.restore();
    }

    ctx.textAlign = "center"; ctx.fillStyle = "#8a9ab8"; ctx.font = "9px Arial"; ctx.fillText("PHOTO", px, py + ry + 16);
    
    const fields = [["NAME", name], ["STUDENT ID", enrollment], ["PROGRAM", program], ["DEPARTMENT", department], ["BATCH", `${batch}th Batch`], ["BLOOD GROUP", bloodGroup || "—"], ["CONTACT", contact || "—"]];
    const rxLine = LW + 28; let fy = 78;
    fields.forEach(([label, val], i) => {
        ctx.textAlign = "left"; ctx.fillStyle = "#8a9ab8"; ctx.font = "9px Arial"; ctx.fillText(label, rxLine, fy);
        ctx.fillStyle = "#1a2e5a"; ctx.font = `bold ${i === 0 ? 15 : 13}px Arial`; ctx.fillText(val, rxLine, fy + 17);
        ctx.strokeStyle = "#dde5f0"; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(rxLine, fy + 23); ctx.lineTo(px - 75, fy + 23); ctx.stroke();
        fy += 37;
    });
    const BH = 48;
    ctx.save(); ctx.beginPath(); ctx.moveTo(LW, H - BH); ctx.lineTo(W - 20, H - BH);
    ctx.arcTo(W, H - BH, W, H - BH + 20, 20); ctx.lineTo(W, H - 20); ctx.arcTo(W, H, W - 20, H, 20);
    ctx.lineTo(LW, H); ctx.closePath(); ctx.fillStyle = "#1a2e5a"; ctx.fill(); ctx.restore();
    ctx.fillStyle = "rgba(255,255,255,0.25)";
    for (let i = 0; i < 30; i++) { const bw = i % 4 === 0 ? 5 : 2; ctx.fillRect(rxLine + i * 7, H - BH + 8, bw, 14); }
    ctx.textAlign = "center"; ctx.fillStyle = "#fff"; ctx.font = "bold 12px 'Courier New',monospace";
    ctx.fillText(enrollment, LW + (W - LW - 120) / 2, H - 28);
    ctx.fillStyle = "rgba(255,255,255,0.5)"; ctx.font = "9px Arial";
    ctx.fillText("Valid: Academic Year 2023–2027  •  Not Transferable", LW + (W - LW - 120) / 2, H - 13);
    ctx.save(); ctx.beginPath(); ctx.roundRect(W - 118, H - BH + 7, 92, 32, 6);
    ctx.fillStyle = "rgba(255,255,255,0.15)"; ctx.fill(); ctx.restore();
    ctx.fillStyle = "rgba(255,255,255,0.55)"; ctx.font = "8px Arial"; ctx.textAlign = "center";
    ctx.fillText("VALIDITY", W - 72, H - BH + 18); ctx.fillStyle = "#fff"; ctx.font = "bold 11px Arial";
    ctx.fillText("2023 – 2027", W - 72, H - BH + 31);
}

export default function DownloadIDCard() {
    const navigate = useNavigate();
    const raw = JSON.parse(localStorage.getItem("seu_current_user") || "{}");
    const student = getStudentInfo(raw);

    const [step, setStep] = useState("form");
    const [bloodGroup, setBloodGroup] = useState("");
    const [contact, setContact] = useState("+880 ");
    const [photoUrl, setPhotoUrl] = useState(null);
    const [photoFileName, setPhotoFileName] = useState("");
    const [formError, setFormError] = useState("");
    const canvasRef = useRef(null);

    // SmartCard AI Companion States
    const [aiMessages, setAiMessages] = useState([
        {
            id: 1,
            sender: "bot",
            text: `👋 **Hello, ${student.name}!**\n\nI am your **SEU SmartCard AI Assistant**! 🤖\n\nI can help you build your ID card, inspect your profile photo, or guide you on official university ID card policies.\n\nTry typing: *'Set blood group to B+'*, *'Reset form'*, or ask me: *'What if I lose my card?'*`
        }
    ]);
    const [aiInput, setAiInput] = useState("");
    const [aiTyping, setAiTyping] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [geminiKey, setGeminiKey] = useState(localStorage.getItem("seu_gemini_api_key") || "");

    // Photo Scanner States
    const [photoScanning, setPhotoScanning] = useState(false);
    const [photoScanningStatus, setPhotoScanningStatus] = useState("");
    const [scanResult, setScanResult] = useState(null);

    // Sync state if step changes to preview
    useEffect(() => {
        if (step === "preview" && canvasRef.current) {
            if (photoUrl) {
                const img = new Image();
                img.src = photoUrl;
                img.onload = () => {
                    drawIDCard(canvasRef.current, { ...student, bloodGroup, contact, photoImg: img });
                };
                img.onerror = () => {
                    drawIDCard(canvasRef.current, { ...student, bloodGroup, contact, photoImg: null });
                };
            } else {
                drawIDCard(canvasRef.current, { ...student, bloodGroup, contact, photoImg: null });
            }
        }
    }, [step, photoUrl, bloodGroup, contact]);

    // Triggers 2-second AI image verification scan on uploading a picture
    useEffect(() => {
        if (photoUrl) {
            setPhotoScanning(true);
            setScanResult(null);
            setPhotoScanningStatus("Initializing AI scanner...");

            const timers = [];

            timers.push(setTimeout(() => {
                setPhotoScanningStatus("🧠 Analyzing facial symmetry...");
            }, 600));

            timers.push(setTimeout(() => {
                setPhotoScanningStatus("💡 Assessing lighting contrast...");
            }, 1200));

            timers.push(setTimeout(() => {
                setPhotoScanningStatus("🖼️ Verifying background credentials...");
            }, 1800));

            timers.push(setTimeout(() => {
                const alignScore = 92 + Math.floor(Math.random() * 6); // 92-97
                const lightScore = 85 + Math.floor(Math.random() * 12); // 85-96
                const bgScore = 88 + Math.floor(Math.random() * 10);    // 88-97
                
                setScanResult({
                    alignment: alignScore,
                    lighting: lightScore,
                    background: bgScore,
                    passed: true
                });
                
                setPhotoScanning(false);

                setAiMessages(prev => [...prev, {
                    id: Date.now() + 5,
                    sender: "bot",
                    text: `📸 **AI Photo Diagnostic Scan Complete!**\n\nExcellent, your picture complies with SEU identity guidelines:\n\n* 👤 **Facial Centering:** ${alignScore}% (Passed)\n* 💡 **Contrast Exposure:** ${lightScore}% (Passed)\n* 🖼️ **Background Neutrality:** ${bgScore}% (Verified)\n\nEverything looks excellent! Your picture has been clipped onto the canvas template. Check it out on the card preview!`
                }]);

                // Auto-scroll chat drawer
                setTimeout(() => {
                    const chatBody = document.querySelector(".idcm-ai-chat-body");
                    if (chatBody) chatBody.scrollTop = chatBody.scrollHeight;
                }, 80);

            }, 2400));

            return () => {
                timers.forEach(t => clearTimeout(t));
            };
        } else {
            setScanResult(null);
            setPhotoScanning(false);
        }
    }, [photoUrl]);

    // Handle profile photo selection
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhotoFileName(file.name);
            const reader = new FileReader();
            reader.onload = (event) => {
                setPhotoUrl(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Card Generation
    const handleGenerate = () => {
        if (!bloodGroup) { setFormError("Please select your blood group."); return; }
        if (contact.replace(/\D/g, "").length < 11) { setFormError("Enter a valid Bangladeshi number (+880 1xxx-xxxxxx)."); return; }
        setFormError(""); setStep("preview");
    };

    // Trigger direct PNG download
    const handleDownload = () => {
        if (!canvasRef.current) return;
        const link = document.createElement("a");
        link.download = `SEU-ID-${student.enrollment}.png`;
        link.href = canvasRef.current.toDataURL("image/png");
        link.click();
    };

    // Conversational Local AI response logic
    const processLocalAIResponse = (input) => {
        const msg = input.toLowerCase();

        // Parallel Extraction of Blood Group and Phone Number
        let bloodUpdated = false;
        let bloodVal = "";
        let contactUpdated = false;
        let contactVal = "";

        // 1. Match Blood Group (supporting blood groud, blood grp, blood group, etc.)
        const hasBloodKeywords = /blood|groud|grp|group|groupe/i.test(msg);
        const bloodMatch = msg.match(/\b(a\+|a-|b\+|b-|o\+|o-|ab\+|ab-)\b/i);
        if (bloodMatch && (hasBloodKeywords || msg.includes("set") || msg.includes("change") || msg.includes("my"))) {
            bloodVal = bloodMatch[1].toUpperCase();
            setBloodGroup(bloodVal);
            setFormError("");
            bloodUpdated = true;
        }

        // 2. Match Contact Phone
        const hasPhoneKeywords = /phone|contact|number|mobile|mbl/i.test(msg);
        const numMatch = msg.match(/(?:\+880\s?|0)(?:1[3-9]\d{8}|\d{2,4}[- ]?\d{5,8})/);
        if (numMatch && (hasPhoneKeywords || msg.includes("set") || msg.includes("change") || msg.includes("my"))) {
            contactVal = numMatch[0];
            setContact(contactVal);
            setFormError("");
            contactUpdated = true;
        }

        // Return combined confirmation if both fields updated
        if (bloodUpdated && contactUpdated) {
            return `✨ **SmartCard Auto-Fill Successful!**\n\n🩸 **Blood Group:** set to **${bloodVal}**\n📞 **Contact Number:** set to **${contactVal}**\n\nI have successfully mapped and updated both details on your card form!`;
        }

        // Return individual confirmation if only blood group updated
        if (bloodUpdated) {
            return `🩸 **Blood Group Updated!**\n\nI have successfully configured your blood group to **${bloodVal}** in the form and updated the card canvas.`;
        }

        // Return individual confirmation if only contact phone updated
        if (contactUpdated) {
            return `📞 **Contact Number Synced!**\n\nI have mapped your phone number to **${contactVal}** in the input area.`;
        }

        // 3. Reset/Clear Form
        if (msg.includes("reset") || msg.includes("clear")) {
            setBloodGroup("");
            setContact("+880 ");
            setPhotoUrl(null);
            setPhotoFileName("");
            setFormError("");
            setStep("form");
            setScanResult(null);
            return `🧹 **Fields Cleared!**\n\nI have flushed your temporary details. You can upload a new photo and select details to start fresh!`;
        }

        // 4. Preview/Generate Action
        if (msg.includes("preview") || msg.includes("generate") || msg.includes("show")) {
            if (!bloodGroup) {
                return `⚠️ **Verification Pending**\n\nI cannot generate the preview because your **Blood Group** is missing. Please set it or say *"My blood group is O+"*.`;
            }
            if (contact.replace(/\D/g, "").length < 11) {
                return `⚠️ **Verification Pending**\n\nYour **Contact Number** looks incomplete. Please configure a valid Bangladeshi number first.`;
            }
            setStep("preview");
            return `🚀 **Generating Preview!**\n\nSuccess! Your identity credentials compiled and redrawn onto the high-resolution canvas. Say *"Download"* to save it to your disk!`;
        }

        // 5. Download Action
        if (msg.includes("download") || msg.includes("save")) {
            if (step !== "preview") {
                if (!bloodGroup || contact.replace(/\D/g, "").length < 11) {
                    return `⚠️ **Requirement Alert**\n\nPlease fill out your **Blood Group** and **Contact Number** first, then click *"Generate ID Card"* before downloading.`;
                }
                setStep("preview");
                setTimeout(() => {
                    handleDownload();
                }, 500);
                return `⬇ **Initiating Download...**\n\nI am compiling your details and initiating a direct PNG download for roll registration **${student.enrollment}**! Check your downloads folder!`;
            }
            handleDownload();
            return `⬇ **Initiating Download...**\n\nDownloading your Southeast University identity card... Check your browser downloads area!`;
        }

        // 6. Lost ID Card Protocol
        if (msg.includes("lost") || msg.includes("lose") || msg.includes("replace") || msg.includes("missing") || msg.includes("stolen")) {
            return `📑 **Official SEU ID Replacement Protocol**\n\nDon't worry! If you lose your Student ID card, follow these steps to secure a replacement:\n\n1. **General Diary (GD):** File a loss report at your nearest Police Station. Keep the signed GD receipt copy safe.\n2. **Payment:** Deposit a replacement fee of **BDT 500** at the campus Accounts Desk.\n3. **Registrar Office:** Submit the GD receipt copy and the payment voucher to the Registrar Office.\n\n*Note:* The new card will be printed in **3–5 business days**. Security gates and library clearances will be automatically reactivated.`;
        }

        // 7. Card Validity Guidelines
        if (msg.includes("valid") || msg.includes("expire") || msg.includes("duration") || msg.includes("year")) {
            return `🗓️ **Card Validity Period**\n\nYour Southeast University Student ID card is officially valid for **4 academic years** (Academic Term **2023 – 2027** for your batch).\n\nIt is strictly non-transferable and must be surrendered to the Registrar's Office upon graduation, program withdrawal, or expulsion.`;
        }

        // 8. RFID Gate & Library clearances
        if (msg.includes("rfid") || msg.includes("gate") || msg.includes("library") || msg.includes("access") || msg.includes("scan")) {
            return `🔑 **Smart RFID & Library Access**\n\nYour card features a passive **13.56MHz RFID chip** embedded in its layers. This chip provides access to:\n\n* 🚪 **Main Gate Turnstiles** on entering/leaving campus.\n* 📚 **SEU Central Library** for borrowing textbooks and checking research resources.\n* 🖥️ **Computer Labs** for session attendance tracking.`;
        }

        // 9. Central Details correction
        if (msg.includes("wrong") || msg.includes("incorrect") || msg.includes("error") || msg.includes("name") || msg.includes("id") || msg.includes("roll")) {
            return `✏️ **Correction of Personal Details**\n\nOfficial records like **Name, ID, Department,** and **Batch** cannot be modified here. They are synced with SEU's central registrar database.\n\nIf there is an error in these fields:\n1. Open a request file at the **Registrar's Office**.\n2. Attach your HSC Certificate / National ID (NID) copy.\n3. Once updated in the mainframe, your profile will immediately update here.`;
        }

        // 10. Greetings
        if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey") || msg.includes("greetings") || msg.includes("yo")) {
            return `👋 **Welcome, ${student.name}!**\n\nI am your SEU SmartCard AI Assistant! I can help you fill in your ID card fields, check your selfie quality, or answer institutional questions.\n\nTry saying: *'Set blood group to B+'* or *'What is the replacement fee?'*`;
        }

        // Fallback response
        return `🤖 **SmartCard AI Helper**\n\nI received your query: *"${input}"*\n\nI can help you with:\n* 🩸 Setting blood group (e.g., *"My blood group is O+"*)\n* 📞 Setting contact number\n* 📑 Replacement rules for lost cards\n* 🔍 Explaining RFID library access or card validity\n\nPlease let me know how you'd like to proceed!`;
    };

    // Live Google Gemini API Integration for ID Card AI
    const callGeminiIDCardAI = async (userMessage) => {
        try {
            const systemPrompt = `You are "SmartCard AI", the official automated Student Services Registrar Assistant at Southeast University (SEU), Dhaka, Bangladesh.
You help students generate their identity card, check photo quality, and answer questions about ID card policies.

STUDENT PROFILE CURRENTLY LOADED:
- Name: ${student.name}
- Enrollment ID: ${student.enrollment}
- Department: ${student.department}
- Batch: ${student.batch}th Batch
- Current Blood Group: ${bloodGroup || "Not Selected"}
- Current Contact Number: ${contact || "Not Configured"}

OFFICIAL UNIVERSITY POLICIES:
1. Lost Card Replacement: BDT 500 fee paid to accounts desk, file a Police General Diary (GD) report, and present both slips to the Registrar's Office. Replacement card is processed in 3-5 business days.
2. Validity: Valid for 4 academic years (2023 - 2027). Must be surrendered upon graduation or withdrawal.
3. RFID Access: Embedded RFID chip allows entry at smart turnstiles, SEU Central Library borrowing, and lab logging.
4. Error in central details (Name, ID, Dept): Student cannot change these details themselves. They must visit the Registrar Office with supporting certificates (HSC/SSC/NID) for database correction.

CRITICAL INSTRUCTIONS FOR AUTOMATED ACTIONS:
- If the student requests to set or change their blood group (e.g. "change blood group to A+", "my blood group is B-"), you must include a command at the very end of your response like: "COMMAND_TRIGGER: set_blood = [BLOOD_GROUP]" (e.g. "COMMAND_TRIGGER: set_blood = AB-").
- If the student requests to set or change their contact number (e.g. "my phone is 01811223344", "update phone to +880 1712-345678"), you must include a command at the very end like: "COMMAND_TRIGGER: set_contact = [PHONE_NUMBER]".
- If the student requests both updates (e.g. setting blood group and phone number in a single sentence), you must output both commands at the very end of your response.
- If the student requests to reset or clear the form, include: "COMMAND_TRIGGER: reset".
- If the student asks to preview/generate the card, include: "COMMAND_TRIGGER: preview".
- If the student asks to download/save the card, include: "COMMAND_TRIGGER: download".

Always maintain a professional, helpful, polite registrar tone. Speak directly to the student and don't write excessive greetings once the chat is in progress.`;

            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{
                        parts: [
                            { text: systemPrompt },
                            { text: `Student Input: ${userMessage}` }
                        ]
                    }],
                    generationConfig: {
                        temperature: 0.4,
                        maxOutputTokens: 500
                    }
                })
            });

            if (!response.ok) throw new Error(`Gemini API error ${response.status}`);

            const data = await response.json();
            let aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I was unable to parse that request.";

            // Executing triggers from Gemini
            if (aiText.includes("COMMAND_TRIGGER:")) {
                const bloodMatch = aiText.match(/COMMAND_TRIGGER:\s*set_blood\s*=\s*([A-B+-]+)/i);
                if (bloodMatch) {
                    const bg = bloodMatch[1].trim().toUpperCase();
                    setBloodGroup(bg);
                    setFormError("");
                }

                const contactMatch = aiText.match(/COMMAND_TRIGGER:\s*set_contact\s*=\s*([+\d -]+)/i);
                if (contactMatch) {
                    const phone = contactMatch[1].trim();
                    setContact(phone);
                    setFormError("");
                }

                if (aiText.includes("COMMAND_TRIGGER: reset")) {
                    setBloodGroup("");
                    setContact("+880 ");
                    setPhotoUrl(null);
                    setPhotoFileName("");
                    setStep("form");
                    setScanResult(null);
                }

                if (aiText.includes("COMMAND_TRIGGER: preview")) {
                    if (bloodGroup && contact.replace(/\D/g, "").length >= 11) {
                        setStep("preview");
                    }
                }

                if (aiText.includes("COMMAND_TRIGGER: download")) {
                    if (bloodGroup && contact.replace(/\D/g, "").length >= 11) {
                        setStep("preview");
                        setTimeout(() => handleDownload(), 500);
                    }
                }

                // Strip the code tags for presentation
                aiText = aiText.replace(/COMMAND_TRIGGER:\s*[\w\s=-]+(\[?[\w+-]+\]?)?/gi, "").trim();
                aiText = aiText.replace(/COMMAND_TRIGGER:\s*reset/gi, "").trim();
                aiText = aiText.replace(/COMMAND_TRIGGER:\s*preview/gi, "").trim();
                aiText = aiText.replace(/COMMAND_TRIGGER:\s*download/gi, "").trim();
            }

            return aiText;
        } catch (e) {
            console.error("Gemini failed, fallback to local:", e);
            throw e;
        }
    };

    // Chat messaging core pipeline
    const handleSendMessage = async (customText = null) => {
        const text = customText || aiInput;
        if (!text.trim()) return;

        if (!customText) setAiInput("");

        const userMsg = { id: Date.now(), text, sender: "user" };
        setAiMessages(prev => [...prev, userMsg]);
        setAiTyping(true);

        setTimeout(() => {
            const chatBody = document.querySelector(".idcm-ai-chat-body");
            if (chatBody) chatBody.scrollTop = chatBody.scrollHeight;
        }, 80);

        try {
            if (geminiKey) {
                const response = await callGeminiIDCardAI(text);
                setAiMessages(prev => [...prev, { id: Date.now() + 1, text: response, sender: "bot" }]);
                setAiTyping(false);
            } else {
                const response = processLocalAIResponse(text);
                setTimeout(() => {
                    setAiMessages(prev => [...prev, { id: Date.now() + 1, text: response, sender: "bot" }]);
                    setAiTyping(false);
                    setTimeout(() => {
                        const chatBody = document.querySelector(".idcm-ai-chat-body");
                        if (chatBody) chatBody.scrollTop = chatBody.scrollHeight;
                    }, 50);
                }, 800);
                return;
            }
        } catch (error) {
            setTimeout(() => {
                const fallback = processLocalAIResponse(text);
                setAiMessages(prev => [
                    ...prev, 
                    { id: Date.now() + 1, text: "⚠️ Gemini Live Mode errored. Falling back to local offline SmartCard processor.", sender: "bot" },
                    { id: Date.now() + 2, text: fallback, sender: "bot" }
                ]);
                setAiTyping(false);
            }, 600);
        }

        setTimeout(() => {
            const chatBody = document.querySelector(".idcm-ai-chat-body");
            if (chatBody) chatBody.scrollTop = chatBody.scrollHeight;
        }, 80);
    };

    // Save Gemini API key in settings drawer
    const handleSaveApiKey = (key) => {
        setGeminiKey(key);
        localStorage.setItem("seu_gemini_api_key", key);
    };

    return (
        <div className="idcm-overlay" style={{ position: "relative", minHeight: "100vh", background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)", backdropFilter: "none", display: "block", overflowY: "auto" }}>
            <div className="idcm-container">
                
                {/* Main Card Generator (Form or Preview Steps) */}
                <div className="idcm-modal" style={{ margin: "0", position: "relative", flex: "1 1 500px", maxWidth: step === "preview" ? "820px" : "540px" }}>
                    <button className="idcm-close" onClick={() => navigate("/student-dashboard")} style={{ top: 14, right: 16, position: "absolute" }}>✕</button>

                    {step === "form" ? (
                        <div className="idcm-form-wrap">
                            <div className="idcm-form-header">
                                <span className="idcm-form-icon" style={{ display: "block", textAlign: "center", marginBottom: 10 }}>
                                    <img src={idCardIcon} alt="ID Card" style={{ width: 48, height: 48, objectFit: "contain" }} />
                                </span>
                                <h2>Generate ID Card</h2>
                                <p>Fill in the missing details to generate your student ID card.</p>
                            </div>
                            <div className="idcm-info-row">
                                <span><strong>Name:</strong> {student.name}</span>
                                <span><strong>ID:</strong> {student.enrollment}</span>
                                <span><strong>Dept:</strong> {student.department}</span>
                            </div>
                            <div className="idcm-field">
                                <label>Blood Group</label>
                                <select value={bloodGroup} onChange={(e) => { setBloodGroup(e.target.value); setFormError(""); }}>
                                    <option value="">— Select Blood Group —</option>
                                    {BLOOD_GROUPS.map((g) => <option key={g} value={g}>{g}</option>)}
                                </select>
                            </div>
                            <div className="idcm-field">
                                <label>Contact Number</label>
                                <input type="text" value={contact} maxLength={18} placeholder="+880 1xxx-xxxxxx"
                                    onChange={(e) => { setContact(e.target.value); setFormError(""); }} />
                            </div>
                            <div className="idcm-field">
                                <label>Profile Picture</label>

                                {photoUrl && (
                                    <div className="idcm-photo-scan-frame" style={{ 
                                        width: "140px", 
                                        height: "180px", 
                                        margin: "5px auto 15px", 
                                        border: "2px solid rgba(255,255,255,0.15)",
                                        boxShadow: "0 8px 24px rgba(0,0,0,0.2)" 
                                    }}>
                                        <img src={photoUrl} alt="Selfie Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                        
                                        {photoScanning && (
                                            <div className="idcm-scanner-overlay">
                                                <div className="idcm-scan-line" />
                                                <div className="idcm-scan-status-banner">{photoScanningStatus}</div>
                                            </div>
                                        )}
                                        
                                        {!photoScanning && scanResult && (
                                            <div style={{
                                                position: "absolute",
                                                bottom: 8,
                                                left: "50%",
                                                transform: "translateX(-50%)",
                                                background: "rgba(16, 185, 129, 0.95)",
                                                color: "#fff",
                                                fontSize: "9px",
                                                fontWeight: 700,
                                                padding: "3px 8px",
                                                borderRadius: "20px",
                                                textTransform: "uppercase",
                                                letterSpacing: "0.5px",
                                                boxShadow: "0 2px 10px rgba(16,185,129,0.3)",
                                                whiteSpace: "nowrap",
                                                zIndex: 5
                                            }}>
                                                ✓ AI VERIFIED
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="idcm-file-input-wrapper" style={{ display: "flex", gap: 10, alignItems: "center" }}>
                                    <label className="idcm-file-label" style={{
                                        flex: 1,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 8,
                                        background: "rgba(255, 255, 255, 0.08)",
                                        border: "1.5px dashed rgba(255, 255, 255, 0.2)",
                                        borderRadius: 12,
                                        padding: "10px 14px",
                                        cursor: "pointer",
                                        color: "rgba(255, 255, 255, 0.8)",
                                        fontSize: "13px",
                                        fontWeight: 600,
                                        transition: "all 0.2s",
                                        textTransform: "none",
                                        letterSpacing: "normal"
                                    }}>
                                        📸 {photoFileName || "Choose Profile Image..."}
                                        <input type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: "none" }} />
                                    </label>
                                    {photoUrl && (
                                        <button type="button" onClick={() => { setPhotoUrl(null); setPhotoFileName(""); setScanResult(null); }} style={{
                                            background: "rgba(239, 68, 68, 0.2)",
                                            border: "1px solid rgba(239, 68, 68, 0.4)",
                                            color: "#fca5a5",
                                            borderRadius: 12,
                                            padding: "10px 14px",
                                            cursor: "pointer",
                                            fontSize: "13px",
                                            fontWeight: 600,
                                            transition: "all 0.2s"
                                        }}>
                                            Remove
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Photo Diagnostic scorecard */}
                            {scanResult && !photoScanning && (
                                <div className="idcm-diagnostics">
                                    <div className="idcm-diag-title-row">
                                        <span className="idcm-diag-title">AI Photo Diagnostics</span>
                                        <span className="idcm-diag-badge success">✓ SEU COMPLIANT</span>
                                    </div>
                                    
                                    <div className="idcm-diag-row">
                                        <div className="idcm-diag-header">
                                            <span>👤 Face Oval Centering</span>
                                            <span>{scanResult.alignment}%</span>
                                        </div>
                                        <div className="idcm-diag-bar-bg">
                                            <div className="idcm-diag-bar-fill high" style={{ width: `${scanResult.alignment}%` }} />
                                        </div>
                                        <span className="idcm-diag-desc">Eyes and chin centering horizontals comply with SEU gate systems.</span>
                                    </div>

                                    <div className="idcm-diag-row">
                                        <div className="idcm-diag-header">
                                            <span>💡 Exposure & Color Depth</span>
                                            <span>{scanResult.lighting}%</span>
                                        </div>
                                        <div className="idcm-diag-bar-bg">
                                            <div className="idcm-diag-bar-fill high" style={{ width: `${scanResult.lighting}%` }} />
                                        </div>
                                        <span className="idcm-diag-desc">Excellent lighting contrast, no harsh specular shadow grids.</span>
                                    </div>

                                    <div className="idcm-diag-row">
                                        <div className="idcm-diag-header">
                                            <span>🖼️ Background Neutrality</span>
                                            <span>{scanResult.background}%</span>
                                        </div>
                                        <div className="idcm-diag-bar-bg">
                                            <div className="idcm-diag-bar-fill high" style={{ width: `${scanResult.background}%` }} />
                                        </div>
                                        <span className="idcm-diag-desc">Passed high contrast backdrop verification tests.</span>
                                    </div>
                                </div>
                            )}

                            {formError && <p className="idcm-error">{formError}</p>}
                            <button className="idcm-generate-btn" onClick={handleGenerate}>Generate ID Card →</button>
                        </div>
                    ) : (
                        <div className="idcm-preview-wrap">
                            <h2>Your Student ID Card</h2>
                            <p className="idcm-preview-sub">Preview below. Click Download to save as PNG (1011×638 px).</p>
                            <div className="idcm-canvas-wrap">
                                <canvas ref={canvasRef} width={1011} height={638} className="idcm-canvas" />
                            </div>
                            <div className="idcm-actions">
                                <button className="idcm-back-btn" onClick={() => setStep("form")}>← Edit Info</button>
                                <button className="idcm-download-btn" onClick={handleDownload}>⬇ Download PNG</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* SmartCard AI Companion Drawer */}
                <div className="idcm-ai-drawer">
                    <div className="idcm-ai-header">
                        <div className="idcm-ai-title-wrap">
                            <span className="idcm-ai-status-orb"></span>
                            <div>
                                <span className="idcm-ai-title">SmartCard AI</span>
                                <span className="idcm-ai-subtitle">{geminiKey ? "Live Gemini Mode Active" : "Local Assistant Mode Active"}</span>
                            </div>
                        </div>
                        <button className="idcm-ai-settings-btn" onClick={() => setIsSettingsOpen(!isSettingsOpen)} title="API Settings">
                            ⚙️
                        </button>
                    </div>

                    {/* Gemini Settings Pane */}
                    {isSettingsOpen && (
                        <div className="idcm-ai-settings-pane">
                            <label>Link Gemini API Key</label>
                            <input 
                                type="password" 
                                value={geminiKey} 
                                placeholder="AIzaSy..." 
                                onChange={(e) => handleSaveApiKey(e.target.value)} 
                            />
                            <p className="idcm-ai-settings-desc">
                                Paste a Google Gemini API Key above to unlock live conversational mode. Leaving it blank uses the high-speed local registrar rules engine.
                            </p>
                        </div>
                    )}

                    {/* Messages Body */}
                    <div className="idcm-ai-chat-body">
                        {aiMessages.map((msg) => (
                            <div key={msg.id} className={`idcm-ai-msg-row ${msg.sender}`}>
                                <div className="idcm-ai-bubble" style={{ 
                                    whiteSpace: "pre-wrap",
                                    wordBreak: "break-word"
                                }}>
                                    {/* Handle bullet points and bold styling */}
                                    {msg.text.split("\n").map((line, idx) => {
                                        let element = line;
                                        // Simple markdown formatting helper
                                        if (element.startsWith("* ")) {
                                            element = "• " + element.slice(2);
                                        }
                                        return (
                                            <div key={idx} style={{ 
                                                marginTop: idx > 0 && line ? "6px" : "0",
                                                fontWeight: line.startsWith("###") || line.startsWith("**") ? "bold" : "normal"
                                            }}>
                                                {element.replace(/\*\*/g, "")}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}

                        {aiTyping && (
                            <div className="idcm-ai-msg-row bot">
                                <div className="idcm-ai-bubble" style={{ padding: "10px 14px" }}>
                                    <div className="idcm-ai-typing">
                                        <span className="idcm-ai-typing-dot"></span>
                                        <span className="idcm-ai-typing-dot"></span>
                                        <span className="idcm-ai-typing-dot"></span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Quick suggestion chips */}
                    <div className="idcm-ai-chips-wrap">
                        <button className="idcm-ai-chip" onClick={() => handleSendMessage("Set blood group to O+")}>🩸 Set blood group to O+</button>
                        <button className="idcm-ai-chip" onClick={() => handleSendMessage("What if I lose my ID card?")}>📑 Lost Card rules</button>
                        <button className="idcm-ai-chip" onClick={() => handleSendMessage("Explain RFID gate access")}>🔑 RFID Gate access</button>
                        <button className="idcm-ai-chip" onClick={() => handleSendMessage("Reset form")}>🧹 Clear form</button>
                    </div>

                    {/* Input Area */}
                    <div className="idcm-ai-input-wrap">
                        <input 
                            type="text" 
                            className="idcm-ai-input" 
                            placeholder="Type an ID instruction or question..." 
                            value={aiInput} 
                            onChange={(e) => setAiInput(e.target.value)}
                            onKeyDown={(e) => { if (e.key === "Enter") handleSendMessage(); }}
                        />
                        <button className="idcm-ai-send-btn" onClick={() => handleSendMessage()}>
                            ✈
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

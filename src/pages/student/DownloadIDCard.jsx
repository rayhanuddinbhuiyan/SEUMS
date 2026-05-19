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
    }, [step, photoUrl]);

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

    const handleGenerate = () => {
        if (!bloodGroup) { setFormError("Please select your blood group."); return; }
        if (contact.replace(/\D/g, "").length < 11) { setFormError("Enter a valid Bangladeshi number (+880 1xxx-xxxxxx)."); return; }
        setFormError(""); setStep("preview");
    };

    const handleDownload = () => {
        const link = document.createElement("a");
        link.download = `SEU-ID-${student.enrollment}.png`;
        link.href = canvasRef.current.toDataURL("image/png");
        link.click();
    };

    return (
        <div className="idcm-overlay" style={{ position: "relative", minHeight: "100vh", background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)", alignItems: "flex-start", backdropFilter: "none" }}>
            <div className="idcm-modal" style={{ maxWidth: step === "preview" ? "860px" : "520px", margin: "40px auto", position: "static" }}>
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
                                    <button type="button" onClick={() => { setPhotoUrl(null); setPhotoFileName(""); }} style={{
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
        </div>
    );
}

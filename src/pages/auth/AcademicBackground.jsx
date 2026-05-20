import { useEffect, useRef } from "react";

export default function AcademicBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        let animationFrameId;
        let academicItems = [];
        let particles = [];
        let mouseX = -1000;
        let mouseY = -1000;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initAcademicItems();
        };

        const types = ["gradCap", "book", "pencil", "diploma", "atom", "lightbulb"];
        const themeColors = [
            "#a5b4fc", // Indigo
            "#38bdf8", // Cyan
            "#c084fc", // Lavender
            "#fbbf24", // Gold
            "#f472b6", // Rose Pink
            "#34d399"  // Mint Emerald
        ];

        const initAcademicItems = () => {
            academicItems = [];
            const count = 5;
            
            for (let i = 0; i < count; i++) {
                const type = types[i % types.length];
                const color = themeColors[i % themeColors.length];
                
                academicItems.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 15 + 28, // Size scale
                    type,
                    color,
                    angle: Math.random() * Math.PI * 2,
                    spinSpeed: (Math.random() * 0.004 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
                    dx: (Math.random() * 0.15 + 0.05) * (Math.random() > 0.5 ? 1 : -1),
                    dy: (Math.random() * 0.15 + 0.05) * (Math.random() > 0.5 ? 1 : -1),
                    hoverGlow: 0,
                    targetSpin: 0,
                    spinAcceleration: 0
                });
            }
        };

        const drawGradCap = (ctx, item) => {
            const { size, color, angle } = item;
            ctx.save();
            ctx.rotate(angle);
            ctx.strokeStyle = color;
            ctx.fillStyle = "rgba(12, 11, 30, 0.85)";
            ctx.lineWidth = 2.2;

            // Cap top (tilted rhombus)
            ctx.beginPath();
            ctx.moveTo(0, -size * 0.45);
            ctx.lineTo(size * 0.8, 0);
            ctx.lineTo(0, size * 0.45);
            ctx.lineTo(-size * 0.8, 0);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();

            // Skull base
            ctx.beginPath();
            ctx.moveTo(-size * 0.36, size * 0.15);
            ctx.quadraticCurveTo(0, size * 0.38, size * 0.36, size * 0.15);
            ctx.lineTo(size * 0.36, size * 0.38);
            ctx.quadraticCurveTo(0, size * 0.62, -size * 0.36, size * 0.38);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();

            // Tassel line
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.quadraticCurveTo(-size * 0.45, size * 0.12, -size * 0.52, size * 0.3);
            ctx.lineTo(-size * 0.52, size * 0.55);
            ctx.stroke();

            // Tassel body
            ctx.fillStyle = color;
            ctx.fillRect(-size * 0.57, size * 0.52, size * 0.1, size * 0.16);

            ctx.restore();
        };

        const drawBook = (ctx, item) => {
            const { size, color, angle } = item;
            ctx.save();
            ctx.rotate(angle);
            ctx.strokeStyle = color;
            ctx.fillStyle = "rgba(12, 11, 30, 0.85)";
            ctx.lineWidth = 2.2;

            // Open book pages outline
            ctx.beginPath();
            ctx.moveTo(0, size * 0.28);
            ctx.quadraticCurveTo(-size * 0.4, 0, -size * 0.85, size * 0.1);
            ctx.lineTo(-size * 0.85, -size * 0.4);
            ctx.quadraticCurveTo(-size * 0.4, -size * 0.5, 0, -size * 0.22);
            ctx.quadraticCurveTo(size * 0.4, -size * 0.5, size * 0.85, -size * 0.4);
            ctx.lineTo(size * 0.85, size * 0.1);
            ctx.quadraticCurveTo(size * 0.4, 0, 0, size * 0.28);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();

            // Spine division
            ctx.beginPath();
            ctx.moveTo(0, -size * 0.22);
            ctx.lineTo(0, size * 0.28);
            ctx.stroke();

            // Scribing page text lines (subtle details)
            ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            // Left page
            ctx.moveTo(-size * 0.65, -size * 0.22); ctx.lineTo(-size * 0.2, -size * 0.16);
            ctx.moveTo(-size * 0.65, -size * 0.08); ctx.lineTo(-size * 0.2, -size * 0.02);
            ctx.moveTo(-size * 0.65, size * 0.06);  ctx.lineTo(-size * 0.2, size * 0.12);
            // Right page
            ctx.moveTo(size * 0.2, -size * 0.16);  ctx.lineTo(size * 0.65, -size * 0.22);
            ctx.moveTo(size * 0.2, -size * 0.02);  ctx.lineTo(size * 0.65, -size * 0.08);
            ctx.moveTo(size * 0.2, size * 0.12);   ctx.lineTo(size * 0.65, size * 0.06);
            ctx.stroke();

            ctx.restore();
        };

        const drawPencil = (ctx, item) => {
            const { size, color, angle } = item;
            ctx.save();
            ctx.rotate(angle);
            ctx.strokeStyle = color;
            ctx.fillStyle = "rgba(12, 11, 30, 0.85)";
            ctx.lineWidth = 2.2;

            const w = size * 0.25;
            const h = size * 0.9;
            const eraserH = size * 0.14;
            const tipH = size * 0.24;

            // Body
            ctx.beginPath();
            ctx.rect(-w / 2, -h / 2 + tipH, w, h - tipH - eraserH);
            ctx.stroke();
            ctx.fill();

            // Eraser
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.roundRect(-w / 2, h / 2 - eraserH, w, eraserH, [0, 0, 4, 4]);
            ctx.fill();
            ctx.stroke();

            // Divider metal ring
            ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
            ctx.fillRect(-w / 2, h / 2 - eraserH - size * 0.05, w, size * 0.05);

            // Wooden Tip Cone
            ctx.fillStyle = "rgba(12, 11, 30, 0.85)";
            ctx.beginPath();
            ctx.moveTo(-w / 2, -h / 2 + tipH);
            ctx.lineTo(0, -h / 2);
            ctx.lineTo(w / 2, -h / 2 + tipH);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();

            // Lead lead tip
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(-w / 4, -h / 2 + tipH * 0.5);
            ctx.lineTo(0, -h / 2);
            ctx.lineTo(w / 4, -h / 2 + tipH * 0.5);
            ctx.closePath();
            ctx.fill();

            ctx.restore();
        };

        const drawDiploma = (ctx, item) => {
            const { size, color, angle } = item;
            ctx.save();
            ctx.rotate(angle);
            ctx.strokeStyle = color;
            ctx.fillStyle = "rgba(12, 11, 30, 0.85)";
            ctx.lineWidth = 2.2;

            const w = size * 0.85;
            const h = size * 0.36;

            // Main cylinder
            ctx.beginPath();
            ctx.roundRect(-w / 2, -h / 2, w, h, 4);
            ctx.stroke();
            ctx.fill();

            // Spiral roll side lines
            ctx.beginPath();
            ctx.arc(-w / 2, 0, h / 2, 0, Math.PI * 2);
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(w / 2, 0, h / 2, 0, Math.PI * 2);
            ctx.stroke();

            // Tied bow ribbon
            ctx.fillStyle = color;
            ctx.fillRect(-size * 0.08, -h / 2, size * 0.16, h);
            ctx.strokeRect(-size * 0.08, -h / 2, size * 0.16, h);

            // Ribbon ribbons tails
            ctx.beginPath();
            ctx.moveTo(-size * 0.04, h / 2);
            ctx.bezierCurveTo(-size * 0.16, h / 2 + size * 0.22, -size * 0.25, h / 2 + size * 0.1, -size * 0.2, h / 2 + size * 0.32);
            ctx.bezierCurveTo(-size * 0.1, h / 2 + size * 0.22, -size * 0.04, h / 2 + size * 0.1, 0, h / 2);
            ctx.fill();
            ctx.stroke();

            ctx.restore();
        };

        const drawAtom = (ctx, item) => {
            const { size, color, angle } = item;
            ctx.save();
            ctx.rotate(angle);
            ctx.strokeStyle = color;
            ctx.fillStyle = color;
            ctx.lineWidth = 1.8;

            // Core nucleus
            ctx.beginPath();
            ctx.arc(0, 0, size * 0.14, 0, Math.PI * 2);
            ctx.fill();

            // Orbits & electrons
            for (let i = 0; i < 3; i++) {
                ctx.save();
                ctx.rotate((i * Math.PI) / 3);
                
                // Orbit path
                ctx.beginPath();
                ctx.scale(1, 0.34);
                ctx.arc(0, 0, size * 0.72, 0, Math.PI * 2);
                ctx.strokeStyle = "rgba(255, 255, 255, 0.18)";
                ctx.stroke();
                
                // Orbit path color border
                ctx.beginPath();
                ctx.scale(1, 1);
                ctx.arc(0, 0, size * 0.72, 0, Math.PI * 2);
                ctx.strokeStyle = color;
                ctx.lineWidth = 1.2;
                ctx.stroke();

                // Electron dot
                const time = (Date.now() * 0.0018 + i * 2.2) % (Math.PI * 2);
                const ex = size * 0.72 * Math.cos(time);
                const ey = size * 0.72 * 0.34 * Math.sin(time);
                ctx.beginPath();
                ctx.arc(ex, ey, size * 0.07, 0, Math.PI * 2);
                ctx.fill();

                ctx.restore();
            }

            ctx.restore();
        };

        const drawLightbulb = (ctx, item) => {
            const { size, color, angle } = item;
            ctx.save();
            ctx.rotate(angle);
            ctx.strokeStyle = color;
            ctx.fillStyle = "rgba(12, 11, 30, 0.85)";
            ctx.lineWidth = 2.2;

            const r = size * 0.44;

            // Dome contour
            ctx.beginPath();
            ctx.arc(0, -size * 0.08, r, -Math.PI * 0.15, Math.PI * 1.15, true);
            // Stem sides
            ctx.bezierCurveTo(-r * 0.6, size * 0.2, -r * 0.5, size * 0.34, -r * 0.4, size * 0.38);
            ctx.lineTo(r * 0.4, size * 0.38);
            ctx.bezierCurveTo(r * 0.5, size * 0.34, r * 0.6, size * 0.2, r, -size * 0.08);
            ctx.stroke();
            ctx.fill();

            // Cap lines
            ctx.beginPath();
            ctx.rect(-r * 0.38, size * 0.38, r * 0.76, size * 0.09);
            ctx.stroke();
            ctx.fill();

            ctx.beginPath();
            ctx.rect(-r * 0.3, size * 0.47, r * 0.6, size * 0.07);
            ctx.stroke();
            ctx.fill();

            // Contact
            ctx.beginPath();
            ctx.arc(0, size * 0.54, r * 0.12, 0, Math.PI);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.stroke();

            // Filament inner shape
            ctx.fillStyle = "transparent";
            ctx.beginPath();
            ctx.moveTo(-r * 0.2, size * 0.28);
            ctx.lineTo(-r * 0.18, -size * 0.06);
            ctx.lineTo(-r * 0.08, -size * 0.16);
            ctx.lineTo(r * 0.08, -size * 0.16);
            ctx.lineTo(r * 0.18, -size * 0.06);
            ctx.lineTo(r * 0.2, size * 0.28);
            ctx.stroke();

            ctx.restore();
        };

        const createExplosion = (x, y, color) => {
            for (let i = 0; i < 15; i++) {
                particles.push({
                    x,
                    y,
                    dx: (Math.random() * 3 + 1.2) * (Math.random() > 0.5 ? 1 : -1),
                    dy: (Math.random() * 3 + 1.2) * (Math.random() > 0.5 ? 1 : -1),
                    size: Math.random() * 2 + 1,
                    alpha: 1,
                    decay: Math.random() * 0.02 + 0.015,
                    color
                });
            }
        };

        const handleCanvasClick = (e) => {
            const rect = canvas.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;

            academicItems.forEach((item) => {
                const dist = Math.hypot(clickX - item.x, clickY - item.y);
                if (dist <= item.size + 15) {
                    // Start a rapid spin and trigger a glowing color burst!
                    item.spinAcceleration = 0.22;
                    createExplosion(item.x, item.y, item.color);
                }
            });
        };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouseX = -1000;
            mouseY = -1000;
        };

        const drawItem = (ctx, item) => {
            ctx.save();
            ctx.translate(item.x, item.y);
            
            // Set shadows for smooth glow effect
            ctx.shadowColor = item.color;
            ctx.shadowBlur = 10 + item.hoverGlow * 18;
            
            ctx.save();
            if (item.type === "gradCap") drawGradCap(ctx, item);
            else if (item.type === "book") drawBook(ctx, item);
            else if (item.type === "pencil") drawPencil(ctx, item);
            else if (item.type === "diploma") drawDiploma(ctx, item);
            else if (item.type === "atom") drawAtom(ctx, item);
            else if (item.type === "lightbulb") drawLightbulb(ctx, item);
            ctx.restore();

            ctx.restore();
        };

        const updateAndDraw = () => {
            // Background gradient matching login brand style
            ctx.fillStyle = "#0a0918";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Symmetrical glowing background radial gradients
            const grad1 = ctx.createRadialGradient(
                canvas.width * 0.2, canvas.height * 0.2, 0,
                canvas.width * 0.2, canvas.height * 0.2, canvas.width * 0.65
            );
            grad1.addColorStop(0, "rgba(79, 70, 229, 0.08)"); // Soft Indigo
            grad1.addColorStop(1, "rgba(0, 0, 0, 0)");
            ctx.fillStyle = grad1;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const grad2 = ctx.createRadialGradient(
                canvas.width * 0.85, canvas.height * 0.8, 0,
                canvas.width * 0.85, canvas.height * 0.8, canvas.width * 0.65
            );
            grad2.addColorStop(0, "rgba(219, 39, 119, 0.05)"); // Soft Crimson / Rose
            grad2.addColorStop(1, "rgba(0, 0, 0, 0)");
            ctx.fillStyle = grad2;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Connect nearby items with fine dotted glowing lines (Knowledge graph representation)
            ctx.save();
            ctx.strokeStyle = "rgba(165, 180, 252, 0.06)";
            ctx.lineWidth = 1;
            ctx.setLineDash([3, 6]);
            for (let i = 0; i < academicItems.length; i++) {
                for (let j = i + 1; j < academicItems.length; j++) {
                    const dist = Math.hypot(academicItems[i].x - academicItems[j].x, academicItems[i].y - academicItems[j].y);
                    if (dist < 260) {
                        ctx.beginPath();
                        ctx.moveTo(academicItems[i].x, academicItems[i].y);
                        ctx.lineTo(academicItems[j].x, academicItems[j].y);
                        ctx.stroke();
                    }
                }
            }
            ctx.restore();

            // Update & render particles
            particles.forEach((p, idx) => {
                p.x += p.dx;
                p.y += p.dy;
                p.alpha -= p.decay;
                if (p.alpha <= 0) {
                    particles.splice(idx, 1);
                    return;
                }
                ctx.save();
                ctx.globalAlpha = p.alpha;
                ctx.fillStyle = p.color;
                ctx.shadowColor = p.color;
                ctx.shadowBlur = 8;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });

            // Update & render academic symbols
            academicItems.forEach((item) => {
                // Physics drifts
                item.x += item.dx;
                item.y += item.dy;
                item.angle += item.spinSpeed + item.spinAcceleration;

                // Decay spin burst
                if (item.spinAcceleration > 0) {
                    item.spinAcceleration *= 0.95;
                    if (item.spinAcceleration < 0.001) item.spinAcceleration = 0;
                }

                // Bounce walls gently
                if (item.x < -40) item.x = canvas.width + 40;
                if (item.x > canvas.width + 40) item.x = -40;
                if (item.y < -40) item.y = canvas.height + 40;
                if (item.y > canvas.height + 40) item.y = -40;

                // Mouse interaction physics (Magnet pull and hover glow intensity)
                const distToMouse = Math.hypot(mouseX - item.x, mouseY - item.y);
                if (distToMouse < 180) {
                    const glowTarget = (180 - distToMouse) / 180;
                    item.hoverGlow += (glowTarget - item.hoverGlow) * 0.12;

                    // Pull slightly towards cursor
                    const force = (180 - distToMouse) * 0.00015;
                    const angleToMouse = Math.atan2(mouseY - item.y, mouseX - item.x);
                    item.dx += Math.cos(angleToMouse) * force;
                    item.dy += Math.sin(angleToMouse) * force;

                    // Speed limits
                    const currentSpeed = Math.hypot(item.dx, item.dy);
                    if (currentSpeed > 0.8) {
                        item.dx = (item.dx / currentSpeed) * 0.8;
                        item.dy = (item.dy / currentSpeed) * 0.8;
                    }
                } else {
                    item.hoverGlow += (0 - item.hoverGlow) * 0.08;
                    // Restitution to natural slow drift speeds
                    const currentSpeed = Math.hypot(item.dx, item.dy);
                    if (currentSpeed > 0.25) {
                        item.dx *= 0.98;
                        item.dy *= 0.98;
                    }
                }

                drawItem(ctx, item);
            });

            animationFrameId = requestAnimationFrame(updateAndDraw);
        };

        canvas.addEventListener("mousedown", handleCanvasClick);
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseleave", handleMouseLeave);
        window.addEventListener("resize", handleResize);

        handleResize();
        updateAndDraw();

        return () => {
            canvas.removeEventListener("mousedown", handleCanvasClick);
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("mouseleave", handleMouseLeave);
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 0,
                display: "block",
                pointerEvents: "auto"
            }}
        />
    );
}

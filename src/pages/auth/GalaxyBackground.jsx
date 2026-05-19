import { useEffect, useRef } from "react";

export default function GalaxyBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        let animationFrameId;
        let stars = [];
        let shootingStars = [];
        let planets = [];
        let satellites = [];

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initStars();
            initSpaceObjects();
        };

        const initStars = () => {
            stars = [];
            const count = Math.floor((canvas.width * canvas.height) / 7000);
            const themeColors = [
                "#ffffff", // Crystal White
                "#ec9fffff", // Ice Blue
                "#a5b4fc", // Glowing Indigo
                "#f472b6", // Cosmic Rose / Pink
                "#c084fc", // Lavender Purple
                "#38bdf8", // Starry Cyan
                "#fbbf24"  // Amber / Sun Gold
            ];
            for (let i = 0; i < count; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 1.6 + 0.4,
                    alpha: Math.random(),
                    speed: Math.random() * 0.015 + 0.005,
                    color: themeColors[Math.floor(Math.random() * themeColors.length)],
                    twinkleDir: Math.random() > 0.5 ? 1 : -1
                });
            }
        };

        const initSpaceObjects = () => {
            planets = [
                {
                    name: "Uranus",
                    x: canvas.width * 0.12,
                    y: canvas.height * 0.22,
                    radius: 20,
                    color: "#818cf8", // soft themed indigo
                    shadowColor: "#4f46e5",
                    hasRings: true,
                    ringColor: "rgba(129, 140, 248, 0.4)",
                    driftX: 0.012,
                    driftY: -0.006,
                    speedBoost: 1
                },
                {
                    name: "Mars",
                    x: canvas.width * 0.86,
                    y: canvas.height * 0.32,
                    radius: 14,
                    color: "#f43f5e", // themed rose pink
                    shadowColor: "#e11d48",
                    hasRings: false,
                    driftX: -0.008,
                    driftY: 0.005,
                    speedBoost: 1
                },
                {
                    name: "Jupiter",
                    x: canvas.width * 0.35,
                    y: canvas.height * 0.15,
                    radius: 26,
                    color: "#fbbf24", // bright sun gold
                    shadowColor: "#d97706",
                    hasRings: false,
                    driftX: 0.006,
                    driftY: 0.008,
                    speedBoost: 1
                },
                {
                    name: "Neptune",
                    x: canvas.width * 0.75,
                    y: canvas.height * 0.78,
                    radius: 17,
                    color: "#60a5fa", // deep sapphire blue
                    shadowColor: "#1d4ed8",
                    hasRings: false,
                    driftX: -0.014,
                    driftY: -0.004,
                    speedBoost: 1
                },
                {
                    name: "Venus",
                    x: canvas.width * 0.55,
                    y: canvas.height * 0.85,
                    radius: 12,
                    color: "#fb923c", // hot orange
                    shadowColor: "#ea580c",
                    hasRings: false,
                    driftX: 0.01,
                    driftY: -0.01,
                    speedBoost: 1
                }
            ];

            satellites = [
                {
                    type: "comms",
                    name: "Echo-1",
                    x: canvas.width * 0.15,
                    y: canvas.height * 0.65,
                    driftX: 0.15,
                    driftY: -0.04,
                    angle: Math.random() * Math.PI,
                    rotSpeed: 0.003,
                    size: 8,
                    speedBoost: 1,
                    beaconColor: "#ef4444", // Flashing Red
                    thrusterColor: "#00f0ff", // Cyan exhaust
                    beaconTimer: 0
                },
                {
                    type: "telescope",
                    name: "Orion-T",
                    x: canvas.width * 0.75,
                    y: canvas.height * 0.25,
                    driftX: -0.08,
                    driftY: 0.02,
                    angle: Math.random() * Math.PI,
                    rotSpeed: -0.002,
                    size: 10,
                    speedBoost: 1,
                    beaconColor: "#10b981", // Flashing Green
                    thrusterColor: "#fbbf24", // Gold exhaust
                    beaconTimer: 0
                },
                {
                    type: "probe",
                    name: "Sputnik-X",
                    x: canvas.width * 0.45,
                    y: canvas.height * 0.45,
                    driftX: -0.16,
                    driftY: -0.06,
                    angle: Math.random() * Math.PI,
                    rotSpeed: 0.006,
                    size: 6,
                    speedBoost: 1,
                    beaconColor: "#38bdf8", // Flashing Cyan
                    thrusterColor: "#ec4899", // Magenta exhaust
                    beaconTimer: 0
                }
            ];
        };

        const createShootingStar = () => {
            if (shootingStars.length < 2 && Math.random() < 0.006) {
                shootingStars.push({
                    x: Math.random() * canvas.width * 0.7,
                    y: Math.random() * canvas.height * 0.3,
                    dx: Math.random() * 4 + 3,
                    dy: Math.random() * 2 + 1.5,
                    length: Math.random() * 70 + 40,
                    speed: Math.random() * 4 + 6,
                    alpha: 1
                });
            }
        };

        const handleCanvasClick = (e) => {
            const rect = canvas.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;

            // Check planet click
            planets.forEach((p) => {
                const dist = Math.hypot(clickX - p.x, clickY - p.y);
                if (dist <= p.radius + 30) {
                    p.speedBoost = 8; // Blast velocity!
                }
            });

            // Check satellites clicks
            satellites.forEach((s) => {
                const satDist = Math.hypot(clickX - s.x, clickY - s.y);
                if (satDist <= 35) {
                    s.speedBoost = 8; // Boost satellite engines!
                }
            });
        };

        const updateAndDraw = () => {
            // Draw deep space background
            ctx.fillStyle = "#0c0b1e";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw cosmic gas clouds (nebulae)
            const nebGrad1 = ctx.createRadialGradient(
                canvas.width * 0.2, canvas.height * 0.3, 0,
                canvas.width * 0.2, canvas.height * 0.3, canvas.width * 0.5
            );
            nebGrad1.addColorStop(0, "rgba(99, 102, 241, 0.12)");
            nebGrad1.addColorStop(1, "rgba(99, 102, 241, 0)");
            ctx.fillStyle = nebGrad1;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const nebGrad2 = ctx.createRadialGradient(
                canvas.width * 0.8, canvas.height * 0.7, 0,
                canvas.width * 0.8, canvas.height * 0.7, canvas.width * 0.5
            );
            nebGrad2.addColorStop(0, "rgba(236, 72, 153, 0.08)");
            nebGrad2.addColorStop(1, "rgba(236, 72, 153, 0)");
            ctx.fillStyle = nebGrad2;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Twinkle stars
            stars.forEach((star) => {
                star.alpha += star.speed * star.twinkleDir;
                if (star.alpha >= 1) {
                    star.alpha = 1;
                    star.twinkleDir = -1;
                } else if (star.alpha <= 0.1) {
                    star.alpha = 0.1;
                    star.twinkleDir = 1;
                }

                ctx.save();
                ctx.globalAlpha = star.alpha;
                ctx.fillStyle = star.color;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });

            // Draw drifting planets
            planets.forEach((p) => {
                // Decay speed boost
                if (p.speedBoost > 1) {
                    p.speedBoost -= 0.05;
                    if (p.speedBoost < 1) p.speedBoost = 1;
                }

                p.x += p.driftX * p.speedBoost;
                p.y += p.driftY * p.speedBoost;

                if (p.x < -50) p.x = canvas.width + 50;
                if (p.x > canvas.width + 50) p.x = -50;
                if (p.y < -50) p.y = canvas.height + 50;
                if (p.y > canvas.height + 50) p.y = -50;

                // Draw gorgeous jet flame trail in opposite direction of motion if boosted!
                if (p.speedBoost > 1.2) {
                    const dx = -p.driftX;
                    const dy = -p.driftY;
                    const len = Math.sqrt(dx * dx + dy * dy);
                    const ux = dx / len;
                    const uy = dy / len;
                    const flameLen = p.radius * (p.speedBoost - 1) * 2.8;

                    ctx.save();
                    ctx.shadowBlur = 32;
                    ctx.shadowColor = p.color;

                    const flameGrad = ctx.createLinearGradient(p.x, p.y, p.x + ux * flameLen, p.y + uy * flameLen);
                    flameGrad.addColorStop(0, "#ffffff"); // White hot center
                    flameGrad.addColorStop(0.35, p.color); // Themed fire
                    flameGrad.addColorStop(0.7, p.shadowColor);
                    flameGrad.addColorStop(1, "rgba(0, 0, 0, 0)"); // Dispersing smoke

                    ctx.fillStyle = flameGrad;
                    ctx.beginPath();
                    const perpX = -uy;
                    const perpY = ux;
                    ctx.moveTo(p.x - perpX * p.radius * 0.7, p.y - perpY * p.radius * 0.7);
                    ctx.lineTo(p.x + ux * flameLen, p.y + uy * flameLen);
                    ctx.lineTo(p.x + perpX * p.radius * 0.7, p.y + perpY * p.radius * 0.7);
                    ctx.closePath();
                    ctx.fill();
                    ctx.restore();
                }

                ctx.save();
                // 3D Sphere shading
                const radGrad = ctx.createRadialGradient(
                    p.x - p.radius * 0.3,
                    p.y - p.radius * 0.3,
                    0,
                    p.x,
                    p.y,
                    p.radius
                );
                radGrad.addColorStop(0, p.color);
                radGrad.addColorStop(0.7, p.shadowColor);
                radGrad.addColorStop(1, "#070410");

                ctx.shadowBlur = 24;
                ctx.shadowColor = p.color;

                ctx.fillStyle = radGrad;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();

                // Draw tilted elegant rings for Uranus
                if (p.hasRings) {
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate(Math.PI / 6); // 30 degree tilt
                    ctx.scale(2.2, 0.45);   // ring aspect flat ellipse
                    ctx.strokeStyle = p.ringColor;
                    ctx.lineWidth = 2.5;
                    ctx.beginPath();
                    ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
                    ctx.stroke();
                    ctx.restore();
                }
            });

            // Draw drifting futuristic satellites
            satellites.forEach((s) => {
                // Decay speed boost
                if (s.speedBoost > 1) {
                    s.speedBoost -= 0.05;
                    if (s.speedBoost < 1) s.speedBoost = 1;
                }

                s.x += s.driftX * s.speedBoost;
                s.y += s.driftY * s.speedBoost;
                s.angle += s.rotSpeed * s.speedBoost;

                if (s.x < -100) s.x = canvas.width + 100;
                if (s.x > canvas.width + 100) s.x = -100;
                if (s.y < -100) s.y = canvas.height + 100;
                if (s.y > canvas.height + 100) s.y = -100;

                // Draw propulsion thruster jet trails
                if (s.speedBoost > 1.2) {
                    const sdx = -s.driftX;
                    const sdy = -s.driftY;
                    const slen = Math.sqrt(sdx * sdx + sdy * sdy);
                    const sux = sdx / slen;
                    const suy = sdy / slen;
                    const sflameLen = 35 * (s.speedBoost - 1);

                    ctx.save();
                    ctx.shadowBlur = 20;
                    ctx.shadowColor = s.thrusterColor;

                    const satFlameGrad = ctx.createLinearGradient(
                        s.x, s.y,
                        s.x + sux * sflameLen, s.y + suy * sflameLen
                    );
                    satFlameGrad.addColorStop(0, "#ffffff");
                    satFlameGrad.addColorStop(0.3, s.thrusterColor);
                    satFlameGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

                    ctx.fillStyle = satFlameGrad;
                    ctx.beginPath();
                    ctx.moveTo(s.x - suy * 5, s.y + sux * 5);
                    ctx.lineTo(s.x + sux * sflameLen, s.y + suy * sflameLen);
                    ctx.lineTo(s.x + suy * 5, s.y - sux * 5);
                    ctx.closePath();
                    ctx.fill();
                    ctx.restore();
                }

                ctx.save();
                ctx.translate(s.x, s.y);
                ctx.rotate(s.angle);

                if (s.type === "comms") {
                    // Twin solar arrays
                    ctx.fillStyle = "#1e293b";
                    ctx.strokeStyle = "#38bdf8";
                    ctx.lineWidth = 1;
                    ctx.fillRect(-18, -3, 8, 6);
                    ctx.strokeRect(-18, -3, 8, 6);
                    ctx.fillRect(10, -3, 8, 6);
                    ctx.strokeRect(10, -3, 8, 6);

                    // Cross bar
                    ctx.strokeStyle = "#64748b";
                    ctx.beginPath(); ctx.moveTo(-18, 0); ctx.lineTo(18, 0); ctx.stroke();

                    // Center box
                    ctx.fillStyle = "#cbd5e1";
                    ctx.strokeStyle = "#475569";
                    ctx.beginPath(); ctx.rect(-5, -5, 10, 10); ctx.fill(); ctx.strokeRect(-5, -5, 10, 10);

                    // Dish antenna
                    ctx.strokeStyle = "#94a3b8";
                    ctx.beginPath(); ctx.arc(0, -9, 3.5, 0, Math.PI, true); ctx.stroke();
                    ctx.beginPath(); ctx.moveTo(0, -5); ctx.lineTo(0, -9); ctx.stroke();

                } else if (s.type === "telescope") {
                    // Cylinder barrel body
                    ctx.fillStyle = "#94a3b8";
                    ctx.strokeStyle = "#475569";
                    ctx.lineWidth = 1;
                    ctx.fillRect(-6, -14, 12, 22);
                    ctx.strokeRect(-6, -14, 12, 22);

                    // Lens reflection
                    ctx.fillStyle = "#fbbf24";
                    ctx.beginPath(); ctx.ellipse(0, -14, 6, 2.5, 0, 0, Math.PI * 2); ctx.fill();

                    // Solar shields backing
                    ctx.fillStyle = "#f59e0b";
                    ctx.beginPath();
                    ctx.moveTo(-16, 8);
                    ctx.lineTo(16, 8);
                    ctx.lineTo(12, 12);
                    ctx.lineTo(-12, 12);
                    ctx.closePath();
                    ctx.fill();

                } else if (s.type === "probe") {
                    // Sputnik chrome sphere body
                    const probeGrad = ctx.createRadialGradient(-1, -1, 0, 0, 0, 7);
                    probeGrad.addColorStop(0, "#ffffff");
                    probeGrad.addColorStop(1, "#64748b");
                    ctx.fillStyle = probeGrad;
                    ctx.beginPath(); ctx.arc(0, 0, 7, 0, Math.PI * 2); ctx.fill();

                    // Antennas spread out
                    ctx.strokeStyle = "#cbd5e1";
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(-4, -4); ctx.lineTo(-18, -14);
                    ctx.moveTo(-4, 4); ctx.lineTo(-18, 14);
                    ctx.moveTo(-6, -2); ctx.lineTo(-24, -5);
                    ctx.moveTo(-6, 2); ctx.lineTo(-24, 5);
                    ctx.stroke();
                }

                ctx.restore();

                // Telemetry beacon dot (individual custom flashing speeds & colors)
                s.beaconTimer++;
                if (Math.floor(s.beaconTimer / 25) % 2 === 0) {
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
                    ctx.fillStyle = s.beaconColor;
                    ctx.shadowBlur = 12;
                    ctx.shadowColor = s.beaconColor;
                    ctx.fill();
                    ctx.restore();
                }
            });

            // Update and draw shooting stars
            createShootingStar();
            shootingStars.forEach((s, idx) => {
                s.x += s.dx;
                s.y += s.dy;
                s.alpha -= 0.015;

                if (s.alpha <= 0 || s.x > canvas.width || s.y > canvas.height) {
                    shootingStars.splice(idx, 1);
                    return;
                }

                ctx.save();
                ctx.globalAlpha = s.alpha;

                const tailGrad = ctx.createLinearGradient(s.x, s.y, s.x - s.length, s.y - s.length * (s.dy / s.dx));
                tailGrad.addColorStop(0, "#ffffff");
                tailGrad.addColorStop(0.2, "rgba(129, 140, 248, 0.8)");
                tailGrad.addColorStop(1, "rgba(129, 140, 248, 0)");

                ctx.strokeStyle = tailGrad;
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(s.x, s.y);
                ctx.lineTo(s.x - s.length, s.y - s.length * (s.dy / s.dx));
                ctx.stroke();
                ctx.restore();
            });

            animationFrameId = requestAnimationFrame(updateAndDraw);
        };

        canvas.addEventListener("mousedown", handleCanvasClick);
        window.addEventListener("resize", handleResize);
        handleResize();
        updateAndDraw();

        return () => {
            canvas.removeEventListener("mousedown", handleCanvasClick);
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

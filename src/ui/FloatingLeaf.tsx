"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";

export function FloatingLeaf() {
    const [blown, setBlown] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [windParticles, setWindParticles] = useState<{ id: number; y: number }[]>([]);
    const controls = useAnimation();
    const particleId = useRef(0);

    useEffect(() => {
        if (!blown) {
            controls.start({
                x: [0, 5, -5, 0],
                y: [0, -15, 0],
                rotate: [0, 8, -8, 0],
                opacity: 0.7,
                scale: 1,
                transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            });
        }
    }, [blown, controls]);

    const spawnWindParticles = () => {
        const particles = Array.from({ length: 6 }, (_, i) => ({
            id: particleId.current++,
            y: Math.random() * 60 - 30,
        }));
        setWindParticles(particles);
        setTimeout(() => setWindParticles([]), 1000);
    };

    const handleClick = () => {
        if (blown) return;
        setBlown(true);
        spawnWindParticles();
        setShowMessage(true);

        controls.start({
            x: [0, -20, 60, 180, 400, 700],
            y: [0, -40, -80, -20, -120, 60],
            rotate: [0, -30, -120, -250, -400, -600],
            scale: [1, 1.1, 0.95, 0.75, 0.45, 0.1],
            opacity: [0.7, 1, 0.9, 0.7, 0.4, 0],
            transition: {
                duration: 2.5,
                ease: [0.25, 0.1, 0.6, 1],
                times: [0, 0.1, 0.3, 0.5, 0.75, 1],
            },
        });

        setTimeout(() => setShowMessage(false), 2500);
        setTimeout(() => {
            setBlown(false);
        }, 4000);
    };

    return (
        <div className="absolute -bottom-8 right-12 w-24 h-24">
            {/* Wind streak particles */}
            <AnimatePresence>
                {windParticles.map((p) => (
                    <motion.div
                        key={p.id}
                        initial={{ x: 0, y: p.y, opacity: 0.8, scaleX: 0 }}
                        animate={{ x: -120, opacity: 0, scaleX: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        style={{
                            position: "absolute",
                            top: "50%",
                            right: "100%",
                            width: `${40 + Math.random() * 40}px`,
                            height: "1.5px",
                            background: "linear-gradient(to left, rgba(94,234,212,0.6), transparent)",
                            borderRadius: "999px",
                            transformOrigin: "right center",
                            marginTop: `${p.y}px`,
                        }}
                    />
                ))}
            </AnimatePresence>

            {/* Floating message */}
            {/* <AnimatePresence>
                {showMessage && (
                    <motion.p
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: -16 }}
                        exit={{ opacity: 0, y: -24 }}
                        transition={{ duration: 0.4 }}
                        style={{
                            position: "absolute",
                            bottom: "110%",
                            left: "50%",
                            transform: "translateX(-50%)",
                            whiteSpace: "nowrap",
                            fontSize: "11px",
                            color: "rgba(94,234,212,0.8)",
                            pointerEvents: "none",
                        }}
                    >
                        🍃 carried away...
                    </motion.p>
                )}
            </AnimatePresence> */}

            {/* Leaf */}
            <motion.div
                animate={controls}
                onClick={handleClick}
                whileHover={!blown ? { scale: 1.15 } : {}}
                style={{
                    width: "100%",
                    height: "100%",
                    cursor: blown ? "default" : "pointer",
                    willChange: "transform",
                }}
            >
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="leafGradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#34d399" />
                            <stop offset="50%" stopColor="#10b981" />
                            <stop offset="100%" stopColor="#059669" />
                        </linearGradient>
                        <linearGradient id="leafSheen" x1="0" y1="0" x2="60" y2="60" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#6ee7b7" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M50 10 C70 15, 90 35, 88 58 C86 75, 72 88, 55 90 C38 92, 18 80, 12 62 C6 44, 18 18, 50 10 Z"
                        fill="url(#leafGradient)"
                    />
                    <path
                        d="M50 10 C70 15, 90 35, 88 58 C86 75, 72 88, 55 90 C38 92, 18 80, 12 62 C6 44, 18 18, 50 10 Z"
                        fill="url(#leafSheen)"
                    />
                    <path d="M50 12 Q52 50, 55 88" stroke="#065f46" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
                    <path d="M49 30 Q35 38, 20 42" stroke="#065f46" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.4" />
                    <path d="M50 45 Q36 50, 18 55" stroke="#065f46" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.4" />
                    <path d="M52 60 Q40 63, 25 70" stroke="#065f46" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.4" />
                    <path d="M51 30 Q65 35, 78 36" stroke="#065f46" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.4" />
                    <path d="M52 45 Q66 47, 80 48" stroke="#065f46" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.4" />
                    <path d="M53 60 Q65 60, 76 62" stroke="#065f46" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.4" />
                    <path d="M55 90 Q57 96, 54 100" stroke="#065f46" strokeWidth="2" strokeLinecap="round" fill="none" />
                </svg>
            </motion.div>
        </div>
    );
}
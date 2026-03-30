"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Sparkles } from "lucide-react";
import { DailyQuoteSection } from "../ui/DailyQuoteSection";
import { CustomQuoteSection } from "../ui/CustomQuoteSection";

interface Particle {
    left: string;
    top: string;
    xOffset: number;
    duration: number;
}

export default function App() {
    const [activeTab, setActiveTab] = useState<"daily" | "custom">("daily");
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        setParticles(
            Array.from({ length: 6 }, () => ({
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                xOffset: Math.random() * 20 - 10,
                duration: 5 + Math.random() * 3,
            }))
        );
    }, []);

    return (
        <div className="size-full min-h-screen relative overflow-hidden bg-gradient-to-br from-[#133a41] via-[#1a5d68] to-[#133a41]">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-5xl tracking-[0.3em] text-teal-100 mb-4"
                >
                    Quotastic
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-teal-300/60 text-sm mb-12"
                >
                    Find peace in words
                </motion.p>

                {/* Tab Navigation */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex gap-2 mb-12 bg-[#0d2a2e]/60 backdrop-blur-md p-2 rounded-2xl border border-teal-900/30"
                >
                    <button
                        onClick={() => setActiveTab("daily")}
                        className={`px-6 py-3 rounded-xl flex items-center gap-2 transition-all ${
                            activeTab === "daily"
                                ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg"
                                : "text-teal-300 hover:text-white"
                        }`}
                    >
                        <Sun className="w-4 h-4" />
                        <span>Daily Quote</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("custom")}
                        className={`px-6 py-3 rounded-xl flex items-center gap-2 transition-all ${
                            activeTab === "custom"
                                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                                : "text-teal-300 hover:text-white"
                        }`}
                    >
                        <Sparkles className="w-4 h-4" />
                        <span>Random Quote</span>
                    </button>
                </motion.div>

                {/* Content Sections */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full"
                >
                    {activeTab === "daily" ? <DailyQuoteSection /> : <CustomQuoteSection />}
                </motion.div>
            </div>

            {/* Floating particles effect */}
            {particles.map((p, i) => (
                <motion.div
                    key={i}
                    animate={{
                        y: [0, -30, 0],
                        x: [0, p.xOffset, 0],
                        opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: i * 0.8,
                        ease: "easeInOut",
                    }}
                    className="absolute w-2 h-2 rounded-full bg-teal-300/40"
                    style={{ left: p.left, top: p.top }}
                />
            ))}
        </div>
    );
}
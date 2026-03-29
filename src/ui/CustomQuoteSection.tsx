"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Search, X } from "lucide-react";



export function CustomQuoteSection() {
    const [quote, setQuote] = useState<{ quote: string; author: string } | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleSearch = async () => {
        setIsGenerating(true);
        setLoading(true);
        try {


            // const quoteData = await getQuote();

            const response = await fetch(`/api/quote`);
            const data = await response.json();

            console.log(data);

            if (!response.ok) {
                alert(data.message || "Something went wrong");
                setQuote(null);
            } else {
                const quoteObject = data[0];
                setQuote(quoteObject);
                setShowModal(true);
                setIsGenerating(false);
            }

        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const handleNewQuote = () => {
        setShowModal(false);
        setQuote(null);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <>
            <div className="w-full max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <p className="text-teal-200 text-center mb-6 text-sm md:text-base">
                        Enter a topic or theme to generate a personalized
                        quote
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 items-center justify-center px-4">
                        {/* <div className="relative w-full sm:w-96">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-400/50" />
                            <input
                                type="text"
                                onKeyDown={handleKeyPress}
                                placeholder="e.g., motivation, success, love..."
                                className="w-full pl-12 pr-4 py-3 bg-[#0d2a2e]/60 backdrop-blur-md border border-teal-900/30 rounded-2xl text-gray-100 placeholder-teal-400/40 focus:outline-none focus:border-teal-500/50 transition-colors"
                            />
                        </div> */}

                        <motion.button
                            onClick={handleSearch}
                            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl text-white flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/30 transition-shadow"
                        >
                            <Sparkles
                                className={`w-5 h-5 ${isGenerating ? "animate-spin" : ""}`}
                            />
                            <span>
                                {isGenerating ? "Generating..." : "Generate"}
                            </span>
                        </motion.button>
                    </div>

                    <p className="text-teal-400/50 text-xs text-center mt-3">
                        Try: motivation, success, happiness, love, peace,
                        wisdom, courage
                    </p>
                </motion.div>

                {/* {!showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-teal-400/40 py-20"
                    >
                        <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Your personalized quote will appear here</p>
                    </motion.div>
                )} */}
            </div>

            {/* Modal Overlay */}
            <AnimatePresence>
                {showModal && quote && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        onClick={handleClose}
                    >
                        {/* Blurred Background */}
                        <div className="absolute inset-0 bg-[#0a1f23]/80 backdrop-blur-lg" />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-2xl"
                        >
                            {/* Close Button */}
                            <button
                                onClick={handleClose}
                                className="absolute -top-3 -right-3 w-9 h-9 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-10"
                            >
                                <X className="w-4 h-4 text-white" />
                            </button>

                            {/* Quote Card */}
                            <div className="bg-[#0d2a2e]/90 backdrop-blur-md rounded-3xl px-8 py-10 shadow-2xl border border-teal-900/40">
                                {/* Quote Text */}
                                <p className="text-gray-100 text-xl md:text-2xl leading-relaxed text-center mb-6">
                                    "{quote.quote}"
                                </p>

                                {/* Author */}
                                <p className="text-teal-300 text-right text-lg mb-8">
                                    — {quote.author}
                                </p>

                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-3 justify-center">
                                    <motion.button
                                        onClick={handleSearch}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-md hover:shadow-purple-500/30 transition-shadow text-sm"
                                    >
                                        New Quote
                                    </motion.button>
                                </div>
                            </div>

                            {/* Decorative floating element */}
                            <motion.div
                                animate={{
                                    y: [0, -15, 0],
                                    rotate: [0, 8, -8, 0],
                                    x: [0, 5, -5, 0],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="absolute -bottom-8 right-12 w-24 h-24 opacity-70"
                            >
                                <div className="w-full h-full">
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

                                        {/* Leaf body */}
                                        <path
                                            d="M50 10 C70 15, 90 35, 88 58 C86 75, 72 88, 55 90 C38 92, 18 80, 12 62 C6 44, 18 18, 50 10 Z"
                                            fill="url(#leafGradient)"
                                        />

                                        {/* Sheen overlay */}
                                        <path
                                            d="M50 10 C70 15, 90 35, 88 58 C86 75, 72 88, 55 90 C38 92, 18 80, 12 62 C6 44, 18 18, 50 10 Z"
                                            fill="url(#leafSheen)"
                                        />

                                        {/* Center vein */}
                                        <path
                                            d="M50 12 Q52 50, 55 88"
                                            stroke="#065f46"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            fill="none"
                                            opacity="0.6"
                                        />

                                        {/* Side veins - left */}
                                        <path d="M49 30 Q35 38, 20 42" stroke="#065f46" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.4" />
                                        <path d="M50 45 Q36 50, 18 55" stroke="#065f46" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.4" />
                                        <path d="M52 60 Q40 63, 25 70" stroke="#065f46" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.4" />

                                        {/* Side veins - right */}
                                        <path d="M51 30 Q65 35, 78 36" stroke="#065f46" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.4" />
                                        <path d="M52 45 Q66 47, 80 48" stroke="#065f46" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.4" />
                                        <path d="M53 60 Q65 60, 76 62" stroke="#065f46" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.4" />

                                        {/* Stem */}
                                        <path
                                            d="M55 90 Q57 96, 54 100"
                                            stroke="#065f46"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            fill="none"
                                        />
                                    </svg>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
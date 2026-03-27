"use client"

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { QuoteCard } from "./QuoteCard";


export function DailyQuoteSection() {

    const [DailyQuote, setDailyQuote] = useState<{ Quote: string; Author: string } | null>(null);
    const [error, setError] = useState("");

    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });


    useEffect(() => {
        handleDailyQuote();
    }, []);

    const handleDailyQuote = async () => {
        try {
            const response = await fetch(`/api/quote?daily=true`);
            const DailyQuoteData = await response.json();

            // console.log(DailyQuoteData);
            if (!response.ok) {
                alert(DailyQuoteData.message || "Something went wrong");
                setDailyQuote(null);
            } else {
                setDailyQuote(DailyQuoteData);
            }

        } catch (err) {
            console.error("Fetch error:", err)
        }
    }

    return (
        <div className="w-full max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-3 mb-8"
            >
                <Calendar className="w-5 h-5 text-teal-300" />
                <p className="text-teal-200 text-sm md:text-base">{today}</p>
            </motion.div>
            {DailyQuote ? (
                <QuoteCard quote={DailyQuote.Quote} author={DailyQuote.Author} />
            ) : (
                <p className="text-center text-teal-400/60 text-sm">Loading today's quote...</p>
            )}

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center text-teal-400/60 text-sm mt-6"
            >
                Your daily dose of inspiration
            </motion.p>
        </div>
    );
}

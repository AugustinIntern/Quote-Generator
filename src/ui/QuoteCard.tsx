import { motion } from "framer-motion";
import { FloatingLeaf } from "./FloatingLeaf";

interface QuoteCardProps {
  quote: string;
  author: string;
}

export function QuoteCard({ quote, author }: QuoteCardProps) {
  return (
    <motion.div
      key={quote}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="relative max-w-2xl mx-auto"
    >
      {/* Quote Card */}
      <div className="bg-[#0d2a2e]/80 backdrop-blur-md rounded-3xl px-12 py-16 shadow-2xl border border-teal-900/30">
        <p className="text-gray-100 text-xl md:text-2xl leading-relaxed text-center mb-6">
          "{quote}"
        </p>
        <p className="text-teal-300 text-right text-lg">
          — {author}
        </p>
      </div>

      {/* Decorative floating elements */}
      <FloatingLeaf />
    </motion.div>
  );
}

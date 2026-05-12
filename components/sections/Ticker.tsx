"use client";

import { motion } from "framer-motion";

const tickerItems = [
  "NAXI TAXI BB",
  "TAXI DO AERODROMA",
  "POSLOVNI TAXI",
  "PROFESIONALNI VOZAČI",
  "UVEK NA VREME",
];

export default function Ticker() {
  const items = [...tickerItems, ...tickerItems];

  return (
    <div className="bg-yellow-400 py-3 overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center text-gray-900 font-bold text-sm tracking-wider mx-6">
            {item}
            <span className="mx-6 text-gray-700">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

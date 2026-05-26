"use client";

import { motion, useReducedMotion } from "framer-motion";

import { useAccessibility } from "@/components/providers/accessibility-provider";

const cards = [
  { title: "Bugungi dars", text: "Klaviatura bilan boshqarish", tone: "bg-[#f3ebe0]" },
  { title: "Tinglash", text: "Audio tayyor", tone: "bg-[#dfeef5]" },
  { title: "Oson matn", text: "Qisqa izoh ochiq", tone: "bg-[#edf5e6]" },
  { title: "Subtitr", text: "Doim ko‘rsatilsin", tone: "bg-[#fff0cc]" },
  { title: "Dam olish eslatmasi", text: "20 daqiqadan keyin", tone: "bg-[#f7e9e8]" }
];

export function HeroPreview() {
  const prefersReducedMotion = useReducedMotion();
  const { settings } = useAccessibility();
  const shouldReduce = prefersReducedMotion || settings.reduceMotion;

  return (
    <motion.div
      initial={shouldReduce ? false : { opacity: 0, y: 12 }}
      animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="surface-grid rounded-[2.5rem] border border-[var(--border)] bg-[var(--surface)] p-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={shouldReduce ? false : { opacity: 0, y: 12 }}
            animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: shouldReduce ? 0 : index * 0.06 }}
            className={`${card.tone} rounded-[1.75rem] p-4`}
          >
            <p className="text-sm font-semibold text-[var(--muted)]">{card.title}</p>
            <p className="mt-2 text-lg font-semibold">{card.text}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

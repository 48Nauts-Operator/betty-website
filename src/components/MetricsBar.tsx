"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { metrics } from "@/data/metrics";

function AnimatedNumber({
  value,
  suffix,
  prefix,
  inView,
}: {
  value: number;
  suffix: string;
  prefix?: string;
  inView: boolean;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const steps = 40;
    const stepDuration = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      const progress = current / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (current >= steps) {
        setDisplay(value);
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export function MetricsBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-[#F5F7FA] py-16 md:py-20">
      <div
        ref={ref}
        className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
      >
        {metrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center"
          >
            <div className="font-mono text-3xl md:text-4xl font-bold text-[#2B4C7E]">
              <AnimatedNumber
                value={metric.value}
                suffix={metric.suffix}
                prefix={metric.prefix}
                inView={inView}
              />
            </div>
            <div className="text-sm text-[#64748B] mt-2">{metric.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

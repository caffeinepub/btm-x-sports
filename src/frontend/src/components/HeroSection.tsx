import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";

export default function HeroSection() {
  const scrollToSports = () => {
    const el = document.querySelector("#sports");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden grain-overlay"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/btm-x-sports-hero.dim_1600x800.jpg')",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-pitch/90 via-pitch/75 to-pitch/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-pitch via-transparent to-transparent" />

      {/* Decorative accent lines */}
      <div className="absolute top-1/3 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="absolute bottom-1/3 right-0 w-1/3 h-px bg-gradient-to-l from-transparent via-primary/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-6xl mx-auto">
        {/* Pre-title badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 border border-primary/40 bg-primary/10"
        >
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="font-condensed tracking-[0.3em] uppercase text-xs text-primary font-600">
            EST. 2024 — URBAN SPORTS CULTURE
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="font-display font-800 uppercase leading-none tracking-tight mb-2"
        >
          <span className="block text-[clamp(3rem,12vw,9rem)] text-foreground">
            BTM X
          </span>
          <span className="block text-[clamp(3rem,12vw,9rem)] text-gradient-gold">
            SPORTS
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="font-condensed font-600 tracking-[0.25em] uppercase text-[clamp(0.8rem,2.5vw,1.25rem)] text-muted-foreground mt-4 mb-10"
        >
          BUILT TO MOVE. <span className="text-primary">BORN TO WIN.</span>
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            type="button"
            onClick={scrollToSports}
            className="font-condensed font-700 tracking-[0.2em] uppercase text-base px-10 py-4 bg-primary text-primary-foreground hover:shadow-gold-lg hover:-translate-y-1 transition-all duration-300"
            data-ocid="hero.primary_button"
          >
            EXPLORE NOW
          </button>
          <button
            type="button"
            onClick={() =>
              document
                .querySelector("#events")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="font-condensed font-700 tracking-[0.2em] uppercase text-base px-10 py-4 border border-primary/60 text-primary hover:bg-primary/10 transition-all duration-300"
            data-ocid="hero.secondary_button"
          >
            VIEW EVENTS
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-16 grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto"
        >
          {[
            { value: "50+", label: "Athletes" },
            { value: "120+", label: "Events" },
            { value: "15", label: "Sports" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display font-800 text-3xl sm:text-4xl text-primary">
                {stat.value}
              </div>
              <div className="font-condensed tracking-widest uppercase text-xs text-muted-foreground mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-primary/60"
      >
        <span className="font-condensed tracking-widest uppercase text-xs">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}

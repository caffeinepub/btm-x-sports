import { motion } from "motion/react";
import { useGetAllSportsCategories } from "../hooks/useQueries";

const sampleCategories = [
  {
    id: 1n,
    name: "Basketball",
    description:
      "Fast-paced court action with elite ballers pushing limits every game.",
    iconLabel: "🏀",
  },
  {
    id: 2n,
    name: "Skateboarding",
    description:
      "Urban street skating culture redefined with tricks that defy gravity.",
    iconLabel: "🛹",
  },
  {
    id: 3n,
    name: "Boxing",
    description:
      "Sweet science meets raw power in the ring. Discipline forged in fire.",
    iconLabel: "🥊",
  },
  {
    id: 4n,
    name: "Parkour",
    description:
      "The city is your playground. Move fast, think faster, fear nothing.",
    iconLabel: "🏃",
  },
  {
    id: 5n,
    name: "BMX",
    description:
      "Two wheels, infinite possibilities. Aerial acrobatics on the edge.",
    iconLabel: "🚴",
  },
  {
    id: 6n,
    name: "MMA",
    description:
      "Mixed martial arts where every discipline meets ultimate challenge.",
    iconLabel: "🥋",
  },
];

const skeletonKeys = [
  "sp-sk1",
  "sp-sk2",
  "sp-sk3",
  "sp-sk4",
  "sp-sk5",
  "sp-sk6",
];

function SportCardSkeleton() {
  return (
    <div className="bg-pitch-mid border border-border p-6 h-48">
      <div className="shimmer h-12 w-12 mb-4 rounded" />
      <div className="shimmer h-5 w-24 mb-2 rounded" />
      <div className="shimmer h-4 w-full rounded" />
      <div className="shimmer h-4 w-3/4 mt-1 rounded" />
    </div>
  );
}

export default function SportsSection() {
  const { data, isLoading } = useGetAllSportsCategories();
  const categories = data && data.length > 0 ? data : sampleCategories;

  return (
    <section
      id="sports"
      className="py-24 lg:py-32 bg-pitch relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/3 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-condensed tracking-[0.3em] uppercase text-xs text-primary font-600 block mb-3">
            — DISCIPLINES
          </span>
          <h2 className="font-display font-800 uppercase text-4xl sm:text-5xl lg:text-6xl text-foreground leading-none">
            SPORTS <span className="text-gradient-gold">CATEGORIES</span>
          </h2>
          <div className="mt-4 w-20 h-1 bg-primary" />
        </motion.div>

        {/* Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          data-ocid="sports.list"
        >
          {isLoading
            ? skeletonKeys.map((key) => <SportCardSkeleton key={key} />)
            : categories.map((cat, i) => (
                <motion.div
                  key={String(cat.id)}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group relative bg-pitch-mid border border-border hover:border-primary/60 p-6 card-lift cursor-default overflow-hidden"
                  data-ocid={`sports.item.${i + 1}`}
                >
                  {/* Hover bg effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10">
                    <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {cat.iconLabel}
                    </div>
                    <h3 className="font-display font-700 uppercase text-xl text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {cat.name}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  {/* Corner accent */}
                  <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[3rem] border-r-[3rem] border-b-primary/20 border-r-transparent group-hover:border-b-primary/40 transition-all duration-300" />
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
}

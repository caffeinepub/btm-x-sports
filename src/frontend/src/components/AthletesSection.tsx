import { Badge } from "@/components/ui/badge";
import { ChevronDown, Trophy } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Athlete } from "../backend.d";
import { useGetAllAthletes } from "../hooks/useQueries";

const sampleAthletes: Athlete[] = [
  {
    id: 1n,
    name: "Marcus 'Blaze' Thompson",
    sport: "Basketball",
    position: "Point Guard",
    bio: "Born in the Bronx, Marcus has been dominating street courts since age 12. His crossover is legendary.",
    achievements: [
      "BTM Street Champion 2023",
      "NYC All-Star MVP",
      "1000+ Career Points",
    ],
  },
  {
    id: 2n,
    name: "Zara 'Ghost' Chen",
    sport: "Skateboarding",
    position: "Street Specialist",
    bio: "Zara turned the streets of LA into her personal skate park. First female to land a 900 at BTM.",
    achievements: [
      "BTM Skate MVP 2023",
      "X-Games Bronze",
      "Sponsored by 3 major brands",
    ],
  },
  {
    id: 3n,
    name: "DeShawn 'Ironside' Williams",
    sport: "Boxing",
    position: "Light Heavyweight",
    bio: "From the gym to glory. DeShawn's jab is faster than lightning and his footwork is pure poetry.",
    achievements: [
      "BTM Iron Gloves Champion",
      "Regional Golden Gloves",
      "Undefeated in 15 bouts",
    ],
  },
  {
    id: 4n,
    name: "Kofi 'Flash' Asante",
    sport: "Parkour",
    position: "Free Runner",
    bio: "Kofi sees routes where others see walls. His city runs have been viewed 50M+ times online.",
    achievements: [
      "BTM City Run Winner",
      "World Freerunning Top 10",
      "50M+ social views",
    ],
  },
  {
    id: 5n,
    name: "Jake 'Maverick' Rodriguez",
    sport: "BMX",
    position: "Aerial Specialist",
    bio: "Jake's 1080 off the mega ramp made the crowd go silent then explode. He lives for the drop.",
    achievements: [
      "BTM BMX Best Trick",
      "Nitro Circus Performer",
      "5 World Record Attempts",
    ],
  },
  {
    id: 6n,
    name: "Priya 'Venom' Singh",
    sport: "MMA",
    position: "Featherweight",
    bio: "Priya combines jiu-jitsu mastery with Muay Thai striking in a package that's impossible to stop.",
    achievements: [
      "BTM MMA Champion",
      "Regional Grappling Title",
      "8-2 Professional Record",
    ],
  },
];

const sportColors: Record<string, string> = {
  Basketball: "border-amber-500/40 text-amber-400",
  Skateboarding: "border-purple-500/40 text-purple-400",
  Boxing: "border-red-500/40 text-red-400",
  Parkour: "border-green-500/40 text-green-400",
  BMX: "border-blue-500/40 text-blue-400",
  MMA: "border-orange-500/40 text-orange-400",
};

const skeletonKeys = ["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"];

function AthleteCard({ athlete, index }: { athlete: Athlete; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const initials = athlete.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const colorClass =
    sportColors[athlete.sport] || "border-primary/40 text-primary";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group bg-pitch-mid border border-border hover:border-primary/50 overflow-hidden card-lift"
      data-ocid={`athletes.item.${index + 1}`}
    >
      {/* Card header */}
      <div className="relative p-6 pb-4">
        {/* Decorative background number */}
        <div className="absolute top-2 right-4 font-display font-800 text-7xl text-foreground/3 leading-none select-none">
          {String(index + 1).padStart(2, "0")}
        </div>

        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-14 h-14 bg-pitch border-2 border-primary/30 flex items-center justify-center">
              <span className="font-display font-800 text-lg text-primary">
                {initials}
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-700 uppercase text-base text-foreground leading-tight mb-1 truncate">
              {athlete.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className={`font-condensed font-600 tracking-widest uppercase text-xs ${colorClass}`}
              >
                {athlete.sport}
              </Badge>
              <Badge
                variant="outline"
                className="font-condensed font-600 tracking-widest uppercase text-xs border-muted-foreground/30 text-muted-foreground"
              >
                {athlete.position}
              </Badge>
            </div>
          </div>
        </div>

        {/* Bio preview */}
        <p
          className={`font-body text-sm text-muted-foreground mt-3 leading-relaxed ${expanded ? "" : "line-clamp-2"}`}
        >
          {athlete.bio}
        </p>
      </div>

      {/* Achievements expand */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-4 border-t border-border/50 pt-3">
              <div className="flex items-center gap-1.5 mb-2">
                <Trophy size={12} className="text-primary" />
                <span className="font-condensed tracking-widest uppercase text-xs text-primary font-600">
                  Achievements
                </span>
              </div>
              <ul className="space-y-1.5">
                {athlete.achievements.map((ach) => (
                  <li
                    key={ach}
                    className="flex items-start gap-2 text-xs font-body text-muted-foreground"
                  >
                    <span className="text-primary mt-0.5 shrink-0">›</span>
                    {ach}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expand toggle */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full px-6 py-3 border-t border-border/50 flex items-center justify-between text-xs font-condensed font-600 tracking-widest uppercase text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200"
        data-ocid={`athletes.item.${index + 1}.toggle`}
      >
        {expanded ? "HIDE DETAILS" : "VIEW ACHIEVEMENTS"}
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={14} />
        </motion.div>
      </button>
    </motion.div>
  );
}

export default function AthletesSection() {
  const { data, isLoading } = useGetAllAthletes();
  const athletes = data && data.length > 0 ? data : sampleAthletes;

  return (
    <section
      id="athletes"
      className="py-24 lg:py-32 bg-pitch relative overflow-hidden"
    >
      {/* Decorative element */}
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-condensed tracking-[0.3em] uppercase text-xs text-primary font-600 block mb-3">
            — ROSTER
          </span>
          <h2 className="font-display font-800 uppercase text-4xl sm:text-5xl lg:text-6xl text-foreground leading-none">
            OUR <span className="text-gradient-gold">ATHLETES</span>
          </h2>
          <div className="mt-4 w-20 h-1 bg-primary" />
        </motion.div>

        {/* Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          data-ocid="athletes.list"
        >
          {isLoading
            ? skeletonKeys.map((key) => (
                <div
                  key={key}
                  className="bg-pitch-mid border border-border p-6 h-48 shimmer"
                  data-ocid="athletes.loading_state"
                />
              ))
            : athletes.map((athlete, i) => (
                <AthleteCard
                  key={String(athlete.id)}
                  athlete={athlete}
                  index={i}
                />
              ))}
        </div>
      </div>
    </section>
  );
}

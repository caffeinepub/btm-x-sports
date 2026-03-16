import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import type { NewsHighlight } from "../backend.d";
import { useGetAllNews } from "../hooks/useQueries";

const sampleNews: NewsHighlight[] = [
  {
    id: 1n,
    title: "BTM Announces 2026 National Street Basketball Tour",
    summary:
      "The biggest urban basketball tour is expanding to 15 cities across the nation. Registration opens January 15th for all skill levels.",
    category: "Announcement",
    date: 1735948800000000000n,
  },
  {
    id: 2n,
    title: "Zara Chen Lands Historic 900 — First Female at BTM",
    summary:
      "In an electrifying moment at the Urban Skate Invitational, Zara made history with a flawless 900 spin that brought the crowd to its feet.",
    category: "Highlight",
    date: 1735776000000000000n,
  },
  {
    id: 3n,
    title: "New BTM X SPORTS Training Facility Opens in Miami",
    summary:
      "State-of-the-art multi-sport facility featuring an indoor court, boxing ring, skate park, and MMA cage. Memberships now open.",
    category: "News",
    date: 1735603200000000000n,
  },
  {
    id: 4n,
    title: "Iron Gloves Night Draws Record 5,000 Crowd",
    summary:
      "Last weekend's boxing event shattered attendance records at the Fight Club Arena. DeShawn Williams defends his title in a stunning 5th-round TKO.",
    category: "Recap",
    date: 1735430400000000000n,
  },
  {
    id: 5n,
    title: "BTM X SPORTS Partners with Major Energy Brand",
    summary:
      "Exciting new sponsorship deal brings top-tier energy drink partnership, fueling athletes and events across the entire BTM ecosystem.",
    category: "Business",
    date: 1735257600000000000n,
  },
  {
    id: 6n,
    title: "Kofi Asante's City Run Video Goes Viral: 50M Views",
    summary:
      "Kofi's latest parkour run through downtown Atlanta racked up 50 million views in just 72 hours, making him BTM's most viral athlete ever.",
    category: "Viral",
    date: 1735084800000000000n,
  },
];

const categoryColors: Record<string, string> = {
  Announcement: "border-primary/50 text-primary",
  Highlight: "border-amber-500/50 text-amber-400",
  News: "border-blue-500/50 text-blue-400",
  Recap: "border-green-500/50 text-green-400",
  Business: "border-purple-500/50 text-purple-400",
  Viral: "border-red-500/50 text-red-400",
};

const loadingKeys = [
  "ns-sk1",
  "ns-sk2",
  "ns-sk3",
  "ns-sk4",
  "ns-sk5",
  "ns-sk6",
];

function formatDate(date: bigint): string {
  try {
    return new Date(Number(date / 1_000_000n)).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

function NewsCard({
  item,
  index,
  featured,
}: { item: NewsHighlight; index: number; featured?: boolean }) {
  const colorClass =
    categoryColors[item.category] || "border-primary/50 text-primary";

  if (featured) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="group bg-pitch-mid border border-border hover:border-primary/50 p-8 card-lift col-span-1 sm:col-span-2 relative overflow-hidden"
        data-ocid={`news.item.${index + 1}`}
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-gold-light to-transparent" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Badge
              variant="outline"
              className={`font-condensed font-600 tracking-widest uppercase text-xs ${colorClass}`}
            >
              {item.category}
            </Badge>
            <span className="font-body text-xs text-muted-foreground">
              {formatDate(item.date)}
            </span>
          </div>
          <h3 className="font-display font-700 uppercase text-2xl sm:text-3xl text-foreground leading-tight mb-4 group-hover:text-primary transition-colors duration-300">
            {item.title}
          </h3>
          <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
            {item.summary}
          </p>
          <div className="flex items-center gap-2 text-xs font-condensed font-600 tracking-widest uppercase text-primary">
            READ MORE <ArrowRight size={12} />
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="group bg-pitch-mid border border-border hover:border-primary/50 p-5 card-lift relative overflow-hidden"
      data-ocid={`news.item.${index + 1}`}
    >
      <div className="flex items-center gap-3 mb-3">
        <Badge
          variant="outline"
          className={`font-condensed font-600 tracking-widest uppercase text-xs ${colorClass}`}
        >
          {item.category}
        </Badge>
        <span className="font-body text-xs text-muted-foreground">
          {formatDate(item.date)}
        </span>
      </div>
      <h3 className="font-display font-700 uppercase text-base text-foreground leading-tight mb-2 group-hover:text-primary transition-colors duration-300">
        {item.title}
      </h3>
      <p className="font-body text-sm text-muted-foreground leading-relaxed line-clamp-3">
        {item.summary}
      </p>
      <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-primary transition-all duration-500" />
    </motion.article>
  );
}

export default function NewsSection() {
  const { data, isLoading } = useGetAllNews();
  const news = data && data.length > 0 ? data : sampleNews;
  const [featured, ...rest] = news;

  return (
    <section
      id="news"
      className="py-24 lg:py-32 bg-pitch-mid relative overflow-hidden"
    >
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
            — LATEST
          </span>
          <h2 className="font-display font-800 uppercase text-4xl sm:text-5xl lg:text-6xl text-foreground leading-none">
            NEWS & <span className="text-gradient-gold">HIGHLIGHTS</span>
          </h2>
          <div className="mt-4 w-20 h-1 bg-primary" />
        </motion.div>

        {isLoading ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            data-ocid="news.loading_state"
          >
            {loadingKeys.map((key, i) => (
              <div
                key={key}
                className={`bg-pitch-mid border border-border h-40 shimmer ${i === 0 ? "sm:col-span-2" : ""}`}
              />
            ))}
          </div>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            data-ocid="news.list"
          >
            {featured && <NewsCard item={featured} index={0} featured />}
            {rest.map((item, i) => (
              <NewsCard key={String(item.id)} item={item} index={i + 1} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { SportsEvent } from "../backend.d";
import { Status, useGetAllEvents } from "../hooks/useQueries";

const sampleEvents: SportsEvent[] = [
  {
    id: 1n,
    title: "BTM Street Basketball Championship",
    sportType: "Basketball",
    date: 1735689600000000000n,
    location: "Downtown Arena, NYC",
    description:
      "Annual street basketball showdown featuring top urban ballers competing for the golden trophy.",
    status: Status.upcoming,
  },
  {
    id: 2n,
    title: "Urban Skate Invitational",
    sportType: "Skateboarding",
    date: 1736208000000000000n,
    location: "BTM Skate Park, LA",
    description:
      "Elite skaters from across the country battle it out on the freshest rails and ramps.",
    status: Status.live,
  },
  {
    id: 3n,
    title: "Iron Gloves Boxing Night",
    sportType: "Boxing",
    date: 1734480000000000000n,
    location: "Fight Club Arena, Chicago",
    description:
      "A night of pure boxing excellence with bouts across multiple weight divisions.",
    status: Status.completed,
  },
  {
    id: 4n,
    title: "Parkour City Run",
    sportType: "Parkour",
    date: 1737504000000000000n,
    location: "Atlanta Urban Circuit",
    description:
      "Competitors race through a city obstacle course in a timed challenge of agility and speed.",
    status: Status.upcoming,
  },
  {
    id: 5n,
    title: "BMX Extreme Showdown",
    sportType: "BMX",
    date: 1733270400000000000n,
    location: "BTM Mega Ramp, Miami",
    description:
      "Insane aerial tricks and technical wizardry from the world's most daring BMX riders.",
    status: Status.completed,
  },
  {
    id: 6n,
    title: "MMA Fight Night",
    sportType: "MMA",
    date: 1736640000000000000n,
    location: "The Cage, Houston",
    description:
      "Full-contact mixed martial arts competition showcasing all disciplines of combat sports.",
    status: Status.live,
  },
];

const loadingKeys = ["ev-sk1", "ev-sk2", "ev-sk3"];

function formatDate(date: bigint): string {
  try {
    return new Date(Number(date / 1_000_000n)).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "TBD";
  }
}

function EventCard({ event, index }: { event: SportsEvent; index: number }) {
  const isLive = event.status === Status.live;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className={`relative bg-pitch-mid border p-5 card-lift overflow-hidden ${
        isLive
          ? "border-destructive/50 pulse-live"
          : "border-border hover:border-primary/50"
      }`}
      data-ocid={`events.item.${index + 1}`}
    >
      {isLive && (
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 bg-destructive/20 border border-destructive/50">
          <Zap
            size={10}
            className="text-destructive fill-current animate-pulse"
          />
          <span className="font-condensed font-700 tracking-widest uppercase text-xs text-destructive">
            LIVE
          </span>
        </div>
      )}

      <Badge
        variant="outline"
        className="font-condensed font-600 tracking-widest uppercase text-xs border-primary/40 text-primary mb-3"
      >
        {event.sportType}
      </Badge>

      <h3 className="font-display font-700 uppercase text-lg text-foreground leading-tight mb-3">
        {event.title}
      </h3>

      <p className="font-body text-sm text-muted-foreground mb-4 line-clamp-2">
        {event.description}
      </p>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar size={12} className="text-primary shrink-0" />
          <span className="font-body">{formatDate(event.date)}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <MapPin size={12} className="text-primary shrink-0" />
          <span className="font-body truncate">{event.location}</span>
        </div>
      </div>

      <div
        className={`absolute bottom-0 left-0 h-0.5 transition-all duration-500 ${isLive ? "bg-destructive w-full" : "bg-primary w-0"}`}
      />
    </motion.div>
  );
}

function EmptyEvents({ label }: { label: string }) {
  return (
    <div
      className="col-span-full text-center py-16"
      data-ocid="events.empty_state"
    >
      <div className="text-4xl mb-4">🏟️</div>
      <p className="font-condensed tracking-widest uppercase text-sm text-muted-foreground">
        No {label} events at the moment
      </p>
    </div>
  );
}

export default function EventsSection() {
  const { data, isLoading } = useGetAllEvents();
  const [activeTab, setActiveTab] = useState<string>("upcoming");

  const events = data && data.length > 0 ? data : sampleEvents;

  const filtered = {
    upcoming: events.filter((e) => e.status === Status.upcoming),
    live: events.filter((e) => e.status === Status.live),
    completed: events.filter((e) => e.status === Status.completed),
  };

  return (
    <section
      id="events"
      className="py-24 lg:py-32 bg-pitch-mid relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-pitch to-transparent h-32 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="font-condensed tracking-[0.3em] uppercase text-xs text-primary font-600 block mb-3">
            — SCHEDULE
          </span>
          <h2 className="font-display font-800 uppercase text-4xl sm:text-5xl lg:text-6xl text-foreground leading-none">
            UPCOMING <span className="text-gradient-gold">EVENTS</span>
          </h2>
          <div className="mt-4 w-20 h-1 bg-primary" />
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-pitch border border-border mb-8 h-auto p-1 gap-1">
            {["upcoming", "live", "completed"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="font-condensed font-700 tracking-widest uppercase text-sm px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-muted-foreground"
                data-ocid={`events.${tab}.tab`}
              >
                {tab === "live" && (
                  <span className="inline-block w-2 h-2 bg-destructive rounded-full mr-2 animate-pulse" />
                )}
                {tab}
                {tab === "live" && filtered.live.length > 0 && (
                  <span className="ml-2 px-1.5 py-0.5 bg-destructive/20 text-destructive text-xs rounded">
                    {filtered.live.length}
                  </span>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {isLoading ? (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              data-ocid="events.loading_state"
            >
              {loadingKeys.map((key) => (
                <div
                  key={key}
                  className="bg-pitch-mid border border-border p-5 h-52 shimmer"
                />
              ))}
            </div>
          ) : (
            ["upcoming", "live", "completed"].map((tab) => (
              <TabsContent key={tab} value={tab}>
                <AnimatePresence mode="wait">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(filtered as Record<string, SportsEvent[]>)[tab].length ===
                    0 ? (
                      <EmptyEvents label={tab} />
                    ) : (
                      (filtered as Record<string, SportsEvent[]>)[tab].map(
                        (event, i) => (
                          <EventCard
                            key={String(event.id)}
                            event={event}
                            index={i}
                          />
                        ),
                      )
                    )}
                  </div>
                </AnimatePresence>
              </TabsContent>
            ))
          )}
        </Tabs>
      </div>
    </section>
  );
}

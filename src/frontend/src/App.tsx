import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import AdminPanel from "./components/AdminPanel";
import AthletesSection from "./components/AthletesSection";
import ContactSection from "./components/ContactSection";
import EventsSection from "./components/EventsSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import NewsSection from "./components/NewsSection";
import SportsSection from "./components/SportsSection";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 2,
    },
  },
});

export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    const handler = () => setShowAdmin((prev) => !prev);
    window.addEventListener("toggle-admin", handler);
    return () => window.removeEventListener("toggle-admin", handler);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AnimatePresence mode="wait">
        {showAdmin ? (
          <AdminPanel key="admin" onClose={() => setShowAdmin(false)} />
        ) : (
          <div
            key="site"
            className="min-h-screen bg-background text-foreground"
          >
            <Navbar />
            <main>
              <HeroSection />
              <SportsSection />
              <EventsSection />
              <AthletesSection />
              <NewsSection />
              <ContactSection />
            </main>
            <Footer />
          </div>
        )}
      </AnimatePresence>
      <Toaster
        theme="dark"
        toastOptions={{
          classNames: {
            toast: "bg-pitch-mid border-border font-body",
            title:
              "text-foreground font-condensed tracking-widest uppercase text-xs",
            description: "text-muted-foreground",
          },
        }}
      />
    </QueryClientProvider>
  );
}

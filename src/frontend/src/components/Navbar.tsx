import { Menu, Settings, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Sports", href: "#sports" },
  { label: "Events", href: "#events" },
  { label: "Athletes", href: "#athletes" },
  { label: "News", href: "#news" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleAdminClick = () => {
    setMobileOpen(false);
    window.dispatchEvent(new CustomEvent("toggle-admin"));
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-pitch/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <button
            type="button"
            onClick={() => handleNavClick("#home")}
            className="flex items-center gap-2 shrink-0"
            data-ocid="nav.link"
          >
            <img
              src="/assets/generated/btm-x-sports-logo-transparent.dim_400x200.png"
              alt="BTM X SPORTS"
              className="h-10 lg:h-12 w-auto object-contain"
            />
          </button>

          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  type="button"
                  onClick={() => handleNavClick(link.href)}
                  className="font-condensed font-700 tracking-widest uppercase text-sm px-4 py-2 text-muted-foreground hover:text-primary transition-colors duration-200 relative group"
                  data-ocid={`nav.${link.label.toLowerCase()}.link`}
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-3/4 transition-all duration-300" />
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-2">
            <button
              type="button"
              onClick={handleAdminClick}
              className="flex items-center gap-1.5 font-condensed tracking-widest uppercase text-xs px-3 py-2 border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-200"
              data-ocid="admin.button"
            >
              <Settings className="h-3.5 w-3.5" /> Admin
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("#contact")}
              className="flex items-center gap-2 font-condensed font-700 tracking-widest uppercase text-sm px-5 py-2 bg-primary text-primary-foreground hover:shadow-gold-lg transition-all duration-300"
              data-ocid="nav.primary_button"
            >
              JOIN NOW
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-foreground p-2"
            aria-label="Toggle menu"
            data-ocid="nav.toggle"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-pitch/98 backdrop-blur-md border-b border-border overflow-hidden"
          >
            <ul className="px-4 pb-4 pt-2 flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(link.href)}
                    className="w-full text-left font-condensed font-700 tracking-widest uppercase text-base px-3 py-3 text-muted-foreground hover:text-primary transition-colors border-b border-border/30"
                    data-ocid={`nav.mobile.${link.label.toLowerCase()}.link`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <button
                  type="button"
                  onClick={handleAdminClick}
                  className="w-full flex items-center justify-center gap-2 font-condensed tracking-widest uppercase text-base px-3 py-3 border border-border/60 text-muted-foreground mb-2"
                  data-ocid="admin.button"
                >
                  <Settings className="h-4 w-4" /> Admin
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick("#contact")}
                  className="w-full font-condensed font-700 tracking-widest uppercase text-base px-3 py-3 bg-primary text-primary-foreground text-center"
                  data-ocid="nav.mobile.primary_button"
                >
                  JOIN NOW
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

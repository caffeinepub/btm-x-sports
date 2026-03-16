import { SiInstagram, SiTiktok, SiX, SiYoutube } from "react-icons/si";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Sports", href: "#sports" },
  { label: "Events", href: "#events" },
  { label: "Athletes", href: "#athletes" },
  { label: "News", href: "#news" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: SiInstagram, label: "Instagram" },
  { icon: SiX, label: "X" },
  { icon: SiYoutube, label: "YouTube" },
  { icon: SiTiktok, label: "TikTok" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-pitch border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <img
              src="/assets/generated/btm-x-sports-logo-transparent.dim_400x200.png"
              alt="BTM X SPORTS"
              className="h-10 w-auto mb-4"
            />
            <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-xs">
              Urban sports culture at its finest. We empower athletes to push
              beyond limits and dominate their game.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 mt-4">
              {socialLinks.map((s) => (
                <button
                  type="button"
                  key={s.label}
                  aria-label={s.label}
                  className="w-8 h-8 border border-border hover:border-primary/60 flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-200"
                  data-ocid={`footer.${s.label.toLowerCase()}.link`}
                >
                  <s.icon size={13} />
                </button>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-condensed font-700 tracking-[0.2em] uppercase text-sm text-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => handleLinkClick(link.href)}
                    className="font-body text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2 group"
                    data-ocid={`footer.${link.label.toLowerCase()}.link`}
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-primary transition-all duration-200" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-condensed font-700 tracking-[0.2em] uppercase text-sm text-foreground mb-4">
              Get in Touch
            </h4>
            <div className="space-y-3">
              <div>
                <span className="font-condensed tracking-widest uppercase text-xs text-primary block mb-1">
                  Email
                </span>
                <span className="font-body text-sm text-muted-foreground">
                  info@btmxsports.com
                </span>
              </div>
              <div>
                <span className="font-condensed tracking-widest uppercase text-xs text-primary block mb-1">
                  Headquarters
                </span>
                <span className="font-body text-sm text-muted-foreground">
                  New York City, NY
                </span>
              </div>
              <div>
                <span className="font-condensed tracking-widest uppercase text-xs text-primary block mb-1">
                  Inquiries
                </span>
                <span className="font-body text-sm text-muted-foreground">
                  athletes@btmxsports.com
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-body text-xs text-muted-foreground">
            © {currentYear} BTM X SPORTS. All rights reserved.
          </span>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            Built with ❤ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}

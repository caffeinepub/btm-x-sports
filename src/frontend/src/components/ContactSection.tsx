import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";
import { useState } from "react";
import { SiInstagram, SiTiktok, SiX, SiYoutube } from "react-icons/si";
import { toast } from "sonner";

export default function ContactSection() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    setSubmitted(true);
    toast.success("You're in! Welcome to the BTM X SPORTS family.");
    setEmail("");
  };

  const socials = [
    { icon: SiInstagram, label: "Instagram", href: "#" },
    { icon: SiX, label: "X (Twitter)", href: "#" },
    { icon: SiYoutube, label: "YouTube", href: "#" },
    { icon: SiTiktok, label: "TikTok", href: "#" },
  ];

  return (
    <section
      id="contact"
      className="py-24 lg:py-32 bg-pitch relative overflow-hidden clip-diagonal-reverse"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-primary/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-condensed tracking-[0.3em] uppercase text-xs text-primary font-600 block mb-4">
            — BE PART OF SOMETHING BIGGER
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-800 uppercase leading-none mb-6"
        >
          <span className="block text-[clamp(2rem,7vw,5.5rem)] text-foreground">
            JOIN THE BTM X
          </span>
          <span className="block text-[clamp(2rem,7vw,5.5rem)] text-gradient-gold">
            SPORTS FAMILY
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-body text-muted-foreground text-lg mb-10 max-w-xl mx-auto"
        >
          Get exclusive updates, early event access, and insider content from
          the world of BTM X SPORTS.
        </motion.p>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-12"
        >
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-pitch-mid border-border text-foreground placeholder:text-muted-foreground font-body h-12 text-base focus-visible:ring-primary"
            aria-label="Email address"
            data-ocid="contact.input"
          />
          <Button
            type="submit"
            disabled={submitting || submitted}
            className="font-condensed font-700 tracking-widest uppercase text-sm h-12 px-8 bg-primary text-primary-foreground hover:shadow-gold-lg hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70"
            data-ocid="contact.submit_button"
          >
            {submitted ? "✓ JOINED!" : submitting ? "JOINING..." : "JOIN NOW"}
          </Button>
        </motion.form>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-4"
        >
          <span className="font-condensed tracking-widest uppercase text-xs text-muted-foreground">
            FOLLOW US
          </span>
          <div className="w-8 h-px bg-border" />
          <div className="flex items-center gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 border border-border hover:border-primary/60 flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-200 hover:-translate-y-1"
                data-ocid={`contact.${social.label.toLowerCase().replace(/[^a-z]/g, "")}.link`}
              >
                <social.icon size={16} />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

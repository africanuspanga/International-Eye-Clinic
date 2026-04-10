import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface PageHeroProps {
  label: string;
  title: string;
  highlight?: string;
  description?: string;
  breadcrumbs?: { label: string; href: string }[];
  image?: string;
  cta?: { label: string; href: string };
}

export default function PageHero({
  label,
  title,
  highlight,
  description,
  breadcrumbs,
  cta,
}: PageHeroProps) {
  return (
    <section className="relative bg-[#1a2a6c] py-20 overflow-hidden">
      {/* Pattern */}
      <div className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />
      {/* Red accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#e62d26]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Breadcrumbs */}
        {breadcrumbs && (
          <nav className="flex items-center gap-1.5 text-white/50 text-xs mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            {breadcrumbs.map((b) => (
              <span key={b.label} className="flex items-center gap-1.5">
                <ChevronRight size={12} />
                <Link href={b.href} className="hover:text-white transition-colors">{b.label}</Link>
              </span>
            ))}
          </nav>
        )}

        <div className="section-label" style={{ background: "rgba(255,255,255,0.12)", color: "white" }}>
          {label}
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mt-3 mb-4 max-w-3xl" style={{ fontFamily: "'Merriweather', serif" }}>
          {title}
          {highlight && <span className="text-[#e62d26]"> {highlight}</span>}
        </h1>
        {description && (
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
            {description}
          </p>
        )}
        {cta && (
          <Link href={cta.href}
            className="inline-flex items-center gap-2 bg-[#e62d26] hover:bg-[#c4201a] text-white font-semibold px-7 py-3.5 rounded-full text-sm transition-colors"
            style={{ fontFamily: "'Poppins', sans-serif" }}>
            {cta.label}
          </Link>
        )}
      </div>
    </section>
  );
}

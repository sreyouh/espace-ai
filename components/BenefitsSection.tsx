"use client";

const benefits = [
  {
    title: "Recognized on Google Search",
    desc: "Your portfolio gets indexed by Google so when anyone searches your name, your professional page appears instantly.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    highlight: true,
  },
  {
    title: "Appear in Google AI Results",
    desc: "Google's AI overviews and Gemini surface your portfolio when professionals, recruiters, or clients search for your skills.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: "Your Image on Google",
    desc: "Upload your professional photo and it appears directly in Google's knowledge panel — a true digital identity.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
  {
    title: "Built in Minutes, Not Days",
    desc: "Fill a simple form — Espace AI structures your content, picks the best layout, and publishes your site automatically.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    title: "Impress Recruiters Instantly",
    desc: "A clean, professional portfolio with your projects, skills, and experience makes a stronger impression than any resume.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Own Your Professional Identity",
    desc: "Your portfolio at your own domain means you own your online presence — not a social network, not a job board.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

export default function BenefitsSection() {
  return (
    <section className="section benefits" id="benefits">
      <div className="container">
        <div className="section-header">
          <p className="section-label">Why Espace AI</p>
          <h2 className="section-title">
            Everything your portfolio<br />needs to get noticed
          </h2>
          <p className="section-sub">
            Not just a website — a presence that works for you 24/7 across
            Google Search, Google AI, and every recruiter's screen.
          </p>
        </div>

        <div className="benefits-grid">
          {benefits.map((b, i) => (
            <div key={i} className={`benefit-card ${b.highlight ? "highlight" : ""}`}>
              <div className="benefit-icon">{b.icon}</div>
              <h3 className="benefit-title">{b.title}</h3>
              <p className="benefit-desc">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

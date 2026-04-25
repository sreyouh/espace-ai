"use client";
import Link from "next/link";

const CheckIcon = () => (
  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="2 6 5 9 10 3" />
  </svg>
);

const freePlan = {
  tag: "Free Forever",
  tagClass: "free-tag",
  name: "Free Portfolio",
  amount: "0",
  period: "/ month",
  desc: "Start building your presence online today — no credit card, no commitment.",
  features: [
    "Instant portfolio website",
    "AI-powered content structuring",
    "Google indexed automatically",
    "Your image on Google",
    "Hosted on our subdomain",
    "Basic professional template",
    "Up to 6 projects",
  ],
  subdomain: "yourname.espacesystems.online",
  cta: "Start Building Free",
  ctaClass: "btn-primary",
  href: "/login",
  featured: true,
};

const customPlan = {
  tag: "Custom Domain",
  tagClass: "custom-tag",
  name: "Custom Domain",
  amount: "350",
  period: "onwards",
  desc: "Own your web address. Stand out with yourname.com — the mark of a true professional.",
  features: [
    "Everything in Free",
    "Your own domain (yourname.com)",
    "Premium portfolio templates",
    "Priority Google indexing",
    "Professional email setup guide",
    "SEO optimized structure",
    "Unlimited projects",
  ],
  subdomain: "yourname.com",
  cta: "Get Custom Domain",
  ctaClass: "btn-gold",
  href: "/login",
  featured: false,
};

function PricingCard({ plan }: { plan: typeof freePlan }) {
  return (
    <div className={`pricing-card ${plan.featured ? "featured" : ""}`}>
      <span className={`pricing-tag ${plan.tagClass}`}>{plan.tag}</span>
      <h3 className="pricing-name">{plan.name}</h3>
      <div className="pricing-price">
        <span className="pricing-amount">
          {plan.amount === "0" ? "Free" : `₹${plan.amount}`}
        </span>
        <span className="pricing-period">{plan.period}</span>
      </div>
      <p className="pricing-desc">{plan.desc}</p>
      <ul className="pricing-features">
        {plan.features.map((f, i) => (
          <li key={i} className="pricing-feature">
            <span className="pricing-check"><CheckIcon /></span>
            {f}
          </li>
        ))}
      </ul>
      <div style={{ marginBottom: 16 }}>
        <span className="pricing-subdomain">{plan.subdomain}</span>
      </div>
      <Link href={plan.href} className={`btn ${plan.ctaClass} btn-lg`} style={{ width: "100%", justifyContent: "center" }}>
        {plan.cta}
      </Link>
    </div>
  );
}

export default function PricingSection() {
  return (
    <section className="section pricing" id="pricing">
      <div className="container">
        <div className="section-header" style={{ textAlign: "center" }}>
          <p className="section-label">Simple Pricing</p>
          <h2 className="section-title">Start free. Grow when ready.</h2>
          <p className="section-sub" style={{ margin: "14px auto 0" }}>
            No hidden charges. The free plan is genuinely free. Custom domains
            start at just ₹350 — a one-time investment in your professional identity.
          </p>
        </div>
        <div className="pricing-grid">
          <PricingCard plan={freePlan} />
          <PricingCard plan={customPlan} />
        </div>
        <p style={{ textAlign: "center", marginTop: 32, fontSize: "0.85rem", color: "var(--text-muted)" }}>
          Custom domain pricing varies based on domain name and plan. Starting from ₹350.
          Contact us for enterprise or bulk requirements.
        </p>
      </div>
    </section>
  );
    }

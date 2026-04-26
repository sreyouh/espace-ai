"use client";
import Link from "next/link";
import Image from "next/image";

const templates = [
  {
    id: "prestige",
    name: "Prestige",
    desc: "Dark navy with gold accents. A commanding, professional presence that demands attention. Timeline experience, skill grid, custom cursor.",
    tag: "Most Popular",
    demo: "/demo/prestige",
    features: ["Dark premium theme", "Animated timeline", "Skills grid", "Custom cursor", "Google optimized"],
  },
  {
    id: "horizon",
    name: "Horizon",
    desc: "Deep dark with indigo gradients. Modern, minimal and bold — built for developers, designers and tech professionals.",
    tag: "For Developers",
    demo: "/demo/prestige",
    features: ["Dark indigo theme", "Project cards", "Two column layout", "Google optimized", "Mobile ready"],
  },
  {
    id: "aurora",
    name: "Aurora",
    desc: "Split hero with bold typography. Half dark, half light — a magazine-style layout that makes your work impossible to ignore.",
    tag: "Creative",
    demo: "/demo/prestige",
    features: ["Split hero layout", "Magazine style", "Bold typography", "Project showcase", "Google optimized"],
  },
];

export default function TemplatesPage() {
  return (
    <div className="templates-page">
      <div className="templates-bg">
        <div className="templates-bg-mesh" />
      </div>

      <nav className="domain-nav">
        <Link href="/" className="domain-nav-logo">
          <Image src="/espace.png" alt="Espace AI" width={110} height={32} style={{ height: 30, width: "auto" }} />
        </Link>
        <div className="domain-nav-links">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/domains" className="domain-nav-contact">
            Get Custom Domain
          </Link>
        </div>
      </nav>

      <div className="templates-hero">
        <div className="templates-eyebrow">
          <span className="domain-eyebrow-dot" />
          Premium Portfolio Templates
        </div>
        <h1 className="templates-title">
          Choose your<br />
          <span className="domain-hero-title-gradient">signature style</span>
        </h1>
        <p className="templates-sub">
          Every template is built to rank on Google, impress recruiters,
          and make your name unforgettable. Pick one, we handle the rest.
        </p>
      </div>

      <div className="templates-grid-wrap">
        {templates.map((t, i) => (
          <div key={i} className="template-showcase">
            <div className="template-showcase-preview">
              <div className={`template-showcase-mock mock-${t.id}`}>
                <div className="mock-nav" />
                <div className="mock-hero">
                  <div className="mock-name-block">
                    <div className="mock-line tall" />
                    <div className="mock-line medium" />
                    <div className="mock-line short" />
                  </div>
                  <div className="mock-photo" />
                </div>
                <div className="mock-strip">
                  {[1,2,3,4].map((s) => <div key={s} className="mock-stat" />)}
                </div>
                <div className="mock-body">
                  <div className="mock-timeline">
                    {[1,2].map((item) => (
                      <div key={item} className="mock-tl-item">
                        <div className="mock-tl-dot" />
                        <div className="mock-tl-card" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="template-showcase-tag">{t.tag}</div>
            </div>

            <div className="template-showcase-info">
              <h2 className="template-showcase-name">{t.name}</h2>
              <p className="template-showcase-desc">{t.desc}</p>

              <ul className="template-showcase-features">
                {t.features.map((f, j) => (
                  <li key={j} className="template-showcase-feature">
                    <div className="template-feature-check">
                      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="2 6 5 9 10 3" />
                      </svg>
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="template-showcase-actions">
                <a href={t.demo} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                  Live Preview
                </a>
                <Link href={`/domains?template=${t.id}`} className="btn btn-primary">
                  Choose This Template
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="templates-bottom">
        <div className="templates-bottom-inner">
          <h2 className="templates-bottom-title">All templates include</h2>
          <div className="templates-bottom-grid">
            {[
              { icon: "G", title: "Google indexed", desc: "Your portfolio appears in Google Search and Google AI results within days." },
              { icon: "AI", title: "AI-written content", desc: "Enter bullet points — our AI rewrites them into professional, compelling copy." },
              { icon: "D", title: "Custom domain", desc: "Your own yourname.com — registered, connected and live automatically." },
              { icon: "S", title: "SSL secured", desc: "Free HTTPS certificate. Your visitors always see a secure, trusted site." },
              { icon: "M", title: "Mobile ready", desc: "Looks perfect on every screen — phone, tablet and desktop." },
              { icon: "E", title: "Edit anytime", desc: "Update your portfolio anytime from your dashboard. Changes go live instantly." },
            ].map((item, i) => (
              <div key={i} className="templates-bottom-item">
                <div className="templates-bottom-icon">{item.icon}</div>
                <div>
                  <div className="templates-bottom-item-title">{item.title}</div>
                  <div className="templates-bottom-item-desc">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="domain-footer">
        <div className="domain-footer-inner">
          <span>Espace AI — Developed by <a href="https://sreeharis.in/espace" target="_blank" rel="noopener noreferrer">Espace Systems</a></span>
          <span>espacesystems.online</span>
        </div>
      </footer>
    </div>
  );
                  }

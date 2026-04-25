"use client";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-grid" />
        <div className="hero-circle-1" />
        <div className="hero-circle-2" />
      </div>

      <div className="container">
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Powered by Espace AI
            </div>

            <h1 className="hero-title">
              Your Portfolio,<br />
              <span className="hero-title-accent">Discovered</span> by<br />
              <span className="hero-title-gold">the World</span>
            </h1>

            <p className="hero-sub">
              Build a stunning portfolio in minutes. Get recognized on Google
              and Google AI — your name, your work, your image, visible to
              everyone searching for you.
            </p>

            <div className="hero-actions">
              <Link href="/login" className="btn btn-primary btn-lg">
  Start Building Free
</Link>
              <Link href="#pricing" className="btn btn-outline btn-lg">
                See Pricing
              </Link>
            </div>

            <p className="hero-note">
              Free plan available — no credit card required
            </p>
          </div>

          <div className="hero-visual">
            <div className="hero-card-floating">Live on Google</div>
            <div className="hero-card-main">
              <div className="hero-card-header">
                <div className="hero-avatar">A</div>
                <div>
                  <div className="hero-card-name">Name</div>
                  <div className="hero-card-role">what you do </div>
                </div>
              </div>
              <div className="hero-card-tags">
                {["React", "Node.js", "Python", "UI Design"].map((t) => (
                  <span key={t} className="hero-tag">{t}</span>
                ))}
              </div>
              <div className="hero-card-stats">
                <div className="hero-stat">
                  <div className="hero-stat-num">12</div>
                  <div className="hero-stat-label">Projects</div>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-num">4yr</div>
                  <div className="hero-stat-label">Experience</div>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-num">Top</div>
                  <div className="hero-stat-label">on Google</div>
                </div>
              </div>
            </div>
            <div className="hero-badge-google">
              <div className="google-dot">
                <span style={{ background: "#4285f4" }} />
                <span style={{ background: "#ea4335" }} />
                <span style={{ background: "#fbbc05" }} />
                <span style={{ background: "#34a853" }} />
              </div>
              Your name appears in Google Search
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

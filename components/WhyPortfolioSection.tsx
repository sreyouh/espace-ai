"use client";
import Link from "next/link";

const points = [
  {
    title: "Get recognized in Google and Google AI",
    desc: "When someone searches your name, your portfolio page shows up — including in Google's AI-powered answers. No other platform gives you this.",
  },
  {
    title: "Your image appears on Google",
    desc: "Upload a professional photo and Google displays it alongside your name in search results — creating instant credibility.",
  },
  {
    title: "Recruiters search Google, not LinkedIn alone",
    desc: "A large number of hiring managers and clients type your name directly into Google. Your portfolio ensures they find exactly what you want them to see.",
  },
  {
    title: "Stand out in a crowded job market",
    desc: "A portfolio shows real work, real projects, and real skills — far more compelling than a list of bullet points on a resume.",
  },
];

export default function WhyPortfolioSection() {
  return (
    <section className="section why" id="why">
      <div className="container">
        <div className="why-inner">
          {/* Left — Visual */}
          <div className="why-visual">
            <div className="why-search-card">
              <div className="why-search-bar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <span className="why-search-text">Alex Johnson developer portfolio</span>
              </div>

              <div className="why-ai-badge">Google AI</div>
              <div className="why-result featured">
                <div className="why-result-url">alexjohnson.espacesystems.online</div>
                <div className="why-result-title">Alex Johnson — Full Stack Developer</div>
                <div className="why-result-snippet">
                  React, Node.js specialist with 4 years experience. View projects, skills and contact info.
                </div>
              </div>

              <div className="why-result">
                <div className="why-result-url">alexjohnson.espacesystems.online/projects</div>
                <div className="why-result-title">Projects — Alex Johnson</div>
                <div className="why-result-snippet">12 live projects including e-commerce platforms and SaaS tools.</div>
              </div>

              <div className="why-result">
                <div className="why-result-url">alexjohnson.espacesystems.online/about</div>
                <div className="why-result-title">About Me — Alex Johnson</div>
                <div className="why-result-snippet">Education, experience and skills overview.</div>
              </div>
            </div>
          </div>

          {/* Right — Text */}
          <div className="why-text">
            <p className="section-label">Why You Need a Portfolio</p>
            <h2 className="section-title">
              Your work deserves<br />to be found
            </h2>
            <p className="section-sub">
              In today's world, your professional presence starts with a Google
              search. Make sure what they find represents you — not a blank result.
            </p>

            <ul className="why-points">
              {points.map((p, i) => (
                <li key={i} className="why-point">
                  <div className="why-point-num">{i + 1}</div>
                  <div className="why-point-text">
                    <strong>{p.title}</strong>
                    <span>{p.desc}</span>
                  </div>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: 36 }}>
              <Link href="/create" className="btn btn-primary btn-lg">
                Start Building Free
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

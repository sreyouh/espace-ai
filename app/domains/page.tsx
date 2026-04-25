"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const BUILDING_CHARGE = 299;
const TLDS = [".com", ".in", ".online"];

const mockPrices: Record<string, number> = {
  ".com": 899,
  ".in": 599,
  ".online": 349,
};

interface DomainResult {
  tld: string;
  domain: string;
  available: boolean;
  price: number;
  total: number;
}

export default function DomainsPage() {
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<DomainResult[]>([]);
  const [searched, setSearched] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<DomainResult | null>(null);
  const [particles, setParticles] = useState<{ x: number; y: number; size: number; speed: number; opacity: number }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const p = Array.from({ length: 18 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 20 + 15,
      opacity: Math.random() * 0.4 + 0.1,
    }));
    setParticles(p);
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setSearching(true);
    setSearched(false);
    setResults([]);
    setSelectedDomain(null);

    await new Promise((r) => setTimeout(r, 1400));

    const clean = query.toLowerCase().replace(/[^a-z0-9-]/g, "").replace(/\s+/g, "-");
    const res: DomainResult[] = TLDS.map((tld) => {
      const available = Math.random() > 0.3;
      const price = mockPrices[tld];
      return {
        tld,
        domain: clean + tld,
        available,
        price,
        total: available ? price + BUILDING_CHARGE : 0,
      };
    });

    setResults(res);
    setSearching(false);
    setSearched(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="domain-page">
      <div className="domain-bg">
        <div className="domain-bg-mesh" />
        {particles.map((p, i) => (
          <div
            key={i}
            className="domain-particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
              animationDuration: `${p.speed}s`,
              animationDelay: `${-i * 1.2}s`,
            }}
          />
        ))}
        <div className="domain-ring domain-ring-1" />
        <div className="domain-ring domain-ring-2" />
        <div className="domain-ring domain-ring-3" />
      </div>

      <nav className="domain-nav">
        <Link href="/" className="domain-nav-logo">
          <Image src="/espace.png" alt="Espace AI" width={110} height={32} style={{ height: 30, width: "auto" }} />
        </Link>
        <div className="domain-nav-links">
          <Link href="/dashboard">Dashboard</Link>
          <a href="mailto:sreeharisunil100@gmail.com" className="domain-nav-contact">
            Contact Support
          </a>
        </div>
      </nav>

      <div className="domain-hero">
        <div className="domain-hero-inner">
          <div className="domain-eyebrow">
            <span className="domain-eyebrow-dot" />
            Custom Domain Portfolio
          </div>

          <h1 className="domain-hero-title">
            Find your perfect<br />
            <span className="domain-hero-title-gradient">domain name</span>
          </h1>

          <p className="domain-hero-sub">
            Your domain. Your identity. Get discovered on Google with a
            professional portfolio at your own address.
          </p>

          <div className="domain-search-wrap">
            <div className={`domain-search-box ${searching ? "searching" : ""}`}>
              <div className="domain-search-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <input
                ref={inputRef}
                className="domain-search-input"
                placeholder="Enter your name or brand..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={searching}
              />
              <div className="domain-tld-pills">
                {TLDS.map((tld) => (
                  <span key={tld} className="domain-tld-pill">{tld}</span>
                ))}
              </div>
              <button
                className="domain-search-btn"
                onClick={handleSearch}
                disabled={searching || !query.trim()}
              >
                {searching ? (
                  <span className="domain-search-spinner" />
                ) : (
                  "Search"
                )}
              </button>
            </div>
          </div>

          <div className="domain-stats">
            {[
              { num: "₹349", label: "Starting from" },
              { num: "3", label: "TLDs available" },
              { num: "24h", label: "Setup time" },
              { num: "100%", label: "Google indexed" },
            ].map((s, i) => (
              <div key={i} className="domain-stat">
                <span className="domain-stat-num">{s.num}</span>
                <span className="domain-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {(searching || searched) && (
        <div className="domain-results-section">
          <div className="domain-results-inner">
            {searching ? (
              <div className="domain-searching-state">
                <div className="domain-searching-ring" />
                <p>Checking availability across registrars...</p>
              </div>
            ) : (
              <>
                <h2 className="domain-results-title">
                  Results for <span>"{query}"</span>
                </h2>

                <div className="domain-results-grid">
                  {results.map((r, i) => (
                    <div
                      key={i}
                      className={`domain-result-card ${r.available ? "available" : "taken"} ${selectedDomain?.domain === r.domain ? "selected" : ""}`}
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      <div className="domain-result-left">
                        <div className={`domain-result-status ${r.available ? "status-available" : "status-taken"}`}>
                          {r.available ? (
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <polyline points="2 6 5 9 10 3" />
                            </svg>
                          ) : (
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <line x1="3" y1="3" x2="9" y2="9" /><line x1="9" y1="3" x2="3" y2="9" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <div className="domain-result-name">{r.domain}</div>
                          <div className="domain-result-availability">
                            {r.available ? "Available" : "Already taken"}
                          </div>
                        </div>
                      </div>

                      {r.available && (
                        <div className="domain-result-right">
                          <div className="domain-result-price">
                            <span className="domain-result-amount">₹{r.total}</span>
                            <span className="domain-result-period">one time</span>
                          </div>
                          <button
                            className={`domain-result-btn ${selectedDomain?.domain === r.domain ? "selected-btn" : ""}`}
                            onClick={() => setSelectedDomain(selectedDomain?.domain === r.domain ? null : r)}
                          >
                            {selectedDomain?.domain === r.domain ? "Selected" : "Select"}
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="domain-includes">
                  <h3 className="domain-includes-title">What is included</h3>
                  <div className="domain-includes-grid">
                    {[
                      { icon: "🌐", title: "Your own domain", desc: "yourname.com registered for 1 year" },
                      { icon: "⚡", title: "Portfolio setup", desc: "Connected to your Espace AI portfolio instantly" },
                      { icon: "🔍", title: "Google indexing", desc: "Submitted to Google Search and Google AI" },
                      { icon: "🔒", title: "SSL certificate", desc: "Free HTTPS security included" },
                      { icon: "📧", title: "Email support", desc: "Setup assistance via email" },
                      { icon: "♾️", title: "Lifetime portfolio", desc: "Portfolio stays live as long as domain is active" },
                    ].map((item, i) => (
                      <div key={i} className="domain-include-item">
                        <span className="domain-include-icon">{item.icon}</span>
                        <div>
                          <div className="domain-include-title">{item.title}</div>
                          <div className="domain-include-desc">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedDomain && (
                  <div className="domain-proceed-bar">
                    <div className="domain-proceed-info">
                      <span className="domain-proceed-domain">{selectedDomain.domain}</span>
                      <span className="domain-proceed-total">Total: ₹{selectedDomain.total}</span>
                    </div>
                    <Link href={`/payment?domain=${selectedDomain.domain}&amount=${selectedDomain.total}`} className="domain-proceed-btn">
                      Proceed to Payment
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                      </svg>
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      <div className="domain-contact-section">
        <div className="domain-contact-inner">
          <div className="domain-contact-card">
            <div className="domain-contact-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="domain-contact-title">Need help choosing?</h3>
              <p className="domain-contact-desc">
                Our team at Espace Systems is happy to help you pick the right domain and get your portfolio live.
              </p>
            </div>
            <a href="mailto:sreeharisunil100@gmail.com" className="domain-contact-btn">
              sreeharisunil100@gmail.com
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
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

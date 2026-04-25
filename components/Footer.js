"use client";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          {/* Brand */}
          <div className="footer-brand">
            <Image
              src="/espace.png"
              alt="Espace Systems"
              width={120}
              height={32}
              style={{ height: 32, width: "auto", marginBottom: 14, filter: "brightness(0) invert(1)" }}
            />
            <div className="footer-brand-name">Espace AI</div>
            <p className="footer-brand-desc">
              A product of Espace Systems. Build your portfolio, get discovered
              on Google and Google AI, and own your professional identity online.
            </p>
          </div>

          {/* Product */}
          <div>
            <p className="footer-col-title">Product</p>
            <ul className="footer-links">
              <li><Link href="#benefits">Features</Link></li>
              <li><Link href="#why">Why Portfolio</Link></li>
              <li><Link href="#pricing">Pricing</Link></li>
              <li><Link href="/login">Start Building</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="footer-col-title">Company</p>
            <ul className="footer-links">
              <li>
                <a href="https://sreeharis.in/espace" target="_blank" rel="noopener noreferrer">
                  Espace Systems
                </a>
              </li>
              <li><Link href="/login">Sign In</Link></li>
              <li><a href="mailto:contact@espacesystems.online">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            &copy; {new Date().getFullYear()} Espace AI. Developed by{" "}
            <a href="https://sreeharis.in/espace" target="_blank" rel="noopener noreferrer">
              Espace Systems
            </a>
          </span>
          <span>espacesystems.online</span>
        </div>
      </div>
    </footer>
  );
}

"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container navbar-inner">
        <Link href="/" className="nav-logo">
          <Image src="/espace.png" alt="Espace Systems" width={120} height={36} style={{ height: 36, width: "auto" }} />
        </Link>

        <ul className="nav-links">
          <li><Link href="#benefits">Features</Link></li>
          <li><Link href="#why">Why Portfolio</Link></li>
          <li><Link href="#pricing">Pricing</Link></li>
          <li>
            <a href="https://sreeharis.in/espace" target="_blank" rel="noopener noreferrer">
              Espace Systems
            </a>
          </li>
        </ul>

        <div className="nav-cta">
          <Link href="/login" className="btn btn-outline">Sign In</Link>
          <Link href="/create" className="btn btn-primary">Start Building</Link>
        </div>
      </div>
    </nav>
  );
}

"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import Link from "next/link";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [portfolio, setPortfolio] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = "/login";
        return;
      }
      setUser(user);

      const { data } = await supabase
        .from("portfolios")
        .select("*")
        .eq("user_id", user.id)
        .single();

      setPortfolio(data);
      setLoading(false);
    };
    getData();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="dashboard-spinner" />
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">
          <span style={{ color: "white", fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700 }}>Espace AI</span>
        </div>
        <nav className="sidebar-nav">
          <a href="/dashboard" className="sidebar-link active">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
            </svg>
            Dashboard
          </a>
          {portfolio && (
            <a href="/edit" className="sidebar-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
              Edit Portfolio
            </a>
          )}
          <a href="/create" className="sidebar-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
            New Portfolio
          </a>
          <a href="/" className="sidebar-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Home
          </a>
        </nav>
        <button className="sidebar-signout" onClick={handleSignOut}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Sign Out
        </button>
      </aside>

      <main className="dashboard-main">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Dashboard</h1>
            <p className="dashboard-sub">Welcome back, {user?.email}</p>
          </div>
          {!portfolio && (
            <Link href="/create" className="btn btn-primary">
              + New Portfolio
            </Link>
          )}
        </div>

        {portfolio ? (
          <div className="portfolio-card-dashboard">
            <div className="pcd-avatar">
              {portfolio.full_name?.charAt(0)}
            </div>
            <div className="pcd-info">
              <h2 className="pcd-name">{portfolio.full_name}</h2>
              <p className="pcd-title">{portfolio.title}</p>
              <p className="pcd-url">
                espacesystems.online/portfolio/{portfolio.username}
              </p>
            </div>
            <div className="pcd-actions">
              <a href={`/portfolio/${portfolio.username}`} target="_blank" className="btn btn-outline">
                View Live
              </a>
              <a href="/edit" className="btn btn-primary">
                Edit
              </a>
            </div>
          </div>
        ) : (
          <div className="dashboard-empty">
            <div className="dashboard-empty-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="12" y1="18" x2="12" y2="12"/>
                <line x1="9" y1="15" x2="15" y2="15"/>
              </svg>
            </div>
            <h2 className="dashboard-empty-title">No portfolios yet</h2>
            <p className="dashboard-empty-desc">
              Create your first portfolio and get discovered on Google in minutes.
            </p>
            <Link href="/create" className="btn btn-primary btn-lg">
              Create Your Portfolio
            </Link>
          </div>
        )}
      </main>
    </div>
  );
          }

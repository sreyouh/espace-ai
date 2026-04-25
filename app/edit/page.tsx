"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import Link from "next/link";

export default function EditPortfolio() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [portfolioUserId, setPortfolioUserId] = useState("");
  const [username, setUsername] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [form, setForm] = useState({
    full_name: "",
    title: "",
    bio: "",
    skills: "",
    education: "",
    experience: "",
    projects: "",
    template: "classic",
  });

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = "/login";
        return;
      }
      const { data } = await supabase
        .from("portfolios")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (!data) {
        window.location.href = "/create";
        return;
      }

      setPortfolioUserId(data.user_id);
      setUsername(data.username);
      setPhotoUrl(data.photo_url || "");
      setForm({
        full_name: data.full_name || "",
        title: data.title || "",
        bio: data.bio || "",
        skills: data.skills || "",
        education: data.education || "",
        experience: data.experience || "",
        projects: data.projects || "",
        template: data.template || "classic",
      });
      setLoading(false);
    };
    load();
  }, []);

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const fileExt = file.name.split(".").pop();
    const fileName = `${portfolioUserId}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      setError("Photo upload failed. Try again.");
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(fileName);

    const publicUrl = urlData.publicUrl;

    await supabase
      .from("portfolios")
      .update({ photo_url: publicUrl })
      .eq("user_id", portfolioUserId);

    setPhotoUrl(publicUrl);
    setUploading(false);
    setSuccess("Photo uploaded successfully!");
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSuccess("");

    const { error } = await supabase
      .from("portfolios")
      .update({
        full_name: form.full_name,
        title: form.title,
        bio: form.bio,
        skills: form.skills,
        education: form.education,
        experience: form.experience,
        projects: form.projects,
        template: form.template,
      })
      .eq("user_id", portfolioUserId);

    if (error) {
      setError(error.message);
    } else {
      setSuccess("Portfolio updated successfully!");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="dashboard-spinner" />
        <p>Loading your portfolio...</p>
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
          <Link href="/dashboard" className="sidebar-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
            </svg>
            Dashboard
          </Link>
          <Link href="/edit" className="sidebar-link active">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Edit Portfolio
          </Link>
          <Link href={`/portfolio/${username}`} className="sidebar-link" target="_blank">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            View Portfolio
          </Link>
        </nav>
        <button className="sidebar-signout" onClick={async () => { await supabase.auth.signOut(); window.location.href = "/"; }}>
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
            <h1 className="dashboard-title">Edit Portfolio</h1>
            <p className="dashboard-sub">Changes save instantly to your live portfolio.</p>
          </div>
          <Link href={`/portfolio/${username}`} className="btn btn-outline" target="_blank">
            View Live
          </Link>
        </div>

        <div className="edit-box">
          {error && <div className="auth-error">{error}</div>}
          {success && <div className="auth-success">{success}</div>}

          {/* Photo upload */}
          <div className="photo-upload-section">
            <div className="photo-preview">
              {photoUrl ? (
                <img src={photoUrl} alt="Profile" />
              ) : (
                <span>{form.full_name?.charAt(0)}</span>
              )}
            </div>
            <div className="photo-upload-info">
              <p className="photo-upload-title">Profile Photo</p>
              <p className="photo-upload-hint">JPEG or PNG, max 5MB. Shows on your portfolio and Google.</p>
              <label className="photo-upload-btn">
                {uploading ? "Uploading..." : "Upload Photo"}
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={handlePhotoUpload}
                  style={{ display: "none" }}
                  disabled={uploading}
                />
              </label>
            </div>
          </div>

          {/* Template Selection */}
          <div className="create-field" style={{ marginBottom: 28 }}>
            <label>Portfolio Template</label>
            <div className="template-grid">
              <div
                className={`template-card ${form.template === "classic" || !form.template ? "template-selected" : ""}`}
                onClick={() => update("template", "classic")}
              >
                <div className="template-preview classic-preview">
                  <div className="tp-header" />
                  <div className="tp-body">
                    <div className="tp-line" />
                    <div className="tp-line short" />
                  </div>
                </div>
                <div className="template-info">
                  <span className="template-name">Classic</span>
                  <span className="template-tag free-template">Free</span>
                </div>
              </div>

              <div
                className={`template-card ${form.template === "horizon" ? "template-selected" : ""}`}
                onClick={() => update("template", "horizon")}
              >
                <div className="template-preview horizon-preview">
                  <div className="tp-header dark" />
                  <div className="tp-body dark">
                    <div className="tp-line light" />
                    <div className="tp-line short light" />
                  </div>
                </div>
                <div className="template-info">
                  <span className="template-name">Horizon</span>
                  <span className="template-tag premium-template">Premium</span>
                </div>
              </div>

              <div
                className={`template-card ${form.template === "aurora" ? "template-selected" : ""}`}
                onClick={() => update("template", "aurora")}
              >
                <div className="template-preview aurora-preview">
                  <div className="tp-header gradient" />
                  <div className="tp-body">
                    <div className="tp-line" />
                    <div className="tp-line short" />
                  </div>
                </div>
                <div className="template-info">
                  <span className="template-name">Aurora</span>
                  <span className="template-tag premium-template">Premium</span>
                </div>
              </div>
            </div>
          </div>

          <div className="edit-grid">
            <div className="create-field">
              <label>Full Name</label>
              <input value={form.full_name} onChange={(e) => update("full_name", e.target.value)} />
            </div>
            <div className="create-field">
              <label>Professional Title</label>
              <input value={form.title} onChange={(e) => update("title", e.target.value)} />
            </div>
          </div>

          <div className="create-field">
            <label>Bio</label>
            <textarea value={form.bio} onChange={(e) => update("bio", e.target.value)} rows={3} />
          </div>

          <div className="create-field">
            <label>Skills</label>
            <input value={form.skills} onChange={(e) => update("skills", e.target.value)} placeholder="React, Python, UI Design" />
            <p className="create-hint">Separate with commas.</p>
          </div>

          <div className="create-field">
            <label>Education</label>
            <textarea value={form.education} onChange={(e) => update("education", e.target.value)} rows={3} />
            <p className="create-hint">One per line.</p>
          </div>

          <div className="create-field">
            <label>Experience</label>
            <textarea value={form.experience} onChange={(e) => update("experience", e.target.value)} rows={3} />
            <p className="create-hint">One per line.</p>
          </div>

          <div className="create-field">
            <label>Projects</label>
            <textarea value={form.projects} onChange={(e) => update("projects", e.target.value)} rows={5} />
            <p className="create-hint">Format: Title — Description — Link (one per line)</p>
          </div>

          <button className="btn btn-primary btn-lg" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </main>
    </div>
  );
  }

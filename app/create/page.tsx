"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabase";
import Link from "next/link";

export default function CreatePortfolio() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    username: "",
    full_name: "",
    title: "",
    bio: "",
    skills: "",
    education: "",
    experience: "",
    projects: "",
  });

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/login";
      return;
    }

    if (!form.username || !form.full_name || !form.title) {
      setError("Please fill in your name, username and title.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("portfolios").insert({
      user_id: user.id,
      username: form.username.toLowerCase().trim(),
      full_name: form.full_name,
      title: form.title,
      bio: form.bio,
      skills: form.skills,
      education: form.education,
      experience: form.experience,
      projects: form.projects,
      photo_url: "",
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      window.location.href = `/portfolio/${form.username.toLowerCase().trim()}`;
    }
  };

  return (
    <div className="create-page">
      <div className="create-sidebar">
        <Link href="/" className="create-logo">Espace AI</Link>
        <div className="create-steps">
          {["Basic Info", "Education & Experience", "Skills & Projects", "Review"].map((s, i) => (
            <div key={i} className={`create-step ${step === i + 1 ? "active" : ""} ${step > i + 1 ? "done" : ""}`}>
              <div className="create-step-num">{step > i + 1 ? "✓" : i + 1}</div>
              <span>{s}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="create-main">
        <div className="create-box">

          {step === 1 && (
            <div>
              <h1 className="create-title">Basic Information</h1>
              <p className="create-sub">This is how you will appear on Google and your portfolio.</p>
              <div className="create-field">
                <label>Full Name</label>
                <input placeholder="Alex Johnson" value={form.full_name} onChange={(e) => update("full_name", e.target.value)} />
              </div>
              <div className="create-field">
                <label>Username</label>
                <div className="create-input-prefix">
                  <span>yourname.espacesystems.online/</span>
                  <input placeholder="alexjohnson" value={form.username} onChange={(e) => update("username", e.target.value)} />
                </div>
                <p className="create-hint">Only letters, numbers and hyphens. No spaces.</p>
              </div>
              <div className="create-field">
                <label>Professional Title</label>
                <input placeholder="Full Stack Developer" value={form.title} onChange={(e) => update("title", e.target.value)} />
              </div>
              <div className="create-field">
                <label>Bio</label>
                <textarea placeholder="Write a short bio about yourself..." value={form.bio} onChange={(e) => update("bio", e.target.value)} rows={4} />
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h1 className="create-title">Education & Experience</h1>
              <p className="create-sub">Tell visitors about your background.</p>
              <div className="create-field">
                <label>Education</label>
                <textarea placeholder="B.Tech Computer Science, MIT, 2020-2024" value={form.education} onChange={(e) => update("education", e.target.value)} rows={4} />
                <p className="create-hint">You can list multiple degrees, one per line.</p>
              </div>
              <div className="create-field">
                <label>Work Experience</label>
                <textarea placeholder="Software Engineer at Google, 2024-Present&#10;Intern at Microsoft, 2023" value={form.experience} onChange={(e) => update("experience", e.target.value)} rows={5} />
                <p className="create-hint">List your roles, one per line.</p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h1 className="create-title">Skills & Projects</h1>
              <p className="create-sub">Showcase what you can do and what you have built.</p>
              <div className="create-field">
                <label>Skills</label>
                <input placeholder="React, Node.js, Python, UI Design, SQL" value={form.skills} onChange={(e) => update("skills", e.target.value)} />
                <p className="create-hint">Separate skills with commas.</p>
              </div>
              <div className="create-field">
                <label>Projects</label>
                <textarea placeholder="E-commerce Platform — Built with React and Node.js — https://myproject.com&#10;AI Chatbot — Python Flask app — https://chatbot.com" value={form.projects} onChange={(e) => update("projects", e.target.value)} rows={6} />
                <p className="create-hint">One project per line. Include name, description and link.</p>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h1 className="create-title">Review Your Portfolio</h1>
              <p className="create-sub">Check everything before publishing.</p>
              <div className="create-review">
                <div className="create-review-item">
                  <span className="create-review-label">Name</span>
                  <span className="create-review-value">{form.full_name || "Not filled"}</span>
                </div>
                <div className="create-review-item">
                  <span className="create-review-label">Username</span>
                  <span className="create-review-value">{form.username || "Not filled"}</span>
                </div>
                <div className="create-review-item">
                  <span className="create-review-label">Title</span>
                  <span className="create-review-value">{form.title || "Not filled"}</span>
                </div>
                <div className="create-review-item">
                  <span className="create-review-label">Bio</span>
                  <span className="create-review-value">{form.bio || "Not filled"}</span>
                </div>
                <div className="create-review-item">
                  <span className="create-review-label">Skills</span>
                  <span className="create-review-value">{form.skills || "Not filled"}</span>
                </div>
                <div className="create-review-item">
                  <span className="create-review-label">Education</span>
                  <span className="create-review-value">{form.education || "Not filled"}</span>
                </div>
                <div className="create-review-item">
                  <span className="create-review-label">Experience</span>
                  <span className="create-review-value">{form.experience || "Not filled"}</span>
                </div>
                <div className="create-review-item">
                  <span className="create-review-label">Projects</span>
                  <span className="create-review-value">{form.projects || "Not filled"}</span>
                </div>
              </div>
              {error && <div className="auth-error">{error}</div>}
            </div>
          )}

          <div className="create-actions">
            {step > 1 && (
              <button className="btn btn-outline" onClick={() => setStep(step - 1)}>
                Back
              </button>
            )}
            {step < 4 && (
              <button className="btn btn-primary" onClick={() => setStep(step + 1)}>
                Continue
              </button>
            )}
            {step === 4 && (
              <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
                {loading ? "Publishing..." : "Publish Portfolio"}
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
                                                   }

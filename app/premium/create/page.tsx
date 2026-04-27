"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import Link from "next/link";

function PremiumCreateContent() {
  const searchParams = useSearchParams();
  const template = searchParams.get("template") || "prestige";

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState<any>(null);

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

  const [aiContent, setAiContent] = useState({
    bio: "",
    skills: "",
    education: "",
    experience: "",
    projects: "",
  });

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = "/login?redirect=/templates";
        return;
      }
      setUser(user);
    };
    getUser();
  }, []);

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAIRewrite = async () => {
    setAiLoading(true);
    setError("");

    try {
      const response = await fetch("/api/ai-rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bio: form.bio,
          skills: form.skills,
          education: form.education,
          experience: form.experience,
          projects: form.projects,
          name: form.full_name,
          title: form.title,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setAiContent(data);
        setStep(4);
      }
    } catch (err) {
      setError("AI rewrite failed. Please try again.");
    }

    setAiLoading(false);
  };

  const handlePublish = async () => {
    setLoading(true);
    setError("");

    if (!form.username || !form.full_name) {
      setError("Please fill in your name and username.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("portfolios").insert({
      user_id: user.id,
      username: form.username.toLowerCase().trim(),
      full_name: form.full_name,
      title: form.title,
      bio: aiContent.bio || form.bio,
      skills: aiContent.skills || form.skills,
      education: aiContent.education || form.education,
      experience: aiContent.experience || form.experience,
      projects: aiContent.projects || form.projects,
      photo_url: "",
      template: template,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    window.location.href = `/domains?template=${template}&username=${form.username}`;
  };

  const steps = ["Your Details", "Background", "AI Rewrite", "Review & Publish"];

  return (
    <div className="premium-create-page">
      <div className="premium-create-sidebar">
        <Link href="/templates" className="premium-create-logo">Espace AI</Link>

        <div className="premium-create-template-badge">
          <div className="premium-template-dot" />
          {template.charAt(0).toUpperCase() + template.slice(1)} Template
        </div>

        <div className="premium-steps">
          {steps.map((s, i) => (
            <div key={i} className={`premium-step ${step === i + 1 ? "active" : ""} ${step > i + 1 ? "done" : ""}`}>
              <div className="premium-step-num">{step > i + 1 ? "done" : i + 1}</div>
              <span>{s}</span>
            </div>
          ))}
        </div>

        <div className="premium-sidebar-note">
          Your content will be rewritten by AI into professional, compelling copy before publishing.
        </div>
      </div>

      <main className="premium-create-main">
        <div className="premium-create-box">

          {step === 1 && (
            <div>
              <h1 className="premium-create-title">Tell us about yourself</h1>
              <p className="premium-create-sub">Basic information that appears at the top of your portfolio.</p>

              <div className="create-field">
                <label>Full Name</label>
                <input placeholder="Alex Johnson" value={form.full_name} onChange={(e) => update("full_name", e.target.value)} />
              </div>

              <div className="create-field">
                <label>Username</label>
                <div className="create-input-prefix">
                  <span>yourname.com/</span>
                  <input placeholder="alexjohnson" value={form.username} onChange={(e) => update("username", e.target.value)} />
                </div>
                <p className="create-hint">This will be your portfolio URL after domain purchase.</p>
              </div>

              <div className="create-field">
                <label>Professional Title</label>
                <input placeholder="Full Stack Developer" value={form.title} onChange={(e) => update("title", e.target.value)} />
              </div>

              <div className="create-field">
                <label>Bio</label>
                <textarea
                  placeholder="Write a few sentences about yourself. Don't worry about making it perfect — our AI will polish it."
                  value={form.bio}
                  onChange={(e) => update("bio", e.target.value)}
                  rows={4}
                />
                <p className="create-hint">Even rough bullet points work — AI will rewrite this.</p>
              </div>

              <div className="create-field">
                <label>Skills</label>
                <input
                  placeholder="React, Node.js, Python, UI Design, SQL"
                  value={form.skills}
                  onChange={(e) => update("skills", e.target.value)}
                />
                <p className="create-hint">Separate with commas.</p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h1 className="premium-create-title">Your background</h1>
              <p className="premium-create-sub">Education, experience and projects. Write freely — AI will do the rest.</p>

              <div className="create-field">
                <label>Education</label>
                <textarea
                  placeholder="B.Tech Computer Science, MIT, 2020-2024"
                  value={form.education}
                  onChange={(e) => update("education", e.target.value)}
                  rows={3}
                />
                <p className="create-hint">One per line. Include degree, institution and year.</p>
              </div>

              <div className="create-field">
                <label>Work Experience</label>
                <textarea
                  placeholder="Software Engineer at Google, 2024 - worked on search ranking algorithms, improved performance by 20 percent"
                  value={form.experience}
                  onChange={(e) => update("experience", e.target.value)}
                  rows={5}
                />
                <p className="create-hint">One role per line. Include company, role and brief description.</p>
              </div>

              <div className="create-field">
                <label>Projects</label>
                <textarea
                  placeholder="E-commerce platform built with React and Node, handles 10k users — https://myproject.com"
                  value={form.projects}
                  onChange={(e) => update("projects", e.target.value)}
                  rows={5}
                />
                <p className="create-hint">One project per line. Include name, brief description and link.</p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h1 className="premium-create-title">AI is rewriting your content</h1>
              <p className="premium-create-sub">
                Our AI will take your raw input and transform it into polished, professional copy that impresses recruiters and ranks on Google.
              </p>

              <div className="ai-rewrite-preview">
                <div className="ai-rewrite-item">
                  <span className="ai-rewrite-label">Your Bio</span>
                  <p className="ai-rewrite-value">{form.bio || "Not filled"}</p>
                </div>
                <div className="ai-rewrite-item">
                  <span className="ai-rewrite-label">Your Skills</span>
                  <p className="ai-rewrite-value">{form.skills || "Not filled"}</p>
                </div>
                <div className="ai-rewrite-item">
                  <span className="ai-rewrite-label">Your Experience</span>
                  <p className="ai-rewrite-value">{form.experience || "Not filled"}</p>
                </div>
              </div>

              {error && <div className="auth-error">{error}</div>}

              <div className="ai-rewrite-note">
                Tap the button below to rewrite your content with AI. This takes about 10 seconds.
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h1 className="premium-create-title">Review your portfolio</h1>
              <p className="premium-create-sub">Here is your AI-rewritten content. Review it and publish when ready.</p>

              <div className="ai-result-section">
                <div className="ai-result-badge">AI Rewritten</div>

                <div className="create-field">
                  <label>Bio</label>
                  <textarea
                    value={aiContent.bio}
                    onChange={(e) => setAiContent(prev => ({ ...prev, bio: e.target.value }))}
                    rows={4}
                  />
                </div>

                <div className="create-field">
                  <label>Skills</label>
                  <input
                    value={aiContent.skills}
                    onChange={(e) => setAiContent(prev => ({ ...prev, skills: e.target.value }))}
                  />
                </div>

                <div className="create-field">
                  <label>Experience</label>
                  <textarea
                    value={aiContent.experience}
                    onChange={(e) => setAiContent(prev => ({ ...prev, experience: e.target.value }))}
                    rows={4}
                  />
                </div>

                <div className="create-field">
                  <label>Projects</label>
                  <textarea
                    value={aiContent.projects}
                    onChange={(e) => setAiContent(prev => ({ ...prev, projects: e.target.value }))}
                    rows={4}
                  />
                </div>
              </div>

              {error && <div className="auth-error">{error}</div>}
            </div>
          )}

          <div className="premium-create-actions">
            {step > 1 && (
              <button className="btn btn-outline" onClick={() => setStep(step - 1)}>
                Back
              </button>
            )}

            {step === 1 && (
              <button className="btn btn-primary" onClick={() => setStep(2)}>
                Continue
              </button>
            )}

            {step === 2 && (
              <button className="btn btn-primary" onClick={() => setStep(3)}>
                Continue to AI Rewrite
              </button>
            )}

            {step === 3 && (
              <button
                className="btn btn-primary"
                onClick={handleAIRewrite}
                disabled={aiLoading}
              >
                {aiLoading ? "Rewriting with AI..." : "Rewrite with AI"}
              </button>
            )}

            {step === 4 && (
              <button
                className="btn btn-primary"
                onClick={handlePublish}
                disabled={loading}
              >
                {loading ? "Saving..." : "Continue to Domain Selection"}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function PremiumCreatePage() {
  return (
    <Suspense fallback={<div className="dashboard-loading"><div className="dashboard-spinner" /></div>}>
      <PremiumCreateContent />
    </Suspense>
  );
}

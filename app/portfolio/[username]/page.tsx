import { supabase } from "../../../lib/supabase";

export const revalidate = 0;

// ============ CLASSIC TEMPLATE (FREE) ============
function ClassicTemplate({ portfolio }: { portfolio: any }) {
  const skills = portfolio.skills
    ? portfolio.skills.split(",").map((s: string) => s.trim())
    : [];
  const educationLines = portfolio.education
    ? portfolio.education.split("\n").filter(Boolean)
    : [];
  const experienceLines = portfolio.experience
    ? portfolio.experience.split("\n").filter(Boolean)
    : [];
  const projectLines = portfolio.projects
    ? portfolio.projects.split("\n").filter(Boolean)
    : [];

  return (
    <div className="portfolio-page">
      <header className="portfolio-header">
        <div className="portfolio-header-inner container">
          <div className="portfolio-avatar">
            {portfolio.photo_url ? (
              <img src={portfolio.photo_url} alt={portfolio.full_name} />
            ) : (
              <span>{portfolio.full_name?.charAt(0)}</span>
            )}
          </div>
          <div className="portfolio-header-info">
            <h1 className="portfolio-name">{portfolio.full_name}</h1>
            <p className="portfolio-title">{portfolio.title}</p>
            {portfolio.bio && <p className="portfolio-bio">{portfolio.bio}</p>}
            <div className="portfolio-badge"><span>Powered by Espace AI</span></div>
          </div>
        </div>
      </header>
      <div className="container portfolio-body">
        <div className="portfolio-grid">
          <div className="portfolio-left">
            {skills.length > 0 && (
              <div className="portfolio-section">
                <h2 className="portfolio-section-title">Skills</h2>
                <div className="portfolio-skills">
                  {skills.map((skill: string, i: number) => (
                    <span key={i} className="portfolio-skill">{skill}</span>
                  ))}
                </div>
              </div>
            )}
            {educationLines.length > 0 && (
              <div className="portfolio-section">
                <h2 className="portfolio-section-title">Education</h2>
                {educationLines.map((line: string, i: number) => (
                  <div key={i} className="portfolio-item"><p>{line}</p></div>
                ))}
              </div>
            )}
            {experienceLines.length > 0 && (
              <div className="portfolio-section">
                <h2 className="portfolio-section-title">Experience</h2>
                {experienceLines.map((line: string, i: number) => (
                  <div key={i} className="portfolio-item"><p>{line}</p></div>
                ))}
              </div>
            )}
          </div>
          <div className="portfolio-right">
            {projectLines.length > 0 && (
              <div className="portfolio-section">
                <h2 className="portfolio-section-title">Projects</h2>
                {projectLines.map((line: string, i: number) => {
                  const parts = line.split("—").map((p: string) => p.trim());
                  return (
                    <div key={i} className="portfolio-project">
                      <h3 className="portfolio-project-title">{parts[0]}</h3>
                      {parts[1] && <p className="portfolio-project-desc">{parts[1]}</p>}
                      {parts[2] && (
                        <a href={parts[2]} target="_blank" rel="noopener noreferrer" className="portfolio-project-link">
                          View Project
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      <footer className="portfolio-footer">
        <p>Built with <a href="/">Espace AI</a> — Developed by <a href="https://sreeharis.in/espace" target="_blank" rel="noopener noreferrer">Espace Systems</a></p>
      </footer>
    </div>
  );
}

// ============ HORIZON TEMPLATE (PREMIUM DARK) ============
function HorizonTemplate({ portfolio }: { portfolio: any }) {
  const skills = portfolio.skills
    ? portfolio.skills.split(",").map((s: string) => s.trim())
    : [];
  const educationLines = portfolio.education
    ? portfolio.education.split("\n").filter(Boolean)
    : [];
  const experienceLines = portfolio.experience
    ? portfolio.experience.split("\n").filter(Boolean)
    : [];
  const projectLines = portfolio.projects
    ? portfolio.projects.split("\n").filter(Boolean)
    : [];

  return (
    <div className="horizon-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap');
        .horizon-page { min-height:100vh; background:#0a0f1e; color:#e2e8f0; font-family:'DM Sans',sans-serif; }
        .horizon-hero { min-height:100vh; display:flex; align-items:center; justify-content:center; position:relative; overflow:hidden; padding:40px 24px; text-align:center; }
        .horizon-hero-bg { position:absolute; inset:0; background:radial-gradient(ellipse 80% 60% at 50% 40%, rgba(99,102,241,0.15) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 80% 80%, rgba(184,148,63,0.08) 0%, transparent 60%); }
        .horizon-grid { position:absolute; inset:0; background-image:linear-gradient(rgba(99,102,241,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.05) 1px,transparent 1px); background-size:60px 60px; }
        .horizon-avatar { width:120px; height:120px; border-radius:50%; margin:0 auto 24px; border:3px solid rgba(99,102,241,0.5); overflow:hidden; display:flex; align-items:center; justify-content:center; background:linear-gradient(135deg,#6366f1,#8b5cf6); font-size:3rem; font-weight:700; color:white; font-family:'Playfair Display',serif; position:relative; z-index:1; box-shadow:0 0 40px rgba(99,102,241,0.3); }
        .horizon-avatar img { width:100%; height:100%; object-fit:cover; }
        .horizon-name { font-family:'Playfair Display',serif; font-size:clamp(2.5rem,6vw,4.5rem); font-weight:700; letter-spacing:-0.03em; line-height:1.1; margin-bottom:12px; position:relative; z-index:1; background:linear-gradient(135deg,#fff 0%,#a5b4fc 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .horizon-title { font-size:1.1rem; color:#a5b4fc; margin-bottom:20px; font-weight:300; position:relative; z-index:1; letter-spacing:0.08em; text-transform:uppercase; font-size:0.85rem; }
        .horizon-bio { font-size:1rem; color:#94a3b8; line-height:1.8; max-width:520px; margin:0 auto 32px; position:relative; z-index:1; }
        .horizon-skills-hero { display:flex; flex-wrap:wrap; gap:8px; justify-content:center; margin-bottom:40px; position:relative; z-index:1; }
        .horizon-skill { padding:6px 16px; background:rgba(99,102,241,0.15); border:1px solid rgba(99,102,241,0.3); border-radius:50px; font-size:0.78rem; color:#a5b4fc; backdrop-filter:blur(8px); }
        .horizon-badge { display:inline-flex; padding:4px 14px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:50px; font-size:0.72rem; color:rgba(255,255,255,0.4); position:relative; z-index:1; }
        .horizon-body { max-width:1100px; margin:0 auto; padding:80px 24px; }
        .horizon-section { margin-bottom:60px; }
        .horizon-section-label { font-size:0.72rem; font-weight:700; letter-spacing:0.15em; text-transform:uppercase; color:#6366f1; margin-bottom:8px; }
        .horizon-section-title { font-family:'Playfair Display',serif; font-size:2rem; font-weight:700; color:#f1f5f9; margin-bottom:32px; }
        .horizon-projects-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(300px,1fr)); gap:20px; }
        .horizon-project-card { background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:16px; padding:28px; transition:all 0.3s ease; position:relative; overflow:hidden; }
        .horizon-project-card::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,#6366f1,#8b5cf6); transform:scaleX(0); transition:transform 0.3s ease; }
        .horizon-project-card:hover { border-color:rgba(99,102,241,0.3); transform:translateY(-4px); box-shadow:0 20px 40px rgba(0,0,0,0.3); }
        .horizon-project-card:hover::before { transform:scaleX(1); }
        .horizon-project-title { font-family:'Playfair Display',serif; font-size:1.1rem; font-weight:700; color:#f1f5f9; margin-bottom:10px; }
        .horizon-project-desc { font-size:0.85rem; color:#94a3b8; line-height:1.6; margin-bottom:16px; }
        .horizon-project-link { display:inline-flex; align-items:center; gap:6px; font-size:0.78rem; color:#6366f1; font-weight:500; }
        .horizon-timeline { position:relative; padding-left:28px; }
        .horizon-timeline::before { content:''; position:absolute; left:6px; top:0; bottom:0; width:1px; background:linear-gradient(to bottom,#6366f1,transparent); }
        .horizon-timeline-item { position:relative; margin-bottom:28px; }
        .horizon-timeline-dot { position:absolute; left:-28px; top:4px; width:14px; height:14px; border-radius:50%; background:#6366f1; border:2px solid #0a0f1e; box-shadow:0 0 10px rgba(99,102,241,0.5); }
        .horizon-timeline-text { font-size:0.9rem; color:#cbd5e1; line-height:1.6; }
        .horizon-footer { text-align:center; padding:40px 24px; border-top:1px solid rgba(255,255,255,0.06); font-size:0.8rem; color:rgba(255,255,255,0.3); }
        .horizon-footer a { color:rgba(255,255,255,0.5); }
        .horizon-two-col { display:grid; grid-template-columns:1fr 1fr; gap:40px; }
        @media(max-width:768px) { .horizon-two-col { grid-template-columns:1fr; } }
      `}</style>

      <div className="horizon-hero">
        <div className="horizon-hero-bg" />
        <div className="horizon-grid" />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="horizon-avatar">
            {portfolio.photo_url ? (
              <img src={portfolio.photo_url} alt={portfolio.full_name} />
            ) : (
              <span>{portfolio.full_name?.charAt(0)}</span>
            )}
          </div>
          <h1 className="horizon-name">{portfolio.full_name}</h1>
          <p className="horizon-title">{portfolio.title}</p>
          {portfolio.bio && <p className="horizon-bio">{portfolio.bio}</p>}
          {skills.length > 0 && (
            <div className="horizon-skills-hero">
              {skills.map((s: string, i: number) => (
                <span key={i} className="horizon-skill">{s}</span>
              ))}
            </div>
          )}
          <div className="horizon-badge">Powered by Espace AI</div>
        </div>
      </div>

      <div className="horizon-body">
        <div className="horizon-two-col">
          <div>
            {educationLines.length > 0 && (
              <div className="horizon-section">
                <p className="horizon-section-label">Background</p>
                <h2 className="horizon-section-title">Education</h2>
                <div className="horizon-timeline">
                  {educationLines.map((line: string, i: number) => (
                    <div key={i} className="horizon-timeline-item">
                      <div className="horizon-timeline-dot" />
                      <p className="horizon-timeline-text">{line}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div>
            {experienceLines.length > 0 && (
              <div className="horizon-section">
                <p className="horizon-section-label">Career</p>
                <h2 className="horizon-section-title">Experience</h2>
                <div className="horizon-timeline">
                  {experienceLines.map((line: string, i: number) => (
                    <div key={i} className="horizon-timeline-item">
                      <div className="horizon-timeline-dot" />
                      <p className="horizon-timeline-text">{line}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {projectLines.length > 0 && (
          <div className="horizon-section">
            <p className="horizon-section-label">Work</p>
            <h2 className="horizon-section-title">Projects</h2>
            <div className="horizon-projects-grid">
              {projectLines.map((line: string, i: number) => {
                const parts = line.split("—").map((p: string) => p.trim());
                return (
                  <div key={i} className="horizon-project-card">
                    <h3 className="horizon-project-title">{parts[0]}</h3>
                    {parts[1] && <p className="horizon-project-desc">{parts[1]}</p>}
                    {parts[2] && (
                      <a href={parts[2]} target="_blank" rel="noopener noreferrer" className="horizon-project-link">
                        View Project →
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="horizon-footer">
        <p>Built with <a href="/">Espace AI</a> — Developed by <a href="https://sreeharis.in/espace" target="_blank" rel="noopener noreferrer">Espace Systems</a></p>
      </div>
    </div>
  );
}

// ============ AURORA TEMPLATE (PREMIUM CREATIVE) ============
function AuroraTemplate({ portfolio }: { portfolio: any }) {
  const skills = portfolio.skills
    ? portfolio.skills.split(",").map((s: string) => s.trim())
    : [];
  const educationLines = portfolio.education
    ? portfolio.education.split("\n").filter(Boolean)
    : [];
  const experienceLines = portfolio.experience
    ? portfolio.experience.split("\n").filter(Boolean)
    : [];
  const projectLines = portfolio.projects
    ? portfolio.projects.split("\n").filter(Boolean)
    : [];

  return (
    <div className="aurora-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
        .aurora-page { min-height:100vh; background:#fafaf8; font-family:'DM Sans',sans-serif; color:#111827; }
        .aurora-hero { padding:0; min-height:100vh; display:grid; grid-template-columns:1fr 1fr; }
        .aurora-hero-left { background:linear-gradient(135deg,#1a3a5c 0%,#2d5a8e 50%,#6366f1 100%); padding:60px 48px; display:flex; flex-direction:column; justify-content:center; position:relative; overflow:hidden; }
        .aurora-hero-left::before { content:''; position:absolute; top:-50%; right:-50%; width:100%; height:200%; background:radial-gradient(circle,rgba(255,255,255,0.05) 0%,transparent 60%); }
        .aurora-hero-right { padding:60px 48px; display:flex; flex-direction:column; justify-content:center; background:#fafaf8; }
        .aurora-avatar { width:100px; height:100px; border-radius:20px; overflow:hidden; display:flex; align-items:center; justify-content:center; background:rgba(255,255,255,0.15); font-size:2.5rem; font-weight:700; color:white; font-family:'Playfair Display',serif; margin-bottom:28px; border:2px solid rgba(255,255,255,0.2); }
        .aurora-avatar img { width:100%; height:100%; object-fit:cover; }
        .aurora-name { font-family:'Playfair Display',serif; font-size:clamp(2rem,4vw,3.5rem); font-weight:900; color:white; letter-spacing:-0.03em; line-height:1.1; margin-bottom:12px; }
        .aurora-title-badge { display:inline-flex; padding:6px 16px; background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.2); border-radius:50px; font-size:0.82rem; color:rgba(255,255,255,0.9); margin-bottom:20px; backdrop-filter:blur(8px); }
        .aurora-bio { font-size:0.95rem; color:rgba(255,255,255,0.75); line-height:1.8; max-width:400px; }
        .aurora-right-label { font-size:0.72rem; font-weight:700; letter-spacing:0.15em; text-transform:uppercase; color:#b8943f; margin-bottom:8px; }
        .aurora-right-title { font-family:'Playfair Display',serif; font-size:1.8rem; font-weight:700; color:#111827; margin-bottom:20px; letter-spacing:-0.02em; }
        .aurora-skills { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:32px; }
        .aurora-skill { padding:6px 14px; background:#f0f4ff; border:1px solid #c7d2fe; border-radius:50px; font-size:0.78rem; color:#4338ca; font-weight:500; }
        .aurora-stat-row { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
        .aurora-stat { background:white; border:1px solid #e5e7eb; border-radius:12px; padding:16px; text-align:center; }
        .aurora-stat-num { font-family:'Playfair Display',serif; font-size:1.8rem; font-weight:700; color:#1a3a5c; }
        .aurora-stat-label { font-size:0.7rem; color:#9ca3af; text-transform:uppercase; letter-spacing:0.06em; margin-top:4px; }
        .aurora-body { max-width:1100px; margin:0 auto; padding:80px 24px; }
        .aurora-section { margin-bottom:64px; }
        .aurora-section-header { display:flex; align-items:baseline; gap:16px; margin-bottom:32px; padding-bottom:16px; border-bottom:2px solid #f3f4f6; }
        .aurora-section-num { font-family:'Playfair Display',serif; font-size:3rem; font-weight:900; color:#f3f4f6; line-height:1; }
        .aurora-section-title { font-family:'Playfair Display',serif; font-size:1.6rem; font-weight:700; color:#111827; }
        .aurora-projects-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:20px; }
        .aurora-project-card { background:white; border:1px solid #e5e7eb; border-radius:20px; padding:28px; transition:all 0.3s ease; position:relative; overflow:hidden; }
        .aurora-project-card:hover { box-shadow:0 20px 40px rgba(0,0,0,0.08); transform:translateY(-4px); border-color:#c7d2fe; }
        .aurora-project-num { font-family:'Playfair Display',serif; font-size:3rem; font-weight:900; color:#f3f4f6; line-height:1; margin-bottom:8px; }
        .aurora-project-title { font-family:'Playfair Display',serif; font-size:1.1rem; font-weight:700; color:#111827; margin-bottom:8px; }
        .aurora-project-desc { font-size:0.85rem; color:#6b7280; line-height:1.6; margin-bottom:16px; }
        .aurora-project-link { display:inline-flex; align-items:center; gap:6px; padding:8px 16px; background:#1a3a5c; color:white; border-radius:50px; font-size:0.78rem; font-weight:500; transition:all 0.2s; }
        .aurora-project-link:hover { background:#2d5a8e; }
        .aurora-exp-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
        .aurora-exp-item { background:white; border:1px solid #e5e7eb; border-radius:16px; padding:20px 24px; border-left:4px solid #1a3a5c; }
        .aurora-exp-text { font-size:0.9rem; color:#374151; line-height:1.6; }
        .aurora-footer { background:#1a3a5c; text-align:center; padding:32px 24px; font-size:0.8rem; color:rgba(255,255,255,0.4); }
        .aurora-footer a { color:rgba(255,255,255,0.7); }
        .aurora-badge { display:inline-flex; padding:4px 12px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); border-radius:50px; font-size:0.7rem; color:rgba(255,255,255,0.4); margin-top:24px; }
        @media(max-width:768px) { .aurora-hero { grid-template-columns:1fr; } .aurora-hero-left,.aurora-hero-right { padding:40px 24px; } .aurora-exp-grid { grid-template-columns:1fr; } .aurora-stat-row { grid-template-columns:1fr 1fr; } }
      `}</style>

      <div className="aurora-hero">
        <div className="aurora-hero-left">
          <div className="aurora-avatar">
            {portfolio.photo_url ? (
              <img src={portfolio.photo_url} alt={portfolio.full_name} />
            ) : (
              <span>{portfolio.full_name?.charAt(0)}</span>
            )}
          </div>
          <h1 className="aurora-name">{portfolio.full_name}</h1>
          <div className="aurora-title-badge">{portfolio.title}</div>
          {portfolio.bio && <p className="aurora-bio">{portfolio.bio}</p>}
          <div className="aurora-badge">Powered by Espace AI</div>
        </div>

        <div className="aurora-hero-right">
          <p className="aurora-right-label">Expertise</p>
          <h2 className="aurora-right-title">What I bring<br />to the table</h2>
          {skills.length > 0 && (
            <div className="aurora-skills">
              {skills.map((s: string, i: number) => (
                <span key={i} className="aurora-skill">{s}</span>
              ))}
            </div>
          )}
          <div className="aurora-stat-row">
            <div className="aurora-stat">
              <div className="aurora-stat-num">{projectLines.length}</div>
              <div className="aurora-stat-label">Projects</div>
            </div>
            <div className="aurora-stat">
              <div className="aurora-stat-num">{skills.length}</div>
              <div className="aurora-stat-label">Skills</div>
            </div>
            <div className="aurora-stat">
              <div className="aurora-stat-num">{experienceLines.length}</div>
              <div className="aurora-stat-label">Roles</div>
            </div>
          </div>
        </div>
      </div>

      <div className="aurora-body">
        {projectLines.length > 0 && (
          <div className="aurora-section">
            <div className="aurora-section-header">
              <span className="aurora-section-num">01</span>
              <h2 className="aurora-section-title">Projects</h2>
            </div>
            <div className="aurora-projects-grid">
              {projectLines.map((line: string, i: number) => {
                const parts = line.split("—").map((p: string) => p.trim());
                return (
                  <div key={i} className="aurora-project-card">
                    <div className="aurora-project-num">0{i + 1}</div>
                    <h3 className="aurora-project-title">{parts[0]}</h3>
                    {parts[1] && <p className="aurora-project-desc">{parts[1]}</p>}
                    {parts[2] && (
                      <a href={parts[2]} target="_blank" rel="noopener noreferrer" className="aurora-project-link">
                        View Project →
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="aurora-section">
          <div className="aurora-section-header">
            <span className="aurora-section-num">02</span>
            <h2 className="aurora-section-title">Experience & Education</h2>
          </div>
          <div className="aurora-exp-grid">
            {[...experienceLines, ...educationLines].map((line: string, i: number) => (
              <div key={i} className="aurora-exp-item">
                <p className="aurora-exp-text">{line}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="aurora-footer">
        <p>Built with <a href="/">Espace AI</a> — Developed by <a href="https://sreeharis.in/espace" target="_blank" rel="noopener noreferrer">Espace Systems</a></p>
      </div>
    </div>
  );
}

// ============ MAIN PAGE ============
export default async function PortfolioPage({
  params,
}: {
  params: { username: string };
}) {
  const { data: portfolio } = await supabase
    .from("portfolios")
    .select("*")
    .eq("username", params.username)
    .single();

  if (!portfolio) {
    return (
      <div className="portfolio-notfound">
        <h1>Portfolio not found</h1>
        <p>This portfolio does not exist or has been removed.</p>
        <a href="/">Go to Espace AI</a>
      </div>
    );
  }

  const template = portfolio.template || "classic";

  return (
    <>
      <head>
        <title>{portfolio.full_name} — {portfolio.title}</title>
        <meta name="description" content={portfolio.bio} />
        <meta property="og:title" content={`${portfolio.full_name} — ${portfolio.title}`} />
        <meta property="og:description" content={portfolio.bio} />
      </head>
      {template === "horizon" && <HorizonTemplate portfolio={portfolio} />}
      {template === "aurora" && <AuroraTemplate portfolio={portfolio} />}
      {template !== "horizon" && template !== "aurora" && <ClassicTemplate portfolio={portfolio} />}
    </>
  );
      }

import { supabase } from "../../../lib/supabase";

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
    <>
      <head>
        <title>{portfolio.full_name} — {portfolio.title}</title>
        <meta name="description" content={portfolio.bio} />
        <meta property="og:title" content={`${portfolio.full_name} — ${portfolio.title}`} />
        <meta property="og:description" content={portfolio.bio} />
      </head>

      <div className="portfolio-page">
        {/* Header */}
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
              {portfolio.bio && (
                <p className="portfolio-bio">{portfolio.bio}</p>
              )}
              <div className="portfolio-badge">
                <span>Powered by Espace AI</span>
              </div>
            </div>
          </div>
        </header>

        <div className="container portfolio-body">
          <div className="portfolio-grid">
            {/* Left column */}
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
                    <div key={i} className="portfolio-item">
                      <p>{line}</p>
                    </div>
                  ))}
                </div>
              )}

              {experienceLines.length > 0 && (
                <div className="portfolio-section">
                  <h2 className="portfolio-section-title">Experience</h2>
                  {experienceLines.map((line: string, i: number) => (
                    <div key={i} className="portfolio-item">
                      <p>{line}</p>
                    </div>
                  ))}
                </div>
              )}

            </div>

            {/* Right column */}
            <div className="portfolio-right">
              {projectLines.length > 0 && (
                <div className="portfolio-section">
                  <h2 className="portfolio-section-title">Projects</h2>
                  {projectLines.map((line: string, i: number) => {
                    const parts = line.split("—").map((p: string) => p.trim());
                    const title = parts[0] || "";
                    const desc = parts[1] || "";
                    const link = parts[2] || "";
                    return (
                      <div key={i} className="portfolio-project">
                        <h3 className="portfolio-project-title">{title}</h3>
                        {desc && <p className="portfolio-project-desc">{desc}</p>}
                        {link && (
                          <a href={link} target="_blank" rel="noopener noreferrer" className="portfolio-project-link">
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
    </>
  );
          }

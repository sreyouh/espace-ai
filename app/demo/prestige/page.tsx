export default function PrestigeDemo() {
  return (
    <>
      <head>
        <title>Your Name Here — Portfolio | Espace AI Prestige Template</title>
        <meta name="description" content="This is a demo of the Prestige premium portfolio template by Espace AI." />
      </head>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap');
        :root {
          --navy:#0a1628; --deep:#0d1f3c; --gold:#c9a84c; --gold-light:#f0c96a;
          --gold-dim:rgba(201,168,76,0.15); --slate:#8a9bb5; --white:#ffffff;
          --card-bg:rgba(255,255,255,0.04); --border:rgba(201,168,76,0.2);
          --border-strong:rgba(201,168,76,0.4);
        }
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
        html{scroll-behavior:smooth;}
        body{font-family:'DM Sans',sans-serif;background:var(--navy);color:var(--white);overflow-x:hidden;}
        /* NAV */
        .p-nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:20px 52px;background:rgba(10,22,40,0.7);backdrop-filter:blur(24px);border-bottom:1px solid var(--border);}
        .p-nav-logo{display:flex;flex-direction:column;gap:2px;text-decoration:none;}
        .p-nav-logo-main{font-family:'Playfair Display',serif;font-size:1rem;font-weight:700;color:var(--gold);letter-spacing:0.3px;}
        .p-nav-logo-sub{font-size:0.62rem;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.42);}
        .p-nav-links{display:flex;gap:36px;list-style:none;align-items:center;}
        .p-nav-links a{color:rgba(255,255,255,0.55);text-decoration:none;font-size:0.85rem;letter-spacing:0.5px;transition:color 0.2s;}
        .p-nav-links a:hover{color:var(--gold);}
        .p-nav-demo-badge{background:var(--gold-dim);border:1px solid var(--border-strong);padding:6px 16px;border-radius:50px;font-size:0.72rem;color:var(--gold);letter-spacing:1px;text-transform:uppercase;}
        /* HERO */
        .p-hero{min-height:100vh;display:flex;align-items:center;position:relative;padding:140px 52px 100px;overflow:hidden;}
        .p-hero-bg{position:absolute;inset:0;background:radial-gradient(ellipse 70% 80% at 100% 50%,rgba(201,168,76,0.07) 0%,transparent 60%),radial-gradient(ellipse 50% 60% at 0% 100%,rgba(13,31,60,0.9) 0%,transparent 60%),linear-gradient(160deg,#0a1628 0%,#0d1f3c 50%,#071120 100%);}
        .p-hero-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(201,168,76,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.03) 1px,transparent 1px);background-size:60px 60px;mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black,transparent);}
        .p-orb{position:absolute;border-radius:50%;filter:blur(80px);z-index:0;animation:p-float 9s ease-in-out infinite;}
        .p-orb-a{width:500px;height:500px;background:rgba(201,168,76,0.06);top:-150px;right:-100px;}
        .p-orb-b{width:300px;height:300px;background:rgba(99,140,210,0.05);bottom:-50px;left:-80px;animation-delay:-4s;}
        @keyframes p-float{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-28px) scale(1.04)}}
        .p-hero-inner{position:relative;z-index:1;max-width:1200px;margin:0 auto;width:100%;display:grid;grid-template-columns:1fr 420px;gap:80px;align-items:center;}
        .p-hero-tag{display:inline-flex;align-items:center;gap:8px;background:var(--gold-dim);border:1px solid var(--border-strong);padding:8px 20px;border-radius:50px;font-size:0.78rem;color:var(--gold);letter-spacing:1.5px;text-transform:uppercase;font-weight:600;margin-bottom:28px;}
        .p-hero-tag::before{content:'';width:6px;height:6px;background:var(--gold);border-radius:50%;animation:p-blink 1.6s ease infinite;}
        @keyframes p-blink{0%,100%{opacity:1}50%{opacity:0.2}}
        .p-hero-name{font-family:'Playfair Display',serif;font-size:clamp(3rem,5.5vw,5.5rem);font-weight:900;line-height:1.05;margin-bottom:8px;}
        .p-hero-name span{background:linear-gradient(135deg,var(--gold) 20%,var(--gold-light) 80%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
        .p-hero-desig{font-family:'Space Mono',monospace;font-size:0.88rem;color:var(--slate);letter-spacing:1px;margin-bottom:30px;}
        .p-hero-desig em{color:var(--gold-light);font-style:normal;}
        .p-hero-intro{font-size:1.08rem;color:rgba(255,255,255,0.65);line-height:1.8;max-width:520px;margin-bottom:44px;font-weight:300;}
        .p-pills{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:48px;}
        .p-pill{background:var(--card-bg);border:1px solid var(--border);padding:8px 18px;border-radius:50px;font-size:0.8rem;color:rgba(255,255,255,0.65);backdrop-filter:blur(10px);transition:border-color 0.3s,color 0.3s,transform 0.3s;}
        .p-pill:hover{border-color:var(--border-strong);color:var(--white);transform:translateY(-2px);}
        .p-hero-cta{display:flex;gap:14px;flex-wrap:wrap;}
        .p-btn-primary{padding:14px 34px;border-radius:50px;background:linear-gradient(135deg,var(--gold),var(--gold-light));color:var(--navy);font-weight:700;font-size:0.88rem;text-decoration:none;transition:transform 0.3s,box-shadow 0.3s;box-shadow:0 8px 28px rgba(201,168,76,0.35);display:inline-flex;align-items:center;gap:8px;}
        .p-btn-primary:hover{transform:translateY(-3px);box-shadow:0 16px 40px rgba(201,168,76,0.5);}
        .p-btn-outline{padding:14px 34px;border-radius:50px;background:transparent;border:1px solid var(--border);color:var(--white);font-size:0.88rem;font-weight:500;text-decoration:none;transition:border-color 0.3s,background 0.3s,transform 0.3s;display:inline-flex;align-items:center;gap:8px;}
        .p-btn-outline:hover{border-color:var(--gold);background:rgba(201,168,76,0.07);transform:translateY(-3px);}
        /* Photo */
        .p-photo-wrap{position:relative;z-index:1;}
        .p-photo-frame{position:relative;width:100%;aspect-ratio:3/4;border-radius:28px;overflow:hidden;border:1px solid var(--border);box-shadow:0 40px 100px rgba(0,0,0,0.6),0 0 0 1px rgba(201,168,76,0.1);background:linear-gradient(160deg,#1a2a40,#0d1f3c);display:flex;align-items:center;justify-content:center;}
        .p-photo-placeholder{font-family:'Playfair Display',serif;font-size:8rem;font-weight:900;color:rgba(201,168,76,0.2);}
        .p-photo-frame::after{content:'';position:absolute;inset:0;background:linear-gradient(to top,rgba(10,22,40,0.7) 0%,transparent 50%);}
        .p-photo-badge{position:absolute;bottom:24px;left:50%;transform:translateX(-50%);z-index:2;white-space:nowrap;background:rgba(10,22,40,0.85);border:1px solid var(--border-strong);backdrop-filter:blur(16px);padding:10px 22px;border-radius:50px;font-size:0.78rem;color:var(--gold);font-weight:600;letter-spacing:0.5px;}
        .p-photo-corner{position:absolute;width:40px;height:40px;border-color:var(--gold);border-style:solid;opacity:0.5;}
        .p-photo-corner-tl{top:-1px;left:-1px;border-width:2px 0 0 2px;border-radius:28px 0 0 0;}
        .p-photo-corner-br{bottom:-1px;right:-1px;border-width:0 2px 2px 0;border-radius:0 0 28px 0;}
        /* STATS STRIP */
        .p-strip{background:rgba(201,168,76,0.04);border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:50px 52px;}
        .p-strip-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:2px;}
        .p-stat{text-align:center;padding:20px;border-right:1px solid var(--border);}
        .p-stat:last-child{border-right:none;}
        .p-stat-num{font-family:'Playfair Display',serif;font-size:2.2rem;font-weight:900;color:var(--gold);display:block;line-height:1;margin-bottom:8px;}
        .p-stat-label{font-size:0.72rem;letter-spacing:1.5px;text-transform:uppercase;color:var(--slate);}
        /* SECTIONS */
        .p-section{padding:100px 52px;}
        .p-section-label{font-size:0.7rem;letter-spacing:3px;text-transform:uppercase;color:var(--gold);margin-bottom:16px;font-weight:500;}
        .p-section-title{font-family:'Playfair Display',serif;font-size:clamp(2rem,3.5vw,3rem);font-weight:700;line-height:1.2;margin-bottom:16px;}
        .p-section-inner{max-width:1100px;margin:0 auto;}
        /* TIMELINE */
        .p-timeline{position:relative;margin-top:64px;}
        .p-timeline::before{content:'';position:absolute;left:20px;top:0;bottom:0;width:1px;background:linear-gradient(to bottom,var(--gold),rgba(201,168,76,0.1));}
        .p-tl-item{position:relative;padding:0 0 52px 72px;}
        .p-tl-dot{position:absolute;left:12px;top:6px;width:18px;height:18px;border-radius:50%;background:var(--navy);border:2px solid var(--gold);box-shadow:0 0 0 4px rgba(201,168,76,0.1),0 0 16px rgba(201,168,76,0.3);}
        .p-tl-year{font-family:'Space Mono',monospace;font-size:0.72rem;color:var(--gold);letter-spacing:1.5px;margin-bottom:10px;font-weight:700;}
        .p-tl-card{background:var(--card-bg);border:1px solid var(--border);border-radius:20px;padding:32px 36px;backdrop-filter:blur(10px);transition:border-color 0.3s,box-shadow 0.3s,transform 0.3s;}
        .p-tl-card:hover{border-color:var(--border-strong);box-shadow:0 20px 60px rgba(0,0,0,0.4);transform:translateX(4px);}
        .p-tl-role{font-family:'Playfair Display',serif;font-size:1.3rem;font-weight:700;margin-bottom:6px;}
        .p-tl-org{font-size:0.85rem;color:var(--gold);font-weight:600;margin-bottom:14px;display:flex;align-items:center;gap:8px;}
        .p-tl-desc{color:var(--slate);font-size:0.92rem;line-height:1.72;}
        .p-tl-tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:18px;}
        .p-tag{background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);padding:4px 12px;border-radius:50px;font-size:0.72rem;color:var(--gold);letter-spacing:0.5px;font-weight:500;}
        /* SKILLS */
        .p-skills-section{background:linear-gradient(160deg,#0d1f3c 0%,#071120 100%);position:relative;overflow:hidden;padding:100px 52px;}
        .p-skills-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;margin-top:60px;}
        .p-skill-card{background:var(--card-bg);border:1px solid var(--border);border-radius:20px;padding:32px;backdrop-filter:blur(10px);transition:border-color 0.3s,transform 0.3s,box-shadow 0.3s;}
        .p-skill-card:hover{border-color:var(--border-strong);box-shadow:0 20px 50px rgba(0,0,0,0.4);transform:translateY(-4px);}
        .p-skill-icon{font-size:2.2rem;margin-bottom:18px;display:block;}
        .p-skill-title{font-family:'Playfair Display',serif;font-size:1.15rem;font-weight:700;margin-bottom:10px;}
        .p-skill-desc{color:var(--slate);font-size:0.88rem;line-height:1.65;}
        /* CONNECT */
        .p-connect{background:var(--navy);padding:100px 52px;}
        .p-connect-inner{max-width:700px;margin:0 auto;text-align:center;}
        .p-connect-card{background:var(--card-bg);border:1px solid var(--border);border-radius:28px;padding:64px 52px;margin-top:52px;position:relative;overflow:hidden;}
        .p-connect-btns{display:flex;flex-wrap:wrap;gap:14px;justify-content:center;margin-top:40px;}
        .p-btn-social{padding:13px 26px;border-radius:50px;color:#fff;font-weight:600;font-size:0.85rem;text-decoration:none;transition:transform 0.3s;display:inline-flex;align-items:center;gap:8px;}
        .p-btn-social:hover{transform:translateY(-3px);}
        .p-btn-insta{background:linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045);}
        .p-btn-linkedin{background:#0a66c2;}
        .p-btn-mail{background:transparent;border:1px solid var(--border);color:var(--white);}
        /* FOOTER */
        footer.p-footer{background:#060d19;border-top:1px solid rgba(201,168,76,0.1);padding:36px 52px;}
        .p-footer-inner{max-width:1100px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:20px;}
        .p-footer-logo{font-family:'Playfair Display',serif;color:var(--gold);font-size:1rem;}
        .p-footer-logo span{display:block;color:var(--slate);font-family:'DM Sans',sans-serif;font-size:0.75rem;margin-top:4px;}
        .p-footer-copy{color:var(--slate);font-size:0.8rem;}
        .p-footer-link{color:var(--gold);text-decoration:none;}
        /* DEMO BANNER */
        .p-demo-banner{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);z-index:999;background:linear-gradient(135deg,var(--gold),var(--gold-light));color:var(--navy);padding:12px 28px;border-radius:50px;font-size:0.82rem;font-weight:700;box-shadow:0 8px 32px rgba(201,168,76,0.4);white-space:nowrap;display:flex;align-items:center;gap:10px;}
        /* RESPONSIVE */
        @media(max-width:900px){
          .p-hero-inner{grid-template-columns:1fr;gap:52px;}
          .p-hero,.p-section,.p-skills-section,.p-connect{padding:80px 24px;}
          .p-nav{padding:16px 20px;}
          .p-nav-links{display:none;}
          .p-strip-inner{grid-template-columns:repeat(2,1fr);}
          .p-strip{padding:40px 24px;}
          footer.p-footer{padding:30px 24px;}
          .p-connect-card{padding:44px 28px;}
          .p-tl-card{padding:24px;}
        }
      `}</style>

      {/* Demo banner */}
      <div className="p-demo-banner">
        ✨ This is a live demo — your content goes here
      </div>

      {/* NAV */}
      <nav className="p-nav">
        <a href="#" className="p-nav-logo">
          <span className="p-nav-logo-main">Your Name Here</span>
          <span className="p-nav-logo-sub">Portfolio · Espace AI</span>
        </a>
        <ul className="p-nav-links">
          <li><a href="#experience">Experience</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#connect">Contact</a></li>
        </ul>
        <div className="p-nav-demo-badge">Template Demo</div>
      </nav>

      {/* HERO */}
      <section className="p-hero">
        <div className="p-hero-bg" />
        <div className="p-hero-grid" />
        <div className="p-orb p-orb-a" />
        <div className="p-orb p-orb-b" />

        <div className="p-hero-inner">
          <div>
            <div className="p-hero-tag">Portfolio · yourname.com</div>
            <h1 className="p-hero-name">Your Name <span>Here.</span></h1>
            <p className="p-hero-desig">
              Your Title Here · <em>Your Role · Your Field</em>
            </p>
            <p className="p-hero-intro">
              A short bio about yourself goes here. Tell visitors who you are,
              what you do, and what makes you unique. This is your first impression
              — make it count.
            </p>
            <div className="p-pills">
              <span className="p-pill">Your Skill 1</span>
              <span className="p-pill">Your Skill 2</span>
              <span className="p-pill">Your Field</span>
              <span className="p-pill">Your Location</span>
              <span className="p-pill">Your Passion</span>
            </div>
            <div className="p-hero-cta">
              <a href="#connect" className="p-btn-primary">Get in Touch</a>
              <a href="#experience" className="p-btn-outline">My Journey</a>
            </div>
          </div>

          <div className="p-photo-wrap">
            <div className="p-photo-frame">
              <div className="p-photo-placeholder">Y</div>
              <div className="p-photo-corner p-photo-corner-tl" />
              <div className="p-photo-corner p-photo-corner-br" />
              <div className="p-photo-badge">Your Name · Your City</div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="p-strip">
        <div className="p-strip-inner">
          {[
            { num: "5+", label: "Years Experience" },
            { num: "20+", label: "Projects Completed" },
            { num: "10+", label: "Happy Clients" },
            { num: "∞", label: "Lines of Code" },
          ].map((s, i) => (
            <div key={i} className="p-stat">
              <span className="p-stat-num">{s.num}</span>
              <span className="p-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* EXPERIENCE */}
      <section className="p-section" id="experience">
        <div className="p-section-inner">
          <p className="p-section-label">Experience & Journey</p>
          <h2 className="p-section-title">
            What I've Built<br />
            <em style={{ color: "var(--gold)", fontStyle: "normal" }}>& Where I've Been</em>
          </h2>
          <div className="p-timeline">
            {[
              {
                year: "2023 – Present",
                role: "Your Current Role",
                org: "Your Current Company",
                emoji: "🚀",
                desc: "Describe what you do in your current role. Talk about your responsibilities, achievements, and the impact you have made. This section is automatically written for you by our AI.",
                tags: ["Skill 1", "Skill 2", "Achievement"],
              },
              {
                year: "2022 – 2023",
                role: "Previous Role",
                org: "Previous Company",
                emoji: "💼",
                desc: "Describe your previous experience here. The AI will take your bullet points and turn them into compelling, professional descriptions that impress recruiters.",
                tags: ["Tool 1", "Tool 2", "Responsibility"],
              },
              {
                year: "2020 – Present",
                role: "Your Education",
                org: "Your University / College",
                emoji: "🎓",
                desc: "Your educational background. Mention your degree, major, and any notable achievements or projects during your studies.",
                tags: ["Your Degree", "Your Major", "Your University"],
              },
            ].map((item, i) => (
              <div key={i} className="p-tl-item">
                <div className="p-tl-dot" />
                <div className="p-tl-year">{item.year}</div>
                <div className="p-tl-card">
                  <div className="p-tl-role">{item.role}</div>
                  <div className="p-tl-org">
                    <span>{item.emoji}</span> {item.org}
                  </div>
                  <p className="p-tl-desc">{item.desc}</p>
                  <div className="p-tl-tags">
                    {item.tags.map((t, j) => (
                      <span key={j} className="p-tag">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="p-skills-section" id="skills">
        <div className="p-section-inner">
          <p className="p-section-label">Capabilities</p>
          <h2 className="p-section-title">What I Work With</h2>
          <div className="p-skills-grid">
            {[
              { icon: "🌐", title: "Your Primary Skill", desc: "Describe your primary skill area here. What tools do you use? What have you built? What problems do you solve?" },
              { icon: "📈", title: "Your Second Skill", desc: "Another skill area you are strong in. The AI will help you write compelling descriptions based on your input." },
              { icon: "🎨", title: "Your Third Skill", desc: "A creative or technical skill that sets you apart. Mention specific tools, frameworks, or methodologies." },
              { icon: "🚀", title: "Your Fourth Skill", desc: "Leadership, strategy, or any other skill. Your portfolio will highlight what makes you uniquely valuable." },
              { icon: "🤖", title: "Your Fifth Skill", desc: "Tools, technologies, or platforms you are proficient with. Be specific — it helps recruiters find you." },
              { icon: "🔬", title: "Your Sixth Skill", desc: "Any specialized knowledge or niche expertise. This is what makes your profile stand out from others." },
            ].map((s, i) => (
              <div key={i} className="p-skill-card">
                <span className="p-skill-icon">{s.icon}</span>
                <div className="p-skill-title">{s.title}</div>
                <p className="p-skill-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONNECT */}
      <section className="p-connect" id="connect">
        <div className="p-connect-inner">
          <p className="p-section-label">Get in Touch</p>
          <h2 className="p-section-title">Let's Connect</h2>
          <p style={{ color: "var(--slate)", fontSize: "1rem", lineHeight: 1.75, marginTop: 8 }}>
            Whether it's a job opportunity, collaboration, or just a conversation — reach out on any platform.
          </p>
          <div className="p-connect-card">
            <div className="p-connect-btns">
              <a href="#" className="p-btn-social p-btn-insta">Instagram</a>
              <a href="#" className="p-btn-social p-btn-linkedin">LinkedIn</a>
              <a href="#" className="p-btn-social p-btn-mail">Email Me</a>
              <a href="/domains" className="p-btn-primary" style={{ marginTop: 20, width: "100%", justifyContent: "center" }}>
                Get This Template — Start with Custom Domain
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="p-footer">
        <div className="p-footer-inner">
          <div className="p-footer-logo">
            Your Name Here
            <span>Your Title · Your Location</span>
          </div>
          <p className="p-footer-copy">
            Built with <a href="/" className="p-footer-link">Espace AI</a> ·
            Developed by <a href="https://sreeharis.in/espace" target="_blank" rel="noopener noreferrer" className="p-footer-link">Espace Systems</a>
          </p>
        </div>
      </footer>
    </>
  );
}

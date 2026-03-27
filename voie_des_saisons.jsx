const { useState, useEffect, useRef } = React;

const seasonColors = {
  white: { bg: "#f0ece4", accent: "#2c4a6e", text: "#1a1a2e", soft: "#8ba7c4", highlight: "#c8d8e8" },
  tide: { bg: "#0d1b2a", accent: "#e8a45a", text: "#f5f0e8", soft: "#4a7c9e", highlight: "#d4956b" },
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Cinzel:wght@400;600&family=Raleway:wght@300;400&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --bg: #0d1b2a;
    --accent: #e8a45a;
    --text: #f5f0e8;
    --soft: #4a7c9e;
    --highlight: #d4956b;
  }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Raleway', sans-serif;
    font-weight: 300;
    overflow-x: hidden;
  }

  .hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    background: radial-gradient(ellipse at 30% 20%, #1a3a5c 0%, #0d1b2a 60%);
  }

  .stars {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
  }

  .star {
    position: absolute;
    background: white;
    border-radius: 50%;
    animation: twinkle var(--dur) ease-in-out infinite;
    opacity: 0;
  }

  @keyframes twinkle {
    0%, 100% { opacity: 0; transform: scale(0.5); }
    50% { opacity: var(--op); transform: scale(1); }
  }

  .waves-bg {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 200px;
    opacity: 0.15;
  }

  .mountain-bg {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 250px;
    opacity: 0.12;
  }

  .hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
    padding: 2rem;
  }

  .eyebrow {
    font-family: 'Cinzel', serif;
    font-size: 0.7rem;
    letter-spacing: 0.5em;
    color: var(--accent);
    text-transform: uppercase;
    margin-bottom: 2rem;
    opacity: 0;
    animation: fadeUp 1s ease forwards 0.3s;
  }

  .hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(3.5rem, 10vw, 8rem);
    font-weight: 300;
    line-height: 1;
    color: var(--text);
    margin-bottom: 0.5rem;
    opacity: 0;
    animation: fadeUp 1s ease forwards 0.6s;
  }

  .hero-subtitle {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1rem, 3vw, 1.5rem);
    font-style: italic;
    color: var(--soft);
    letter-spacing: 0.15em;
    margin-bottom: 3rem;
    opacity: 0;
    animation: fadeUp 1s ease forwards 0.9s;
  }

  .hero-tagline {
    max-width: 500px;
    margin: 0 auto 3rem;
    font-size: 1rem;
    line-height: 1.9;
    color: rgba(245, 240, 232, 0.7);
    opacity: 0;
    animation: fadeUp 1s ease forwards 1.2s;
  }

  .scroll-cue {
    position: absolute;
    bottom: 2.5rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    opacity: 0;
    animation: fadeUp 1s ease forwards 2s;
  }

  .scroll-cue span {
    font-family: 'Cinzel', serif;
    font-size: 0.6rem;
    letter-spacing: 0.4em;
    color: var(--accent);
    opacity: 0.6;
  }

  .scroll-line {
    width: 1px;
    height: 50px;
    background: linear-gradient(to bottom, var(--accent), transparent);
    animation: scrollPulse 2s ease-in-out infinite;
  }

  @keyframes scrollPulse {
    0%, 100% { opacity: 0.3; transform: scaleY(0.7); }
    50% { opacity: 1; transform: scaleY(1); }
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* NAV */
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    padding: 1.5rem 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(to bottom, rgba(13,27,42,0.9), transparent);
    backdrop-filter: blur(4px);
  }

  .nav-logo {
    font-family: 'Cinzel', serif;
    font-size: 0.75rem;
    letter-spacing: 0.4em;
    color: var(--accent);
    text-transform: uppercase;
  }

  .nav-links {
    display: flex;
    gap: 2.5rem;
    list-style: none;
  }

  .nav-links a {
    font-family: 'Cinzel', serif;
    font-size: 0.65rem;
    letter-spacing: 0.3em;
    color: rgba(245, 240, 232, 0.6);
    text-decoration: none;
    text-transform: uppercase;
    transition: color 0.3s;
  }

  .nav-links a:hover { color: var(--accent); }

  /* SECTIONS */
  section {
    padding: 8rem 2rem;
    max-width: 1100px;
    margin: 0 auto;
  }

  .section-label {
    font-family: 'Cinzel', serif;
    font-size: 0.65rem;
    letter-spacing: 0.5em;
    color: var(--accent);
    text-transform: uppercase;
    margin-bottom: 3rem;
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .section-label::after {
    content: '';
    flex: 1;
    max-width: 80px;
    height: 1px;
    background: var(--accent);
    opacity: 0.4;
  }

  .section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.5rem, 6vw, 5rem);
    font-weight: 300;
    line-height: 1.1;
    margin-bottom: 2rem;
  }

  /* PROLOGUE */
  .prologue {
    background: linear-gradient(135deg, rgba(44,74,110,0.15) 0%, transparent 60%);
    border-left: 2px solid var(--accent);
    padding: 4rem 3rem 4rem 4rem;
    position: relative;
  }

  .prologue::before {
    content: '"';
    position: absolute;
    top: -1rem;
    left: 1.5rem;
    font-family: 'Cormorant Garamond', serif;
    font-size: 8rem;
    color: var(--accent);
    opacity: 0.3;
    line-height: 1;
  }

  .prologue-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.1rem, 2.5vw, 1.4rem);
    line-height: 2;
    font-style: italic;
    color: rgba(245, 240, 232, 0.85);
  }

  .prologue-text p { margin-bottom: 1.5rem; }

  /* RETREATS */
  .retreats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px;
    margin-top: 4rem;
  }

  @media (max-width: 768px) {
    .retreats-grid { grid-template-columns: 1fr; }
    .nav-links { display: none; }
    .nav { padding: 1.5rem; }
    section { padding: 5rem 1.5rem; }
  }

  .retreat-card {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    min-height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 3rem;
  }

  .retreat-card::before {
    content: '';
    position: absolute;
    inset: 0;
    transition: transform 0.7s ease;
  }

  .retreat-card.white::before {
    background: linear-gradient(135deg, #c8d8e8 0%, #8ba7c4 40%, #2c4a6e 100%);
  }

  .retreat-card.tide::before {
    background: linear-gradient(135deg, #1a4a6e 0%, #e8a45a 100%);
  }

  .retreat-card:hover::before {
    transform: scale(1.05);
  }

  .retreat-card-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(13,27,42,0.85) 0%, transparent 60%);
    z-index: 1;
  }

  .retreat-scene {
    position: absolute;
    inset: 0;
    z-index: 0;
    opacity: 0.4;
  }

  .retreat-content {
    position: relative;
    z-index: 2;
  }

  .retreat-season {
    font-family: 'Cinzel', serif;
    font-size: 0.6rem;
    letter-spacing: 0.5em;
    color: var(--accent);
    text-transform: uppercase;
    margin-bottom: 1rem;
  }

  .retreat-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.8rem, 4vw, 3rem);
    font-weight: 300;
    margin-bottom: 1rem;
    line-height: 1.1;
  }

  .retreat-meaning {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: 1.1rem;
    color: rgba(245, 240, 232, 0.7);
    margin-bottom: 2rem;
  }

  .retreat-tags {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .tag {
    font-family: 'Cinzel', serif;
    font-size: 0.55rem;
    letter-spacing: 0.3em;
    padding: 0.4rem 1rem;
    border: 1px solid rgba(232, 164, 90, 0.4);
    color: var(--accent);
    text-transform: uppercase;
  }

  /* RITUALS */
  .rituals-section {
    background: rgba(44, 74, 110, 0.08);
    border: 1px solid rgba(232, 164, 90, 0.1);
    padding: 0;
    max-width: none;
  }

  .rituals-inner {
    max-width: 1100px;
    margin: 0 auto;
    padding: 8rem 2rem;
  }

  .ritual-toggle {
    display: flex;
    gap: 0;
    margin-bottom: 5rem;
    border: 1px solid rgba(232, 164, 90, 0.3);
    width: fit-content;
  }

  .ritual-btn {
    font-family: 'Cinzel', serif;
    font-size: 0.65rem;
    letter-spacing: 0.4em;
    padding: 1rem 2.5rem;
    background: transparent;
    border: none;
    color: rgba(245, 240, 232, 0.4);
    cursor: pointer;
    text-transform: uppercase;
    transition: all 0.3s;
  }

  .ritual-btn.active {
    background: var(--accent);
    color: #0d1b2a;
  }

  .rituals-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 3rem;
  }

  .ritual-item {
    position: relative;
  }

  .ritual-number {
    font-family: 'Cormorant Garamond', serif;
    font-size: 5rem;
    font-weight: 300;
    color: rgba(232, 164, 90, 0.15);
    line-height: 1;
    margin-bottom: -1rem;
  }

  .ritual-name {
    font-family: 'Cinzel', serif;
    font-size: 0.75rem;
    letter-spacing: 0.3em;
    color: var(--accent);
    text-transform: uppercase;
    margin-bottom: 1rem;
  }

  .ritual-desc {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.1rem;
    line-height: 1.8;
    color: rgba(245, 240, 232, 0.7);
  }

  /* EDUCATION */
  .education-block {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
    align-items: center;
  }

  @media (max-width: 768px) {
    .education-block { grid-template-columns: 1fr; gap: 3rem; }
    .retreats-grid { grid-template-columns: 1fr; }
  }

  .edu-duties {
    list-style: none;
    margin-top: 2rem;
  }

  .edu-duties li {
    display: flex;
    gap: 1.5rem;
    padding: 1.5rem 0;
    border-bottom: 1px solid rgba(232, 164, 90, 0.15);
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.1rem;
    line-height: 1.6;
    color: rgba(245, 240, 232, 0.8);
  }

  .edu-duties li::before {
    content: attr(data-symbol);
    font-size: 1.3rem;
    flex-shrink: 0;
  }

  .principle-box {
    border: 1px solid rgba(232, 164, 90, 0.3);
    padding: 3rem;
    position: relative;
  }

  .principle-box::before {
    content: 'Ier Principe';
    position: absolute;
    top: -0.7rem;
    left: 2rem;
    font-family: 'Cinzel', serif;
    font-size: 0.6rem;
    letter-spacing: 0.4em;
    background: var(--bg);
    padding: 0 0.75rem;
    color: var(--accent);
    text-transform: uppercase;
  }

  .principle-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem;
    font-style: italic;
    line-height: 1.8;
    font-weight: 300;
  }

  .principle-text strong {
    font-weight: 400;
    color: var(--accent);
    font-style: normal;
  }

  /* FOOTER */
  footer {
    border-top: 1px solid rgba(232, 164, 90, 0.15);
    padding: 4rem 2rem;
    text-align: center;
  }

  .footer-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    font-weight: 300;
    margin-bottom: 1rem;
    font-style: italic;
  }

  .footer-sub {
    font-family: 'Cinzel', serif;
    font-size: 0.6rem;
    letter-spacing: 0.5em;
    color: var(--accent);
    text-transform: uppercase;
    margin-bottom: 3rem;
  }

  .footer-cta {
    display: inline-block;
    font-family: 'Cinzel', serif;
    font-size: 0.65rem;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    padding: 1.2rem 3rem;
    border: 1px solid var(--accent);
    color: var(--accent);
    text-decoration: none;
    cursor: pointer;
    background: transparent;
    transition: all 0.3s;
  }

  .footer-cta:hover {
    background: var(--accent);
    color: #0d1b2a;
  }

  .footer-copy {
    margin-top: 4rem;
    font-size: 0.75rem;
    color: rgba(245, 240, 232, 0.25);
    letter-spacing: 0.2em;
  }

  /* Animate on scroll */
  .fade-in {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.9s ease, transform 0.9s ease;
  }

  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

const rituals = {
  blanche: [
    { num: "01", name: "L'Effort du Silence", desc: "La famille accomplit une activité physique d'au moins une heure en montagne, sans prononcer un mot. Le silence est la première discipline." },
    { num: "02", name: "La Veillée du Feu", desc: "Une soirée entière sans écrans, réunie autour d'un feu ou d'une lumière douce. La parole revient, lente et vraie." },
    { num: "03", name: "L'Épreuve du Froid", desc: "Contact volontaire avec le froid — neige, air vif, eau froide. Le corps apprend ce que l'esprit oublie : la résistance est une grâce." },
    { num: "04", name: "Le Serment de Travail", desc: "Les enfants lisent à voix haute leurs objectifs scolaires de l'année. Devant la montagne, les mots portent le poids des engagements." },
  ],
  marees: [
    { num: "01", name: "La Marche des Marées", desc: "Marcher au bord de l'eau au lever du soleil. La mer n'attend pas ; ceux qui la suivent apprennent le mouvement du monde." },
    { num: "02", name: "L'Immersion", desc: "Entrer dans la mer ou l'océan. Se laisser traverser par l'eau, réapprendre que le corps appartient à la Terre." },
    { num: "03", name: "Le Repas du Rivage", desc: "Manger ensemble, face à l'eau, sans hâte. L'abondance n'est pas ce que l'on accumule, mais ce que l'on partage." },
    { num: "04", name: "La Promesse de Transmission", desc: "Une discussion familiale sur l'avenir, les rêves des enfants, les responsabilités des parents. Ce que la mer emporte, la mémoire le garde." },
  ],
};

function Star({ style }) {
  return <div className="star" style={style} />;
}

function MountainSVG() {
  return (
    <svg className="mountain-bg" viewBox="0 0 1200 250" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 250 L200 80 L350 150 L500 30 L650 120 L750 60 L900 140 L1050 20 L1200 100 L1200 250 Z" fill="#8ba7c4"/>
      <path d="M0 250 L150 140 L280 190 L420 100 L560 180 L680 110 L820 170 L950 90 L1100 160 L1200 130 L1200 250 Z" fill="#2c4a6e" opacity="0.6"/>
    </svg>
  );
}

function WavesSVG() {
  return (
    <svg className="waves-bg" viewBox="0 0 1200 200" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 100 Q150 50 300 100 Q450 150 600 100 Q750 50 900 100 Q1050 150 1200 100 L1200 200 L0 200 Z" fill="#e8a45a" opacity="0.4"/>
      <path d="M0 120 Q200 80 400 120 Q600 160 800 120 Q1000 80 1200 120 L1200 200 L0 200 Z" fill="#4a7c9e" opacity="0.3"/>
    </svg>
  );
}

export default function VoieDesSaisons() {
  const [activeRitual, setActiveRitual] = useState("blanche");
  const fadeRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.15 }
    );
    fadeRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addRef = (el) => { if (el && !fadeRefs.current.includes(el)) fadeRefs.current.push(el); };

  const stars = Array.from({ length: 60 }, (_, i) => ({
    width: Math.random() * 2 + 1,
    height: Math.random() * 2 + 1,
    top: `${Math.random() * 80}%`,
    left: `${Math.random() * 100}%`,
    "--dur": `${Math.random() * 3 + 2}s`,
    "--op": Math.random() * 0.6 + 0.2,
    animationDelay: `${Math.random() * 4}s`,
  }));

  return (
    <>
      <style>{styles}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">La Voie des Saisons</div>
        <ul className="nav-links">
          <li><a href="#prologue">Origine</a></li>
          <li><a href="#retraites">Retraites</a></li>
          <li><a href="#rituels">Rituels</a></li>
          <li><a href="#education">Éducation</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <div className="hero">
        <div className="stars">
          {stars.map((s, i) => <Star key={i} style={s} />)}
        </div>
        <MountainSVG />
        <WavesSVG />

        <div className="hero-content">
          <p className="eyebrow">Le Saisonisme</p>
          <h1 className="hero-title">La Voie<br/>des Saisons</h1>
          <p className="hero-subtitle">Natura non facit saltus</p>
          <p className="hero-tagline">
            Deux fois par an, quitter la ville.<br/>
            Retrouver la montagne. Retrouver la mer.<br/>
            Retrouver ce que l'on est.
          </p>
        </div>

        <div className="scroll-cue">
          <span>Descendre</span>
          <div className="scroll-line" />
        </div>
      </div>

      {/* PROLOGUE */}
      <section id="prologue">
        <div ref={addRef} className="fade-in">
          <p className="section-label">Le Livre des Saisons</p>
          <h2 className="section-title">Prologue</h2>
        </div>
        <div ref={addRef} className="fade-in prologue">
          <div className="prologue-text">
            <p>Au commencement, l'humain marchait avec la Terre. Il connaissait le froid de la montagne et la lumière de la mer. Il respirait avec les saisons, et son esprit était calme.</p>
            <p>Mais les cités grandirent, les foules se serrèrent, et les hommes oublièrent le rythme du monde.</p>
            <p>Alors la Terre continua seule son travail : les marées montaient, les montagnes gelaient, les forêts poussaient sans repos.</p>
            <p><em>Car la nature ne s'arrête jamais.</em></p>
          </div>
        </div>
      </section>

      {/* RETRAITES */}
      <section id="retraites" style={{ maxWidth: "none", padding: "8rem 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 2rem" }}>
          <div ref={addRef} className="fade-in">
            <p className="section-label">Les deux fêtes sacrées</p>
            <h2 className="section-title">Les Retraites</h2>
          </div>
        </div>
        <div ref={addRef} className="fade-in retreats-grid" style={{ maxWidth: "1100px", margin: "3rem auto 0", padding: "0 2rem" }}>
          {/* Retraite Blanche */}
          <div className="retreat-card white">
            <div className="retreat-card-overlay" />
            <div className="retreat-content">
              <p className="retreat-season">Janvier – Mars · Montagne</p>
              <h3 className="retreat-name">La Retraite<br/>Blanche</h3>
              <p className="retreat-meaning">Purification & Silence</p>
              <div className="retreat-tags">
                <span className="tag">7 jours</span>
                <span className="tag">5–15 ans</span>
                <span className="tag">Hors saison</span>
              </div>
            </div>
          </div>

          {/* Retraite des Marées */}
          <div className="retreat-card tide">
            <div className="retreat-card-overlay" />
            <div className="retreat-content">
              <p className="retreat-season">Juin ou Septembre · Mer</p>
              <h3 className="retreat-name">La Retraite<br/>des Marées</h3>
              <p className="retreat-meaning">Abondance & Énergie</p>
              <div className="retreat-tags">
                <span className="tag">7 jours</span>
                <span className="tag">5–15 ans</span>
                <span className="tag">Hors saison</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RITUELS */}
      <div className="rituals-section" id="rituels">
        <div className="rituals-inner">
          <div ref={addRef} className="fade-in">
            <p className="section-label">Pratiques sacrées</p>
            <h2 className="section-title">Les Rituels</h2>
          </div>

          <div ref={addRef} className="fade-in ritual-toggle">
            <button className={`ritual-btn ${activeRitual === "blanche" ? "active" : ""}`} onClick={() => setActiveRitual("blanche")}>
              Retraite Blanche
            </button>
            <button className={`ritual-btn ${activeRitual === "marees" ? "active" : ""}`} onClick={() => setActiveRitual("marees")}>
              Retraite des Marées
            </button>
          </div>

          <div ref={addRef} className="fade-in">
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "1.1rem", color: "rgba(245,240,232,0.5)", marginBottom: "3rem" }}>
              {activeRitual === "blanche"
                ? "La montagne enseigne la discipline — objectif : reconnecter avec le calme et la rigueur de la nature."
                : "La mer enseigne la liberté — objectif : reconnecter avec le mouvement et l'abondance du monde."}
            </p>
            <div className="rituals-grid">
              {rituals[activeRitual].map((r) => (
                <div key={r.num} className="ritual-item">
                  <div className="ritual-number">{r.num}</div>
                  <p className="ritual-name">{r.name}</p>
                  <p className="ritual-desc">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* EDUCATION */}
      <section id="education">
        <div ref={addRef} className="fade-in">
          <p className="section-label">Devoir moral</p>
          <h2 className="section-title">L'Éducation<br/>Sacrée</h2>
        </div>

        <div ref={addRef} className="fade-in education-block">
          <div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", lineHeight: 1.9, color: "rgba(245,240,232,0.75)", marginBottom: "2rem" }}>
              La retraite n'est pas un loisir. C'est une obligation morale. L'enfant doit honorer la connaissance comme la nature honore le travail.
            </p>
            <ul className="edu-duties">
              <li data-symbol="◈">Devoir de bonnes notes — l'excellence scolaire est une offrande à la saison suivante.</li>
              <li data-symbol="◈">Devoir de rattrapage — aucune lacune ne sera portée dans la nature.</li>
              <li data-symbol="◈">Devoir des parents — suivre, accompagner, exiger sans cruauté.</li>
            </ul>
          </div>

          <div className="principle-box">
            <p className="principle-text">
              Chaque famille doit quitter la ville <strong>deux fois par an</strong> pour retrouver la nature.<br/><br/>
              Car celui qui ne quitte jamais la foule <strong>oublie qu'il fait partie du monde vivant.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div ref={addRef} className="fade-in">
          <p className="footer-title">La Voie des Saisons vous attend.</p>
          <p className="footer-sub">Rejoindre la communauté</p>
          <button className="footer-cta">Entrer dans la voie</button>
          <p className="footer-copy">Le Saisonisme · Fondé sur le Livre des Saisons · La nature ne s'arrête jamais</p>
        </div>
      </footer>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<VoieDesSaisons />);

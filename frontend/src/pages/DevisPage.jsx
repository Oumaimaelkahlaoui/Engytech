import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/MainFooter";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && e.target.classList.add("is-visible")
        ),
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const DEVIS_ITEMS = [
  {
    icon: "",
    title: "Gros Œuvre",
    desc: "Fondations, structure béton armé, maçonnerie et charpente — de la dalle au toit.",
    link: "/devis/gros-oeuvre",
    image: "/images/devis/gros-oeuvre.jpg",
  },
  {
    icon: "",
    title: "Lots Techniques",
    desc: "Plomberie, électricité, CVC et réseau — coordination complète des corps d'état.",
    link: "/devis/lots-techniques",
    image: "/images/devis/lots-techniques.jpg",
  },
  {
    icon: "",
    title: "Inspection Réglementaire",
    desc: "Vérification de conformité aux normes en vigueur et assistance aux contrôles.",
    link: "/devis/inspection-reglementaire",
    image: "/images/devis/inspection.jpg",
  },
  {
    icon: "🔥",
    title: "Sécurité Incendie",
    desc: "Plans d'évacuation, détection, sprinklers et audit SSI complets.",
    link: "/devis/securite-incendie",
    image: "/images/devis/incendie.jpg",
  },
  {
    icon: "",
    title: "Expertise Technique",
    desc: "Diagnostic structurel, pathologies du bâtiment et rapport d'expertise.",
    link: "/devis/expertise-technique",
    image: "/images/devis/expertise.jpg",
  },
  {
    icon: "",
    title: "Architecture Complète",
    desc: "Conception architecturale A à Z : esquisse, permis de construire, suivi de chantier.",
    link: "/devis/architecture-complete",
    image: "/images/devis/architecture.jpg",
  },
];
export default function DevisPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const cursorRef    = useRef(null);
  const cursorDotRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current)
        cursorRef.current.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
      if (cursorDotRef.current)
        cursorDotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useReveal();

  return (
    <>
      <div className="cursor-ring" ref={cursorRef} />
      <div className="cursor-dot"  ref={cursorDotRef} />

      <Navbar scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* ── HERO ── */}
      <section className="devis-hero">
        <img
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=90"
          alt="Plans architecturaux"
          className="devis-hero__img"
        />

        <div className="overlay">
          <p className="devis-eyebrow">Engytech — Bureau d'études</p>
          <h1>
            <span className="line-1">Demande de</span>
            <span className="line-2">Devis</span>
          </h1>
          <p className="devis-sub">
            Obtenez une estimation précise pour votre projet —
            réponse sous 24 heures.
          </p>
          <div className="devis-tags">
            {["Résidentiel", "Collectif", "Tertiaire", "Réhabilitation", "Neuf"].map((t) => (
              <span key={t} className="devis-tag-pill">{t}</span>
            ))}
          </div>
        </div>

        <div className="hero__scroll-hint">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>

      { /*----<div className="hero__counter">
          <span className="counter-num">{DEVIS_ITEMS.length}</span>
          <span className="counter-label">prestations</span>
        </div>*/}
      </section>

      {/* ── INTRO STRIP ── */}
      <div className="devis-intro">
        <div className="devis-intro__text">
          <div className="devis-intro__left">
            <span className="devis-intro__num">{DEVIS_ITEMS.length}</span>
            <div className="devis-intro__copy">
              <h2>Prestations sur mesure</h2>
              <p>
                Sélectionnez le type de prestation qui correspond à votre projet
                et recevez un devis détaillé sous 24h.
              </p>
            </div>
          </div>
          <Link to="#contact" className="devis-intro__cta">
            Nous contacter <span className="arrow">→</span>
          </Link>
        </div>
      </div>

      {/* ── SECTION HEADER ── */}
      <div className="devis-section-header" data-reveal>
        <div>
          <span className="section-label">02 — Nos prestations</span>
          <h3>Choisissez votre <em>prestation</em></h3>
        </div>
        <span className="devis-count-badge">{DEVIS_ITEMS.length} offres disponibles</span>
      </div>

      {/* ── DEVIS GRID ── */}
     <section className="devis-grid">
        {DEVIS_ITEMS.map((item, index) => (
            <Link
            key={index}
            to={item.link}
            className="devis-card"
            data-reveal
            style={{ backgroundImage: `url(${item.image})` }}
            >
            <div className="devis-card__content">
                <div>
                <p className="devis-card__num">0{index + 1}</p>
                <div className="devis-card__icon">{item.icon}</div>
                <h3 className="devis-card__title">{item.title}</h3>
                <p className="devis-card__desc">{item.desc}</p>
                </div>

                <div className="devis-card__footer">
                <span className="devis-card__cta">Demander un devis</span>
                <span className="devis-card__arrow">→</span>
                </div>
            </div>
            </Link>
        ))}
     </section>
      {/* ── BOTTOM CTA BANNER ── */}
      <div className="devis-banner" data-reveal>
        <div className="devis-banner__inner">
          <div className="devis-banner__copy">
            <h3>Vous ne trouvez pas votre <em>prestation ?</em></h3>
            <p>
              Décrivez votre projet librement — notre équipe vous
              contactera pour une étude personnalisée gratuite.
            </p>
          </div>
          <Link to="#contact" className="devis-banner__btn">
            Projet sur mesure <span className="arrow">→</span>
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
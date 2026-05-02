import { useEffect, useRef, useCallback } from "react";
import "./assets/home.css";

export default function Home() {
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const sectionsSelector = ".page-section";

 const slides = [
  {
    title: "Hey there! I'm Evan.",
    body: "I'm a Data Centric Computing student at Virginia Tech. I enjoy exploring the intersection of Artificial Intelligence, Data Structures, and practical software development to build tools that solve real problems.",
  },
  {
    title: "What I Build",
    body: "I focus on full-stack web development and backend systems. My recent projects include building responsive React interfaces, developing real-time messaging apps using FastAPI and WebSockets, and integrating local AI models into personal finance dashboards.",
  },
  {
    title: "Current Focus",
    body: "Right now, my studies and side projects are heavily focused on Backend Architecture, API integration, and Machine Learning concepts. I love learning how to connect complex data processing with clean, accessible user experiences.",
  },
  {
    title: "Get In Touch",
    body: (
      <>
        <span>Feel free to check out:</span>
        <br/>
        <div className="contact-links">
          <a href="https://github.com/Retroneek" target="_blank" rel="noopener noreferrer">GitHub</a>
          <span>·</span>
          <a href="https://www.linkedin.com/in/esanchezalvarez" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <span>·</span>
          <a href="https://discord.com/users/601177977895780382" target="_blank" rel="noopener noreferrer">Discord</a>
        </div>
      </>
    ),
  },
];

  const getSections = useCallback(() => {
    const root = containerRef.current;
    if (!root) return [];
    return Array.from(root.querySelectorAll(sectionsSelector));
  }, []);

  

  useEffect(() => {
    const root = containerRef.current;
    const overlay = overlayRef.current;
    if (!root || !overlay) return;

    // Observe sections to toggle is-visible for accessibility (fade will be continuous)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      { threshold: 0.35 }
    );
    const sections = getSections();
    sections.forEach((s) => observer.observe(s));

    // Scroll handler: compute progress and update overlay children opacity
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const st = root.scrollTop;
        const vh = window.innerHeight || root.clientHeight;
        const idx = Math.floor(st / vh);
        const t = Math.min(1, Math.max(0, (st - idx * vh) / vh));

        const overlays = overlay.querySelectorAll('.overlay-item');
        overlays.forEach((el, i) => {
          if (i === idx) el.style.opacity = String(1 - t);
          else if (i === idx + 1) el.style.opacity = String(t);
          else el.style.opacity = '0';
        });
        // arrows removed — keep indicators only
        // indicators
        const dots = overlay.querySelectorAll('.indicator-dot');
        dots.forEach((d, i) => {
          if (i === idx) d.style.opacity = String(1 - t * 0.6);
          else if (i === idx + 1) d.style.opacity = String(0.4 + t * 0.6);
          else d.style.opacity = '0.3';
        });
      });
    };

    // initialize
    onScroll();
    root.addEventListener('scroll', onScroll, { passive: true });

    // no arrow handlers (arrows removed)

    const onKey = (e) => {
      const st = root.scrollTop;
      const vh = window.innerHeight || root.clientHeight;
      const idx = Math.floor(st / vh);
      if (e.key === "ArrowDown" || e.key === "PageDown") root.scrollTo({ top: (idx + 1) * vh, behavior: 'smooth' });
      if (e.key === "ArrowUp" || e.key === "PageUp") root.scrollTo({ top: Math.max(0, (idx - 1) * vh), behavior: 'smooth' });
      if (e.key === "Home") root.scrollTo({ top: 0, behavior: 'smooth' });
      if (e.key === "End") root.scrollTo({ top: (sections.length - 1) * vh, behavior: 'smooth' });
    };

    window.addEventListener('keydown', onKey);

    return () => {
      observer.disconnect();
      root.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKey);
      // nothing to clean up for arrows
      if (raf) cancelAnimationFrame(raf);
    };
  }, [getSections]);

  return (
    <div className="home-root" ref={containerRef}>
      {/* fixed overlay: center text crossfades based on scroll progress */}
      <div className="overlay" ref={overlayRef}>
        {slides.map((s, i) => (
          <div key={i} className="overlay-item">
            <h1 className="overlay-title">{s.title}</h1>
            <p className="overlay-body">{s.body}</p>
          </div>
        ))}
        {/* arrows removed */}
        <div className="indicators" aria-hidden>
          {slides.map((_, i) => (
            <div key={i} className="indicator-dot" />
          ))}
        </div>
      </div>

      {/* structural sections for scrolling */}
      <section className="page-section intro page-center">
        <div className="intro-inner" />
      </section>

      <section className="page-section reveal page-center">
        <div className="card" />
      </section>

      <section className="page-section reveal page-center">
        <div className="card" />
      </section>

      <section className="page-section reveal page-center">
        <div className="card" />
      </section>
    </div>
  );
}

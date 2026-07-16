import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import Icon from "../common/Icon";

const links = [
  ["Inicio", "#inicio"],
  ["Nosotros", "#nosotros"],
  ["Servicios", "#servicios"],
  ["Proyectos", "#proyectos"],
  ["Proceso", "#proceso"],
];

const NAVBAR_STYLES = `
  .dt-navbar,
  .dt-navbar *,
  .dt-navbar *::before,
  .dt-navbar *::after {
    box-sizing: border-box;
  }

  .dt-navbar {
    --dt-navbar-height: clamp(4.35rem, 5.2vw, 5rem);

    position: fixed;
    inset: 0 0 auto;
    z-index: 1000;

    width: 100%;
    min-width: 0;

    font-family: "Poppins", sans-serif;
  }

  .dt-navbar__surface {
    position: relative;

    width: 100%;
    min-height: var(--dt-navbar-height);

    border-bottom: 1px solid rgba(20, 57, 125, 0.08);

    background:
      linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.97),
        rgba(255, 255, 255, 0.93)
      );

    box-shadow:
      0 0.35rem 1.35rem rgba(15, 48, 107, 0.045);

    -webkit-backdrop-filter: blur(1.25rem) saturate(1.15);
    backdrop-filter: blur(1.25rem) saturate(1.15);
  }

  .dt-navbar__container {
    position: relative;

    width: min(94rem, calc(100% - clamp(1.5rem, 5vw, 5rem)));
    min-width: 0;
    min-height: var(--dt-navbar-height);

    margin-inline: auto;

    display: grid;
    grid-template-columns:
      minmax(min-content, 1fr)
      auto;

    align-items: center;

    gap: clamp(1rem, 2.2vw, 2.4rem);
  }

  /* =====================================================
     MARCA
  ===================================================== */

  .dt-navbar__brand {
    min-width: 0;
    width: fit-content;

    display: inline-flex;
    align-items: center;

    gap: clamp(0.65rem, 0.95vw, 0.9rem);

    color: inherit;
    text-decoration: none;

    transition:
      opacity 180ms ease,
      transform 180ms ease;
  }

  .dt-navbar__brand:hover {
    transform: translateY(-0.08rem);
  }

  .dt-navbar__logo-frame {
    position: relative;

    width: clamp(2.85rem, 3.7vw, 3.75rem);
    aspect-ratio: 1;

    flex: 0 0 auto;

    overflow: hidden;

    border: 1px solid rgba(18, 57, 130, 0.1);
    border-radius: clamp(0.8rem, 1vw, 1rem);

    background: #061126;

    box-shadow:
      0 0.5rem 1.35rem rgba(10, 38, 93, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.08);
  }

  .dt-navbar__logo {
    width: 100%;
    height: 100%;

    display: block;
    object-fit: cover;
  }

  .dt-navbar__brand-copy {
    min-width: 0;

    display: grid;
    align-content: center;

    line-height: 1;
  }

  .dt-navbar__brand-name {
    margin: 0;

    color: #12244d;

    font-size: clamp(1.12rem, 1.55vw, 1.55rem);
    line-height: 1.05;
    letter-spacing: -0.035em;
    font-weight: 600;

    white-space: nowrap;
  }

  .dt-navbar__brand-highlight {
    color: #087bea;
  }

  .dt-navbar__brand-tagline {
    margin:
      clamp(0.25rem, 0.35vw, 0.34rem)
      0
      0;

    color: #60708f;

    font-size: clamp(0.48rem, 0.62vw, 0.64rem);
    line-height: 1.2;
    letter-spacing: clamp(0.16em, 0.29vw, 0.28em);
    font-weight: 500;

    white-space: nowrap;
  }

  /* =====================================================
     NAVEGACIÓN DE ESCRITORIO
  ===================================================== */

  .dt-navbar__desktop {
    min-width: 0;

    display: flex;
    align-items: center;
    justify-content: flex-end;

    gap: clamp(0.25rem, 0.8vw, 0.85rem);
  }

  .dt-navbar__links {
    min-width: 0;

    display: flex;
    align-items: center;

    gap: clamp(0.1rem, 0.42vw, 0.45rem);
  }

  .dt-navbar__link {
    position: relative;

    min-height: 2.65rem;
    padding-inline: clamp(0.62rem, 0.92vw, 0.95rem);

    display: inline-flex;
    align-items: center;
    justify-content: center;

    border-radius: 0.85rem;

    color: #172544;
    text-decoration: none;

    font-size: clamp(0.8rem, 0.94vw, 0.96rem);
    line-height: 1;
    font-weight: 500;

    white-space: nowrap;

    transition:
      color 180ms ease,
      background 180ms ease,
      transform 180ms ease;
  }

  .dt-navbar__link:hover {
    color: #1768ec;
    background: rgba(233, 243, 255, 0.72);
    transform: translateY(-0.08rem);
  }

  .dt-navbar__link::after {
    content: "";

    position: absolute;
    left: 50%;
    bottom: 0.25rem;

    width: 0;
    height: 2px;

    transform: translateX(-50%);

    border-radius: 999px;

    background:
      linear-gradient(
        90deg,
        #29b5ff,
        #285cf0
      );

    transition: width 180ms ease;
  }

  .dt-navbar__link:hover::after,
  .dt-navbar__link.is-active::after {
    width: 1.25rem;
  }

  .dt-navbar__link.is-active {
    color: #1768ec;
  }

  .dt-navbar__cta {
    min-height: 2.95rem;
    padding-inline: clamp(1.05rem, 1.55vw, 1.55rem);

    display: inline-flex;
    align-items: center;
    justify-content: center;

    border: 1px solid rgba(26, 98, 236, 0.34);
    border-radius: clamp(0.85rem, 1vw, 1rem);

    background:
      linear-gradient(
        135deg,
        #159cff 0%,
        #1d55eb 100%
      );

    color: #ffffff;
    text-decoration: none;

    font-size: clamp(0.82rem, 0.96vw, 0.96rem);
    line-height: 1;
    font-weight: 500;

    white-space: nowrap;

    box-shadow:
      0 0.75rem 1.65rem rgba(28, 94, 231, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.25);

    transition:
      transform 180ms ease,
      box-shadow 180ms ease,
      filter 180ms ease;
  }

  .dt-navbar__cta:hover {
    transform: translateY(-0.12rem);

    filter: saturate(1.06);

    box-shadow:
      0 1rem 2rem rgba(28, 94, 231, 0.26),
      inset 0 1px 0 rgba(255, 255, 255, 0.25);
  }

  /* =====================================================
     BOTÓN MÓVIL
  ===================================================== */

  .dt-navbar__toggle {
    width: 2.75rem;
    aspect-ratio: 1;

    padding: 0;

    display: none;
    place-items: center;

    border: 1px solid rgba(17, 57, 127, 0.11);
    border-radius: 0.85rem;

    background: rgba(255, 255, 255, 0.9);
    color: #142854;

    box-shadow:
      0 0.45rem 1rem rgba(19, 57, 125, 0.07),
      inset 0 1px 0 #ffffff;

    cursor: pointer;

    transition:
      transform 180ms ease,
      border-color 180ms ease,
      color 180ms ease,
      box-shadow 180ms ease;
  }

  .dt-navbar__toggle:hover {
    transform: translateY(-0.08rem);

    border-color: rgba(26, 103, 239, 0.24);
    color: #1768ec;

    box-shadow:
      0 0.65rem 1.3rem rgba(19, 57, 125, 0.1),
      inset 0 1px 0 #ffffff;
  }

  .dt-navbar__toggle svg {
    width: 1.2rem;
    height: 1.2rem;
  }

  /* =====================================================
     MENÚ MÓVIL
  ===================================================== */

  .dt-navbar__mobile-layer {
    position: fixed;
    inset: var(--dt-navbar-height) 0 0;

    z-index: 999;

    padding:
      clamp(0.65rem, 2vw, 1rem)
      clamp(0.75rem, 3vw, 1.2rem);

    display: grid;
    align-items: start;

    background: rgba(8, 23, 52, 0.16);

    -webkit-backdrop-filter: blur(0.4rem);
    backdrop-filter: blur(0.4rem);
  }

  .dt-navbar__mobile-panel {
    width: min(31rem, 100%);
    margin-inline: auto;

    padding: 0.75rem;

    overflow: hidden;

    border: 1px solid rgba(30, 82, 176, 0.1);
    border-radius: 1.35rem;

    background:
      linear-gradient(
        145deg,
        rgba(255, 255, 255, 0.99),
        rgba(247, 251, 255, 0.98)
      );

    box-shadow:
      0 1.7rem 4rem rgba(11, 38, 91, 0.18),
      inset 0 1px 0 #ffffff;
  }

  .dt-navbar__mobile-links {
    display: grid;
    gap: 0.25rem;
  }

  .dt-navbar__mobile-link {
    min-height: 3rem;
    padding-inline: 0.95rem;

    display: flex;
    align-items: center;
    justify-content: space-between;

    border-radius: 0.9rem;

    color: #17284d;
    text-decoration: none;

    font-size: 0.9rem;
    font-weight: 500;

    transition:
      color 180ms ease,
      background 180ms ease;
  }

  .dt-navbar__mobile-link:hover,
  .dt-navbar__mobile-link.is-active {
    color: #1768ec;
    background: #edf5ff;
  }

  .dt-navbar__mobile-link-arrow {
    color: #7e91b2;
    font-size: 1rem;
  }

  .dt-navbar__mobile-cta {
    min-height: 3.1rem;
    margin-top: 0.55rem;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 0.95rem;

    background:
      linear-gradient(
        135deg,
        #159cff,
        #1d55eb
      );

    color: #ffffff;
    text-decoration: none;

    font-size: 0.9rem;
    font-weight: 500;

    box-shadow:
      0 0.8rem 1.8rem rgba(28, 94, 231, 0.2);
  }

  /*
    El cambio ocurre por espacio real disponible.
    No representa un dispositivo concreto.
  */

  @media (max-width: 68rem) {
    .dt-navbar__desktop {
      display: none;
    }

    .dt-navbar__toggle {
      display: grid;
    }

    .dt-navbar__container {
      grid-template-columns: minmax(0, 1fr) auto;
    }
  }

  @media (max-width: 30rem) {
    .dt-navbar__container {
      width: calc(100% - 1.25rem);
    }

    .dt-navbar__brand-tagline {
      letter-spacing: 0.13em;
    }
  }

  @media (max-width: 23rem) {
    .dt-navbar__brand-tagline {
      display: none;
    }

    .dt-navbar__brand-name {
      font-size: 1.05rem;
    }

    .dt-navbar__logo-frame {
      width: 2.65rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .dt-navbar *,
    .dt-navbar *::before,
    .dt-navbar *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      scroll-behavior: auto !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

export default function Navbar() {
  const reduceMotion = useReducedMotion();

  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#inicio");

  useEffect(() => {
    const sections = links
      .map(([, href]) => document.querySelector(href))
      .filter(Boolean);

    if (!sections.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              second.intersectionRatio -
              first.intersectionRatio,
          );

        if (visibleEntries.length) {
          setActiveHref(
            `#${visibleEntries[0].target.id}`,
          );
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0.08, 0.2, 0.4, 0.65],
      },
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, []);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <style>{NAVBAR_STYLES}</style>

      <header className="dt-navbar">
        <div className="dt-navbar__surface">
          <div className="dt-navbar__container">
            <a
              href="#inicio"
              className="dt-navbar__brand"
              onClick={closeMenu}
              aria-label="Ir al inicio de DaloTech"
            >
              <span className="dt-navbar__logo-frame">
                <img
                  src="/images/favicon.png"
                  alt=""
                  className="dt-navbar__logo"
                  draggable="false"
                />
              </span>

              <span className="dt-navbar__brand-copy">
                <span className="dt-navbar__brand-name">
                  Dalo
                  <span className="dt-navbar__brand-highlight">
                    Tech
                  </span>
                </span>

                <span className="dt-navbar__brand-tagline">
                  DESARROLLAMOS EL FUTURO
                </span>
              </span>
            </a>

            <div className="dt-navbar__desktop">
              <nav
                className="dt-navbar__links"
                aria-label="Navegación principal"
              >
                {links.map(([label, href]) => {
                  const isActive =
                    activeHref === href;

                  return (
                    <a
                      key={href}
                      href={href}
                      className={`dt-navbar__link ${
                        isActive ? "is-active" : ""
                      }`}
                      aria-current={
                        isActive ? "page" : undefined
                      }
                    >
                      {label}
                    </a>
                  );
                })}
              </nav>

              <a
                href="#contacto"
                className="dt-navbar__cta"
              >
                Hablemos
              </a>
            </div>

            <button
              type="button"
              className="dt-navbar__toggle"
              onClick={() => {
                setOpen((currentValue) => !currentValue);
              }}
              aria-label={
                open ? "Cerrar menú" : "Abrir menú"
              }
              aria-expanded={open}
              aria-controls="dt-mobile-navigation"
            >
              <Icon name={open ? "close" : "menu"} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              className="dt-navbar__mobile-layer"
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                    }
              }
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.2,
              }}
              onClick={(event) => {
                if (event.target === event.currentTarget) {
                  closeMenu();
                }
              }}
            >
              <motion.nav
                id="dt-mobile-navigation"
                className="dt-navbar__mobile-panel"
                aria-label="Navegación móvil"
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: -12,
                        scale: 0.97,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -8,
                  scale: 0.98,
                }}
                transition={{
                  duration: 0.28,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="dt-navbar__mobile-links">
                  {links.map(
                    ([label, href], index) => {
                      const isActive =
                        activeHref === href;

                      return (
                        <motion.a
                          key={href}
                          href={href}
                          className={`dt-navbar__mobile-link ${
                            isActive
                              ? "is-active"
                              : ""
                          }`}
                          onClick={closeMenu}
                          initial={
                            reduceMotion
                              ? false
                              : {
                                  opacity: 0,
                                  x: -8,
                                }
                          }
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          transition={{
                            duration: 0.25,
                            delay: index * 0.035,
                          }}
                        >
                          <span>{label}</span>

                          <span
                            className="dt-navbar__mobile-link-arrow"
                            aria-hidden="true"
                          >
                            →
                          </span>
                        </motion.a>
                      );
                    },
                  )}
                </div>

                <a
                  href="#contacto"
                  onClick={closeMenu}
                  className="dt-navbar__mobile-cta"
                >
                  Hablemos de tu proyecto
                </a>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
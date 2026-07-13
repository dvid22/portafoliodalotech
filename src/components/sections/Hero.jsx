import { motion, useReducedMotion } from "motion/react";
import Icon from "../common/Icon";
import LogoScene from "../three/LogoScene";

const services = [
  {
    id: "web",
    title: "Desarrollo web",
    description: "Sitios rápidos, seguros y escalables.",
  },
  {
    id: "mobile",
    title: "Apps móviles",
    description: "Experiencias nativas para iOS y Android.",
  },
  {
    id: "saas",
    title: "Soluciones SaaS",
    description: "Software en la nube que impulsa tu operación.",
  },
  {
    id: "strategy",
    title: "Estrategia digital",
    description: "Tecnología y diseño para alcanzar tus objetivos.",
  },
];

const EASE = [0.22, 1, 0.36, 1];

const HERO_STYLES = `
  .dt-hero,
  .dt-hero *,
  .dt-hero *::before,
  .dt-hero *::after {
    box-sizing: border-box;
  }

  .dt-hero {
    position: relative;
    container-type: inline-size;

    width: 100%;
    min-height: 100svh;
    padding:
      clamp(5.15rem, 6.35cqi, 6.45rem)
      clamp(0.85rem, 2cqi, 1.55rem)
      clamp(1.45rem, 2.7cqi, 2.35rem);

    overflow-x: clip;
    overflow-y: visible;

    color: #0a1c49;
    font-family: "Poppins", sans-serif;

    background:
      radial-gradient(
        circle at 72% 34%,
        rgba(74, 160, 255, 0.1),
        transparent 36%
      ),
      radial-gradient(
        circle at 10% 78%,
        rgba(43, 103, 246, 0.055),
        transparent 30%
      ),
      #ffffff;
  }

  .dt-hero__background {
    position: absolute;
    inset: 0;
    z-index: 0;
    overflow: hidden;
    pointer-events: none;
  }

  .dt-hero__grid {
    position: absolute;
    inset: 0;
    opacity: 0.4;

    background-image:
      linear-gradient(
        rgba(38, 99, 210, 0.04) 1px,
        transparent 1px
      ),
      linear-gradient(
        90deg,
        rgba(38, 99, 210, 0.04) 1px,
        transparent 1px
      );

    background-size:
      clamp(2.3rem, 3.45cqi, 3.2rem)
      clamp(2.3rem, 3.45cqi, 3.2rem);

    -webkit-mask-image: linear-gradient(
      to bottom,
      #000 0%,
      #000 78%,
      transparent 100%
    );

    mask-image: linear-gradient(
      to bottom,
      #000 0%,
      #000 78%,
      transparent 100%
    );
  }

  .dt-hero__glow {
    position: absolute;
    border-radius: 999px;
    filter: blur(clamp(1.7rem, 2.8cqi, 2.5rem));
  }

  .dt-hero__glow--left {
    left: -14rem;
    bottom: -11rem;
    width: clamp(18rem, 34cqi, 31rem);
    aspect-ratio: 1;
    background: rgba(58, 138, 255, 0.075);
  }

  .dt-hero__glow--right {
    top: 4.5rem;
    right: -11rem;
    width: clamp(19rem, 33cqi, 31rem);
    aspect-ratio: 1;
    background: rgba(37, 99, 244, 0.07);
  }

  .dt-hero__container {
    position: relative;
    z-index: 2;
    width: min(94rem, 100%);
    min-width: 0;
    margin-inline: auto;
  }

  /* =========================
     LAYOUT PRINCIPAL
  ========================= */

  .dt-hero__main {
    display: grid;
    grid-template-columns:
      repeat(
        auto-fit,
        minmax(
          min(100%, 32rem),
          1fr
        )
      );
    gap: clamp(1.5rem, 3cqi, 3.25rem);
    align-items: center;
    width: 100%;
    min-width: 0;
  }

  /* =========================
     COPY
  ========================= */

  .dt-hero__copy {
    position: relative;
    z-index: 8;
    width: 100%;
    min-width: 0;
    max-width: 39rem;
    padding-block: clamp(0rem, 1.1cqi, 1rem);
    overflow: visible;
  }

  .dt-hero__eyebrow {
    width: fit-content;
    max-width: 100%;
    min-height: clamp(2.05rem, 2.65cqi, 2.45rem);
    padding:
      clamp(0.42rem, 0.56cqi, 0.5rem)
      clamp(0.78rem, 0.98cqi, 1rem);

    display: inline-flex;
    align-items: center;
    gap: clamp(0.45rem, 0.7cqi, 0.7rem);

    border: 1px solid rgba(34, 101, 224, 0.12);
    border-radius: 999px;

    background:
      linear-gradient(
        135deg,
        rgba(235, 245, 255, 0.96),
        rgba(244, 248, 255, 0.9)
      );

    color: #1761e9;
    font-size: clamp(0.66rem, 0.86cqi, 0.82rem);
    line-height: 1.3;
    font-weight: 500;

    box-shadow:
      0 0.45rem 1.1rem rgba(28, 82, 177, 0.05),
      inset 0 1px 0 rgba(255, 255, 255, 0.95);
  }

  .dt-hero__eyebrow-dot {
    width: clamp(0.42rem, 0.56cqi, 0.55rem);
    aspect-ratio: 1;
    flex: 0 0 auto;
    border-radius: 50%;
    background: #2070f5;
    box-shadow:
      0 0 0 clamp(0.2rem, 0.33cqi, 0.3rem)
      rgba(32, 112, 245, 0.09);
  }

  .dt-hero__title {
    width: 100%;
    max-width: 100%;
    margin:
      clamp(1rem, 1.7cqi, 1.65rem)
      0
      clamp(0.95rem, 1.45cqi, 1.35rem);

    color: #081a47;

    font-size: clamp(2.15rem, 4.15cqi, 4.6rem);
    line-height: 1.07;
    letter-spacing: -0.037em;
    font-weight: 600;

    word-break: normal;
    overflow-wrap: normal;
    text-wrap: balance;
  }

  .dt-hero__title-line {
    display: block;
    width: 100%;
    max-width: 100%;
    white-space: normal;
  }

  .dt-hero__title-highlight {
    display: inline;
    background:
      linear-gradient(
        110deg,
        #159cff 0%,
        #2474f8 50%,
        #344df2 100%
      );
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }

  .dt-hero__description {
    width: 100%;
    max-width: 33rem;
    margin: 0;
    color: #64718e;
    font-size: clamp(0.86rem, 1.03cqi, 1rem);
    line-height: 1.78;
    font-weight: 400;
  }

  /* =========================
     BOTONES
  ========================= */

  .dt-hero__actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: clamp(0.72rem, 1cqi, 1rem);
    margin-top: clamp(1.25rem, 1.95cqi, 1.9rem);
  }

  .dt-hero__button {
    min-width: min(100%, 11.5rem);
    min-height: clamp(3rem, 3.45cqi, 3.4rem);
    padding-inline: clamp(1rem, 1.45cqi, 1.45rem);

    display: inline-flex;
    flex: 1 1 11rem;
    align-items: center;
    justify-content: center;
    gap: clamp(0.55rem, 0.9cqi, 0.9rem);

    border-radius: clamp(0.9rem, 1cqi, 1rem);

    text-decoration: none;
    font-size: clamp(0.79rem, 0.92cqi, 0.89rem);
    line-height: 1.2;
    font-weight: 500;

    transition:
      transform 190ms ease,
      box-shadow 190ms ease,
      border-color 190ms ease;
  }

  .dt-hero__button:hover {
    transform: translateY(-0.16rem);
  }

  .dt-hero__button--primary {
    border: 1px solid #1765f3;
    background:
      linear-gradient(
        135deg,
        #1684ff 0%,
        #2257ee 100%
      );
    color: #ffffff;
    box-shadow:
      0 0.95rem 1.9rem rgba(29, 92, 237, 0.22),
      inset 0 1px 0 rgba(255, 255, 255, 0.25);
  }

  .dt-hero__button--primary:hover {
    box-shadow:
      0 1.18rem 2.25rem rgba(29, 92, 237, 0.27),
      inset 0 1px 0 rgba(255, 255, 255, 0.25);
  }

  .dt-hero__button--secondary {
    border: 1px solid rgba(18, 58, 132, 0.13);
    background: rgba(255, 255, 255, 0.92);
    color: #102451;
    box-shadow:
      0 0.68rem 1.45rem rgba(19, 54, 116, 0.055),
      inset 0 1px 0 #ffffff;
  }

  .dt-hero__button--secondary:hover {
    border-color: rgba(32, 102, 237, 0.24);
    box-shadow:
      0 0.92rem 1.85rem rgba(19, 54, 116, 0.085),
      inset 0 1px 0 #ffffff;
  }

  .dt-hero__button-icon {
    width: 1.2rem;
    height: 1.2rem;
    display: inline-grid;
    flex: 0 0 auto;
    place-items: center;
  }

  .dt-hero__button-icon svg {
    width: 1.05rem;
    height: 1.05rem;
  }

  /* =========================
     ESCENA VISUAL
  ========================= */

  .dt-hero__visual {
    position: relative;
    z-index: 3;

    width: 100%;
    min-width: 0;
    min-height: clamp(18rem, 37cqi, 37rem);
    aspect-ratio: 1.52 / 1;

    display: grid;
    place-items: center;

    overflow: visible;
  }

  .dt-hero__visual::before {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 8%;
    z-index: 0;

    width: min(82%, 42rem);
    height: clamp(3.1rem, 5.8cqi, 5.3rem);

    transform: translateX(-50%);
    border-radius: 50%;

    background: rgba(34, 105, 224, 0.11);
    filter: blur(clamp(1.45rem, 2.3cqi, 2.15rem));

    pointer-events: none;
  }

  .dt-hero__visual-frame {
    position: relative;
    z-index: 2;

    width: min(92%, 52rem);
    height: 100%;
    min-width: 0;

    margin-inline: auto;
    overflow: visible;
    isolation: isolate;
  }

  .dt-hero__scene-image {
    position: absolute;
    inset: 0;
    z-index: 1;

    width: 100%;
    height: 100%;

    display: block;
    object-fit: contain;
    object-position: center bottom;

    filter:
      drop-shadow(
        0
        clamp(0.95rem, 1.8cqi, 1.6rem)
        clamp(1rem, 2cqi, 1.8rem)
        rgba(29, 76, 161, 0.1)
      )
      saturate(1.03);

    user-select: none;
    pointer-events: none;
  }

  .dt-hero__visual-frame > .dt-ui-scene {
    position: absolute !important;
    inset: 0 !important;
    z-index: 6 !important;
    width: 100% !important;
    height: 100% !important;
    overflow: visible !important;
    pointer-events: none !important;
  }

  .dt-hero__visual-light {
    position: absolute;
    z-index: 3;

    top: 22%;
    left: 50%;

    width: 44%;
    height: 45%;

    transform: translateX(-50%);
    border-radius: 50%;

    background:
      radial-gradient(
        circle,
        rgba(65, 170, 255, 0.1),
        transparent 70%
      );

    filter: blur(clamp(0.9rem, 1.35cqi, 1.2rem));
    pointer-events: none;
  }

  /* =========================
     KPIs / SERVICIOS
  ========================= */

  .dt-hero__services {
    position: relative;
    z-index: 10;

    width: 100%;
    min-width: 0;

    margin-top: clamp(0.8rem, 1.45cqi, 1rem);
    padding: clamp(0.72rem, 1.1cqi, 0.95rem);

    border: 1px solid rgba(28, 77, 164, 0.08);
    border-radius: clamp(1.45rem, 2cqi, 1.9rem);

    background:
      linear-gradient(
        145deg,
        rgba(255, 255, 255, 0.985),
        rgba(249, 252, 255, 0.96)
      );

    box-shadow:
      0 1.1rem 2.8rem rgba(19, 55, 123, 0.075),
      0 0.3rem 0.9rem rgba(34, 91, 194, 0.04),
      inset 0 1px 0 #ffffff;

    backdrop-filter: blur(1rem);
  }

  .dt-hero__services-grid {
    display: grid;
    grid-template-columns:
      repeat(
        auto-fit,
        minmax(
          min(100%, 14.3rem),
          1fr
        )
      );
    gap: clamp(0.5rem, 0.7cqi, 0.7rem);
  }

  .dt-service {
    position: relative;

    min-width: 0;
    min-height: clamp(5.2rem, 7.1cqi, 6rem);
    padding:
      clamp(0.72rem, 1.02cqi, 0.92rem)
      clamp(0.8rem, 1.1cqi, 1rem);

    display: grid;
    grid-template-columns:
      clamp(3rem, 4.3cqi, 3.7rem)
      minmax(0, 1fr);
    gap: clamp(0.78rem, 1.15cqi, 1rem);
    align-items: center;

    border: 1px solid rgba(26, 76, 164, 0.06);
    border-radius: clamp(1rem, 1.3cqi, 1.25rem);

    background:
      linear-gradient(
        145deg,
        rgba(255, 255, 255, 0.95),
        rgba(245, 249, 255, 0.92)
      );

    transition:
      transform 180ms ease,
      box-shadow 180ms ease,
      border-color 180ms ease,
      background 180ms ease;
  }

  .dt-service:hover {
    transform: translateY(-0.12rem);
    border-color: rgba(32, 102, 237, 0.12);
    background:
      linear-gradient(
        145deg,
        rgba(255, 255, 255, 0.98),
        rgba(240, 247, 255, 0.98)
      );
    box-shadow:
      0 0.9rem 1.8rem rgba(22, 67, 151, 0.06);
  }

  .dt-service__icon-box {
    width: clamp(3rem, 4.3cqi, 3.7rem);
    aspect-ratio: 1;

    display: grid;
    place-items: center;

    border: 1px solid rgba(31, 94, 212, 0.08);
    border-radius: clamp(0.95rem, 1.2cqi, 1.05rem);

    background:
      linear-gradient(
        145deg,
        #ffffff,
        #eff6ff
      );

    box-shadow:
      0 0.55rem 1.2rem rgba(24, 69, 153, 0.06),
      inset 0 1px 0 #ffffff;
  }

  .dt-service__icon {
    width: clamp(1.7rem, 2.6cqi, 2.15rem);
    aspect-ratio: 1;
    display: block;
  }

  .dt-service__content {
    min-width: 0;
  }

  .dt-service__title {
    margin: 0 0 clamp(0.22rem, 0.38cqi, 0.35rem);
    color: #102451;
    font-size: clamp(0.84rem, 0.96cqi, 0.94rem);
    line-height: 1.3;
    font-weight: 600;
  }

  .dt-service__description {
    margin: 0;
    color: #71809c;
    font-size: clamp(0.72rem, 0.82cqi, 0.8rem);
    line-height: 1.5;
    font-weight: 400;
  }

  /* =========================
     CONTAINER QUERY
  ========================= */

  @container (max-width: 38rem) {
    .dt-hero__title {
      font-size: clamp(2rem, 10cqi, 2.85rem);
      line-height: 1.1;
      letter-spacing: -0.024em;
    }

    .dt-hero__description {
      max-width: 100%;
    }

    .dt-hero__visual {
      min-height: clamp(15rem, 68cqi, 20rem);
      aspect-ratio: 1.24 / 1;
    }

    .dt-hero__visual-frame {
      width: min(100%, 32rem);
    }

    .dt-hero__actions {
      display: grid;
      grid-template-columns: 1fr;
    }

    .dt-hero__button {
      width: 100%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .dt-hero *,
    .dt-hero *::before,
    .dt-hero *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      scroll-behavior: auto !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

function WebIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="dt-service__icon"
      aria-hidden="true"
    >
      <circle
        cx="32"
        cy="32"
        r="24"
        fill="none"
        stroke="#176cf4"
        strokeWidth="4"
      />
      <path
        d="
          M8 32H56
          M32 8C24 15 20 23 20 32C20 41 24 49 32 56
          M32 8C40 15 44 23 44 32C44 41 40 49 32 56
        "
        fill="none"
        stroke="#176cf4"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MobileIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="dt-service__icon"
      aria-hidden="true"
    >
      <rect
        x="18"
        y="6"
        width="28"
        height="52"
        rx="7"
        fill="none"
        stroke="#176cf4"
        strokeWidth="4"
      />
      <path
        d="M27 13H37"
        stroke="#176cf4"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle
        cx="32"
        cy="51"
        r="2.5"
        fill="#176cf4"
      />
    </svg>
  );
}

function SaaSIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="dt-service__icon"
      aria-hidden="true"
    >
      <path
        d="
          M17 49
          H47
          C53 49 58 44 58 38
          C58 32 54 27 48 26
          C46 17 39 11 30 11
          C20 11 13 18 12 27
          C6 29 3 34 3 39
          C3 45 8 49 17 49
          Z
        "
        fill="none"
        stroke="#176cf4"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StrategyIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="dt-service__icon"
      aria-hidden="true"
    >
      <circle
        cx="29"
        cy="35"
        r="22"
        fill="none"
        stroke="#176cf4"
        strokeWidth="3.5"
      />
      <circle
        cx="29"
        cy="35"
        r="13"
        fill="none"
        stroke="#176cf4"
        strokeWidth="3.5"
      />
      <circle
        cx="29"
        cy="35"
        r="4.5"
        fill="#176cf4"
      />
      <path
        d="M31 33L51 13"
        fill="none"
        stroke="#176cf4"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M45 11L55 9L53 19"
        fill="none"
        stroke="#176cf4"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ServiceIcon({ serviceId }) {
  if (serviceId === "web") return <WebIcon />;
  if (serviceId === "mobile") return <MobileIcon />;
  if (serviceId === "saas") return <SaaSIcon />;
  return <StrategyIcon />;
}

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <style>{HERO_STYLES}</style>

      <section
        id="inicio"
        aria-labelledby="dt-hero-title"
        className="dt-hero"
      >
        <div
          className="dt-hero__background"
          aria-hidden="true"
        >
          <span className="dt-hero__grid" />
          <span className="dt-hero__glow dt-hero__glow--left" />
          <span className="dt-hero__glow dt-hero__glow--right" />
        </div>

        <div className="dt-hero__container">
          <div className="dt-hero__main">
            <motion.div
              className="dt-hero__copy"
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      x: -24,
                      y: 10,
                    }
              }
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
              }}
              transition={{
                duration: 0.72,
                ease: EASE,
              }}
            >
              <div className="dt-hero__eyebrow">
                <span
                  className="dt-hero__eyebrow-dot"
                  aria-hidden="true"
                />
                <span>
                  Innovación, tecnología y crecimiento
                </span>
              </div>

              <h1
                id="dt-hero-title"
                className="dt-hero__title"
              >
                <span className="dt-hero__title-line">
                  Soluciones digitales
                </span>

                <span className="dt-hero__title-line">
                  que{" "}
                  <span className="dt-hero__title-highlight">
                    impulsan
                  </span>
                </span>

                <span className="dt-hero__title-line">
                  <span className="dt-hero__title-highlight">
                    tu negocio.
                  </span>
                </span>
              </h1>

              <p className="dt-hero__description">
                Desarrollamos plataformas web, aplicaciones
                móviles y soluciones SaaS a la medida que
                transforman ideas en resultados reales.
              </p>

              <div className="dt-hero__actions">
                <a
                  href="#contacto"
                  className="dt-hero__button dt-hero__button--primary"
                >
                  <span>Cuéntanos tu proyecto</span>
                  <span className="dt-hero__button-icon">
                    <Icon name="arrow" />
                  </span>
                </a>

                <a
                  href="#proyectos"
                  className="dt-hero__button dt-hero__button--secondary"
                >
                  <span>Ver proyectos</span>
                  <span className="dt-hero__button-icon">
                    <Icon name="arrow" />
                  </span>
                </a>
              </div>
            </motion.div>

            <motion.div
              className="dt-hero__visual"
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      x: 28,
                      y: 14,
                      scale: 0.975,
                    }
              }
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.92,
                delay: 0.08,
                ease: EASE,
              }}
            >
              <div className="dt-hero__visual-frame">
                <img
                  src="/hero-dalotech-scene.png"
                  alt="Escenario DaloTech con profesionales desarrollando soluciones digitales"
                  className="dt-hero__scene-image"
                  draggable="false"
                  decoding="async"
                  fetchPriority="high"
                />

                <span
                  className="dt-hero__visual-light"
                  aria-hidden="true"
                />

                <LogoScene />
              </div>
            </motion.div>
          </div>

          <motion.div
            className="dt-hero__services"
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 18,
                    scale: 0.99,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.7,
              delay: 0.24,
              ease: EASE,
            }}
          >
            <div className="dt-hero__services-grid">
              {services.map((service) => (
                <article
                  key={service.id}
                  className="dt-service"
                >
                  <div className="dt-service__icon-box">
                    <ServiceIcon serviceId={service.id} />
                  </div>

                  <div className="dt-service__content">
                    <h2 className="dt-service__title">
                      {service.title}
                    </h2>

                    <p className="dt-service__description">
                      {service.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
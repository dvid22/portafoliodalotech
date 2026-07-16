import { motion, useReducedMotion } from "motion/react";
import {
  Code2,
  ImageOff,
  Lightbulb,
  Rocket,
  Search,
  ShieldCheck,
  Target,
} from "lucide-react";
import { processSteps } from "../../data/portfolioData";

const PROCESS_IMAGE = "/images/process/process-visual.png";
const EASE = [0.22, 1, 0.36, 1];

const stepIcons = [Search, Target, Code2, ShieldCheck, Rocket];

const stepColors = [
  { color: "#087bea", background: "#eaf4ff" },
  { color: "#16a34a", background: "#ecfdf3" },
  { color: "#7c3aed", background: "#f3efff" },
  { color: "#ea7900", background: "#fff4e8" },
  { color: "#087bea", background: "#eaf4ff" },
];

const benefits = [
  {
    icon: Lightbulb,
    title: "Comunicación constante",
    description: "Te mantenemos informado durante cada etapa del proyecto.",
  },
  {
    icon: Target,
    title: "Enfoque en resultados",
    description: "Construimos soluciones orientadas a generar valor real.",
  },
  {
    icon: ShieldCheck,
    title: "Calidad garantizada",
    description: "Aplicamos buenas prácticas y altos estándares técnicos.",
  },
  {
    icon: Rocket,
    title: "Mejora continua",
    description: "Optimizamos y evolucionamos tu solución después del lanzamiento.",
  },
];

const STYLES = String.raw`
.process-premium {
  position: relative;
  overflow: hidden;
  padding: clamp(52px, 6vw, 82px) 0;
  background: #ffffff;
  color: #0a1532;
  isolation: isolate;
}

.process-premium__background {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
}

.process-premium__glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(18px);
  opacity: 0.7;
}

.process-premium__glow--left {
  top: 5%;
  left: -9%;
  width: 360px;
  height: 360px;
  background: rgba(37, 118, 255, 0.07);
}

.process-premium__glow--right {
  right: -8%;
  bottom: 8%;
  width: 320px;
  height: 320px;
  background: rgba(124, 58, 237, 0.055);
}

.process-premium__pattern {
  position: absolute;
  inset: 0;
  opacity: 0.38;
  background-image:
    linear-gradient(rgba(21, 79, 184, 0.024) 1px, transparent 1px),
    linear-gradient(90deg, rgba(21, 79, 184, 0.024) 1px, transparent 1px);
  background-size: 58px 58px;
  mask-image: linear-gradient(to bottom, transparent, #000 10%, #000 90%, transparent);
}

.process-premium__container {
  width: min(1380px, calc(100% - 36px));
  margin-inline: auto;
}

.process-premium__hero {
  display: grid;
  grid-template-columns: minmax(330px, 0.9fr) minmax(460px, 1.1fr);
  gap: clamp(30px, 4vw, 58px);
  align-items: center;
}

.process-premium__copy {
  max-width: 620px;
}

.process-premium .eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  margin: 0;
  color: #176dff;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.process-premium .eyebrow::before {
  content: "";
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #176dff;
  box-shadow: 0 0 0 6px rgba(23, 109, 255, 0.07);
}

.process-premium__title {
  max-width: 690px;
  margin: 15px 0 14px;
  color: #07122f;
  font-size: clamp(1.9rem, 2.55vw, 2.85rem);
  line-height: 1.03;
  letter-spacing: -0.045em;
  font-weight: 600;
}

.process-premium__title span {
  color: transparent;
  background: linear-gradient(90deg, #176dff, #6a55ed);
  -webkit-background-clip: text;
  background-clip: text;
}

.process-premium__description {
  max-width: 590px;
  margin: 0;
  color: #61708c;
  font-size: clamp(0.9rem, 1vw, 1.02rem);
  line-height: 1.7;
}

/* VISUAL ULTRA NÍTIDO */
.process-visual {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 350px;
}

.process-visual__floating {
  position: relative;
  display: grid;
  place-items: center;
  width: min(700px, 100%);
  aspect-ratio: 3 / 2;
}



.process-visual__floating img {
  display: block;
  width: 100%;
  height: auto;
  max-width: 100%;
  aspect-ratio: 3 / 2;
  object-fit: contain;
  object-position: center;
  image-rendering: auto;
  filter: none;
  transform: none;
  backface-visibility: visible;
  user-select: none;
  mix-blend-mode: multiply;
}

.process-visual__fallback {
  position: absolute;
  inset: 14%;
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  border: 1px dashed rgba(23, 109, 255, 0.18);
  border-radius: 24px;
  background: #f8fbff;
  color: #65728b;
  text-align: center;
}

.process-visual__fallback-icon {
  display: grid;
  place-items: center;
  width: 50px;
  height: 50px;
  border-radius: 16px;
  background: #edf4ff;
  color: #176dff;
}

.process-visual__fallback p {
  max-width: 270px;
  margin: 0;
  font-size: 0.76rem;
  line-height: 1.5;
}

.process-visual__particle {
  position: absolute;
  z-index: 3;
  pointer-events: none;
}

.process-visual__particle--one {
  top: 14%;
  right: 9%;
  width: 17px;
  height: 17px;
  border: 4px solid #176dff;
  border-radius: 6px;
  opacity: 0.55;
}

.process-visual__particle--two {
  bottom: 17%;
  left: 10%;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #7c3aed;
  opacity: 0.42;
}

.process-visual__particle--three {
  top: 24%;
  left: 14%;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #19b46b;
  box-shadow: 0 0 0 8px rgba(25, 180, 107, 0.08);
}

/* PASOS */
.process-premium__steps {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 9px;
  margin-top: 28px;
}

.process-step-card,
.process-step-card:nth-child(n + 5) {
  position: relative;
  grid-column: auto;
  min-width: 0;
  min-height: 158px;
  padding: 13px;
  border: 1px solid rgba(44, 79, 148, 0.085);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.97);
  box-shadow:
    0 9px 22px rgba(33, 67, 135, 0.035),
    inset 0 1px 0 rgba(255,255,255,0.98);
}

.process-step-card__header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.process-step-card__number {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  flex: 0 0 28px;
  border: 1px solid rgba(23, 109, 255, 0.14);
  border-radius: 999px;
  background: #f4f8ff;
  color: #176dff;
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.process-step-card__line {
  flex: 1;
  height: 1px;
  overflow: hidden;
  background: #e9eef8;
}

.process-step-card__line span {
  display: block;
  width: 34%;
  height: 100%;
  margin-left: auto;
  background: #176dff;
}

.process-step-card__icon {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  margin-top: 12px;
  border-radius: 13px;
}

.process-step-card h3 {
  margin: 11px 0 5px;
  color: #14203e;
  font-size: 0.76rem;
  line-height: 1.2;
  font-weight: 600;
}

.process-step-card p {
  margin: 0;
  color: #69768e;
  font-size: 0.62rem;
  line-height: 1.42;
}

/* Una sola fila también en pantallas medianas */
@media (max-width: 1180px) {
  .process-premium__steps {
    grid-template-columns: none;
    grid-auto-flow: column;
    grid-auto-columns: minmax(170px, 1fr);
    overflow-x: auto;
    overscroll-behavior-inline: contain;
    padding: 2px 2px 10px;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
  }

  .process-premium__steps::-webkit-scrollbar {
    display: none;
  }

  .process-step-card,
  .process-step-card:nth-child(n + 5),
  .process-step-card:last-child {
    grid-column: auto;
    min-height: 152px;
    scroll-snap-align: start;
  }
}

/* COMPROMISO */
.process-premium__commitment {
  display: grid;
  grid-template-columns: minmax(280px, 0.82fr) minmax(540px, 1.18fr);
  gap: 30px;
  align-items: center;
  margin-top: 24px;
  padding: 26px 28px;
  border: 1px solid rgba(44, 79, 148, 0.09);
  border-radius: 22px;
  background:
    linear-gradient(140deg, #ffffff, #f8fbff 64%, #fbf9ff);
  box-shadow: 0 15px 34px rgba(33, 67, 135, 0.045);
}

.process-premium__commitment-copy {
  min-width: 0;
}

.process-premium__commitment-icon {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 15px;
  background: linear-gradient(145deg, #f7faff, #edf4ff);
  color: #176dff;
}

.process-premium__commitment-copy h3 {
  margin: 14px 0 8px;
  color: #111d3b;
  font-size: clamp(1.3rem, 1.8vw, 1.8rem);
  line-height: 1.12;
  letter-spacing: -0.025em;
  font-weight: 600;
}

.process-premium__commitment-copy h3 span {
  color: #176dff;
}

.process-premium__commitment-copy p {
  margin: 0;
  color: #68758d;
  font-size: 0.78rem;
  line-height: 1.6;
}

.process-premium__benefits {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.process-benefit {
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr);
  gap: 10px;
  align-items: center;
  min-height: 76px;
  padding: 11px;
  border: 1px solid rgba(44, 79, 148, 0.075);
  border-radius: 14px;
  background: #ffffff;
}

.process-benefit__icon {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: #edf4ff;
  color: #176dff;
}

.process-benefit h4 {
  margin: 0 0 4px;
  color: #172340;
  font-size: 0.75rem;
  font-weight: 600;
}

.process-benefit p {
  margin: 0;
  color: #6d7890;
  font-size: 0.66rem;
  line-height: 1.42;
}

/* TABLET */
@media (max-width: 1120px) {
  .process-premium__hero {
    grid-template-columns: minmax(300px, 0.9fr) minmax(360px, 1.1fr);
  }

  .process-premium__commitment {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 820px) {
  .process-premium {
    padding-block: 48px;
  }

  .process-premium__container {
    width: min(100% - 22px, 760px);
  }

  .process-premium__hero {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .process-premium__copy {
    max-width: 680px;
    text-align: center;
    margin-inline: auto;
  }

  .process-premium__title {
    margin-inline: auto;
  }

  .process-premium__description {
    margin-inline: auto;
  }

  .process-visual {
    min-height: 330px;
  }

  .process-visual__floating {
    width: min(560px, 100%);
  }

  .process-premium__steps {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    margin-top: 30px;
  }

  .process-step-card {
    min-height: 205px;
  }
}

/* MÓVIL */
@media (max-width: 560px) {
  .process-premium {
    padding-block: 38px;
  }

  .process-premium__container {
    width: min(100% - 14px, 540px);
  }

  .process-premium__title {
    font-size: clamp(1.72rem, 8vw, 2.2rem);
    line-height: 1.03;
  }

  .process-premium__description {
    font-size: 0.78rem;
    line-height: 1.58;
  }

  .process-visual {
    min-height: 245px;
  }

  .process-visual__floating {
    width: 100%;
    aspect-ratio: 3 / 2;
  }

  .process-visual__floating::before {
    inset: 5%;
    border-radius: 23px;
  }

  .process-visual__particle--one {
    top: 11%;
    right: 7%;
  }

  .process-visual__particle--two {
    bottom: 14%;
    left: 8%;
  }

  .process-premium__commitment {
    gap: 18px;
    margin-top: 16px;
    padding: 20px 16px;
    border-radius: 18px;
  }

  .process-premium__commitment-copy {
    text-align: center;
  }

  .process-premium__commitment-icon {
    margin-inline: auto;
  }

  .process-premium__benefits {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .process-benefit {
    min-height: 68px;
  }
}


@media (max-width: 560px) {
  .process-visual {
    min-height: 220px;
  }

  .process-premium__steps {
    grid-auto-columns: 158px;
    gap: 7px;
    margin-top: 20px;
  }

  .process-step-card,
  .process-step-card:nth-child(n + 5),
  .process-step-card:last-child {
    min-height: 142px;
    padding: 11px;
    border-radius: 14px;
  }

  .process-step-card__number {
    width: 26px;
    height: 26px;
    flex-basis: 26px;
  }

  .process-step-card__icon {
    width: 36px;
    height: 36px;
    margin-top: 10px;
  }

  .process-step-card h3 {
    margin-top: 9px;
    font-size: 0.71rem;
  }

  .process-step-card p {
    font-size: 0.58rem;
    line-height: 1.38;
  }
}

@media (prefers-reduced-motion: reduce) {
  .process-visual__floating img {
    transform: none !important;
  }
}
`;

function ProcessVisualFallback() {
  return (
    <div className="process-visual__fallback">
      <span className="process-visual__fallback-icon">
        <ImageOff size={26} />
      </span>
      <p>
        Agrega la imagen en
        <br />
        public/images/process/process-visual.png
      </p>
    </div>
  );
}

export default function Process() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <style>{STYLES}</style>

      <section id="proceso" className="process-premium">
        <div className="process-premium__background">
          <span className="process-premium__glow process-premium__glow--left" />
          <span className="process-premium__glow process-premium__glow--right" />
          <span className="process-premium__pattern" />
        </div>

        <div className="process-premium__container">
          <div className="process-premium__hero">
            <motion.div
              className="process-premium__copy"
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, y: 20 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.58,
                ease: EASE,
              }}
            >
              <p className="eyebrow">Nuestro proceso</p>

              <h2 className="process-premium__title">
                Un proceso claro para
                <span> resultados extraordinarios.</span>
              </h2>

              <p className="process-premium__description">
                Combinamos estrategia, tecnología y diseño para crear
                soluciones digitales sólidas, escalables y enfocadas
                en generar impacto real.
              </p>
            </motion.div>

            <motion.div
              className="process-visual"
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, x: 22, scale: 0.97 }
              }
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.68,
                ease: EASE,
              }}
            >
              <div className="process-visual__floating">
                <img
                  src={PROCESS_IMAGE}
                  alt="Proceso de desarrollo digital de DaloTech"
                  loading="lazy"
                  decoding="async"
                  draggable="false"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";

                    const fallback = event.currentTarget
                      .closest(".process-visual__floating")
                      ?.querySelector(".process-visual__fallback");

                    if (fallback) {
                      fallback.style.display = "flex";
                    }
                  }}
                />

                <ProcessVisualFallback />

                <motion.span
                  className="process-visual__particle process-visual__particle--one"
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: [0, -10, 0],
                          x: [0, 5, 0],
                          rotate: [0, 10, 0],
                        }
                  }
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <motion.span
                  className="process-visual__particle process-visual__particle--two"
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: [0, 8, 0],
                          x: [0, -5, 0],
                        }
                  }
                  transition={{
                    duration: 5.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.3,
                  }}
                />

                <motion.span
                  className="process-visual__particle process-visual__particle--three"
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          scale: [1, 1.16, 1],
                          opacity: [0.35, 0.8, 0.35],
                        }
                  }
                  transition={{
                    duration: 3.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>
          </div>

          <div className="process-premium__steps">
            {processSteps.map(([number, title, description], index) => {
              const StepIcon = stepIcons[index] ?? Rocket;
              const color = stepColors[index % stepColors.length];

              return (
                <motion.article
                  key={number}
                  className="process-step-card"
                  initial={
                    shouldReduceMotion
                      ? false
                      : { opacity: 0, y: 18 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.22 }}
                  transition={{
                    duration: 0.42,
                    delay: index * 0.055,
                    ease: EASE,
                  }}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : { y: -5 }
                  }
                >
                  <div className="process-step-card__header">
                    <span className="process-step-card__number">
                      {number}
                    </span>

                    <span className="process-step-card__line">
                      <span />
                    </span>
                  </div>

                  <motion.div
                    className="process-step-card__icon"
                    style={{
                      color: color.color,
                      background: color.background,
                    }}
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : { rotate: -5, scale: 1.05 }
                    }
                  >
                    <StepIcon size={22} strokeWidth={1.8} />
                  </motion.div>

                  <h3>{title}</h3>
                  <p>{description}</p>
                </motion.article>
              );
            })}
          </div>

          <motion.div
            className="process-premium__commitment"
            initial={
              shouldReduceMotion
                ? false
                : { opacity: 0, y: 18 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.22 }}
            transition={{
              duration: 0.52,
              ease: EASE,
            }}
          >
            <div className="process-premium__commitment-copy">
              <span className="process-premium__commitment-icon">
                <ShieldCheck size={23} strokeWidth={1.8} />
              </span>

              <h3>
                Comprometidos con
                <span> cada etapa del camino.</span>
              </h3>

              <p>
                No solo desarrollamos software. Creamos relaciones
                de confianza y acompañamos la evolución de cada solución.
              </p>
            </div>

            <div className="process-premium__benefits">
              {benefits.map(
                ({ icon: BenefitIcon, title, description }, index) => (
                  <motion.article
                    key={title}
                    className="process-benefit"
                    initial={
                      shouldReduceMotion
                        ? false
                        : { opacity: 0, x: 14 }
                    }
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.38,
                      delay: index * 0.05,
                    }}
                  >
                    <span className="process-benefit__icon">
                      <BenefitIcon size={19} strokeWidth={1.8} />
                    </span>

                    <div>
                      <h4>{title}</h4>
                      <p>{description}</p>
                    </div>
                  </motion.article>
                ),
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

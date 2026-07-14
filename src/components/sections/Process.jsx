import { motion, useReducedMotion } from "motion/react";
import {
  Code2,
  Lightbulb,
  Rocket,
  Search,
  ShieldCheck,
  Target,
  ImageOff,
} from "lucide-react";
import { processSteps } from "../../data/portfolioData";

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
    description:
      "Te mantenemos informado durante cada etapa del proyecto.",
  },
  {
    icon: Target,
    title: "Enfoque en resultados",
    description:
      "Construimos soluciones orientadas a generar valor real.",
  },
  {
    icon: ShieldCheck,
    title: "Calidad garantizada",
    description:
      "Aplicamos buenas prácticas y altos estándares técnicos.",
  },
  {
    icon: Rocket,
    title: "Mejora continua",
    description:
      "Optimizamos y evolucionamos tu solución después del lanzamiento.",
  },
];

function ProcessVisualFallback() {
  return (
    <div className="process-visual__fallback">
      <span className="process-visual__fallback-icon">
        <ImageOff size={26} />
      </span>
      <p>Agrega la imagen en public/images/process/process-visual.png</p>
    </div>
  );
}

export default function Process() {
  const shouldReduceMotion = useReducedMotion();

  return (
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
                : { opacity: 0, y: 22 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
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
                : { opacity: 0, x: 26, scale: 0.96 }
            }
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.div
              className="process-visual__floating"
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: [0, -10, 0],
                      rotate: [0, 0.8, 0],
                    }
              }
              transition={{
                y: {
                  duration: 4.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                rotate: {
                  duration: 6.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              <img
                src="/images/process/process-visual.png"
                alt="Proceso de desarrollo digital de DaloTech"
                draggable="false"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const fallback =
                    e.currentTarget.parentElement?.querySelector(
                      ".process-visual__fallback",
                    );
                  if (fallback) fallback.style.display = "flex";
                }}
              />

              <ProcessVisualFallback />

              <motion.span
                className="process-visual__particle process-visual__particle--one"
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: [0, -14, 0],
                        x: [0, 7, 0],
                        rotate: [0, 12, 0],
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
                        y: [0, 11, 0],
                        x: [0, -6, 0],
                        rotate: [0, -12, 0],
                      }
                }
                transition={{
                  duration: 5.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.35,
                }}
              />

              <motion.span
                className="process-visual__particle process-visual__particle--three"
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: [1, 1.18, 1],
                        opacity: [0.35, 0.85, 0.35],
                      }
                }
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
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
                    : { opacity: 0, y: 22 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { y: -6 }
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
                      : { rotate: -6, scale: 1.06 }
                  }
                >
                  <StepIcon size={24} strokeWidth={1.8} />
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
              : { opacity: 0, y: 22 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="process-premium__commitment-copy">
            <span className="process-premium__commitment-icon">
              <ShieldCheck size={24} strokeWidth={1.8} />
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
                      : { opacity: 0, x: 16 }
                  }
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.06,
                  }}
                >
                  <span className="process-benefit__icon">
                    <BenefitIcon size={20} strokeWidth={1.8} />
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
  );
}
import {
  motion,
  useReducedMotion,
} from "motion/react";
import {
  ArrowRight,
  BarChart3,
  Check,
  FileText,
  Layers3,
  MonitorSmartphone,
  QrCode,
  ReceiptText,
  ShoppingBag,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

const PRODUCT_LOGO = "/images/projects/menu-qr.png";
const EASE = [0.22, 1, 0.36, 1];

const features = [
  { title: "Menú digital QR", icon: QrCode },
  { title: "Pedidos en tiempo real", icon: ShoppingBag },
  { title: "Gestión de clientes", icon: Users },
  { title: "Facturación electrónica", icon: ReceiptText },
  { title: "Contabilidad inteligente", icon: FileText },
  { title: "Reportes y estadísticas", icon: BarChart3 },
  { title: "Control de ventas", icon: Check },
  { title: "Acceso multidispositivo", icon: MonitorSmartphone },
];

const STYLES = String.raw`
.featured-product {
  position: relative;
  overflow: hidden;
  padding: 26px 0;
  background: #ffffff;
  color: #0a1532;
}

.featured-product__container {
  width: min(1280px, calc(100% - 24px));
  margin-inline: auto;
}

.featured-product__card {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(37, 88, 176, 0.11);
  border-radius: 22px;
  background: #ffffff;
  box-shadow:
    0 16px 40px rgba(35, 67, 132, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.98);
}

.featured-product__card::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  border-radius: inherit;
  box-shadow:
    inset 2px 0 0 rgba(23, 109, 255, 0.46),
    inset -2px 0 0 rgba(122, 69, 235, 0.30);
}

.featured-product__layout {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns:
    minmax(250px, 0.9fr)
    minmax(220px, 0.66fr)
    minmax(390px, 1.18fr);
  gap: 24px;
  align-items: center;
  min-height: 320px;
  padding: 24px 28px;
}

.featured-product__content {
  min-width: 0;
}

.featured-product__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  min-height: 28px;
  padding: 0 10px;
  border: 1px solid rgba(95, 68, 220, 0.13);
  border-radius: 999px;
  background: #ffffff;
  color: #6744d9;
  font-size: 0.61rem;
  font-weight: 700;
  box-shadow: 0 7px 16px rgba(45, 71, 130, 0.035);
}

.featured-product__eyebrow-icon {
  display: grid;
  place-items: center;
  width: 18px;
  height: 18px;
  border-radius: 6px;
  background: linear-gradient(145deg, #277cff, #7c49e9);
  color: #ffffff;
}

.featured-product__title {
  margin: 13px 0 9px;
  color: #07132f;
  font-size: clamp(2rem, 2.9vw, 3.15rem);
  line-height: 0.98;
  letter-spacing: -0.048em;
  font-weight: 600;
}

.featured-product__title span {
  color: transparent;
  background: linear-gradient(90deg, #176dff 0%, #5d5cf0 52%, #8446e5 100%);
  -webkit-background-clip: text;
  background-clip: text;
}

.featured-product__description {
  max-width: 430px;
  margin: 0;
  color: #64718a;
  font-size: 0.79rem;
  line-height: 1.55;
}

.featured-product__audience {
  max-width: 430px;
  margin: 8px 0 0;
  color: #172340;
  font-size: 0.69rem;
  line-height: 1.48;
  font-weight: 600;
}

.featured-product__highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 13px;
}

.featured-product__highlight {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 30px;
  padding: 0 9px;
  border: 1px solid rgba(42, 92, 186, 0.09);
  border-radius: 10px;
  background: #ffffff;
  color: #485670;
  font-size: 0.61rem;
  font-weight: 500;
  box-shadow: 0 6px 14px rgba(35, 70, 143, 0.03);
}

.featured-product__highlight svg {
  color: #176dff;
}

.featured-product__button {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  min-width: 195px;
  min-height: 43px;
  margin-top: 14px;
  padding: 0 9px 0 14px;
  border-radius: 12px;
  background: linear-gradient(135deg, #1978ff, #275af4 58%, #7045e8);
  color: #ffffff;
  font-size: 0.68rem;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 12px 24px rgba(39, 89, 225, 0.18);
}

.featured-product__button-icon {
  display: grid;
  place-items: center;
  width: 29px;
  height: 29px;
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.16);
}

/* LOGO */
.featured-product__visual {
  display: grid;
  place-items: center;
  min-height: 240px;
}

.featured-product__visual-shell {
  position: relative;
  display: grid;
  place-items: center;
  width: min(230px, 100%);
  aspect-ratio: 1;
  border: 1px solid rgba(58, 96, 175, 0.08);
  border-radius: 21px;
  background: #ffffff;
  box-shadow:
    0 14px 30px rgba(36, 70, 143, 0.055),
    inset 0 1px 0 rgba(255, 255, 255, 0.98);
}

.featured-product__visual-shell::before {
  content: "";
  position: absolute;
  inset: 14px;
  border: 1px solid rgba(89, 82, 210, 0.07);
  border-radius: 16px;
  pointer-events: none;
}

.featured-product__logo {
  position: relative;
  z-index: 2;
  display: block;
  width: min(176px, 76%);
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 11px 18px rgba(42, 38, 119, 0.08));
}

/* FUNCIONES */
.featured-product__features {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.featured-product__feature {
  display: grid;
  grid-template-columns: 36px minmax(0, 1fr);
  gap: 9px;
  align-items: center;
  min-height: 58px;
  padding: 8px 10px;
  border: 1px solid rgba(46, 84, 164, 0.075);
  border-radius: 13px;
  background: #ffffff;
  box-shadow:
    0 7px 18px rgba(32, 66, 135, 0.03),
    inset 0 1px 0 rgba(255,255,255,0.95);
}

.featured-product__feature-icon {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border: 1px solid rgba(23, 109, 255, 0.08);
  border-radius: 11px;
  background: linear-gradient(145deg, #f8fbff, #edf4ff);
  color: #176dff;
}

.featured-product__feature:nth-child(even) .featured-product__feature-icon {
  background: linear-gradient(145deg, #fcfaff, #f2edff);
  color: #7248de;
}

.featured-product__feature p {
  min-width: 0;
  margin: 0;
  color: #16233e;
  font-size: 0.66rem;
  line-height: 1.25;
  font-weight: 600;
  overflow-wrap: anywhere;
}

/* TABLET */
@media (max-width: 1020px) {
  .featured-product__layout {
    grid-template-columns: minmax(260px, 0.9fr) minmax(210px, 0.7fr);
    gap: 20px;
  }

  .featured-product__features {
    grid-column: 1 / -1;
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

/* MÓVIL */
@media (max-width: 720px) {
  .featured-product {
    padding-block: 20px;
  }

  .featured-product__container {
    width: min(100% - 12px, 680px);
  }

  .featured-product__card {
    border-radius: 19px;
  }

  .featured-product__layout {
    grid-template-columns: minmax(0, 1fr) 96px;
    grid-template-areas:
      "content visual"
      "features features";
    gap: 14px 9px;
    min-height: 0;
    padding: 18px 13px 14px;
  }

  .featured-product__content {
    grid-area: content;
  }

  .featured-product__visual {
    grid-area: visual;
    min-height: 0;
    align-self: start;
    padding-top: 32px;
  }

  .featured-product__visual-shell {
    width: 92px;
    border-radius: 15px;
  }

  .featured-product__visual-shell::before {
    inset: 7px;
    border-radius: 11px;
  }

  .featured-product__logo {
    width: 72px;
    max-height: 72px;
  }

  .featured-product__eyebrow {
    min-height: 25px;
    padding-inline: 8px;
    font-size: 0.55rem;
  }

  .featured-product__eyebrow-icon {
    width: 16px;
    height: 16px;
  }

  .featured-product__title {
    margin: 10px 0 7px;
    font-size: clamp(1.72rem, 8.6vw, 2.15rem);
    line-height: 0.98;
  }

  .featured-product__description {
    max-width: 100%;
    font-size: 0.68rem;
    line-height: 1.48;
  }

  .featured-product__audience {
    display: none;
  }

  .featured-product__highlights {
    display: grid;
    grid-template-columns: 1fr;
    gap: 5px;
    width: fit-content;
    margin-top: 10px;
  }

  .featured-product__highlight {
    width: fit-content;
    min-height: 27px;
    padding-inline: 8px;
    font-size: 0.56rem;
  }

  .featured-product__button {
    width: min(100%, 205px);
    min-width: 0;
    min-height: 40px;
    margin-top: 11px;
    font-size: 0.63rem;
  }

  .featured-product__button-icon {
    width: 27px;
    height: 27px;
  }

  .featured-product__features {
    grid-area: features;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 7px;
  }

  .featured-product__feature {
    grid-template-columns: 32px minmax(0, 1fr);
    gap: 7px;
    min-height: 54px;
    padding: 7px 8px;
    border-radius: 11px;
  }

  .featured-product__feature-icon {
    width: 32px;
    height: 32px;
    border-radius: 10px;
  }

  .featured-product__feature p {
    font-size: 0.58rem;
    line-height: 1.18;
  }
}

@media (max-width: 390px) {
  .featured-product__layout {
    grid-template-columns: minmax(0, 1fr) 82px;
    gap: 12px 7px;
    padding: 16px 11px 12px;
  }

  .featured-product__visual {
    padding-top: 36px;
  }

  .featured-product__visual-shell {
    width: 80px;
  }

  .featured-product__logo {
    width: 62px;
  }

  .featured-product__title {
    font-size: 1.58rem;
  }

  .featured-product__description {
    font-size: 0.64rem;
  }

  .featured-product__features {
    gap: 6px;
  }

  .featured-product__feature {
    min-height: 50px;
    padding: 6px 7px;
  }

  .featured-product__feature p {
    font-size: 0.54rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .featured-product__visual-shell,
  .featured-product__logo {
    transform: none !important;
  }
}
`

export default function FeaturedProduct() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <style>{STYLES}</style>

      <section className="featured-product">
        <div className="featured-product__container">
          <motion.div
            className="featured-product__card"
            initial={
              shouldReduceMotion
                ? false
                : { opacity: 0, y: 22, scale: 0.99 }
            }
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.24 }}
            transition={{ duration: 0.56, ease: EASE }}
          >
            <div className="featured-product__layout">
              <motion.div
                className="featured-product__content"
                initial={
                  shouldReduceMotion
                    ? false
                    : { opacity: 0, x: -16 }
                }
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.48, delay: 0.06, ease: EASE }}
              >
                <div className="featured-product__eyebrow">
                  <span className="featured-product__eyebrow-icon">
                    <Sparkles size={12} strokeWidth={2} />
                  </span>
                  Producto destacado
                </div>

                <h2 className="featured-product__title">
                  Menú <span>QR SaaS</span>
                </h2>

                <p className="featured-product__description">
                  Plataforma todo en uno para digitalizar y
                  gestionar tu negocio gastronómico de forma
                  simple, profesional y centralizada.
                </p>

                <p className="featured-product__audience">
                  Ideal para restaurantes, cafeterías, bares y gastrobares.
                </p>

                <div className="featured-product__highlights">
                  <span className="featured-product__highlight">
                    <Zap size={14} strokeWidth={1.9} />
                    Configuración rápida
                  </span>

                  <span className="featured-product__highlight">
                    <Layers3 size={14} strokeWidth={1.9} />
                    Plataforma escalable
                  </span>
                </div>

                <motion.a
                  href="#contacto"
                  className="featured-product__button"
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: -3,
                          boxShadow:
                            "0 18px 34px rgba(39, 89, 225, 0.26)",
                        }
                  }
                  whileTap={{ scale: 0.98 }}
                >
                  Solicitar credencial

                  <span className="featured-product__button-icon">
                    <ArrowRight size={17} strokeWidth={1.9} />
                  </span>
                </motion.a>
              </motion.div>

              <motion.div
                className="featured-product__visual"
                initial={
                  shouldReduceMotion
                    ? false
                    : { opacity: 0, y: 16, scale: 0.97 }
                }
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.22 }}
                transition={{ duration: 0.54, delay: 0.1, ease: EASE }}
              >
                <motion.div
                  className="featured-product__visual-shell"
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : { y: [0, -5, 0] }
                  }
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <motion.img
                    src={PRODUCT_LOGO}
                    alt="Logo de Menú QR SaaS"
                    className="featured-product__logo"
                    animate={
                      shouldReduceMotion
                        ? undefined
                        : { scale: [1, 1.015, 1] }
                    }
                    transition={{
                      duration: 4.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              </motion.div>

              <div className="featured-product__features">
                {features.map(({ title, icon: FeatureIcon }, index) => (
                  <motion.article
                    key={title}
                    className="featured-product__feature"
                    initial={
                      shouldReduceMotion
                        ? false
                        : { opacity: 0, y: 10 }
                    }
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.38,
                      delay: 0.12 + index * 0.04,
                      ease: EASE,
                    }}
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : { y: -3, scale: 1.01 }
                    }
                  >
                    <span className="featured-product__feature-icon">
                      <FeatureIcon size={18} strokeWidth={1.8} />
                    </span>

                    <p>{title}</p>
                  </motion.article>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
import {
  motion,
  useReducedMotion,
} from "motion/react";
import {
  BarChart3,
  Check,
  FileText,
  MonitorSmartphone,
  QrCode,
  ReceiptText,
  ShoppingBag,
  Users,
} from "lucide-react";

const features = [
  {
    title: "Menú digital QR",
    icon: QrCode,
  },
  {
    title: "Pedidos en tiempo real",
    icon: ShoppingBag,
  },
  {
    title: "Gestión de clientes",
    icon: Users,
  },
  {
    title: "Facturación electrónica",
    icon: ReceiptText,
  },
  {
    title: "Contabilidad inteligente",
    icon: FileText,
  },
  {
    title: "Reportes y estadísticas",
    icon: BarChart3,
  },
  {
    title: "Control de ventas",
    icon: Check,
  },
  {
    title: "Acceso multidispositivo",
    icon: MonitorSmartphone,
  },
];

export default function FeaturedProduct() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="featured-product">
      <div className="featured-product__container">
        <motion.div
          className="featured-product__card"
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 28,
                  scale: 0.985,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <span className="featured-product__glow featured-product__glow--one" />
          <span className="featured-product__glow featured-product__glow--two" />
          <span className="featured-product__grid" />

          <div className="featured-product__layout">
            <motion.div
              className="featured-product__content"
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 0,
                      x: -20,
                    }
              }
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                duration: 0.5,
                delay: 0.08,
              }}
            >
              <div className="featured-product__eyebrow">
                <span />
                Producto destacado
              </div>

              <h2 className="featured-product__title">
                Menú
                <span> QR SaaS</span>
              </h2>

              <p className="featured-product__description">
                Una plataforma integral para restaurantes,
                cafeterías, bares y gastrobares. Centraliza
                pedidos, ventas, clientes, facturación y
                reportes desde un solo sistema.
              </p>

              <div className="featured-product__highlights">
                <span>
                  <Check size={15} />
                  Configuración rápida
                </span>

                <span>
                  <Check size={15} />
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
                        y: -4,
                      }
                }
                whileTap={{
                  scale: 0.98,
                }}
              >
                Solicitar credencial

                <span>
                  <QrCode size={18} />
                </span>
              </motion.a>
            </motion.div>

            <div className="featured-product__features">
              {features.map(
                ({ title, icon: FeatureIcon }, index) => (
                  <motion.article
                    key={title}
                    className="featured-product__feature"
                    initial={
                      shouldReduceMotion
                        ? false
                        : {
                            opacity: 0,
                            y: 15,
                          }
                    }
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.2,
                    }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.05,
                    }}
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : {
                            y: -4,
                            scale: 1.015,
                          }
                    }
                  >
                    <span className="featured-product__feature-icon">
                      <FeatureIcon
                        size={18}
                        strokeWidth={1.8}
                      />
                    </span>

                    <p>{title}</p>
                  </motion.article>
                ),
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
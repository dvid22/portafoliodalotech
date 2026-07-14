import { useState } from "react";
import {
  motion,
  useReducedMotion,
} from "motion/react";
import {
  ArrowUpRight,
  Mail,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";

const contactMethods = [
  {
    icon: Mail,
    label: "Correo electrónico",
    value: "dalotech6@gmail.com",
    href: "mailto:dalotech6@gmail.com",
    className: "contact-premium__method-icon--email",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "322 717 3244",
    href: "https://wa.me/573227173244?text=Hola%20DaloTech,%20quiero%20información%20sobre%20sus%20servicios.",
    className: "contact-premium__method-icon--whatsapp",
  },
  {
    icon: Phone,
    label: "Línea alternativa",
    value: "300 223 9602",
    href: "tel:+573002239602",
    className: "contact-premium__method-icon--phone",
  },
];

export default function Contact() {
  const shouldReduceMotion = useReducedMotion();
  const [status, setStatus] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    const message = [
      "Hola DaloTech, quiero solicitar información.",
      "",
      `Nombre: ${data.get("name")}`,
      `Empresa: ${data.get("company") || "No indicada"}`,
      `Correo: ${data.get("email")}`,
      `Proyecto: ${data.get("message")}`,
    ].join("\n");

    const whatsappUrl =
      `https://wa.me/573227173244?text=${encodeURIComponent(
        message,
      )}`;

    window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer",
    );

    setStatus(
      "Abrimos WhatsApp con la información de tu proyecto.",
    );
  };

  return (
    <section
      id="contacto"
      className="contact-premium"
    >
      <span className="contact-premium__glow contact-premium__glow--left" />
      <span className="contact-premium__glow contact-premium__glow--right" />

      <div className="contact-premium__container">
        <div className="contact-premium__layout">
          <motion.div
            className="contact-premium__content"
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    x: -24,
                  }
            }
            whileInView={{
              opacity: 1,
              x: 0,
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
            <p className="eyebrow">Hablemos</p>

            <h2 className="contact-premium__title">
              Tu próximo proyecto
              <span> puede empezar hoy.</span>
            </h2>

            <p className="contact-premium__description">
              Cuéntanos qué necesitas y te ayudaremos a
              convertirlo en una solución digital clara,
              moderna y preparada para crecer.
            </p>

            <div className="contact-premium__methods">
              {contactMethods.map(
                (
                  {
                    icon: ContactIcon,
                    label,
                    value,
                    href,
                    className,
                  },
                  index,
                ) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={
                      href.startsWith("http")
                        ? "_blank"
                        : undefined
                    }
                    rel={
                      href.startsWith("http")
                        ? "noreferrer"
                        : undefined
                    }
                    className="contact-premium__method"
                    initial={
                      shouldReduceMotion
                        ? false
                        : {
                            opacity: 0,
                            y: 14,
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
                      delay: index * 0.07,
                    }}
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : {
                            y: -4,
                          }
                    }
                  >
                    <span
                      className={`contact-premium__method-icon ${className}`}
                    >
                      <ContactIcon
                        size={21}
                        strokeWidth={1.8}
                      />
                    </span>

                    <span className="contact-premium__method-content">
                      <small>{label}</small>
                      <strong>{value}</strong>
                    </span>

                    <span className="contact-premium__method-arrow">
                      <ArrowUpRight size={17} />
                    </span>
                  </motion.a>
                ),
              )}
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="contact-premium__form"
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    x: 24,
                    scale: 0.985,
                  }
            }
            whileInView={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="contact-premium__form-header">
              <div>
                <p>Cuéntanos sobre tu idea</p>

                <span>
                  Responderemos lo antes posible.
                </span>
              </div>

              <span className="contact-premium__form-header-icon">
                <Send size={21} />
              </span>
            </div>

            <div className="contact-premium__fields contact-premium__fields--two">
              <label className="contact-premium__field">
                <span>Nombre</span>

                <input
                  name="name"
                  required
                  placeholder="Tu nombre"
                />
              </label>

              <label className="contact-premium__field">
                <span>Empresa</span>

                <input
                  name="company"
                  placeholder="Nombre de la empresa"
                />
              </label>
            </div>

            <label className="contact-premium__field">
              <span>Correo</span>

              <input
                type="email"
                name="email"
                required
                placeholder="correo@empresa.com"
              />
            </label>

            <label className="contact-premium__field">
              <span>Cuéntanos sobre tu proyecto</span>

              <textarea
                name="message"
                required
                rows="4"
                placeholder="Describe brevemente lo que necesitas..."
              />
            </label>

            <motion.button
              type="submit"
              className="contact-premium__submit"
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: -3,
                    }
              }
              whileTap={{
                scale: 0.985,
              }}
            >
              <span>Enviar por WhatsApp</span>

              <MessageCircle
                size={19}
                strokeWidth={1.8}
              />
            </motion.button>

            {status && (
              <p className="contact-premium__status">
                {status}
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
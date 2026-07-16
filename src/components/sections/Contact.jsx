import { useState } from "react";
import {
  motion,
  useReducedMotion,
} from "motion/react";
import {
  ArrowUpRight,
  Mail,
  Phone,
  Send,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

function WhatsAppIcon({
  size = 20,
  className = "",
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="currentColor"
    >
      <path d="M16.04 3C8.84 3 3 8.74 3 15.82c0 2.55.76 5.04 2.18 7.14L3.75 29l6.2-1.38a13.15 13.15 0 0 0 6.09 1.5C23.24 29.12 29 23.38 29 16.3 29 9.22 23.24 3 16.04 3Zm0 23.81c-1.88 0-3.72-.51-5.33-1.47l-.38-.22-3.68.82.87-3.56-.24-.37a10.44 10.44 0 0 1-1.67-5.69c0-5.74 4.67-10.4 10.43-10.4 5.75 0 10.43 4.66 10.43 10.4 0 5.74-4.68 10.49-10.43 10.49Z" />
      <path d="M21.77 18.56c-.31-.16-1.84-.91-2.13-1.01-.29-.11-.5-.16-.71.16-.21.31-.82 1.01-1 1.22-.18.21-.37.23-.68.08-.31-.16-1.32-.49-2.51-1.56-.93-.82-1.55-1.84-1.73-2.15-.18-.31-.02-.48.14-.63.14-.14.31-.37.47-.55.16-.18.21-.31.31-.52.11-.21.05-.39-.03-.55-.08-.16-.71-1.7-.97-2.33-.26-.62-.52-.54-.71-.55h-.61c-.21 0-.55.08-.84.39-.29.31-1.1 1.07-1.1 2.62 0 1.54 1.13 3.03 1.29 3.24.16.21 2.22 3.39 5.38 4.75.75.32 1.34.52 1.8.66.76.24 1.44.21 1.99.13.61-.09 1.84-.75 2.1-1.48.26-.73.26-1.35.18-1.48-.08-.13-.29-.21-.6-.37Z" />
    </svg>
  );
}

const contactMethods = [
  {
    type: "email",
    icon: Mail,
    label: "Correo electrónico",
    value: "dalotech6@gmail.com",
    href: "mailto:dalotech6@gmail.com",
    className: "contact-premium__method-icon--email",
  },
  {
    type: "whatsapp",
    label: "WhatsApp",
    value: "322 717 3244",
    href: "https://wa.me/573227173244?text=Hola%20DaloTech,%20quiero%20información%20sobre%20sus%20servicios.",
    className: "contact-premium__method-icon--whatsapp",
  },
  {
    type: "phone",
    icon: Phone,
    label: "Línea alternativa",
    value: "300 223 9602",
    href: "tel:+573002239602",
    className: "contact-premium__method-icon--phone",
  },
];

const STYLES = String.raw`
.contact-premium {
  position: relative;
  overflow: hidden;
  padding: clamp(46px, 5vw, 72px) 0;
  background: #ffffff;
  color: #0a1532;
  isolation: isolate;
}

.contact-premium__glow {
  position: absolute;
  z-index: -1;
  border-radius: 50%;
  filter: blur(20px);
  pointer-events: none;
}

.contact-premium__glow--left {
  top: 8%;
  left: -8%;
  width: 300px;
  height: 300px;
  background: rgba(23, 109, 255, 0.065);
}

.contact-premium__glow--right {
  right: -7%;
  bottom: 5%;
  width: 300px;
  height: 300px;
  background: rgba(124, 58, 237, 0.055);
}

.contact-premium__container {
  width: min(1260px, calc(100% - 28px));
  margin-inline: auto;
}

.contact-premium__layout {
  display: grid;
  grid-template-columns: minmax(320px, 0.85fr) minmax(440px, 1.15fr);
  gap: clamp(28px, 4vw, 54px);
  align-items: center;
}

.contact-premium__content {
  min-width: 0;
}

.contact-premium .eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  margin: 0;
  color: #176dff;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.contact-premium .eyebrow::before {
  content: "";
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #176dff;
  box-shadow: 0 0 0 6px rgba(23, 109, 255, 0.07);
}

.contact-premium__title {
  max-width: 620px;
  margin: 14px 0 12px;
  color: #07122f;
  font-size: clamp(2rem, 2.8vw, 3rem);
  line-height: 1.02;
  letter-spacing: -0.045em;
  font-weight: 600;
}

.contact-premium__title span {
  color: transparent;
  background: linear-gradient(90deg, #176dff, #6c55ec);
  -webkit-background-clip: text;
  background-clip: text;
}

.contact-premium__description {
  max-width: 540px;
  margin: 0;
  color: #63708a;
  font-size: 0.86rem;
  line-height: 1.65;
}

.contact-premium__methods {
  display: grid;
  gap: 9px;
  margin-top: 22px;
}

.contact-premium__method {
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr) 28px;
  gap: 11px;
  align-items: center;
  min-height: 64px;
  padding: 10px 12px;
  border: 1px solid rgba(44, 79, 148, 0.085);
  border-radius: 15px;
  background: rgba(255,255,255,0.96);
  color: inherit;
  text-decoration: none;
  box-shadow:
    0 9px 22px rgba(33, 67, 135, 0.035),
    inset 0 1px 0 rgba(255,255,255,0.98);
}

.contact-premium__method-icon {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 13px;
}

.contact-premium__method-icon--email {
  background: #eef5ff;
  color: #176dff;
}

.contact-premium__method-icon--whatsapp {
  background: #e9fbf0;
  color: #16a34a;
}

.contact-premium__method-icon--phone {
  background: #f3efff;
  color: #7c3aed;
}

.contact-premium__method-content {
  display: grid;
  gap: 2px;
  min-width: 0;
}

.contact-premium__method-content small {
  color: #7a859a;
  font-size: 0.61rem;
}

.contact-premium__method-content strong {
  overflow: hidden;
  color: #14203e;
  font-size: 0.75rem;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.contact-premium__method-arrow {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 9px;
  background: #f6f8fc;
  color: #5a6881;
}

/* FORMULARIO */
.contact-premium__form {
  padding: 24px;
  border: 1px solid rgba(44, 79, 148, 0.09);
  border-radius: 22px;
  background:
    linear-gradient(145deg, #ffffff, #f9fbff 68%, #fbf9ff);
  box-shadow:
    0 18px 42px rgba(33, 67, 135, 0.06),
    inset 0 1px 0 rgba(255,255,255,0.98);
}

.contact-premium__form-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 18px;
}

.contact-premium__form-header p {
  margin: 0 0 4px;
  color: #14203e;
  font-size: 0.92rem;
  font-weight: 600;
}

.contact-premium__form-header span {
  color: #7b879d;
  font-size: 0.66rem;
}

.contact-premium__form-header-icon {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  flex: 0 0 42px;
  border-radius: 13px;
  background: linear-gradient(145deg, #edf4ff, #f2edff);
  color: #176dff;
}

.contact-premium__fields {
  display: grid;
  gap: 11px;
}

.contact-premium__fields--two {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.contact-premium__field {
  display: grid;
  gap: 6px;
  margin-top: 11px;
}

.contact-premium__field span {
  color: #2b3854;
  font-size: 0.66rem;
  font-weight: 600;
}

.contact-premium__field input,
.contact-premium__field textarea {
  width: 100%;
  border: 1px solid rgba(49, 87, 164, 0.11);
  border-radius: 12px;
  outline: none;
  background: #ffffff;
  color: #14203e;
  font: inherit;
  font-size: 0.74rem;
  transition:
    border-color 180ms ease,
    box-shadow 180ms ease,
    transform 180ms ease;
}

.contact-premium__field input {
  min-height: 43px;
  padding: 0 12px;
}

.contact-premium__field textarea {
  min-height: 94px;
  padding: 11px 12px;
  resize: vertical;
}

.contact-premium__field input::placeholder,
.contact-premium__field textarea::placeholder {
  color: #a1a9b8;
}

.contact-premium__field input:focus,
.contact-premium__field textarea:focus {
  border-color: rgba(23, 109, 255, 0.45);
  box-shadow: 0 0 0 4px rgba(23, 109, 255, 0.07);
}

.contact-premium__submit {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  width: 100%;
  min-height: 46px;
  margin-top: 15px;
  border: 0;
  border-radius: 12px;
  background: linear-gradient(135deg, #16a34a, #22c55e);
  color: #ffffff;
  font: inherit;
  font-size: 0.72rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 13px 26px rgba(22, 163, 74, 0.20);
}

.contact-premium__status {
  margin: 10px 0 0;
  color: #168a45;
  font-size: 0.65rem;
  line-height: 1.45;
  text-align: center;
}

/* TABLET */
@media (max-width: 960px) {
  .contact-premium__layout {
    grid-template-columns: 1fr;
    max-width: 760px;
    margin-inline: auto;
  }

  .contact-premium__content {
    text-align: center;
  }

  .contact-premium__title,
  .contact-premium__description {
    margin-inline: auto;
  }

  .contact-premium__methods {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .contact-premium__method {
    grid-template-columns: 40px minmax(0, 1fr);
    min-height: 72px;
  }

  .contact-premium__method-arrow {
    display: none;
  }
}

/* MÓVIL */
@media (max-width: 620px) {
  .contact-premium {
    padding-block: 38px;
  }

  .contact-premium__container {
    width: min(100% - 14px, 560px);
  }

  .contact-premium__layout {
    gap: 22px;
  }

  .contact-premium__title {
    font-size: clamp(1.75rem, 8.8vw, 2.25rem);
    line-height: 1.03;
  }

  .contact-premium__description {
    font-size: 0.76rem;
    line-height: 1.58;
  }

  .contact-premium__methods {
    grid-template-columns: 1fr;
    gap: 7px;
    margin-top: 18px;
  }

  .contact-premium__method {
    grid-template-columns: 38px minmax(0, 1fr) 26px;
    min-height: 58px;
    padding: 8px 10px;
    border-radius: 13px;
  }

  .contact-premium__method-icon {
    width: 38px;
    height: 38px;
    border-radius: 11px;
  }

  .contact-premium__method-arrow {
    display: grid;
    width: 26px;
    height: 26px;
  }

  .contact-premium__form {
    padding: 18px 14px;
    border-radius: 18px;
  }

  .contact-premium__fields--two {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .contact-premium__field input {
    min-height: 42px;
  }

  .contact-premium__field textarea {
    min-height: 88px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .contact-premium__field input,
  .contact-premium__field textarea {
    transition: none;
  }
}
`;

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
      `https://wa.me/573227173244?text=${encodeURIComponent(message)}`;

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
    <>
      <style>{STYLES}</style>

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
                      x: -20,
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
                duration: 0.56,
                ease: EASE,
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
                      type,
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
                              y: 12,
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
                        duration: 0.38,
                        delay: index * 0.06,
                      }}
                      whileHover={
                        shouldReduceMotion
                          ? undefined
                          : {
                              y: -3,
                            }
                      }
                    >
                      <span
                        className={`contact-premium__method-icon ${className}`}
                      >
                        {type === "whatsapp" ? (
                          <WhatsAppIcon size={21} />
                        ) : (
                          <ContactIcon
                            size={20}
                            strokeWidth={1.8}
                          />
                        )}
                      </span>

                      <span className="contact-premium__method-content">
                        <small>{label}</small>
                        <strong>{value}</strong>
                      </span>

                      <span className="contact-premium__method-arrow">
                        <ArrowUpRight size={15} />
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
                      x: 20,
                      scale: 0.99,
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
                duration: 0.56,
                ease: EASE,
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
                  <Send size={20} />
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
                <WhatsAppIcon size={19} />
              </motion.button>

              {status && (
                <p
                  className="contact-premium__status"
                  role="status"
                  aria-live="polite"
                >
                  {status}
                </p>
              )}
            </motion.form>
          </div>
        </div>
      </section>
    </>
  );
}
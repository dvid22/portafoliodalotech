import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const FOOTER_LOGO = "/images/favicon.png";

const footerLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Proceso", href: "#proceso" },
  { label: "Contacto", href: "#contacto" },
];

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

const STYLES = String.raw`
.footer-pro {
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at 12% 0%, rgba(33, 118, 255, 0.16), transparent 28%),
    radial-gradient(circle at 88% 100%, rgba(124, 58, 237, 0.13), transparent 30%),
    #071225;
  color: #ffffff;
  isolation: isolate;
}

.footer-pro::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  opacity: 0.28;
  background-image:
    linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
  background-size: 52px 52px;
  mask-image: linear-gradient(to bottom, #000, transparent 92%);
}

.footer-pro__container {
  width: min(1280px, calc(100% - 30px));
  margin-inline: auto;
}

.footer-pro__main {
  display: grid;
  grid-template-columns:
    minmax(300px, 1.15fr)
    minmax(160px, 0.55fr)
    minmax(230px, 0.75fr)
    minmax(220px, 0.72fr);
  gap: clamp(28px, 4vw, 58px);
  padding: 52px 0 34px;
}

.footer-pro__brand {
  min-width: 0;
}

.footer-pro__logo-link {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
}

.footer-pro__logo {
  display: block;
  width: 152px;
  height: auto;
  max-height: 62px;
  object-fit: contain;
  object-position: left center;
  border-radius: 14px;
  filter: drop-shadow(0 10px 24px rgba(0,0,0,0.18));
}

.footer-pro__description {
  max-width: 430px;
  margin: 18px 0 0;
  color: #aeb9cd;
  font-size: 0.78rem;
  line-height: 1.7;
}

.footer-pro__tagline {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 18px;
  padding: 8px 11px;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 999px;
  background: rgba(255,255,255,0.04);
  color: #dce6f8;
  font-size: 0.64rem;
  font-weight: 600;
}

.footer-pro__tagline::before {
  content: "";
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #2f80ff;
  box-shadow: 0 0 0 5px rgba(47,128,255,0.12);
}

.footer-pro__column-title {
  margin: 0 0 16px;
  color: #ffffff;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.footer-pro__nav {
  display: grid;
  gap: 10px;
}

.footer-pro__nav a {
  display: inline-flex;
  width: fit-content;
  color: #aeb9cd;
  font-size: 0.72rem;
  text-decoration: none;
  transition:
    color 180ms ease,
    transform 180ms ease;
}

.footer-pro__nav a:hover {
  color: #ffffff;
  transform: translateX(3px);
}

.footer-pro__contact-list {
  display: grid;
  gap: 10px;
}

.footer-pro__contact-item {
  display: grid;
  grid-template-columns: 34px minmax(0, 1fr);
  gap: 10px;
  align-items: center;
  min-height: 48px;
  color: inherit;
  text-decoration: none;
}

.footer-pro__contact-icon {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 11px;
  background: rgba(255,255,255,0.045);
  color: #6fa6ff;
}

.footer-pro__contact-copy {
  display: grid;
  gap: 2px;
  min-width: 0;
}

.footer-pro__contact-copy small {
  color: #7f8ba1;
  font-size: 0.58rem;
}

.footer-pro__contact-copy strong {
  overflow: hidden;
  color: #dce6f8;
  font-size: 0.68rem;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.footer-pro__cta {
  align-self: start;
  padding: 18px;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 18px;
  background:
    linear-gradient(145deg, rgba(255,255,255,0.065), rgba(255,255,255,0.025));
  box-shadow:
    0 16px 34px rgba(0,0,0,0.14),
    inset 0 1px 0 rgba(255,255,255,0.06);
  backdrop-filter: blur(12px);
}

.footer-pro__cta p {
  margin: 0;
  color: #ffffff;
  font-size: 0.82rem;
  line-height: 1.35;
  font-weight: 600;
}

.footer-pro__cta-description {
  display: block;
  margin-top: 7px;
  color: #9ca9be;
  font-size: 0.64rem;
  line-height: 1.5;
}

.footer-pro__whatsapp {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 46px;
  margin-top: 15px;
  padding: 0 9px 0 14px;
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 12px;
  background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%);
  color: #ffffff;
  font-size: 0.67rem;
  font-weight: 700;
  line-height: 1;
  text-decoration: none;
  box-shadow:
    0 13px 26px rgba(34,197,94,0.20),
    inset 0 1px 0 rgba(255,255,255,0.16);
  transition:
    transform 180ms ease,
    box-shadow 180ms ease,
    filter 180ms ease;
}

.footer-pro__whatsapp:hover {
  transform: translateY(-2px);
  filter: brightness(1.035);
  box-shadow:
    0 17px 30px rgba(34,197,94,0.26),
    inset 0 1px 0 rgba(255,255,255,0.18);
}

.footer-pro__whatsapp-label {
  display: inline-flex;
  align-items: center;
  margin: 0;
  color: #ffffff;
  font-size: 0.67rem;
  font-weight: 700;
  line-height: 1;
}

.footer-pro__whatsapp-icon {
  display: grid;
  place-items: center;
  width: 31px;
  height: 31px;
  flex: 0 0 31px;
  margin: 0;
  border-radius: 9px;
  background: rgba(255,255,255,0.18);
  color: #ffffff;
}

.footer-pro__bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 20px 0 24px;
  border-top: 1px solid rgba(255,255,255,0.07);
}

.footer-pro__bottom p {
  margin: 0;
  color: #7f8ba1;
  font-size: 0.63rem;
}

.footer-pro__bottom-right {
  display: flex;
  align-items: center;
  gap: 14px;
}

.footer-pro__bottom-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #aeb9cd;
  font-size: 0.62rem;
  text-decoration: none;
}

.footer-pro__bottom-link:hover {
  color: #ffffff;
}

@media (max-width: 980px) {
  .footer-pro__main {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .footer-pro__brand {
    grid-column: 1 / -1;
  }
}

@media (max-width: 620px) {
  .footer-pro__container {
    width: min(100% - 20px, 560px);
  }

  .footer-pro__main {
    grid-template-columns: 1fr;
    gap: 26px;
    padding: 38px 0 28px;
  }

  .footer-pro__brand {
    grid-column: auto;
  }

  .footer-pro__logo {
    width: 136px;
  }

  .footer-pro__description {
    font-size: 0.72rem;
  }

  .footer-pro__nav {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .footer-pro__cta {
    padding: 16px;
  }

  .footer-pro__bottom {
    flex-direction: column;
    align-items: flex-start;
    padding-bottom: 20px;
  }

  .footer-pro__bottom-right {
    width: 100%;
    justify-content: space-between;
  }
}

@media (prefers-reduced-motion: reduce) {
  .footer-pro__nav a,
  .footer-pro__whatsapp {
    transition: none;
  }
}
`;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <style>{STYLES}</style>

      <footer className="footer-pro">
        <div className="footer-pro__container">
          <div className="footer-pro__main">
            <div className="footer-pro__brand">
              <a
                href="#inicio"
                className="footer-pro__logo-link"
                aria-label="Ir al inicio"
              >
                <img
                  src={FOOTER_LOGO}
                  alt="DaloTech"
                  className="footer-pro__logo"
                  loading="lazy"
                  decoding="async"
                />
              </a>

              <p className="footer-pro__description">
                Creamos soluciones digitales modernas, escalables y
                orientadas a resultados. Transformamos ideas en
                productos tecnológicos claros, funcionales y preparados
                para crecer.
              </p>

              <span className="footer-pro__tagline">
                Tecnología que impulsa negocios
              </span>
            </div>

            <div>
              <h3 className="footer-pro__column-title">
                Navegación
              </h3>

              <nav
                className="footer-pro__nav"
                aria-label="Navegación del pie de página"
              >
                {footerLinks.map(({ label, href }) => (
                  <a key={label} href={href}>
                    {label}
                  </a>
                ))}
              </nav>
            </div>

            <div>
              <h3 className="footer-pro__column-title">
                Contacto
              </h3>

              <div className="footer-pro__contact-list">
                <a
                  href="mailto:dalotech6@gmail.com"
                  className="footer-pro__contact-item"
                >
                  <span className="footer-pro__contact-icon">
                    <Mail size={17} strokeWidth={1.8} />
                  </span>

                  <span className="footer-pro__contact-copy">
                    <small>Correo</small>
                    <strong>dalotech6@gmail.com</strong>
                  </span>
                </a>

                <a
                  href="tel:+573227173244"
                  className="footer-pro__contact-item"
                >
                  <span className="footer-pro__contact-icon">
                    <Phone size={17} strokeWidth={1.8} />
                  </span>

                  <span className="footer-pro__contact-copy">
                    <small>Teléfono</small>
                    <strong>+57 322 717 3244</strong>
                  </span>
                </a>

                <div className="footer-pro__contact-item">
                  <span className="footer-pro__contact-icon">
                    <MapPin size={17} strokeWidth={1.8} />
                  </span>

                  <span className="footer-pro__contact-copy">
                    <small>Ubicación</small>
                    <strong>Colombia</strong>
                  </span>
                </div>
              </div>
            </div>

            <div className="footer-pro__cta">
              <p>
                ¿Tienes un proyecto en mente?
              </p>

              <span className="footer-pro__cta-description">
                Conversemos sobre tu idea y construyamos una solución
                digital preparada para crecer.
              </span>

              <a
                href="https://wa.me/573227173244?text=Hola%20DaloTech,%20quiero%20hablar%20sobre%20un%20proyecto."
                target="_blank"
                rel="noreferrer"
                className="footer-pro__whatsapp"
              >
                <span className="footer-pro__whatsapp-label">
                  Hablar por WhatsApp
                </span>

                <span className="footer-pro__whatsapp-icon">
                  <WhatsAppIcon size={18} />
                </span>
              </a>
            </div>
          </div>

          <div className="footer-pro__bottom">
            <p>
              © {year} DaloTech. Todos los derechos reservados.
            </p>

            <div className="footer-pro__bottom-right">
              <span className="footer-pro__bottom-link">
                Desarrollamos el futuro.
              </span>

              <a
                href="#inicio"
                className="footer-pro__bottom-link"
              >
                Volver arriba
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
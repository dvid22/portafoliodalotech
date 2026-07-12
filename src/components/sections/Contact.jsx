import { useState } from "react";

function EmailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="3"
      />

      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      className="h-7 w-7"
    >
      <path d="M16.03 3C8.85 3 3 8.7 3 15.7c0 2.48.74 4.9 2.14 6.96L3.72 27.8l5.36-1.37a13.2 13.2 0 0 0 6.94 1.96h.01C23.21 28.39 29 22.7 29 15.7 29 8.7 23.2 3 16.03 3Zm0 22.99h-.01a10.8 10.8 0 0 1-5.52-1.51l-.4-.23-3.18.82.85-3.02-.26-.42a10.2 10.2 0 0 1-1.66-5.57c0-5.72 4.7-10.37 10.48-10.37s10.47 4.65 10.47 10.37-4.69 10.38-10.47 10.38Zm5.75-7.78c-.31-.15-1.86-.9-2.15-1-.29-.1-.5-.15-.71.15-.21.31-.81 1-.99 1.2-.18.2-.37.23-.68.08-.31-.15-1.32-.47-2.51-1.51-.93-.81-1.55-1.82-1.73-2.13-.18-.31-.02-.47.14-.62.14-.14.31-.36.47-.54.16-.18.21-.31.31-.51.11-.21.05-.39-.03-.54-.08-.15-.71-1.67-.97-2.29-.26-.61-.53-.52-.72-.53h-.62c-.21 0-.55.08-.84.39-.29.31-1.1 1.05-1.1 2.56s1.13 2.97 1.28 3.17c.16.21 2.22 3.32 5.38 4.65.75.32 1.34.51 1.8.65.76.24 1.44.2 1.99.12.61-.09 1.86-.74 2.12-1.46.26-.72.26-1.33.18-1.46-.07-.13-.28-.2-.59-.36Z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
    >
      <path d="M6.6 2.8 9.3 6a2 2 0 0 1 .1 2.3L8 10.2a15.4 15.4 0 0 0 5.8 5.8l1.9-1.4a2 2 0 0 1 2.3.1l3.2 2.7a2 2 0 0 1 .4 2.5l-.7 1.1a3 3 0 0 1-2.9 1.3C9.5 21.2 2.8 14.5 1.7 6a3 3 0 0 1 1.3-2.9l1.1-.7a2 2 0 0 1 2.5.4Z" />
    </svg>
  );
}

export default function Contact() {
  const [status, setStatus] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(
      event.currentTarget,
    );

    const message = [
      "Hola DaloTech, deseo solicitar información.",
      `Nombre: ${data.get("name")}`,
      `Empresa: ${
        data.get("company") || "No indicada"
      }`,
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
      className="section-shell bg-white"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="eyebrow">Hablemos</p>

          <h2 className="section-title mt-3">
            Tu próximo proyecto puede empezar hoy.
          </h2>

          <p className="mt-6 max-w-xl text-lg font-normal leading-8 text-slate-600">
            Cuéntanos qué necesitas y te ayudaremos a
            convertirlo en una solución digital clara,
            moderna y escalable.
          </p>

          <div className="mt-9 grid gap-4">
            <a
              href="mailto:dalotech6@gmail.com"
              className="contact-option group"
            >
              <span className="contact-icon contact-icon-email">
                <EmailIcon />
              </span>

              <span>
                <span className="contact-label">
                  Correo electrónico
                </span>

                <span className="contact-value">
                  dalotech6@gmail.com
                </span>
              </span>

              <span className="contact-arrow">
                →
              </span>
            </a>

            <a
              href="https://wa.me/573227173244?text=Hola%20DaloTech,%20quiero%20información%20sobre%20sus%20servicios."
              target="_blank"
              rel="noreferrer"
              className="contact-option group"
            >
              <span className="contact-icon contact-icon-whatsapp">
                <WhatsAppIcon />
              </span>

              <span>
                <span className="contact-label">
                  WhatsApp
                </span>

                <span className="contact-value">
                  322 717 3244
                </span>
              </span>

              <span className="contact-arrow">
                →
              </span>
            </a>

            <a
              href="tel:+573002239602"
              className="contact-option group"
            >
              <span className="contact-icon contact-icon-phone">
                <PhoneIcon />
              </span>

              <span>
                <span className="contact-label">
                  Línea alternativa
                </span>

                <span className="contact-value">
                  300 223 9602
                </span>
              </span>

              <span className="contact-arrow">
                →
              </span>
            </a>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="glass-card grid gap-5 p-6 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="form-label">
              Nombre

              <input
                name="name"
                required
                className="form-input"
                placeholder="Tu nombre"
              />
            </label>

            <label className="form-label">
              Empresa

              <input
                name="company"
                className="form-input"
                placeholder="Nombre de la empresa"
              />
            </label>
          </div>

          <label className="form-label">
            Correo

            <input
              type="email"
              name="email"
              required
              className="form-input"
              placeholder="correo@empresa.com"
            />
          </label>

          <label className="form-label">
            Cuéntanos sobre tu proyecto

            <textarea
              name="message"
              required
              rows="5"
              className="form-input resize-none"
              placeholder="Describe brevemente lo que necesitas..."
            />
          </label>

          <button
            type="submit"
            className="contact-submit-button"
          >
            <span>Enviar por WhatsApp</span>

            <span className="contact-submit-icon">
              <WhatsAppIcon />
            </span>
          </button>

          {status && (
            <p className="text-sm font-medium text-blue-600">
              {status}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
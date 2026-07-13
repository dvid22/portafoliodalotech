import {
  Bolt,
  Eye,
  Handshake,
  Lightbulb,
  ShieldCheck,
  Target,
  UsersRound,
} from "lucide-react";

const ABOUT_STYLES = String.raw`
.about-section {
  position: relative;
  overflow: hidden;
  padding: clamp(54px, 5vw, 82px) 0;
  background:
    radial-gradient(circle at 88% 8%, rgba(64, 116, 255, 0.14), transparent 28%),
    linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
  isolation: isolate;
}

.about-section::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(38, 108, 255, 0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(38, 108, 255, 0.025) 1px, transparent 1px);
  background-size: 46px 46px;
  mask-image: linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent);
}

.about-section__glow {
  position: absolute;
  z-index: -1;
  border-radius: 999px;
  filter: blur(55px);
  pointer-events: none;
}

.about-section__glow--one {
  width: 340px;
  height: 340px;
  top: 3%;
  right: -9%;
  background: rgba(44, 108, 255, 0.13);
}

.about-section__glow--two {
  width: 280px;
  height: 280px;
  left: -10%;
  bottom: -12%;
  background: rgba(91, 76, 255, 0.08);
}

.about-section__container {
  width: min(1420px, calc(100% - 44px));
  margin-inline: auto;
}

.about-hero {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(440px, 1.1fr);
  gap: clamp(28px, 4vw, 64px);
  align-items: center;
}

.about-hero__content {
  min-width: 0;
  padding-block: 8px;
}

.about-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  min-height: 38px;
  padding: 0 16px;
  border: 1px solid rgba(29, 104, 255, 0.1);
  border-radius: 999px;
  background: rgba(239, 245, 255, 0.94);
  color: #0b1739;
  font-size: 0.88rem;
  font-weight: 600;
  box-shadow: 0 10px 24px rgba(25, 84, 177, 0.06);
}

.about-eyebrow__dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #176dff;
  box-shadow: 0 0 14px rgba(23, 109, 255, 0.65);
}

.about-hero__title {
  max-width: 670px;
  margin: 24px 0 18px;
  color: #081333;
  font-size: clamp(2.5rem, 4vw, 4.65rem);
  line-height: 1.01;
  letter-spacing: -0.052em;
  font-weight: 600;
}

.about-hero__title span {
  position: relative;
  display: inline;
  color: #176dff;
}

.about-hero__title span::after {
  content: "";
  position: absolute;
  left: 2%;
  right: 2%;
  bottom: -7px;
  height: 5px;
  border-radius: 999px;
  background: linear-gradient(90deg, #176dff, #77a7ff);
  transform: rotate(-1deg);
}

.about-hero__description {
  max-width: 630px;
  margin: 0;
  color: #4b5876;
  font-size: clamp(0.98rem, 1.15vw, 1.12rem);
  line-height: 1.72;
}

.about-hero__line {
  width: 62px;
  height: 4px;
  margin: 24px 0 26px;
  border-radius: 999px;
  background: linear-gradient(90deg, #176dff, #9db9ff);
}

.about-highlights {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.about-highlight {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 11px;
  align-items: start;
  min-width: 0;
}

.about-highlight + .about-highlight {
  padding-left: 16px;
  border-left: 1px solid #dde6f6;
}

.about-highlight__icon,
.about-card__icon,
.about-value__icon {
  display: grid;
  place-items: center;
  flex: 0 0 auto;
}

.about-highlight__icon {
  width: 42px;
  height: 42px;
  border-radius: 13px;
  color: #176dff;
  background: linear-gradient(145deg, #ffffff 0%, #edf4ff 100%);
  border: 1px solid rgba(29, 104, 255, 0.12);
  box-shadow: 0 10px 24px rgba(39, 87, 177, 0.08);
}

.about-highlight h3 {
  margin: 0 0 5px;
  color: #0b1739;
  font-size: 0.9rem;
  line-height: 1.25;
  font-weight: 600;
}

.about-highlight p {
  margin: 0;
  color: #63708d;
  font-size: 0.78rem;
  line-height: 1.55;
}

.about-hero__visual {
  position: relative;
  width: 100%;
  min-height: 470px;
  isolation: isolate;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: visible;
  transform: translateY(-52px);
}

.about-hero__visual::before {
  content: "";
  position: absolute;
  z-index: -2;
  top: -15%;
  right: -14%;
  bottom: 7%;
  left: 7%;
  border-radius: 54% 0 0 48% / 48% 0 0 58%;
  background:
    radial-gradient(
      circle at 68% 24%,
      rgba(125, 162, 255, 0.42),
      transparent 30%
    ),
    linear-gradient(
      145deg,
      rgba(231, 240, 255, 0.98) 0%,
      rgba(210, 225, 255, 0.95) 56%,
      rgba(239, 245, 255, 0.98) 100%
    );
  box-shadow: 0 28px 72px rgba(35, 78, 166, 0.09);
}

.about-hero__visual::after {
  content: none;
}

.about-hero__image {
  position: absolute;
  z-index: 1;
  left: 53%;
  bottom: 42px;
  display: block;
  width: 112%;
  max-width: none;
  height: auto;
  max-height: 500px;
  object-fit: contain;
  object-position: center bottom;
  transform: translateX(-50%);
  filter: drop-shadow(0 22px 30px rgba(20, 68, 157, 0.12));
}

.about-grid {
  display: grid;
  grid-template-columns: 1.04fr 0.96fr 0.96fr 1.14fr;
  gap: 16px;
  margin-top: 22px;
}

.about-card {
  position: relative;
  min-width: 0;
  min-height: 360px;
  overflow: hidden;
  padding: 26px;
  border: 1px solid rgba(62, 96, 164, 0.1);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.97);
  box-shadow: 0 16px 42px rgba(49, 79, 139, 0.08);
}

.about-card--mission {
  color: #ffffff;
  background: linear-gradient(150deg, #09216d 0%, #0e43b9 68%, #176dff 100%);
  border-color: rgba(255, 255, 255, 0.11);
}

.about-card__icon {
  width: 52px;
  height: 52px;
  margin-bottom: 14px;
  border-radius: 50%;
  color: #176dff;
  background: linear-gradient(145deg, #ffffff, #edf4ff);
  border: 1px solid rgba(29, 104, 255, 0.12);
  box-shadow: 0 10px 24px rgba(39, 87, 177, 0.08);
}

.about-card__icon--light {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.18);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06);
}

.about-card__header h3 {
  margin: 0;
  color: #0a1738;
  font-size: clamp(1.3rem, 1.5vw, 1.58rem);
  letter-spacing: -0.03em;
  font-weight: 600;
}

.about-card__header span {
  display: block;
  width: 34px;
  height: 3px;
  margin-top: 11px;
  border-radius: 999px;
  background: linear-gradient(90deg, #176dff, #91b0ff);
}

.about-card__header--light h3 {
  color: #ffffff;
}

.about-card__header--light span {
  background: linear-gradient(90deg, #58a9ff, #c0dcff);
}

.about-card__body {
  position: relative;
  z-index: 2;
  margin: 20px 0 0;
  color: #35415f;
  font-size: 0.91rem;
  line-height: 1.66;
}

.about-card__body--light {
  color: rgba(255, 255, 255, 0.94);
}

.about-card__body--strong {
  color: #142346;
  font-weight: 500;
}

.about-quote {
  position: absolute;
  left: 18px;
  right: 18px;
  bottom: 18px;
  margin: 0;
  padding: 18px 18px 18px 42px;
  border: 1px solid rgba(39, 95, 207, 0.08);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 10px 26px rgba(45, 79, 145, 0.07);
}

.about-quote__mark {
  position: absolute;
  left: 15px;
  top: 9px;
  color: #176dff;
  font-size: 2rem;
  line-height: 1;
  font-weight: 700;
}

.about-quote p {
  margin: 0;
  color: #0e2148;
  font-size: 0.84rem;
  line-height: 1.5;
  font-weight: 550;
  font-style: italic;
}

.about-card__art {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: block;
  width: 100%;
  pointer-events: none;
  user-select: none;
}

.about-card__art--mission {
  height: 47%;
  object-fit: cover;
  object-position: center 58%;
  opacity: 0.98;
  mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.82) 18%,
    #000 34%,
    #000 100%
  );
}

.about-card__art--vision {
  height: 46%;
  object-fit: cover;
  object-position: center 63%;
  mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.82) 20%,
    #000 36%,
    #000 100%
  );
}

.about-values {
  display: grid;
  gap: 13px;
  margin-top: 20px;
}

.about-value {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 11px;
  align-items: start;
}

.about-value + .about-value {
  padding-top: 13px;
  border-top: 1px dashed #dfe7f5;
}

.about-value__icon {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  color: #ffffff;
  background: linear-gradient(145deg, #176dff, #0c4ac4);
}

.about-value h4 {
  margin: 0 0 3px;
  color: #0d1a3d;
  font-size: 0.89rem;
  line-height: 1.28;
  font-weight: 600;
}

.about-value p {
  margin: 0;
  color: #606c87;
  font-size: 0.77rem;
  line-height: 1.48;
}

@media (max-width: 1180px) {
  .about-hero {
    grid-template-columns: 1fr 1fr;
  }

  .about-hero__visual {
    min-height: 430px;
    transform: translateY(-34px);
  }

  .about-hero__visual::before {
    top: -12%;
    right: -12%;
    bottom: 7%;
    left: 5%;
  }

  .about-hero__image {
    left: 52%;
    bottom: 30px;
    width: 110%;
    max-height: 455px;
  }

  .about-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .about-card {
    min-height: 350px;
  }
}

@media (max-width: 900px) {
  .about-section__container {
    width: min(100% - 28px, 760px);
  }

  .about-hero {
    grid-template-columns: 1fr;
  }

  .about-hero__content {
    text-align: center;
  }

  .about-eyebrow,
  .about-hero__title,
  .about-hero__description {
    margin-left: auto;
    margin-right: auto;
  }

  .about-hero__line {
    margin-left: auto;
    margin-right: auto;
  }

  .about-highlights {
    text-align: left;
  }

  .about-hero__visual {
    min-height: 390px;
    transform: translateY(-18px);
  }

  .about-hero__visual::before {
    top: -8%;
    right: -7%;
    bottom: 7%;
    left: -1%;
    border-radius: 44% 56% 48% 52% / 44% 42% 58% 56%;
  }

  .about-hero__image {
    left: 50%;
    bottom: 24px;
    width: 108%;
    max-height: 405px;
  }
}

@media (max-width: 660px) {
  .about-section {
    padding-block: 48px;
  }

  .about-hero__title {
    margin-top: 20px;
    font-size: clamp(2.2rem, 11vw, 3.25rem);
  }

  .about-highlights {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .about-highlight + .about-highlight {
    padding-left: 0;
    padding-top: 15px;
    border-left: 0;
    border-top: 1px solid #dce5f6;
  }

  .about-hero__visual {
    min-height: 300px;
    transform: translateY(-4px);
    margin-top: -4px;
  }

  .about-hero__visual::before {
    top: 0;
    right: -8%;
    bottom: 5%;
    left: -7%;
    border-radius: 45% 55% 48% 52% / 44% 43% 57% 56%;
  }

  .about-hero__visual::after {
    display: none;
  }

  .about-hero__image {
    left: 50%;
    bottom: 10px;
    width: 114%;
    max-height: 315px;
  }

  .about-grid {
    grid-template-columns: 1fr;
  }

  .about-card {
    min-height: 340px;
    padding: 22px;
    border-radius: 20px;
  }

  .about-card--mission,
  .about-card--vision {
    min-height: 475px;
    padding-bottom: 218px;
  }

  .about-card--mission .about-card__body,
  .about-card--vision .about-card__body {
    max-width: none;
  }

  .about-card__art--mission,
  .about-card__art--vision {
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 220px;
    max-height: none;
    object-fit: cover;
    mask-image: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.86) 16%,
      #000 32%,
      #000 100%
    );
  }

  .about-card__art--mission {
    object-position: center 62%;
  }

  .about-card__art--vision {
    object-position: center 68%;
  }

  .about-card--values {
    min-height: auto;
  }
}

@media (max-width: 420px) {
  .about-section__container {
    width: min(100% - 18px, 760px);
  }

  .about-hero__visual {
    min-height: 245px;
  }

  .about-hero__visual::before {
    top: 1%;
    right: -10%;
    bottom: 8%;
    left: -10%;
  }

  .about-hero__image {
    bottom: 8px;
    width: 116%;
    max-height: 260px;
  }

  .about-card {
    min-height: 330px;
  }

  .about-card--mission,
  .about-card--vision {
    min-height: 450px;
    padding-bottom: 205px;
  }

  .about-card__art--mission,
  .about-card__art--vision {
    height: 205px;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .about-hero__image {
    animation: aboutFloat 6s ease-in-out infinite;
  }

  .about-card,
  .about-highlight {
    transition:
      transform 220ms ease,
      box-shadow 220ms ease;
  }

  .about-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 22px 52px rgba(45, 77, 136, 0.13);
  }

  .about-highlight:hover {
    transform: translateY(-2px);
  }
}

@keyframes aboutFloat {
  0%,
  100% {
    transform: translateX(-50%) translateY(0);
  }

  50% {
    transform: translateX(-50%) translateY(-4px);
  }
}
`;

const highlights = [
  {
    icon: Bolt,
    title: "A la medida",
    text: "Soluciones únicas para cada cliente y cada necesidad.",
  },
  {
    icon: ShieldCheck,
    title: "Tecnología de calidad",
    text: "Aplicamos tecnologías modernas y buenas prácticas.",
  },
  {
    icon: UsersRound,
    title: "Comprometidos contigo",
    text: "Te acompañamos de forma cercana durante todo el proyecto.",
  },
];

const values = [
  {
    icon: Lightbulb,
    title: "Innovación constante",
    text: "Exploramos mejores formas de resolver cada reto.",
  },
  {
    icon: ShieldCheck,
    title: "Calidad en cada detalle",
    text: "Cuidamos cada línea de código y cada experiencia.",
  },
  {
    icon: Handshake,
    title: "Confianza y transparencia",
    text: "Construimos relaciones basadas en honestidad y resultados.",
  },
  {
    icon: UsersRound,
    title: "Trabajo en equipo",
    text: "Colaboramos contigo para convertir tus objetivos en producto.",
  },
];

export default function About() {
  return (
    <>
      <style>{ABOUT_STYLES}</style>

      <section id="nosotros" className="about-section">
        <div className="about-section__glow about-section__glow--one" />
        <div className="about-section__glow about-section__glow--two" />

        <div className="about-section__container">
          <div className="about-hero">
            <div className="about-hero__content">
              <div className="about-eyebrow">
                <span className="about-eyebrow__dot" />
                Sobre nosotros
              </div>

              <h2 className="about-hero__title">
                Transformamos ideas en <span>soluciones reales.</span>
              </h2>

              <p className="about-hero__description">
                En DaloTech desarrollamos software a la medida que impulsa
                negocios, optimiza procesos y crea experiencias digitales
                excepcionales.
              </p>

              <div className="about-hero__line" />

              <div className="about-highlights">
                {highlights.map(({ icon: Icon, title, text }) => (
                  <article key={title} className="about-highlight">
                    <div className="about-highlight__icon">
                      <Icon size={20} strokeWidth={1.9} aria-hidden="true" />
                    </div>

                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="about-hero__visual">
              <img
                src="/about-equipo.png"
                alt="Equipo de DaloTech desarrollando software a la medida"
                className="about-hero__image"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          <div className="about-grid">
            <article className="about-card about-card--essence">
              <div className="about-card__header">
                <h3>Nuestra esencia</h3>
                <span />
              </div>

              <p className="about-card__body">
                Somos un equipo apasionado por el desarrollo de software a la
                medida. Combinamos creatividad, tecnología y estrategia para
                construir productos digitales que realmente generan valor.
              </p>

              <blockquote className="about-quote">
                <span className="about-quote__mark">“</span>

                <p>
                  No solo escribimos código, creamos soluciones que impulsan el
                  crecimiento de tu negocio.
                </p>
              </blockquote>
            </article>

            <article className="about-card about-card--mission">
              <div className="about-card__icon about-card__icon--light">
                <Target size={25} strokeWidth={1.8} aria-hidden="true" />
              </div>

              <div className="about-card__header about-card__header--light">
                <h3>Misión</h3>
                <span />
              </div>

              <p className="about-card__body about-card__body--light">
                Desarrollar soluciones de software personalizadas que superen
                las expectativas de nuestros clientes, optimizando procesos y
                generando impacto real en sus negocios.
              </p>

              <img
                src="/about-mision.png"
                alt=""
                className="about-card__art about-card__art--mission"
                loading="lazy"
                decoding="async"
                aria-hidden="true"
              />
            </article>

            <article className="about-card about-card--vision">
              <div className="about-card__icon">
                <Eye size={26} strokeWidth={1.8} aria-hidden="true" />
              </div>

              <div className="about-card__header">
                <h3>Visión</h3>
                <span />
              </div>

              <p className="about-card__body about-card__body--strong">
                Ser referentes en desarrollo de software a la medida,
                reconocidos por nuestra innovación, calidad y compromiso con
                cada cliente.
              </p>

              <img
                src="/about-vision.png"
                alt=""
                className="about-card__art about-card__art--vision"
                loading="lazy"
                decoding="async"
                aria-hidden="true"
              />
            </article>

            <article className="about-card about-card--values">
              <div className="about-card__header">
                <h3>Nuestros valores</h3>
                <span />
              </div>

              <div className="about-values">
                {values.map(({ icon: Icon, title, text }) => (
                  <div key={title} className="about-value">
                    <div className="about-value__icon">
                      <Icon size={17} strokeWidth={1.9} aria-hidden="true" />
                    </div>

                    <div>
                      <h4>{title}</h4>
                      <p>{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
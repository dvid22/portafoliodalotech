import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Boxes,
  ChevronRight,
  Goal,
  Lightbulb,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UsersRound,
} from "lucide-react";

import { projects } from "../../data/portfolioData";

const AUTO_CHANGE_TIME = 6200;
const PROJECT_DETAILS = {
  "Master Caps": {
    eyebrow: "Sistema POS y tienda virtual",
    summary:
      "Solución integral que centraliza la gestión comercial y operativa en un sistema POS moderno y una tienda virtual conectada, optimizando el control, las ventas y la experiencia del cliente.",
    challenge:
      "Centralizar la operación comercial, controlar variantes y existencias en tiempo real, y conectar el punto de venta con una experiencia de compra digital.",
    solution:
      "Construimos una plataforma que integra POS, inventario, variantes por talla, múltiples imágenes, apartados, catálogo público y compatibilidad con impresión térmica.",
    results: [
      {
        icon: Boxes,
        text: "Inventario y variantes gestionados desde una sola plataforma.",
      },
      {
        icon: PackageCheck,
        text: "Ventas, apartados y catálogo conectados en tiempo real.",
      },
      {
        icon: ShieldCheck,
        text: "Menos tareas manuales y mayor trazabilidad operativa.",
      },
      {
        icon: UsersRound,
        text: "Experiencia coherente entre administración y tienda virtual.",
      },
    ],
  },

  "Menú QR SaaS": {
    eyebrow: "Plataforma gastronómica SaaS",
    summary:
      "Plataforma gastronómica para administrar menús digitales, pedidos, clientes, ventas y reportes desde una experiencia centralizada y accesible desde cualquier dispositivo.",
    challenge:
      "Crear una herramienta fácil de adoptar, preparada para distintos negocios y capaz de operar en tiempo real con una experiencia simple para clientes y administradores.",
    solution:
      "Diseñamos una solución SaaS con menú QR, gestión de productos, pedidos en tiempo real, clientes, reportes, control de ventas y acceso multidispositivo.",
    results: [
      {
        icon: Boxes,
        text: "Menús digitales actualizables sin volver a imprimir códigos QR.",
      },
      {
        icon: PackageCheck,
        text: "Pedidos y operación centralizados en tiempo real.",
      },
      {
        icon: ShieldCheck,
        text: "Información comercial disponible para seguimiento y análisis.",
      },
      {
        icon: UsersRound,
        text: "Arquitectura preparada para múltiples establecimientos.",
      },
    ],
  },

  "Traductor de Lengua de Señas": {
    eyebrow: "Inteligencia artificial e inclusión",
    summary:
      "Sistema web de apoyo a la inclusión que registra, procesa y reconoce secuencias de Lengua de Señas Colombiana mediante visión por computador.",
    challenge:
      "Procesar movimientos de las manos de manera consistente, organizar las muestras y convertir la información visual en resultados comprensibles para el usuario.",
    solution:
      "Construimos una aplicación web que utiliza MediaPipe, procesamiento de secuencias y modelos de reconocimiento conectados con una plataforma de gestión.",
    results: [
      {
        icon: Boxes,
        text: "Captura estructurada de secuencias de lengua de señas.",
      },
      {
        icon: PackageCheck,
        text: "Procesamiento visual integrado dentro de una aplicación web.",
      },
      {
        icon: ShieldCheck,
        text: "Base tecnológica extensible para nuevas señas y ejercicios.",
      },
      {
        icon: UsersRound,
        text: "Experiencia orientada a educación e inclusión digital.",
      },
    ],
  },

  EcoHorario: {
    eyebrow: "Plataforma comunitaria",
    summary:
      "Aplicación comunitaria para consultar horarios de recolección, administrar información por sectores y conectar a ciudadanos, recicladores y responsables del servicio.",
    challenge:
      "Organizar información geográfica y operativa de manera sencilla, permitiendo consultas rápidas y una administración clara del contenido.",
    solution:
      "Desarrollamos una plataforma con consulta de horarios, gestión de sectores, publicaciones, comentarios, mensajes y herramientas administrativas.",
    results: [
      {
        icon: Boxes,
        text: "Información organizada y accesible por sector.",
      },
      {
        icon: PackageCheck,
        text: "Mejor comunicación entre comunidad y administradores.",
      },
      {
        icon: ShieldCheck,
        text: "Publicación centralizada de novedades y horarios.",
      },
      {
        icon: UsersRound,
        text: "Base preparada para ampliar cobertura y funcionalidades.",
      },
    ],
  },
};

const DEFAULT_DETAILS = {
  eyebrow: "Solución digital a medida",
  summary:
    "Una solución digital diseñada para resolver necesidades concretas, organizar procesos y ofrecer una experiencia clara, moderna y escalable.",
  challenge:
    "Convertir necesidades operativas en una herramienta digital fácil de utilizar, segura y preparada para evolucionar.",
  solution:
    "Diseñamos y desarrollamos una plataforma personalizada, alineada con los procesos reales y los objetivos de la organización.",
  results: [
    {
      icon: Boxes,
      text: "Procesos más organizados y fáciles de supervisar.",
    },
    {
      icon: PackageCheck,
      text: "Información centralizada y disponible para el equipo.",
    },
    {
      icon: ShieldCheck,
      text: "Experiencia más clara para usuarios y administradores.",
    },
    {
      icon: UsersRound,
      text: "Arquitectura preparada para nuevas funcionalidades.",
    },
  ],
};

const EASE = [0.22, 1, 0.36, 1];

const STYLES = String.raw`
#proyectos.projects-premium {
  position: relative;
  overflow: hidden;
  padding: clamp(48px, 5vw, 72px) 0;
  background: #fff;
  color: #0a1532;
  isolation: isolate;
}

#proyectos.projects-premium::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(24, 84, 190, 0.018) 1px, transparent 1px),
    linear-gradient(90deg, rgba(24, 84, 190, 0.018) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent);
}

#proyectos .projects-premium__container {
  width: min(1440px, calc(100% - 40px));
  margin-inline: auto;
}

#proyectos .projects-premium__header {
  position: relative;
  min-height: 98px;
  margin-bottom: 12px;
}

#proyectos .projects-premium__heading {
  width: min(760px, 100%);
  margin-inline: auto;
  text-align: center;
}

#proyectos .projects-premium__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  margin: 0;
  color: #176dff;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

#proyectos .projects-premium__eyebrow::before {
  content: "";
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: #176dff;
  box-shadow: 0 0 0 6px rgba(23, 109, 255, 0.07);
}

#proyectos .projects-premium__title {
  max-width: 720px;
  margin: 13px auto 0;
  color: #07122f;
  font-size: clamp(1.75rem, 2.55vw, 2.65rem);
  line-height: 1.05;
  letter-spacing: -0.045em;
  font-weight: 600;
}

#proyectos .projects-premium__title span {
  color: #176dff;
}

#proyectos .projects-premium__controls {
  position: absolute;
  top: 35%;
  right: 0;
  display: flex;
  gap: 11px;
  align-items: center;
}

#proyectos .projects-premium__control {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border: 1px solid rgba(40, 73, 137, 0.1);
  border-radius: 50%;
  background: #fff;
  color: #3c4b68;
  cursor: pointer;
  box-shadow: 0 10px 25px rgba(28, 65, 135, 0.08);
}

#proyectos .projects-premium__control--next {
  width: 47px;
  height: 47px;
  border-color: transparent;
  background: linear-gradient(145deg, #3184ff, #176dff);
  color: #fff;
  box-shadow: 0 13px 28px rgba(23, 109, 255, 0.24);
}

/* Carrusel */
#proyectos .projects-premium__rail {
  overflow-x: auto;
  padding: 12px 8px 17px;
  scroll-behavior: smooth;
  scrollbar-width: none;
  scroll-snap-type: x mandatory;
}

#proyectos .projects-premium__rail::-webkit-scrollbar {
  display: none;
}

#proyectos .projects-premium__track {
  display: flex;
  align-items: center;
  gap: 20px;
  min-width: max-content;
  padding-inline: 8px;
}

#proyectos .projects-premium__project {
  position: relative;
  display: grid;
  place-items: center;
  width: 116px;
  min-height: 132px;
  padding: 12px 9px;
  border: 1px solid rgba(39, 73, 139, 0.075);
  border-radius: 19px;
  background: rgba(255, 255, 255, 0.72);
  color: #69748b;
  cursor: pointer;
  scroll-snap-align: center;
  box-shadow: 0 11px 28px rgba(26, 62, 130, 0.035);
}

#proyectos .projects-premium__project::after {
  content: "";
  position: absolute;
  bottom: 12px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: transparent;
}

#proyectos .projects-premium__project.is-active {
  width: 164px;
  min-height: 178px;
  padding: 16px 14px 22px;
  border-color: rgba(23, 109, 255, 0.75);
  background: #fff;
  color: #081431;
  box-shadow:
    0 22px 46px rgba(23, 109, 255, 0.11),
    0 0 0 1px rgba(23, 109, 255, 0.04);
}

#proyectos .projects-premium__project.is-active::after {
  background: #176dff;
  box-shadow: 0 0 0 5px rgba(23, 109, 255, 0.07);
}

#proyectos .projects-premium__logo-box {
  display: grid;
  place-items: center;
  width: 82px;
  height: 68px;
  margin-bottom: 7px;
}

#proyectos .projects-premium__project.is-active .projects-premium__logo-box {
  width: 120px;
  height: 102px;
}

#proyectos .projects-premium__logo {
  display: block;
  max-width: 68px;
  max-height: 54px;
  object-fit: contain;
  filter: grayscale(1);
  opacity: 0.54;
}

#proyectos .projects-premium__project.is-active .projects-premium__logo {
  max-width: 108px;
  max-height: 88px;
  filter: grayscale(0) drop-shadow(0 10px 18px rgba(15, 42, 94, 0.08));
  opacity: 1;
}

#proyectos .projects-premium__project-name {
  max-width: 120px;
  color: currentColor;
  font-size: 0.72rem;
  line-height: 1.3;
  font-weight: 600;
  text-align: center;
}

#proyectos .projects-premium__project.is-active .projects-premium__project-name {
  max-width: 160px;
  font-size: 0.84rem;
}

/* Detalle */
#proyectos .projects-premium__detail {
  position: relative;
  display: grid;
  grid-template-columns: minmax(235px, 0.42fr) minmax(0, 1.58fr);
  gap: 28px;
  align-items: center;
  margin-top: 14px;
  padding: 26px 28px;
  border: 1px solid rgba(44, 76, 139, 0.09);
  border-radius: 25px;
  background:
    radial-gradient(circle at 96% 3%, rgba(23, 109, 255, 0.045), transparent 24%),
    #fff;
  box-shadow: 0 22px 56px rgba(24, 60, 130, 0.065);
}

#proyectos .projects-premium__identity {
  position: relative;
  display: grid;
  place-items: center;
  align-self: center;
  min-height: 330px;
  padding: 18px 18px 12px;
  text-align: center;
}

#proyectos .projects-premium__identity::after {
  content: "";
  position: absolute;
  top: 18px;
  right: -14px;
  bottom: 18px;
  width: 1px;
  background: linear-gradient(to bottom, transparent, rgba(23, 109, 255, 0.28), transparent);
}

#proyectos .projects-premium__hero-logo {
  position: relative;
  display: grid;
  place-items: center;
  width: 100%;
  min-height: 205px;
}

#proyectos .projects-premium__hero-logo::before {
  content: "";
  position: absolute;
  width: min(250px, 90%);
  aspect-ratio: 1.4;
  border-radius: 50%;
  background: radial-gradient(ellipse, rgba(23, 109, 255, 0.10), transparent 67%);
}

#proyectos .projects-premium__hero-logo img {
  position: relative;
  z-index: 1;
  display: block;
  max-width: min(220px, 88%);
  max-height: 150px;
  object-fit: contain;
  filter: drop-shadow(0 15px 24px rgba(18, 42, 92, 0.09));
}

#proyectos .projects-premium__identity h3 {
  margin: 0;
  color: #081431;
  font-size: clamp(1.75rem, 2.2vw, 2.35rem);
  line-height: 1;
  letter-spacing: -0.04em;
  font-weight: 600;
}

#proyectos .projects-premium__identity-line {
  width: 48px;
  height: 3px;
  margin-top: 18px;
  border-radius: 999px;
  background: #176dff;
}

#proyectos .projects-premium__content {
  min-width: 0;
  padding-left: 6px;
}

#proyectos .projects-premium__content-top {
  position: relative;
  padding-bottom: 17px;
  border-bottom: 1px solid rgba(44, 76, 139, 0.09);
}

#proyectos .projects-premium__case-label {
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  margin-bottom: 10px;
  padding: 0 11px;
  border-radius: 999px;
  background: #eef5ff;
  color: #176dff;
  font-size: 0.63rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

#proyectos .projects-premium__detail-title {
  margin: 0;
  color: #081431;
  font-size: clamp(2rem, 2.8vw, 3rem);
  line-height: 1;
  letter-spacing: -0.048em;
  font-weight: 600;
}

#proyectos .projects-premium__summary {
  max-width: 890px;
  margin: 11px 0 0;
  color: #5c6984;
  font-size: 0.9rem;
  line-height: 1.65;
}

#proyectos .projects-premium__tag {
  position: absolute;
  top: 0;
  right: 0;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  min-height: 31px;
  padding: 0 13px;
  border: 1px solid rgba(23, 109, 255, 0.12);
  border-radius: 999px;
  background: #fff;
  color: #31415f;
  font-size: 0.7rem;
  font-weight: 500;
  box-shadow: 0 8px 20px rgba(35, 70, 143, 0.05);
}

#proyectos .projects-premium__tag::before {
  content: "";
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #176dff;
}

#proyectos .projects-premium__core {
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 64px;
  margin-top: 16px;
}

#proyectos .projects-premium__core::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  width: 38px;
  height: 38px;
  border: 1px solid rgba(23, 109, 255, 0.12);
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 10px 22px rgba(35, 70, 143, 0.07);
  transform: translate(-50%, -50%);
}

#proyectos .projects-premium__core::after {
  content: "→";
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 3;
  color: #176dff;
  font-size: 1rem;
  transform: translate(-50%, -54%);
}

#proyectos .projects-premium__core-card {
  min-height: 170px;
  padding: 20px;
  border: 1px solid rgba(44, 76, 139, 0.09);
  border-radius: 18px;
  background: linear-gradient(145deg, #fbfdff, #f7faff);
}

#proyectos .projects-premium__core-card--solution {
  border-color: rgba(18, 173, 111, 0.14);
  background: linear-gradient(145deg, rgba(248, 255, 252, 0.96), #f6fbf9);
}

#proyectos .projects-premium__core-heading {
  display: flex;
  gap: 13px;
  align-items: center;
  margin-bottom: 10px;
}

#proyectos .projects-premium__icon {
  display: grid;
  place-items: center;
  width: 43px;
  height: 43px;
  flex: 0 0 auto;
  border: 1px solid rgba(23, 109, 255, 0.09);
  border-radius: 14px;
  background: linear-gradient(180deg, #fff, #eef5ff);
  color: #176dff;
}

#proyectos .projects-premium__core-card--solution .projects-premium__icon {
  border-color: rgba(18, 173, 111, 0.12);
  background: linear-gradient(180deg, #fff, #eaf8f2);
  color: #11a66d;
}

#proyectos .projects-premium__core-heading h4 {
  margin: 0;
  color: #111d3b;
  font-size: 0.93rem;
  font-weight: 600;
}

#proyectos .projects-premium__core-heading i {
  display: block;
  width: 24px;
  height: 3px;
  margin-top: 7px;
  border-radius: 999px;
  background: #176dff;
}

#proyectos .projects-premium__core-card--solution .projects-premium__core-heading i {
  background: #11a66d;
}

#proyectos .projects-premium__core-card p {
  margin: 0 0 0 56px;
  color: #62708a;
  font-size: 0.77rem;
  line-height: 1.62;
}

#proyectos .projects-premium__impact {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(44, 76, 139, 0.09);
}

#proyectos .projects-premium__impact-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 11px;
  color: #176dff;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

#proyectos .projects-premium__results {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 9px;
  margin: 0;
  padding: 0;
  list-style: none;
}

#proyectos .projects-premium__result {
  display: grid;
  grid-template-columns: 39px 1fr;
  gap: 9px;
  align-items: center;
  min-height: 82px;
  padding: 11px;
  border: 1px solid rgba(44, 76, 139, 0.075);
  border-radius: 14px;
  background: #fff;
}

#proyectos .projects-premium__result-icon {
  display: grid;
  place-items: center;
  width: 39px;
  height: 39px;
  border-radius: 50%;
  background: #edf4ff;
  color: #176dff;
}

#proyectos .projects-premium__result:nth-child(2) .projects-premium__result-icon {
  background: #eaf8f2;
  color: #11a66d;
}

#proyectos .projects-premium__result:nth-child(3) .projects-premium__result-icon {
  background: #f3ebff;
  color: #8e49dc;
}

#proyectos .projects-premium__result:nth-child(4) .projects-premium__result-icon {
  background: #fff1e6;
  color: #f06d12;
}

#proyectos .projects-premium__result-copy strong {
  display: block;
  margin-bottom: 4px;
  color: #176dff;
  font-size: 0.68rem;
}

#proyectos .projects-premium__result-copy p {
  margin: 0;
  color: #4d5b75;
  font-size: 0.66rem;
  line-height: 1.43;
}

#proyectos .projects-premium__cta-row {
  display: flex;
  justify-content: flex-end;
  margin-top: 14px;
}

#proyectos .projects-premium__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  min-height: 45px;
  padding: 0 17px;
  border: 0;
  border-radius: 12px;
  background: linear-gradient(145deg, #3184ff, #176dff);
  color: #fff;
  font-size: 0.76rem;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 13px 27px rgba(23, 109, 255, 0.2);
}

@media (max-width: 1100px) {
  #proyectos .projects-premium__detail {
    grid-template-columns: 1fr;
  }

  #proyectos .projects-premium__identity {
    min-height: 230px;
  }

  #proyectos .projects-premium__identity::after {
    display: none;
  }

  #proyectos .projects-premium__results {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  #proyectos.projects-premium {
    padding-block: 44px;
  }

  #proyectos .projects-premium__container {
    width: min(100% - 16px, 820px);
  }

  #proyectos .projects-premium__header {
    min-height: 0;
  }

  #proyectos .projects-premium__controls {
    position: static;
    justify-content: center;
    margin-top: 18px;
  }

  #proyectos .projects-premium__track {
    gap: 14px;
  }

  #proyectos .projects-premium__project {
    width: 112px;
    min-height: 136px;
  }

  #proyectos .projects-premium__project.is-active {
    width: 154px;
    min-height: 178px;
  }

  #proyectos .projects-premium__detail {
    gap: 12px;
    padding: 16px;
  }

  #proyectos .projects-premium__identity {
    min-height: 210px;
  }

  #proyectos .projects-premium__hero-logo {
    min-height: 150px;
  }

  #proyectos .projects-premium__hero-logo img {
    max-height: 110px;
  }

  #proyectos .projects-premium__tag {
    position: static;
    width: fit-content;
    margin-top: 10px;
  }

  #proyectos .projects-premium__core {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  #proyectos .projects-premium__core::before,
  #proyectos .projects-premium__core::after {
    display: none;
  }

  #proyectos .projects-premium__core-card {
    min-height: auto;
  }

  #proyectos .projects-premium__results {
    grid-template-columns: 1fr;
  }

  #proyectos .projects-premium__cta {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  #proyectos .projects-premium__rail {
    scroll-behavior: auto;
  }
}
`;

function normalizeProjects(source) {
  if (!Array.isArray(source)) return [];

  return source
    .filter(
      (project) =>
        project &&
        typeof project.title === "string" &&
        typeof project.description === "string",
    )
    .map((project, index) => ({
      ...project,
      id: project.id || project.slug || `${project.title}-${index}`,
      image: project.image || "/images/projects/project-placeholder.svg",
      details: {
        ...DEFAULT_DETAILS,
        ...(PROJECT_DETAILS[project.title] || {}),
        ...(project.caseStudy || {}),
      },
    }));
}

export default function Projects() {
  const reduceMotion = useReducedMotion();
  const safeProjects = useMemo(() => normalizeProjects(projects), []);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isUserPaused, setIsUserPaused] = useState(false);
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  const sectionRef = useRef(null);
  const railRef = useRef(null);
  const itemRefs = useRef([]);

  const safeIndex = safeProjects.length
    ? Math.min(activeIndex, safeProjects.length - 1)
    : 0;

  const activeProject = safeProjects[safeIndex];

  const selectProject = (index, userInitiated = false) => {
    if (!safeProjects.length) return;

    setActiveIndex(
      (index + safeProjects.length) % safeProjects.length,
    );

    if (userInitiated) {
      setIsUserPaused(true);
    }
  };

  useEffect(() => {
    if (
      reduceMotion ||
      isUserPaused ||
      !isSectionVisible ||
      safeProjects.length <= 1
    ) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveIndex(
        (current) => (current + 1) % safeProjects.length,
      );
    }, AUTO_CHANGE_TIME);

    return () => window.clearInterval(timer);
  }, [
    isSectionVisible,
    isUserPaused,
    reduceMotion,
    safeProjects.length,
  ]);

  /* Corrige el bug: desplaza solo el carrusel, nunca la página completa. */
  useEffect(() => {
    const rail = railRef.current;
    const activeItem = itemRefs.current[safeIndex];

    if (!rail || !activeItem) return;

    const targetLeft =
      activeItem.offsetLeft -
      rail.clientWidth / 2 +
      activeItem.offsetWidth / 2;

    rail.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [safeIndex, reduceMotion]);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible =
          entry.isIntersecting && entry.intersectionRatio >= 0.28;

        setIsSectionVisible(visible);

        // Al abandonar la sección se libera la pausa manual.
        // Cuando el usuario vuelva, el carrusel continuará automáticamente.
        if (!visible) {
          setIsUserPaused(false);
        }
      },
      {
        threshold: [0, 0.28, 0.55],
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  if (!activeProject) return null;

  const { details } = activeProject;

  return (
    <>
      <style>{STYLES}</style>

      <section
        ref={sectionRef}
        id="proyectos"
        className="projects-premium"
      >
        <div className="projects-premium__container">
          <header className="projects-premium__header">
            <motion.div
              className="projects-premium__heading"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.58, ease: EASE }}
            >
              <p className="projects-premium__eyebrow">
                Proyectos destacados
              </p>

              <h2 className="projects-premium__title">
                Soluciones que impulsan negocios y generan 
                <span>impacto</span>
              </h2>
            </motion.div>

            <div className="projects-premium__controls">
              <motion.button
                type="button"
                className="projects-premium__control"
                onClick={() => selectProject(safeIndex - 1, true)}
                aria-label="Proyecto anterior"
                whileHover={reduceMotion ? undefined : { y: -2 }}
                whileTap={{ scale: 0.94 }}
              >
                <ArrowLeft size={18} />
              </motion.button>

              <motion.button
                type="button"
                className="projects-premium__control projects-premium__control--next"
                onClick={() => selectProject(safeIndex + 1, true)}
                aria-label="Proyecto siguiente"
                whileHover={reduceMotion ? undefined : { y: -2 }}
                whileTap={{ scale: 0.94 }}
              >
                <ArrowRight size={19} />
              </motion.button>

            </div>
          </header>

          <motion.div
            ref={railRef}
            className="projects-premium__rail"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.06, ease: EASE }}
          >
            <div className="projects-premium__track">
              {safeProjects.map((project, index) => {
                const isActive = index === safeIndex;

                return (
                  <motion.button
                    ref={(element) => {
                      itemRefs.current[index] = element;
                    }}
                    key={project.id}
                    type="button"
                    className={`projects-premium__project ${isActive ? "is-active" : ""}`}
                    onClick={() => selectProject(index, true)}
                    aria-pressed={isActive}
                    aria-label={`Ver proyecto ${project.title}`}
                    layout
                    transition={{ layout: { duration: 0.46, ease: EASE } }}
                    whileHover={
                      reduceMotion || isActive
                        ? undefined
                        : { y: -5, scale: 1.02 }
                    }
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.span
                      className="projects-premium__logo-box"
                      layout="position"
                    >
                      <motion.img
                        src={project.image}
                        alt={`Logo de ${project.title}`}
                        className="projects-premium__logo"
                        animate={
                          reduceMotion
                            ? undefined
                            : isActive
                              ? { y: [0, -4, 0], scale: [1, 1.02, 1] }
                              : { y: 0, scale: 1 }
                        }
                        transition={
                          isActive
                            ? {
                                duration: 3.8,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }
                            : { duration: 0.28 }
                        }
                      />
                    </motion.span>

                    <span className="projects-premium__project-name">
                      {project.title}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.article
              key={activeProject.id}
              className="projects-premium__detail"
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 18, scale: 0.99 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -10, scale: 0.995 }
              }
              transition={{ duration: 0.48, ease: EASE }}
            >
              <motion.aside
                className="projects-premium__identity"
                initial={reduceMotion ? false : { opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.48, delay: 0.06, ease: EASE }}
              >
                <div className="projects-premium__hero-logo">
                  <motion.img
                    src={activeProject.image}
                    alt={`Logo de ${activeProject.title}`}
                    animate={
                      reduceMotion
                        ? undefined
                        : { y: [0, -7, 0], rotate: [0, -0.4, 0.4, 0] }
                    }
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>

                <h3>{activeProject.title}</h3>
                <span className="projects-premium__identity-line" />
              </motion.aside>

              <div className="projects-premium__content">
                <div className="projects-premium__content-top">
                  <span className="projects-premium__case-label">
                    Caso seleccionado
                  </span>

                  <h3 className="projects-premium__detail-title">
                    {activeProject.title}
                  </h3>

                  <p className="projects-premium__summary">
                    {details.summary}
                  </p>

                  <span className="projects-premium__tag">
                    {details.eyebrow}
                  </span>
                </div>

                <div className="projects-premium__core">
                  <motion.article
                    className="projects-premium__core-card"
                    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.44, delay: 0.14, ease: EASE }}
                  >
                    <div className="projects-premium__core-heading">
                      <span className="projects-premium__icon">
                        <Goal size={19} strokeWidth={1.8} />
                      </span>
                      <div>
                        <h4>El reto</h4>
                        <i />
                      </div>
                    </div>
                    <p>{details.challenge}</p>
                  </motion.article>

                  <motion.article
                    className="projects-premium__core-card projects-premium__core-card--solution"
                    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.44, delay: 0.2, ease: EASE }}
                  >
                    <div className="projects-premium__core-heading">
                      <span className="projects-premium__icon">
                        <Lightbulb size={19} strokeWidth={1.8} />
                      </span>
                      <div>
                        <h4>Nuestra solución</h4>
                        <i />
                      </div>
                    </div>
                    <p>{details.solution}</p>
                  </motion.article>
                </div>

                <section className="projects-premium__impact">
                  <div className="projects-premium__impact-title">
                    <TrendingUp size={17} strokeWidth={1.8} />
                    Impacto generado
                  </div>

                  <ul className="projects-premium__results">
                    {details.results.map((result, index) => {
                      const ResultIcon = result.icon || Sparkles;

                      return (
                        <motion.li
                          key={result.text}
                          className="projects-premium__result"
                          initial={
                            reduceMotion
                              ? false
                              : { opacity: 0, y: 14, scale: 0.98 }
                          }
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{
                            duration: 0.42,
                            delay: 0.27 + index * 0.06,
                            ease: EASE,
                          }}
                          whileHover={
                            reduceMotion
                              ? undefined
                              : { y: -3, scale: 1.01 }
                          }
                        >
                          <span className="projects-premium__result-icon">
                            <ResultIcon size={17} strokeWidth={1.8} />
                          </span>

                          <div className="projects-premium__result-copy">
                            <strong>{String(index + 1).padStart(2, "0")}</strong>
                            <p>{result.text}</p>
                          </div>
                        </motion.li>
                      );
                    })}
                  </ul>
                </section>

                <div className="projects-premium__cta-row">
                  <motion.a
                    href="#contacto"
                    className="projects-premium__cta"
                    whileHover={
                      reduceMotion
                        ? undefined
                        : { y: -2, boxShadow: "0 16px 32px rgba(23,109,255,.26)" }
                    }
                    whileTap={{ scale: 0.98 }}
                  >
                    <Sparkles size={15} strokeWidth={1.8} />
                    Quiero algo similar
                    <ChevronRight size={16} strokeWidth={1.8} />
                  </motion.a>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
import { useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Layers3,
  Rocket,
  Sparkles,
} from "lucide-react";
import { projects } from "../../data/portfolioData";

const filters = [
  {
    id: "Todos",
    label: "Todos",
  },
  {
    id: "Plataformas",
    label: "Plataformas",
  },
  {
    id: "SaaS",
    label: "SaaS",
  },
  {
    id: "IA",
    label: "IA",
  },
];

function matchesFilter(project, activeFilter) {
  if (activeFilter === "Todos") {
    return true;
  }

  return project.group === activeFilter;
}

export default function Projects() {
  const reduceMotion = useReducedMotion();

  const [activeFilter, setActiveFilter] =
    useState("Todos");

  const [activeIndex, setActiveIndex] =
    useState(0);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) =>
      matchesFilter(
        project,
        activeFilter,
      ),
    );
  }, [activeFilter]);

  const safeIndex =
    filteredProjects.length === 0
      ? 0
      : Math.min(
          activeIndex,
          filteredProjects.length - 1,
        );

  const featuredProject =
    filteredProjects[safeIndex];

  const secondaryProjects =
    filteredProjects.filter(
    (_, index) => index !== safeIndex,
  );
  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
    setActiveIndex(0);
  };

  const handlePrevious = () => {
    if (!filteredProjects.length) {
      return;
    }

    setActiveIndex((currentIndex) =>
      currentIndex === 0
        ? filteredProjects.length - 1
        : currentIndex - 1,
    );
  };

  const handleNext = () => {
    if (!filteredProjects.length) {
      return;
    }

    setActiveIndex((currentIndex) =>
      currentIndex ===
      filteredProjects.length - 1
        ? 0
        : currentIndex + 1,
    );
  };

  const handleSelectProject = (
    projectTitle,
  ) => {
    const projectIndex =
      filteredProjects.findIndex(
        (project) =>
          project.title === projectTitle,
      );

    if (projectIndex >= 0) {
      setActiveIndex(projectIndex);
    }
  };

  return (
    <section
      id="proyectos"
      className="projects-showcase"
    >
      <div className="projects-decoration projects-decoration-left" />
      <div className="projects-decoration projects-decoration-right" />

      <div className="projects-container">
        <div className="projects-heading-row">
          <div>
            <div className="projects-eyebrow">
              <Sparkles size={15} />

              <span>
                Proyectos destacados
              </span>
            </div>

            <h2 className="projects-heading">
              Proyectos reales

              <span>
                que generan impacto.
              </span>
            </h2>

            <p className="projects-description">
              Soluciones digitales
              construidas para resolver
              necesidades reales de
              negocios, instituciones y
              comunidades.
            </p>
          </div>

          <div className="projects-navigation">
            <button
              type="button"
              onClick={handlePrevious}
              className="projects-nav-button"
              aria-label="Proyecto anterior"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="projects-nav-button projects-nav-button-primary"
              aria-label="Proyecto siguiente"
            >
              <ChevronRight size={20} />
            </button>

            <span className="projects-counter">
              {String(
                safeIndex + 1,
              ).padStart(2, "0")}
              {" / "}
              {String(
                filteredProjects.length,
              ).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="projects-filters">
          {filters.map((filter) => {
            const isActive =
              activeFilter === filter.id;

            return (
              <button
                key={filter.id}
                type="button"
                onClick={() =>
                  handleFilterChange(
                    filter.id,
                  )
                }
                className={`projects-filter ${
                  isActive
                    ? "projects-filter-active"
                    : ""
                }`}
              >
                <Layers3 size={15} />

                <span>
                  {filter.label}
                </span>
              </button>
            );
          })}
        </div>

        {featuredProject ? (
          <div className="projects-layout">
            <AnimatePresence mode="wait">
              <motion.article
                key={`${activeFilter}-${featuredProject.title}`}
                className="projects-featured-card"
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 22,
                        scale: 0.99,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={
                  reduceMotion
                    ? {
                        opacity: 0,
                      }
                    : {
                        opacity: 0,
                        y: -14,
                        scale: 0.99,
                      }
                }
                transition={{
                  duration: 0.35,
                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
              >
                <div className="projects-featured-visual">
                  <motion.img
                    src={
                      featuredProject.image
                    }
                    alt={
                      featuredProject.title
                    }
                    className="projects-featured-image"
                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                            scale: 1.025,
                            y: -4,
                          }
                    }
                    transition={{
                      duration: 0.35,
                    }}
                  />

                  <div className="projects-featured-overlay" />

                  <div className="projects-featured-copy">
                    <div className="projects-featured-kicker">
                      <span>
                        {
                          featuredProject.shortCode
                        }
                      </span>

                      <small>
                        {
                          featuredProject.category
                        }
                      </small>
                    </div>

                    <h3>
                      {
                        featuredProject.title
                      }
                    </h3>

                    <p>
                      {
                        featuredProject.description
                      }
                    </p>

                    <div className="projects-featured-tags">
                      {featuredProject.tags.map(
                        (tag) => (
                          <span key={tag}>
                            {tag}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                </div>

                <div className="projects-featured-benefits">
                  {featuredProject.benefits.map(
                    (benefit) => {
                      const BenefitIcon =
                        benefit.icon;

                      return (
                        <div
                          key={
                            benefit.title
                          }
                          className="projects-benefit"
                        >
                          <span className="projects-benefit-icon">
                            <BenefitIcon
                              size={20}
                            />
                          </span>

                          <div>
                            <strong>
                              {
                                benefit.title
                              }
                            </strong>

                            <small>
                              {
                                benefit.description
                              }
                            </small>
                          </div>
                        </div>
                      );
                    },
                  )}
                </div>
              </motion.article>
            </AnimatePresence>

            <div className="projects-list">
              {secondaryProjects.map(
                (project) => (
                  <motion.button
                    key={project.title}
                    type="button"
                    onClick={() =>
                      handleSelectProject(
                        project.title,
                      )
                    }
                    className="projects-side-card"
                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                            x: 5,
                            y: -2,
                          }
                    }
                    transition={{
                      duration: 0.25,
                    }}
                  >
                    <div className="projects-side-image">
                      <img
                        src={project.image}
                        alt={`Vista previa de ${project.title}`}
                      />

                      <span>
                        {
                          project.shortCode
                        }
                      </span>
                    </div>

                    <div className="projects-side-copy">
                      <small>
                        {project.category}
                      </small>

                      <h3>
                        {project.title}
                      </h3>

                      <p>
                        {
                          project.shortDescription
                        }
                      </p>

                      <div className="projects-tags">
                        {project.tags
                          .slice(0, 4)
                          .map((tag) => (
                            <span key={tag}>
                              {tag}
                            </span>
                          ))}
                      </div>
                    </div>

                    <span className="projects-side-arrow">
                      <ChevronRight
                        size={18}
                      />
                    </span>
                  </motion.button>
                ),
              )}
            </div>
          </div>
        ) : (
          <div className="projects-empty">
            No hay proyectos disponibles
            para esta categoría.
          </div>
        )}

        <div className="projects-cta">
          <span className="projects-cta-icon">
            <Rocket size={24} />
          </span>

          <div>
            <strong>
              ¿Tienes una idea en mente?
            </strong>

            <p>
              Conversemos y creemos el
              siguiente gran proyecto juntos.
            </p>
          </div>

          <a href="#contacto">
            <span>
              Hablemos de tu proyecto
            </span>

            <ExternalLink size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
import { projects } from "../../data/portfolioData";

export default function Projects() {
  return (
    <section id="proyectos" className="section-shell">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="eyebrow">Proyectos destacados</p>
        <h2 className="section-title mt-3 max-w-3xl">Productos reales construidos para resolver necesidades reales.</h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <article key={project.title} className="project-card group">
              <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#07101f]">
                <img
                  src={project.image}
                  alt={`Proyecto ${project.title}`}
                  className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.025]"
                />
              </div>
              <div className="p-2 pt-6">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-400">{project.category}</p>
                <h3 className="mt-2 text-3xl font-black text-white">{project.title}</h3>
                <p className="mt-4 leading-7 text-slate-400">{project.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

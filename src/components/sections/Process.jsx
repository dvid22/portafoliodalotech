import { processSteps } from "../../data/portfolioData";

export default function Process() {
  return (
    <section id="proceso" className="section-shell bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="eyebrow">Nuestro proceso</p>

        <h2 className="section-title mt-3 max-w-3xl">
          Una metodología clara desde la idea hasta la implementación.
        </h2>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          Trabajamos mediante un proceso organizado que permite entender las
          necesidades del cliente, construir una solución sólida y acompañar su
          crecimiento después de la publicación.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {processSteps.map(([number, title, description]) => (
            <article key={number} className="glass-card p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-black tracking-[0.2em] text-blue-600">
                  {number}
                </p>

                <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                {title}
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
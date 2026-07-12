import Icon from "../common/Icon";
import { services } from "../../data/portfolioData";

export default function Services() {
  return (
    <section id="servicios" className="section-shell bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="eyebrow">Nuestros servicios</p>

        <div className="mt-3 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <h2 className="section-title max-w-3xl">
            Soluciones digitales diseñadas para crecer contigo.
          </h2>

          <p className="max-w-xl leading-7 text-slate-600">
            Desde una landing page profesional hasta una plataforma empresarial
            completa, desarrollamos soluciones modernas, escalables y enfocadas
            en resultados.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="service-card group">
              <div className="grid h-12 w-12 place-items-center rounded-2xl border border-blue-200 bg-blue-50 text-blue-600 transition group-hover:scale-105">
                <Icon name={service.icon} className="h-6 w-6" />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                {service.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                {service.description}
              </p>

              <ul className="mt-6 space-y-3">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-sm text-slate-700"
                  >
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-blue-50 text-xs font-bold text-blue-600">
                      ✓
                    </span>

                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

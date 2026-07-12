import { companyStats } from "../../data/portfolioData";

export default function About() {
  return (
    <section id="nosotros" className="section-shell">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Quiénes somos</p>
          <h2 className="section-title">Tecnología útil, diseño claro y soluciones que sí generan valor.</h2>
        </div>
        <div className="space-y-5 text-lg leading-8 text-slate-400">
          <p>
            DaloTech es una empresa especializada en el desarrollo de soluciones digitales
            para empresas, emprendimientos e instituciones que buscan optimizar procesos,
            mejorar la experiencia de sus clientes y fortalecer su presencia tecnológica.
          </p>
          <p>
            Nuestro enfoque combina estrategia, diseño y desarrollo para construir productos
            seguros, escalables y preparados para crecer junto con cada organización.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-14 grid max-w-7xl gap-4 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        {companyStats.map(([value, label]) => (
          <article key={label} className="glass-card p-6">
            <p className="text-4xl font-black text-white">{value}</p>
            <p className="mt-2 text-sm text-slate-400">{label}</p>
          </article>
        ))}
      </div>

      <div className="mx-auto mt-8 grid max-w-7xl gap-5 px-5 sm:px-8 lg:grid-cols-2">
        <article className="glass-card p-8">
          <p className="eyebrow">Misión</p>
          <p className="mt-4 text-xl leading-8 text-slate-800">
            Impulsar la transformación digital mediante soluciones tecnológicas innovadoras,
            eficientes y accesibles que modernicen las operaciones de nuestros clientes.
          </p>
        </article>
        <article className="glass-card p-8">
          <p className="eyebrow">Visión</p>
          <p className="mt-4 text-xl leading-8 text-slate-800">
            Ser una empresa referente en desarrollo de software en Colombia y Latinoamérica,
            reconocida por la calidad, la innovación y el valor generado.
          </p>
        </article>
      </div>
    </section>
  );
}

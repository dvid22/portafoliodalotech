import Icon from "../common/Icon";
import LogoScene from "../three/LogoScene";

export default function Hero() {
  const benefits = [
    "Soluciones a medida",
    "Diseño profesional",
    "Tecnología escalable",
  ];

  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-white pt-28"
    >
      <div className="hero-grid absolute inset-0 opacity-30" />

      <div className="relative mx-auto grid min-h-[88vh] max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 lg:grid-cols-[1.08fr_.92fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            <span className="h-2 w-2 animate-pulse rounded-full bg-blue-500 shadow-[0_0_16px_#38bdf8]" />

            Innovación, tecnología y crecimiento
          </div>

          <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[1.08] tracking-[-0.035em] text-slate-950 sm:text-6xl lg:text-7xl">
            Convertimos ideas en

            <span className="block bg-gradient-to-r from-[#18b6ff] via-[#1387ff] to-[#3857ff] bg-clip-text text-transparent">
              soluciones digitales
            </span>

            que impulsan negocios.
          </h1>

          <p className="mt-7 max-w-2xl text-lg font-normal leading-8 text-slate-600">
            Diseñamos plataformas web, aplicaciones
            móviles y productos SaaS modernos,
            escalables y enfocados en resultados.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#proyectos"
              className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#109cff] to-[#1746e8] px-6 py-4 font-semibold text-white shadow-xl shadow-blue-500/20 transition duration-300 hover:-translate-y-1 hover:shadow-blue-500/30"
            >
              Ver proyectos

              <Icon name="arrow" />
            </a>

            <a
              href="#contacto"
              className="rounded-2xl border border-slate-200 bg-white px-6 py-4 font-semibold text-slate-900 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
            >
              Solicitar una propuesta
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-600">
            {benefits.map((item) => (
              <span
                key={item}
                className="flex items-center gap-2"
              >
                <span className="grid h-5 w-5 place-items-center rounded-full bg-blue-50 text-blue-600">
                  ✓
                </span>

                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-12 rounded-full bg-blue-400/15 blur-3xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
            <div className="mb-4 flex items-center gap-2 px-1">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </div>

            <div className="relative overflow-hidden rounded-[1.5rem] border border-slate-200 bg-[#020611] p-7">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,125,255,0.16),transparent_70%)]" />

              <img
                src="/images/dalotech-logo.jpeg"
                alt="Identidad visual DaloTech"
                className="relative z-10 mx-auto aspect-square w-full max-w-md rounded-2xl object-cover"
              />

              <LogoScene />
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <article className="hero-info-card group">
                <span className="hero-info-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
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
                </span>

                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                    Especialidad
                  </p>

                  <p className="mt-2 font-semibold text-slate-900">
                    Software a medida
                  </p>
                </div>
              </article>

              <article className="hero-info-card group">
                <span className="hero-info-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                    />

                    <path d="M3 12h18" />

                    <path d="M12 3a15 15 0 0 1 0 18" />

                    <path d="M12 3a15 15 0 0 0 0 18" />
                  </svg>
                </span>

                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                    Cobertura
                  </p>

                  <p className="mt-2 font-semibold text-slate-900">
                    Colombia y LATAM
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
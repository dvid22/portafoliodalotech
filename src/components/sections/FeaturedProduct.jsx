export default function FeaturedProduct() {
  const features = [
    "Menú digital QR",
    "Gestión de pedidos en tiempo real",
    "Gestión de clientes",
    "Facturación electrónica",
    "Contabilidad inteligente",
    "Reportes y estadísticas",
    "Control de ventas",
    "Acceso desde cualquier dispositivo",
  ];

  return (
    <section className="section-shell pt-0">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-blue-400/20 bg-gradient-to-br from-blue-500/15 via-[#081427] to-[#030712] p-7 sm:p-10 lg:p-14">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <div>
              <p className="eyebrow">Producto destacado</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">Menú QR SaaS</h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                Todo lo que un negocio gastronómico necesita en un solo sistema.
                Diseñado para restaurantes, cafeterías, bares y gastrobares.
              </p>
              <a
                href="#contacto"
                className="mt-8 inline-flex rounded-2xl bg-white px-6 py-4 font-bold text-[#06101f] transition hover:-translate-y-1"
              >
                Solicitar una demo
              </a>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {features.map((feature) => (
                <div key={feature} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm font-medium text-slate-200 backdrop-blur">
                  <span className="mr-2 text-blue-400">✓</span>{feature}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

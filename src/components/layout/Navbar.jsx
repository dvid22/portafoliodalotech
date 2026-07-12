import { useState } from "react";
import Icon from "../common/Icon";

const links = [
  ["Inicio", "#inicio"],
  ["Nosotros", "#nosotros"],
  ["Servicios", "#servicios"],
  ["Proyectos", "#proyectos"],
  ["Proceso", "#proceso"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#inicio" className="flex items-center gap-4">
          <img
            src="/images/dalotech-logo.jpeg"
            alt="Logo de DaloTech"
            className="h-16 w-16 rounded-2xl object-cover ring-1 ring-slate-200"
          />

          <div>
            <p className="text-2xl font-semibold tracking-tight text-slate-900">
              Dalo<span className="text-[#087bea]">Tech</span>
            </p>

            <p className="mt-1 text-[11px] font-medium tracking-[0.28em] text-slate-400">
              DESARROLLAMOS EL FUTURO
            </p>
          </div>
        </a>

        <nav className="hidden items-center gap-9 lg:flex">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-base font-medium text-slate-900 transition duration-300 hover:text-blue-600"
            >
              {label}
            </a>
          ))}

          <a
            href="#contacto"
            className="rounded-2xl bg-gradient-to-r from-[#109cff] to-[#1746e8] px-7 py-4 font-semibold text-white shadow-lg shadow-blue-500/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-blue-500/30"
          >
            Hablemos
          </a>
        </nav>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white text-slate-900 shadow-sm lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>

      {open && (
        <nav className="border-t border-slate-200 bg-white px-5 py-5 shadow-lg lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {links.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 font-medium text-slate-800 transition hover:bg-blue-50 hover:text-blue-600"
              >
                {label}
              </a>
            ))}

            <a
              href="#contacto"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-xl bg-gradient-to-r from-[#109cff] to-[#1746e8] px-4 py-3 text-center font-semibold text-white"
            >
              Contáctanos
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
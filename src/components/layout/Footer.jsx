export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-8 text-sm text-slate-500 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 sm:flex-row">
        <p>© {new Date().getFullYear()} DaloTech. Todos los derechos reservados.</p>
        <p>Desarrollamos el futuro.</p>
      </div>
    </footer>
  );
}

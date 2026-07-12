const paths = {
  web: "M3 5h18v14H3z M3 9h18 M7 7h.01 M10 7h.01",
  app: "M4 4h16v16H4z M8 8h8 M8 12h5 M8 16h3",
  mobile: "M8 2h8v20H8z M11 18h2",
  shop: "M4 7h16l-1 13H5z M7 7a5 5 0 0 1 10 0",
  cloud: "M7 18h10a4 4 0 0 0 0-8 6 6 0 0 0-11.5 1.5A3.5 3.5 0 0 0 7 18z",
  automation: "M12 2v4 M12 18v4 M4.93 4.93l2.83 2.83 M16.24 16.24l2.83 2.83 M2 12h4 M18 12h4 M4.93 19.07l2.83-2.83 M16.24 7.76l2.83-2.83 M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  arrow: "M5 12h14 M13 6l6 6-6 6",
  check: "M5 12l4 4L19 6",
  menu: "M4 7h16 M4 12h16 M4 17h16",
  close: "M6 6l12 12 M18 6L6 18",
};

export default function Icon({ name, className = "h-5 w-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={paths[name] || paths.arrow} />
    </svg>
  );
}

function WhatsAppIcon({ size = 27 }) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.04 3C8.84 3 3 8.74 3 15.82c0 2.55.76 5.04 2.18 7.14L3.75 29l6.2-1.38a13.15 13.15 0 0 0 6.09 1.5C23.24 29.12 29 23.38 29 16.3 29 9.22 23.24 3 16.04 3Zm0 23.81c-1.88 0-3.72-.51-5.33-1.47l-.38-.22-3.68.82.87-3.56-.24-.37a10.44 10.44 0 0 1-1.67-5.69c0-5.74 4.67-10.4 10.43-10.4 5.75 0 10.43 4.66 10.43 10.4 0 5.74-4.68 10.49-10.43 10.49Z" />

      <path d="M21.77 18.56c-.31-.16-1.84-.91-2.13-1.01-.29-.11-.5-.16-.71.16-.21.31-.82 1.01-1 1.22-.18.21-.37.23-.68.08-.31-.16-1.32-.49-2.51-1.56-.93-.82-1.55-1.84-1.73-2.15-.18-.31-.02-.48.14-.63.14-.14.31-.37.47-.55.16-.18.21-.31.31-.52.11-.21.05-.39-.03-.55-.08-.16-.71-1.7-.97-2.33-.26-.62-.52-.54-.71-.55h-.61c-.21 0-.55.08-.84.39-.29.31-1.1 1.07-1.1 2.62 0 1.54 1.13 3.03 1.29 3.24.16.21 2.22 3.39 5.38 4.75.75.32 1.34.52 1.8.66.76.24 1.44.21 1.99.13.61-.09 1.84-.75 2.1-1.48.26-.73.26-1.35.18-1.48-.08-.13-.29-.21-.6-.37Z" />
    </svg>
  );
}

export default function WhatsAppFloatingButton() {
  return (
    <>
      <style>{`
        .whatsapp-floating {
          position: fixed;
          right: 22px;
          bottom: 22px;
          z-index: 1000;

          display: grid;
          place-items: center;

          width: 58px;
          height: 58px;

          border: 1px solid rgba(255, 255, 255, 0.32);
          border-radius: 18px;

          background: linear-gradient(
            145deg,
            #25d366,
            #18b954
          );

          color: #ffffff;
          text-decoration: none;

          box-shadow:
            0 16px 35px rgba(37, 211, 102, 0.28),
            inset 0 1px 0 rgba(255, 255, 255, 0.25);

          transition:
            transform 180ms ease,
            box-shadow 180ms ease,
            filter 180ms ease;
        }

        .whatsapp-floating:hover {
          transform: translateY(-4px) scale(1.04);
          filter: brightness(1.03);

          box-shadow:
            0 21px 42px rgba(37, 211, 102, 0.36),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }

        .whatsapp-floating:active {
          transform: scale(0.97);
        }

        .whatsapp-floating__pulse {
          position: absolute;
          inset: -6px;
          z-index: -1;

          border: 1px solid rgba(37, 211, 102, 0.32);
          border-radius: 23px;

          animation: whatsapp-pulse 2.4s ease-out infinite;
        }

        @keyframes whatsapp-pulse {
          0% {
            opacity: 0.7;
            transform: scale(0.88);
          }

          70%,
          100% {
            opacity: 0;
            transform: scale(1.18);
          }
        }

        @media (max-width: 640px) {
          .whatsapp-floating {
            right: 14px;
            bottom: 14px;

            width: 52px;
            height: 52px;

            border-radius: 16px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .whatsapp-floating,
          .whatsapp-floating__pulse {
            animation: none;
            transition: none;
          }
        }
      `}</style>

      <a
        href="https://wa.me/573227173244?text=Hola%20DaloTech,%20quiero%20información%20sobre%20sus%20servicios."
        target="_blank"
        rel="noreferrer"
        className="whatsapp-floating"
        aria-label="Hablar con DaloTech por WhatsApp"
        title="Hablar por WhatsApp"
      >
        <span className="whatsapp-floating__pulse" />

        <WhatsAppIcon size={28} />
      </a>
    </>
  );
}
import { useEffect, useId, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

const EASE = [0.22, 1, 0.36, 1];

const EXPERIENCES = ["web", "mobile", "saas"];

const SCENE_STYLES = `
  .dtx-scene,
  .dtx-scene *,
  .dtx-scene *::before,
  .dtx-scene *::after {
    box-sizing: border-box;
  }

  .dtx-scene {
    position: absolute;
    inset: 0;
    z-index: 7;
    width: 100%;
    height: 100%;
    overflow: visible;
    pointer-events: none;
    container-type: inline-size;
    font-family: "Poppins", sans-serif;
  }

  .dtx-scene__ambient {
    position: absolute;
    inset: 0;
    z-index: 0;
    overflow: visible;
  }

  .dtx-scene__halo {
    position: absolute;
    border-radius: 50%;
    filter: blur(clamp(1rem, 2.4cqi, 2rem));
    opacity: 0.52;
  }

  .dtx-scene__halo--web {
    top: 7%;
    left: 17%;
    width: 24%;
    aspect-ratio: 1;
    background: rgba(50, 162, 255, 0.11);
  }

  .dtx-scene__halo--mobile {
    top: 2%;
    left: 50%;
    width: 21%;
    aspect-ratio: 1;
    background: rgba(63, 198, 255, 0.1);
    transform: translateX(-50%);
  }

  .dtx-scene__halo--saas {
    top: 8%;
    right: 5%;
    width: 23%;
    aspect-ratio: 1;
    background: rgba(49, 109, 246, 0.1);
  }

  .dtx-scene__network {
    position: absolute;
    inset: 0;
    z-index: 1;
    overflow: visible;
  }

  .dtx-scene__network svg {
    width: 100%;
    height: 100%;
    display: block;
    overflow: visible;
  }

  .dtx-panel {
    position: absolute;
    z-index: 5;
    isolation: isolate;
    transform-style: preserve-3d;
    will-change: transform, opacity, filter;
  }

  /* =========================
     UBICACIÓN DE LAS CARDS
     Ajustadas para parecerse más al mockup
  ========================= */

  .dtx-panel--web {
    top: 10%;
    left: 19%;
    width: clamp(10.2rem, 20cqi, 13rem);
    aspect-ratio: 1.62 / 1;
    translate: -50% 0;
  }

  .dtx-panel--mobile {
    top: 6%;
    left: 52%;
    width: clamp(8rem, 15.5cqi, 10.2rem);
    aspect-ratio: 0.98 / 1;
    translate: -50% 0;
  }

  .dtx-panel--saas {
    top: 10%;
    left: 82%;
    width: clamp(10rem, 19cqi, 12.3rem);
    aspect-ratio: 1.12 / 1;
    translate: -50% 0;
  }

  .dtx-panel__glass {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border: 1px solid rgba(47, 112, 220, 0.16);
    border-radius: clamp(0.95rem, 1.8cqi, 1.2rem);
    background:
      radial-gradient(
        circle at 20% 0%,
        rgba(67, 196, 255, 0.14),
        transparent 38%
      ),
      linear-gradient(
        145deg,
        rgba(255, 255, 255, 0.985),
        rgba(239, 247, 255, 0.94)
      );
    box-shadow:
      0 1.15rem 2.7rem rgba(19, 60, 138, 0.12),
      0 0.35rem 1rem rgba(34, 103, 217, 0.07),
      inset 0 1px 0 rgba(255, 255, 255, 1);
    backdrop-filter: blur(1rem);
    -webkit-backdrop-filter: blur(1rem);
  }

  .dtx-panel--saas .dtx-panel__glass {
    border-radius:
      clamp(0.95rem, 1.8cqi, 1.2rem)
      clamp(0.95rem, 1.8cqi, 1.2rem)
      clamp(1.35rem, 2.3cqi, 1.75rem)
      clamp(0.8rem, 1.3cqi, 0.95rem);
  }

  .dtx-panel--mobile .dtx-panel__glass {
    border: 0;
    background: transparent;
    box-shadow: none;
    overflow: visible;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }

  .dtx-panel__glass::after {
    content: "";
    position: absolute;
    top: -80%;
    left: -55%;
    z-index: 20;
    width: 30%;
    height: 260%;
    transform: rotate(17deg);
    background:
      linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.76),
        transparent
      );
    opacity: 0;
    animation: dtx-shine 8.4s ease-in-out infinite;
    pointer-events: none;
  }

  .dtx-panel--mobile .dtx-panel__glass::after {
    display: none;
  }

  .dtx-svg {
    width: 100%;
    height: 100%;
    display: block;
    overflow: visible;
  }

  /* =========================
     WEB CARD
  ========================= */

  .dtx-browser {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .dtx-browser__bar {
    height: 16%;
    padding-inline: 6%;
    display: flex;
    align-items: center;
    gap: 4px;
    border-bottom: 1px solid rgba(30, 87, 181, 0.09);
    background:
      linear-gradient(
        180deg,
        rgba(241, 247, 255, 0.96),
        rgba(233, 243, 255, 0.9)
      );
  }

  .dtx-browser__dot {
    width: clamp(2px, 0.55cqi, 4px);
    aspect-ratio: 1;
    border-radius: 50%;
    background: #adc9ef;
  }

  .dtx-browser__dot:first-child {
    background: #2d8eff;
  }

  .dtx-browser__address {
    flex: 1;
    height: clamp(4px, 1cqi, 7px);
    margin-left: 4px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.94);
    box-shadow: inset 0 0 0 1px rgba(25, 80, 172, 0.07);
  }

  /* =========================
     MOBILE EXPERIENCE
  ========================= */

  .dtx-mobile {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .dtx-mobile__phone {
    position: absolute;
    left: 6%;
    bottom: 0;
    width: 60%;
    height: 95%;
    overflow: hidden;
    border: clamp(2px, 0.45cqi, 4px) solid #112d6c;
    border-radius: clamp(1rem, 2.6cqi, 1.55rem);
    background:
      linear-gradient(
        160deg,
        #1b4b9c,
        #0c245c 68%,
        #07183f
      );
    box-shadow:
      0 1.2rem 2.25rem rgba(13, 39, 92, 0.22),
      inset 0 1px 0 rgba(255, 255, 255, 0.24);
  }

  .dtx-mobile__phone::before {
    content: "";
    position: absolute;
    top: 4px;
    left: 50%;
    z-index: 10;
    width: 25%;
    height: clamp(3px, 0.7cqi, 5px);
    transform: translateX(-50%);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.7);
  }

  .dtx-mobile__screen {
    position: absolute;
    inset:
      clamp(0.35rem, 0.9cqi, 0.5rem)
      clamp(0.22rem, 0.55cqi, 0.35rem)
      clamp(0.28rem, 0.65cqi, 0.4rem);
    overflow: hidden;
    border-radius: clamp(0.75rem, 2cqi, 1.1rem);
    background:
      radial-gradient(
        circle at 75% 14%,
        rgba(71, 208, 255, 0.27),
        transparent 35%
      ),
      linear-gradient(
        160deg,
        #f9fcff,
        #e7f2ff
      );
  }

  .dtx-mobile__build {
    position: absolute;
    top: 16%;
    right: -3%;
    z-index: 12;
    width: 53%;
    padding: clamp(0.4rem, 1.1cqi, 0.65rem);
    border: 1px solid rgba(43, 105, 213, 0.13);
    border-radius: clamp(0.65rem, 1.7cqi, 0.95rem);
    background: rgba(255, 255, 255, 0.97);
    box-shadow:
      0 0.95rem 2rem rgba(22, 64, 139, 0.14),
      inset 0 1px 0 #ffffff;
    backdrop-filter: blur(0.8rem);
  }

  .dtx-mobile__build-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.25rem;
    color: #16346e;
    font-size: clamp(0.34rem, 0.85cqi, 0.48rem);
    font-weight: 600;
  }

  .dtx-mobile__build-status {
    color: #29a475;
  }

  .dtx-mobile__progress {
    position: relative;
    height: clamp(3px, 0.75cqi, 5px);
    margin-top: clamp(0.3rem, 0.75cqi, 0.45rem);
    overflow: hidden;
    border-radius: 999px;
    background: #dceafa;
  }

  .dtx-mobile__progress-fill {
    position: absolute;
    inset: 0;
    transform-origin: left center;
    border-radius: inherit;
    background:
      linear-gradient(
        90deg,
        #36caff,
        #2462f2
      );
  }

  .dtx-mobile__terminal {
    display: grid;
    gap: clamp(2px, 0.5cqi, 4px);
    margin-top: clamp(0.3rem, 0.75cqi, 0.45rem);
  }

  .dtx-mobile__terminal-line {
    height: clamp(2px, 0.55cqi, 4px);
    border-radius: 999px;
    background: #d4e4f8;
  }

  .dtx-mobile__terminal-line:nth-child(2) {
    width: 76%;
  }

  .dtx-mobile__terminal-line:nth-child(3) {
    width: 52%;
  }

  .dtx-mobile__badge {
    position: absolute;
    z-index: 14;
    width: 27%;
    aspect-ratio: 1;
    display: grid;
    place-items: center;
    border: 1px solid rgba(38, 102, 213, 0.12);
    border-radius: clamp(0.55rem, 1.45cqi, 0.8rem);
    background: rgba(255, 255, 255, 0.97);
    box-shadow:
      0 0.7rem 1.4rem rgba(23, 66, 142, 0.1);
  }

  .dtx-mobile__badge--ios {
    right: -1%;
    bottom: 8%;
  }

  .dtx-mobile__badge--android {
    right: 21%;
    bottom: -3%;
  }

  /* =========================
     SAAS
  ========================= */

  .dtx-saas {
    position: relative;
    width: 100%;
    height: 100%;
    padding: clamp(0.35rem, 1cqi, 0.55rem);
  }

  .dtx-saas__header {
    height: 18%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.35rem;
  }

  .dtx-saas__title {
    color: #17356f;
    font-size: clamp(0.42rem, 1cqi, 0.58rem);
    font-weight: 600;
  }

  .dtx-saas__status {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    color: #2682f6;
    font-size: clamp(0.3rem, 0.7cqi, 0.42rem);
    font-weight: 600;
  }

  .dtx-saas__status::before {
    content: "";
    width: clamp(3px, 0.7cqi, 5px);
    aspect-ratio: 1;
    border-radius: 50%;
    background: #2dc498;
    box-shadow:
      0 0 0.45rem rgba(45, 196, 152, 0.65);
  }

  .dtx-saas__body {
    position: relative;
    height: 82%;
    overflow: hidden;
    border-radius: clamp(0.65rem, 1.4cqi, 0.9rem);
    background:
      linear-gradient(
        145deg,
        #ffffff,
        #edf6ff
      );
    box-shadow:
      inset 0 0 0 1px rgba(35, 91, 186, 0.09);
  }

  /* =========================
     CONECTORES A PERSONAJES
  ========================= */

  .dtx-connector {
    position: absolute;
    z-index: 2;
    overflow: visible;
  }

  .dtx-connector--web {
    top: 19%;
    left: 22%;
    width: 22%;
    height: 35%;
  }

  .dtx-connector--mobile {
    top: 15%;
    left: 54%;
    width: 18%;
    height: 29%;
  }

  .dtx-connector--saas {
    top: 19%;
    left: 73%;
    width: 17%;
    height: 43%;
  }

  .dtx-connector__line {
    fill: none;
    stroke: rgba(43, 139, 255, 0.42);
    stroke-width: 1.2;
    stroke-linecap: round;
    stroke-dasharray: 4 7;
  }

  .dtx-connector__pulse {
    fill: #45c9ff;
    filter: drop-shadow(0 0 5px rgba(69, 201, 255, 0.85));
  }

  .dtx-node {
    position: absolute;
    z-index: 3;
    width: clamp(5px, 1cqi, 7px);
    aspect-ratio: 1;
    border: 2px solid #ffffff;
    border-radius: 50%;
    background: #268fff;
    box-shadow:
      0 0 0 4px rgba(38, 143, 255, 0.08),
      0 0 12px rgba(38, 143, 255, 0.52);
  }

  /* anclas visuales cerca de los personajes */
  .dtx-node--web {
    top: 50%;
    left: 42.2%;
  }

  .dtx-node--mobile {
    top: 43.2%;
    left: 69.2%;
  }

  .dtx-node--saas {
    top: 67.6%;
    left: 84.4%;
  }

  .dtx-scene__pager {
    position: absolute;
    left: 50%;
    top: 3%;
    z-index: 20;
    display: none;
    align-items: center;
    gap: 0.35rem;
    transform: translateX(-50%);
  }

  .dtx-scene__pager-dot {
    width: 0.36rem;
    height: 0.36rem;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: #b7c9e4;
    transition:
      width 180ms ease,
      border-radius 180ms ease,
      background 180ms ease;
  }

  .dtx-scene__pager-dot.is-active {
    width: 1.2rem;
    border-radius: 999px;
    background: #2473f5;
  }

  @keyframes dtx-shine {
    0%, 68% {
      left: -55%;
      opacity: 0;
    }

    75% {
      opacity: 0.48;
    }

    90%, 100% {
      left: 132%;
      opacity: 0;
    }
  }

  /* =========================
     COMPACTO RESPONSIVE
  ========================= */

  @container (max-width: 36rem) {
    .dtx-scene__pager {
      display: flex;
    }

    .dtx-panel {
      top: 8%;
      left: 50%;
      transform: translateX(-50%);
    }

    .dtx-panel--web {
      width: min(49%, 12rem);
    }

    .dtx-panel--mobile {
      width: min(39%, 9rem);
    }

    .dtx-panel--saas {
      width: min(46%, 11rem);
    }

    .dtx-connector,
    .dtx-node,
    .dtx-scene__network {
      display: none;
    }

    .dtx-scene__halo--web,
    .dtx-scene__halo--mobile,
    .dtx-scene__halo--saas {
      top: 7%;
      left: 50%;
      right: auto;
      width: 56%;
      transform: translateX(-50%);
    }
  }

  @container (max-width: 23rem) {
    .dtx-panel--web {
      width: min(56%, 10rem);
    }

    .dtx-panel--mobile {
      width: min(44%, 8rem);
    }

    .dtx-panel--saas {
      width: min(52%, 9.5rem);
    }
  }


  /* =========================
     MOBILE SCENE FINAL
     Centrado real + transición nítida
  ========================= */

  .dtx-scene.is-compact {
    overflow: hidden;
    contain: layout paint;
  }

  .dtx-scene.is-compact .dtx-scene__ambient,
  .dtx-scene.is-compact .dtx-scene__network,
  .dtx-scene.is-compact .dtx-connector,
  .dtx-scene.is-compact .dtx-node {
    display: none;
  }

  .dtx-scene.is-compact .dtx-panel {
    top: 5%;
    left: 50%;
    translate: -50% 0;
    will-change: transform, opacity;
  }

  .dtx-scene.is-compact .dtx-panel__glass {
    border-radius: 1rem;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    box-shadow:
      0 0.9rem 2rem rgba(19, 60, 138, 0.11),
      0 0.2rem 0.7rem rgba(34, 103, 217, 0.05),
      inset 0 1px 0 #ffffff;
  }

  .dtx-scene.is-compact .dtx-panel__glass::after {
    display: none;
  }

  .dtx-scene.is-compact .dtx-panel--web {
    width: min(72%, 15rem);
    aspect-ratio: 1.62 / 1;
  }

  .dtx-scene.is-compact .dtx-panel--mobile {
    width: min(56%, 11.2rem);
    aspect-ratio: 0.92 / 1.08;
  }

  .dtx-scene.is-compact .dtx-panel--saas {
    width: min(68%, 14rem);
    aspect-ratio: 1.14 / 1;
  }

  .dtx-scene.is-compact .dtx-panel--mobile .dtx-panel__glass {
    box-shadow: none;
  }

  .dtx-scene.is-compact .dtx-mobile__phone {
    left: 4%;
    width: 62%;
    height: 96%;
  }

  .dtx-scene.is-compact .dtx-mobile__build {
    right: -1%;
    width: 55%;
  }

  .dtx-scene.is-compact .dtx-scene__pager {
    top: auto;
    bottom: 4%;
    display: flex;
    gap: 0.42rem;
  }

  .dtx-scene.is-compact .dtx-scene__pager-dot {
    width: 0.42rem;
    height: 0.42rem;
    background: #b7c9e4;
    box-shadow: 0 0 0 3px rgba(255,255,255,0.82);
  }

  .dtx-scene.is-compact .dtx-scene__pager-dot.is-active {
    width: 1.45rem;
    background: #2473f5;
  }

  @container (max-width: 30rem) {
    .dtx-scene.is-compact .dtx-panel {
      top: 6%;
    }

    .dtx-scene.is-compact .dtx-panel--web {
      width: min(78%, 14rem);
    }

    .dtx-scene.is-compact .dtx-panel--mobile {
      width: min(62%, 10.5rem);
    }

    .dtx-scene.is-compact .dtx-panel--saas {
      width: min(74%, 13rem);
    }
  }

  @container (max-width: 22rem) {
    .dtx-scene.is-compact .dtx-panel--web {
      width: min(84%, 12.5rem);
    }

    .dtx-scene.is-compact .dtx-panel--mobile {
      width: min(68%, 9.5rem);
    }

    .dtx-scene.is-compact .dtx-panel--saas {
      width: min(80%, 11.5rem);
    }

    .dtx-scene.is-compact .dtx-scene__pager {
      bottom: 2%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .dtx-scene *,
    .dtx-scene *::before,
    .dtx-scene *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

function PanelMotion({
  className,
  delay,
  duration,
  reduceMotion,
  compact = false,
  children,
}) {
  return (
    <motion.div
      className={`dtx-panel ${className}`}
      initial={
        reduceMotion
          ? false
          : compact
            ? {
                opacity: 0,
                x: 34,
                y: 8,
                scale: 0.96,
              }
            : {
                opacity: 0,
                y: 18,
                scale: 0.9,
              }
      }
      animate={
        compact
          ? {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
            }
          : {
              opacity: 1,
              x: 0,
              y: reduceMotion ? 0 : [0, -5, 0],
              scale: 1,
            }
      }
      exit={
        compact
          ? {
              opacity: 0,
              x: -34,
              y: 4,
              scale: 0.97,
            }
          : {
              opacity: 0,
              y: 8,
              scale: 0.93,
            }
      }
      transition={
        compact
          ? {
              opacity: {
                duration: 0.34,
                ease: EASE,
              },
              x: {
                duration: 0.46,
                ease: EASE,
              },
              y: {
                duration: 0.46,
                ease: EASE,
              },
              scale: {
                duration: 0.46,
                ease: EASE,
              },
            }
          : {
              opacity: {
                duration: 0.58,
                delay,
                ease: EASE,
              },
              scale: {
                duration: 0.72,
                delay,
                ease: EASE,
              },
              y: reduceMotion
                ? { duration: 0 }
                : {
                    duration,
                    delay: delay + 0.9,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
            }
      }
      style={{
        transformPerspective: 1200,
      }}
      aria-hidden="true"
    >
      <div className="dtx-panel__glass">
        {children}
      </div>
    </motion.div>
  );
}

function CharacterNetwork({ reduceMotion }) {
  return (
    <div className="dtx-scene__network" aria-hidden="true">
      <svg viewBox="0 0 1000 700" preserveAspectRatio="none">
        <motion.path
          d="M195 215C270 245 265 350 340 360C404 368 414 278 473 276C555 273 567 351 636 345C707 338 718 273 794 272"
          fill="none"
          stroke="rgba(53, 145, 255, 0.28)"
          strokeWidth="2"
          strokeDasharray="6 10"
          initial={reduceMotion ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 1.7,
            delay: 0.35,
            ease: EASE,
          }}
        />

        <motion.path
          d="M215 378C316 356 394 304 494 300C610 295 714 337 818 413"
          fill="none"
          stroke="rgba(67, 146, 255, 0.14)"
          strokeWidth="1.6"
          strokeDasharray="5 12"
          initial={reduceMotion ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 1.6,
            delay: 0.7,
            ease: EASE,
          }}
        />
      </svg>
    </div>
  );
}

/* =========================================================
   WEB
========================================================= */

function WebExperience({ reduceMotion, prefix }) {
  const bars = [46, 70, 58, 88, 66, 95, 78];

  return (
    <div className="dtx-browser">
      <div className="dtx-browser__bar">
        <span className="dtx-browser__dot" />
        <span className="dtx-browser__dot" />
        <span className="dtx-browser__dot" />
        <span className="dtx-browser__address" />
      </div>

      <motion.svg
        viewBox="0 0 280 142"
        className="dtx-svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id={`${prefix}-web-blue`}
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop stopColor="#31c8ff" />
            <stop offset="1" stopColor="#2459ef" />
          </linearGradient>

          <linearGradient
            id={`${prefix}-web-area`}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop stopColor="#39baff" stopOpacity="0.43" />
            <stop offset="1" stopColor="#2b68ef" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        <motion.rect
          x="10"
          y="9"
          width="43"
          height="123"
          rx="8"
          fill="#edf5ff"
          initial={reduceMotion ? false : { x: -18, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: 0.48,
            delay: 0.35,
            ease: EASE,
          }}
        />

        {[24, 42, 60, 78, 96].map((y, index) => (
          <motion.rect
            key={y}
            x="20"
            y={y}
            width={index === 0 ? 23 : 17}
            height="4"
            rx="2"
            fill={index === 0 ? "#2b84f8" : "#bdd5f5"}
            initial={reduceMotion ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            style={{ transformOrigin: "20px center" }}
            transition={{
              duration: 0.32,
              delay: 0.52 + index * 0.07,
            }}
          />
        ))}

        {[
          {
            x: 63,
            width: 58,
            value: "$24.8K",
          },
          {
            x: 127,
            width: 58,
            value: "18.2%",
          },
          {
            x: 191,
            width: 79,
            value: "94.6%",
          },
        ].map((item, index) => (
          <motion.g
            key={item.x}
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: -9,
                    scale: 0.82,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 19,
              delay: 0.66 + index * 0.1,
            }}
          >
            <rect
              x={item.x}
              y="9"
              width={item.width}
              height="38"
              rx="7"
              fill="#ffffff"
              stroke="#d5e5f8"
            />

            <text
              x={item.x + 7}
              y="33"
              fontSize="8"
              fontFamily="Poppins"
              fontWeight="700"
              fill="#17346d"
            >
              {item.value}
            </text>
          </motion.g>
        ))}

        <motion.rect
          x="63"
          y="55"
          width="137"
          height="77"
          rx="9"
          fill="#ffffff"
          stroke="#d4e4f8"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.48,
            delay: 0.92,
            ease: EASE,
          }}
        />

        {[75, 94, 113].map((y) => (
          <line
            key={y}
            x1="74"
            x2="190"
            y1={y}
            y2={y}
            stroke="#edf3fc"
            strokeWidth="1"
          />
        ))}

        <motion.path
          d="
            M74 119
            C88 101 101 111 114 92
            C128 73 141 101 155 83
            C167 67 179 84 191 70
          "
          fill="none"
          stroke="#2a7df6"
          strokeWidth="3"
          strokeLinecap="round"
          initial={reduceMotion ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 1.05,
            delay: 1.2,
            ease: EASE,
          }}
        />

        <motion.path
          d="
            M74 119
            C88 101 101 111 114 92
            C128 73 141 101 155 83
            C167 67 179 84 191 70
            V124
            H74
            Z
          "
          fill={`url(#${prefix}-web-area)`}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: 1.62,
          }}
        />

        <motion.rect
          x="208"
          y="55"
          width="62"
          height="77"
          rx="9"
          fill="#ffffff"
          stroke="#d4e4f8"
          initial={reduceMotion ? false : { opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.48,
            delay: 1.05,
            ease: EASE,
          }}
        />

        {bars.map((value, index) => (
          <motion.rect
            key={index}
            x={216 + index * 7}
            y={123 - value * 0.5}
            width="4"
            height={value * 0.5}
            rx="2"
            fill={
              index === bars.length - 1
                ? `url(#${prefix}-web-blue)`
                : "#b9d4f5"
            }
            initial={reduceMotion ? false : { scaleY: 0 }}
            animate={{ scaleY: 1 }}
            style={{
              transformOrigin: `${218 + index * 7}px 123px`,
            }}
            transition={{
              duration: 0.43,
              delay: 1.25 + index * 0.07,
              ease: EASE,
            }}
          />
        ))}

        {!reduceMotion && (
          <motion.g
            animate={{
              x: [0, 48, 92, 72, 16],
              y: [0, 18, 4, 38, 15],
            }}
            transition={{
              duration: 5.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.8,
            }}
          >
            <path
              d="M92 59L104 76L97 77L93 85Z"
              fill="#112b62"
              stroke="#ffffff"
              strokeWidth="1"
            />
          </motion.g>
        )}
      </motion.svg>
    </div>
  );
}

/* =========================================================
   MOBILE
========================================================= */

function AppleMark() {
  return (
    <svg viewBox="0 0 32 32" width="58%" height="58%" aria-hidden="true">
      <path
        fill="#14244d"
        d="M20.5 10.4c-1.7-.1-3.1 1-4 1-1 0-2.3-1-3.8-1-1.9 0-3.7 1.1-4.7 2.8-2 3.5-.5 8.6 1.4 11.4 1 1.4 2.1 2.9 3.6 2.9 1.5-.1 2-.9 3.8-.9 1.8 0 2.4.9 4 .9 1.6 0 2.6-1.4 3.5-2.8 1.1-1.6 1.6-3.2 1.6-3.3-.1 0-3.1-1.2-3.1-4.8 0-3 2.4-4.4 2.5-4.5-1.3-2.1-3.6-1.7-4.4-1.7h-.4zm1-5.2c.8-1 2.1-1.8 3.4-1.9.2 1.5-.4 2.9-1.2 3.9-.8 1-2 1.7-3.2 1.7-.2-1.3.3-2.7 1-3.7z"
      />
    </svg>
  );
}

function AndroidMark() {
  return (
    <svg viewBox="0 0 32 32" width="62%" height="62%" aria-hidden="true">
      <g fill="#34a853">
        <path d="M8 12h16v11c0 3-2 5-5 5h-6c-3 0-5-2-5-5V12z" />
        <path d="M9.5 11c1-4 3.3-6 6.5-6s5.5 2 6.5 6h-13z" />
      </g>

      <path
        d="M11 5L9 2M21 5l2-3"
        stroke="#34a853"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <circle cx="13" cy="8" r="1" fill="#ffffff" />
      <circle cx="19" cy="8" r="1" fill="#ffffff" />
    </svg>
  );
}

function MobileExperience({ reduceMotion, prefix }) {
  return (
    <div className="dtx-mobile">
      <motion.div
        className="dtx-mobile__phone"
        initial={reduceMotion ? false : { opacity: 0, scaleY: 0.18 }}
        animate={{ opacity: 1, scaleY: 1 }}
        style={{ transformOrigin: "center bottom" }}
        transition={{
          duration: 0.72,
          delay: 0.45,
          ease: EASE,
        }}
      >
        <div className="dtx-mobile__screen">
          <motion.svg viewBox="0 0 100 180" className="dtx-svg" aria-hidden="true">
            <defs>
              <linearGradient
                id={`${prefix}-mobile-hero`}
                x1="0"
                y1="0"
                x2="1"
                y2="1"
              >
                <stop stopColor="#3ad2ff" />
                <stop offset="1" stopColor="#2458ef" />
              </linearGradient>
            </defs>

            <motion.rect
              x="9"
              y="14"
              width="82"
              height="49"
              rx="12"
              fill={`url(#${prefix}-mobile-hero)`}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.65 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ transformOrigin: "50px 38px" }}
              transition={{
                type: "spring",
                stiffness: 225,
                damping: 18,
                delay: 0.82,
              }}
            />

            <motion.circle
              cx="50"
              cy="38"
              r="10"
              fill="rgba(255,255,255,.94)"
              animate={reduceMotion ? undefined : { scale: [1, 1.15, 1] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {[90, 108, 126].map((y, index) => (
              <motion.g
                key={y}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.38,
                  delay: 1.12 + index * 0.12,
                }}
              >
                <rect
                  x="9"
                  y={y}
                  width="82"
                  height="13"
                  rx="6.5"
                  fill="#ffffff"
                  stroke="#d5e4f7"
                />

                <circle
                  cx="19"
                  cy={y + 6.5}
                  r="3"
                  fill={index === 1 ? "#36c894" : "#2d82f7"}
                />

                <rect
                  x="27"
                  y={y + 4}
                  width={index === 1 ? 37 : 48}
                  height="5"
                  rx="2.5"
                  fill="#bed4f1"
                />
              </motion.g>
            ))}

            <motion.rect
              x="9"
              y="149"
              width="82"
              height="21"
              rx="10.5"
              fill="#2462f2"
              initial={reduceMotion ? false : { opacity: 0, y: 9 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 1.48,
              }}
            />

            {!reduceMotion && (
              <motion.circle
                cx="17"
                cy="159.5"
                r="3"
                fill="#ffffff"
                animate={{
                  cx: [17, 50, 83, 50, 17],
                  opacity: [0, 1, 1, 1, 0],
                }}
                transition={{
                  duration: 4.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.8,
                }}
              />
            )}
          </motion.svg>
        </div>
      </motion.div>

      <motion.div
        className="dtx-mobile__build"
        initial={reduceMotion ? false : { opacity: 0, x: 15, scale: 0.88 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{
          duration: 0.52,
          delay: 0.98,
          ease: EASE,
        }}
      >
        <div className="dtx-mobile__build-title">
          <span>Build #184</span>
          <motion.span
            className="dtx-mobile__build-status"
            animate={reduceMotion ? undefined : { opacity: [0.55, 1, 0.55] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Running
          </motion.span>
        </div>

        <div className="dtx-mobile__progress">
          <motion.span
            className="dtx-mobile__progress-fill"
            initial={reduceMotion ? false : { scaleX: 0 }}
            animate={{ scaleX: [0, 0.35, 0.67, 1, 1, 0] }}
            transition={{
              duration: 5.8,
              delay: 1.2,
              repeat: Infinity,
              times: [0, 0.2, 0.48, 0.72, 0.92, 1],
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="dtx-mobile__terminal">
          <motion.span
            className="dtx-mobile__terminal-line"
            animate={reduceMotion ? undefined : { opacity: [0.45, 1, 0.45] }}
            transition={{ duration: 1.7, repeat: Infinity }}
          />
          <motion.span
            className="dtx-mobile__terminal-line"
            animate={reduceMotion ? undefined : { opacity: [0.35, 0.9, 0.35] }}
            transition={{ duration: 1.9, delay: 0.2, repeat: Infinity }}
          />
          <motion.span
            className="dtx-mobile__terminal-line"
            animate={reduceMotion ? undefined : { opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2.1, delay: 0.35, repeat: Infinity }}
          />
        </div>
      </motion.div>

      <motion.div
        className="dtx-mobile__badge dtx-mobile__badge--ios"
        initial={reduceMotion ? false : { opacity: 0, scale: 0, rotate: -15 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 240,
          damping: 18,
          delay: 1.34,
        }}
      >
        <AppleMark />
      </motion.div>

      <motion.div
        className="dtx-mobile__badge dtx-mobile__badge--android"
        initial={reduceMotion ? false : { opacity: 0, scale: 0, rotate: 15 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 240,
          damping: 18,
          delay: 1.5,
        }}
      >
        <AndroidMark />
      </motion.div>
    </div>
  );
}

/* =========================================================
   SAAS
========================================================= */

function SaaSExperience({ reduceMotion, prefix }) {
  const services = [
    { label: "API Gateway", value: 91, status: "#31c995" },
    { label: "PostgreSQL", value: 76, status: "#31c995" },
    { label: "Workers", value: 95, status: "#2c8df8" },
  ];

  return (
    <div className="dtx-saas">
      <div className="dtx-saas__header">
        <span className="dtx-saas__title">Cloud operations</span>
        <span className="dtx-saas__status">Healthy</span>
      </div>

      <div className="dtx-saas__body">
        <motion.svg viewBox="0 0 220 155" className="dtx-svg" aria-hidden="true">
          <defs>
            <linearGradient
              id={`${prefix}-saas-blue`}
              x1="0"
              y1="0"
              x2="1"
              y2="1"
            >
              <stop stopColor="#35caff" />
              <stop offset="1" stopColor="#2456ef" />
            </linearGradient>

            <linearGradient
              id={`${prefix}-saas-area`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop stopColor="#43caff" stopOpacity="0.46" />
              <stop offset="1" stopColor="#2665f2" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          <motion.rect
            x="9"
            y="9"
            width="77"
            height="50"
            rx="9"
            fill="#ffffff"
            stroke="#d4e5f9"
            initial={reduceMotion ? false : { opacity: 0, y: -9 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.42,
              delay: 0.5,
              ease: EASE,
            }}
          />

          <text
            x="18"
            y="24"
            fontSize="6"
            fontFamily="Poppins"
            fontWeight="500"
            fill="#7790b4"
          >
            Requests / month
          </text>

          <text
            x="18"
            y="43"
            fontSize="15"
            fontFamily="Poppins"
            fontWeight="700"
            fill="#15336c"
          >
            84.2K
          </text>

          <motion.text
            x="18"
            y="53"
            fontSize="5.5"
            fontFamily="Poppins"
            fontWeight="600"
            fill="#2aa674"
            animate={reduceMotion ? undefined : { opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            +12.4%
          </motion.text>

          <motion.rect
            x="94"
            y="9"
            width="117"
            height="50"
            rx="9"
            fill="#ffffff"
            stroke="#d4e5f9"
            initial={reduceMotion ? false : { opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.45,
              delay: 0.63,
              ease: EASE,
            }}
          />

          {[19, 34, 49].map((y) => (
            <line
              key={y}
              x1="104"
              x2="201"
              y1={y}
              y2={y}
              stroke="#edf3fc"
              strokeWidth="1"
            />
          ))}

          <motion.path
            d="M104 49C117 41 125 45 136 31C147 17 157 40 170 27C181 17 191 23 201 14"
            fill="none"
            stroke="#2d80f7"
            strokeWidth="3"
            strokeLinecap="round"
            initial={reduceMotion ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 0.95,
              delay: 0.9,
              ease: EASE,
            }}
          />

          <motion.path
            d="M104 49C117 41 125 45 136 31C147 17 157 40 170 27C181 17 191 23 201 14V53H104Z"
            fill={`url(#${prefix}-saas-area)`}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.45,
              delay: 1.3,
            }}
          />

          <motion.rect
            x="9"
            y="68"
            width="202"
            height="78"
            rx="10"
            fill="#ffffff"
            stroke="#d4e5f9"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.48,
              delay: 0.84,
              ease: EASE,
            }}
          />

          {services.map((service, index) => {
            const y = 92 + index * 18;

            return (
              <motion.g
                key={service.label}
                initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.38,
                  delay: 1.1 + index * 0.15,
                }}
              >
                <text
                  x="19"
                  y={y + 5}
                  fontSize="5.8"
                  fontFamily="Poppins"
                  fontWeight="500"
                  fill="#546d96"
                >
                  {service.label}
                </text>

                <rect
                  x="88"
                  y={y}
                  width="82"
                  height="6"
                  rx="3"
                  fill="#e1ecfa"
                />

                <motion.rect
                  x="88"
                  y={y}
                  width={(82 * service.value) / 100}
                  height="6"
                  rx="3"
                  fill={
                    index === 2
                      ? `url(#${prefix}-saas-blue)`
                      : "#64b8fa"
                  }
                  initial={reduceMotion ? false : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  style={{ transformOrigin: `88px ${y + 3}px` }}
                  transition={{
                    duration: 0.7,
                    delay: 1.3 + index * 0.16,
                    ease: EASE,
                  }}
                />

                <motion.circle
                  cx="190"
                  cy={y + 3}
                  r="4"
                  fill={service.status}
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          scale: [1, 1.3, 1],
                          opacity: [0.65, 1, 0.65],
                        }
                  }
                  transition={{
                    duration: 1.7 + index * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.g>
            );
          })}

          {!reduceMotion && (
            <motion.circle
              r="2.8"
              fill="#43c9ff"
              animate={{
                cx: [24, 62, 105, 148, 191],
                cy: [141, 125, 138, 117, 129],
                opacity: [0, 1, 1, 1, 0],
              }}
              transition={{
                duration: 3.1,
                repeat: Infinity,
                ease: "linear",
                delay: 1.55,
              }}
            />
          )}
        </motion.svg>
      </div>
    </div>
  );
}

function Connector({ className, path, delay, reduceMotion }) {
  return (
    <motion.svg
      viewBox="0 0 240 180"
      preserveAspectRatio="none"
      className={`dtx-connector ${className}`}
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.55,
        delay,
      }}
      aria-hidden="true"
    >
      <motion.path
        d={path}
        className="dtx-connector__line"
        initial={reduceMotion ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 1.25,
          delay,
          ease: EASE,
        }}
      />

      {!reduceMotion && (
        <circle className="dtx-connector__pulse" r="3.2">
          <animateMotion
            dur="3.8s"
            begin={`${delay + 0.7}s`}
            repeatCount="indefinite"
            path={path}
          />
        </circle>
      )}
    </motion.svg>
  );
}

function Node({ className, delay, reduceMotion }) {
  return (
    <motion.span
      className={`dtx-node ${className}`}
      animate={
        reduceMotion
          ? undefined
          : {
              scale: [1, 1.35, 1],
              opacity: [0.65, 1, 0.65],
            }
      }
      transition={{
        duration: 2.1,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function CompactExperience({ id, reduceMotion, prefix }) {
  if (id === "web") {
    return (
      <PanelMotion
        className="dtx-panel--web"
        delay={0}
        duration={6}
        reduceMotion={reduceMotion}
        compact
      >
        <WebExperience reduceMotion={reduceMotion} prefix={prefix} />
      </PanelMotion>
    );
  }

  if (id === "mobile") {
    return (
      <PanelMotion
        className="dtx-panel--mobile"
        delay={0}
        duration={6.6}
        reduceMotion={reduceMotion}
        compact
      >
        <MobileExperience reduceMotion={reduceMotion} prefix={prefix} />
      </PanelMotion>
    );
  }

  return (
    <PanelMotion
      className="dtx-panel--saas"
      delay={0}
      duration={6.2}
      reduceMotion={reduceMotion}
      compact
    >
      <SaaSExperience reduceMotion={reduceMotion} prefix={prefix} />
    </PanelMotion>
  );
}

export default function LogoScene() {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef(null);
  const rawId = useId();
  const prefix = rawId.replace(/:/g, "");

  const [compact, setCompact] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const updateSize = () => {
      const width = root.getBoundingClientRect().width;
      setCompact(width <= 700);
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(root);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!compact || reduceMotion) return undefined;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % EXPERIENCES.length);
    }, 5200);

    return () => window.clearInterval(interval);
  }, [compact, reduceMotion]);

  return (
    <>
      <style>{SCENE_STYLES}</style>

      <div
        ref={rootRef}
        className={`dtx-scene ${compact ? "is-compact" : ""}`}
        aria-hidden="true"
      >
        <div className="dtx-scene__ambient">
          <motion.span
            className="dtx-scene__halo dtx-scene__halo--web"
            animate={
              reduceMotion
                ? undefined
                : {
                    opacity: [0.28, 0.55, 0.28],
                    scale: [0.95, 1.06, 0.95],
                  }
            }
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.span
            className="dtx-scene__halo dtx-scene__halo--mobile"
            animate={
              reduceMotion
                ? undefined
                : {
                    opacity: [0.25, 0.5, 0.25],
                    scale: [1, 1.08, 1],
                  }
            }
            transition={{
              duration: 6.2,
              delay: 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.span
            className="dtx-scene__halo dtx-scene__halo--saas"
            animate={
              reduceMotion
                ? undefined
                : {
                    opacity: [0.25, 0.52, 0.25],
                    scale: [0.96, 1.07, 0.96],
                  }
            }
            transition={{
              duration: 5.8,
              delay: 0.9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <CharacterNetwork reduceMotion={reduceMotion} />

        {!compact && (
          <>
            <Connector
              className="dtx-connector--web"
              path="M30 22C40 65 54 108 108 128C143 141 177 122 208 92"
              delay={0.62}
              reduceMotion={reduceMotion}
            />

            <Connector
              className="dtx-connector--mobile"
              path="M110 26C118 62 125 96 138 126C151 144 177 129 206 88"
              delay={0.8}
              reduceMotion={reduceMotion}
            />

            <Connector
              className="dtx-connector--saas"
              path="M24 30C52 50 83 82 99 118C113 145 140 148 212 110"
              delay={0.96}
              reduceMotion={reduceMotion}
            />

            <Node
              className="dtx-node--web"
              delay={0}
              reduceMotion={reduceMotion}
            />

            <Node
              className="dtx-node--mobile"
              delay={0.35}
              reduceMotion={reduceMotion}
            />

            <Node
              className="dtx-node--saas"
              delay={0.7}
              reduceMotion={reduceMotion}
            />

            <PanelMotion
              className="dtx-panel--web"
              delay={0.18}
              duration={6}
              reduceMotion={reduceMotion}
            >
              <WebExperience reduceMotion={reduceMotion} prefix={prefix} />
            </PanelMotion>

            <PanelMotion
              className="dtx-panel--mobile"
              delay={0.34}
              duration={6.7}
              reduceMotion={reduceMotion}
            >
              <MobileExperience reduceMotion={reduceMotion} prefix={prefix} />
            </PanelMotion>

            <PanelMotion
              className="dtx-panel--saas"
              delay={0.5}
              duration={6.2}
              reduceMotion={reduceMotion}
            >
              <SaaSExperience reduceMotion={reduceMotion} prefix={prefix} />
            </PanelMotion>
          </>
        )}

        {compact && (
          <>
            <AnimatePresence mode="wait" initial={false}>
              <CompactExperience
                key={EXPERIENCES[activeIndex]}
                id={EXPERIENCES[activeIndex]}
                reduceMotion={reduceMotion}
                prefix={prefix}
              />
            </AnimatePresence>

            <div className="dtx-scene__pager">
              {EXPERIENCES.map((experience, index) => (
                <button
                  key={experience}
                  type="button"
                  aria-label={`Mostrar ${experience}`}
                  className={`dtx-scene__pager-dot ${
                    activeIndex === index ? "is-active" : ""
                  }`}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
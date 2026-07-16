import { useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Check,
  Cloud,
  Handshake,
  ReceiptText,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import Icon from "../common/Icon";
import { services } from "../../data/portfolioData";

const STYLES = String.raw`
.services-premium {
  position: relative;
  overflow: hidden;
  padding: clamp(50px, 5vw, 74px) 0;
  background:
    radial-gradient(circle at 84% 10%, rgba(62, 112, 255, 0.12), transparent 28%),
    linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
  isolation: isolate;
}

.services-premium::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(25, 106, 255, 0.022) 1px, transparent 1px),
    linear-gradient(90deg, rgba(25, 106, 255, 0.022) 1px, transparent 1px);
  background-size: 44px 44px;
  mask-image: linear-gradient(to bottom, transparent, #000 10%, #000 90%, transparent);
}

.services-premium__glow {
  position: absolute;
  z-index: -1;
  border-radius: 999px;
  filter: blur(60px);
  pointer-events: none;
}

.services-premium__glow--one {
  top: 2%;
  right: -8%;
  width: 340px;
  height: 340px;
  background: rgba(51, 111, 255, 0.12);
}

.services-premium__glow--two {
  left: 34%;
  bottom: -18%;
  width: 280px;
  height: 280px;
  background: rgba(125, 88, 255, 0.06);
}

.services-premium__container {
  width: min(1420px, calc(100% - 42px));
  margin-inline: auto;
}

.services-premium__top {
  display: grid;
  grid-template-columns: minmax(310px, 0.72fr) minmax(700px, 1.28fr);
  gap: clamp(30px, 4vw, 64px);
  align-items: start;
}

.services-premium__intro {
  min-width: 0;
}

.services-premium__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  min-height: 38px;
  padding: 0 16px;
  border: 1px solid rgba(23, 109, 255, 0.1);
  border-radius: 999px;
  background: rgba(239, 245, 255, 0.96);
  color: #0b1739;
  font-size: 0.87rem;
  font-weight: 600;
  box-shadow: 0 10px 24px rgba(25, 84, 177, 0.06);
}

.services-premium__eyebrow-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #176dff;
  box-shadow: 0 0 14px rgba(23, 109, 255, 0.62);
}

.services-premium__title {
  max-width: 600px;
  margin: 21px 0 14px;
  color: #081333;
  font-size: clamp(2.1rem, 3.35vw, 3.7rem);
  line-height: 1.04;
  letter-spacing: -0.043em;
  font-weight: 600;
}

.services-premium__title span {
  position: relative;
  color: #176dff;
}

.services-premium__title span::after {
  content: "";
  position: absolute;
  left: 2%;
  right: 2%;
  bottom: -7px;
  height: 4px;
  border-radius: 999px;
  background: linear-gradient(90deg, #176dff, #8cb3ff);
}

.services-premium__description {
  max-width: 550px;
  margin: 0;
  color: #54627f;
  font-size: clamp(0.95rem, 1vw, 1.03rem);
  line-height: 1.66;
}

.services-premium__tabs {
  display: grid;
  gap: 0;
  margin-top: 24px;
  border-top: 1px solid rgba(62, 96, 164, 0.09);
}

.services-premium__tab {
  position: relative;
  display: grid;
  grid-template-columns: 40px 44px 1fr;
  gap: 12px;
  align-items: center;
  min-height: 61px;
  padding: 10px 8px 10px 14px;
  border: 0;
  border-bottom: 1px solid rgba(62, 96, 164, 0.09);
  background: transparent;
  color: #62708d;
  text-align: left;
  cursor: pointer;
  transition:
    color 180ms ease,
    background 180ms ease;
}

.services-premium__tab::before {
  content: "";
  position: absolute;
  top: 11px;
  bottom: 11px;
  left: 0;
  width: 4px;
  border-radius: 999px;
  background: transparent;
  transition: background 180ms ease;
}

.services-premium__tab:hover {
  color: #0f1d3f;
  background: rgba(246, 249, 255, 0.8);
}

.services-premium__tab.is-active {
  color: #0a1738;
  background: linear-gradient(90deg, rgba(241, 246, 255, 0.96), transparent);
}

.services-premium__tab.is-active::before {
  background: #176dff;
  box-shadow: 0 0 14px rgba(23, 109, 255, 0.28);
}

.services-premium__tab-number {
  font-size: 0.9rem;
  font-weight: 500;
}

.services-premium__tab.is-active .services-premium__tab-number {
  color: #176dff;
}

.services-premium__tab-icon {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border: 1px solid rgba(23, 109, 255, 0.09);
  border-radius: 13px;
  background: linear-gradient(145deg, #ffffff, #eef4ff);
  color: #6177ab;
  box-shadow: 0 10px 18px rgba(34, 79, 163, 0.05);
}

.services-premium__tab.is-active .services-premium__tab-icon {
  color: #176dff;
  border-color: rgba(23, 109, 255, 0.18);
}

.services-premium__tab-label {
  min-width: 0;
  font-size: 0.92rem;
  line-height: 1.28;
  font-weight: 600;
}

.services-premium__panel {
  position: relative;
  min-height: 600px;
  overflow: hidden;
  border: 1px solid rgba(63, 101, 184, 0.1);
  border-radius: 30px;
  background:
    radial-gradient(circle at 86% 12%, rgba(100, 145, 255, 0.12), transparent 26%),
    rgba(255, 255, 255, 0.97);
  box-shadow:
    0 22px 58px rgba(40, 74, 145, 0.09),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(14px);
}

.services-premium__panel-grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.55;
  background-image:
    linear-gradient(rgba(23, 109, 255, 0.024) 1px, transparent 1px),
    linear-gradient(90deg, rgba(23, 109, 255, 0.024) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: linear-gradient(to left, #000 0%, #000 56%, transparent 100%);
}

.services-premium__panel-content {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: minmax(280px, 0.78fr) minmax(410px, 1.22fr);
  gap: 24px;
  min-height: 600px;
  padding: clamp(28px, 3.2vw, 44px);
}

.services-premium__panel-copy {
  display: flex;
  min-width: 0;
  flex-direction: column;
  align-items: flex-start;
}

.services-premium__panel-number {
  color: #176dff;
  font-size: 1.15rem;
  line-height: 1;
  font-weight: 600;
}

.services-premium__panel-line {
  width: 35px;
  height: 3px;
  margin: 14px 0 20px;
  border-radius: 999px;
  background: linear-gradient(90deg, #176dff, #8fb5ff);
}

.services-premium__panel-title {
  margin: 0;
  color: #081333;
  font-size: clamp(1.8rem, 2.3vw, 2.55rem);
  line-height: 1.1;
  letter-spacing: -0.036em;
  font-weight: 600;
}

.services-premium__panel-description {
  max-width: 440px;
  margin: 14px 0 0;
  color: #4f5c78;
  font-size: 0.92rem;
  line-height: 1.64;
}

.services-premium__features {
  display: grid;
  gap: 11px;
  margin: 21px 0 0;
  padding: 0;
  list-style: none;
}

.services-premium__feature {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: #2d3b5b;
  font-size: 0.85rem;
  line-height: 1.45;
}

.services-premium__check {
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  width: 20px;
  height: 20px;
  margin-top: 1px;
  border-radius: 50%;
  color: #176dff;
  background: #edf4ff;
}

.services-premium__promise {
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: 350px;
  margin-top: 23px;
  padding-top: 20px;
  border-top: 1px solid rgba(63, 101, 184, 0.1);
  color: #5b6883;
  font-size: 0.78rem;
  line-height: 1.5;
}

.services-premium__promise-icon {
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  width: 36px;
  height: 36px;
  border-radius: 12px;
  background: linear-gradient(145deg, #f1f6ff, #ffffff);
  color: #176dff;
  border: 1px solid rgba(23, 109, 255, 0.09);
}

.services-premium__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 45px;
  margin-top: auto;
  padding: 0 18px;
  border: 0;
  border-radius: 13px;
  background: linear-gradient(135deg, #176dff, #2b62eb);
  color: #ffffff;
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 12px 26px rgba(23, 109, 255, 0.19);
  transition: transform 180ms ease, box-shadow 180ms ease;
}

.services-premium__button:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 32px rgba(23, 109, 255, 0.24);
}

.services-premium__visual {
  position: relative;
  min-height: 500px;
  align-self: center;
}

.services-premium__visual-shell {
  position: absolute;
  inset: 6% -4% 4% 2%;
  border-radius: 48% 52% 46% 54% / 44% 42% 58% 56%;
  border: 1px solid rgba(23, 109, 255, 0.08);
  background:
    radial-gradient(circle at 74% 22%, rgba(104, 148, 255, 0.16), transparent 28%),
    linear-gradient(145deg, rgba(244, 248, 255, 0.9), rgba(232, 240, 255, 0.58));
}

.visual-node {
  position: absolute;
  z-index: 7;
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border: 1px solid rgba(23, 109, 255, 0.11);
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.96);
  color: #176dff;
  box-shadow: 0 14px 28px rgba(35, 75, 155, 0.1);
}

.visual-node--one {
  top: 6%;
  left: 16%;
}

.visual-node--two {
  top: 4%;
  right: 14%;
}

.visual-node--three {
  top: 40%;
  right: -1%;
}

.visual-connector {
  position: absolute;
  z-index: 1;
  border-color: rgba(23, 109, 255, 0.16);
  border-style: solid;
}

.visual-connector--one {
  top: 13%;
  left: 23%;
  width: 40%;
  height: 20%;
  border-width: 1px 1px 0 0;
  border-radius: 0 18px 0 0;
}

.visual-connector--two {
  top: 12%;
  right: 9%;
  width: 21%;
  height: 35%;
  border-width: 1px 0 0 1px;
  border-radius: 18px 0 0 0;
}

.visual-connector--three {
  right: 2%;
  bottom: 16%;
  width: 22%;
  height: 27%;
  border-width: 0 0 1px 1px;
  border-radius: 0 0 0 18px;
}

/* WEB */
.visual-web__workspace {
  position: absolute;
  inset: 16% 8% 10% 8%;
}

.visual-web__monitor {
  position: absolute;
  left: 6%;
  top: 0;
  width: 72%;
  min-height: 250px;
  padding: 14px;
  border-radius: 22px;
  background: linear-gradient(145deg, #102753, #173b88);
  box-shadow: 0 28px 58px rgba(15, 43, 104, 0.22);
}

.visual-web__screen {
  overflow: hidden;
  border-radius: 16px;
  background: linear-gradient(180deg, #fafdff, #eef4ff);
}

.visual-web__toolbar {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 30px;
  padding: 0 12px;
  background: #f3f7ff;
  border-bottom: 1px solid rgba(16, 44, 108, 0.06);
}

.visual-web__toolbar i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #9cb3e8;
}

.visual-web__body {
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: 14px;
  padding: 14px;
}

.visual-web__sidebar {
  display: grid;
  gap: 10px;
}

.visual-web__sidebar span {
  display: block;
  height: 14px;
  border-radius: 7px;
  background: #e7eefb;
}

.visual-web__sidebar span:first-child {
  height: 82px;
  border-radius: 16px;
  background: linear-gradient(145deg, #dfe9ff, #a5c0ff);
}

.visual-web__dashboard {
  display: grid;
  gap: 10px;
}

.visual-web__stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 9px;
}

.visual-web__stats span {
  height: 62px;
  border-radius: 14px;
  background: linear-gradient(145deg, #eaf2ff, #f8fbff);
  border: 1px solid rgba(23, 109, 255, 0.08);
}

.visual-web__graph {
  min-height: 116px;
  border-radius: 16px;
  background:
    linear-gradient(rgba(23, 109, 255, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(23, 109, 255, 0.045) 1px, transparent 1px),
    linear-gradient(180deg, #ffffff, #f8fbff);
  background-size: 18px 18px, 18px 18px, cover;
  position: relative;
  overflow: hidden;
}

.visual-web__graph::after {
  content: "";
  position: absolute;
  inset: 22px 14px 16px 14px;
  background: linear-gradient(90deg, #2ad1ff, #7d74ff);
  clip-path: polygon(0 78%, 15% 68%, 32% 72%, 48% 38%, 65% 52%, 82% 22%, 100% 34%, 100% 44%, 82% 32%, 65% 60%, 48% 46%, 32% 80%, 15% 76%, 0 86%);
}

.visual-web__stand {
  position: absolute;
  left: 28%;
  bottom: -2%;
  width: 22%;
  height: 86px;
}

.visual-web__stand::before {
  content: "";
  position: absolute;
  top: 0;
  left: 38%;
  width: 24%;
  height: 50px;
  border-radius: 0 0 16px 16px;
  background: linear-gradient(145deg, #163977, #2b5db4);
}

.visual-web__stand::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 16px;
  border-radius: 999px;
  background: linear-gradient(90deg, #dfe8fb, #ffffff, #dfe8fb);
  box-shadow: 0 8px 16px rgba(38, 78, 158, 0.08);
}

.visual-web__widget {
  position: absolute;
  right: 0;
  top: 10%;
  width: 28%;
  min-height: 170px;
  padding: 16px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.98);
  border: 1px solid rgba(59, 102, 198, 0.12);
  box-shadow: 0 22px 44px rgba(35, 70, 143, 0.11);
}

.visual-web__widget-badge {
  width: 40px;
  height: 40px;
  border-radius: 13px;
  background: linear-gradient(145deg, #e7f0ff, #ffffff);
  display: grid;
  place-items: center;
  color: #176dff;
}

.visual-web__widget span {
  display: block;
  height: 8px;
  margin-top: 11px;
  border-radius: 999px;
  background: #e7eefb;
}

.visual-web__widget span:nth-child(3) { width: 74%; }
.visual-web__widget span:nth-child(4) { width: 56%; }
.visual-web__widget span:nth-child(5) { width: 84%; }
.visual-web__widget span:nth-child(6) { width: 62%; }

/* MOBILE */
.visual-mobile__phone {
  position: absolute;
  z-index: 4;
  top: 10%;
  left: 28%;
  width: 42%;
  min-height: 360px;
  padding: 12px;
  border: 7px solid #11295d;
  border-radius: 38px;
  background: linear-gradient(180deg, #edf4ff, #ffffff);
  box-shadow: 0 28px 56px rgba(15, 43, 104, 0.18);
}

.visual-mobile__notch {
  width: 36%;
  height: 12px;
  margin: 0 auto 16px;
  border-radius: 0 0 10px 10px;
  background: #11295d;
}

.visual-mobile__hero {
  height: 108px;
  border-radius: 18px;
  background: linear-gradient(145deg, #dbe7ff, #79a5ff 55%, #8d6cff);
  position: relative;
  overflow: hidden;
}

.visual-mobile__hero::after {
  content: "";
  position: absolute;
  right: -10%;
  bottom: -20%;
  width: 60%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: rgba(255,255,255,0.18);
}

.visual-mobile__app {
  display: grid;
  grid-template-columns: 42px 1fr;
  gap: 10px;
  align-items: center;
  margin-top: 14px;
}

.visual-mobile__app-icon {
  width: 42px;
  height: 42px;
  border-radius: 13px;
  background: linear-gradient(145deg, #eef4ff, #ffffff);
  box-shadow: inset 0 0 0 1px rgba(23, 109, 255, 0.08);
}

.visual-mobile__app-copy {
  display: grid;
  gap: 7px;
}

.visual-mobile__app-copy span {
  display: block;
  height: 7px;
  border-radius: 999px;
  background: #e3eaf7;
}

.visual-mobile__app-copy span:last-child {
  width: 66%;
}

.visual-mobile__badge {
  position: absolute;
  z-index: 6;
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 42px;
  padding: 0 12px;
  border-radius: 14px;
  background: rgba(255,255,255,0.98);
  border: 1px solid rgba(59, 102, 198, 0.12);
  box-shadow: 0 14px 30px rgba(35,70,143,0.1);
  color: #102658;
  font-size: 0.78rem;
  font-weight: 600;
}

.visual-mobile__badge--android {
  left: 8%;
  top: 20%;
  color: #18a357;
}

.visual-mobile__badge--ios {
  right: 5%;
  bottom: 20%;
  color: #176dff;
}

/* E-INVOICE */
.visual-invoice__sheet {
  position: absolute;
  z-index: 4;
  top: 8%;
  left: 16%;
  width: 56%;
  min-height: 360px;
  padding: 18px 18px 16px;
  border-radius: 20px;
  background: rgba(255,255,255,0.98);
  border: 1px solid rgba(59, 102, 198, 0.12);
  box-shadow: 0 26px 52px rgba(35,70,143,0.12);
}

.visual-invoice__sheet::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 20px;
  background:
    radial-gradient(circle at 88% 10%, rgba(23,109,255,0.08), transparent 24%),
    transparent;
  pointer-events: none;
}

.visual-invoice__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
}

.visual-invoice__brand strong {
  display: block;
  color: #102658;
  font-size: 0.98rem;
}

.visual-invoice__brand small {
  color: #7a87a1;
  font-size: 0.72rem;
}

.visual-invoice__pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 30px;
  padding: 0 11px;
  border-radius: 999px;
  background: #eff5ff;
  color: #176dff;
  font-size: 0.72rem;
  font-weight: 700;
}

.visual-invoice__meta {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 14px;
}

.visual-invoice__meta-box {
  padding: 10px;
  border-radius: 12px;
  background: #f8fbff;
  border: 1px solid rgba(23, 109, 255, 0.08);
}

.visual-invoice__meta-box span {
  display: block;
  height: 7px;
  border-radius: 999px;
  background: #dfe8f7;
  margin-bottom: 7px;
}

.visual-invoice__meta-box span:last-child {
  width: 72%;
}

.visual-invoice__table {
  border: 1px solid rgba(23, 109, 255, 0.08);
  border-radius: 14px;
  overflow: hidden;
}

.visual-invoice__row {
  display: grid;
  grid-template-columns: 1.7fr 0.6fr 0.8fr;
  gap: 10px;
  padding: 10px 12px;
  background: #ffffff;
}

.visual-invoice__row + .visual-invoice__row {
  border-top: 1px solid rgba(23, 109, 255, 0.06);
}

.visual-invoice__row--head {
  background: #f3f7ff;
}

.visual-invoice__row span {
  display: block;
  height: 7px;
  border-radius: 999px;
  background: #dce6f7;
}

.visual-invoice__totals {
  display: grid;
  gap: 9px;
  width: 44%;
  margin: 16px 0 0 auto;
}

.visual-invoice__totals span {
  display: block;
  height: 8px;
  border-radius: 999px;
  background: #dce6f7;
}

.visual-invoice__card {
  position: absolute;
  z-index: 6;
  right: 4%;
  top: 22%;
  width: 30%;
  min-height: 190px;
  padding: 16px;
  border-radius: 18px;
  background: linear-gradient(145deg, #10285d, #184299);
  box-shadow: 0 24px 48px rgba(15, 43, 104, 0.2);
  color: #ffffff;
}

.visual-invoice__card strong {
  display: block;
  font-size: 0.95rem;
  margin-bottom: 8px;
}

.visual-invoice__card span {
  display: block;
  height: 7px;
  margin-top: 10px;
  border-radius: 999px;
  background: rgba(255,255,255,0.3);
}

.visual-invoice__card span:nth-child(3) { width: 76%; }
.visual-invoice__card span:nth-child(4) { width: 58%; }
.visual-invoice__card span:nth-child(5) { width: 82%; }
.visual-invoice__card-badge {
  position: absolute;
  right: 14px;
  bottom: 14px;
  min-height: 26px;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(255,255,255,0.14);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.68rem;
  font-weight: 700;
}

/* SAAS */
.visual-saas__cloud {
  position: absolute;
  z-index: 4;
  top: 8%;
  left: 24%;
  width: 46%;
  height: 140px;
  border-radius: 999px;
  background: linear-gradient(145deg, #edf4ff, #ffffff);
  box-shadow: 0 20px 42px rgba(35,70,143,0.1);
}

.visual-saas__cloud::before,
.visual-saas__cloud::after {
  content: "";
  position: absolute;
  background: inherit;
  border-radius: 50%;
}

.visual-saas__cloud::before {
  width: 42%;
  height: 74%;
  left: 10%;
  top: -28%;
}

.visual-saas__cloud::after {
  width: 34%;
  height: 60%;
  right: 14%;
  top: -18%;
}

.visual-saas__cloud-core {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  color: #176dff;
}

.visual-saas__company {
  position: absolute;
  z-index: 5;
  left: 12%;
  bottom: 10%;
  width: 76%;
  min-height: 220px;
  padding: 18px;
  border-radius: 20px;
  background: rgba(255,255,255,0.97);
  border: 1px solid rgba(59, 102, 198, 0.12);
  box-shadow: 0 24px 50px rgba(35,70,143,0.11);
}

.visual-saas__header {
  display: grid;
  grid-template-columns: 70px 1fr;
  gap: 14px;
  align-items: center;
  margin-bottom: 16px;
}

.visual-saas__building {
  width: 70px;
  height: 84px;
  border-radius: 14px;
  background:
    linear-gradient(90deg, rgba(255,255,255,0.3) 16%, transparent 16% 26%, rgba(255,255,255,0.3) 26% 36%, transparent 36% 46%, rgba(255,255,255,0.3) 46% 56%, transparent 56%),
    linear-gradient(145deg, #98baff, #4c86f7);
}

.visual-saas__copy {
  display: grid;
  gap: 9px;
}

.visual-saas__copy span {
  display: block;
  height: 8px;
  border-radius: 999px;
  background: #e0e8f7;
}

.visual-saas__copy span:nth-child(1) { width: 62%; }
.visual-saas__copy span:nth-child(2) { width: 88%; }
.visual-saas__copy span:nth-child(3) { width: 70%; }

.visual-saas__modules {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.visual-saas__module {
  min-height: 86px;
  padding: 10px;
  border-radius: 15px;
  background: linear-gradient(145deg, #f8fbff, #eef4ff);
  border: 1px solid rgba(23, 109, 255, 0.08);
}

.visual-saas__module span {
  display: block;
  height: 7px;
  border-radius: 999px;
  background: #dfe7f7;
  margin-bottom: 8px;
}

.visual-saas__link {
  position: absolute;
  border: 1px dashed rgba(23,109,255,0.24);
}

.visual-saas__link--one {
  left: 35%;
  top: 22%;
  width: 10%;
  transform: rotate(8deg);
}

.visual-saas__link--two {
  right: 34%;
  top: 22%;
  width: 11%;
  transform: rotate(-8deg);
}

/* GENERIC COLOR ACCENTS */
.services-premium__visual--web .visual-web__widget-badge {
  background: linear-gradient(145deg, #e4efff, #ffffff);
  color: #176dff;
}

.services-premium__visual--mobile .services-premium__visual-shell {
  background:
    radial-gradient(circle at 80% 18%, rgba(148, 119, 255, 0.18), transparent 28%),
    linear-gradient(145deg, rgba(244,248,255,0.9), rgba(232,240,255,0.56));
}

.services-premium__visual--invoice .services-premium__visual-shell,
.services-premium__visual--invoice .visual-invoice__sheet::after {
  background:
    radial-gradient(circle at 82% 14%, rgba(21, 177, 109, 0.12), transparent 26%),
    linear-gradient(145deg, rgba(244,248,255,0.9), rgba(232,240,255,0.56));
}

.services-premium__visual--saas .services-premium__visual-shell {
  background:
    radial-gradient(circle at 82% 14%, rgba(69, 182, 255, 0.16), transparent 26%),
    linear-gradient(145deg, rgba(244,248,255,0.9), rgba(232,240,255,0.56));
}

.services-premium__bottom {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 22px;
  padding: 21px 24px;
  border: 1px solid rgba(63, 101, 184, 0.09);
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 16px 40px rgba(40, 74, 145, 0.07);
}

.services-premium__benefit {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 13px;
  align-items: center;
  padding: 0 22px;
}

.services-premium__benefit + .services-premium__benefit {
  border-left: 1px solid rgba(63, 101, 184, 0.1);
}

.services-premium__benefit-icon {
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: 15px;
  background: linear-gradient(145deg, #f0f5ff, #ffffff);
  border: 1px solid rgba(23, 109, 255, 0.08);
  color: #176dff;
}

.services-premium__benefit h3 {
  margin: 0 0 4px;
  color: #0d193a;
  font-size: 0.9rem;
  font-weight: 600;
}

.services-premium__benefit p {
  margin: 0;
  color: #67738c;
  font-size: 0.76rem;
  line-height: 1.48;
}


/* INTERACTIVE CINEMATIC LAYER */
.services-premium__panel {
  --service-accent: #176dff;
  --service-accent-2: #7c5cff;
  --service-soft: rgba(23, 109, 255, 0.12);
  transform-style: preserve-3d;
}

.services-premium__panel[data-service="mobile"] {
  --service-accent: #7c4dff;
  --service-accent-2: #ff4fa3;
  --service-soft: rgba(124, 77, 255, 0.14);
}

.services-premium__panel[data-service="invoice"] {
  --service-accent: #00a86b;
  --service-accent-2: #25c4a4;
  --service-soft: rgba(0, 168, 107, 0.13);
}

.services-premium__panel[data-service="saas"] {
  --service-accent: #0b9cff;
  --service-accent-2: #22d3ee;
  --service-soft: rgba(11, 156, 255, 0.13);
}

.services-premium__panel::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  border-radius: inherit;
  pointer-events: none;
  background:
    radial-gradient(520px circle at var(--pointer-x, 72%) var(--pointer-y, 24%), var(--service-soft), transparent 42%),
    linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.5) 43%, transparent 61%);
  background-size: auto, 220% 100%;
  background-position: center, 130% 0;
  opacity: 0.9;
  animation: services-panel-shimmer 8s ease-in-out infinite;
}

@keyframes services-panel-shimmer {
  0%, 20% { background-position: center, 130% 0; }
  55%, 100% { background-position: center, -90% 0; }
}

.services-premium__scene {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.services-premium__orb {
  position: absolute;
  border-radius: 999px;
  filter: blur(2px);
  opacity: 0.75;
  background: radial-gradient(circle at 32% 28%, rgba(255,255,255,0.98), var(--service-accent) 42%, transparent 72%);
  box-shadow: 0 0 55px var(--service-soft);
}

.services-premium__orb--one { width: 170px; height: 170px; right: 3%; top: 3%; }
.services-premium__orb--two { width: 92px; height: 92px; left: 47%; bottom: 7%; opacity: 0.5; }

.services-premium__particle {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--service-accent);
  box-shadow: 0 0 14px var(--service-accent);
  opacity: 0.5;
}

.services-premium__particle:nth-child(3) { left: 54%; top: 18%; }
.services-premium__particle:nth-child(4) { right: 8%; top: 48%; width: 4px; height: 4px; }
.services-premium__particle:nth-child(5) { left: 62%; bottom: 12%; width: 5px; height: 5px; }
.services-premium__particle:nth-child(6) { right: 30%; top: 8%; width: 3px; height: 3px; }

.services-premium__visual-stage {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  will-change: transform;
}

.services-premium__visual-stage::after {
  content: "";
  position: absolute;
  left: 13%;
  right: 8%;
  bottom: 1%;
  height: 42px;
  border-radius: 50%;
  background: radial-gradient(ellipse, rgba(13, 38, 91, 0.18), transparent 70%);
  filter: blur(12px);
  transform: translateZ(-40px);
}

.services-premium__visual-shell {
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.78),
    inset 0 -24px 55px rgba(42, 91, 190, 0.05),
    0 24px 70px rgba(41, 86, 170, 0.08);
}

.visual-node {
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

.services-premium__tab {
  overflow: hidden;
}

.services-premium__tab-active {
  position: absolute;
  inset: 6px 3px;
  z-index: 0;
  border: 1px solid color-mix(in srgb, var(--tab-accent, #176dff) 22%, transparent);
  border-radius: 14px;
  background: linear-gradient(90deg, color-mix(in srgb, var(--tab-accent, #176dff) 10%, white), rgba(255,255,255,0.2));
  box-shadow: 0 10px 25px color-mix(in srgb, var(--tab-accent, #176dff) 10%, transparent);
}

.services-premium__tab > span:not(.services-premium__tab-active) {
  position: relative;
  z-index: 1;
}

.services-premium__tab-icon {
  transition: transform 220ms cubic-bezier(.22,1,.36,1), color 180ms ease, border-color 180ms ease;
}

.services-premium__tab:hover .services-premium__tab-icon,
.services-premium__tab.is-active .services-premium__tab-icon {
  transform: translateY(-2px) rotate(-2deg) scale(1.04);
}

.services-premium__button {
  position: relative;
  overflow: hidden;
}

.services-premium__button::before {
  content: "";
  position: absolute;
  top: -70%;
  left: -35%;
  width: 28%;
  height: 240%;
  background: rgba(255,255,255,0.45);
  transform: rotate(22deg);
  transition: left 520ms cubic-bezier(.22,1,.36,1);
}

.services-premium__button:hover::before { left: 118%; }

.services-premium__check {
  box-shadow: inset 0 0 0 1px rgba(23,109,255,0.08);
}

.services-premium__panel[data-service="mobile"] .services-premium__panel-number,
.services-premium__panel[data-service="mobile"] .services-premium__check,
.services-premium__panel[data-service="mobile"] .services-premium__promise-icon { color: #7c4dff; }
.services-premium__panel[data-service="invoice"] .services-premium__panel-number,
.services-premium__panel[data-service="invoice"] .services-premium__check,
.services-premium__panel[data-service="invoice"] .services-premium__promise-icon { color: #00a86b; }
.services-premium__panel[data-service="saas"] .services-premium__panel-number,
.services-premium__panel[data-service="saas"] .services-premium__check,
.services-premium__panel[data-service="saas"] .services-premium__promise-icon { color: #0b9cff; }

.services-premium__panel[data-service="mobile"] .services-premium__panel-line,
.services-premium__panel[data-service="mobile"] .services-premium__button { background: linear-gradient(135deg, #7c4dff, #ff4fa3); }
.services-premium__panel[data-service="invoice"] .services-premium__panel-line,
.services-premium__panel[data-service="invoice"] .services-premium__button { background: linear-gradient(135deg, #00a86b, #25c4a4); }
.services-premium__panel[data-service="saas"] .services-premium__panel-line,
.services-premium__panel[data-service="saas"] .services-premium__button { background: linear-gradient(135deg, #0b9cff, #22d3ee); }

.visual-web__monitor,
.visual-mobile__phone,
.visual-invoice__sheet,
.visual-saas__company {
  transform: translateZ(28px);
}

.visual-web__widget,
.visual-mobile__badge,
.visual-invoice__card,
.visual-saas__cloud {
  transform: translateZ(58px);
}

@media (prefers-reduced-motion: reduce) {
  .services-premium__panel::after,
  .services-premium__button::before { animation: none; transition: none; }
}

@media (max-width: 1160px) {
  .services-premium__top {
    grid-template-columns: minmax(280px, 0.76fr) minmax(600px, 1.24fr);
    gap: 30px;
  }

  .services-premium__panel,
  .services-premium__panel-content {
    min-height: 570px;
  }
}

@media (max-width: 920px) {
  .services-premium__container {
    width: min(100% - 28px, 820px);
  }

  .services-premium__top {
    grid-template-columns: 1fr;
  }

  .services-premium__intro {
    text-align: center;
  }

  .services-premium__eyebrow,
  .services-premium__title,
  .services-premium__description {
    margin-left: auto;
    margin-right: auto;
  }

  .services-premium__tabs {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
    border-top: 0;
  }

  .services-premium__tab {
    grid-template-columns: 1fr;
    gap: 7px;
    min-height: 108px;
    padding: 12px;
    border: 1px solid rgba(62, 96, 164, 0.09);
    border-radius: 16px;
    text-align: center;
  }

  .services-premium__tab::before {
    top: auto;
    right: 14px;
    bottom: 0;
    left: 14px;
    width: auto;
    height: 3px;
  }

  .services-premium__tab-icon {
    margin-inline: auto;
  }

  .services-premium__panel,
  .services-premium__panel-content {
    min-height: auto;
  }

  .services-premium__panel-content {
    grid-template-columns: 1fr;
  }

  .services-premium__visual {
    min-height: 460px;
  }

  .services-premium__bottom {
    grid-template-columns: 1fr;
    gap: 17px;
  }

  .services-premium__benefit {
    padding: 0;
  }

  .services-premium__benefit + .services-premium__benefit {
    padding-top: 17px;
    border-top: 1px solid rgba(63, 101, 184, 0.1);
    border-left: 0;
  }
}

@media (max-width: 640px) {
  .services-premium {
    padding-block: 48px;
  }

  .services-premium__title {
    font-size: clamp(2rem, 9.8vw, 2.85rem);
  }

  .services-premium__tabs {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
  }

  .services-premium__tabs::-webkit-scrollbar {
    display: none;
  }

  .services-premium__tab {
    flex: 0 0 138px;
    scroll-snap-align: start;
  }

  .services-premium__panel-content {
    padding: 22px;
  }

  .services-premium__panel-copy {
    align-items: stretch;
  }

  .services-premium__panel-title {
    font-size: 1.8rem;
  }

  .services-premium__button {
    align-self: flex-start;
  }

  .services-premium__visual {
    min-height: 350px;
  }

  .visual-web__workspace {
    inset: 16% 4% 8% 4%;
  }

  .visual-web__monitor {
    width: 76%;
    min-height: 210px;
  }

  .visual-web__widget {
    width: 32%;
    min-height: 150px;
  }

  .visual-mobile__phone {
    left: 24%;
    width: 52%;
    min-height: 310px;
  }

  .visual-invoice__sheet {
    left: 8%;
    width: 62%;
    min-height: 320px;
  }

  .visual-invoice__card {
    width: 34%;
  }

  .visual-saas__cloud {
    left: 20%;
    width: 52%;
  }

  .visual-saas__company {
    left: 7%;
    width: 86%;
  }

  .visual-saas__modules {
    grid-template-columns: repeat(2, 1fr);
  }

  .visual-saas__module:last-child {
    display: none;
  }
}

@media (max-width: 420px) {
  .services-premium__container {
    width: min(100% - 18px, 820px);
  }

  .services-premium__panel-content {
    padding: 20px;
  }

  .services-premium__visual {
    min-height: 320px;
  }

  .visual-node--three,
  .visual-connector--three {
    display: none;
  }

  .visual-web__monitor {
    width: 80%;
    min-height: 190px;
  }

  .visual-web__widget {
    top: 12%;
    width: 34%;
    min-height: 130px;
  }

  .visual-web__body {
    grid-template-columns: 1fr;
  }

  .visual-web__stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .visual-mobile__phone {
    left: 18%;
    width: 62%;
    min-height: 280px;
  }

  .visual-invoice__sheet {
    left: 4%;
    width: 70%;
  }

  .visual-invoice__card {
    top: 24%;
    width: 28%;
    min-height: 160px;
  }

  .visual-saas__cloud {
    left: 14%;
    width: 60%;
  }

  .visual-saas__header {
    grid-template-columns: 1fr;
  }

  .visual-saas__building {
    width: 62px;
    height: 74px;
  }

  .visual-saas__modules {
    grid-template-columns: 1fr;
  }
}

/* ULTRA REALISTIC SERVICE SCENES */
.services-premium__visual {
  min-height: 520px;
  perspective: 1300px;
}

.services-premium__visual-stage {
  filter: saturate(1.08);
}

.services-premium__visual-shell {
  inset: 2% -1% 1% 0;
  border-radius: 45% 55% 52% 48% / 47% 42% 58% 53%;
  background:
    radial-gradient(circle at 74% 20%, color-mix(in srgb, var(--service-accent) 24%, transparent), transparent 23%),
    radial-gradient(circle at 42% 74%, rgba(255,255,255,.95), transparent 34%),
    linear-gradient(145deg, rgba(244,249,255,.96), rgba(224,236,255,.72));
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.95),
    inset 0 -32px 80px color-mix(in srgb, var(--service-accent) 8%, transparent),
    0 35px 80px rgba(24,55,122,.12);
}

.visual-node {
  width: 52px;
  height: 52px;
  border-radius: 17px;
  color: var(--service-accent);
  background: linear-gradient(145deg, rgba(255,255,255,.98), rgba(243,247,255,.88));
  border: 1px solid color-mix(in srgb, var(--service-accent) 18%, transparent);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.98),
    0 16px 34px color-mix(in srgb, var(--service-accent) 16%, transparent);
}

.scene-web,.scene-mobile,.scene-invoice,.scene-saas { position:absolute; inset:0; transform-style:preserve-3d; }

/* WEB ULTRA */
.web-device { position:absolute; left:4%; top:11%; width:78%; height:370px; transform-style:preserve-3d; }
.web-device__camera { position:absolute; z-index:4; top:-8px; left:50%; width:42px; height:8px; border-radius:99px; background:#0c2456; transform:translateX(-50%); box-shadow:0 2px 8px rgba(3,18,49,.35); }
.web-browser { position:absolute; inset:0 0 40px; padding:9px; border-radius:26px; background:linear-gradient(145deg,#0c2456,#183f8d 62%,#2858bd); box-shadow:0 34px 64px rgba(13,42,101,.26),inset 0 1px 0 rgba(255,255,255,.18); overflow:hidden; }
.web-browser::after { content:""; position:absolute; inset:0; background:linear-gradient(120deg,rgba(255,255,255,.14),transparent 28%); pointer-events:none; }
.web-browser__top { position:relative; z-index:2; display:grid; grid-template-columns:70px 1fr 95px; gap:10px; align-items:center; height:38px; padding:0 12px; border-radius:17px 17px 8px 8px; background:rgba(248,251,255,.98); border-bottom:1px solid rgba(24,62,130,.08); }
.web-browser__dots { display:flex; gap:6px; }.web-browser__dots i{width:7px;height:7px;border-radius:50%;background:#9bb0d8}.web-browser__dots i:first-child{background:#ff6b7a}.web-browser__dots i:nth-child(2){background:#ffc85b}.web-browser__dots i:nth-child(3){background:#47d58b}
.web-browser__url { justify-self:center; width:min(100%,260px); height:24px; display:flex; align-items:center; justify-content:center; gap:7px; border-radius:8px; color:#6f7f9d; background:#edf2fb; font-size:.62rem; }.web-browser__lock{font-size:.42rem;color:#36bb78}
.web-browser__online { display:flex; align-items:center; gap:5px; justify-self:end; font-size:.58rem; color:#3c4f72; }.web-browser__online span{width:6px;height:6px;border-radius:50%;background:#25c878;box-shadow:0 0 10px rgba(37,200,120,.7)}
.web-dashboard { display:grid; grid-template-columns:45px 1fr; height:calc(100% - 38px); border-radius:8px 8px 16px 16px; overflow:hidden; background:#f7f9fd; }
.web-dashboard__nav { display:flex; flex-direction:column; align-items:center; gap:13px; padding:10px 7px; background:linear-gradient(180deg,#163c86,#102c69); }.web-dashboard__brand strong{display:grid;place-items:center;width:28px;height:28px;border-radius:9px;color:#fff;background:linear-gradient(145deg,#32c7ff,#6d62ff);font-size:.72rem}.web-dashboard__nav span{width:24px;height:8px;border-radius:99px;background:rgba(255,255,255,.18)}.web-dashboard__nav span.is-active{height:24px;border-radius:8px;background:rgba(255,255,255,.92);box-shadow:0 8px 18px rgba(0,0,0,.15)}
.web-dashboard__content { padding:12px; min-width:0; }.web-dashboard__heading{display:flex;justify-content:space-between;align-items:center}.web-dashboard__heading div:first-child{display:grid;gap:2px}.web-dashboard__heading small{font-size:.55rem;color:#8c99b0}.web-dashboard__heading strong{font-size:.78rem;color:#14264d}.web-dashboard__avatar{width:25px;height:25px;border-radius:9px;background:linear-gradient(145deg,#bdd4ff,#769cff)}
.web-kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:10px}.web-kpi{position:relative;display:grid;gap:3px;padding:9px;border-radius:12px;background:#fff;border:1px solid rgba(32,79,166,.08);box-shadow:0 8px 16px rgba(35,70,143,.05)}.web-kpi::before{content:"";position:absolute;left:0;top:10px;bottom:10px;width:3px;border-radius:0 9px 9px 0;background:#3978ff}.web-kpi--violet::before{background:#8b61ff}.web-kpi--cyan::before{background:#21c8e9}.web-kpi small{font-size:.48rem;color:#8492ab}.web-kpi strong{font-size:.75rem;color:#15294f}.web-kpi em{font-size:.45rem;color:#19aa69;font-style:normal}
.web-dashboard__lower{display:grid;grid-template-columns:1.45fr .8fr;gap:8px;margin-top:8px}.web-chart-card,.web-activity-card{padding:9px;border-radius:12px;background:#fff;border:1px solid rgba(32,79,166,.07);box-shadow:0 8px 18px rgba(35,70,143,.04)}.web-chart-card__head{display:flex;justify-content:space-between;align-items:center}.web-chart-card__head strong,.web-activity-card>strong{font-size:.58rem;color:#1d3157}.web-chart-card__head span{font-size:.42rem;color:#8997af}.web-chart-card__graph{height:86px;margin-top:4px;background:linear-gradient(rgba(45,105,211,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(45,105,211,.05) 1px,transparent 1px);background-size:18px 18px;border-radius:8px;overflow:hidden}.web-chart-card__graph svg{width:100%;height:100%}.web-activity-card{display:grid;align-content:start;gap:9px}.web-activity-card>div{display:grid;grid-template-columns:7px 1fr auto;align-items:center;gap:5px}.web-activity-card span{font-size:.43rem;color:#60708e}.web-activity-card small{font-size:.38rem;color:#9aa6bb}.activity-dot{width:6px;height:6px;border-radius:50%;background:#3978ff}.activity-dot--2{background:#8b61ff}.activity-dot--3{background:#22c48b}
.web-device__stand{position:absolute;left:39%;bottom:0;width:22%;height:52px}.web-device__stand::before{content:"";position:absolute;left:41%;top:0;width:18%;height:38px;border-radius:0 0 12px 12px;background:linear-gradient(180deg,#1e4b9f,#123574)}.web-device__stand span{position:absolute;left:0;bottom:0;width:100%;height:12px;border-radius:99px;background:linear-gradient(90deg,#d8e3f8,#fff,#d8e3f8);box-shadow:0 8px 14px rgba(25,58,124,.12)}
.web-floating{position:absolute;z-index:7;padding:14px;border-radius:18px;background:rgba(255,255,255,.96);border:1px solid rgba(31,91,201,.12);box-shadow:0 24px 48px rgba(29,65,139,.16),inset 0 1px 0 #fff;backdrop-filter:blur(14px)}.web-floating--performance{right:0;top:22%;width:145px}.web-floating__icon{display:grid;place-items:center;width:38px;height:38px;border-radius:13px;background:linear-gradient(145deg,#e8f2ff,#fff);color:#3476ff;font-size:1.1rem}.web-floating small{display:block;margin-top:10px;color:#8492aa;font-size:.55rem}.web-floating strong{display:block;margin-top:2px;color:#142a55;font-size:1rem}.web-mini-bars{display:flex;align-items:end;gap:4px;height:38px;margin-top:9px}.web-mini-bars i{flex:1;border-radius:6px 6px 2px 2px;background:linear-gradient(180deg,#27c6ff,#6e63ff)}.web-floating--deploy{left:2%;bottom:11%;display:flex;align-items:center;gap:10px;width:165px}.deploy-status{width:10px;height:10px;border-radius:50%;background:#25c878;box-shadow:0 0 14px rgba(37,200,120,.8)}.web-floating--deploy div{display:grid;gap:2px}.web-floating--deploy small{margin:0}.web-floating--deploy strong{font-size:.66rem;margin:0}

/* MOBILE ULTRA */
.mobile-phone{position:absolute;border:7px solid #10295f;background:linear-gradient(145deg,#183c84,#0f285f);box-shadow:0 34px 70px rgba(13,40,96,.24);overflow:hidden}.mobile-phone--back{left:20%;top:16%;width:34%;height:355px;border-radius:43px;transform:rotate(-7deg);background:linear-gradient(145deg,#93b6ff,#6b72ff 55%,#925eff)}.mobile-phone__camera{display:flex;gap:7px;padding:16px}.mobile-phone__camera i{width:18px;height:18px;border-radius:50%;background:#0c1d48;border:3px solid rgba(255,255,255,.32);box-shadow:inset 0 0 0 3px #193c83}.mobile-phone__brand{position:absolute;inset:0;display:grid;place-items:center;color:rgba(255,255,255,.82)}.mobile-phone__brand svg{width:46px;height:46px}.mobile-phone--front{left:36%;top:7%;width:42%;height:430px;border-radius:48px;padding:8px;background:linear-gradient(160deg,#153b84,#0e2456);z-index:4}.mobile-phone__island{position:absolute;z-index:5;top:12px;left:50%;width:78px;height:22px;border-radius:0 0 16px 16px;background:#0a1b43;transform:translateX(-50%)}.mobile-screen{position:relative;height:100%;padding:24px 13px 12px;border-radius:37px;background:linear-gradient(180deg,#f7faff,#edf3ff);overflow:hidden}.mobile-screen::before{content:"";position:absolute;right:-25%;top:-8%;width:66%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,#9a78ff55,transparent 70%)}.mobile-screen__header{position:relative;display:flex;justify-content:space-between;align-items:center}.mobile-screen__header div{display:grid;gap:2px}.mobile-screen__header small{font-size:.5rem;color:#8491aa}.mobile-screen__header strong{font-size:.72rem;color:#132858}.mobile-screen__avatar{width:26px;height:26px;border-radius:9px;background:linear-gradient(145deg,#d7e4ff,#819fff)}.mobile-balance{position:relative;margin-top:13px;padding:13px;border-radius:18px;color:#fff;background:linear-gradient(145deg,#446fff,#8b61ff);box-shadow:0 15px 25px rgba(92,92,230,.24)}.mobile-balance small,.mobile-balance strong,.mobile-balance em{display:block}.mobile-balance small{font-size:.5rem;opacity:.82}.mobile-balance strong{font-size:1.1rem;margin-top:3px}.mobile-balance em{position:absolute;right:12px;top:12px;padding:4px 7px;border-radius:99px;background:rgba(255,255,255,.18);font-size:.45rem;font-style:normal}.mobile-chart{display:flex;align-items:end;gap:5px;height:65px;margin-top:13px;padding:8px;border-radius:15px;background:#fff;border:1px solid rgba(62,96,164,.08)}.mobile-chart i{flex:1;border-radius:5px 5px 2px 2px;background:linear-gradient(180deg,#7c6cff,#2ac6ff)}.mobile-actions{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin-top:10px}.mobile-actions div{display:grid;place-items:center;gap:4px;padding:9px 4px;border-radius:13px;background:#fff;border:1px solid rgba(62,96,164,.08)}.mobile-actions span{display:grid;place-items:center;width:25px;height:25px;border-radius:9px;background:#eef3ff;color:#4a6aff;font-size:.68rem}.mobile-actions small{font-size:.43rem;color:#60708e}.mobile-order{display:grid;grid-template-columns:32px 1fr auto;gap:8px;align-items:center;margin-top:10px;padding:9px;border-radius:13px;background:#fff;border:1px solid rgba(62,96,164,.08)}.mobile-order__icon{width:32px;height:32px;border-radius:10px;background:linear-gradient(145deg,#d7f9eb,#75ddb0)}.mobile-order div{display:grid;gap:2px}.mobile-order strong{font-size:.48rem;color:#1d3157}.mobile-order small{font-size:.4rem;color:#8b98ad}.mobile-order em{font-size:.48rem;color:#172d57;font-style:normal;font-weight:700}.mobile-home-indicator{position:absolute;left:36%;right:36%;bottom:7px;height:4px;border-radius:99px;background:#17315f}
.platform-chip{position:absolute;z-index:7;display:grid;grid-template-columns:40px 1fr;gap:10px;align-items:center;padding:10px 14px;border-radius:17px;background:rgba(255,255,255,.97);border:1px solid rgba(62,96,164,.12);box-shadow:0 20px 40px rgba(35,70,143,.14)}.platform-chip>span{display:grid;place-items:center;width:40px;height:40px;border-radius:13px}.platform-chip svg{width:21px;height:21px}.platform-chip div{display:grid;gap:2px}.platform-chip strong{font-size:.72rem;color:#142a55}.platform-chip small{font-size:.48rem;color:#8895ab}.platform-chip--android{left:4%;top:23%}.platform-chip--android>span{color:#18a957;background:#e9fff2}.platform-chip--ios{right:2%;bottom:18%}.platform-chip--ios>span{color:#101d3c;background:#eef2f8}

/* INVOICE ULTRA */
.invoice-document{position:absolute;left:8%;top:8%;width:64%;min-height:405px;padding:20px;border-radius:24px;background:linear-gradient(180deg,#fff,#f8fbff);border:1px solid rgba(25,92,190,.1);box-shadow:0 32px 64px rgba(23,64,137,.16);overflow:hidden}.invoice-document__accent{position:absolute;left:0;top:0;bottom:0;width:6px;background:linear-gradient(180deg,#00b87a,#34d4a7)}.invoice-document__head{display:flex;justify-content:space-between;align-items:flex-start;gap:14px}.invoice-brand{display:flex;align-items:center;gap:10px}.invoice-brand>span{display:grid;place-items:center;width:42px;height:42px;border-radius:13px;background:linear-gradient(145deg,#dffff1,#bdf3dd);color:#00a86b;font-weight:800;font-size:.72rem}.invoice-brand div,.invoice-number{display:grid;gap:3px}.invoice-brand strong{font-size:.68rem;color:#17315a}.invoice-brand small,.invoice-number small{font-size:.48rem;color:#8b98ad}.invoice-number{text-align:right}.invoice-number strong{font-size:.67rem;color:#17315a}.invoice-number em{justify-self:end;padding:3px 7px;border-radius:99px;background:#e8fff4;color:#00a86b;font-size:.42rem;font-style:normal;font-weight:700}.invoice-meta-real{display:grid;grid-template-columns:1.2fr .8fr;gap:10px;margin-top:16px}.invoice-meta-real>div{display:grid;gap:3px;padding:11px;border-radius:13px;background:#f4f8ff;border:1px solid rgba(40,93,181,.07)}.invoice-meta-real small{font-size:.45rem;color:#8795aa}.invoice-meta-real strong{font-size:.58rem;color:#1b3157}.invoice-meta-real span{font-size:.43rem;color:#7d8ca5}.invoice-table-real{margin-top:13px;border:1px solid rgba(40,93,181,.08);border-radius:14px;overflow:hidden}.invoice-table-real__row{display:grid;grid-template-columns:1.6fr .5fr .7fr;gap:8px;padding:9px 11px;background:#fff;border-top:1px solid rgba(40,93,181,.06)}.invoice-table-real__row:first-child{border-top:0}.invoice-table-real__row.is-head{background:#edf4ff}.invoice-table-real__row span{font-size:.46rem;color:#667693}.invoice-table-real__row span:last-child{text-align:right;color:#1d3157;font-weight:600}.invoice-document__footer{display:flex;justify-content:space-between;align-items:end;margin-top:14px}.invoice-qr{width:48px;height:48px;border-radius:7px;background:repeating-conic-gradient(#17315a 0 25%,#fff 0 50%) 50%/10px 10px;border:4px solid #fff;box-shadow:0 0 0 1px rgba(20,49,90,.12)}.invoice-total{display:grid;gap:2px;text-align:right}.invoice-total small{font-size:.5rem;color:#8190a8}.invoice-total strong{font-size:1rem;color:#102a54}
.invoice-validation-card{position:absolute;z-index:6;right:3%;top:24%;width:190px;min-height:230px;padding:18px;border-radius:24px;color:#fff;background:linear-gradient(155deg,#123a86,#2054be 68%,#2470d9);box-shadow:0 30px 58px rgba(18,55,124,.28),inset 0 1px 0 rgba(255,255,255,.2)}.invoice-validation-card__seal{display:grid;place-items:center;width:48px;height:48px;border-radius:16px;background:rgba(255,255,255,.16);box-shadow:inset 0 0 0 1px rgba(255,255,255,.16)}.invoice-validation-card small{display:block;margin-top:15px;font-size:.54rem;opacity:.72}.invoice-validation-card strong{display:block;margin-top:3px;font-size:.88rem}.invoice-validation-card p{margin:10px 0 0;font-size:.52rem;line-height:1.5;opacity:.72}.invoice-progress{height:6px;margin-top:14px;border-radius:99px;background:rgba(255,255,255,.16);overflow:hidden}.invoice-progress i{display:block;height:100%;border-radius:inherit;background:linear-gradient(90deg,#54edbd,#fff)}.invoice-validation-card__status{position:absolute;left:18px;bottom:18px;display:flex;align-items:center;gap:6px;padding:6px 10px;border-radius:99px;background:rgba(255,255,255,.13);font-size:.48rem;font-weight:700}.invoice-validation-card__status i{width:6px;height:6px;border-radius:50%;background:#5cffbd;box-shadow:0 0 10px #5cffbd}.invoice-floating-badge{position:absolute;z-index:7;left:2%;bottom:8%;display:flex;align-items:center;gap:10px;padding:11px 14px;border-radius:17px;background:rgba(255,255,255,.97);color:#00a86b;border:1px solid rgba(0,168,107,.12);box-shadow:0 18px 36px rgba(22,103,81,.13)}.invoice-floating-badge div{display:grid;gap:2px}.invoice-floating-badge small{font-size:.46rem;color:#8795aa}.invoice-floating-badge strong{font-size:.65rem;color:#17315a}

/* SAAS ULTRA */
.saas-links{position:absolute;inset:0;width:100%;height:100%;overflow:visible}.saas-links path{fill:none;stroke:#52b8ff;stroke-width:2;stroke-dasharray:7 8;opacity:.48}.saas-cloud-core{position:absolute;z-index:5;left:31%;top:4%;width:38%;height:150px;display:grid;place-items:center;align-content:center;gap:5px;border-radius:42% 42% 38% 38%/55% 55% 42% 42%;background:linear-gradient(145deg,rgba(255,255,255,.98),rgba(231,244,255,.93));border:1px solid rgba(27,143,232,.13);box-shadow:0 28px 60px rgba(26,114,189,.15),inset 0 1px 0 #fff}.saas-cloud-core::before,.saas-cloud-core::after{content:"";position:absolute;border-radius:50%;background:inherit;border:inherit}.saas-cloud-core::before{left:6%;top:-24%;width:43%;height:72%}.saas-cloud-core::after{right:8%;top:-17%;width:34%;height:58%}.saas-cloud-core__halo{position:absolute;inset:-30%;z-index:-1;border-radius:50%;background:radial-gradient(circle,rgba(34,180,255,.2),transparent 66%);filter:blur(10px)}.saas-cloud-core__icon{position:relative;z-index:2;color:#168fff}.saas-cloud-core small,.saas-cloud-core strong,.saas-cloud-core span{position:relative;z-index:2}.saas-cloud-core small{font-size:.5rem;color:#7c91aa;letter-spacing:.1em}.saas-cloud-core strong{font-size:.78rem;color:#14305e}.saas-cloud-core span{display:flex;align-items:center;gap:5px;font-size:.45rem;color:#3a6f7d}.saas-cloud-core span i{width:6px;height:6px;border-radius:50%;background:#25c878;box-shadow:0 0 10px rgba(37,200,120,.7)}
.saas-modules{position:absolute;z-index:4;left:6%;right:6%;top:48%;display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.saas-module{display:grid;grid-template-columns:42px 1fr auto;gap:10px;align-items:center;padding:12px;border-radius:18px;background:rgba(255,255,255,.96);border:1px solid rgba(33,134,221,.12);box-shadow:0 20px 38px rgba(28,83,151,.12),inset 0 1px 0 #fff}.saas-module__icon{display:grid;place-items:center;width:42px;height:42px;border-radius:14px;color:#168fff;background:linear-gradient(145deg,#e5f5ff,#fff);font-size:1rem}.saas-module div{display:grid;gap:2px}.saas-module small{font-size:.48rem;color:#8290a8}.saas-module strong{font-size:.7rem;color:#17315a}.saas-module em{font-size:.7rem;color:#1d9cf0;font-style:normal}.saas-module--2 .saas-module__icon{color:#7d62ff;background:linear-gradient(145deg,#efeaff,#fff)}.saas-module--3 .saas-module__icon{color:#18ac78;background:linear-gradient(145deg,#e7fff5,#fff)}
.saas-console{position:absolute;z-index:6;left:14%;right:14%;bottom:1%;height:195px;border-radius:22px;padding:10px;background:linear-gradient(145deg,#102d69,#1c4ba1);box-shadow:0 34px 66px rgba(12,45,104,.25),inset 0 1px 0 rgba(255,255,255,.18)}.saas-console__head{display:grid;grid-template-columns:65px 1fr auto;align-items:center;height:32px;padding:0 8px;color:#fff}.saas-console__head>div{display:flex;gap:5px}.saas-console__head>div span{width:7px;height:7px;border-radius:50%;background:rgba(255,255,255,.35)}.saas-console__head>div span:first-child{background:#ff6d82}.saas-console__head>div span:nth-child(2){background:#ffc75a}.saas-console__head>div span:nth-child(3){background:#4ad68c}.saas-console__head strong{font-size:.58rem}.saas-console__head em{padding:4px 7px;border-radius:99px;background:rgba(39,210,155,.17);color:#69f0bd;font-size:.42rem;font-style:normal}.saas-console__body{display:grid;grid-template-columns:42px 1fr;height:calc(100% - 32px);border-radius:14px;background:#f7faff;overflow:hidden}.saas-console__body aside{display:flex;flex-direction:column;align-items:center;gap:12px;padding:11px 7px;background:#eaf1ff}.saas-console__body aside span{width:22px;height:7px;border-radius:99px;background:#b8c8e8}.saas-console__body aside span.is-active{height:25px;border-radius:8px;background:#4c7cff}.saas-console__body main{padding:11px}.saas-console__stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.saas-console__stats div{display:grid;gap:3px;padding:8px;border-radius:11px;background:#fff;border:1px solid rgba(33,91,184,.07)}.saas-console__stats small{font-size:.42rem;color:#8896ad}.saas-console__stats strong{font-size:.68rem;color:#18315b}.saas-console__chart{display:grid;gap:8px;margin-top:10px;padding:11px;border-radius:12px;background:#fff}.saas-console__chart i{display:block;height:9px;border-radius:99px;background:linear-gradient(90deg,#25c8ff,#6e63ff)}

@media(max-width:640px){
  .web-device{left:2%;width:82%;transform:scale(.9);transform-origin:left center}.web-floating--performance{width:120px;padding:11px}.web-floating--deploy{display:none}
  .mobile-phone--back{left:12%;width:38%;height:310px}.mobile-phone--front{left:32%;width:50%;height:360px}.platform-chip--android{left:0}.platform-chip--ios{right:0}
  .invoice-document{left:2%;width:70%;min-height:330px;padding:14px}.invoice-validation-card{right:0;width:145px;min-height:190px;padding:14px}.invoice-floating-badge{display:none}
  .saas-cloud-core{left:26%;width:48%}.saas-modules{left:2%;right:2%;gap:7px}.saas-module{grid-template-columns:34px 1fr;padding:8px}.saas-module em{display:none}.saas-console{left:5%;right:5%;height:165px}
}


/* ===== PREMIUM WHITE + ULTRA ICONS + MOBILE QUALITY OVERRIDES ===== */
.services-premium {
  background: #ffffff;
}

.services-premium::before {
  background-image:
    linear-gradient(rgba(20, 74, 173, 0.028) 1px, transparent 1px),
    linear-gradient(90deg, rgba(20, 74, 173, 0.028) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: linear-gradient(to bottom, transparent, #000 8%, #000 92%, transparent);
}

.services-premium__glow {
  display: none;
}

.services-premium__top {
  gap: clamp(28px, 3vw, 52px);
}

.services-premium__tabs {
  gap: 12px;
  margin-top: 30px;
  border-top: 0;
}

.services-premium__tab {
  grid-template-columns: 34px 56px minmax(0, 1fr);
  gap: 14px;
  min-height: 82px;
  padding: 10px 12px 10px 16px;
  border: 1px solid rgba(36, 73, 145, 0.09);
  border-radius: 22px;
  background: linear-gradient(180deg, #ffffff 0%, #fbfdff 100%);
  box-shadow:
    0 10px 28px rgba(38, 74, 145, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
}

.services-premium__tab::before {
  top: 14px;
  bottom: 14px;
  left: 8px;
  width: 4px;
}

.services-premium__tab::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  border: 1px solid rgba(255, 255, 255, 0.65);
}

.services-premium__tab:hover {
  background: linear-gradient(180deg, #ffffff 0%, #f7faff 100%);
  box-shadow:
    0 16px 36px rgba(38, 74, 145, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.95);
}

.services-premium__tab.is-active {
  background: linear-gradient(180deg, #ffffff 0%, #f6faff 100%);
  box-shadow:
    0 18px 38px rgba(38, 74, 145, 0.10),
    inset 0 1px 0 rgba(255, 255, 255, 0.95);
}

.services-premium__tab-number {
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: #6a7895;
}

.services-premium__tab-icon {
  position: relative;
  width: 56px;
  height: 56px;
  border-radius: 18px;
  border: 1px solid rgba(23, 109, 255, 0.12);
  background:
    radial-gradient(circle at 28% 25%, rgba(255,255,255,0.98), rgba(255,255,255,0.88) 30%, transparent 31%),
    linear-gradient(180deg, #ffffff 0%, #edf4ff 100%);
  color: #2855b7;
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.92),
    0 14px 30px rgba(35, 70, 143, 0.09);
}

.services-premium__tab-icon::before {
  content: "";
  position: absolute;
  inset: 4px;
  border-radius: 14px;
  background: linear-gradient(180deg, rgba(255,255,255,0.96), rgba(238,245,255,0.86));
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.94);
}

.services-premium__tab-icon::after {
  content: "";
  position: absolute;
  left: 9px;
  right: 9px;
  bottom: 7px;
  height: 10px;
  border-radius: 999px;
  background: radial-gradient(ellipse, rgba(73, 112, 196, 0.18), transparent 72%);
}

.services-premium__tab-icon svg {
  position: relative;
  z-index: 2;
  width: 22px;
  height: 22px;
  filter: drop-shadow(0 1px 0 rgba(255,255,255,0.85));
}

.services-premium__tab:hover .services-premium__tab-icon,
.services-premium__tab.is-active .services-premium__tab-icon {
  border-color: color-mix(in srgb, var(--tab-accent, #176dff) 20%, rgba(23, 109, 255, 0.05));
  color: var(--tab-accent, #176dff);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.95),
    0 18px 36px color-mix(in srgb, var(--tab-accent, #176dff) 18%, transparent);
}

.services-premium__tab:hover .services-premium__tab-icon::before,
.services-premium__tab.is-active .services-premium__tab-icon::before {
  background: linear-gradient(
    180deg,
    rgba(255,255,255,0.98),
    color-mix(in srgb, var(--tab-accent, #176dff) 10%, #edf5ff)
  );
}

.services-premium__tab-label {
  font-size: 1rem;
  color: #16264b;
}

.services-premium__tab-active {
  inset: 4px;
  border-radius: 18px;
  background: linear-gradient(90deg, rgba(239, 246, 255, 0.96), rgba(255,255,255,0.68));
  box-shadow: 0 12px 26px color-mix(in srgb, var(--tab-accent, #176dff) 10%, transparent);
}

.services-premium__panel {
  background: #ffffff;
  backdrop-filter: none;
  box-shadow:
    0 20px 55px rgba(39, 73, 142, 0.08),
    inset 0 1px 0 rgba(255,255,255,0.9);
}

.services-premium__panel::after {
  opacity: 0.55;
}

.services-premium__visual-shell {
  border-color: rgba(23, 109, 255, 0.07);
  background:
    radial-gradient(circle at 74% 22%, rgba(104, 148, 255, 0.10), transparent 24%),
    linear-gradient(145deg, #ffffff, #f7fbff);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.82),
    inset 0 -16px 34px rgba(42, 91, 190, 0.03),
    0 18px 48px rgba(41, 86, 170, 0.06);
}

.visual-node {
  border: 1px solid rgba(23, 109, 255, 0.10);
  background: #ffffff;
  box-shadow: 0 12px 28px rgba(35, 75, 155, 0.10);
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

.services-premium__bottom {
  background: #ffffff;
  box-shadow: 0 14px 34px rgba(40, 74, 145, 0.05);
}

.services-premium__benefit-icon {
  background: linear-gradient(180deg, #ffffff, #f2f7ff);
  box-shadow: 0 10px 22px rgba(36, 74, 145, 0.05);
}

@media (max-width: 920px) {
  .services-premium {
    padding-block: 44px 52px;
  }

  .services-premium__container {
    width: min(100% - 22px, 920px);
  }

  .services-premium__intro {
    text-align: left;
  }

  .services-premium__eyebrow,
  .services-premium__title,
  .services-premium__description {
    margin-left: 0;
    margin-right: 0;
  }

  .services-premium__title {
    max-width: 100%;
  }

  .services-premium__description {
    max-width: 100%;
  }

  .services-premium__tabs {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }

  .services-premium__tab {
    grid-template-columns: 30px 52px minmax(0, 1fr);
    min-height: 80px;
    padding: 10px 12px 10px 14px;
    text-align: left;
  }

  .services-premium__tab-icon {
    width: 52px;
    height: 52px;
    margin-inline: 0;
  }

  .services-premium__panel-content {
    gap: 26px;
    padding: 28px 24px;
  }

  .services-premium__visual {
    min-height: 470px;
  }

  .services-premium__panel,
  .services-premium__panel-content,
  .services-premium__visual,
  .services-premium__visual-stage,
  .services-premium__visual-stage * {
    backface-visibility: hidden;
    -webkit-font-smoothing: antialiased;
    text-rendering: geometricPrecision;
  }

  .services-premium__panel::after {
    background:
      radial-gradient(400px circle at var(--pointer-x, 72%) var(--pointer-y, 24%), var(--service-soft), transparent 40%);
    animation: none;
  }

  .services-premium__orb {
    filter: none;
    opacity: 0.52;
  }

  .services-premium__scene {
    overflow: visible;
  }
}

@media (max-width: 640px) {
  .services-premium__title {
    font-size: clamp(2.15rem, 11vw, 3rem);
    line-height: 0.98;
  }

  .services-premium__tabs {
    display: flex;
    gap: 12px;
    overflow-x: auto;
    padding-bottom: 2px;
    scroll-snap-type: x mandatory;
  }

  .services-premium__tab {
    flex: 0 0 250px;
    scroll-snap-align: start;
    grid-template-columns: 30px 52px minmax(0, 1fr);
    min-height: 82px;
    padding: 10px 12px 10px 14px;
  }

  .services-premium__panel {
    border-radius: 24px;
  }

  .services-premium__panel-content {
    padding: 24px 20px 22px;
  }

  .services-premium__panel-title {
    font-size: clamp(2rem, 8vw, 2.3rem);
  }

  .services-premium__panel-description {
    max-width: 100%;
    font-size: 1rem;
    line-height: 1.58;
  }

  .services-premium__features {
    gap: 12px;
  }

  .services-premium__feature {
    font-size: 0.92rem;
  }

  .services-premium__button {
    min-height: 48px;
    padding-inline: 20px;
    font-size: 0.9rem;
  }

  .services-premium__visual {
    min-height: 420px;
  }

  .services-premium__visual-stage {
    transform-style: flat;
  }

  .visual-node {
    width: 42px;
    height: 42px;
    border-radius: 14px;
  }

  .visual-web__workspace {
    inset: 12% 1% 5% 1%;
  }

  .visual-web__monitor {
    left: 3%;
    width: 79%;
    min-height: 232px;
    padding: 12px;
  }

  .visual-web__widget {
    top: 16%;
    right: 1%;
    width: 31%;
    min-height: 158px;
    padding: 12px;
  }

  .visual-mobile__phone {
    top: 10%;
    left: 21%;
    width: 56%;
    min-height: 338px;
  }

  .visual-mobile__badge {
    min-height: 44px;
    padding-inline: 12px;
    font-size: 0.79rem;
  }

  .visual-mobile__badge--android {
    left: 3%;
    top: 20%;
  }

  .visual-mobile__badge--ios {
    right: 1%;
    bottom: 18%;
  }

  .visual-invoice__sheet {
    top: 8%;
    left: 5%;
    width: 68%;
    min-height: 342px;
  }

  .visual-invoice__card {
    right: 1%;
    top: 24%;
    width: 31%;
    min-height: 180px;
  }

  .visual-saas__cloud {
    left: 18%;
    width: 56%;
    height: 132px;
  }

  .visual-saas__company {
    left: 5%;
    width: 88%;
    bottom: 8%;
    min-height: 244px;
  }

  .visual-saas__modules {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .services-premium__container {
    width: min(100% - 16px, 920px);
  }

  .services-premium__tab {
    flex-basis: 236px;
  }

  .services-premium__panel-content {
    padding: 20px 16px 20px;
  }

  .services-premium__visual {
    min-height: 390px;
  }

  .visual-web__monitor {
    width: 82%;
    min-height: 214px;
  }

  .visual-web__widget {
    width: 32%;
    min-height: 146px;
  }

  .visual-mobile__phone {
    left: 18%;
    width: 62%;
    min-height: 316px;
  }

  .visual-mobile__badge {
    transform: scale(0.98);
    transform-origin: center;
  }

  .visual-invoice__sheet {
    width: 72%;
    min-height: 330px;
  }

  .visual-invoice__card {
    width: 30%;
    min-height: 170px;
  }

  .visual-saas__cloud {
    left: 15%;
    width: 60%;
  }

  .visual-saas__company {
    min-height: 232px;
  }
}


/* ===== MOBILE SERVICE NAVIGATION: CLEAR 2X2 SELECTOR ===== */
.services-premium__services-nav-head {
  display: none;
}

.services-premium__tab-state {
  display: none;
}

@media (max-width: 640px) {
  .services-premium__services-nav {
    margin-top: 28px;
  }

  .services-premium__services-nav-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 12px;
    color: #142449;
  }

  .services-premium__services-nav-head span {
    font-size: 0.92rem;
    font-weight: 700;
  }

  .services-premium__services-nav-head small {
    display: inline-flex;
    align-items: center;
    min-height: 28px;
    padding: 0 10px;
    border: 1px solid rgba(23, 109, 255, 0.10);
    border-radius: 999px;
    background: #f6f9ff;
    color: #657493;
    font-size: 0.72rem;
    font-weight: 700;
  }

  .services-premium__tabs {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
    overflow: visible;
    padding: 0;
    scroll-snap-type: none;
  }

  .services-premium__tab {
    position: relative;
    display: grid;
    grid-template-columns: 46px minmax(0, 1fr);
    grid-template-areas:
      "icon label"
      "icon state";
    align-items: center;
    gap: 2px 10px;
    min-width: 0;
    min-height: 94px;
    padding: 14px 12px;
    border-radius: 20px;
    text-align: left;
    overflow: hidden;
  }

  .services-premium__tab::before {
    top: auto;
    right: 14px;
    bottom: 0;
    left: 14px;
    width: auto;
    height: 4px;
    border-radius: 999px 999px 0 0;
  }

  .services-premium__tab-number {
    position: absolute;
    top: 9px;
    right: 10px;
    z-index: 3;
    font-size: 0.68rem;
    line-height: 1;
    color: #8a96ad;
  }

  .services-premium__tab-icon {
    grid-area: icon;
    width: 46px;
    height: 46px;
    margin: 0;
    border-radius: 15px;
  }

  .services-premium__tab-icon::before {
    inset: 3px;
    border-radius: 12px;
  }

  .services-premium__tab-icon::after {
    left: 7px;
    right: 7px;
    bottom: 5px;
    height: 8px;
  }

  .services-premium__tab-icon svg {
    width: 20px;
    height: 20px;
  }

  .services-premium__tab-label {
    grid-area: label;
    min-width: 0;
    padding-right: 14px;
    color: #17264a;
    font-size: 0.86rem;
    line-height: 1.18;
    font-weight: 700;
    overflow-wrap: anywhere;
  }

  .services-premium__tab-state {
    grid-area: state;
    display: inline-flex;
    align-items: center;
    width: fit-content;
    margin-top: 3px;
    color: #7d8aa5;
    font-size: 0.68rem;
    line-height: 1;
    font-weight: 600;
  }

  .services-premium__tab.is-active .services-premium__tab-state {
    color: var(--tab-accent, #176dff);
  }

  .services-premium__tab.is-active .services-premium__tab-state::before {
    content: "";
    width: 6px;
    height: 6px;
    margin-right: 6px;
    border-radius: 50%;
    background: var(--tab-accent, #176dff);
    box-shadow: 0 0 10px color-mix(in srgb, var(--tab-accent, #176dff) 50%, transparent);
  }

  .services-premium__tab-active {
    inset: 3px;
    border-radius: 17px;
  }
}

@media (max-width: 380px) {
  .services-premium__tabs {
    grid-template-columns: 1fr;
  }

  .services-premium__tab {
    min-height: 82px;
  }
}


/* ===== FINAL COMPACT PREMIUM OVERRIDES ===== */
.services-premium {
  padding: clamp(42px, 4.5vw, 64px) 0;
  background: #ffffff;
}

.services-premium__container {
  width: min(1320px, calc(100% - 28px));
}

.services-premium__top {
  grid-template-columns: minmax(290px, 0.7fr) minmax(660px, 1.3fr);
  gap: clamp(26px, 3vw, 44px);
}

.services-premium__eyebrow {
  min-height: 32px;
  padding-inline: 13px;
  border: 1px solid rgba(23, 109, 255, 0.09);
  background: #f7faff;
  font-size: 0.7rem;
  box-shadow: none;
}

.services-premium__eyebrow-dot {
  width: 7px;
  height: 7px;
  box-shadow: 0 0 0 5px rgba(23, 109, 255, 0.08);
}

.services-premium__title {
  max-width: 570px;
  margin: 16px 0 11px;
  font-size: clamp(1.95rem, 2.65vw, 3rem);
  line-height: 1.03;
  letter-spacing: -0.042em;
}

.services-premium__title span::after {
  bottom: -5px;
  height: 3px;
}

.services-premium__description {
  max-width: 530px;
  font-size: 0.84rem;
  line-height: 1.62;
}

.services-premium__services-nav {
  margin-top: 22px;
}

.services-premium__tabs {
  display: grid;
  gap: 8px;
  margin-top: 0;
}

/* Navegación blanca premium, compacta y sin glass */
.services-premium__tab {
  position: relative;
  display: grid;
  grid-template-columns: 28px 42px minmax(0, 1fr) 18px;
  gap: 10px;
  align-items: center;
  min-height: 58px;
  padding: 8px 10px;
  overflow: hidden;
  border: 1px solid rgba(42, 77, 146, 0.085);
  border-radius: 15px;
  background: #ffffff;
  color: #65728d;
  box-shadow:
    0 7px 18px rgba(33, 67, 135, 0.03),
    inset 0 1px 0 rgba(255, 255, 255, 0.98);
  transition:
    transform 180ms ease,
    border-color 180ms ease,
    box-shadow 180ms ease,
    color 180ms ease;
}

.services-premium__tab::before,
.services-premium__tab::after {
  display: none;
}

.services-premium__tab:hover {
  transform: translateY(-2px);
  border-color: rgba(23, 109, 255, 0.14);
  background: #ffffff;
  color: #152441;
  box-shadow:
    0 11px 24px rgba(33, 67, 135, 0.055),
    inset 0 1px 0 rgba(255, 255, 255, 0.98);
}

.services-premium__tab.is-active {
  transform: none;
  border-color: color-mix(
    in srgb,
    var(--tab-accent, #176dff) 26%,
    rgba(23, 109, 255, 0.08)
  );
  background: #ffffff;
  color: #10203e;
  box-shadow:
    0 12px 27px color-mix(
      in srgb,
      var(--tab-accent, #176dff) 10%,
      transparent
    ),
    inset 3px 0 0 var(--tab-accent, #176dff);
}

.services-premium__tab-active {
  position: absolute;
  inset: 0;
  z-index: 0;
  border: 0;
  border-radius: inherit;
  background:
    linear-gradient(
      90deg,
      color-mix(in srgb, var(--tab-accent, #176dff) 6%, white),
      #ffffff 48%
    );
  box-shadow: none;
}

.services-premium__tab-number {
  position: relative;
  z-index: 2;
  color: #7b879d;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0;
}

.services-premium__tab.is-active .services-premium__tab-number {
  color: var(--tab-accent, #176dff);
}

.services-premium__tab-icon {
  position: relative;
  z-index: 2;
  width: 42px;
  height: 42px;
  margin: 0;
  border: 1px solid rgba(23, 109, 255, 0.08);
  border-radius: 12px;
  background: #f8fbff;
  color: #4368ad;
  box-shadow: none;
  transition:
    transform 220ms cubic-bezier(.22,1,.36,1),
    color 180ms ease,
    border-color 180ms ease,
    background 180ms ease;
}

.services-premium__tab-icon::before,
.services-premium__tab-icon::after {
  display: none;
}

.services-premium__tab-icon svg {
  width: 18px;
  height: 18px;
  filter: none;
}

.services-premium__tab:hover .services-premium__tab-icon,
.services-premium__tab.is-active .services-premium__tab-icon {
  transform: translateY(-1px);
  border-color: color-mix(
    in srgb,
    var(--tab-accent, #176dff) 18%,
    rgba(23, 109, 255, 0.06)
  );
  background: color-mix(
    in srgb,
    var(--tab-accent, #176dff) 7%,
    white
  );
  color: var(--tab-accent, #176dff);
  box-shadow: none;
}

.services-premium__tab-label {
  position: relative;
  z-index: 2;
  min-width: 0;
  color: #172746;
  font-size: 0.75rem;
  line-height: 1.25;
  font-weight: 600;
}

.services-premium__tab-state {
  position: relative;
  z-index: 2;
  display: grid;
  place-items: center;
  width: 18px;
  height: 18px;
  margin: 0;
  overflow: hidden;
  color: transparent;
  font-size: 0;
}

.services-premium__tab-state::after {
  content: "";
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #c6cfde;
}

.services-premium__tab.is-active .services-premium__tab-state::before {
  display: none;
}

.services-premium__tab.is-active .services-premium__tab-state::after {
  background: var(--tab-accent, #176dff);
  box-shadow: 0 0 0 5px color-mix(
    in srgb,
    var(--tab-accent, #176dff) 10%,
    transparent
  );
}

/* Panel más compacto sin tocar las escenas */
.services-premium__panel {
  min-height: 540px;
  border-radius: 24px;
  background: #ffffff;
  backdrop-filter: none;
  box-shadow:
    0 16px 42px rgba(39, 73, 142, 0.065),
    inset 0 1px 0 rgba(255,255,255,0.98);
}

.services-premium__panel-content {
  grid-template-columns: minmax(250px, 0.72fr) minmax(400px, 1.28fr);
  gap: 18px;
  min-height: 540px;
  padding: clamp(24px, 2.7vw, 36px);
}

.services-premium__panel-number {
  font-size: 0.88rem;
}

.services-premium__panel-line {
  width: 30px;
  height: 2px;
  margin: 11px 0 15px;
}

.services-premium__panel-title {
  font-size: clamp(1.55rem, 1.9vw, 2.15rem);
  line-height: 1.08;
}

.services-premium__panel-description {
  margin-top: 11px;
  font-size: 0.79rem;
  line-height: 1.58;
}

.services-premium__features {
  gap: 8px;
  margin-top: 16px;
}

.services-premium__feature {
  gap: 8px;
  font-size: 0.73rem;
  line-height: 1.38;
}

.services-premium__check {
  width: 18px;
  height: 18px;
}

.services-premium__promise {
  gap: 8px;
  margin-top: 16px;
  padding-top: 15px;
  font-size: 0.68rem;
}

.services-premium__promise-icon {
  width: 32px;
  height: 32px;
  border-radius: 10px;
}

.services-premium__button {
  min-height: 41px;
  padding-inline: 15px;
  border-radius: 11px;
  font-size: 0.72rem;
}

.services-premium__visual {
  min-height: 460px;
  perspective: 1600px;
}

/* Calidad visual: preserva animación sin rasterizado innecesario */
.services-premium__visual-stage,
.services-premium__visual-stage * {
  -webkit-font-smoothing: antialiased;
  text-rendering: geometricPrecision;
}

.services-premium__visual-stage {
  will-change: transform;
  transform-style: preserve-3d;
}

.services-premium__visual-shell {
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.95),
    inset 0 -18px 42px rgba(42,91,190,.025),
    0 16px 42px rgba(41,86,170,.05);
}

.services-premium__orb {
  opacity: 0.44;
  filter: none;
}

.visual-node {
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

/* Beneficios inferiores compactos */
.services-premium__bottom {
  margin-top: 16px;
  padding: 16px 18px;
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 10px 26px rgba(40, 74, 145, 0.04);
}

.services-premium__benefit {
  gap: 10px;
  padding-inline: 17px;
}

.services-premium__benefit-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
}

.services-premium__benefit h3 {
  font-size: 0.76rem;
}

.services-premium__benefit p {
  font-size: 0.66rem;
  line-height: 1.42;
}

@media (max-width: 1160px) {
  .services-premium__top {
    grid-template-columns: minmax(270px, 0.72fr) minmax(580px, 1.28fr);
    gap: 24px;
  }

  .services-premium__panel,
  .services-premium__panel-content {
    min-height: 520px;
  }

  .services-premium__visual {
    min-height: 440px;
  }
}

@media (max-width: 920px) {
  .services-premium {
    padding-block: 42px;
  }

  .services-premium__container {
    width: min(100% - 20px, 860px);
  }

  .services-premium__top {
    grid-template-columns: 1fr;
  }

  .services-premium__intro {
    text-align: left;
  }

  .services-premium__title,
  .services-premium__description {
    max-width: 680px;
    margin-left: 0;
    margin-right: 0;
  }

  .services-premium__tabs {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
  }

  .services-premium__tab {
    grid-template-columns: 26px 40px minmax(0, 1fr) 18px;
    min-height: 56px;
    padding: 7px 9px;
    text-align: left;
  }

  .services-premium__tab-icon {
    width: 40px;
    height: 40px;
  }

  .services-premium__panel-content {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .services-premium__visual {
    min-height: 450px;
  }
}

@media (max-width: 640px) {
  .services-premium {
    padding-block: 36px;
  }

  .services-premium__container {
    width: min(100% - 14px, 620px);
  }

  .services-premium__title {
    font-size: clamp(1.72rem, 8.7vw, 2.25rem);
    line-height: 1.02;
  }

  .services-premium__description {
    font-size: 0.74rem;
    line-height: 1.55;
  }

  .services-premium__services-nav {
    margin-top: 18px;
  }

  .services-premium__services-nav-head {
    margin-bottom: 8px;
  }

  .services-premium__services-nav-head span {
    font-size: 0.74rem;
  }

  .services-premium__services-nav-head small {
    min-height: 24px;
    padding-inline: 8px;
    font-size: 0.59rem;
  }

  .services-premium__tabs {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 7px;
    overflow: visible;
  }

  .services-premium__tab {
    grid-template-columns: 36px minmax(0, 1fr);
    grid-template-areas:
      "icon label"
      "icon number";
    gap: 2px 8px;
    min-height: 68px;
    padding: 9px;
    border-radius: 13px;
  }

  .services-premium__tab-number {
    position: static;
    grid-area: number;
    justify-self: start;
    font-size: 0.55rem;
  }

  .services-premium__tab-icon {
    grid-area: icon;
    width: 36px;
    height: 36px;
    border-radius: 10px;
  }

  .services-premium__tab-icon svg {
    width: 16px;
    height: 16px;
  }

  .services-premium__tab-label {
    grid-area: label;
    padding: 0;
    font-size: 0.66rem;
    line-height: 1.18;
  }

  .services-premium__tab-state {
    display: none;
  }

  .services-premium__panel {
    border-radius: 20px;
  }

  .services-premium__panel-content {
    padding: 20px 15px;
  }

  .services-premium__panel-title {
    font-size: 1.5rem;
  }

  .services-premium__panel-description {
    font-size: 0.73rem;
  }

  .services-premium__feature {
    font-size: 0.68rem;
  }

  .services-premium__button {
    min-height: 40px;
    font-size: 0.68rem;
  }

  .services-premium__visual {
    min-height: 390px;
  }

  .services-premium__bottom {
    gap: 12px;
    padding: 15px;
  }

  .services-premium__benefit {
    padding: 0;
  }
}

@media (max-width: 380px) {
  .services-premium__tabs {
    grid-template-columns: 1fr;
  }

  .services-premium__tab {
    min-height: 60px;
  }

  .services-premium__visual {
    min-height: 360px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .services-premium__tab,
  .services-premium__tab-icon {
    transition: none;
  }
}

`;

const BENEFITS = [
  {
    icon: TrendingUp,
    title: "Escalable",
    text: "Soluciones que crecen y se adaptan al ritmo de tu negocio.",
  },
  {
    icon: SlidersHorizontal,
    title: "A medida",
    text: "Desarrollos alineados a tus objetivos y necesidades.",
  },
  {
    icon: Handshake,
    title: "Acompañamiento real",
    text: "Comunicación y soporte durante cada etapa.",
  },
];

const VALID_SERVICE_TYPES = new Set(["web", "mobile", "invoice", "saas"]);

const SERVICE_TYPE_BY_ICON = {
  web: "web",
  app: "web",
  mobile: "mobile",
  shop: "invoice",
  receipt: "invoice",
  invoice: "invoice",
  cloud: "saas",
  automation: "saas",
};

function resolveServiceType(service, index = 0) {
  const explicitType = String(service?.type || "").trim().toLowerCase();
  if (VALID_SERVICE_TYPES.has(explicitType)) return explicitType;

  const iconType = SERVICE_TYPE_BY_ICON[String(service?.icon || "").trim().toLowerCase()];
  if (iconType) return iconType;

  const title = String(service?.title || "").trim().toLowerCase();

  if (title.includes("factura") || title.includes("comercio electrónico") || title.includes("e-commerce")) {
    return "invoice";
  }

  if (title.includes("móvil") || title.includes("movil") || title.includes("android") || title.includes("ios")) {
    return "mobile";
  }

  if (title.includes("saas") || title.includes("nube") || title.includes("cloud") || title.includes("automatización")) {
    return "saas";
  }

  if (title.includes("web") || title.includes("sitio") || title.includes("landing")) {
    return "web";
  }

  return ["web", "mobile", "invoice", "saas"][index % 4];
}

function normalizeServices(source) {
  if (!Array.isArray(source)) return [];

  const seen = new Set();

  return source
    .filter(
      (service) =>
        service &&
        typeof service.title === "string" &&
        typeof service.description === "string",
    )
    .map((service, index) => ({
      ...service,
      type: resolveServiceType(service, index),
      features: Array.isArray(service.features) ? service.features.slice(0, 4) : [],
    }))
    .filter((service) => {
      if (seen.has(service.type)) return false;
      seen.add(service.type);
      return true;
    });
}

function AndroidLogo({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7.26 7.25 5.93 4.94a.7.7 0 1 1 1.22-.7l1.36 2.36a8.2 8.2 0 0 1 6.98 0l1.36-2.36a.7.7 0 0 1 1.22.7l-1.33 2.31A7.1 7.1 0 0 1 20 12H4a7.1 7.1 0 0 1 3.26-4.75ZM8.5 9.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm7 0a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM4 13h16v5.25A1.75 1.75 0 0 1 18.25 20H17v1.25a1.25 1.25 0 0 1-2.5 0V20h-5v1.25a1.25 1.25 0 0 1-2.5 0V20H5.75A1.75 1.75 0 0 1 4 18.25V13Z" />
    </svg>
  );
}

function AppleLogo({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M15.82 2.1c.88-1.04 1.45-2.48 1.31-3.1-1.31.05-2.83.9-3.76 1.98-.84.96-1.56 2.4-1.39 3.83 1.44.11 2.94-.72 3.84-1.75v-.96ZM20.53 17.3c-.52 1.2-.78 1.74-1.45 2.8-.94 1.47-2.25 3.31-3.86 3.33-1.43.01-1.8-.9-3.73-.89-1.94.01-2.34.9-3.77.88-1.61-.02-2.84-1.69-3.78-3.16C1.35 16.4 1.46 11.88 4 10.16c1.8-1.22 4.59-.98 5.68.03.79.73 1.27.95 1.95.95.66 0 1.19-.22 2.06-.95 1.15-.97 3.74-1.04 5.42-.15-2.98 1.6-2.5 5.84 1.42 6.88v.38Z" />
    </svg>
  );
}

function WebVisual({ reducedMotion }) {
  const bars = [68, 43, 78, 56, 90, 70, 96];

  return (
    <div className="scene-web">
      <motion.div
        className="web-device"
        animate={reducedMotion ? undefined : { y: [0, -7, 0] }}
        transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="web-device__camera" />
        <div className="web-browser">
          <div className="web-browser__top">
            <div className="web-browser__dots"><i /><i /><i /></div>
            <div className="web-browser__url"><span className="web-browser__lock">●</span> app.dalotech.co</div>
            <div className="web-browser__online"><span /> Online</div>
          </div>

          <div className="web-dashboard">
            <aside className="web-dashboard__nav">
              <div className="web-dashboard__brand"><strong>D</strong></div>
              {[0, 1, 2, 3, 4].map((item) => <span key={item} className={item === 1 ? "is-active" : ""} />)}
            </aside>

            <main className="web-dashboard__content">
              <div className="web-dashboard__heading">
                <div><small>Panel empresarial</small><strong>Resumen general</strong></div>
                <div className="web-dashboard__avatar" />
              </div>

              <div className="web-kpis">
                <div className="web-kpi web-kpi--blue"><small>Ingresos</small><strong>$48.2M</strong><em>+18.4%</em></div>
                <div className="web-kpi web-kpi--violet"><small>Clientes</small><strong>1,284</strong><em>+12.1%</em></div>
                <div className="web-kpi web-kpi--cyan"><small>Conversión</small><strong>8.7%</strong><em>+4.6%</em></div>
              </div>

              <div className="web-dashboard__lower">
                <div className="web-chart-card">
                  <div className="web-chart-card__head"><strong>Rendimiento</strong><span>Últimos 7 días</span></div>
                  <div className="web-chart-card__graph">
                    <svg viewBox="0 0 320 130" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="webArea" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0" stopColor="#3978ff" stopOpacity=".34" />
                          <stop offset="1" stopColor="#3978ff" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path className="web-chart-area" d="M0 108 C35 100 40 76 70 82 C105 90 112 50 145 58 C175 66 185 25 220 35 C250 44 268 11 320 17 L320 130 L0 130 Z" fill="url(#webArea)" />
                      <motion.path
                        d="M0 108 C35 100 40 76 70 82 C105 90 112 50 145 58 C175 66 185 25 220 35 C250 44 268 11 320 17"
                        fill="none"
                        stroke="url(#webLine)"
                        strokeWidth="5"
                        strokeLinecap="round"
                        initial={reducedMotion ? false : { pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                      />
                      <defs>
                        <linearGradient id="webLine" x1="0" x2="1"><stop stopColor="#23c5ff"/><stop offset="1" stopColor="#6e61ff"/></linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>

                <div className="web-activity-card">
                  <strong>Actividad</strong>
                  {["Venta confirmada", "Nuevo cliente", "Factura enviada"].map((label, index) => (
                    <div key={label}><i className={`activity-dot activity-dot--${index + 1}`} /><span>{label}</span><small>{index + 2}m</small></div>
                  ))}
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="web-device__stand"><span /></div>
      </motion.div>

      <motion.div
        className="web-floating web-floating--performance"
        animate={reducedMotion ? undefined : { y: [0, -10, 0], rotateZ: [0, 1.2, 0] }}
        transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="web-floating__icon">↗</div>
        <small>Rendimiento</small>
        <strong>+38.6%</strong>
        <div className="web-mini-bars">{bars.map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}</div>
      </motion.div>

      <motion.div
        className="web-floating web-floating--deploy"
        animate={reducedMotion ? undefined : { y: [0, 8, 0], x: [0, 3, 0] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: .4 }}
      >
        <span className="deploy-status" />
        <div><small>Producción</small><strong>Deploy completado</strong></div>
      </motion.div>
    </div>
  );
}

function MobileVisual({ reducedMotion }) {
  return (
    <div className="scene-mobile">
      <motion.div
        className="mobile-phone mobile-phone--back"
        animate={reducedMotion ? undefined : { y: [0, 8, 0], rotateZ: [-7, -5.5, -7] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="mobile-phone__camera"><i /><i /></div>
        <div className="mobile-phone__brand"><AndroidLogo /></div>
      </motion.div>

      <motion.div
        className="mobile-phone mobile-phone--front"
        animate={reducedMotion ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="mobile-phone__island" />
        <div className="mobile-screen">
          <div className="mobile-screen__header">
            <div><small>Hola, David</small><strong>Tu negocio hoy</strong></div>
            <span className="mobile-screen__avatar" />
          </div>
          <div className="mobile-balance"><small>Ventas del día</small><strong>$2.840.000</strong><em>+16.8%</em></div>
          <div className="mobile-chart">
            {[34, 50, 42, 70, 58, 84, 72].map((height, index) => (
              <motion.i
                key={index}
                initial={reducedMotion ? false : { height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ delay: .18 + index * .07, duration: .5, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}
          </div>
          <div className="mobile-actions">
            <div><span>↗</span><small>Ventas</small></div>
            <div><span>□</span><small>Pedidos</small></div>
            <div><span>◎</span><small>Clientes</small></div>
          </div>
          <div className="mobile-order"><span className="mobile-order__icon"/><div><strong>Pedido #1082</strong><small>Pago confirmado</small></div><em>$186.000</em></div>
          <div className="mobile-home-indicator" />
        </div>
      </motion.div>

      <motion.div className="platform-chip platform-chip--android" animate={reducedMotion ? undefined : { x: [0, -6, 0], y: [0, -4, 0] }} transition={{ duration: 4.3, repeat: Infinity, ease: "easeInOut" }}>
        <span><AndroidLogo /></span><div><strong>Android</strong><small>Material 3</small></div>
      </motion.div>
      <motion.div className="platform-chip platform-chip--ios" animate={reducedMotion ? undefined : { x: [0, 6, 0], y: [0, 5, 0] }} transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}>
        <span><AppleLogo /></span><div><strong>iOS</strong><small>Cupertino</small></div>
      </motion.div>
    </div>
  );
}

function InvoiceVisual({ reducedMotion }) {
  return (
    <div className="scene-invoice">
      <motion.div
        className="invoice-document"
        animate={reducedMotion ? undefined : { y: [0, -6, 0], rotateZ: [-1.2, -.4, -1.2] }}
        transition={{ duration: 5.7, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="invoice-document__accent" />
        <div className="invoice-document__head">
          <div className="invoice-brand"><span>FE</span><div><strong>DALOTECH S.A.S.</strong><small>Factura electrónica de venta</small></div></div>
          <div className="invoice-number"><small>Factura No.</small><strong>DLT-001082</strong><em>DIAN</em></div>
        </div>
        <div className="invoice-meta-real">
          <div><small>Cliente</small><strong>Empresa Demo S.A.S.</strong><span>NIT 901.234.567-8</span></div>
          <div><small>Fecha de emisión</small><strong>13 Jul 2026</strong><span>Vence: 28 Jul 2026</span></div>
        </div>
        <div className="invoice-table-real">
          <div className="invoice-table-real__row is-head"><span>Descripción</span><span>Cant.</span><span>Valor</span></div>
          <div className="invoice-table-real__row"><span>Desarrollo e integración</span><span>1</span><span>$2.400.000</span></div>
          <div className="invoice-table-real__row"><span>Soporte empresarial</span><span>1</span><span>$360.000</span></div>
          <div className="invoice-table-real__row"><span>IVA</span><span>19%</span><span>$524.400</span></div>
        </div>
        <div className="invoice-document__footer"><span className="invoice-qr"/><div className="invoice-total"><small>Total</small><strong>$3.284.400</strong></div></div>
      </motion.div>

      <motion.div
        className="invoice-validation-card"
        animate={reducedMotion ? undefined : { y: [0, 9, 0], rotateZ: [2, 1, 2] }}
        transition={{ duration: 5.1, repeat: Infinity, ease: "easeInOut", delay: .2 }}
      >
        <div className="invoice-validation-card__seal"><Check size={22} strokeWidth={2.5}/></div>
        <small>Validación DIAN</small>
        <strong>Documento aprobado</strong>
        <p>CUFE verificado correctamente</p>
        <div className="invoice-progress"><motion.i initial={reducedMotion ? false : { width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.2, ease: "easeOut" }}/></div>
        <span className="invoice-validation-card__status"><i/> En línea</span>
      </motion.div>

      <motion.div className="invoice-floating-badge" animate={reducedMotion ? undefined : { scale: [1, 1.06, 1], y: [0, -4, 0] }} transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}>
        <ReceiptText size={18}/><div><small>Integración</small><strong>API conectada</strong></div>
      </motion.div>
    </div>
  );
}

function SaasVisual({ reducedMotion }) {
  const modules = [
    { icon: "▦", label: "Ventas", value: "1.284" },
    { icon: "◉", label: "Clientes", value: "842" },
    { icon: "◆", label: "Operaciones", value: "99.9%" },
  ];

  return (
    <div className="scene-saas">
      <svg className="saas-links" viewBox="0 0 700 500" preserveAspectRatio="none" aria-hidden="true">
        <path d="M350 120 C250 165 210 225 170 300" />
        <path d="M350 120 C350 180 350 220 350 300" />
        <path d="M350 120 C450 165 490 225 530 300" />
        {[0,1,2].map((i) => (
          <motion.circle key={i} r="5" fill="#24c8ff" initial={{ offsetDistance: "0%" }} animate={{ offsetDistance: "100%" }} transition={{ duration: 2.6, repeat: Infinity, ease: "linear", delay: i * .55 }} style={{ offsetPath: `path('${i===0?'M350 120 C250 165 210 225 170 300':i===1?'M350 120 C350 180 350 220 350 300':'M350 120 C450 165 490 225 530 300'}')` }} />
        ))}
      </svg>

      <motion.div className="saas-cloud-core" animate={reducedMotion ? undefined : { y: [0, -8, 0], scale: [1, 1.02, 1] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
        <div className="saas-cloud-core__halo" />
        <div className="saas-cloud-core__icon"><Cloud size={42} strokeWidth={1.8}/></div>
        <small>DALOTECH CLOUD</small>
        <strong>Infraestructura activa</strong>
        <span><i/> 99.99% disponibilidad</span>
      </motion.div>

      <div className="saas-modules">
        {modules.map((module, index) => (
          <motion.div
            key={module.label}
            className={`saas-module saas-module--${index + 1}`}
            animate={reducedMotion ? undefined : { y: [0, index % 2 ? 7 : -7, 0] }}
            transition={{ duration: 4.4 + index * .4, repeat: Infinity, ease: "easeInOut", delay: index * .25 }}
          >
            <span className="saas-module__icon">{module.icon}</span>
            <div><small>{module.label}</small><strong>{module.value}</strong></div>
            <em>↗</em>
          </motion.div>
        ))}
      </div>

      <motion.div className="saas-console" animate={reducedMotion ? undefined : { y: [0, -5, 0] }} transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}>
        <div className="saas-console__head"><div><span/><span/><span/></div><strong>Centro de operaciones</strong><em>Tiempo real</em></div>
        <div className="saas-console__body">
          <aside><span className="is-active"/><span/><span/><span/></aside>
          <main>
            <div className="saas-console__stats"><div><small>Procesos</small><strong>248</strong></div><div><small>Usuarios</small><strong>1.082</strong></div><div><small>Alertas</small><strong>0</strong></div></div>
            <div className="saas-console__chart"><motion.i initial={reducedMotion ? false : { width: 0 }} animate={{ width: "84%" }} transition={{ duration: 1.2, ease: "easeOut" }}/><motion.i initial={reducedMotion ? false : { width: 0 }} animate={{ width: "62%" }} transition={{ duration: 1.2, delay:.12, ease: "easeOut" }}/><motion.i initial={reducedMotion ? false : { width: 0 }} animate={{ width: "93%" }} transition={{ duration: 1.2, delay:.24, ease: "easeOut" }}/></div>
          </main>
        </div>
      </motion.div>
    </div>
  );
}

function ServiceVisual({ type, iconName, reducedMotion }) {
  const visualRef = useRef(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateXRaw = useTransform(pointerY, [-0.5, 0.5], [5.5, -5.5]);
  const rotateYRaw = useTransform(pointerX, [-0.5, 0.5], [-7, 7]);
  const rotateX = useSpring(rotateXRaw, { stiffness: 150, damping: 18, mass: 0.55 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 150, damping: 18, mass: 0.55 });

  const handlePointerMove = (event) => {
    if (reducedMotion || !visualRef.current) return;
    const bounds = visualRef.current.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <motion.div
      ref={visualRef}
      key={type}
      className={`services-premium__visual services-premium__visual--${type}`}
      initial={reducedMotion ? false : { opacity: 0, scale: 0.96, x: 22 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.97, x: -16 }}
      transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      aria-hidden="true"
    >
      <div className="services-premium__scene">
        <motion.span
          className="services-premium__orb services-premium__orb--one"
          animate={reducedMotion ? undefined : { x: [0, -16, 8, 0], y: [0, 12, -8, 0], scale: [1, 1.06, 0.98, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          className="services-premium__orb services-premium__orb--two"
          animate={reducedMotion ? undefined : { x: [0, 10, -8, 0], y: [0, -14, 8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        />
        {[0, 1, 2, 3].map((particle) => (
          <motion.span
            key={particle}
            className="services-premium__particle"
            animate={reducedMotion ? undefined : { y: [0, -12, 0], opacity: [0.25, 0.8, 0.25] }}
            transition={{ duration: 2.8 + particle * 0.45, repeat: Infinity, ease: "easeInOut", delay: particle * 0.35 }}
          />
        ))}
      </div>

      <motion.div
        className="services-premium__visual-stage"
        style={reducedMotion ? undefined : { rotateX, rotateY, transformPerspective: 1100 }}
      >
        <div className="services-premium__visual-shell" />

        <motion.div
          className="visual-node visual-node--one"
          initial={reducedMotion ? false : { opacity: 0, y: 14, scale: 0.9 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: [0, -6, 0], scale: 1 }}
          transition={reducedMotion ? { duration: 0.2 } : { opacity: { duration: 0.3 }, scale: { duration: 0.35 }, y: { duration: 3.8, repeat: Infinity, ease: "easeInOut" } }}
        >
          <Icon name={iconName} className="h-5 w-5" />
        </motion.div>

        <motion.div
          className="visual-node visual-node--two"
          initial={reducedMotion ? false : { opacity: 0, y: 12, scale: 0.9 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: [0, 5, 0], rotate: [0, 5, 0], scale: 1 }}
          transition={reducedMotion ? { duration: 0.2 } : { opacity: { delay: 0.1, duration: 0.3 }, scale: { delay: 0.1, duration: 0.35 }, y: { duration: 4.2, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 4.2, repeat: Infinity, ease: "easeInOut" } }}
        >
          <Sparkles size={19} strokeWidth={1.8} />
        </motion.div>

        <motion.div
          className="visual-node visual-node--three"
          initial={reducedMotion ? false : { opacity: 0, y: 12, scale: 0.9 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: [0, -5, 0], scale: 1 }}
          transition={reducedMotion ? { duration: 0.2 } : { opacity: { delay: 0.18, duration: 0.3 }, scale: { delay: 0.18, duration: 0.35 }, y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 } }}
        >
          <TrendingUp size={19} strokeWidth={1.8} />
        </motion.div>

        <motion.div className="visual-connector visual-connector--one" initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} />
        <motion.div className="visual-connector visual-connector--two" initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28 }} />
        <motion.div className="visual-connector visual-connector--three" initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.36 }} />

        <motion.div
          animate={reducedMotion ? undefined : { y: [0, -5, 0] }}
          transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", inset: 0 }}
        >
          {type === "web" && <WebVisual reducedMotion={reducedMotion} />}
          {type === "mobile" && <MobileVisual reducedMotion={reducedMotion} />}
          {type === "invoice" && <InvoiceVisual reducedMotion={reducedMotion} />}
          {type === "saas" && <SaasVisual reducedMotion={reducedMotion} />}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  const reducedMotion = useReducedMotion();
  const safeServices = useMemo(() => normalizeServices(services), []);
  const [activeIndex, setActiveIndex] = useState(0);
  const panelRef = useRef(null);
  const resolvedActiveIndex = Math.min(activeIndex, Math.max(safeServices.length - 1, 0));

  const handlePanelPointerMove = (event) => {
    if (!panelRef.current || reducedMotion) return;
    const bounds = panelRef.current.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    panelRef.current.style.setProperty("--pointer-x", `${x}%`);
    panelRef.current.style.setProperty("--pointer-y", `${y}%`);
  };

  if (!safeServices.length) return null;

  const current = safeServices[resolvedActiveIndex];
  const type = current.type;

  return (
    <>
      <style>{STYLES}</style>

      <section id="servicios" className="services-premium">
        <div className="services-premium__glow services-premium__glow--one" />
        <div className="services-premium__glow services-premium__glow--two" />

        <div className="services-premium__container">
          <div className="services-premium__top">
            <motion.div
              className="services-premium__intro"
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="services-premium__eyebrow">
                <span className="services-premium__eyebrow-dot" />
                Nuestros servicios
              </p>

              <h2 className="services-premium__title">
                Soluciones más reales, <span>funcionales</span> y pensadas para negocio.
              </h2>

              <p className="services-premium__description">
                Presentamos nuestros servicios de forma más profesional,
                mostrando escenarios cercanos a productos reales, flujos
                empresariales y experiencias digitales bien construidas.
              </p>

              <div className="services-premium__services-nav">
                <div className="services-premium__services-nav-head">
                  <span>Elige un servicio</span>
                  <small>{String(resolvedActiveIndex + 1).padStart(2, "0")} de {String(safeServices.length).padStart(2, "0")}</small>
                </div>

                <div className="services-premium__tabs" role="tablist" aria-label="Servicios disponibles">
                {safeServices.map((service, index) => {
                  const tabType = service.type;
                  const isActive = index === resolvedActiveIndex;

                  return (
                    <motion.button
                      key={`${service.title}-${index}`}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls="services-premium-panel"
                      className={`services-premium__tab ${isActive ? "is-active" : ""}`}
                      onClick={() => setActiveIndex(index)}
                      style={{
                        "--tab-accent":
                          tabType === "mobile" ? "#7c4dff" :
                          tabType === "invoice" ? "#00a86b" :
                          tabType === "saas" ? "#0b9cff" : "#176dff",
                      }}
                      initial={reducedMotion ? false : { opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.06 + index * 0.05,
                        duration: 0.38,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="services-active-tab"
                          className="services-premium__tab-active"
                          transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        />
                      )}

                      <span className="services-premium__tab-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="services-premium__tab-icon">
                        <Icon name={service.icon} className="h-5 w-5" />
                      </span>

                      <span className="services-premium__tab-label">
                        {service.title}
                      </span>

                      <span className="services-premium__tab-state" aria-hidden="true">
                        {isActive ? "Activo" : "Ver"}
                      </span>
                    </motion.button>
                  );
                })}
                </div>
              </div>
            </motion.div>

            <motion.div
              ref={panelRef}
              id="services-premium-panel"
              role="tabpanel"
              data-service={type}
              className="services-premium__panel"
              onPointerMove={handlePanelPointerMove}
              initial={reducedMotion ? false : { opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.66, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="services-premium__panel-grid" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${type}-${current.title}`}
                  className="services-premium__panel-content"
                  initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="services-premium__panel-copy">
                    <span className="services-premium__panel-number">
                      {String(resolvedActiveIndex + 1).padStart(2, "0")}
                    </span>

                    <span className="services-premium__panel-line" />

                    <h3 className="services-premium__panel-title">
                      {current.title}
                    </h3>

                    <p className="services-premium__panel-description">
                      {current.description}
                    </p>

                    {!!current.features?.length && (
                      <ul className="services-premium__features">
                        {current.features.slice(0, 4).map((feature) => (
                          <li key={feature} className="services-premium__feature">
                            <span className="services-premium__check">
                              <Check size={12} strokeWidth={2.4} />
                            </span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="services-premium__promise">
                      <span className="services-premium__promise-icon">
                        <Sparkles size={17} strokeWidth={1.8} />
                      </span>
                      Soluciones pensadas para convertir ideas en resultados reales.
                    </div>

                    <a href="#contacto" className="services-premium__button">
                      Cotizar ahora
                      <ArrowRight size={16} strokeWidth={1.9} />
                    </a>
                  </div>

                  <ServiceVisual
                    type={type}
                    iconName={current.icon}
                    reducedMotion={reducedMotion}
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          <motion.div
            className="services-premium__bottom"
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.16, duration: 0.5 }}
          >
            {BENEFITS.map(({ icon: BenefitIcon, title, text }) => (
              <article key={title} className="services-premium__benefit">
                <span className="services-premium__benefit-icon">
                  <BenefitIcon size={21} strokeWidth={1.8} />
                </span>

                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
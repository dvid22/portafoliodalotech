import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import {
  CalendarDays,
  Rocket,
  ShieldCheck,
  Target,
  Telescope,
  UsersRound,
} from "lucide-react";

import { companyStats } from "../../data/portfolioData";

const STAT_ICONS = [CalendarDays, Rocket, UsersRound, ShieldCheck];

/* =========================================================
   UTILIDADES
========================================================= */

function clamp01(value) {
  return Math.min(1, Math.max(0, value));
}

function smoothStep(start, end, value) {
  const progress = clamp01((value - start) / (end - start));
  return progress * progress * (3 - 2 * progress);
}

function easeOutBack(value, overshoot = 1.7) {
  const progress = clamp01(value);
  const shifted = progress - 1;

  return (
    1 +
    (overshoot + 1) * shifted * shifted * shifted +
    overshoot * shifted * shifted
  );
}

function easeInOutCubic(value) {
  const progress = clamp01(value);

  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

function drawRoundedRect(context, x, y, width, height, radius) {
  const safeRadius = Math.min(radius, width / 2, height / 2);

  context.beginPath();
  context.moveTo(x + safeRadius, y);
  context.lineTo(x + width - safeRadius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + safeRadius);
  context.lineTo(x + width, y + height - safeRadius);
  context.quadraticCurveTo(
    x + width,
    y + height,
    x + width - safeRadius,
    y + height,
  );
  context.lineTo(x + safeRadius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - safeRadius);
  context.lineTo(x, y + safeRadius);
  context.quadraticCurveTo(x, y, x + safeRadius, y);
  context.closePath();
}

function setOpacity(materials, opacity) {
  materials.forEach((material) => {
    material.transparent = true;
    material.opacity = opacity;
  });
}

function createGlowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;

  const context = canvas.getContext("2d");
  const gradient = context.createRadialGradient(256, 256, 0, 256, 256, 256);

  gradient.addColorStop(0, "rgba(68, 188, 255, 1)");
  gradient.addColorStop(0.2, "rgba(20, 137, 255, 0.72)");
  gradient.addColorStop(0.56, "rgba(20, 137, 255, 0.18)");
  gradient.addColorStop(1, "rgba(20, 137, 255, 0)");

  context.fillStyle = gradient;
  context.fillRect(0, 0, 512, 512);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.needsUpdate = true;

  return texture;
}

function createLabelTexture(title, subtitle, accent, anisotropy) {
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 360;

  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);

  drawRoundedRect(context, 20, 20, 1160, 320, 70);
  context.fillStyle = "rgba(255,255,255,0.98)";
  context.fill();
  context.strokeStyle = "rgba(15, 117, 225, 0.15)";
  context.lineWidth = 4;
  context.stroke();

  context.beginPath();
  context.arc(105, 180, 24, 0, Math.PI * 2);
  context.fillStyle = accent;
  context.fill();

  context.fillStyle = "#071126";
  context.font = "600 58px Poppins, Arial, sans-serif";
  context.fillText(title, 165, 158);

  context.fillStyle = "#64748b";
  context.font = "400 34px Poppins, Arial, sans-serif";
  context.fillText(subtitle, 165, 224);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = Math.min(anisotropy, 16);
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.needsUpdate = true;

  return texture;
}

function createProductTexture(anisotropy) {
  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 1280;

  const context = canvas.getContext("2d");
  const texture = new THREE.CanvasTexture(canvas);

  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = Math.min(anisotropy, 16);
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;

  let lastFrame = -1;

  function update(progress, time) {
    const frame = Math.floor(time * 30) + Math.round(progress * 1000) * 1000;

    if (frame === lastFrame) return;
    lastFrame = frame;

    context.clearRect(0, 0, canvas.width, canvas.height);

    drawRoundedRect(context, 20, 20, 2008, 1240, 82);
    context.fillStyle = "#ffffff";
    context.fill();
    context.strokeStyle = "rgba(15, 117, 225, 0.14)";
    context.lineWidth = 5;
    context.stroke();

    context.fillStyle = "#071126";
    context.font = "600 62px Poppins, Arial, sans-serif";
    context.fillText("Dalo", 105, 125);

    context.fillStyle = "#168bff";
    context.fillText("Tech", 265, 125);

    context.fillStyle = "#64748b";
    context.font = "500 30px Poppins, Arial, sans-serif";
    context.fillText("PRODUCTO DIGITAL", 1500, 118);

    context.strokeStyle = "#e2e8f0";
    context.lineWidth = 3;
    context.beginPath();
    context.moveTo(78, 175);
    context.lineTo(1970, 175);
    context.stroke();

    drawRoundedRect(context, 72, 220, 410, 940, 48);
    context.fillStyle = "#f7faff";
    context.fill();

    const stages = ["Estrategia", "Diseño", "Desarrollo"];

    stages.forEach((stage, index) => {
      const y = 355 + index * 150;
      const active = progress > 0.18 + index * 0.18;

      drawRoundedRect(context, 112, y - 72, 330, 105, 28);
      context.fillStyle = active ? "#eaf4ff" : "#ffffff";
      context.fill();

      context.beginPath();
      context.arc(162, y - 20, 15, 0, Math.PI * 2);
      context.fillStyle = active ? "#168bff" : "#cbd5e1";
      context.fill();

      context.fillStyle = active ? "#0f172a" : "#94a3b8";
      context.font = "500 38px Poppins, Arial, sans-serif";
      context.fillText(stage, 208, y - 6);
    });

    context.fillStyle = "#0f172a";
    context.font = "600 54px Poppins, Arial, sans-serif";
    context.fillText("Una solución lista para crecer", 575, 320);

    context.fillStyle = "#64748b";
    context.font = "400 34px Poppins, Arial, sans-serif";
    context.fillText(
      "Estrategia, experiencia y tecnología trabajando como un solo producto.",
      575,
      380,
    );

    const cards = [
      { title: "Arquitectura", text: "Base segura y escalable" },
      { title: "Experiencia", text: "Interfaz clara y funcional" },
      { title: "Evolución", text: "Preparada para crecer" },
    ];

    cards.forEach((card, index) => {
      const x = 575 + index * 430;

      drawRoundedRect(context, x, 455, 370, 250, 44);
      context.fillStyle = "#f5f9ff";
      context.fill();
      context.strokeStyle = "rgba(22, 139, 255, 0.12)";
      context.lineWidth = 3;
      context.stroke();

      context.beginPath();
      context.arc(x + 64, 530, 19, 0, Math.PI * 2);
      context.fillStyle = "#168bff";
      context.fill();

      context.fillStyle = "#0f172a";
      context.font = "600 37px Poppins, Arial, sans-serif";
      context.fillText(card.title, x + 105, 544);

      context.fillStyle = "#64748b";
      context.font = "400 30px Poppins, Arial, sans-serif";
      context.fillText(card.text, x + 42, 635);
    });

    drawRoundedRect(context, 575, 785, 1250, 250, 48);
    context.fillStyle = "#f7faff";
    context.fill();

    context.fillStyle = "#0f172a";
    context.font = "600 37px Poppins, Arial, sans-serif";
    context.fillText("Construcción del producto", 635, 865);

    drawRoundedRect(context, 635, 920, 1120, 30, 15);
    context.fillStyle = "#dcecff";
    context.fill();

    const visibleProgress = Math.max(0.05, progress);
    drawRoundedRect(context, 635, 920, 1120 * visibleProgress, 30, 15);

    const gradient = context.createLinearGradient(635, 0, 1755, 0);
    gradient.addColorStop(0, "#20b2ff");
    gradient.addColorStop(1, "#174be8");
    context.fillStyle = gradient;
    context.fill();

    const pulse = 0.5 + Math.sin(time * 3.1) * 0.5;
    context.globalAlpha = 0.25 + pulse * 0.25;
    context.beginPath();
    context.arc(1750, 935, 28 + pulse * 10, 0, Math.PI * 2);
    context.fillStyle = "#168bff";
    context.fill();
    context.globalAlpha = 1;

    texture.needsUpdate = true;
  }

  return { texture, update };
}

/* =========================================================
   ESCENA 3D: ATELIER DIGITAL
========================================================= */

function AboutMagicScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const scene = new THREE.Scene();
    const world = new THREE.Group();
    scene.add(world);

    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 3.05, 10.2);
    camera.lookAt(0, 2.05, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    renderer.setClearColor(0xffffff, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.className = "about-magic-canvas";
    renderer.domElement.setAttribute("aria-hidden", "true");

    mount.appendChild(renderer.domElement);

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();

    const environment = new RoomEnvironment();
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const environmentMap = pmremGenerator.fromScene(environment, 0.035);
    scene.environment = environmentMap.texture;

    const whiteMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xf9fcff,
      roughness: 0.16,
      metalness: 0.05,
      clearcoat: 1,
      clearcoatRoughness: 0.07,
    });

    const whiteSoftMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xeaf2fb,
      roughness: 0.24,
      metalness: 0.04,
      clearcoat: 0.86,
      clearcoatRoughness: 0.14,
    });

    const blueMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x168bff,
      roughness: 0.14,
      metalness: 0.22,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      emissive: 0x087bea,
      emissiveIntensity: 0.16,
    });

    const skyMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x6bc5ff,
      roughness: 0.18,
      metalness: 0.1,
      clearcoat: 1,
      clearcoatRoughness: 0.06,
      emissive: 0x168bff,
      emissiveIntensity: 0.08,
    });

    const navyMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x174ee8,
      roughness: 0.16,
      metalness: 0.24,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      emissive: 0x174ee8,
      emissiveIntensity: 0.12,
    });

    const darkMaterial = new THREE.MeshStandardMaterial({
      color: 0x0d1a2d,
      roughness: 0.22,
      metalness: 0.62,
    });

    const eyeWhiteMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      toneMapped: false,
    });

    const pupilMaterial = new THREE.MeshBasicMaterial({
      color: 0x168bff,
      toneMapped: false,
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x98d6ff,
      transparent: true,
      opacity: 0.2,
      roughness: 0.04,
      metalness: 0,
      transmission: 0.18,
      clearcoat: 1,
      clearcoatRoughness: 0.03,
      depthWrite: false,
    });

    const glowTexture = createGlowTexture();

    /* =====================================================
       ILUMINACIÓN
    ===================================================== */

    scene.add(new THREE.HemisphereLight(0xffffff, 0xd7eaff, 2.25));

    const keyLight = new THREE.DirectionalLight(0xffffff, 4.25);
    keyLight.position.set(5.2, 8.8, 6.8);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(2048, 2048);
    keyLight.shadow.camera.left = -7;
    keyLight.shadow.camera.right = 7;
    keyLight.shadow.camera.top = 7;
    keyLight.shadow.camera.bottom = -5;
    keyLight.shadow.bias = -0.00012;
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0xffffff, 13, 9, 2);
    fillLight.position.set(3.5, 4.8, 4.5);
    scene.add(fillLight);

    const blueLight = new THREE.PointLight(0x168bff, 17, 8, 2);
    blueLight.position.set(-3, 3.6, 3.2);
    scene.add(blueLight);

    /* =====================================================
       PLATAFORMA
    ===================================================== */

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(12, 8),
      new THREE.ShadowMaterial({
        color: 0x0f5c9f,
        transparent: true,
        opacity: 0.075,
      }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.03;
    floor.receiveShadow = true;
    world.add(floor);

    const platform = new THREE.Group();

    const platformBase = new THREE.Mesh(
      new THREE.CylinderGeometry(2.65, 2.85, 0.18, 72),
      whiteSoftMaterial,
    );
    platformBase.position.y = 0.08;
    platformBase.castShadow = true;
    platformBase.receiveShadow = true;
    platform.add(platformBase);

    const platformTop = new THREE.Mesh(
      new THREE.CylinderGeometry(2.4, 2.58, 0.11, 72),
      whiteMaterial,
    );
    platformTop.position.y = 0.2;
    platformTop.castShadow = true;
    platformTop.receiveShadow = true;
    platform.add(platformTop);

    const platformRing = new THREE.Mesh(
      new THREE.TorusGeometry(2.14, 0.04, 14, 96),
      blueMaterial,
    );
    platformRing.rotation.x = Math.PI / 2;
    platformRing.position.y = 0.275;
    platform.add(platformRing);

    world.add(platform);

    /* =====================================================
       CRISTAL CENTRAL
    ===================================================== */

    const crystal = new THREE.Group();
    crystal.position.set(0, 1.35, 0.45);

    const crystalMesh = new THREE.Mesh(
      new THREE.DodecahedronGeometry(0.36, 3),
      new THREE.MeshPhysicalMaterial({
        color: 0x168bff,
        roughness: 0.08,
        metalness: 0.14,
        clearcoat: 1,
        clearcoatRoughness: 0.03,
        emissive: 0x087bea,
        emissiveIntensity: 0.5,
      }),
    );
    crystalMesh.castShadow = true;
    crystal.add(crystalMesh);

    const crystalGlow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTexture,
        color: 0x168bff,
        transparent: true,
        opacity: 0.58,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    crystalGlow.scale.set(1.8, 1.8, 1);
    crystal.add(crystalGlow);

    const ringOne = new THREE.Mesh(
      new THREE.TorusGeometry(0.58, 0.012, 8, 72),
      new THREE.MeshBasicMaterial({
        color: 0x168bff,
        transparent: true,
        opacity: 0.4,
        depthWrite: false,
      }),
    );
    ringOne.rotation.x = 1.05;
    crystal.add(ringOne);

    const ringTwo = ringOne.clone();
    ringTwo.rotation.set(0.45, 0.9, -0.35);
    crystal.add(ringTwo);

    world.add(crystal);

    /* =====================================================
       AYUDANTES ANIMADOS
    ===================================================== */

    function enableShadows(object) {
      object.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }

    function createArm(side, material) {
      const pivot = new THREE.Group();
      pivot.position.set(side * 0.35, -0.02, 0);

      const upper = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.055, 0.18, 6, 14),
        material,
      );
      upper.position.y = -0.16;
      upper.rotation.z = side * -0.12;
      pivot.add(upper);

      const hand = new THREE.Mesh(
        new THREE.SphereGeometry(0.07, 18, 14),
        whiteMaterial,
      );
      hand.position.set(side * 0.035, -0.36, 0.02);
      pivot.add(hand);

      return { pivot, hand };
    }

    function createHelper({ title, subtitle, accentMaterial, accentHex, index }) {
      const root = new THREE.Group();
      const body = new THREE.Group();
      root.add(body);

      const torso = new THREE.Mesh(
        new THREE.SphereGeometry(0.34, 40, 32),
        whiteMaterial,
      );
      torso.scale.set(1, 1.08, 0.92);
      body.add(torso);

      const belly = new THREE.Mesh(
        new RoundedBoxGeometry(0.42, 0.22, 0.07, 5, 0.05),
        accentMaterial,
      );
      belly.position.set(0, -0.05, 0.31);
      body.add(belly);

      const face = new THREE.Mesh(
        new RoundedBoxGeometry(0.48, 0.2, 0.08, 5, 0.06),
        darkMaterial,
      );
      face.position.set(0, 0.13, 0.31);
      body.add(face);

      const eyeLeft = new THREE.Mesh(
        new THREE.SphereGeometry(0.055, 20, 16),
        eyeWhiteMaterial,
      );
      const eyeRight = eyeLeft.clone();
      eyeLeft.position.set(-0.105, 0.14, 0.365);
      eyeRight.position.set(0.105, 0.14, 0.365);
      body.add(eyeLeft, eyeRight);

      const pupilLeft = new THREE.Mesh(
        new THREE.SphereGeometry(0.024, 18, 14),
        pupilMaterial,
      );
      const pupilRight = pupilLeft.clone();
      pupilLeft.position.set(-0.105, 0.14, 0.412);
      pupilRight.position.set(0.105, 0.14, 0.412);
      body.add(pupilLeft, pupilRight);

      const antenna = new THREE.Group();
      const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.018, 0.024, 0.18, 16),
        accentMaterial,
      );
      stem.position.y = 0.46;
      antenna.add(stem);

      const antennaTip = new THREE.Mesh(
        new THREE.SphereGeometry(0.055, 18, 14),
        accentMaterial,
      );
      antennaTip.position.y = 0.58;
      antenna.add(antennaTip);
      body.add(antenna);

      const leftArm = createArm(-1, accentMaterial);
      const rightArm = createArm(1, accentMaterial);
      body.add(leftArm.pivot, rightArm.pivot);

      const leftFoot = new THREE.Mesh(
        new RoundedBoxGeometry(0.18, 0.1, 0.28, 4, 0.05),
        whiteSoftMaterial,
      );
      const rightFoot = leftFoot.clone();
      leftFoot.position.set(-0.16, -0.39, 0.06);
      rightFoot.position.set(0.16, -0.39, 0.06);
      body.add(leftFoot, rightFoot);

      const labelTexture = createLabelTexture(
        title,
        subtitle,
        accentHex,
        maxAnisotropy,
      );

      const labelMaterial = new THREE.MeshBasicMaterial({
        map: labelTexture,
        transparent: true,
        opacity: 0,
        toneMapped: false,
        depthWrite: false,
      });

      const label = new THREE.Mesh(
        new THREE.PlaneGeometry(1.7, 0.52),
        labelMaterial,
      );
      label.position.set(0, 0.95, -0.08);
      root.add(label);

      const glow = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: glowTexture,
          color: new THREE.Color(accentHex),
          transparent: true,
          opacity: 0.12,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        }),
      );
      glow.scale.set(1.25, 1.25, 1);
      glow.position.z = -0.2;
      body.add(glow);

      root.userData = {
        index,
        body,
        torso,
        belly,
        face,
        eyeLeft,
        eyeRight,
        pupilLeft,
        pupilRight,
        antenna,
        antennaTip,
        leftArm,
        rightArm,
        leftFoot,
        rightFoot,
        labelMaterial,
        materials: [labelMaterial],
        blinkOffset: index * 1.9,
      };

      enableShadows(root);
      world.add(root);
      return root;
    }

    const helpers = [
      createHelper({
        title: "Estrategia",
        subtitle: "Entender antes de construir",
        accentMaterial: skyMaterial,
        accentHex: "#5abaff",
        index: 0,
      }),
      createHelper({
        title: "Diseño",
        subtitle: "Experiencias claras y humanas",
        accentMaterial: blueMaterial,
        accentHex: "#168bff",
        index: 1,
      }),
      createHelper({
        title: "Desarrollo",
        subtitle: "Tecnología preparada para crecer",
        accentMaterial: navyMaterial,
        accentHex: "#174ee8",
        index: 2,
      }),
    ];

    const helperTargets = [
      new THREE.Vector3(-2.45, 2.75, 0.15),
      new THREE.Vector3(2.45, 2.6, 0.1),
      new THREE.Vector3(0.35, 4.05, -0.1),
    ];

    const helperStarts = [
      new THREE.Vector3(-5.2, 1.9, -0.8),
      new THREE.Vector3(5.2, 2.1, -0.7),
      new THREE.Vector3(0.2, 6.2, -1.4),
    ];

    helpers.forEach((helper, index) => {
      helper.position.copy(helperStarts[index]);
      helper.scale.setScalar(0.001);
    });

    /* =====================================================
       CUBOS DE INFORMACIÓN Y TRAYECTORIAS
    ===================================================== */

    const routeTarget = new THREE.Vector3(0, 1.55, 0.48);
    const routes = [];

    function createRoute(start, control, index, material) {
      const curve = new THREE.QuadraticBezierCurve3(
        start.clone(),
        control.clone(),
        routeTarget.clone(),
      );

      const tubeMaterial = new THREE.MeshBasicMaterial({
        color: material.color,
        transparent: true,
        opacity: 0,
        depthWrite: false,
      });

      const tube = new THREE.Mesh(
        new THREE.TubeGeometry(curve, 64, 0.009, 6, false),
        tubeMaterial,
      );
      world.add(tube);

      const particles = [];

      for (let particleIndex = 0; particleIndex < 9; particleIndex += 1) {
        const particle = new THREE.Mesh(
          new RoundedBoxGeometry(0.075, 0.075, 0.075, 3, 0.016),
          particleIndex % 2 === 0 ? material : glassMaterial,
        );
        particle.visible = false;
        world.add(particle);

        particles.push({
          mesh: particle,
          delay: particleIndex * 0.13 + index * 0.18,
        });
      }

      routes.push({ curve, tubeMaterial, particles });
    }

    createRoute(
      helperTargets[0],
      new THREE.Vector3(-1.4, 2.4, 1.15),
      0,
      skyMaterial,
    );
    createRoute(
      helperTargets[1],
      new THREE.Vector3(1.45, 2.35, 1.08),
      1,
      blueMaterial,
    );
    createRoute(
      helperTargets[2],
      new THREE.Vector3(0.2, 2.9, 0.6),
      2,
      navyMaterial,
    );

    /* =====================================================
       PRODUCTO FINAL
    ===================================================== */

    const product = new THREE.Group();
    product.position.set(0, 1.88, 0.38);
    world.add(product);

    const productParts = [];

    function addProductPart({ geometry, material, start, target, index }) {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(start);
      mesh.userData = { start, target, index };
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      product.add(mesh);
      productParts.push(mesh);
      return mesh;
    }

    const standMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xe9f2fb,
      roughness: 0.2,
      metalness: 0.08,
      clearcoat: 0.85,
      transparent: true,
      opacity: 0,
    });

    addProductPart({
      geometry: new RoundedBoxGeometry(1.25, 0.11, 0.72, 5, 0.055),
      material: standMaterial,
      start: new THREE.Vector3(0, -2.15, -0.12),
      target: new THREE.Vector3(0, -1.45, -0.12),
      index: 0,
    });

    addProductPart({
      geometry: new THREE.CylinderGeometry(0.075, 0.11, 0.78, 24),
      material: standMaterial.clone(),
      start: new THREE.Vector3(0, -2.05, -0.1),
      target: new THREE.Vector3(0, -1.1, -0.1),
      index: 1,
    });

    addProductPart({
      geometry: new RoundedBoxGeometry(3.55, 2.12, 0.2, 7, 0.17),
      material: new THREE.MeshPhysicalMaterial({
        color: 0xe7f1fb,
        roughness: 0.18,
        metalness: 0.06,
        clearcoat: 0.95,
        transparent: true,
        opacity: 0,
      }),
      start: new THREE.Vector3(0, -1.3, -1.2),
      target: new THREE.Vector3(0, 0, -0.17),
      index: 2,
    });

    addProductPart({
      geometry: new RoundedBoxGeometry(3.42, 2.0, 0.11, 7, 0.16),
      material: new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        roughness: 0.14,
        metalness: 0.02,
        clearcoat: 1,
        clearcoatRoughness: 0.07,
        transparent: true,
        opacity: 0,
      }),
      start: new THREE.Vector3(0.75, -0.65, -0.75),
      target: new THREE.Vector3(0, 0, -0.04),
      index: 3,
    });

    const liveProduct = createProductTexture(maxAnisotropy);
    const screenMaterial = new THREE.MeshBasicMaterial({
      map: liveProduct.texture,
      transparent: true,
      opacity: 0,
      toneMapped: false,
    });

    addProductPart({
      geometry: new THREE.PlaneGeometry(3.18, 1.82),
      material: screenMaterial,
      start: new THREE.Vector3(-0.7, 0.55, 0.85),
      target: new THREE.Vector3(0, 0, 0.025),
      index: 4,
    });

    const productGlow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTexture,
        color: 0x168bff,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    productGlow.scale.set(5.2, 3.15, 1);
    productGlow.position.z = -0.55;
    product.add(productGlow);

    /* =====================================================
       DESTELLOS
    ===================================================== */

    const sparkles = [];

    for (let index = 0; index < 24; index += 1) {
      const sparkle = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.035 + (index % 3) * 0.012, 0),
        index % 3 === 0 ? skyMaterial : index % 3 === 1 ? blueMaterial : navyMaterial,
      );

      const angle = (index / 24) * Math.PI * 2;
      const radius = 2 + (index % 4) * 0.35;

      sparkle.position.set(
        Math.cos(angle) * radius,
        2.15 + Math.sin(angle * 1.7) * 1.4,
        -0.2 + (index % 2) * 0.45,
      );

      sparkle.userData = {
        base: sparkle.position.clone(),
        phase: index * 0.63,
      };

      world.add(sparkle);
      sparkles.push(sparkle);
    }

    /* =====================================================
       INTERACCIÓN
    ===================================================== */

    const pointer = { x: 0, y: 0 };
    const targetPointer = { x: 0, y: 0 };

    function handlePointerMove(event) {
      const bounds = mount.getBoundingClientRect();
      targetPointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      targetPointer.y = -(((event.clientY - bounds.top) / bounds.height) * 2 - 1);
    }

    function handlePointerLeave() {
      targetPointer.x = 0;
      targetPointer.y = 0;
    }

    mount.addEventListener("pointermove", handlePointerMove);
    mount.addEventListener("pointerleave", handlePointerLeave);

    function resizeScene() {
      const width = mount.clientWidth || 700;
      const height = mount.clientHeight || 400;

      camera.aspect = width / height;

      if (width < 520) {
        camera.fov = 42;
        camera.position.z = 12.2;
      } else if (width < 900) {
        camera.fov = 37;
        camera.position.z = 10.9;
      } else {
        camera.fov = 34;
        camera.position.z = 10.2;
      }

      camera.updateProjectionMatrix();

      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio || 1, width < 700 ? 1.75 : 2.25),
      );
      renderer.setSize(width, height, false);
    }

    const resizeObserver = new ResizeObserver(resizeScene);
    resizeObserver.observe(mount);
    resizeScene();

    /* =====================================================
       ANIMACIÓN PRINCIPAL
    ===================================================== */

    const clock = new THREE.Clock();
    const duration = 19;

    function animate() {
      const elapsed = clock.getElapsedTime();
      const timeline = reducedMotion ? 15 : elapsed % duration;
      const motion = reducedMotion ? 0 : 1;

      pointer.x += (targetPointer.x - pointer.x) * 0.04;
      pointer.y += (targetPointer.y - pointer.y) * 0.04;

      world.rotation.y = pointer.x * 0.035 * motion;
      world.rotation.x = pointer.y * 0.012 * motion;

      camera.position.x += (pointer.x * 0.12 * motion - camera.position.x) * 0.025;
      camera.position.y += (3.05 + pointer.y * 0.06 * motion - camera.position.y) * 0.025;
      camera.lookAt(0, 2.05, 0);

      const fade = 1 - smoothStep(17.8, 19, timeline);
      const crystalProgress = smoothStep(0, 1.3, timeline);
      const helperProgress = smoothStep(0.9, 3.4, timeline);
      const transferProgress = smoothStep(4.2, 10.2, timeline);
      const productProgress = smoothStep(7.6, 12.8, timeline);
      const celebrationProgress = smoothStep(12.2, 14.4, timeline);

      const crystalScale = crystalProgress * (1 - productProgress * 0.72) * fade;
      crystal.scale.setScalar(
        Math.max(
          0.001,
          crystalScale * (1 + Math.sin(elapsed * 2.6) * 0.035 * motion),
        ),
      );
      crystal.position.y = 1.35 + Math.sin(elapsed * 1.5) * 0.035 * motion;
      crystalMesh.rotation.x += 0.006 * motion;
      crystalMesh.rotation.y += 0.009 * motion;
      ringOne.rotation.z += 0.008 * motion;
      ringTwo.rotation.y -= 0.006 * motion;

      helpers.forEach((helper, index) => {
        const appear = easeOutBack(
          smoothStep(0.8 + index * 0.25, 2.3 + index * 0.25, timeline),
          1.45,
        );

        const target = helperTargets[index];
        const start = helperStarts[index];
        const eased = easeInOutCubic(helperProgress);

        helper.position.lerpVectors(start, target, eased);

        const baseFloat = Math.sin(elapsed * 1.45 + index * 1.3) * 0.075 * motion;
        const sideFloat = Math.cos(elapsed * 1.1 + index) * 0.035 * motion;

        helper.position.y += baseFloat;
        helper.position.x += sideFloat;

        const squash = 1 + Math.sin(elapsed * 2.6 + index) * 0.018 * motion;
        const popScale = Math.max(0.001, appear * fade);
        helper.scale.set(popScale * squash, popScale / squash, popScale);

        const body = helper.userData.body;
        body.rotation.z = Math.sin(elapsed * 1.3 + index) * 0.045 * motion;
        body.rotation.y = pointer.x * 0.08 * motion;

        const lookX = pointer.x * 0.018 * motion;
        const lookY = pointer.y * 0.012 * motion;
        helper.userData.pupilLeft.position.x = -0.105 + lookX;
        helper.userData.pupilRight.position.x = 0.105 + lookX;
        helper.userData.pupilLeft.position.y = 0.14 + lookY;
        helper.userData.pupilRight.position.y = 0.14 + lookY;

        const blinkCycle = (elapsed + helper.userData.blinkOffset) % 4.6;
        const blink = blinkCycle > 4.38 ? 0.12 : 1;
        helper.userData.eyeLeft.scale.y = blink;
        helper.userData.eyeRight.scale.y = blink;
        helper.userData.pupilLeft.scale.y = blink;
        helper.userData.pupilRight.scale.y = blink;

        const anticipation = smoothStep(3.7, 4.5, timeline);
        const workWave = Math.sin(elapsed * 4.2 + index * 1.1) * 0.12 * motion;
        helper.userData.leftArm.pivot.rotation.z = -0.45 - workWave * anticipation;
        helper.userData.rightArm.pivot.rotation.z = 0.45 + workWave * anticipation;

        const celebrate = celebrationProgress * fade;
        helper.userData.leftArm.pivot.rotation.z -= celebrate * 0.8;
        helper.userData.rightArm.pivot.rotation.z += celebrate * 0.8;
        helper.userData.leftFoot.rotation.x = Math.sin(elapsed * 5 + index) * 0.08 * celebrate;
        helper.userData.rightFoot.rotation.x = -Math.sin(elapsed * 5 + index) * 0.08 * celebrate;

        helper.userData.antennaTip.scale.setScalar(
          1 + (Math.sin(elapsed * 3.2 + index) + 1) * 0.08 * motion,
        );

        helper.userData.labelMaterial.opacity = helperProgress * fade;
      });

      const pathOpacity =
        smoothStep(4, 4.9, timeline) *
        (1 - smoothStep(10.4, 11.5, timeline)) *
        fade;

      routes.forEach((route, routeIndex) => {
        route.tubeMaterial.opacity = pathOpacity * 0.2;

        route.particles.forEach((particle) => {
          const local = clamp01((timeline - 4.25 - particle.delay) / 2.9);
          const active = local > 0 && local < 1 && pathOpacity > 0.01;
          particle.mesh.visible = active;

          if (!active) return;

          const position = route.curve.getPoint(easeInOutCubic(local));
          particle.mesh.position.copy(position);
          particle.mesh.rotation.x += 0.06 * motion;
          particle.mesh.rotation.y += 0.08 * motion;
          particle.mesh.scale.setScalar(
            Math.sin(local * Math.PI) * (0.75 + routeIndex * 0.08),
          );
        });
      });

      productParts.forEach((part) => {
        const delay = part.userData.index * 0.1;
        const partProgress = smoothStep(delay, 0.74 + delay, productProgress);

        part.position.lerpVectors(
          part.userData.start,
          part.userData.target,
          easeOutBack(partProgress, 0.8),
        );
        part.scale.setScalar(0.84 + partProgress * 0.16);
        part.material.opacity = partProgress * fade;
      });

      product.position.y =
        1.88 + Math.sin(elapsed * 1.2) * 0.025 * productProgress * motion;
      product.rotation.y = -0.045 + pointer.x * 0.035 * productProgress * motion;
      product.rotation.x = pointer.y * 0.012 * productProgress * motion;
      productGlow.material.opacity = productProgress * fade * 0.14;

      liveProduct.update(productProgress, elapsed);

      sparkles.forEach((sparkle, index) => {
        const reveal = smoothStep(9.5 + (index % 5) * 0.08, 11.6, timeline);
        const sparkleFade = reveal * fade;
        sparkle.visible = sparkleFade > 0.01;

        sparkle.position.y =
          sparkle.userData.base.y +
          Math.sin(elapsed * 1.5 + sparkle.userData.phase) * 0.1 * motion;
        sparkle.rotation.x += 0.01 * motion;
        sparkle.rotation.y += 0.014 * motion;
        sparkle.scale.setScalar(
          sparkleFade * (0.7 + (Math.sin(elapsed * 3 + index) + 1) * 0.18),
        );
      });

      blueMaterial.emissiveIntensity = 0.14 + Math.sin(elapsed * 2.3) * 0.025 * motion;
      platformRing.rotation.z += 0.0024 * motion;

      renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(animate);

    requestAnimationFrame(() => {
      mount.classList.add("is-ready");
    });

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        renderer.setAnimationLoop(entry.isIntersecting ? animate : null);
        if (entry.isIntersecting) clock.start();
      },
      { threshold: 0.05 },
    );

    visibilityObserver.observe(mount);

    return () => {
      renderer.setAnimationLoop(null);
      visibilityObserver.disconnect();
      resizeObserver.disconnect();

      mount.removeEventListener("pointermove", handlePointerMove);
      mount.removeEventListener("pointerleave", handlePointerLeave);

      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();

        if (object.material) {
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];

          materials.forEach((material) => {
            if (material.map) material.map.dispose();
            material.dispose();
          });
        }
      });

      environmentMap.dispose();
      environment.dispose?.();
      pmremGenerator.dispose();
      glowTexture.dispose();
      renderer.dispose();
      renderer.forceContextLoss();

      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }

      mount.classList.remove("is-ready");
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="about-magic-stage"
      role="img"
      aria-label="Atelier digital animado donde estrategia, diseño y desarrollo construyen una solución tecnológica"
    >
      <div className="about-magic-loader">
        <span />
        <span />
        <span />
      </div>

      <div className="about-magic-caption">
        <span className="about-magic-caption__dot" />
        <span>Una idea</span>
        <span className="about-magic-caption__arrow">→</span>
        <span>Estrategia</span>
        <span className="about-magic-caption__arrow">→</span>
        <span>Diseño</span>
        <span className="about-magic-caption__arrow">→</span>
        <span>Desarrollo</span>
      </div>
    </div>
  );
}

/* =========================================================
   ABOUT
========================================================= */

export default function About() {
  return (
    <section id="nosotros" className="section-shell about-premium">
      <div className="about-premium__container">
        <div className="about-premium__top">
          <div className="about-premium__copy">
            <p className="eyebrow">Quiénes somos</p>

            <h2 className="about-premium__title">
              Tecnología útil, diseño claro y{" "}
              <span>soluciones que sí generan valor.</span>
            </h2>

            <div className="about-premium__description">
              <p>
                En DaloTech acompañamos a empresas, emprendimientos e instituciones a
                optimizar sus procesos, mejorar la experiencia de sus clientes y
                fortalecer su tecnología para competir mejor.
              </p>

              <p>
                Combinamos estrategia, diseño y desarrollo para crear productos digitales
                seguros, escalables y preparados para crecer contigo.
              </p>
            </div>
          </div>

          <div className="about-premium__visual">
            <AboutMagicScene />
          </div>
        </div>

        <div className="about-premium__stats">
          {companyStats.map(([value, label], index) => {
            const StatIcon = STAT_ICONS[index % STAT_ICONS.length];

            return (
              <article key={`${label}-${value}`} className="about-stat-card">
                <div className="about-stat-card__icon">
                  <StatIcon size={22} strokeWidth={1.9} aria-hidden="true" />
                </div>

                <div className="about-stat-card__content">
                  <p className="about-stat-card__label">{label}</p>
                  <p className="about-stat-card__value">{value}</p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="about-premium__purpose">
          <article className="about-purpose-card">
            <div className="about-purpose-card__icon">
              <Target size={34} strokeWidth={1.7} aria-hidden="true" />
            </div>

            <div className="about-purpose-card__content">
              <p className="about-purpose-card__title">Misión</p>
              <p className="about-purpose-card__text">
                Desarrollamos soluciones tecnológicas que impulsan el crecimiento de
                nuestros clientes, combinando innovación, calidad y compromiso para
                generar resultados reales y sostenibles.
              </p>
            </div>
          </article>

          <article className="about-purpose-card">
            <div className="about-purpose-card__icon">
              <Telescope size={34} strokeWidth={1.7} aria-hidden="true" />
            </div>

            <div className="about-purpose-card__content">
              <p className="about-purpose-card__title">Visión</p>
              <p className="about-purpose-card__text">
                Ser un referente en transformación digital en Colombia y Latinoamérica,
                reconocidos por nuestra excelencia, innovación y el impacto positivo que
                generamos en cada proyecto.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
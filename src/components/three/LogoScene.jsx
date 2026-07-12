import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function LogoScene() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    );

    camera.position.set(0, 0, 7.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(
      container.clientWidth,
      container.clientHeight,
    );
    renderer.setClearColor(0x000000, 0);

    container.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    const ambientLight = new THREE.AmbientLight(
      0xffffff,
      1.45,
    );

    scene.add(ambientLight);

    const blueLight = new THREE.PointLight(
      0x168cff,
      14,
      26,
    );

    blueLight.position.set(3, 2.5, 5);
    scene.add(blueLight);

    const cyanLight = new THREE.PointLight(
      0x2dd4ff,
      10,
      22,
    );

    cyanLight.position.set(-3, -2, 4);
    scene.add(cyanLight);

    const ringGeometry = new THREE.TorusGeometry(
      2.15,
      0.028,
      18,
      180,
    );

    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0x168cff,
      emissive: 0x087bea,
      emissiveIntensity: 0.8,
      metalness: 0.55,
      roughness: 0.22,
      transparent: true,
      opacity: 0.68,
    });

    const mainRing = new THREE.Mesh(
      ringGeometry,
      ringMaterial,
    );

    mainRing.rotation.x = Math.PI * 0.3;
    mainRing.rotation.y = Math.PI * 0.14;

    mainGroup.add(mainRing);

    const secondRingGeometry = new THREE.TorusGeometry(
      2.55,
      0.014,
      14,
      170,
    );

    const secondRingMaterial =
      new THREE.MeshBasicMaterial({
        color: 0x63c8ff,
        transparent: true,
        opacity: 0.34,
      });

    const secondRing = new THREE.Mesh(
      secondRingGeometry,
      secondRingMaterial,
    );

    secondRing.rotation.x = -Math.PI * 0.22;
    secondRing.rotation.y = Math.PI * 0.18;

    mainGroup.add(secondRing);

    const thirdRingGeometry = new THREE.TorusGeometry(
      1.82,
      0.01,
      12,
      150,
    );

    const thirdRingMaterial =
      new THREE.MeshBasicMaterial({
        color: 0x1746e8,
        transparent: true,
        opacity: 0.3,
      });

    const thirdRing = new THREE.Mesh(
      thirdRingGeometry,
      thirdRingMaterial,
    );

    thirdRing.rotation.x = Math.PI * 0.55;
    thirdRing.rotation.y = -Math.PI * 0.15;

    mainGroup.add(thirdRing);

    const floatingObjects = [];

    const floatingGeometries = [
      new THREE.IcosahedronGeometry(0.1, 0),
      new THREE.OctahedronGeometry(0.1, 0),
      new THREE.TetrahedronGeometry(0.11, 0),
    ];

    const floatingMaterial =
      new THREE.MeshStandardMaterial({
        color: 0x168cff,
        emissive: 0x087bea,
        emissiveIntensity: 0.65,
        metalness: 0.5,
        roughness: 0.28,
      });

    for (let index = 0; index < 12; index += 1) {
      const geometry =
        floatingGeometries[
          index % floatingGeometries.length
        ];

      const object = new THREE.Mesh(
        geometry,
        floatingMaterial,
      );

      const angle = (index / 12) * Math.PI * 2;
      const radius = 2.05 + Math.random() * 0.75;

      object.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        (Math.random() - 0.5) * 1.3,
      );

      object.userData = {
        originalY: object.position.y,
        originalX: object.position.x,
        speed: 0.45 + Math.random() * 0.65,
        offset: Math.random() * Math.PI * 2,
      };

      floatingObjects.push(object);
      mainGroup.add(object);
    }

    const particleCount = 130;

    const particlePositions = new Float32Array(
      particleCount * 3,
    );

    for (
      let index = 0;
      index < particleCount;
      index += 1
    ) {
      const position = index * 3;
      const radius = 1.9 + Math.random() * 2.2;
      const angle = Math.random() * Math.PI * 2;

      particlePositions[position] =
        Math.cos(angle) * radius;

      particlePositions[position + 1] =
        Math.sin(angle) * radius;

      particlePositions[position + 2] =
        (Math.random() - 0.5) * 2.8;
    }

    const particleGeometry =
      new THREE.BufferGeometry();

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        particlePositions,
        3,
      ),
    );

    const particleMaterial =
      new THREE.PointsMaterial({
        color: 0x2da8ff,
        size: 0.034,
        transparent: true,
        opacity: 0.68,
        sizeAttenuation: true,
      });

    const particles = new THREE.Points(
      particleGeometry,
      particleMaterial,
    );

    mainGroup.add(particles);

    const pointer = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
    };

    const handlePointerMove = (event) => {
      const bounds =
        container.getBoundingClientRect();

      pointer.targetX =
        ((event.clientX - bounds.left) /
          bounds.width -
          0.5) *
        0.65;

      pointer.targetY =
        ((event.clientY - bounds.top) /
          bounds.height -
          0.5) *
        0.65;
    };

    const handlePointerLeave = () => {
      pointer.targetX = 0;
      pointer.targetY = 0;
    };

    container.addEventListener(
      "pointermove",
      handlePointerMove,
    );

    container.addEventListener(
      "pointerleave",
      handlePointerLeave,
    );

    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      if (!width || !height) {
        return;
      }

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2),
      );
    };

    window.addEventListener(
      "resize",
      handleResize,
    );

    const clock = new THREE.Clock();

    let animationFrameId;

    const animate = () => {
      animationFrameId =
        window.requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      pointer.x +=
        (pointer.targetX - pointer.x) * 0.045;

      pointer.y +=
        (pointer.targetY - pointer.y) * 0.045;

      if (!prefersReducedMotion) {
        mainGroup.rotation.y =
          elapsed * 0.05 + pointer.x;

        mainGroup.rotation.x =
          pointer.y * 0.38;

        mainRing.rotation.z =
          elapsed * 0.14;

        secondRing.rotation.z =
          -elapsed * 0.1;

        thirdRing.rotation.z =
          elapsed * 0.08;

        particles.rotation.z =
          elapsed * 0.018;

        particles.rotation.y =
          elapsed * 0.025;

        floatingObjects.forEach(
          (object, index) => {
            object.rotation.x +=
              0.004 + index * 0.0001;

            object.rotation.y += 0.007;

            object.position.y =
              object.userData.originalY +
              Math.sin(
                elapsed *
                  object.userData.speed +
                  object.userData.offset,
              ) *
                0.1;

            object.position.x =
              object.userData.originalX +
              Math.cos(
                elapsed *
                  object.userData.speed +
                  object.userData.offset,
              ) *
                0.04;
          },
        );
      }

      camera.position.x =
        pointer.x * 0.5;

      camera.position.y =
        -pointer.y * 0.5;

      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(
        animationFrameId,
      );

      window.removeEventListener(
        "resize",
        handleResize,
      );

      container.removeEventListener(
        "pointermove",
        handlePointerMove,
      );

      container.removeEventListener(
        "pointerleave",
        handlePointerLeave,
      );

      ringGeometry.dispose();
      secondRingGeometry.dispose();
      thirdRingGeometry.dispose();
      particleGeometry.dispose();

      floatingGeometries.forEach((geometry) => {
        geometry.dispose();
      });

      ringMaterial.dispose();
      secondRingMaterial.dispose();
      thirdRingMaterial.dispose();
      floatingMaterial.dispose();
      particleMaterial.dispose();

      renderer.dispose();

      if (
        renderer.domElement.parentNode ===
        container
      ) {
        container.removeChild(
          renderer.domElement,
        );
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-20"
      aria-hidden="true"
    />
  );
}
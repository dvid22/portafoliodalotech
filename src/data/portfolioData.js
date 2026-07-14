import {
  Boxes,
  Globe2,
  Printer,
  QrCode,
  ShoppingBag,
  UsersRound,
} from "lucide-react";

export const services = [
  {
    title: "Desarrollo web",
    description:
      "Creamos sitios web modernos, rápidos y adaptables para fortalecer la presencia digital de marcas, empresas e instituciones.",
    features: [
      "Diseño responsive",
      "Integración con WhatsApp",
      "SEO técnico",
      "Formularios inteligentes",
    ],
    icon: "web",
  },
  {
    title: "Aplicaciones web personalizadas",
    description:
      "Desarrollamos sistemas a medida para optimizar procesos internos, centralizar información y mejorar la productividad.",
    features: [
      "Sistemas administrativos",
      "Inventarios",
      "CRM",
      "Reservas y automatización",
    ],
    icon: "app",
  },
  {
    title: "Desarrollo móvil",
    description:
      "Diseñamos aplicaciones móviles intuitivas y funcionales para Android y iOS, enfocadas en rendimiento y experiencia de usuario.",
    features: [
      "Android e iOS",
      "Notificaciones",
      "Consumo de APIs",
      "Despliegue escalable",
    ],
    icon: "mobile",
  },
  {
    title: "Comercio electrónico",
    description:
      "Implementamos plataformas de venta online para gestionar productos, pedidos, clientes, pagos y facturación electrónica.",
    features: [
      "Catálogo digital",
      "Carrito de compras",
      "Panel administrativo",
      "Integración de pagos",
    ],
    icon: "shop",
  },
  {
    title: "Soluciones SaaS",
    description:
      "Construimos plataformas en la nube accesibles desde cualquier dispositivo, con seguridad, escalabilidad y actualizaciones continuas.",
    features: [
      "Acceso en tiempo real",
      "Escalabilidad",
      "Seguridad",
      "Menores costos operativos",
    ],
    icon: "cloud",
  },
  {
    title: "Estrategia digital",
    description:
      "Acompañamos a empresas y emprendimientos en la definición de soluciones tecnológicas alineadas con sus objetivos de negocio.",
    features: [
      "Consultoría tecnológica",
      "Arquitectura de soluciones",
      "Optimización de procesos",
      "Escalabilidad",
    ],
    icon: "automation",
  },
];

export const projects = [
  {
    title: "Master Caps",
    shortCode: "MC",
    group: "Plataformas",
    category: "Sistema POS y tienda virtual",
    description:
      "Plataforma integral para ventas, inventario, variantes por talla, múltiples imágenes por producto, apartados, catálogo público y operación con impresora térmica.",
    shortDescription:
      "Ventas, inventario, variantes, catálogo público y operación con impresora térmica.",
    image: "/images/projects/master-caps.jpeg",
    tags: ["React", "Firebase", "POS", "E-commerce"],
    benefits: [
      {
        title: "Gestión completa",
        description: "Ventas, inventario y clientes",
        icon: Boxes,
      },
      {
        title: "Impresión térmica",
        description: "Tickets y recibos",
        icon: Printer,
      },
      {
        title: "Tienda online",
        description: "Catálogo público integrado",
        icon: Globe2,
      },
    ],
  },
  {
    title: "Menú QR SaaS",
    shortCode: "QR",
    group: "SaaS",
    category: "Plataforma gastronómica",
    description:
      "Operación digital para restaurantes con menú QR, pedidos en tiempo real, clientes, reportes, control de ventas y acceso multidispositivo.",
    shortDescription:
      "Menú QR, pedidos en tiempo real, clientes, reportes y control de ventas.",
    image: "/images/projects/menu-qr.svg",
    tags: ["SaaS", "QR", "React", "PostgreSQL"],
    benefits: [
      {
        title: "Menú digital",
        description: "Consulta mediante código QR",
        icon: QrCode,
      },
      {
        title: "Pedidos ágiles",
        description: "Operación en tiempo real",
        icon: ShoppingBag,
      },
      {
        title: "Clientes",
        description: "Información centralizada",
        icon: UsersRound,
      },
    ],
  },
  {
    title: "Traductor de Lengua de Señas",
    shortCode: "IA",
    group: "IA",
    category: "Inteligencia artificial e inclusión",
    description:
      "Sistema web orientado a la educación inclusiva que registra, procesa y reconoce secuencias de Lengua de Señas Colombiana mediante visión por computador.",
    shortDescription:
      "Reconocimiento de secuencias de Lengua de Señas Colombiana mediante visión por computador.",
    image: "/images/projects/sign-language.svg",
    tags: ["Flask", "MediaPipe", "IA", "MongoDB"],
    benefits: [
      {
        title: "Inclusión",
        description: "Tecnología accesible",
        icon: UsersRound,
      },
      {
        title: "Visión artificial",
        description: "Reconocimiento de gestos",
        icon: Globe2,
      },
      {
        title: "Aprendizaje",
        description: "Apoyo educativo",
        icon: Boxes,
      },
    ],
  },
];

export const processSteps = [
  [
    "01",
    "Análisis",
    "Identificamos necesidades, alcance, usuarios y objetivos del proyecto.",
  ],
  [
    "02",
    "Planeación",
    "Definimos arquitectura, cronograma, prioridades y estrategia tecnológica.",
  ],
  [
    "03",
    "Diseño",
    "Creamos interfaces modernas, claras y coherentes con la identidad de la marca.",
  ],
  [
    "04",
    "Desarrollo",
    "Construimos una solución robusta, escalable y preparada para crecer.",
  ],
  [
    "05",
    "Pruebas",
    "Validamos funcionalidad, rendimiento, seguridad y experiencia de usuario.",
  ],
  [
    "06",
    "Implementación",
    "Publicamos el sistema y acompañamos su puesta en marcha.",
  ],
  [
    "07",
    "Acompañamiento",
    "Brindamos soporte, mantenimiento y mejora continua.",
  ],
];

export const companyStats = [
  ["4+", "Soluciones desarrolladas"],
  ["6", "Líneas de servicio"],
  ["100%", "Enfoque personalizado"],
  ["24/7", "Disponibilidad digital"],
];
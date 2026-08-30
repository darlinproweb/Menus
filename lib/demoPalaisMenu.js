// Datos completos de productos y categorías para plantillas demo (sin modificar la información del negocio)

export const DEMO_CATEGORIAS = [
  {
    id: "entradas",
    nombre: "Entradas",
    nombre_en: "Appetizers",
    subtitulo: "Para comenzar y compartir",
    subtitulo_en: "To start and share",
    orden: 1
  },
  {
    id: "pastas",
    nombre: "Pastas",
    nombre_en: "Pastas",
    subtitulo: "Salsas: Carbonara, Pomodoro, Boloñesa, Bechamel o Al Pesto",
    subtitulo_en: "Sauces: Carbonara, Pomodoro, Bolognese, Bechamel or Pesto",
    orden: 2
  },
  {
    id: "pescados-y-mariscos",
    nombre: "Pescados y Mariscos",
    nombre_en: "Fish & Seafood",
    subtitulo: "Frescura del mar en preparaciones criollas, al ajillo y al coco",
    subtitulo_en: "Fresh seafood in Creole, garlic, and coconut styles",
    orden: 3
  },
  {
    id: "parrilladas",
    nombre: "Parrilladas & Especialidades",
    nombre_en: "Grills & Specialties",
    subtitulo: "Especialidades a las brasas y cortes para compartir",
    subtitulo_en: "Grilled specialties and cuts to share",
    orden: 4
  }
];

export const DEMO_PRODUCTOS = [
  // --- ENTRADAS ---
  {
    id: "prod-ent-1",
    categoria: "Entradas",
    grupo: "Entradas Clásicas",
    nombre: "Canastitas de Plátano Rellena",
    descripcion: "Crujientes canasticas de plátano verde rellenas a elección de carne o mariscos.",
    nota: "Carne / Mariscos",
    precio: 300,
    precio_texto: "RD$ 300 / 500",
    destacado: true,
    disponible: true,
    orden: 1
  },
  {
    id: "prod-ent-2",
    categoria: "Entradas",
    grupo: "Entradas Clásicas",
    nombre: "Canapé Carne / Camarones / Mixto",
    descripcion: "Bocadillos crujientes montados con carne, camarones o combinación mixta.",
    nota: "Carne, Camarones o Mixto",
    precio: 350,
    precio_texto: "RD$ 350",
    destacado: false,
    disponible: true,
    orden: 2
  },
  {
    id: "prod-ent-3",
    categoria: "Entradas",
    grupo: "Para Picar",
    nombre: "Chicken Nuggets",
    descripcion: "Trocitos crocantes de pechuga de pollo empanizados y dorados a la perfección.",
    nota: "Con salsa de la casa",
    precio: 250,
    precio_texto: "RD$ 250",
    destacado: false,
    disponible: true,
    orden: 3
  },
  {
    id: "prod-ent-4",
    categoria: "Entradas",
    grupo: "Para Picar",
    nombre: "Croquetas de Pollo",
    descripcion: "Croquetas caseras suaves por dentro y con rebozado crujiente.",
    nota: "Cremosas y doradas",
    precio: 225,
    precio_texto: "RD$ 225",
    destacado: false,
    disponible: true,
    orden: 4
  },
  {
    id: "prod-ent-5",
    categoria: "Entradas",
    grupo: "Para Picar",
    nombre: "Deditos de Mozarella",
    descripcion: "Bastoncitos de queso mozarella empanizados y fundentes al morder.",
    nota: "Con dip especial",
    precio: 225,
    precio_texto: "RD$ 225",
    destacado: false,
    disponible: true,
    orden: 5
  },

  // --- PASTAS ---
  {
    id: "prod-pas-1",
    categoria: "Pastas",
    grupo: "Pastas Largas & Cortas",
    nombre: "Fettuccini con Camarones / Pollo",
    descripcion: "Pasta fettuccini en salsa a tu elección: Carbonara, Pomodoro o Boloñesa.",
    nota: "A la Carbonara, Pomodoro o Boloñesa",
    precio: 550,
    precio_texto: "RD$ 550 / 800",
    destacado: true,
    disponible: true,
    orden: 1
  },
  {
    id: "prod-pas-2",
    categoria: "Pastas",
    grupo: "Pastas Largas & Cortas",
    nombre: "Penne con Camarones / Pollo",
    descripcion: "Pasta penne salteada en salsa Bechamel, Pomodoro o Al Pesto casero.",
    nota: "Bechamel, Pomodoro o Al Pesto",
    precio: 550,
    precio_texto: "RD$ 550 / 800",
    destacado: false,
    disponible: true,
    orden: 2
  },
  {
    id: "prod-pas-3",
    categoria: "Pastas",
    grupo: "Pastas Largas & Cortas",
    nombre: "Espaguetis con Camarones / Pollo",
    descripcion: "Espaguetis tradicionales al dente en salsa Bechamel, Pomodoro o Boloñesa.",
    nota: "Bechamel, Pomodoro o Boloñesa",
    precio: 550,
    precio_texto: "RD$ 550 / 800",
    destacado: false,
    disponible: true,
    orden: 3
  },

  // --- PESCADOS Y MARISCOS ---
  {
    id: "prod-mar-1",
    categoria: "Pescados y Mariscos",
    grupo: "Especialidades del Mar",
    nombre: "Langosta (1.5 LB)",
    descripcion: "Cola de langosta fresca de 1.5 libras preparada Al Termidor o Al Ajillo.",
    nota: "Al Termidor o Al Ajillo · 1.5 LB",
    precio: 1500,
    precio_texto: "RD$ 1,500 (1.5LB)",
    destacado: true,
    disponible: true,
    orden: 1
  },
  {
    id: "prod-mar-2",
    categoria: "Pescados y Mariscos",
    grupo: "Pescados Enteros & Filetes",
    nombre: "Pescado Colorao Frito / Al Vapor",
    descripcion: "Pescado colorado entero fresco, preparado frito o al vapor en salsa Criolla, Al Ajillo o Al Coco.",
    nota: "A la Criolla, Al Ajillo o Al Coco",
    precio: 1200,
    precio_texto: "RD$ 1,200",
    destacado: true,
    disponible: true,
    orden: 2
  },
  {
    id: "prod-mar-3",
    categoria: "Pescados y Mariscos",
    grupo: "Especialidades del Mar",
    nombre: "Salpicón de Mariscos",
    descripcion: "Variedad de mariscos frescos aderezados a la Vinagreta, A la Criolla o Al Coco.",
    nota: "A la Vinagreta, A la Criolla o Al Coco",
    precio: 1200,
    precio_texto: "RD$ 1,200",
    destacado: false,
    disponible: true,
    orden: 3
  },
  {
    id: "prod-mar-4",
    categoria: "Pescados y Mariscos",
    grupo: "Especialidades del Mar",
    nombre: "Pulpo a La Brasa",
    descripcion: "Tentáculos de pulpo tierno asados a la brasa con aceite de oliva virgen y pimentón.",
    nota: "Tierno y braseado",
    precio: 900,
    precio_texto: "RD$ 900",
    destacado: true,
    disponible: true,
    orden: 4
  },
  {
    id: "prod-mar-5",
    categoria: "Pescados y Mariscos",
    grupo: "Especialidades del Mar",
    nombre: "Lambi",
    descripcion: "Carrucho tierno en salsa a elección: A la Vinagreta, Al Ajillo, A la Criolla o Al Coco.",
    nota: "A la Vinagreta, Al Ajillo, A la Criolla o Al Coco",
    precio: 900,
    precio_texto: "RD$ 900",
    destacado: false,
    disponible: true,
    orden: 5
  },
  {
    id: "prod-mar-6",
    categoria: "Pescados y Mariscos",
    grupo: "Pescados Enteros & Filetes",
    nombre: "Salmón",
    descripcion: "Filete de salmón fresco a la plancha servido a la Vinagreta, Al Ajillo o A la Criolla.",
    nota: "A la Vinagreta, Al Ajillo o A la Criolla",
    precio: 900,
    precio_texto: "RD$ 900",
    destacado: false,
    disponible: true,
    orden: 6
  },
  {
    id: "prod-mar-7",
    categoria: "Pescados y Mariscos",
    grupo: "Especialidades del Mar",
    nombre: "Camarones",
    descripcion: "Camarones seleccionados preparados Al Ajillo, A la Criolla o A la Crema.",
    nota: "Al Ajillo, A la Criolla o A la Crema",
    precio: 800,
    precio_texto: "RD$ 800",
    destacado: false,
    disponible: true,
    orden: 7
  },
  {
    id: "prod-mar-8",
    categoria: "Pescados y Mariscos",
    grupo: "Pescados Enteros & Filetes",
    nombre: "Filete de Mero Al Vapor / Frito / A la Plancha",
    descripcion: "Delicado filete de mero preparado a tu gusto: Al Vapor, Frito o A la Plancha en salsa Al Ajillo, Criolla o Crema.",
    nota: "Al Ajillo, A la Criolla o A la Crema",
    precio: 750,
    precio_texto: "RD$ 750",
    destacado: false,
    disponible: true,
    orden: 8
  },

  // --- PARRILLADAS & ESPECIALIDADES ---
  {
    id: "prod-par-1",
    categoria: "Parrilladas & Especialidades",
    grupo: "Grandes Parrilladas (Para 2)",
    nombre: "Parrillada de Marisco 2P",
    descripcion: "Abundante selección marina: Pulpo, Camarón, Lambi, Langostino, Pescado y Calamar a las brasas.",
    nota: "Pulpo, Camarón, Lambi, Langostino, Pescado, Calamar (Para 2)",
    precio: 3300,
    precio_texto: "RD$ 3,300",
    destacado: true,
    disponible: true,
    orden: 1
  },
  {
    id: "prod-par-2",
    categoria: "Parrilladas & Especialidades",
    grupo: "Grandes Parrilladas (Para 2)",
    nombre: "Mar y Tierra 2P",
    descripcion: "La combinación suprema: Pulpo, Camarón, Langostino, Pollo, Res, Cerdo y Salchicha.",
    nota: "Pulpo, Camarón, Langostino, Pollo, Res, Cerdo, Salchicha (Para 2)",
    precio: 2800,
    precio_texto: "RD$ 2,800",
    destacado: true,
    disponible: true,
    orden: 2
  },
  {
    id: "prod-par-3",
    categoria: "Parrilladas & Especialidades",
    grupo: "Grandes Parrilladas (Para 2)",
    nombre: "Parrillada de Carnes 2P",
    descripcion: "Festival de carnes a las brasas: Pollo, Res, Cerdo, Salchicha y Alitas doradas.",
    nota: "Pollo, Res, Cerdo, Salchicha, Alitas (Para 2)",
    precio: 2200,
    precio_texto: "RD$ 2,200",
    destacado: true,
    disponible: true,
    orden: 3
  },
  {
    id: "prod-par-4",
    categoria: "Parrilladas & Especialidades",
    grupo: "Cortes & Costillas",
    nombre: "Costillitas Babe Back",
    descripcion: "Costillas de cerdo tiernas y caramelizadas bañadas en exquisita salsa BBQ de la casa.",
    nota: "Salsa BBQ casera",
    precio: 950,
    precio_texto: "RD$ 950",
    destacado: true,
    disponible: true,
    orden: 4
  },
  {
    id: "prod-par-5",
    categoria: "Parrilladas & Especialidades",
    grupo: "Aves & Especialidades",
    nombre: "Pechuga Margarita",
    descripcion: "Jugosa pechuga de pollo a la plancha coronada con camarones y suave salsa bechamel.",
    nota: "Pechuga, Camarones y Bechamel",
    precio: 750,
    precio_texto: "RD$ 750",
    destacado: false,
    disponible: true,
    orden: 5
  },
  {
    id: "prod-par-6",
    categoria: "Parrilladas & Especialidades",
    grupo: "Brochetas & Pinchos",
    nombre: "Brochetas de Mariscos",
    descripcion: "Pinchos asados con camarón, lambi tierno y pulpo braseado intercalados.",
    nota: "Camarón, Lambi y Pulpo",
    precio: 750,
    precio_texto: "RD$ 750",
    destacado: false,
    disponible: true,
    orden: 6
  },
  {
    id: "prod-par-7",
    categoria: "Parrilladas & Especialidades",
    grupo: "Brochetas & Pinchos",
    nombre: "Brochetas de Camarones",
    descripcion: "Brochetas de camarones sazonados a la parrilla con mantequilla de ajo.",
    nota: "Camarones al grill",
    precio: 650,
    precio_texto: "RD$ 650",
    destacado: false,
    disponible: true,
    orden: 7
  },
  {
    id: "prod-par-8",
    categoria: "Parrilladas & Especialidades",
    grupo: "Aves & Especialidades",
    nombre: "Pollo Teriyaki",
    descripcion: "Filetes de pollo a la brasa glaseados con salsa teriyaki dulce y ajonjolí.",
    nota: "Glaseado agridulce",
    precio: 575,
    precio_texto: "RD$ 575",
    destacado: false,
    disponible: true,
    orden: 8
  },
  {
    id: "prod-par-9",
    categoria: "Parrilladas & Especialidades",
    grupo: "Aves & Especialidades",
    nombre: "Cerdo Teriyaki",
    descripcion: "Tiernas tiras de lomo de cerdo glaseadas en salsa teriyaki de la casa.",
    nota: "Glaseado agridulce",
    precio: 575,
    precio_texto: "RD$ 575",
    destacado: false,
    disponible: true,
    orden: 9
  },
  {
    id: "prod-par-10",
    categoria: "Parrilladas & Especialidades",
    grupo: "Brochetas & Pinchos",
    nombre: "Brochetas (Pollo / Cerdo / Mixta)",
    descripcion: "Pinchos tradicionales a la brasa con pimientos y cebolla, a elegir de pollo, cerdo o mixta.",
    nota: "Pollo, Cerdo o Mixta",
    precio: 500,
    precio_texto: "RD$ 500",
    destacado: true,
    disponible: true,
    orden: 10
  },
  {
    id: "prod-par-11",
    categoria: "Parrilladas & Especialidades",
    grupo: "Aves & Especialidades",
    nombre: "Pechuga a la Plancha Original",
    descripcion: "Pechuga de pollo sazonada y dorada a la plancha, acompañada de salsa BBQ, guasacaca y pico de gallo.",
    nota: "Salsa BBQ, Guasacaca y Pico de Gallo",
    precio: 475,
    precio_texto: "RD$ 475",
    destacado: false,
    disponible: true,
    orden: 11
  },
  {
    id: "prod-par-12",
    categoria: "Parrilladas & Especialidades",
    grupo: "Alitas & Picaderas",
    nombre: "Alitas BBQ",
    descripcion: "Alitas de pollo crujientes y doradas, generosamente bañadas en salsa BBQ ahumada.",
    nota: "Salsa BBQ ahumada",
    precio: 350,
    precio_texto: "RD$ 350",
    destacado: false,
    disponible: true,
    orden: 12
  },
  {
    id: "prod-par-13",
    categoria: "Parrilladas & Especialidades",
    grupo: "Alitas & Picaderas",
    nombre: "Alitas Picantes",
    descripcion: "Alitas de pollo con rebozado crujiente y salsa picante especial de la casa.",
    nota: "Salsa picante de la casa",
    precio: 350,
    precio_texto: "RD$ 350",
    destacado: false,
    disponible: true,
    orden: 13
  }
];

export const DEMO_SLUGS = [
  "restaurante-demo",
  "fuego-brasa",
  "bistro-demo",
  "medina-demo"
];

export function esSlugDemo(slug) {
  if (!slug) return false;
  return DEMO_SLUGS.includes(slug.toLowerCase().trim());
}

export function getDemoMenuData(slug = "restaurante-demo", negocioExistente = null) {
  const s = slug.toLowerCase().trim();

  // Si ya se obtuvo la información del negocio desde la base de datos, se respeta intacta
  if (negocioExistente) {
    return {
      negocio: negocioExistente,
      categorias: DEMO_CATEGORIAS,
      productos: DEMO_PRODUCTOS
    };
  }

  // Identidades originales por defecto para cada plantilla demo
  let negocio = {
    id: "demo-id",
    slug: s,
    nombre: "Restaurante Demo",
    whatsapp_numero: "18095551234",
    plantilla: "ticket-clasico",
    color_acento: "#6B2737",
    tagline: null,
    descripcion: null,
    logo_url: null,
    imagen_hero_url: null,
    activo: true
  };

  if (s === "fuego-brasa" || s === "medina-demo") {
    negocio = {
      ...negocio,
      nombre: "Fuego & Brasa",
      whatsapp_numero: "18095551234",
      plantilla: "medina-grill",
      color_acento: "#6B2737",
      tagline: "Steakhouse & Grill",
      descripcion: "Cortes premium a las brasas, mariscos frescos, mofongos criollos y la mejor selección de bar.",
      imagen_hero_url: "/hero-parrilla.png"
    };
  } else if (s === "bistro-demo") {
    negocio = {
      ...negocio,
      nombre: "L'Étoile Café & Bistro",
      whatsapp_numero: "18095558888",
      plantilla: "bistro-chic",
      color_acento: "#6B2737",
      tagline: "Artisanal Coffee & Bakery",
      descripcion: "Café de especialidad, brunch de autor y repostería artesanal horneada diariamente."
    };
  }

  return {
    negocio,
    categorias: DEMO_CATEGORIAS,
    productos: DEMO_PRODUCTOS
  };
}

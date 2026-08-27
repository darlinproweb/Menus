// Diccionario de traducciones para la interfaz de usuario (UI) y contenido de menús

export const uiTranslations = {
  es: {
    // Búsqueda
    search_placeholder_bistro: "Buscar por plato, ingrediente o bebida...",
    search_placeholder_medina: "Buscar en el menú...",
    clear_search: "Limpiar búsqueda",
    no_dishes_found_title: 'No encontramos platos que coincidan con "{query}"',
    no_dishes_found_title_short: 'No encontramos platos con "{query}"',
    try_another_term: "Intenta buscar con otro término o explora las categorías del menú.",
    view_full_menu: "Ver menú completo",
    view_all_menu: "Ver todo el menú",

    // Badges & Botones Hero / Header
    interactive_menu: "Menú Digital Interactivo",
    contact_whatsapp: "Contactar por WhatsApp",
    order_whatsapp: "Hacer pedido por WhatsApp",
    
    // Carrito / Order Tray
    my_order: "Mi Pedido",
    items_count: "ítems",
    item_single: "ítem",
    view_order: "Ver Pedido 💬",
    view_my_tab: "Ver mi comanda",
    your_order_for: "Tu Pedido para",
    review_before_send: "Revisa tus productos antes de enviar a WhatsApp",
    your_name: "Tu nombre (Opcional):",
    your_name_placeholder: "Ej. María Pérez",
    table_notes: "Mesa / Dirección / Notas especiales:",
    table_notes_placeholder: "Ej. Mesa 4 / Para llevar / Sin cebolla",
    estimated_total: "Total Estimado:",
    send_whatsapp_order: "💬 Enviar Pedido por WhatsApp",
    clear_order: "Vaciar Pedido",
    keep_viewing_menu: "Seguir viendo menú",

    // WhatsApp Message
    wa_greeting: "¡Hola *{nombre}*! 👋\nMe gustaría realizar el siguiente pedido:\n\n",
    wa_total: "\n💰 *Total Estimado:* {total}\n",
    wa_client: "👤 *Cliente:* {cliente}\n",
    wa_notes: "📝 *Nota/Mesa/Dirección:* {nota}\n",
    wa_footer: "\n*Enviado desde el Menú Digital NexoLink*",

    // Estado & Pie de página
    empty_menu_notice: "Este negocio todavía no ha agregado productos a su menú.",
    sold_out: "Agotado",
    admin_panel: "Panel Administrador",
    admin_panel_short: "Panel Admin",
    developed_by: "Desarrollado con ❤️ por",
    digital_menu_by: "Menú digital por",
    rights_reserved: "Todos los derechos reservados.",
    we_welcome_you: "Te esperamos en",

    // Selector de Idiomas
    language: "Idioma",
    spanish: "Español",
    english: "English"
  },
  en: {
    // Búsqueda
    search_placeholder_bistro: "Search for dish, ingredient or drink...",
    search_placeholder_medina: "Search the menu...",
    clear_search: "Clear search",
    no_dishes_found_title: 'No dishes found matching "{query}"',
    no_dishes_found_title_short: 'No dishes found for "{query}"',
    try_another_term: "Try searching with another term or explore the menu categories.",
    view_full_menu: "View full menu",
    view_all_menu: "View full menu",

    // Badges & Botones Hero / Header
    interactive_menu: "Interactive Digital Menu",
    contact_whatsapp: "Contact via WhatsApp",
    order_whatsapp: "Order via WhatsApp",
    
    // Carrito / Order Tray
    my_order: "My Order",
    items_count: "items",
    item_single: "item",
    view_order: "View Order 💬",
    view_my_tab: "View my order",
    your_order_for: "Your Order for",
    review_before_send: "Review your items before sending to WhatsApp",
    your_name: "Your name (Optional):",
    your_name_placeholder: "E.g. Jane Doe",
    table_notes: "Table / Address / Special notes:",
    table_notes_placeholder: "E.g. Table 4 / To Go / No onion",
    estimated_total: "Estimated Total:",
    send_whatsapp_order: "💬 Send Order via WhatsApp",
    clear_order: "Clear Order",
    keep_viewing_menu: "Continue browsing",

    // WhatsApp Message
    wa_greeting: "Hello *{nombre}*! 👋\nI would like to place the following order:\n\n",
    wa_total: "\n💰 *Estimated Total:* {total}\n",
    wa_client: "👤 *Customer:* {cliente}\n",
    wa_notes: "📝 *Note/Table/Address:* {nota}\n",
    wa_footer: "\n*Sent from NexoLink Digital Menu*",

    // Estado & Pie de página
    empty_menu_notice: "This business has not added products to its menu yet.",
    sold_out: "Sold Out",
    admin_panel: "Admin Panel",
    admin_panel_short: "Admin Panel",
    developed_by: "Powered with ❤️ by",
    digital_menu_by: "Digital menu by",
    rights_reserved: "All rights reserved.",
    we_welcome_you: "We look forward to welcoming you at",

    // Selector de Idiomas
    language: "Language",
    spanish: "Español",
    english: "English"
  }
};

// Diccionario y frases culinarias completas (demo + restaurantes estándar)
const dictionaryPhrases = [
  // Demo Medina Grill
  ["Medina's", "Medina's"],
  ["Meats Shop & Grill", "Meats Shop & Grill"],
  ["Cortes premium a las brasas, mariscos frescos, mofongos criollos y la mejor selección de bar.", "Premium grilled cuts, fresh seafood, local mofongos & curated bar selection."],
  ["Parrilla", "Grill & BBQ"],
  ["A las brasas · ITBIS incluido", "Grilled on embers · Tax Included"],
  ["Bar", "Bar & Drinks"],
  ["Vinos, cocteles y bebidas", "Wines, cocktails & beverages"],
  ["Tajos Carnes Angus", "Angus Meat Cuts"],
  ["Churrasco Angus", "Angus Skirt Steak"],
  ["Costilla a la BBQ", "BBQ Baby Back Ribs"],
  ["Pequeña / Grande", "Small / Large"],
  ["Cocteles", "Cocktails"],
  ["Margarita", "Margarita Cocktail"],

  // Demo Bistro Chic (L'Étoile)
  ["L'Étoile Café & Bistro", "L'Étoile Café & Bistro"],
  ["Artisanal Coffee & Bakery", "Artisanal Coffee & Bakery"],
  ["Café de especialidad, brunch de autor y repostería artesanal horneada diariamente.", "Specialty coffee, signature brunch & artisanal pastries baked daily."],
  ["Cafés & Especialidades", "Coffees & Specialties"],
  ["Cafés y Especialidades", "Coffees & Specialties"],
  ["Granos orgánicos seleccionados · Tueste artesanal", "Selected organic beans · Artisanal roast"],
  ["Brunch & Salados", "Brunch & Savory"],
  ["Tostadas, tostados y huevos de libre pastoreo", "Toasts, grilled sandwiches & free-range eggs"],
  ["Pastelería & Repostería", "Pastry & Bakery"],
  ["Horneado fresco cada mañana en casa", "Baked fresh in-house every morning"],
  ["Bebidas Frías & Cocteles", "Cold Drinks & Cocktails"],
  ["Refrescantes, jugos naturales y coctelería bistro", "Refreshments, natural juices & bistro cocktails"],
  ["Café Caliente", "Hot Coffee"],
  ["Flat White Australiano", "Australian Flat White"],
  ["Doble shot de espresso con microespuma sedosa de leche.", "Double shot of espresso with silky steamed milk microfoam."],
  ["Cappuccino Tradicional", "Traditional Cappuccino"],
  ["Espresso intenso balanceado con abundante espuma de leche suave y cacao en polvo.", "Rich espresso balanced with smooth milk foam & cocoa powder dust."],
  ["Extracción en Frío", "Cold Brew"],
  ["Cold Brew de Vainilla & Caramelo", "Vanilla & Caramel Cold Brew"],
  ["Extracción en frío durante 18 horas con sirope de vainilla artesanal y espuma fría de caramelo.", "18-hour cold brew infused with housemade vanilla syrup & cold caramel foam."],
  ["Tostadas Especiales", "Special Toasts"],
  ["Avocado Toast & Huevo Poché", "Avocado Toast & Poached Egg"],
  ["Pan de masa madre, aguacate cremoso, queso feta, tomates cherry confitados y huevo pochado.", "Artisanal sourdough, creamy avocado, feta cheese, confit cherry tomatoes & poached egg."],
  ["Croissant Benedictino", "Benedict Croissant"],
  ["Croissant hojaldrado con jamón serrano, huevo pochado y salsa holandesa casera.", "Flaky croissant with prosciutto ham, poached egg & homemade hollandaise sauce."],
  ["Dulce & Salado", "Sweet & Savory"],
  ["Tostada Francesa con Berries", "French Toast with Berries"],
  ["Pan brioche artesanal dorado en mantequilla noisette, compota de frutos rojos y sirope de arce puro.", "Artisanal brioche toasted in brown butter, mixed berry compote & pure maple syrup."],
  ["Hojaldres", "Pastries & Croissants"],
  ["Croissant de Almendras", "Almond Croissant"],
  ["Croissant hojaldrado relleno y cubierto con crema frangipane y almendras tostadas.", "Flaky croissant filled and topped with almond frangipane cream & toasted almonds."],
  ["Tortas & Postres", "Cakes & Desserts"],
  ["Tarta de Queso Vasca (Basque Cheesecake)", "Basque Cheesecake"],
  ["Horneada a alta temperatura con centro cremoso e irresistible toque tostado.", "Baked at high heat with a rich creamy center and caramelized top."],
  ["Bebidas Heladas", "Iced Drinks"],
  ["Iced Matcha Latte", "Iced Matcha Latte"],
  ["Matcha ceremonial japonés de grado A batido con leche fría y un toque de miel silvestre.", "Grade A Japanese ceremonial matcha whisked with cold milk & wild honey."],
  ["Coctelería Brunch", "Brunch Cocktails"],
  ["Mimosa de Maracuyá & Champaña", "Passion Fruit & Champagne Mimosa"],
  ["Champaña brut helada, jugo fresco de maracuyá y toque de menta fresca.", "Chilled brut champagne, fresh passion fruit juice & fresh mint."],

  // Demo Ticket Clasico
  ["Restaurante Demo", "Demo Restaurant"],
  ["Desayunos", "Breakfast"],
  ["Desayuno", "Breakfast"],
  ["Almuerzo", "Lunch"],
  ["Cena", "Dinner"],
  ["Mangú con los tres golpes", "Mangú with 'Los Tres Golpes'"],
  ["Mangú, queso frito, salami, huevo", "Mashed plantains, fried cheese, salami & egg"],
  ["Pollo guisado", "Braised Stewed Chicken"],
  ["Con arroz blanco y habichuelas", "Served with white rice & stewed red beans"],

  // Categorías comunes
  ["Platos Fuertes", "Main Courses"],
  ["Plato Fuerte", "Main Course"],
  ["Entradas & Aperitivos", "Appetizers & Starters"],
  ["Entradas", "Appetizers"],
  ["Aperitivos", "Starters"],
  ["Bebidas", "Drinks"],
  ["Bebidas Frías", "Cold Drinks"],
  ["Bebidas Calientes", "Hot Drinks"],
  ["Postres", "Desserts"],
  ["Postre", "Dessert"],
  ["Guarniciones", "Side Dishes"],
  ["Acompañamientos", "Side Dishes"],
  ["Ensaladas", "Salads"],
  ["Sopas & Cremas", "Soups & Creams"],
  ["Sopas", "Soups"],
  ["Hamburguesas", "Burgers"],
  ["Pizzas", "Pizzas"],
  ["Sandwiches", "Sandwiches"],
  ["Sándwiches", "Sandwiches"],
  ["Tacos & Fajitas", "Tacos & Fajitas"],
  ["Mariscos", "Seafood"],
  ["Pescados & Mariscos", "Fish & Seafood"],
  ["Pescados", "Fish"],
  ["Cortes de Carne", "Steaks & Meat Cuts"],
  ["Parrilladas", "Barbecue Grills"],
  ["Parrillada", "Barbecue Grill"],
  ["Tragos & Cocteles", "Cocktails & Drinks"],
  ["Cervezas", "Beers"],
  ["Vinos", "Wines"],
  ["Licuados & Batidos", "Smoothies & Shakes"],
  ["Jugos Naturales", "Natural Juices"],
  ["Jugos", "Juices"],

  // Platos y especialidades populares
  ["Pechuga a la parrilla", "Grilled Chicken Breast"],
  ["Pechuga a la plancha", "Grilled Chicken Breast"],
  ["Pechuga Cordon Bleu", "Chicken Cordon Bleu"],
  ["Mofongo de Chicharrón", "Crispy Pork Mofongo"],
  ["Mofongo de Camarones", "Garlic Shrimp Mofongo"],
  ["Mofongo de Queso", "Cheese Mofongo"],
  ["Mofonguitos", "Mini Mofongos"],
  ["Sancocho Dominicano", "Dominican Meat Stew"],
  ["Sancocho", "Traditional Meat Stew"],
  ["Pescado Frito", "Fried Whole Fish"],
  ["Pescado a la plancha", "Grilled Fish Fillet"],
  ["Chivo Liniero", "Stewed Goat Meat"],
  ["Costillas BBQ", "BBQ Ribs"],
  ["Carnitas de Cerdo", "Crispy Pork Bites"],
  ["Chicharron de Cerdo", "Crispy Pork Belly"],
  ["Chicharrón de Cerdo", "Crispy Pork Belly"],
  ["Ensalada César con Pollo", "Caesar Salad with Chicken"],
  ["Ensalada Mixta", "House Mixed Salad"],
  ["Sopa de Mariscos", "Seafood Soup"],
  ["Hamburguesa de la Casa", "House Special Burger"],
  ["Papas Fritas", "French Fries"],
  ["Papas majadas", "Mashed Potatoes"],
  ["Puré de papas", "Mashed Potatoes"],
  ["Tostones", "Fried Plantains"],
  ["Plátanos Maduros", "Sweet Fried Plantains"],
  ["Yuca Frita", "Fried Cassava"],
  ["Yuca Encebollada", "Cassava with Pickled Onions"],
  ["Agua Mineral", "Mineral Water"],
  ["Limonada Natural", "Fresh Lemonade"],
  ["Limonada Cerezada", "Cherry Lemonade"],
  ["Piña Colada", "Piña Colada"],
  ["Mojito Tradicional", "Traditional Mojito"],
  ["Sangría de Vino Tinto", "Red Wine Sangria"],
  ["Tres Leches", "Tres Leches Cake"],
  ["Flan de Leche", "Caramel Custard Flan"],

  // Notas / Etiquetas comunes
  ["Leche entera, avena o almendras", "Whole, oat or almond milk"],
  ["Recomendación de la casa", "Chef's recommendation"],
  ["Opción vegetariana", "Vegetarian option"],
  ["Fresco del día", "Freshly baked today"],
  ["Sin Gluten", "Gluten-Free"]
];

// Mapa case-insensitive para coincidencias exactas e instantáneas
const lowerPhraseMap = new Map();
dictionaryPhrases.forEach(([es, en]) => {
  lowerPhraseMap.set(es.trim().toLowerCase(), en);
});

// Reemplazos de palabras individuales
const wordReplacements = {
  "pollo": "chicken",
  "pechuga": "chicken breast",
  "carne": "meat",
  "res": "beef",
  "cerdo": "pork",
  "puerco": "pork",
  "chicharrón": "pork belly",
  "chicharron": "pork belly",
  "pescado": "fish",
  "filete": "fillet",
  "camaron": "shrimp",
  "camarones": "shrimp",
  "mariscos": "seafood",
  "queso": "cheese",
  "jamón": "ham",
  "jamon": "ham",
  "huevo": "egg",
  "huevos": "eggs",
  "tocino": "bacon",
  "tocineta": "bacon",
  "arroz": "rice",
  "habichuelas": "beans",
  "frijoles": "beans",
  "papa": "potato",
  "papas": "potatoes",
  "plátano": "plantain",
  "platano": "plantain",
  "plátanos": "plantains",
  "aguacate": "avocado",
  "tomate": "tomato",
  "tomates": "tomatoes",
  "cebolla": "onion",
  "ajo": "garlic",
  "ensalada": "salad",
  "sopa": "soup",
  "crema": "cream",
  "jugo": "juice",
  "agua": "water",
  "café": "coffee",
  "cafe": "coffee",
  "té": "tea",
  "leche": "milk",
  "miel": "honey",
  "frito": "fried",
  "frita": "fried",
  "fritos": "fried",
  "fritas": "fried",
  "horneado": "baked",
  "horneada": "baked",
  "asado": "roasted",
  "asada": "roasted",
  "guisado": "stewed",
  "guisada": "stewed",
  "gratinado": "gratin",
  "fresco": "fresh",
  "fresca": "fresh",
  "artesanal": "artisanal",
  "casero": "homemade",
  "casera": "homemade",
  "costilla": "ribs",
  "costillas": "ribs",
  "churrasco": "skirt steak",
  "tajos": "cuts",
  "cortes": "cuts",
  "parrilla": "grill",
  "brasas": "embers",
  "con": "with",
  "sin": "without",
  "y": "&"
};

// Cache en memoria para traducciones dinámicas obtenidas por API
const apiCache = new Map();

/**
 * Traduce una cadena en español al inglés usando diccionario local y reemplazo algorítmico
 */
export function traducirString(text) {
  if (!text || typeof text !== "string") return text;

  const trimmed = text.trim();
  const lower = trimmed.toLowerCase();

  // 1. Coincidencia directa en el mapa case-insensitive
  if (lowerPhraseMap.has(lower)) {
    return lowerPhraseMap.get(lower);
  }

  // 2. Coincidencia en cache API si existe
  if (apiCache.has(lower)) {
    return apiCache.get(lower);
  }

  // 3. Buscar reemplazos de subfrases dentro de textos largos
  let result = trimmed;
  for (const [esPhrase, enPhrase] of dictionaryPhrases) {
    if (result.toLowerCase().includes(esPhrase.toLowerCase())) {
      const regex = new RegExp(esPhrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
      result = result.replace(regex, enPhrase);
    }
  }

  if (result !== trimmed) return result;

  // 4. Reemplazo palabra por palabra si es una frase corta
  const words = trimmed.split(/\s+/);
  const translatedWords = words.map((word) => {
    const cleanWord = word.toLowerCase().replace(/[^a-záéíóúñ]/g, "");
    if (wordReplacements[cleanWord]) {
      const replacement = wordReplacements[cleanWord];
      if (word.charAt(0) === word.charAt(0).toUpperCase()) {
        return replacement.charAt(0).toUpperCase() + replacement.slice(1);
      }
      return replacement;
    }
    return word;
  });

  const finalResult = translatedWords.join(" ");
  
  // Si la traducción palabra por palabra igual no cambió nada y estamos en el cliente,
  // se solicita una traducción asíncrona a la API MyMemory en segundo plano para poblar el cache.
  if (finalResult === trimmed && typeof window !== "undefined") {
    fetchAutoTranslateAsync(trimmed);
  }

  return finalResult;
}

/**
 * Petición asíncrona a la API gratuita MyMemory para traducir ítems no registrados
 */
async function fetchAutoTranslateAsync(text) {
  if (!text || apiCache.has(text.toLowerCase())) return;
  try {
    const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=es|en`);
    const data = await res.json();
    if (data && data.responseData && data.responseData.translatedText) {
      const translated = data.responseData.translatedText;
      apiCache.set(text.toLowerCase(), translated);
    }
  } catch (e) {
    // Ignore fetch failure silently
  }
}

/**
 * Retorna la traducción de una clave UI según el idioma activo ('es' | 'en')
 */
export function getUIText(key, idioma = "es", params = {}) {
  const dict = uiTranslations[idioma] || uiTranslations.es;
  let text = dict[key] || uiTranslations.es[key] || key;

  Object.keys(params).forEach((paramKey) => {
    text = text.replace(new RegExp(`\\{${paramKey}\\}`, "g"), params[paramKey]);
  });

  return text;
}

/**
 * Traduce un texto o un objeto de base de datos (producto, categoría) al inglés.
 * Soporta columnas explícitas de DB (ej. nombre_en, descripcion_en, subtitulo_en, nota_en)
 * con fallback automático a traducción por diccionario/algorítmica.
 */
export function traducirMenuTexto(itemOrText, idioma = "es", fieldName = "nombre") {
  if (idioma === "es" || !itemOrText) {
    if (typeof itemOrText === "object" && itemOrText !== null) {
      return itemOrText[fieldName] || "";
    }
    return itemOrText;
  }

  // Si se pasa un objeto (fila de Supabase de productos o categorías)
  if (typeof itemOrText === "object" && itemOrText !== null) {
    const explicitEnKey = `${fieldName}_en`;
    if (itemOrText[explicitEnKey] && itemOrText[explicitEnKey].trim()) {
      return itemOrText[explicitEnKey];
    }
    const baseText = itemOrText[fieldName] || "";
    return traducirString(baseText);
  }

  // Si se pasa un string directo
  return traducirString(itemOrText);
}

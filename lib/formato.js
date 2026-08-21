export function formatoPrecioDOP(precio) {
  return new Intl.NumberFormat("es-DO", {
    style: "currency",
    currency: "DOP",
    minimumFractionDigits: 0
  }).format(precio);
}

// Texto a mostrar para un producto: respeta precio_texto (para casos
// como "RD$ 425 / 725" o "Preguntar") y si no existe, formatea el
// precio numérico.
export function textoPrecio(producto) {
  if (producto.precio_texto) return producto.precio_texto;
  return formatoPrecioDOP(producto.precio);
}

export function slugify(texto) {
  return (texto || "")
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

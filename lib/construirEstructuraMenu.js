import { slugify } from "@/lib/formato";

// categorias: filas de la tabla `categorias` (id, nombre, subtitulo, orden)
// productos: filas de la tabla `productos` (categoria, grupo, nombre, ...)
//
// El vínculo entre ambas es por NOMBRE (productos.categoria === categorias.nombre),
// no por id -- así la plantilla ticket-clasico, que no usa la tabla
// `categorias` para nada, sigue funcionando sin cambios.
export function construirEstructuraMenu(categorias, productos) {
  const nombresConCategoria = new Set(categorias.map((c) => c.nombre));

  // Si hay productos con una categoria que no existe en la tabla
  // `categorias` (por ejemplo, alguien la agregó rápido desde el panel
  // sin crear la categoría formal), igual la mostramos al final.
  const categoriasCompletas = [...categorias];
  for (const p of productos) {
    const nombreCat = p.categoria || "General";
    if (!nombresConCategoria.has(nombreCat)) {
      nombresConCategoria.add(nombreCat);
      categoriasCompletas.push({ nombre: nombreCat, subtitulo: "", orden: 999 });
    }
  }

  categoriasCompletas.sort((a, b) => (a.orden ?? 999) - (b.orden ?? 999));

  return categoriasCompletas.map((cat) => {
    const productosDeLaCategoria = productos.filter(
      (p) => (p.categoria || "General") === cat.nombre
    );

    const nombresGrupo = [];
    const gruposMap = {};
    for (const p of productosDeLaCategoria) {
      const nombreGrupo = p.grupo || cat.nombre;
      if (!gruposMap[nombreGrupo]) {
        gruposMap[nombreGrupo] = [];
        nombresGrupo.push(nombreGrupo);
      }
      gruposMap[nombreGrupo].push(p);
    }

    return {
      id: slugify(cat.nombre),
      nombre: cat.nombre,
      subtitulo: cat.subtitulo || "",
      grupos: nombresGrupo.map((nombreGrupo) => ({
        titulo: nombreGrupo,
        items: gruposMap[nombreGrupo]
      }))
    };
  });
}

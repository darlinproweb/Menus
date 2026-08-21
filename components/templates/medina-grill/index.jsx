import { MenuHero } from "./MenuHero";
import { MenuNav } from "./MenuNav";
import { MenuSearchableList } from "./MenuSearchableList";
import { MenuFooter } from "./MenuFooter";

export function MedinaGrillTemplate({ negocio, slug, categoriasEstructuradas }) {
  const categoriasParaNav = categoriasEstructuradas.map((c) => ({ id: c.id, nombre: c.nombre }));

  return (
    <div className="tema-medina min-h-screen">
      <MenuHero negocio={negocio} />
      <MenuNav negocio={negocio} categorias={categoriasParaNav} />
      <MenuSearchableList categorias={categoriasEstructuradas} />
      <MenuFooter negocio={negocio} slug={slug} />
    </div>
  );
}

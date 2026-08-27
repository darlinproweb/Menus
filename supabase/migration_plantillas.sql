-- ============================================================
-- Migración: soporte para plantillas con estructura de 3 niveles
-- (Categoría > Grupo > Ítem) y selección de plantilla por negocio.
-- Ejecutar DESPUÉS de supabase/schema.sql, en SQL Editor.
-- Es aditiva: no rompe la plantilla "ticket-clasico" existente.
-- ============================================================

-- 1. Qué plantilla usa cada negocio para renderizar su menú.
--    'ticket-clasico' = la que armamos por defecto.
--    'medina-grill'   = la plantilla oscura estilo parrilla/steakhouse.
alter table negocios
  add column if not exists plantilla text not null default 'ticket-clasico';

-- Campos opcionales que algunas plantillas usan para el hero
-- (imagen de fondo, tagline) sin forzar a las demás a tenerlos.
alter table negocios
  add column if not exists imagen_hero_url text,
  add column if not exists tagline text,
  add column if not exists descripcion text;

-- 2. Categorías como entidad propia (antes "categoria" era solo un
--    texto libre en productos). Esto permite subtítulo y orden por
--    categoría, que la plantilla Medina's necesita para su nav.
create table if not exists categorias (
  id uuid primary key default gen_random_uuid(),
  negocio_id uuid references negocios(id) on delete cascade not null,
  nombre text not null,
  subtitulo text,
  orden int default 0,
  created_at timestamptz default now(),
  unique (negocio_id, nombre)
);

-- 3. Extensiones a productos para soportar el nivel "grupo" dentro
--    de una categoría (ej. categoría "Parrilla" > grupo "Pinchos"),
--    notas cortas (ej. "Pequeña"/"Grande"), y precios en texto libre
--    para casos como "RD$ 425 / 725" o "Preguntar" que no caben en
--    un numeric.
alter table productos
  add column if not exists grupo text,
  add column if not exists nota text,
  add column if not exists precio_texto text,
  add column if not exists destacado boolean not null default false;

-- precio sigue existiendo y sigue siendo obligatorio (default 0) para
-- no romper la plantilla ticket-clasico, que ordena/formatea con él.
-- Cuando precio_texto no es null, las plantillas que lo soporten deben
-- mostrar precio_texto tal cual en lugar de formatear `precio`.

create index if not exists idx_categorias_negocio on categorias(negocio_id);
create index if not exists idx_productos_grupo on productos(negocio_id, grupo);

-- 4. RLS para categorias (mismo patrón que negocios/productos)
alter table categorias enable row level security;

drop policy if exists "categorias: lectura publica" on categorias;
create policy "categorias: lectura publica" on categorias
  for select using (true);

drop policy if exists "categorias: admin edita las suyas" on categorias;
create policy "categorias: admin edita las suyas" on categorias
  for all
  using (
    negocio_id in (
      select negocio_id from negocio_admins where user_id = auth.uid()
    )
  )
  with check (
    negocio_id in (
      select negocio_id from negocio_admins where user_id = auth.uid()
    )
  );

-- ------------------------------------------------------------
-- 5. DATOS DE PRUEBA para la plantilla medina-grill
--    (borra esto o cámbialo antes de producción)
-- ------------------------------------------------------------
insert into negocios (slug, nombre, whatsapp_numero, plantilla, tagline, descripcion, logo_url, imagen_hero_url)
values (
  'medina-demo',
  'Fuego & Brasa',
  '18095551234',
  'medina-grill',
  'Steakhouse & Grill',
  'Cortes premium a las brasas, mariscos frescos, mofongos criollos y la mejor selección de bar.',
  null,
  '/hero-parrilla.png'
)
on conflict (slug) do update set
  nombre = excluded.nombre,
  tagline = excluded.tagline,
  logo_url = excluded.logo_url;

insert into categorias (negocio_id, nombre, subtitulo, orden)
select id, 'Parrilla', 'A las brasas · ITBIS incluido', 1 from negocios where slug = 'medina-demo'
on conflict (negocio_id, nombre) do nothing;

insert into categorias (negocio_id, nombre, subtitulo, orden)
select id, 'Bar', 'Vinos, cocteles y bebidas', 2 from negocios where slug = 'medina-demo'
on conflict (negocio_id, nombre) do nothing;

insert into productos (negocio_id, categoria, grupo, nombre, precio, precio_texto, nota, destacado, orden)
select id, 'Parrilla', 'Tajos Carnes Angus', 'Churrasco Angus', 1680, null, null, true, 1
from negocios where slug = 'medina-demo';

insert into productos (negocio_id, categoria, grupo, nombre, precio, precio_texto, nota, destacado, orden)
select id, 'Parrilla', 'Tajos Carnes Angus', 'Costilla a la BBQ', 825, 'RD$ 825 / 1,600', 'Pequeña / Grande', false, 2
from negocios where slug = 'medina-demo';

insert into productos (negocio_id, categoria, grupo, nombre, precio, precio_texto, nota, destacado, orden)
select id, 'Bar', 'Cocteles', 'Margarita', 400, null, null, false, 1
from negocios where slug = 'medina-demo';

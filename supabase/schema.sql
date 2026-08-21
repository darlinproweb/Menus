-- ============================================================
-- NexoLink Menus - Esquema Multi-Tenant
-- Ejecutar en: Supabase Dashboard > SQL Editor > New query
-- ============================================================

create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
-- 1. NEGOCIOS (cada cliente/restaurante/tienda)
-- ------------------------------------------------------------
create table if not exists negocios (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  nombre text not null,
  logo_url text,
  whatsapp_numero text,           -- formato: 18095551234 (sin + ni espacios)
  color_acento text default '#6B2737',
  activo boolean default true,    -- si dejas de cobrarle, apagas el menú sin borrar nada
  created_at timestamptz default now()
);

-- ------------------------------------------------------------
-- 2. PRODUCTOS (los items del menú/catálogo)
-- ------------------------------------------------------------
create table if not exists productos (
  id uuid primary key default gen_random_uuid(),
  negocio_id uuid references negocios(id) on delete cascade not null,
  nombre text not null,
  descripcion text,
  precio numeric(10,2) not null default 0,
  foto_url text,
  categoria text default 'General',
  disponible boolean default true,
  orden int default 0,
  created_at timestamptz default now()
);

create index if not exists idx_productos_negocio on productos(negocio_id);
create index if not exists idx_negocios_slug on negocios(slug);

-- ------------------------------------------------------------
-- 3. NEGOCIO_ADMINS (vínculo: qué usuario de Supabase Auth
--    puede editar qué negocio -- esto es lo que hace posible
--    que un solo código sirva a todos los clientes)
-- ------------------------------------------------------------
create table if not exists negocio_admins (
  id uuid primary key default gen_random_uuid(),
  negocio_id uuid references negocios(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  created_at timestamptz default now(),
  unique(negocio_id, user_id)
);

-- ------------------------------------------------------------
-- 4. ROW LEVEL SECURITY
-- ------------------------------------------------------------
alter table negocios enable row level security;
alter table productos enable row level security;
alter table negocio_admins enable row level security;

-- El menú es público: cualquiera con el link/QR debe poder verlo
create policy "negocios: lectura publica" on negocios
  for select using (true);

create policy "productos: lectura publica" on productos
  for select using (true);

-- Solo el dueño vinculado puede crear/editar/borrar SUS productos
create policy "productos: admin edita los suyos" on productos
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

-- Un usuario solo puede ver con qué negocio(s) está vinculado
create policy "negocio_admins: ver mi propio vinculo" on negocio_admins
  for select using (user_id = auth.uid());

-- ------------------------------------------------------------
-- 5. DATOS DE PRUEBA (borra esto o cámbialo antes de producción)
-- ------------------------------------------------------------
insert into negocios (slug, nombre, whatsapp_numero, color_acento)
values ('restaurante-demo', 'Restaurante Demo', '18095551234', '#6B2737')
on conflict (slug) do nothing;

insert into productos (negocio_id, nombre, descripcion, precio, categoria, orden)
select id, 'Mangú con los tres golpes', 'Mangú, queso frito, salami, huevo', 350, 'Desayunos', 1
from negocios where slug = 'restaurante-demo'
on conflict do nothing;

insert into productos (negocio_id, nombre, descripcion, precio, categoria, orden)
select id, 'Pollo guisado', 'Con arroz blanco y habichuelas', 450, 'Almuerzo', 1
from negocios where slug = 'restaurante-demo'
on conflict do nothing;

-- ------------------------------------------------------------
-- 6. CÓMO VINCULAR UN DUEÑO A SU NEGOCIO (hazlo manualmente tras
--    que el cliente se registre con magic link por primera vez):
--
--    insert into negocio_admins (negocio_id, user_id)
--    values (
--      (select id from negocios where slug = 'restaurante-demo'),
--      (select id from auth.users where email = 'dueño@restaurante.com')
--    );
-- ------------------------------------------------------------


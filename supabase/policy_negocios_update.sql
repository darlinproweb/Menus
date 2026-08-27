-- ============================================================
-- Migración: política RLS para permitir a los administradores
-- y super admins editar la información y personalización visual.
-- Ejecutar en: Supabase Dashboard > SQL Editor > New query
-- ============================================================

-- 1. Asegurar que las columnas existan en la tabla negocios
alter table negocios
  add column if not exists plantilla text not null default 'ticket-clasico',
  add column if not exists imagen_hero_url text,
  add column if not exists tagline text,
  add column if not exists descripcion text;

-- 2. Habilitar la política de actualización (UPDATE) para admin y super_admin
drop policy if exists "negocios: admin edita el suyo" on negocios;
drop policy if exists "negocios: admin o super_admin edita" on negocios;

create policy "negocios: admin o super_admin edita" on negocios
  for update
  using (
    exists (select 1 from super_admins where user_id = auth.uid())
    or
    id in (
      select negocio_id from negocio_admins where user_id = auth.uid()
    )
  )
  with check (
    exists (select 1 from super_admins where user_id = auth.uid())
    or
    id in (
      select negocio_id from negocio_admins where user_id = auth.uid()
    )
  );

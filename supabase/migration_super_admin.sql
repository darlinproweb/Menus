-- ============================================================
-- NexoLink Menus - Migración: Super Admin (Acceso Total)
-- Ejecutar en: Supabase Dashboard > SQL Editor > New query
-- ============================================================

-- 1. Crear tabla de Super Admins
create table if not exists super_admins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null unique,
  created_at timestamptz default now()
);

-- 2. Habilitar Row Level Security en super_admins
alter table super_admins enable row level security;

drop policy if exists "super_admins: lectura publica" on super_admins;
create policy "super_admins: lectura publica" on super_admins
  for select using (true);

-- 3. Actualizar políticas RLS en PRODUCTOS para incluir a los Super Admins
drop policy if exists "productos: admin edita los suyos" on productos;
drop policy if exists "productos: admin o super_admin edita" on productos;

create policy "productos: admin o super_admin edita" on productos
  for all
  using (
    exists (select 1 from super_admins where user_id = auth.uid())
    or
    negocio_id in (
      select negocio_id from negocio_admins where user_id = auth.uid()
    )
  )
  with check (
    exists (select 1 from super_admins where user_id = auth.uid())
    or
    negocio_id in (
      select negocio_id from negocio_admins where user_id = auth.uid()
    )
  );

-- 4. Actualizar políticas RLS en CATEGORIAS para incluir a los Super Admins
drop policy if exists "categorias: admin edita las suyas" on categorias;
drop policy if exists "categorias: admin o super_admin edita" on categorias;

create policy "categorias: admin o super_admin edita" on categorias
  for all
  using (
    exists (select 1 from super_admins where user_id = auth.uid())
    or
    negocio_id in (
      select negocio_id from negocio_admins where user_id = auth.uid()
    )
  )
  with check (
    exists (select 1 from super_admins where user_id = auth.uid())
    or
    negocio_id in (
      select negocio_id from negocio_admins where user_id = auth.uid()
    )
  );

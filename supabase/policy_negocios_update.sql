-- ============================================================
-- Migración: política RLS para permitir a los dueños editar
-- la información y personalización visual de su negocio.
-- Ejecutar en Supabase Dashboard > SQL Editor > New query
-- ============================================================

create policy "negocios: admin edita el suyo" on negocios
  for update
  using (
    id in (
      select negocio_id from negocio_admins where user_id = auth.uid()
    )
  )
  with check (
    id in (
      select negocio_id from negocio_admins where user_id = auth.uid()
    )
  );

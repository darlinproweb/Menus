-- ============================================================
-- Actualización: Renombrar demo a "Fuego & Brasa" y remover logo
-- Ejecutar en Supabase Dashboard > SQL Editor > New query
-- ============================================================

UPDATE negocios
SET 
  nombre = 'Fuego & Brasa',
  tagline = 'Steakhouse & Grill',
  logo_url = null
WHERE slug = 'medina-demo';

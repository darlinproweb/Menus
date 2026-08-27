-- ============================================================
-- Actualización: Cambiar slug de demo a "fuego-brasa"
-- Ejecutar en: Supabase Dashboard > SQL Editor > New query
-- ============================================================

UPDATE negocios
SET slug = 'fuego-brasa'
WHERE slug = 'medina-demo';

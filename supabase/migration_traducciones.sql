-- ============================================================
-- Migración para soporte de traducciones en inglés en Supabase
-- Ejecutar en: Supabase Dashboard > SQL Editor > New query
-- ============================================================

-- 1. Añadir columnas de traducción opcionales a la tabla `categorias`
alter table categorias
  add column if not exists nombre_en text,
  add column if not exists subtitulo_en text;

-- 2. Añadir columnas de traducción opcionales a la tabla `productos`
alter table productos
  add column if not exists nombre_en text,
  add column if not exists descripcion_en text,
  add column if not exists nota_en text;

-- Ejemplo de uso para actualizar datos con traducciones manuales:
-- update categorias set nombre_en = 'Coffees & Specialties', subtitulo_en = 'Selected organic beans' where nombre = 'Cafés & Especialidades';
-- update productos set nombre_en = 'Flat White', descripcion_en = 'Double espresso shot with silky microfoam' where nombre = 'Flat White Australiano';

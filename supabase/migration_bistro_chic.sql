-- ============================================================
-- Migración / Datos de prueba para la plantilla "bistro-chic"
-- Ejecutar en el SQL Editor de Supabase.
-- ============================================================

-- 1. Insertar el negocio de demo para la plantilla bistro-chic
insert into negocios (
  slug,
  nombre,
  whatsapp_numero,
  plantilla,
  tagline,
  descripcion,
  logo_url,
  imagen_hero_url
)
values (
  'bistro-demo',
  'L''Étoile Café & Bistro',
  '18095558888',
  'bistro-chic',
  'Artisanal Coffee & Bakery',
  'Café de especialidad, brunch de autor y repostería artesanal horneada diariamente.',
  null,
  null
)
on conflict (slug) do update set
  nombre = excluded.nombre,
  plantilla = excluded.plantilla,
  tagline = excluded.tagline,
  descripcion = excluded.descripcion;

-- 2. Insertar Categorías para bistro-demo
insert into categorias (negocio_id, nombre, subtitulo, orden)
select id, 'Cafés & Especialidades', 'Granos orgánicos seleccionados · Tueste artesanal', 1 from negocios where slug = 'bistro-demo'
on conflict (negocio_id, nombre) do update set subtitulo = excluded.subtitulo, orden = excluded.orden;

insert into categorias (negocio_id, nombre, subtitulo, orden)
select id, 'Brunch & Salados', 'Tostadas, tostados y huevos de libre pastoreo', 2 from negocios where slug = 'bistro-demo'
on conflict (negocio_id, nombre) do update set subtitulo = excluded.subtitulo, orden = excluded.orden;

insert into categorias (negocio_id, nombre, subtitulo, orden)
select id, 'Pastelería & Repostería', 'Horneado fresco cada mañana en casa', 3 from negocios where slug = 'bistro-demo'
on conflict (negocio_id, nombre) do update set subtitulo = excluded.subtitulo, orden = excluded.orden;

insert into categorias (negocio_id, nombre, subtitulo, orden)
select id, 'Bebidas Frías & Cocteles', 'Refrescantes, jugos naturales y coctelería bistro', 4 from negocios where slug = 'bistro-demo'
on conflict (negocio_id, nombre) do update set subtitulo = excluded.subtitulo, orden = excluded.orden;

-- 3. Insertar Productos para bistro-demo
-- Categoría: Cafés & Especialidades
insert into productos (negocio_id, categoria, grupo, nombre, descripcion, precio, precio_texto, nota, destacado, orden)
select id, 'Cafés & Especialidades', 'Café Caliente', 'Flat White Australiano', 'Doble shot de espresso con microespuma sedosa de leche.', 240, null, 'Leche entera, avena o almendras', true, 1
from negocios where slug = 'bistro-demo';

insert into productos (negocio_id, categoria, grupo, nombre, descripcion, precio, precio_texto, nota, destacado, orden)
select id, 'Cafés & Especialidades', 'Café Caliente', 'Cappuccino Tradicional', 'Espresso intenso balanceado con abundante espuma de leche suave y cacao en polvo.', 220, null, null, false, 2
from negocios where slug = 'bistro-demo';

insert into productos (negocio_id, categoria, grupo, nombre, descripcion, precio, precio_texto, nota, destacado, orden)
select id, 'Cafés & Especialidades', 'Extracción en Frío', 'Cold Brew de Vainilla & Caramelo', 'Extracción en frío durante 18 horas con sirope de vainilla artesanal y espuma fría de caramelo.', 290, null, 'Recomendación de la casa', true, 3
from negocios where slug = 'bistro-demo';

-- Categoría: Brunch & Salados
insert into productos (negocio_id, categoria, grupo, nombre, descripcion, precio, precio_texto, nota, destacado, orden)
select id, 'Brunch & Salados', 'Tostadas Especiales', 'Avocado Toast & Huevo Poché', 'Pan de masa madre, aguacate cremoso, queso feta, tomates cherry confitados y huevo pochado.', 450, null, 'Opción vegetariana', true, 1
from negocios where slug = 'bistro-demo';

insert into productos (negocio_id, categoria, grupo, nombre, descripcion, precio, precio_texto, nota, destacado, orden)
select id, 'Brunch & Salados', 'Tostadas Especiales', 'Croissant Benedictino', 'Croissant hojaldrado con jamón serrano, huevo pochado y salsa holandesa casera.', 490, null, null, true, 2
from negocios where slug = 'bistro-demo';

insert into productos (negocio_id, categoria, grupo, nombre, descripcion, precio, precio_texto, nota, destacado, orden)
select id, 'Brunch & Salados', 'Dulce & Salado', 'Tostada Francesa con Berries', 'Pan brioche artesanal dorado en mantequilla noisette, compota de frutos rojos y sirope de arce puro.', 420, null, null, false, 3
from negocios where slug = 'bistro-demo';

-- Categoría: Pastelería & Repostería
insert into productos (negocio_id, categoria, grupo, nombre, descripcion, precio, precio_texto, nota, destacado, orden)
select id, 'Pastelería & Repostería', 'Hojaldres', 'Croissant de Almendras', 'Croissant hojaldrado relleno y cubierto con crema frangipane y almendras tostadas.', 220, null, 'Fresco del día', true, 1
from negocios where slug = 'bistro-demo';

insert into productos (negocio_id, categoria, grupo, nombre, descripcion, precio, precio_texto, nota, destacado, orden)
select id, 'Pastelería & Repostería', 'Tortas & Postres', 'Tarta de Queso Vasca (Basque Cheesecake)', 'Horneada a alta temperatura con centro cremoso e irresistible toque tostado.', 340, null, 'Sin Gluten', true, 2
from negocios where slug = 'bistro-demo';

-- Categoría: Bebidas Frías & Cocteles
insert into productos (negocio_id, categoria, grupo, nombre, descripcion, precio, precio_texto, nota, destacado, orden)
select id, 'Bebidas Frías & Cocteles', 'Bebidas Heladas', 'Iced Matcha Latte', 'Matcha ceremonial japonés de grado A batido con leche fría y un toque de miel silvestre.', 270, null, null, false, 1
from negocios where slug = 'bistro-demo';

insert into productos (negocio_id, categoria, grupo, nombre, descripcion, precio, precio_texto, nota, destacado, orden)
select id, 'Bebidas Frías & Cocteles', 'Coctelería Brunch', 'Mimosa de Maracuyá & Champaña', 'Champaña brut helada, jugo fresco de maracuyá y toque de menta fresca.', 380, null, null, true, 2
from negocios where slug = 'bistro-demo';

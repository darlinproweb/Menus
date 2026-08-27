-- ============================================================
-- Alta de Negocio: Nexo Restaurant
-- Plantilla: bistro-chic
-- Slug: nexo-restaurant
-- Ejecutar en: Supabase Dashboard > SQL Editor > New query
-- ============================================================

-- 1. Insertar o actualizar el negocio
insert into negocios (
  slug,
  nombre,
  whatsapp_numero,
  plantilla,
  tagline,
  descripcion,
  color_acento,
  activo
)
values (
  'nexo-restaurant',
  'Nexo Restaurant',
  '18091234567',
  'bistro-chic',
  'Cocina Contemporánea & Experiencias Gastronómicas',
  'Sabores innovadores, ingredientes frescos y coctelería de autor en un ambiente excepcional.',
  '#2E3B32',
  true
)
on conflict (slug) do update set
  nombre = excluded.nombre,
  whatsapp_numero = excluded.whatsapp_numero,
  plantilla = excluded.plantilla,
  tagline = excluded.tagline,
  descripcion = excluded.descripcion,
  color_acento = excluded.color_acento,
  activo = excluded.activo;

-- 2. Insertar Categorías estructuradas
insert into categorias (negocio_id, nombre, subtitulo, orden)
select id, 'Entradas & Tapas', 'Para abrir el apetito y compartir en la mesa', 1
from negocios where slug = 'nexo-restaurant'
on conflict (negocio_id, nombre) do update set subtitulo = excluded.subtitulo, orden = excluded.orden;

insert into categorias (negocio_id, nombre, subtitulo, orden)
select id, 'Platos Fuertes & Cortes', 'Nuestras mejores selecciones de autor y parrilla', 2
from negocios where slug = 'nexo-restaurant'
on conflict (negocio_id, nombre) do update set subtitulo = excluded.subtitulo, orden = excluded.orden;

insert into categorias (negocio_id, nombre, subtitulo, orden)
select id, 'Postres & Tentaciones', 'El broche dulce para cerrar tu experiencia', 3
from negocios where slug = 'nexo-restaurant'
on conflict (negocio_id, nombre) do update set subtitulo = excluded.subtitulo, orden = excluded.orden;

insert into categorias (negocio_id, nombre, subtitulo, orden)
select id, 'Bebidas & Coctelería de Autor', 'Mixología artesanal, vinos y bebidas refrescantes', 4
from negocios where slug = 'nexo-restaurant'
on conflict (negocio_id, nombre) do update set subtitulo = excluded.subtitulo, orden = excluded.orden;

-- 3. Insertar Productos de Base

-- --- CATEGORÍA 1: Entradas & Tapas ---
insert into productos (negocio_id, categoria, grupo, nombre, descripcion, precio, nota, destacado, orden)
select id, 'Entradas & Tapas', 'Para Compartir', 'Croquetas de Jamón Ibérico', 'Cremosas croquetas tradicionales con jamón ibérico de bellota y suave alioli de ajo asado.', 420, '4 unidades · Especialidad de la casa', true, 1
from negocios where slug = 'nexo-restaurant';

insert into productos (negocio_id, categoria, grupo, nombre, descripcion, precio, nota, destacado, orden)
select id, 'Entradas & Tapas', 'Frescos & Crudos', 'Tartar de Atún Rojo & Aguacate', 'Atún rojo fresco marinado en sésamo, jengibre y soya cítrica, sobre cama de aguacate hass y chips de plátano.', 680, 'Pescado fresco del día', true, 2
from negocios where slug = 'nexo-restaurant';

insert into productos (negocio_id, categoria, grupo, nombre, descripcion, precio, nota, destacado, orden)
select id, 'Entradas & Tapas', 'Frescos & Crudos', 'Carpaccio de Res Trufado', 'Finas láminas de lomo de res, lascas de queso parmesano reggiano, rúcula fresca y emulsión de trufa negra.', 590, null, false, 3
from negocios where slug = 'nexo-restaurant';

-- --- CATEGORÍA 2: Platos Fuertes & Cortes ---
insert into productos (negocio_id, categoria, grupo, nombre, descripcion, precio, nota, destacado, orden)
select id, 'Platos Fuertes & Cortes', 'Carnes & Brasa', 'Ribeye Angus a la Brasa (12 oz)', 'Corte jugoso a la parrilla, mantequilla de romero y ajo, acompañado de papas rústicas trufadas.', 1450, 'Corte importado certificado', true, 1
from negocios where slug = 'nexo-restaurant';

insert into productos (negocio_id, categoria, grupo, nombre, descripcion, precio, nota, destacado, orden)
select id, 'Platos Fuertes & Cortes', 'Pescados & Mariscos', 'Salmón Glaseado al Miso & Maracuyá', 'Filete de salmón noruego sellado al punto, glaseado oriental con toques cítricos, puré cremoso de coliflor.', 1150, null, true, 2
from negocios where slug = 'nexo-restaurant';

insert into productos (negocio_id, categoria, grupo, nombre, descripcion, precio, nota, destacado, orden)
select id, 'Platos Fuertes & Cortes', 'Pastas & Arroces', 'Risotto de Hongos Silvestres & Trufa', 'Arroz arborio en caldo de setas infusionado, mix de hongos silvestres, parmesano curado y esencia de trufa.', 890, 'Opción vegetariana', false, 3
from negocios where slug = 'nexo-restaurant';

insert into productos (negocio_id, categoria, grupo, nombre, descripcion, precio, nota, destacado, orden)
select id, 'Platos Fuertes & Cortes', 'Aves', 'Suprema de Pollo en Salsa de Finas Hierbas', 'Pechuga tierna rellena de queso de cabra y espinacas, bañada en salsa aterciopelada de hierbas provenzales.', 720, null, false, 4
from negocios where slug = 'nexo-restaurant';

-- --- CATEGORÍA 3: Postres & Tentaciones ---
insert into productos (negocio_id, categoria, grupo, nombre, descripcion, precio, nota, destacado, orden)
select id, 'Postres & Tentaciones', 'Repostería', 'Volcán de Chocolate Belga', 'Pastel tibio de chocolate 70% con corazón fundido, servido con helado artesanal de vainilla Bourbon.', 380, 'Horneado al momento (10 min)', true, 1
from negocios where slug = 'nexo-restaurant';

insert into productos (negocio_id, categoria, grupo, nombre, descripcion, precio, nota, destacado, orden)
select id, 'Postres & Tentaciones', 'Repostería', 'Cheesecake de Frutos Rojos', 'Clásica tarta de queso horneada estilo Nueva York con compota artesanal de frutos del bosque.', 350, null, false, 2
from negocios where slug = 'nexo-restaurant';

-- --- CATEGORÍA 4: Bebidas & Coctelería de Autor ---
insert into productos (negocio_id, categoria, grupo, nombre, descripcion, precio, nota, destacado, orden)
select id, 'Bebidas & Coctelería de Autor', 'Cocteles Signature', 'Nexo Passion Martini', 'Vodka premium, licor de flor de saúco, reducción de maracuyá y toque de espumante brut.', 450, 'Coctel insignia', true, 1
from negocios where slug = 'nexo-restaurant';

insert into productos (negocio_id, categoria, grupo, nombre, descripcion, precio, nota, destacado, orden)
select id, 'Bebidas & Coctelería de Autor', 'Cocteles Signature', 'Gin Tonic Botánico de Frutos Silvestres', 'Ginebra infusionada con frutos rojos, tónica premium, bayas de enebro y romero fresco.', 480, null, false, 2
from negocios where slug = 'nexo-restaurant';

insert into productos (negocio_id, categoria, grupo, nombre, descripcion, precio, nota, destacado, orden)
select id, 'Bebidas & Coctelería de Autor', 'Sin Alcohol', 'Limonada de Coco & Hierbabuena', 'Bebida frappeada refrescante con crema de coco natural, limón verde y hierbabuena fresca.', 220, '100% natural', false, 3
from negocios where slug = 'nexo-restaurant';

-- 4. Vincular acceso de Administrador al correo del cliente
-- Si el usuario ya existe en auth.users, se vinculará de inmediato.
-- Si aún no existe, regístralo en Authentication > Users y vuelve a ejecutar este bloque.
insert into negocio_admins (negocio_id, user_id)
select n.id, u.id
from negocios n
cross join auth.users u
where n.slug = 'nexo-restaurant'
  and lower(u.email) = lower('darlinmendez91@gmail.com')
on conflict (negocio_id, user_id) do nothing;
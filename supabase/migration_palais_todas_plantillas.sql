-- ============================================================
-- Migración: Cargar Productos y Categorías en Todas las Plantillas Demo
-- (SIN modificar la información ni la identidad del negocio)
--
-- Aplica a los negocios existentes:
--   1. 'restaurante-demo' (Ticket Clásico)
--   2. 'fuego-brasa'      (Fuego & Brasa / Medina Grill)
--   3. 'bistro-demo'      (L'Étoile / Bistro Chic)
--
-- Ejecutar en: Supabase Dashboard > SQL Editor > New query
-- ============================================================

-- ------------------------------------------------------------
-- 1. Insertar / Actualizar Categorías para cada Negocio Demo
-- ------------------------------------------------------------
do $$
declare
  negocio_record record;
begin
  for negocio_record in select id, slug from negocios where slug in ('restaurante-demo', 'fuego-brasa', 'bistro-demo') loop

    insert into categorias (negocio_id, nombre, subtitulo, orden)
    values
      (negocio_record.id, 'Entradas', 'Para comenzar y compartir', 1),
      (negocio_record.id, 'Pastas', 'Salsas: Carbonara, Pomodoro, Boloñesa, Bechamel o Al Pesto', 2),
      (negocio_record.id, 'Pescados y Mariscos', 'Frescura del mar en preparaciones criollas, al ajillo y al coco', 3),
      (negocio_record.id, 'Parrilladas & Especialidades', 'Especialidades a las brasas y cortes para compartir', 4)
    on conflict (negocio_id, nombre) do update set
      subtitulo = excluded.subtitulo,
      orden = excluded.orden;

  end loop;
end $$;


-- ------------------------------------------------------------
-- 2. Limpiar e Insertar Productos en cada Negocio Demo
-- ------------------------------------------------------------
do $$
declare
  negocio_record record;
begin
  for negocio_record in select id, slug from negocios where slug in ('restaurante-demo', 'fuego-brasa', 'bistro-demo') loop

    -- Limpiar productos antiguos de los demos para poblar con los nuevos platos
    delete from productos where negocio_id = negocio_record.id;

    -- --- ENTRADAS ---
    insert into productos (negocio_id, categoria, grupo, nombre, descripcion, nota, precio, precio_texto, destacado, orden)
    values
      (negocio_record.id, 'Entradas', 'Entradas Clásicas', 'Canastitas de Plátano Rellena', 'Crujientes canasticas de plátano verde rellenas a elección de carne o mariscos.', 'Carne / Mariscos', 300, 'RD$ 300 / 500', true, 1),
      (negocio_record.id, 'Entradas', 'Entradas Clásicas', 'Canapé Carne / Camarones / Mixto', 'Bocadillos crujientes montados con carne, camarones o combinación mixta.', 'Carne, Camarones o Mixto', 350, 'RD$ 350', false, 2),
      (negocio_record.id, 'Entradas', 'Para Picar', 'Chicken Nuggets', 'Trocitos crocantes de pechuga de pollo empanizados y dorados a la perfección.', 'Con salsa de la casa', 250, 'RD$ 250', false, 3),
      (negocio_record.id, 'Entradas', 'Para Picar', 'Croquetas de Pollo', 'Croquetas caseras suaves por dentro y con rebozado crujiente.', 'Cremosas y doradas', 225, 'RD$ 225', false, 4),
      (negocio_record.id, 'Entradas', 'Para Picar', 'Deditos de Mozarella', 'Bastoncitos de queso mozarella empanizados y fundentes al morder.', 'Con dip especial', 225, 'RD$ 225', false, 5);

    -- --- PASTAS ---
    insert into productos (negocio_id, categoria, grupo, nombre, descripcion, nota, precio, precio_texto, destacado, orden)
    values
      (negocio_record.id, 'Pastas', 'Pastas Largas & Cortas', 'Fettuccini con Camarones / Pollo', 'Pasta fettuccini en salsa a tu elección: Carbonara, Pomodoro o Boloñesa.', 'A la Carbonara, Pomodoro o Boloñesa', 550, 'RD$ 550 / 800', true, 1),
      (negocio_record.id, 'Pastas', 'Pastas Largas & Cortas', 'Penne con Camarones / Pollo', 'Pasta penne salteada en salsa Bechamel, Pomodoro o Al Pesto casero.', 'Bechamel, Pomodoro o Al Pesto', 550, 'RD$ 550 / 800', false, 2),
      (negocio_record.id, 'Pastas', 'Pastas Largas & Cortas', 'Espaguetis con Camarones / Pollo', 'Espaguetis tradicionales al dente en salsa Bechamel, Pomodoro o Boloñesa.', 'Bechamel, Pomodoro o Boloñesa', 550, 'RD$ 550 / 800', false, 3);

    -- --- PESCADOS Y MARISCOS ---
    insert into productos (negocio_id, categoria, grupo, nombre, descripcion, nota, precio, precio_texto, destacado, orden)
    values
      (negocio_record.id, 'Pescados y Mariscos', 'Especialidades del Mar', 'Langosta (1.5 LB)', 'Cola de langosta fresca de 1.5 libras preparada Al Termidor o Al Ajillo.', 'Al Termidor o Al Ajillo · 1.5 LB', 1500, 'RD$ 1,500 (1.5LB)', true, 1),
      (negocio_record.id, 'Pescados y Mariscos', 'Pescados Enteros & Filetes', 'Pescado Colorao Frito / Al Vapor', 'Pescado colorado entero fresco, preparado frito o al vapor en salsa Criolla, Al Ajillo o Al Coco.', 'A la Criolla, Al Ajillo o Al Coco', 1200, 'RD$ 1,200', true, 2),
      (negocio_record.id, 'Pescados y Mariscos', 'Especialidades del Mar', 'Salpicón de Mariscos', 'Variedad de mariscos frescos aderezados a la Vinagreta, A la Criolla o Al Coco.', 'A la Vinagreta, A la Criolla o Al Coco', 1200, 'RD$ 1,200', false, 3),
      (negocio_record.id, 'Pescados y Mariscos', 'Especialidades del Mar', 'Pulpo a La Brasa', 'Tentáculos de pulpo tierno asados a la brasa con aceite de oliva virgen y pimentón.', 'Tierno y braseado', 900, 'RD$ 900', true, 4),
      (negocio_record.id, 'Pescados y Mariscos', 'Especialidades del Mar', 'Lambi', 'Carrucho tierno en salsa a elección: A la Vinagreta, Al Ajillo, A la Criolla o Al Coco.', 'A la Vinagreta, Al Ajillo, A la Criolla o Al Coco', 900, 'RD$ 900', false, 5),
      (negocio_record.id, 'Pescados y Mariscos', 'Pescados Enteros & Filetes', 'Salmón', 'Filete de salmón fresco a la plancha servido a la Vinagreta, Al Ajillo o A la Criolla.', 'A la Vinagreta, Al Ajillo o A la Criolla', 900, 'RD$ 900', false, 6),
      (negocio_record.id, 'Pescados y Mariscos', 'Especialidades del Mar', 'Camarones', 'Camarones seleccionados preparados Al Ajillo, A la Criolla o A la Crema.', 'Al Ajillo, A la Criolla o A la Crema', 800, 'RD$ 800', false, 7),
      (negocio_record.id, 'Pescados y Mariscos', 'Pescados Enteros & Filetes', 'Filete de Mero Al Vapor / Frito / A la Plancha', 'Delicado filete de mero preparado a tu gusto: Al Vapor, Frito o A la Plancha en salsa Al Ajillo, Criolla o Crema.', 'Al Ajillo, A la Criolla o A la Crema', 750, 'RD$ 750', false, 8);

    -- --- PARRILLADAS & ESPECIALIDADES ---
    insert into productos (negocio_id, categoria, grupo, nombre, descripcion, nota, precio, precio_texto, destacado, orden)
    values
      (negocio_record.id, 'Parrilladas & Especialidades', 'Grandes Parrilladas (Para 2)', 'Parrillada de Marisco 2P', 'Abundante selección marina: Pulpo, Camarón, Lambi, Langostino, Pescado y Calamar a las brasas.', 'Pulpo, Camarón, Lambi, Langostino, Pescado, Calamar (Para 2)', 3300, 'RD$ 3,300', true, 1),
      (negocio_record.id, 'Parrilladas & Especialidades', 'Grandes Parrilladas (Para 2)', 'Mar y Tierra 2P', 'La combinación suprema: Pulpo, Camarón, Langostino, Pollo, Res, Cerdo y Salchicha.', 'Pulpo, Camarón, Langostino, Pollo, Res, Cerdo, Salchicha (Para 2)', 2800, 'RD$ 2,800', true, 2),
      (negocio_record.id, 'Parrilladas & Especialidades', 'Grandes Parrilladas (Para 2)', 'Parrillada de Carnes 2P', 'Festival de carnes a las brasas: Pollo, Res, Cerdo, Salchicha y Alitas doradas.', 'Pollo, Res, Cerdo, Salchicha, Alitas (Para 2)', 2200, 'RD$ 2,200', true, 3),
      (negocio_record.id, 'Parrilladas & Especialidades', 'Cortes & Costillas', 'Costillitas Babe Back', 'Costillas de cerdo tiernas y caramelizadas bañadas en exquisita salsa BBQ de la casa.', 'Salsa BBQ casera', 950, 'RD$ 950', true, 4),
      (negocio_record.id, 'Parrilladas & Especialidades', 'Aves & Especialidades', 'Pechuga Margarita', 'Jugosa pechuga de pollo a la plancha coronada con camarones y suave salsa bechamel.', 'Pechuga, Camarones y Bechamel', 750, 'RD$ 750', false, 5),
      (negocio_record.id, 'Parrilladas & Especialidades', 'Brochetas & Pinchos', 'Brochetas de Mariscos', 'Pinchos asados con camarón, lambi tierno y pulpo braseado intercalados.', 'Camarón, Lambi y Pulpo', 750, 'RD$ 750', false, 6),
      (negocio_record.id, 'Parrilladas & Especialidades', 'Brochetas & Pinchos', 'Brochetas de Camarones', 'Brochetas de camarones sazonados a la parrilla con mantequilla de ajo.', 'Camarones al grill', 650, 'RD$ 650', false, 7),
      (negocio_record.id, 'Parrilladas & Especialidades', 'Aves & Especialidades', 'Pollo Teriyaki', 'Filetes de pollo a la brasa glaseados con salsa teriyaki dulce y ajonjolí.', 'Glaseado agridulce', 575, 'RD$ 575', false, 8),
      (negocio_record.id, 'Parrilladas & Especialidades', 'Aves & Especialidades', 'Cerdo Teriyaki', 'Tiernas tiras de lomo de cerdo glaseadas en salsa teriyaki de la casa.', 'Glaseado agridulce', 575, 'RD$ 575', false, 9),
      (negocio_record.id, 'Parrilladas & Especialidades', 'Brochetas & Pinchos', 'Brochetas (Pollo / Cerdo / Mixta)', 'Pinchos tradicionales a la brasa con pimientos y cebolla, a elegir de pollo, cerdo o mixta.', 'Pollo, Cerdo o Mixta', 500, 'RD$ 500', true, 10),
      (negocio_record.id, 'Parrilladas & Especialidades', 'Aves & Especialidades', 'Pechuga a la Plancha Original', 'Pechuga de pollo sazonada y dorada a la plancha, acompañada de salsa BBQ, guasacaca y pico de gallo.', 'Salsa BBQ, Guasacaca y Pico de Gallo', 475, 'RD$ 475', false, 11),
      (negocio_record.id, 'Parrilladas & Especialidades', 'Alitas & Picaderas', 'Alitas BBQ', 'Alitas de pollo crujientes y doradas, generosamente bañadas en salsa BBQ ahumada.', 'Salsa BBQ ahumada', 350, 'RD$ 350', false, 12),
      (negocio_record.id, 'Parrilladas & Especialidades', 'Alitas & Picaderas', 'Alitas Picantes', 'Alitas de pollo con rebozado crujiente y salsa picante especial de la casa.', 'Salsa picante de la casa', 350, 'RD$ 350', false, 13);

  end loop;
end $$;

-- Verificación de productos cargados por cada negocio
select n.slug, n.nombre, count(p.id) as total_productos
from negocios n
left join productos p on p.negocio_id = n.id
where n.slug in ('restaurante-demo', 'fuego-brasa', 'bistro-demo')
group by n.slug, n.nombre;

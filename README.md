# NexoLink Menus

App multi-tenant de menús/catálogos digitales. Un solo código sirve a todos
los clientes: cada uno vive en `tudominio.com/su-slug`, y cada dueño edita
su propio contenido en `tudominio.com/su-slug/admin` sin pasar por ti.

## 1. Requisitos

- Node.js 18 o superior
- Una cuenta gratuita en [supabase.com](https://supabase.com)

## 2. Crear el proyecto en Supabase

1. Crea un proyecto nuevo en Supabase.
2. Ve a **SQL Editor** y ejecuta, EN ESTE ORDEN:
   1. Todo el contenido de `supabase/schema.sql` — crea `negocios`, `productos`,
      `negocio_admins`, RLS, y el negocio de ejemplo `restaurante-demo`
      (plantilla `ticket-clasico`).
   2. Todo el contenido de `supabase/migration_plantillas.sql` — agrega soporte
      para plantillas con estructura de 3 niveles (Categoría > Grupo > Ítem),
      precios en texto libre, y el negocio de ejemplo `medina-demo` (plantilla
      `medina-grill`). Es aditiva: no rompe nada de lo anterior.
3. Ve a **Authentication > Providers** y confirma que **Email** esté activo
   (viene activo por defecto). El login del panel usa "magic link" (sin
   contraseña), así que no necesitas configurar nada más para probarlo.
4. Ve a **Project Settings > API** y copia:
   - `Project URL`
   - `anon public key`

## 3. Plantillas disponibles

Cada negocio tiene una columna `plantilla` en la tabla `negocios` que decide
qué diseño usa `app/[slug]/page.js`:

- **`ticket-clasico`** (por defecto): la plantilla clara estilo recibo
  impreso que armamos primero. Usa `productos.categoria` como único nivel
  de agrupación.
- **`medina-grill`**: la plantilla oscura estilo steakhouse, portada del
  diseño real de Medina's. Usa `categorias` + `productos.grupo` para su
  estructura de 3 niveles, y soporta `precio_texto`, `nota` y `destacado`
  por producto.
- **`bistro-chic`**: la plantilla luminosa y sofisticada estilo cafetería,
  brunch y bistró. Cuenta con paleta cálida (marfil, oliva, terracota), tarjetas
  flotantes de platos, buscador interactivo y una **bandeja de pedidos flotante**
  que permite al cliente armar su comanda y enviarla directo por WhatsApp.

Para agregar una plantilla nueva: crea una carpeta en
`components/templates/tu-plantilla/`, un componente de entrada como
`components/templates/medina-grill/index.jsx`, y un `if` más en
`app/[slug]/page.js` que la seleccione cuando `negocio.plantilla === 'tu-plantilla'`.
Sus estilos deben ir encerrados en una clase contenedora propia (como
`.tema-medina` en `app/globals.css`) para no filtrarse a las demás plantillas.

## 4. Configurar el proyecto localmente

```bash
npm install
cp .env.example .env.local
```

Pega tu URL y anon key en `.env.local`.

```bash
npm run dev
```

Abre:
- `http://localhost:3000/restaurante-demo` → el menú público de ejemplo
- `http://localhost:3000/restaurante-demo/admin` → el panel de autoservicio

## 5. Vincular un dueño de negocio real al panel

El panel soporta inicio de sesión con **Credenciales (Correo y Contraseña)** o mediante **Magic Link (Sin contraseña)**. La opción de credenciales es ideal para delegar el acceso a empleados, cajeros o administradores de turno en el local sin necesidad de darles acceso al correo personal del dueño.

Flujo para dar de alta un cliente o empleado nuevo:

1. Crea su fila en `negocios` (o usa el SQL de ejemplo como plantilla):

```sql
insert into negocios (slug, nombre, whatsapp_numero, color_acento)
values ('mi-restaurante', 'Mi Restaurante', '18091234567', '#2F4F3E');
```

2. En Supabase dashboard, ve a **Authentication > Users > Add user > Create user**:
   - Ingresa el correo y asigna una contraseña para el dueño o empleado.
   - O bien, pídele que ingrese con Magic Link por primera vez y configure su contraseña.

3. Ve a **Authentication > Users** en Supabase, copia su `user_id`, y vincúlalo a su negocio:

```sql
insert into negocio_admins (negocio_id, user_id)
values (
  (select id from negocios where slug = 'mi-restaurante'),
  'EL-USER-ID-QUE-COPIASTE'
);
```

Desde ese momento, ese usuario/empleado puede iniciar sesión directamente en `/mi-restaurante/admin` usando su correo y contraseña. Row Level Security en Supabase garantiza que solo edite los productos de ese negocio.

## 6. Crear un "Super Admin" (Acceso Total a todos los negocios)

Si deseas tener una cuenta de Super Administrador con acceso para editar **cualquier negocio** del sistema sin tener que vincularlo uno por uno:

1. Ejecuta la migración [`supabase/migration_super_admin.sql`](file:///c:/Users/Personal/Menus/nexolink-menus/supabase/migration_super_admin.sql) en el **SQL Editor** de Supabase.
2. Copia el `User ID` de tu usuario en **Authentication > Users**.
3. Inserta tu `user_id` en la tabla `super_admins`:

```sql
insert into super_admins (user_id)
values ('TU-USER-ID-DE-SUPABASE');
```

Cualquier usuario en la tabla `super_admins` tendrá un distintivo `👑 Super Admin` y acceso completo a todos los negocios en `/[slug]/admin`.

## 7. Agregar productos por SQL (opcional, para el setup inicial)

Cuando cierras un cliente nuevo, cargar su inventario inicial es más rápido
por SQL que uno por uno en el panel:

```sql
insert into productos (negocio_id, nombre, descripcion, precio, categoria, orden)
values
  ((select id from negocios where slug = 'mi-restaurante'), 'Plato 1', 'Descripción', 350, 'Almuerzo', 1),
  ((select id from negocios where slug = 'mi-restaurante'), 'Plato 2', 'Descripción', 400, 'Almuerzo', 2);
```

Después de esa carga inicial, el dueño mantiene todo desde `/admin`.

## 7. Desplegar a producción (Netlify)

1. Sube este proyecto a un repo de GitHub (tu plantilla base para clonar
   en cada cliente nuevo).
2. Conecta el repo en Netlify.
3. En **Site settings > Environment variables**, agrega
   `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Build command: `npm run build` — Netlify detecta Next.js automáticamente
   con el plugin oficial.
5. Cada negocio nuevo NO requiere un deploy nuevo: solo agregas su fila en
   `negocios` y ya está viviendo en `tudominio.com/su-slug`.

## 8. Qué falta para producción real (siguientes pasos sugeridos)

- **Subida de fotos**: hoy el campo "Foto" es una URL manual. El siguiente
  paso natural es Supabase Storage con un input de tipo `file` en el panel,
  para que el dueño suba la foto desde su celular directamente.
- **Dominio personalizado por cliente**: si algún cliente corporativo pide
  su propio dominio, se configura un CNAME hacia esta misma app — no
  requiere un proyecto separado.
- **Colisión de slugs**: agrega una validación (o trigger en Postgres) que
  agregue un sufijo automático si el slug ya existe al crear un negocio.

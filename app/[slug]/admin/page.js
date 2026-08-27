"use client";

import { useEffect, useState, useCallback, useRef, use } from "react";
import { supabase } from "@/lib/supabaseClient";
import { QRCodeCanvas } from "qrcode.react";

export default function AdminPage({ params }) {
  const { slug } = use(params);

  const [session, setSession] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [modoAuth, setModoAuth] = useState("password"); // "password" o "magiclink"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submittingAuth, setSubmittingAuth] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [authError, setAuthError] = useState("");

  const [negocio, setNegocio] = useState(null);
  const [autorizado, setAutorizado] = useState(null); // null = checking, false = no access
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [productos, setProductos] = useState([]);
  const [opcionesCategorias, setOpcionesCategorias] = useState([]);
  const [mostrarModalQR, setMostrarModalQR] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [savingId, setSavingId] = useState(null);
  const [statusMsg, setStatusMsg] = useState("");
  const [agregando, setAgregando] = useState(false);

  // --- Info del negocio (editable) ---
  const [infoNegocio, setInfoNegocio] = useState({});
  const [savingInfo, setSavingInfo] = useState(false);
  const [infoMsg, setInfoMsg] = useState("");
  const [mostrarInfoNegocio, setMostrarInfoNegocio] = useState(false);

  // --- Auth session ---
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoadingAuth(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const iniciarSesionPassword = async (e) => {
    e.preventDefault();
    setAuthError("");
    setSubmittingAuth(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    setSubmittingAuth(false);
    if (error) {
      if (error.message.toLowerCase().includes("invalid login credentials")) {
        setAuthError("Credenciales incorrectas. Revisa el correo y la contraseña.");
      } else {
         setAuthError(error.message);
      }
    }
  };

  const enviarMagicLink = async (e) => {
    e.preventDefault();
    setAuthError("");
    setSubmittingAuth(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: typeof window !== "undefined" ? window.location.href : undefined }
    });
    setSubmittingAuth(false);
    if (error) {
      setAuthError(error.message);
    } else {
      setMagicLinkSent(true);
    }
  };


  const cerrarSesion = async () => {
    await supabase.auth.signOut();
    setNegocio(null);
    setAutorizado(null);
    setIsSuperAdmin(false);
    setProductos([]);
  };

  // --- Cargar negocio + verificar acceso + cargar productos ---
  const cargarTodo = useCallback(async () => {
    if (!session) return;
    setLoadingData(true);

    const { data: neg } = await supabase
      .from("negocios")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (!neg) {
      setAutorizado(false);
      setLoadingData(false);
      return;
    }
    setNegocio(neg);
    setInfoNegocio({
      nombre: neg.nombre || "",
      tagline: neg.tagline || "",
      descripcion: neg.descripcion || "",
      whatsapp_numero: neg.whatsapp_numero || "",
      color_acento: neg.color_acento || "#6B2737",
      logo_url: neg.logo_url || "",
      imagen_hero_url: neg.imagen_hero_url || "",
      plantilla: neg.plantilla || "ticket-clasico",
    });

    const [{ data: vinculo }, { data: superAdminRow }] = await Promise.all([
      supabase
        .from("negocio_admins")
        .select("id")
        .eq("negocio_id", neg.id)
        .eq("user_id", session.user.id)
        .maybeSingle(),
      supabase
        .from("super_admins")
        .select("id")
        .eq("user_id", session.user.id)
        .maybeSingle()
    ]);

    const esSuper = !!superAdminRow;
    setIsSuperAdmin(esSuper);

    if (!vinculo && !esSuper) {
      setAutorizado(false);
      setLoadingData(false);
      return;
    }
    setAutorizado(true);


    const [{ data: prods }, { data: cats }] = await Promise.all([
      supabase
        .from("productos")
        .select("*")
        .eq("negocio_id", neg.id)
        .order("categoria", { ascending: true })
        .order("orden", { ascending: true }),
      supabase
        .from("categorias")
        .select("nombre")
        .eq("negocio_id", neg.id)
        .order("orden", { ascending: true })
    ]);

    const productosCargados = prods || [];
    setProductos(productosCargados);

    const catsTabla = (cats || []).map((c) => c.nombre).filter(Boolean);
    const catsProds = productosCargados.map((p) => p.categoria).filter(Boolean);
    const defaults = ["Desayunos", "Almuerzo", "Cenas", "Bebidas", "Postres", "Entradas", "Parrilla", "Bar"];
    const unicas = Array.from(new Set([...catsTabla, ...catsProds, ...defaults]));
    setOpcionesCategorias(unicas);

    setLoadingData(false);
  }, [session, slug]);

  useEffect(() => {
    cargarTodo();
  }, [cargarTodo]);

  // --- Guardar información del negocio ---
  const guardarInfoNegocio = async () => {
    setSavingInfo(true);
    setInfoMsg("");
    try {
      const { data, error } = await supabase
        .from("negocios")
        .update({
          nombre: infoNegocio.nombre,
          tagline: infoNegocio.tagline || null,
          descripcion: infoNegocio.descripcion || null,
          whatsapp_numero: infoNegocio.whatsapp_numero || null,
          color_acento: infoNegocio.color_acento || null,
          logo_url: infoNegocio.logo_url || null,
          imagen_hero_url: infoNegocio.imagen_hero_url || null,
          plantilla: infoNegocio.plantilla || "ticket-clasico",
        })
        .eq("id", negocio.id)
        .select();

      if (error) {
        setInfoMsg(`Error: ${error.message}`);
      } else if (!data || data.length === 0) {
        setInfoMsg("Error: No se pudo actualizar (revisa las políticas RLS en Supabase).");
      } else {
        const actualizado = data[0];
        setNegocio(actualizado);
        setInfoNegocio({
          nombre: actualizado.nombre || "",
          tagline: actualizado.tagline || "",
          descripcion: actualizado.descripcion || "",
          whatsapp_numero: actualizado.whatsapp_numero || "",
          color_acento: actualizado.color_acento || "#6B2737",
          logo_url: actualizado.logo_url || "",
          imagen_hero_url: actualizado.imagen_hero_url || "",
          plantilla: actualizado.plantilla || "ticket-clasico",
        });
        setInfoMsg("✓ Información actualizada con éxito.");
      }
    } catch (err) {
      setInfoMsg(`Error: ${err.message}`);
    } finally {
      setSavingInfo(false);
      setTimeout(() => setInfoMsg(""), 4000);
    }
  };

  // --- Edición local ---
  const actualizarCampo = (id, campo, valor) => {
    setProductos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [campo]: valor } : p))
    );
    if (campo === "categoria" && valor && !opcionesCategorias.includes(valor)) {
      setOpcionesCategorias((prev) => Array.from(new Set([...prev, valor])));
    }
  };

  const guardarProducto = async (producto) => {
    setSavingId(producto.id);
    setStatusMsg("");
    const { error } = await supabase
      .from("productos")
      .update({
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
        precio_texto: producto.precio_texto || null,
        categoria: producto.categoria,
        grupo: producto.grupo || null,
        nota: producto.nota || null,
        destacado: !!producto.destacado,
        disponible: producto.disponible,
        foto_url: producto.foto_url
      })
      .eq("id", producto.id);

    setSavingId(null);
    setStatusMsg(error ? `Error al guardar: ${error.message}` : "Guardado.");
    setTimeout(() => setStatusMsg(""), 2500);
  };

  const toggleDisponible = async (producto) => {
    const nuevoValor = !producto.disponible;
    actualizarCampo(producto.id, "disponible", nuevoValor);
    await supabase
      .from("productos")
      .update({ disponible: nuevoValor })
      .eq("id", producto.id);
  };

  const eliminarProducto = async (id) => {
    if (!confirm("¿Eliminar este producto del menú?")) return;
    await supabase.from("productos").delete().eq("id", id);
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

  const moverProducto = async (index, direccion) => {
    const targetIndex = direccion === "subir" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= productos.length) return;
    await reordenarItems(index, targetIndex);
  };

  const reordenarItems = async (desdeIndex, hastaIndex) => {
    if (desdeIndex === hastaIndex || desdeIndex < 0 || hastaIndex >= productos.length) return;

    const copia = [...productos];
    const [itemMovido] = copia.splice(desdeIndex, 1);
    copia.splice(hastaIndex, 0, itemMovido);

    const nuevosProductos = copia.map((prod, i) => ({
      ...prod,
      orden: i + 1
    }));

    setProductos(nuevosProductos);

    await Promise.all(
      nuevosProductos.map((p) =>
        supabase.from("productos").update({ orden: p.orden }).eq("id", p.id)
      )
    );
  };

  const agregarProducto = async () => {
    if (!negocio) return;
    setAgregando(true);
    const { data, error } = await supabase
      .from("productos")
      .insert({
        negocio_id: negocio.id,
        nombre: "Nuevo producto",
        precio: 0,
        categoria: "General",
        disponible: true
      })
      .select()
      .single();
    setAgregando(false);

    if (!error && data) {
      setProductos((prev) => [...prev, data]);
      setStatusMsg("✓ Producto agregado. Edita sus campos y guarda.");
      // Scroll suave al final de la lista para ver el nuevo ítem
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }, 100);
    } else {
      setStatusMsg(`Error al agregar producto: ${error?.message || "intenta de nuevo"}`);
    }
    setTimeout(() => setStatusMsg(""), 4000);
  };

  // --- Render ---

  if (loadingAuth) {
    return <CentroCargando texto="Verificando sesión…" />;
  }

  if (!session) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm bg-white/80 backdrop-blur-md border border-line rounded-2xl p-6 shadow-lg">
          <h1 className="font-display text-2xl text-ink mb-1 text-center">Panel del negocio</h1>
          <p className="text-ink2 text-xs mb-5 text-center">
            Inicia sesión para gestionar los productos y precios de <strong>/{slug}</strong>.
          </p>

          {/* Pestañas de selección de método */}
          <div className="flex bg-[#EFEAE0] p-1 rounded-xl border border-line/60 mb-5 text-xs font-mono">
            <button
              type="button"
              onClick={() => {
                setModoAuth("password");
                setAuthError("");
              }}
              className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                modoAuth === "password"
                  ? "bg-ink text-paper shadow-xs"
                  : "text-ink2 hover:text-ink"
              }`}
            >
              🔑 Credenciales
            </button>
            <button
              type="button"
              onClick={() => {
                setModoAuth("magiclink");
                setAuthError("");
              }}
              className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                modoAuth === "magiclink"
                  ? "bg-ink text-paper shadow-xs"
                  : "text-ink2 hover:text-ink"
              }`}
            >
              ✉️ Enlace Mágico
            </button>
          </div>

          {modoAuth === "password" ? (
            <form onSubmit={iniciarSesionPassword} className="space-y-3">
              <div>
                <label className="block text-xs font-mono text-ink2 mb-1">
                  Correo del Administrador o Empleado
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@negocio.com"
                  className="w-full border border-line rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-ink"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-ink2 mb-1">
                  Contraseña
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-line rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-ink"
                />
              </div>

              <button
                type="submit"
                disabled={submittingAuth}
                className="w-full bg-ink text-paper rounded-lg px-3 py-2.5 font-mono text-sm font-semibold hover:opacity-95 transition-opacity disabled:opacity-50 mt-2"
              >
                {submittingAuth ? "Verificando…" : "Ingresar con Credenciales"}
              </button>

              <div className="bg-[#EFEAE0]/80 p-3 rounded-lg border border-line/60 text-[11px] text-ink2 leading-relaxed mt-4">
                💡 <strong>Ideal para empleados:</strong> Puedes asignar credenciales de correo/contraseña a tus encargados de turno para que accedan directamente desde el local sin revisar tu correo.
              </div>
            </form>
          ) : (
            <form onSubmit={enviarMagicLink} className="space-y-3">
              {magicLinkSent ? (
                <div className="text-xs bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-lg p-3 leading-relaxed">
                  Te enviamos un enlace de acceso directo a <strong>{email}</strong>. Ábrelo desde este mismo navegador para entrar al panel.
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-mono text-ink2 mb-1">
                      Correo registrado
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tucorreo@negocio.com"
                      className="w-full border border-line rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-ink"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submittingAuth}
                    className="w-full bg-ink text-paper rounded-lg px-3 py-2.5 font-mono text-sm font-semibold hover:opacity-95 transition-opacity disabled:opacity-50 mt-2"
                  >
                    {submittingAuth ? "Enviando…" : "Enviar enlace de acceso"}
                  </button>
                </>
              )}
            </form>
          )}

          {authError && (
            <p className="text-xs text-burgundy font-mono bg-burgundy/5 border border-burgundy/20 rounded-lg p-2.5 mt-3 text-center">
              {authError}
            </p>
          )}
        </div>
      </main>
    );
  }

  if (loadingData || autorizado === null) {
    return <CentroCargando texto="Cargando tu menú…" />;
  }

  if (autorizado === false) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 text-center">
        <div>
          <p className="text-ink mb-4">
            Tu cuenta ({session.user.email}) no tiene acceso al panel de{" "}
            <strong>{slug}</strong>.
          </p>
          <p className="text-sm text-ink2 mb-4">
            Si crees que esto es un error, contacta a NexoLink para que vinculen
            tu correo a este negocio.
          </p>
          <button onClick={cerrarSesion} className="underline text-sm">
            Cerrar sesión
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-5 py-8 max-w-2xl mx-auto">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl flex items-center gap-2">
            {negocio.nombre}
            {isSuperAdmin && (
              <span className="text-[10px] font-mono font-bold bg-[#6B2737] text-white px-2 py-0.5 rounded-full border border-red-300 shadow-xs">
                👑 Super Admin
              </span>
            )}
          </h1>
          <p className="text-xs text-ink2 font-mono">{session.user.email}</p>
        </div>
        <button onClick={cerrarSesion} className="text-sm underline shrink-0">
          Cerrar sesión
        </button>
      </header>

      {/* Tarjeta de Código QR */}
      <div className="mb-6 p-4 sm:p-5 border border-line rounded-xl bg-white/70 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-base sm:text-lg text-ink font-semibold flex items-center gap-2">
            <span>📱</span> Código QR del Menú
          </h2>
          <p className="text-xs text-ink2 mt-0.5">
            Tus clientes pueden escanearlo para ver tu catálogo digital.
          </p>
        </div>
        <button
          onClick={() => setMostrarModalQR(true)}
          className="bg-ink text-paper text-xs font-mono px-4 py-2.5 rounded-lg flex items-center gap-2 shrink-0 hover:opacity-90 transition-opacity w-full sm:w-auto justify-center"
        >
          Ver y Descargar QR
        </button>
      </div>

      {/* Sección: Información del Negocio (colapsable) */}
      <div className="mb-6 border border-line rounded-xl bg-white/70 shadow-xs overflow-hidden">
        <button
          type="button"
          onClick={() => setMostrarInfoNegocio((v) => !v)}
          className="w-full flex items-center justify-between px-4 sm:px-5 py-4 text-left hover:bg-white/50 transition-colors"
        >
          <h2 className="font-display text-base sm:text-lg text-ink font-semibold flex items-center gap-2">
            <span>⚙️</span> Información del Negocio
          </h2>
          <span className={`text-ink2 text-xs font-mono transition-transform ${mostrarInfoNegocio ? "rotate-180" : ""}`}>▼</span>
        </button>

        {mostrarInfoNegocio && (
          <div className="px-4 sm:px-5 pb-5 border-t border-line/60 pt-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <CampoInfo label="Nombre del Negocio">
                <input
                  className="campo"
                  value={infoNegocio.nombre || ""}
                  onChange={(e) => setInfoNegocio((p) => ({ ...p, nombre: e.target.value }))}
                  placeholder="Ej. Mi Restaurante"
                />
              </CampoInfo>
              <CampoInfo label="Tagline (subtítulo del hero)">
                <input
                  className="campo"
                  value={infoNegocio.tagline || ""}
                  onChange={(e) => setInfoNegocio((p) => ({ ...p, tagline: e.target.value }))}
                  placeholder="Ej. Cocina de autor desde 2010"
                />
              </CampoInfo>
              <div className="sm:col-span-2">
                <CampoInfo label="Descripción (frase del hero)">
                  <textarea
                    className="campo"
                    rows={2}
                    value={infoNegocio.descripcion || ""}
                    onChange={(e) => setInfoNegocio((p) => ({ ...p, descripcion: e.target.value }))}
                    placeholder="Ej. Los mejores cortes a la parrilla, mariscos frescos y mucho más."
                  />
                </CampoInfo>
              </div>
              <CampoInfo label="WhatsApp (sin + ni espacios)">
                <input
                  className="campo"
                  value={infoNegocio.whatsapp_numero || ""}
                  onChange={(e) => setInfoNegocio((p) => ({ ...p, whatsapp_numero: e.target.value }))}
                  placeholder="Ej. 18095551234"
                />
              </CampoInfo>
              <CampoInfo label="Color de Acento">
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={infoNegocio.color_acento || "#6B2737"}
                    onChange={(e) => setInfoNegocio((p) => ({ ...p, color_acento: e.target.value }))}
                    className="h-9 w-12 rounded border border-line cursor-pointer p-0.5 bg-white"
                  />
                  <input
                    className="campo flex-1"
                    value={infoNegocio.color_acento || ""}
                    onChange={(e) => setInfoNegocio((p) => ({ ...p, color_acento: e.target.value }))}
                    placeholder="#6B2737"
                  />
                </div>
              </CampoInfo>
              <CampoInfo label="URL del Logo">
                <input
                  className="campo"
                  value={infoNegocio.logo_url || ""}
                  onChange={(e) => setInfoNegocio((p) => ({ ...p, logo_url: e.target.value }))}
                  placeholder="https://…"
                />
              </CampoInfo>
              <CampoInfo label="URL Imagen Hero (fondo de portada)">
                <input
                  className="campo"
                  value={infoNegocio.imagen_hero_url || ""}
                  onChange={(e) => setInfoNegocio((p) => ({ ...p, imagen_hero_url: e.target.value }))}
                  placeholder="https://…"
                />
              </CampoInfo>
              <CampoInfo label="Plantilla de diseño">
                <select
                  className="campo"
                  value={infoNegocio.plantilla || "ticket-clasico"}
                  onChange={(e) => setInfoNegocio((p) => ({ ...p, plantilla: e.target.value }))}
                >
                  <option value="ticket-clasico">🎟️ Ticket Clásico (recibo retro)</option>
                  <option value="medina-grill">🔥 Fuego &amp; Brasa (steakhouse oscuro)</option>
                  <option value="bistro-chic">☕ Bistro Chic (cafetería elegante)</option>
                </select>
              </CampoInfo>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-line/60">
              {infoMsg ? (
                <span className={`text-xs font-mono ${infoMsg.startsWith("Error") ? "text-burgundy" : "text-emerald-700"}`}>
                  {infoMsg}
                </span>
              ) : <span />}
              <button
                onClick={guardarInfoNegocio}
                disabled={savingInfo}
                className="bg-ink text-paper text-xs font-mono px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 shrink-0"
              >
                {savingInfo ? "Guardando…" : "Guardar información"}
              </button>
            </div>
          </div>
        )}
      </div>

      {statusMsg && (
        <div className="mb-4 text-sm font-mono bg-white/70 border border-line rounded px-3 py-2">
          {statusMsg}
        </div>
      )}

      <ul className="space-y-5">
        {productos.map((p, index) => (
          <li
            key={p.id}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("text/plain", index.toString());
              e.currentTarget.classList.add("opacity-50");
            }}
            onDragEnd={(e) => {
              e.currentTarget.classList.remove("opacity-50");
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const desde = parseInt(e.dataTransfer.getData("text/plain"), 10);
              if (!isNaN(desde)) reordenarItems(desde, index);
            }}
            className="border border-line rounded-lg p-4 bg-white/50 hover:bg-white/80 transition-colors shadow-2xs"
          >
            {/* Barra de Reordenamiento */}
            <div className="flex items-center justify-between border-b border-line/60 pb-2.5 mb-3">
              <div className="flex items-center gap-2 cursor-grab active:cursor-grabbing text-ink2 text-xs font-mono select-none" title="Arrastra este producto para reordenarlo">
                <span className="text-base font-bold text-ink2">⣿</span>
                <span className="bg-white px-2 py-0.5 rounded border border-line/60 font-semibold text-ink">
                  Posición #{index + 1}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => moverProducto(index, "subir")}
                  disabled={index === 0}
                  title="Subir posición"
                  className="px-2.5 py-1 rounded bg-white hover:bg-ink hover:text-paper border border-line text-xs font-mono disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  ⬆️ Subir
                </button>
                <button
                  type="button"
                  onClick={() => moverProducto(index, "bajar")}
                  disabled={index === productos.length - 1}
                  title="Bajar posición"
                  className="px-2.5 py-1 rounded bg-white hover:bg-ink hover:text-paper border border-line text-xs font-mono disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  ⬇️ Bajar
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <Campo label="Nombre">
                  <input
                    className="campo"
                    value={p.nombre}
                    onChange={(e) => actualizarCampo(p.id, "nombre", e.target.value)}
                  />
                </Campo>
              </div>
              <Campo label="Categoría">
                <input
                  list={`categorias-list-${slug}`}
                  className="campo"
                  value={p.categoria || ""}
                  onChange={(e) => actualizarCampo(p.id, "categoria", e.target.value)}
                  placeholder="Selecciona o escribe una categoría"
                />
              </Campo>
              <Campo label="Precio (RD$)">
                <input
                  type="number"
                  step="0.01"
                  className="campo tabular"
                  value={p.precio}
                  onChange={(e) =>
                    actualizarCampo(p.id, "precio", parseFloat(e.target.value) || 0)
                  }
                />
              </Campo>
              <div className="sm:col-span-2">
                <Campo label="Descripción">
                  <textarea
                    className="campo"
                    rows={2}
                    value={p.descripcion || ""}
                    onChange={(e) =>
                      actualizarCampo(p.id, "descripcion", e.target.value)
                    }
                  />
                </Campo>
              </div>
            </div>

            <details className="mt-3">
              <summary className="text-xs font-mono text-ink2 cursor-pointer select-none">
                Opciones avanzadas (grupo, nota, precio en texto)
              </summary>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                <Campo label="Grupo (subsección dentro de la categoría)">
                  <input
                    className="campo"
                    value={p.grupo || ""}
                    onChange={(e) => actualizarCampo(p.id, "grupo", e.target.value)}
                    placeholder="ej. Pinchos"
                  />
                </Campo>
                <Campo label="Nota (ej. 'Pequeña' / '4 unidades')">
                  <input
                    className="campo"
                    value={p.nota || ""}
                    onChange={(e) => actualizarCampo(p.id, "nota", e.target.value)}
                  />
                </Campo>
                <Campo label="Precio en texto (sobreescribe el precio numérico, ej. 'RD$ 425 / 725' o 'Preguntar')">
                  <input
                    className="campo"
                    value={p.precio_texto || ""}
                    onChange={(e) => actualizarCampo(p.id, "precio_texto", e.target.value)}
                  />
                </Campo>
                <label className="flex items-center gap-2 text-sm font-mono mt-5">
                  <input
                    type="checkbox"
                    checked={!!p.destacado}
                    onChange={(e) => actualizarCampo(p.id, "destacado", e.target.checked)}
                  />
                  Destacado (le pone una insignia especial)
                </label>
              </div>
            </details>

            <div className="flex items-center justify-between mt-3">
              <label className="flex items-center gap-2 text-sm font-mono">
                <input
                  type="checkbox"
                  checked={p.disponible}
                  onChange={() => toggleDisponible(p)}
                />
                Disponible
              </label>

              <div className="flex gap-3">
                <button
                  onClick={() => eliminarProducto(p.id)}
                  className="text-sm text-burgundy underline"
                >
                  Eliminar
                </button>
                <button
                  onClick={() => guardarProducto(p)}
                  disabled={savingId === p.id}
                  className="text-sm bg-ink text-paper rounded px-3 py-1.5 font-mono disabled:opacity-50"
                >
                  {savingId === p.id ? "Guardando…" : "Guardar cambios"}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <button
        onClick={agregarProducto}
        disabled={agregando}
        className="mt-6 w-full border border-dashed border-ink2 rounded-lg py-3 text-sm font-mono text-ink2 hover:bg-white/50 disabled:opacity-50 disabled:cursor-wait transition-opacity"
      >
        {agregando ? "Agregando…" : "+ Agregar producto"}
      </button>

      <a
        href={`/${slug}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center mt-8 text-xs underline text-ink2"
      >
        Ver menú público
      </a>

      <datalist id={`categorias-list-${slug}`}>
        {opcionesCategorias.map((cat) => (
          <option key={cat} value={cat} />
        ))}
      </datalist>

      {mostrarModalQR && (
        <ModalQR
          negocio={negocio}
          slug={slug}
          onClose={() => setMostrarModalQR(false)}
        />
      )}
    </main>
  );
}

function ModalQR({ negocio, slug, onClose }) {
  const [copiado, setCopiado] = useState(false);
  const defaultBaseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://nexomenus.netlify.app";
  const [urlPublica, setUrlPublica] = useState(`${defaultBaseUrl}/${slug}`);
  const qrRef = useRef(null);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_APP_URL) {
      setUrlPublica(`${process.env.NEXT_PUBLIC_APP_URL.replace(/\/+$/, "")}/${slug}`);
    } else if (typeof window !== "undefined" && !window.location.hostname.includes("localhost") && !window.location.hostname.includes("127.0.0.1")) {
      setUrlPublica(`${window.location.origin}/${slug}`);
    } else {
      setUrlPublica(`https://nexomenus.netlify.app/${slug}`);
    }
  }, [slug]);

  const copiarEnlace = () => {
    if (!urlPublica) return;
    navigator.clipboard.writeText(urlPublica);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const descargarSoloQR = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.download = `qr-${slug}.png`;
    a.href = url;
    a.click();
  };

  const descargarAficheImprimible = () => {
    const canvasQR = qrRef.current?.querySelector("canvas");
    if (!canvasQR) return;

    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 1100;
    const ctx = canvas.getContext("2d");

    // Fondo elegante
    ctx.fillStyle = "#EFEAE0";
    ctx.fillRect(0, 0, 800, 1100);

    // Marco exterior con color de acento
    ctx.strokeStyle = negocio.color_acento || "#6B2737";
    ctx.lineWidth = 12;
    ctx.strokeRect(30, 30, 740, 1040);

    // Encabezado - Nombre del negocio
    ctx.fillStyle = negocio.color_acento || "#6B2737";
    ctx.font = "bold 46px serif";
    ctx.textAlign = "center";
    ctx.fillText(negocio.nombre, 400, 140);

    // Subtítulo
    ctx.fillStyle = "#4A4338";
    ctx.font = "24px sans-serif";
    ctx.fillText("Escanea para ver nuestro Menú Digital", 400, 195);

    // Recuadro blanco para el QR
    ctx.fillStyle = "#FFFFFF";
    if (ctx.roundRect) {
      ctx.beginPath();
      ctx.roundRect(150, 240, 500, 500, 24);
      ctx.fill();
      ctx.strokeStyle = "#C9C0AE";
      ctx.lineWidth = 2;
      ctx.stroke();
    } else {
      ctx.fillRect(150, 240, 500, 500);
    }

    // Dibujar el QR centrado
    ctx.drawImage(canvasQR, 190, 280, 420, 420);

    // Instrucción inferior
    ctx.fillStyle = "#201C16";
    ctx.font = "bold 26px sans-serif";
    ctx.fillText("📱 Abre la cámara de tu celular", 400, 800);

    ctx.fillStyle = "#4A4338";
    ctx.font = "20px monospace";
    const textoUrl = (urlPublica || `${defaultBaseUrl}/${slug}`).replace(/^https?:\/\//, "");
    ctx.fillText(textoUrl, 400, 850);

    // Pie de página
    ctx.fillStyle = "#A09580";
    ctx.font = "16px sans-serif";
    ctx.fillText("Menú digital por NexoLink", 400, 1000);

    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `afiche-qr-${slug}.png`;
    link.href = image;
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#EFEAE0] border border-line rounded-2xl max-w-md w-full p-6 text-center shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-ink2 hover:text-ink text-lg w-8 h-8 rounded-full flex items-center justify-center bg-white/50 hover:bg-white transition-colors"
        >
          ✕
        </button>

        <h2 className="font-display text-2xl text-ink font-bold mb-1">Código QR del Menú</h2>
        <p className="text-xs text-ink2 mb-6">
          Imprímelo para tus mesas o compártelo en tus redes sociales.
        </p>

        <div
          ref={qrRef}
          className="bg-white p-5 rounded-2xl shadow-xs inline-block mb-4 border border-line"
        >
          <QRCodeCanvas
            value={urlPublica || `${defaultBaseUrl}/${slug}`}
            size={220}
            level="H"
            marginSize={1}
            fgColor="#201C16"
            bgColor="#FFFFFF"
          />
        </div>

        <div className="bg-white/80 border border-line rounded-lg px-3 py-2 text-xs font-mono text-ink2 mb-5 flex items-center justify-between gap-2 overflow-hidden">
          <span className="truncate">{urlPublica}</span>
          <button
            onClick={copiarEnlace}
            className="bg-ink text-paper text-[11px] px-2.5 py-1 rounded shrink-0 hover:opacity-90 transition-opacity"
          >
            {copiado ? "¡Copiado!" : "Copiar"}
          </button>
        </div>

        <div className="flex flex-col gap-2.5">
          <button
            onClick={descargarSoloQR}
            className="w-full bg-ink text-paper font-mono text-xs py-2.5 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <span>⬇️</span> Descargar solo QR (PNG)
          </button>
          <button
            onClick={descargarAficheImprimible}
            className="w-full border border-ink text-ink font-mono text-xs py-2.5 rounded-xl hover:bg-ink hover:text-paper transition-colors flex items-center justify-center gap-2"
          >
            <span>🖼️</span> Descargar Afiche para Mesa (PNG HD)
          </button>
        </div>
      </div>
    </div>
  );
}

function Campo({ label, children }) {
  return (
    <label className="block">
      <span className="block text-xs font-mono text-ink2 mb-1">{label}</span>
      {children}
    </label>
  );
}

function CampoInfo({ label, children }) {
  return (
    <div className="block">
      <span className="block text-xs font-mono text-ink2 mb-1">{label}</span>
      {children}
    </div>
  );
}

function CentroCargando({ texto }) {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <p className="font-mono text-sm text-ink2">{texto}</p>
    </main>
  );
}

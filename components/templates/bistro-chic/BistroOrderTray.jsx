"use client";

import { useState } from "react";
import { formatoPrecioDOP } from "@/lib/formato";
import { getUIText, traducirMenuTexto } from "@/lib/i18n";

export function BistroOrderTray({ negocio, ordenItems, onAgregar, onRemover, onLimpiar, idioma = "es" }) {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [nombreCliente, setNombreCliente] = useState("");
  const [notaPedido, setNotaPedido] = useState("");

  const itemsArray = Object.values(ordenItems);
  const totalCantidad = itemsArray.reduce((acc, curr) => acc + curr.cantidad, 0);

  const totalCalculado = itemsArray.reduce((acc, curr) => {
    const p = typeof curr.item.precio === "number" ? curr.item.precio : 0;
    return acc + p * curr.cantidad;
  }, 0);

  if (totalCantidad === 0) return null;

  const enviarWhatsApp = () => {
    if (!negocio.whatsapp_numero) return;

    let mensaje = getUIText("wa_greeting", idioma, { nombre: negocio.nombre });

    itemsArray.forEach(({ item, cantidad }) => {
      const precioUnitario = item.precio_texto || formatoPrecioDOP(item.precio);
      const nombreItem = traducirMenuTexto(item, idioma, "nombre");
      mensaje += `• *${cantidad}x* ${nombreItem} (${precioUnitario})\n`;
    });

    if (totalCalculado > 0) {
      mensaje += getUIText("wa_total", idioma, { total: formatoPrecioDOP(totalCalculado) });
    }

    if (nombreCliente.trim()) {
      mensaje += getUIText("wa_client", idioma, { cliente: nombreCliente.trim() });
    }

    if (notaPedido.trim()) {
      mensaje += getUIText("wa_notes", idioma, { nota: notaPedido.trim() });
    }

    mensaje += getUIText("wa_footer", idioma);

    const url = `https://wa.me/${negocio.whatsapp_numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  };

  const itemText = totalCantidad === 1 ? getUIText("item_single", idioma) : getUIText("items_count", idioma);

  return (
    <>
      {/* Floating Bottom Bar */}
      <div className="fixed bottom-4 left-0 right-0 z-40 mx-auto max-w-lg px-4 animate-tray-bounce">
        <div className="flex items-center justify-between rounded-2xl bg-[#2E3B32] p-4 text-[#FDFBF7] shadow-xl shadow-[#2E3B32]/30 border border-[#4A5D4E]">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setModalAbierto(true)}>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D4A373] text-sm font-bold text-[#2D2A26]">
              {totalCantidad}
            </div>
            <div>
              <p className="text-xs font-medium text-[#EAE2D3]">
                {getUIText("my_order", idioma)} ({totalCantidad} {itemText})
              </p>
              <p className="font-serif-bistro text-base font-bold text-white">
                {totalCalculado > 0 ? formatoPrecioDOP(totalCalculado) : getUIText("view_my_tab", idioma)}
              </p>
            </div>
          </div>

          <button
            onClick={() => setModalAbierto(true)}
            className="rounded-full bg-[#D4A373] px-5 py-2 text-xs font-bold uppercase tracking-wider text-[#2D2A26] hover:bg-[#E5B584] transition-all cursor-pointer shadow-xs active:scale-95"
          >
            {getUIText("view_order", idioma)}
          </button>
        </div>
      </div>

      {/* Order Breakdown Modal */}
      {modalAbierto && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#2D2A26]/60 backdrop-blur-xs p-0 sm:p-4">
          <div className="w-full max-w-lg rounded-t-3xl sm:rounded-3xl bg-[#FAF6F0] p-6 shadow-2xl border border-[#E5DEC6] max-h-[90vh] flex flex-col justify-between overflow-hidden">
            <div>
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-[#E8DEC9] pb-4">
                <div>
                  <h3 className="font-serif-bistro text-xl font-bold text-[#2E3B32]">
                    {getUIText("your_order_for", idioma)} {negocio.nombre}
                  </h3>
                  <p className="text-xs text-[#8C7A6B]">
                    {getUIText("review_before_send", idioma)}
                  </p>
                </div>
                <button
                  onClick={() => setModalAbierto(false)}
                  className="rounded-full bg-[#EAE2D3] h-8 w-8 text-xs font-bold text-[#2D2A26] hover:bg-[#D4A373] hover:text-white transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Items List */}
              <div className="my-4 max-h-56 overflow-y-auto space-y-3 pr-1">
                {itemsArray.map(({ item, cantidad }) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-xl bg-white p-3 border border-[#E8DEC9]"
                  >
                    <div className="flex-1 pr-2">
                      <p className="font-serif-bistro text-sm font-bold text-[#2D2A26]">
                        {traducirMenuTexto(item, idioma, "nombre")}
                      </p>
                      <p className="text-xs text-[#8C7A6B]">
                        {item.precio_texto || formatoPrecioDOP(item.precio)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 rounded-full border border-[#D4A373] bg-[#FAF6F0] p-0.5">
                      <button
                        onClick={() => onRemover(item.id)}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EAE2D3] text-xs font-bold text-[#2D2A26] hover:bg-[#D4A373] hover:text-white"
                      >
                        -
                      </button>
                      <span className="min-w-[1.25rem] text-center text-xs font-bold text-[#2E3B32]">
                        {cantidad}
                      </span>
                      <button
                        onClick={() => onAgregar(item)}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2E3B32] text-xs font-bold text-[#FDFBF7]"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Customer Inputs */}
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-[#5C554C] mb-1">
                    {getUIText("your_name", idioma)}
                  </label>
                  <input
                    type="text"
                    placeholder={getUIText("your_name_placeholder", idioma)}
                    value={nombreCliente}
                    onChange={(e) => setNombreCliente(e.target.value)}
                    className="w-full rounded-xl border border-[#E5DEC6] bg-white px-3 py-2 text-xs text-[#2D2A26] focus:border-[#D4A373] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#5C554C] mb-1">
                    {getUIText("table_notes", idioma)}
                  </label>
                  <input
                    type="text"
                    placeholder={getUIText("table_notes_placeholder", idioma)}
                    value={notaPedido}
                    onChange={(e) => setNotaPedido(e.target.value)}
                    className="w-full rounded-xl border border-[#E5DEC6] bg-white px-3 py-2 text-xs text-[#2D2A26] focus:border-[#D4A373] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="mt-6 border-t border-[#E8DEC9] pt-4 space-y-2">
              <div className="flex justify-between text-sm font-bold text-[#2E3B32] mb-2">
                <span>{getUIText("estimated_total", idioma)}</span>
                <span>{formatoPrecioDOP(totalCalculado)}</span>
              </div>

              <button
                onClick={enviarWhatsApp}
                className="w-full rounded-2xl bg-[#25D366] py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-[#20ba59] transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{getUIText("send_whatsapp_order", idioma)}</span>
              </button>

              <div className="flex gap-2">
                <button
                  onClick={onLimpiar}
                  className="w-1/2 rounded-xl border border-[#E5DEC6] py-2 text-[11px] font-semibold text-[#8C7A6B] hover:bg-[#EAE2D3] transition-colors cursor-pointer"
                >
                  {getUIText("clear_order", idioma)}
                </button>
                <button
                  onClick={() => setModalAbierto(false)}
                  className="w-1/2 rounded-xl bg-[#EAE2D3] py-2 text-[11px] font-semibold text-[#2D2A26] hover:bg-[#D4A373] hover:text-white transition-colors cursor-pointer"
                >
                  {getUIText("keep_viewing_menu", idioma)}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

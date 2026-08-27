import { getUIText } from "@/lib/i18n";

export function BistroFooter({ negocio, slug, idioma = "es" }) {
  return (
    <footer className="border-t border-[#E5DEC6] bg-[#FDFBF7] py-12 text-center text-xs text-[#8C7A6B]">
      <div className="mx-auto max-w-4xl px-4 space-y-3">
        <h4 className="font-serif-bistro text-base font-bold text-[#2E3B32]">
          {negocio.nombre}
        </h4>

        <div className="flex justify-center gap-4 text-xs">
          <a
            href={`/${slug}/admin`}
            className="font-medium text-[#4A5D4E] hover:underline"
          >
            {getUIText("admin_panel", idioma)}
          </a>
          <span>·</span>
          <span>{getUIText("interactive_menu", idioma)}</span>
        </div>

        <p className="text-[11px] text-[#A39487]">
          {getUIText("developed_by", idioma)} <span className="font-semibold text-[#2E3B32]">NexoLink</span>
        </p>
      </div>
    </footer>
  );
}

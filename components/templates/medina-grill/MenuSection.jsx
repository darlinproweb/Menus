import { textoPrecio } from "@/lib/formato";

export function MenuSection({ categoria }) {
  return (
    <section id={categoria.id} className="scroll-mt-24 py-12 md:py-16">
      <div className="mb-10 text-center relative">
        {categoria.subtitulo && (
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-primary/60" />
            <p className="text-xs uppercase tracking-[0.3em] font-semibold text-primary">
              {categoria.subtitulo}
            </p>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-primary/60" />
          </div>
        )}
        <h2 className="font-serif text-3xl font-bold text-foreground md:text-5xl tracking-tight">
          {categoria.nombre}
        </h2>
        <div className="mx-auto mt-3 h-0.5 w-16 bg-gradient-to-r from-[#FFC700] via-[#FF5500] to-[#D62828] rounded-full" />
      </div>

      <div className="flex flex-col gap-12">
        {categoria.grupos.map((grupo) => (
          <div
            key={grupo.titulo}
            className="rounded-2xl border border-primary/15 bg-card/60 p-6 md:p-8 backdrop-blur-sm shadow-xl shadow-black/20"
          >
            <div className="mb-6 flex items-center gap-4 border-b border-primary/10 pb-4">
              <div className="h-3 w-1 rounded-full bg-accent" />
              <h3 className="font-serif text-xl font-bold text-primary md:text-2xl">
                {grupo.titulo}
              </h3>
              <span
                className="h-px flex-1 bg-gradient-to-r from-primary/20 via-border/40 to-transparent"
                aria-hidden="true"
              />
            </div>

            <ul className="grid gap-5 md:grid-cols-2 md:gap-x-8 md:gap-y-6">
              {grupo.items.map((item) => {
                const disponible = item.disponible !== false;

                return (
                  <li
                    key={item.id}
                    className={`group relative flex flex-col justify-between rounded-xl border p-3.5 transition-all duration-300 ${
                      disponible
                        ? "border-transparent bg-background/40 hover:border-primary/30 hover:bg-background/80 hover:shadow-md hover:shadow-amber-500/5"
                        : "border-red-500/20 bg-background/20 opacity-65"
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-base font-semibold text-foreground group-hover:text-primary transition-colors flex items-center flex-wrap gap-1">
                          <span className={!disponible ? "line-through text-muted-foreground" : ""}>
                            {item.nombre}
                          </span>
                          {item.destacado && disponible && (
                            <span className="ml-1 inline-block rounded bg-[#D62828]/20 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#FF4500]">
                              ★ Especial
                            </span>
                          )}
                          {!disponible && (
                            <span className="ml-1 inline-block rounded bg-red-500/20 border border-red-500/30 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-400">
                              Agotado
                            </span>
                          )}
                        </span>

                        <span
                          className={`shrink-0 rounded-lg border px-2.5 py-1 font-mono text-sm font-bold shadow-sm ${
                            disponible
                              ? "border-primary/30 bg-primary/10 text-primary"
                              : "border-white/10 bg-white/5 text-muted-foreground"
                          }`}
                        >
                          {textoPrecio(item)}
                        </span>
                      </div>

                      {item.nota && (
                        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground/80">
                          {item.nota}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

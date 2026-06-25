import Link from "next/link"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-rose-950/30 to-rose-100/5 text-white">
      <div className="mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-6 py-16 text-center">
        <Link
          href="/principal"
          className="group flex h-full w-full max-w-4xl flex-col items-center justify-center gap-10 rounded-[2.5rem] border border-rose-300/20 bg-slate-950/80 p-8 shadow-[0_30px_90px_-45px_rgba(244,114,182,0.75)] transition duration-300 hover:bg-slate-950/95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rose-300/60"
          aria-label="Entrar a Tiendas Urbano"
        >
          <div className="relative flex h-80 w-80 items-center justify-center rounded-[2.5rem] border border-rose-300/30 bg-rose-100/10 p-10 shadow-[0_25px_80px_-45px_rgba(244,114,182,0.45)] backdrop-blur-xl sm:h-[32rem] sm:w-[32rem]">
            <img
              src="/LogoTU.png"
              alt="Logo Tienda Urbano"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-300/80">
              Bienvenido a
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Tiendas Urbano
            </h1>
          </div>
          <span className="inline-flex rounded-full bg-rose-300/95 px-10 py-4 text-lg font-semibold text-slate-950 shadow-lg shadow-rose-900/20 transition duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-2xl">
              Explorar colección
          </span>
        </Link>
      </div>
    </main>
  )
}
import Link from "next/link"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Link
        href="/"
        className="group flex h-full w-full cursor-pointer flex-col items-center justify-center gap-10 px-6 text-center transition duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300/50"
      >
        <div className="relative flex h-72 w-72 items-center justify-center rounded-[2rem] border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-md sm:h-96 sm:w-96">
          <img
            src="/LogoTU.png"
            alt="Logo Tienda Urbano"
            className="h-full w-full object-contain"
          />
        </div>
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.4em] text-slate-300/80">
            Toca para entrar
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Tiendas Urbano
          </h1>
        </div>
        <span className="inline-flex rounded-full bg-white/95 px-8 py-4 text-lg font-semibold text-slate-950 shadow-lg shadow-slate-950/10 transition duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-xl">
          Ingresar
        </span>
      </Link>
    </main>
  )
}

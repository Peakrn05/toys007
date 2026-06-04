import Link from "next/link";

export default function PromoBanner() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Games deal */}
          <div className="relative rounded-3xl overflow-hidden bg-brand-blue text-white p-8 flex flex-col justify-between min-h-56">
            <div className="space-y-2">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-200 bg-white/10 px-3 py-1 rounded-full">
                Limited Time
              </span>
              <h3 className="text-2xl font-black leading-tight mt-2">
                Up to 40% Off<br />Board Games
              </h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                Perfect for family game nights. Shop the biggest selection.
              </p>
            </div>
            <Link
              href="/category/board-games"
              className="inline-block mt-5 bg-white text-brand-blue text-sm font-black px-6 py-2.5 rounded-xl hover:bg-gray-100 transition-colors self-start shadow-sm"
            >
              Shop Games
            </Link>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-white/8 text-9xl font-black select-none pointer-events-none">
              40%
            </div>
          </div>

          {/* Outdoor deal */}
          <div className="relative rounded-3xl overflow-hidden bg-brand-red text-white p-8 flex flex-col justify-between min-h-56">
            <div className="space-y-2">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-red-200 bg-white/10 px-3 py-1 rounded-full">
                New Season
              </span>
              <h3 className="text-2xl font-black leading-tight mt-2">
                Outdoor Toys<br />Starting at $9
              </h3>
              <p className="text-red-100 text-sm leading-relaxed">
                From bikes to bubble guns — everything for outdoor adventures.
              </p>
            </div>
            <Link
              href="/outdoor"
              className="inline-block mt-5 bg-white text-brand-red text-sm font-black px-6 py-2.5 rounded-xl hover:bg-gray-100 transition-colors self-start shadow-sm"
            >
              Shop Outdoor
            </Link>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-white/8 text-9xl font-black select-none pointer-events-none">
              $9
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

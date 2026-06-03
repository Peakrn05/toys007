import Link from "next/link";

export default function PromoBanner() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Deal banner 1 */}
          <div className="relative rounded-2xl overflow-hidden bg-brand-blue text-white p-8 flex flex-col justify-between min-h-52">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-200">
                Limited Time
              </span>
              <h3 className="text-2xl font-black leading-tight">
                Up to 40% Off <br />
                Board Games
              </h3>
              <p className="text-blue-100 text-sm">
                Perfect for family game nights. Shop the biggest selection.
              </p>
            </div>
            <Link
              href="/deals/board-games"
              className="inline-block mt-4 bg-white text-brand-blue text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-gray-100 transition-colors self-start"
            >
              Shop Games
            </Link>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-white/10 text-9xl font-black select-none">
              40%
            </div>
          </div>

          {/* Deal banner 2 */}
          <div className="relative rounded-2xl overflow-hidden bg-brand-red text-white p-8 flex flex-col justify-between min-h-52">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-red-200">
                New Season
              </span>
              <h3 className="text-2xl font-black leading-tight">
                Outdoor Toys <br />
                Starting at $19
              </h3>
              <p className="text-red-100 text-sm">
                From bikes to water guns — everything for outdoor adventures.
              </p>
            </div>
            <Link
              href="/outdoor"
              className="inline-block mt-4 bg-white text-brand-red text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-gray-100 transition-colors self-start"
            >
              Shop Outdoor
            </Link>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-white/10 text-9xl font-black select-none">
              $19
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

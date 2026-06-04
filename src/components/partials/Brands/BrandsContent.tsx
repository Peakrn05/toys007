import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const BRANDS = [
  { name: "LEGO", slug: "building-blocks", description: "Creative building sets for all ages", products: 2, color: "bg-yellow-400", tagColor: "text-yellow-800 bg-yellow-100" },
  { name: "Mattel", slug: "dolls", description: "Iconic toys including Barbie & Hot Wheels", products: 3, color: "bg-red-500", tagColor: "text-red-800 bg-red-100" },
  { name: "Hasbro", slug: "board-games", description: "Board games, puzzles & action figures", products: 4, color: "bg-blue-500", tagColor: "text-blue-800 bg-blue-100" },
  { name: "Fisher-Price", slug: "baby-toys", description: "Safe learning toys for babies & toddlers", products: 6, color: "bg-orange-400", tagColor: "text-orange-800 bg-orange-100" },
  { name: "VTech", slug: "baby-toys", description: "Electronic learning toys for kids", products: 3, color: "bg-green-500", tagColor: "text-green-800 bg-green-100" },
  { name: "Playmobil", slug: "action-figures", description: "Creative playsets for imaginative play", products: 2, color: "bg-purple-500", tagColor: "text-purple-800 bg-purple-100" },
  { name: "Melissa & Doug", slug: "wooden-toys", description: "Wooden toys & arts and crafts", products: 4, color: "bg-teal-500", tagColor: "text-teal-800 bg-teal-100" },
  { name: "Play-Doh", slug: "arts-crafts", description: "Classic modeling compound & creative sets", products: 2, color: "bg-pink-400", tagColor: "text-pink-800 bg-pink-100" },
  { name: "Hot Wheels", slug: "vehicles", description: "Die-cast cars & racing tracks", products: 2, color: "bg-red-600", tagColor: "text-red-800 bg-red-100" },
  { name: "Nerf", slug: "outdoor", description: "Foam blasters & outdoor action", products: 2, color: "bg-orange-500", tagColor: "text-orange-800 bg-orange-100" },
  { name: "Barbie", slug: "dolls", description: "Fashion dolls & playsets for girls", products: 2, color: "bg-pink-500", tagColor: "text-pink-800 bg-pink-100" },
  { name: "Bruder", slug: "vehicles", description: "Realistic toy vehicles & construction", products: 2, color: "bg-yellow-500", tagColor: "text-yellow-800 bg-yellow-100" },
];

export default function BrandsContent() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div
        className="page-banner"
        style={{ background: "linear-gradient(135deg, #FF6D00 0%, #FF1744 100%)" }}
      >
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="page-banner-back">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <h1 className="page-banner-title">Shop by Brand</h1>
          <p className="page-banner-subtitle">
            {BRANDS.length} top toy brands trusted worldwide
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {BRANDS.map((brand) => (
            <Link
              key={brand.name}
              href={`/category/${brand.slug}`}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-3"
            >
              {/* Logo placeholder */}
              <div className={`w-14 h-14 ${brand.color} rounded-2xl flex items-center justify-center`}>
                <span className="text-white font-black text-xl">
                  {brand.name[0]}
                </span>
              </div>

              <div>
                <h3 className="font-black text-gray-900 text-base">{brand.name}</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  {brand.description}
                </p>
              </div>

              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full self-start ${brand.tagColor}`}>
                {brand.products} products
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

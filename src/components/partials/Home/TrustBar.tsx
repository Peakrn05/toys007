import { Truck, RefreshCw, Lock, Headphones } from "lucide-react";
import { BRAND_FEATURES } from "./Home.config";

const ICON_MAP = {
  truck: Truck,
  refresh: RefreshCw,
  lock: Lock,
  headphones: Headphones,
};

const COLOR_MAP: Record<string, { bg: string; icon: string; border: string }> = {
  blue: {
    bg: "bg-blue-50",
    icon: "text-blue-500",
    border: "border-blue-100",
  },
  green: {
    bg: "bg-green-50",
    icon: "text-green-500",
    border: "border-green-100",
  },
  purple: {
    bg: "bg-purple-50",
    icon: "text-purple-500",
    border: "border-purple-100",
  },
  orange: {
    bg: "bg-orange-50",
    icon: "text-orange-500",
    border: "border-orange-100",
  },
};

type FeatureIcon = keyof typeof ICON_MAP;

export default function TrustBar() {
  return (
    <section className="bg-white py-8 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {BRAND_FEATURES.map((feature) => {
            const Icon = ICON_MAP[feature.icon as FeatureIcon] ?? Truck;
            const colors = COLOR_MAP[feature.color] ?? COLOR_MAP.blue;
            return (
              <div
                key={feature.title}
                className={`flex items-center gap-4 p-4 rounded-2xl border ${colors.bg} ${colors.border}`}
              >
                <div className={`w-11 h-11 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm`}>
                  <Icon size={22} className={colors.icon} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    {feature.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-snug">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

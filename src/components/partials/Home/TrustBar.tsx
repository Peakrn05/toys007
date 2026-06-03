import { Truck, RefreshCw, Lock, Headphones } from "lucide-react";
import { BRAND_FEATURES } from "./Home.config";

const ICON_MAP = {
  truck: Truck,
  refresh: RefreshCw,
  lock: Lock,
  headphones: Headphones,
};

type FeatureIcon = keyof typeof ICON_MAP;

export default function TrustBar() {
  return (
    <section className="bg-white border-y border-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {BRAND_FEATURES.map((feature) => {
            const Icon = ICON_MAP[feature.icon as FeatureIcon] ?? Truck;
            return (
              <div
                key={feature.title}
                className="flex items-center gap-4 py-2"
              >
                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-brand-red" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {feature.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
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

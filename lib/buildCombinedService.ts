import type { Service, BookableService } from "@/types/service";

export function buildCombinedService(items: Service[]): BookableService {
  const hasUnknownPrice = items.some((s) => s.price === null);
  return {
    id: "combo-" + items.map((s) => s.id).join("-"),
    name: items.length === 1 ? items[0].name : `${items.length} serviços (${items.map((i) => i.name).join(", ")})`,
    price: hasUnknownPrice ? null : items.reduce((sum, s) => sum + (s.price ?? 0), 0),
    duration: items.reduce((sum, s) => sum + s.duration, 0),
  };
}

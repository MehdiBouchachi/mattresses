import { useRouter } from "next/navigation";

export default function Breadcrumb({ items }) {
  const router = useRouter();

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-text-soft mb-4 sm:mb-6">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={index} className="flex items-center gap-2">
            {item.href && !isLast ? (
              <button
                onClick={() => router.push(item.href)}
                className="hover:text-primary-600 transition"
              >
                {item.label}
              </button>
            ) : (
              <span className={isLast ? "text-primary-600 font-medium" : ""}>
                {item.label}
              </span>
            )}

            {!isLast && <span>/</span>}
          </div>
        );
      })}
    </div>
  );
}

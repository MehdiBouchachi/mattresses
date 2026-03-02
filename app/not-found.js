import Link from "next/link";
import "@/styles/globals.css";
export default function NotFound({ params }) {
  const locale = params?.local || "en";
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-3xl text-center">
        {/* Decorative Soft Glow */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 via-white to-white" />

        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-[120px] sm:text-[160px] font-bold text-blue-950 tracking-tight leading-none">
            404
          </h1>
          <div className="h-1 w-24 mx-auto bg-blue-900 rounded-full mt-4" />
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-semibold text-blue-950 mb-6">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-12">
          The page you are looking for does not exist or may have been moved.
          Please return to the homepage or explore our mattress collection.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/${locale}`}
            className="px-8 py-3 rounded-2xl bg-blue-900 text-white font-medium hover:bg-blue-950 transition"
          >
            Go to Homepage
          </Link>

          <Link
            href={`/${locale}/mattresses`}
            className="px-8 py-3 rounded-2xl border border-blue-900 text-blue-900 font-medium hover:bg-blue-50 transition"
          >
            Browse Mattresses
          </Link>
        </div>
      </div>
    </div>
  );
}

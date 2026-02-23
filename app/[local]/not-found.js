import Link from "next/link";

export default function NotFound({ params }) {
  const locale = params?.local || "en";

  return (
    <div className="min-h-screen bg-[#F8F6F2] flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <h1 className="text-[120px] md:text-[160px] font-semibold text-[#E0DDD6] leading-none">
          404
        </h1>

        <h2 className="text-4xl md:text-5xl font-semibold text-[#1E1E1E] mt-6 mb-6">
          Page Not Found
        </h2>

        <div className="w-16 h-[2px] bg-[#2B2D6E] opacity-30 mx-auto mb-8"></div>

        <p className="text-[#6A6A6A] text-lg leading-relaxed mb-12">
          The page you’re looking for doesn’t exist or may have been moved.
          Let’s guide you back to comfort.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/${locale}`}
            className="px-8 py-4 rounded-2xl bg-[#2B2D6E] text-white 
            hover:bg-[#1E204F] transition duration-300 shadow-md hover:shadow-lg"
          >
            Back to Home
          </Link>

          <Link
            href={`/${locale}/mattresses`}
            className="px-8 py-4 rounded-2xl border border-[#2B2D6E] 
            text-[#2B2D6E] hover:bg-[#ECEAF8] transition duration-300"
          >
            Browse Mattresses
          </Link>
        </div>
      </div>
    </div>
  );
}

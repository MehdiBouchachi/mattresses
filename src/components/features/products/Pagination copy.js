"use client";

export default function Pagination({ totalPages, page, dispatch }) {
  if (totalPages <= 1) return null;

  const goToPage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;

    dispatch({ type: "SET_PAGE", payload: newPage });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex justify-center items-center gap-3 mt-16">
      <button
        onClick={() => goToPage(page - 1)}
        disabled={page === 1}
        className={`px-4 h-10 rounded-full text-sm transition ${
          page === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "border border-[#DDD] hover:bg-[#EEE]"
        }`}
      >
        Prev
      </button>

      {Array.from({ length: totalPages }).map((_, i) => {
        const pageNumber = i + 1;

        return (
          <button
            key={pageNumber}
            onClick={() => goToPage(pageNumber)}
            className={`w-10 h-10 rounded-full text-sm transition ${
              page === pageNumber
                ? "bg-primary-600 text-white shadow-md"
                : "border border-[#DDD] hover:bg-[#EEE]"
            }`}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        onClick={() => goToPage(page + 1)}
        disabled={page === totalPages}
        className={`px-4 h-10 rounded-full text-sm transition ${
          page === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "border border-[#DDD] hover:bg-[#EEE]"
        }`}
      >
        Next
      </button>
    </div>
  );
}

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

  /*  SMART PAGE RANGE  */

  const getVisiblePages = () => {
    const delta = 2;
    const pages = [];

    for (
      let i = Math.max(1, page - delta);
      i <= Math.min(totalPages, page + delta);
      i++
    ) {
      pages.push(i);
    }

    if (pages[0] > 1) pages.unshift("...");
    if (pages[pages.length - 1] < totalPages) pages.push("...");

    if (pages[0] === "...") pages.unshift(1);
    if (pages[pages.length - 1] === "...") pages.push(totalPages);

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mt-8 sm:mt-12 lg:mt-16">
      {/* PREV */}
      <PaginationButton
        disabled={page === 1}
        onClick={() => goToPage(page - 1)}
      >
        Prev
      </PaginationButton>

      {/* PAGE NUMBERS */}
      {visiblePages.map((p, i) =>
        p === "..." ? (
          <span key={i} className="px-2 text-slate-400 text-sm">
            ...
          </span>
        ) : (
          <PaginationButton
            key={p}
            active={page === p}
            onClick={() => goToPage(p)}
          >
            {p}
          </PaginationButton>
        ),
      )}

      {/* NEXT */}
      <PaginationButton
        disabled={page === totalPages}
        onClick={() => goToPage(page + 1)}
      >
        Next
      </PaginationButton>
    </div>
  );
}

/* ================= REUSABLE BUTTON ================= */

function PaginationButton({
  children,
  onClick,
  disabled = false,
  active = false,
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        min-w-[40px]
        h-9 sm:h-10
        px-3 sm:px-4
        rounded-full
        text-xs sm:text-sm
        transition-all duration-200
        ${
          active
            ? "bg-blue-900 text-white shadow-md"
            : disabled
              ? "bg-slate-200 text-slate-400 cursor-not-allowed"
              : "bg-white border border-blue-100 text-slate-700 hover:bg-blue-50 hover:border-blue-300"
        }
      `}
    >
      {children}
    </button>
  );
}

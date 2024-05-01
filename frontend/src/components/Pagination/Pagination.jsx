import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNeighbours = 2; // Number of page links to show before and after the current page

  // Function to generate an array of page numbers around the current page
  const getPageNumbers = () => {
    const startPage = Math.max(1, currentPage - pageNeighbours);
    const endPage = Math.min(totalPages, currentPage + pageNeighbours);
    const pagesToShow = endPage - startPage + 1;

    let pageNumbers = Array.from(
      { length: pagesToShow },
      (_, index) => startPage + index
    );

    // Add ellipsis if necessary
    const hasLeftEllipsis = startPage > 1;
    const hasRightEllipsis = endPage < totalPages;

    if (hasLeftEllipsis) {
      pageNumbers = [1, "..."].concat(pageNumbers);
    }

    if (hasRightEllipsis) {
      pageNumbers = pageNumbers.concat(["...", totalPages]);
    }

    return pageNumbers;
  };

  console.log("currentPage:", currentPage);
  console.log("totalPages:", totalPages);

  return (
    <nav className="mt-8" aria-label="Pagination">
      <ul className="flex justify-center">
        {getPageNumbers().map((number, index) => (
          <li key={index}>
            {number === "..." ? (
              <span className="px-3 py-1 text-gray-600 font-medium mr-2">
                ...
              </span>
            ) : (
              <button
                onClick={() => onPageChange(number)}
                className={`px-3 py-1 bg-gray-800 text-white text-sm font-medium mr-2 rounded ${
                  currentPage === Number(number) ? "bg-gray-500" : ""
                }`}
              >
                {number}
              </button>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;

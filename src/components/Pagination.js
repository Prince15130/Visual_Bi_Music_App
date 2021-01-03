import React from "react";

export const Pagination = ({
  songsPerPage,
  totalSongs,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalSongs / songsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav
      className="pagination is-rounded"
      role="navigation"
      aria-label="pagination"
    >
      {currentPage > 1 ? (
        <a
          className="pagination-previous"
          onClick={() => paginate("back", currentPage)}
        >
          Previous
        </a>
      ) : null}
      {totalSongs - 1 > currentPage * songsPerPage ? (
        <a
          onClick={() => paginate("next", currentPage)}
          className="pagination-next"
        >
          Next page
        </a>
      ) : null}
    </nav>
  );
};

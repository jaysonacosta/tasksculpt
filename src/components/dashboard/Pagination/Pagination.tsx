import { IconCircleArrowLeft, IconCircleArrowRight } from "@tabler/icons-react";
import type { InfiniteQueryObserverResult } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";

export default function Pagination({
  pageCount,
  page,
  setPage,
  fetchNextPage,
  fetchPreviousPage,
}: {
  pageCount: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  fetchNextPage: () => Promise<InfiniteQueryObserverResult>;
  fetchPreviousPage: () => Promise<InfiniteQueryObserverResult>;
}) {
  const nextPage = () => {
    if (page < pageCount - 1) {
      setPage((prev) => prev + 1);
      void fetchNextPage();
    }
  };

  const prevPage = () => {
    if (page != 0) {
      setPage((prev) => prev - 1);
      void fetchPreviousPage();
    }
  };

  return (
    <div className="flex justify-around">
      <button onClick={prevPage}>
        <IconCircleArrowLeft />
      </button>
      <p className="tracking-widest">
        {page + 1}/{pageCount}
      </p>
      <button onClick={nextPage}>
        <IconCircleArrowRight />
      </button>
    </div>
  );
}

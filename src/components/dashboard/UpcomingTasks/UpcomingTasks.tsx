import { api } from "@/utils/api";
import { IconExclamationCircle } from "@tabler/icons-react";
import DashboardCard from "../DashboardCard";
import TaskSkeleton from "../TaskSkeleton";
import { useState } from "react";
import Pagination from "../Pagination";

export default function UpcomingTasks() {
  const {
    isSuccess,
    isLoading,
    data,
    fetchNextPage,
    fetchPreviousPage,
    isError,
    isFetching,
  } = api.task.getAllUpcoming.useInfiniteQuery(
    { limit: 5 },
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );

  const [page, setPage] = useState(0);

  let content;

  if (isLoading || isFetching) {
    content = <TaskSkeleton />;
  }

  if (isError) {
    content = (
      <div className="flex flex-col gap-y-5">
        <IconExclamationCircle color="red" />
        <p>Uh oh... Something went wrong...</p>
      </div>
    );
  }

  if (isSuccess) {
    const { pages } = data;
    const currentPage = pages[page];
    if (currentPage) {
      if (currentPage.tasks.length === 0) {
        content = (
          <div>
            <p>Your horizon is clear! 🎉</p>
          </div>
        );
      } else {
        content = (
          <>
            <div className="flex grow flex-col gap-y-3">
              {currentPage.tasks.map((task) => {
                return (
                  <div key={task.id} className="flex bg-slate-100">
                    <div
                      className="w-2"
                      style={{ backgroundColor: task.course.colorCode }}
                    ></div>
                    <div className="flex w-full justify-between whitespace-nowrap">
                      <p className="w-40 truncate p-2 font-semibold">
                        {task.title}
                      </p>
                      <p className="p-2 text-gray-600">
                        Due on&nbsp;
                        {task.dueDate.toLocaleDateString(undefined, {
                          month: "short",
                          day: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <Pagination
              pageCount={currentPage.pageCount}
              page={page}
              setPage={setPage}
              fetchNextPage={fetchNextPage}
              fetchPreviousPage={fetchPreviousPage}
            />
          </>
        );
      }
    }
  }

  return <DashboardCard title="Upcoming Tasks">{content}</DashboardCard>;
}

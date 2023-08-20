import { api } from "@/utils/api";
import { IconExclamationCircle } from "@tabler/icons-react";
import DashboardCard from "../DashboardCard";
import TaskSkeleton from "../TaskSkeleton";
import Pagination from "../Pagination";
import { useState } from "react";

export default function CourseProgress() {
  const {
    isSuccess,
    isLoading,
    data,
    fetchNextPage,
    fetchPreviousPage,
    isError,
    isFetching,
  } = api.course.getAllPaginated.useInfiniteQuery(
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
      if (currentPage.courses.length === 0) {
        content = (
          <div>
            <p>
              Nothing to see here. Add your first course and task to get
              started!
            </p>
          </div>
        );
      } else {
        content = (
          <>
            <div className="flex grow flex-col gap-y-3">
              {currentPage.courses.map((course) => {
                let taskInformation;
                if (course.tasks.length === 0) {
                  taskInformation = "No tasks 🎉";
                } else {
                  taskInformation = `${course.tasks.length} task${
                    course.tasks.length > 1 ? "s" : ""
                  }`;
                }
                return (
                  <div key={course.id} className="flex bg-slate-100">
                    <div
                      className="w-2"
                      style={{ backgroundColor: course.colorCode }}
                    ></div>
                    <div className="flex w-full justify-between">
                      <p className="p-2 font-semibold">{course.courseName}</p>
                      <p className="p-2 text-gray-600">{taskInformation}</p>
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

  return (
    <DashboardCard title="Course Progress" className="lg:h-[344px]">
      {content}
    </DashboardCard>
  );
}

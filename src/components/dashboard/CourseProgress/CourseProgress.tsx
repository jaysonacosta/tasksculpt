import { api } from "@/utils/api";
import { IconExclamationCircle, IconLoader } from "@tabler/icons-react";
import DashboardCard from "../DashboardCard/DashboardCard";

export default function CourseProgress() {
  const {
    isSuccess,
    data: courses,
    isLoading,
    isError,
  } = api.course.getAll.useQuery();

  let content;

  if (isLoading) {
    content = (
      <div>
        <IconLoader className="animate-spin" color="#4299e1" />
      </div>
    );
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
    if (courses.length === 0) {
      content = (
        <div>
          <p>
            Nothing to see here. Add your first course and task to get started!
          </p>
        </div>
      );
    } else {
      content = (
        <>
          {courses.map((course) => {
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
        </>
      );
    }
  }

  return <DashboardCard title="Course Progress">{content}</DashboardCard>;
}

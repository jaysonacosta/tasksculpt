import { api } from "@/utils/api";
import { IconExclamationCircle, IconLoader } from "@tabler/icons-react";
import DashboardCard from "../DashboardCard/DashboardCard";

export default function UpcomingTasks() {
  const {
    isSuccess,
    data: tasks,
    isLoading,
    isError,
  } = api.task.getAllUpcoming.useQuery();

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
    if (tasks.length === 0) {
      content = (
        <div>
          <p>Your horizon is clear! 🎉</p>
        </div>
      );
    } else {
      content = (
        <>
          {tasks.map((task) => {
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
        </>
      );
    }
  }

  return <DashboardCard title="Upcoming Tasks">{content}</DashboardCard>;
}

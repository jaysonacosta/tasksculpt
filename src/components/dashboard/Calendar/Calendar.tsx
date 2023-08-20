import ReactCalendar from "react-calendar";
import DashboardCard from "../DashboardCard";
import {
  type TileContentFunc,
  type CalendarType,
} from "react-calendar/dist/cjs/shared/types";
import "react-calendar/dist/Calendar.css";
import { api } from "@/utils/api";
import { IconExclamationCircle, IconLoader } from "@tabler/icons-react";

export default function Calendar() {
  const calendarType = Intl.DateTimeFormat().resolvedOptions()
    .calendar as CalendarType;

  const {
    isSuccess,
    data: tasks,
    isLoading,
    isError,
  } = api.task.getAll.useQuery();

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
    const populateCalendar: TileContentFunc = ({ date, view }) => {
      const initialTaskCount = 0;
      let taskCount = 0;
      if (view === "month") {
        taskCount = tasks.reduce(
          (acc, curr) =>
            curr.dueDate.toISOString() === date.toISOString() ? acc + 1 : acc,
          initialTaskCount
        );
      } else if (view === "year") {
        taskCount = tasks.reduce(
          (acc, curr) =>
            curr.dueDate.getMonth() === date.getMonth() ? acc + 1 : acc,
          initialTaskCount
        );
      }

      if (taskCount !== initialTaskCount) {
        return (
          <div className="absolute -right-1 -top-1 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 text-xs">
            <p className="font-semibold text-white">{taskCount}</p>
          </div>
        );
      }
    };

    content = (
      <ReactCalendar
        tileContent={populateCalendar}
        tileClassName={() => "!overflow-visible relative"}
        calendarType={calendarType}
        minDetail="year"
      />
    );
  }

  return <DashboardCard title="Calendar">{content}</DashboardCard>;
}

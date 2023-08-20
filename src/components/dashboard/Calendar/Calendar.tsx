import ReactCalendar from "react-calendar";
import DashboardCard from "../DashboardCard";
import { type CalendarType } from "react-calendar/dist/cjs/shared/types";

export default function Calendar() {
  const calendarType = Intl.DateTimeFormat().resolvedOptions()
    .calendar as CalendarType;
  return (
    <DashboardCard title="Calendar">
      <ReactCalendar calendarType={calendarType} />
    </DashboardCard>
  );
}

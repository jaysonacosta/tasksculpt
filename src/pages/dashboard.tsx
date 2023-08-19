import Button from "@/components/Button/Button";
import Layout from "@/layout/Layout";
import { Routes } from "@/types/routes";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Dashboard() {
  const { status, data } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    void router.push(Routes.LOGIN);
  }

  const { isSuccess: courseIsSuccess, data: courseData } =
    api.course.getAll.useQuery();

  const { isSuccess: taskIsSuccess, data: taskData } =
    api.task.getAll.useQuery();

  const { isSuccess: tasksDueTodayIsSuccess, data: tasksDueTodayData } =
    api.task.getAllDueToday.useQuery();

  const { isSuccess: upcomingTasksIsSuccess, data: upcomingTasksData } =
    api.task.getAllUpcoming.useQuery();

  let overview;
  let courseProgress;
  let tasksDueToday;
  let upcomingTasks;

  if (courseIsSuccess && taskIsSuccess) {
    if (courseData.length === 0 && taskData.length === 0) {
      overview = (
        <div>
          <p>
            Nothing to see here. Add your first course and task to get started!
          </p>
        </div>
      );
    } else {
      courseProgress = (
        <>
          {courseData.map((course) => {
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

  if (tasksDueTodayIsSuccess) {
    if (tasksDueTodayData.length === 0) {
      tasksDueToday = (
        <div>
          <p>Nothing due today! 🎉</p>
        </div>
      );
    } else if (tasksDueTodayIsSuccess) {
      tasksDueToday = (
        <>
          {tasksDueTodayData.map((task) => {
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
                  <p className="p-2 text-gray-600">{task.status}</p>
                </div>
              </div>
            );
          })}
        </>
      );
    }
  }

  if (upcomingTasksIsSuccess) {
    if (upcomingTasksData.length === 0) {
      upcomingTasks = (
        <div>
          <p>Your horizon is clear! 🎉</p>
        </div>
      );
    } else {
      upcomingTasks = (
        <>
          {upcomingTasksData.map((task) => {
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
                  <p className="p-2 text-gray-600">{task.status}</p>
                </div>
              </div>
            );
          })}
        </>
      );
    }
  }

  let content;

  if (status === "loading") {
    content = <h1>Loading...</h1>;
  } else if (status === "authenticated") {
    content = (
      <section className="flex flex-col gap-y-5">
        <h1 className="text-2xl font-bold">Hi, {data.user.name}!</h1>
        <div className="flex gap-x-5">
          <Link href={Routes.NEW_COURSE}>
            <Button type="success">Add Course</Button>
          </Link>
          <Link href={Routes.NEW_TASK}>
            <Button type="success">Add Task</Button>
          </Link>
        </div>
        <div className="text-md grid gap-5  lg:grid-cols-3">
          <div className="flex flex-col gap-y-3 bg-white p-3 shadow lg:col-start-1 lg:col-end-3">
            <p className="font-semibold">Overview</p>
            <div>{overview}</div>
          </div>
          <div className="flex flex-col gap-y-3 bg-white p-3 shadow lg:col-start-3 lg:col-end-4">
            <p className="font-semibold">Calendar</p>
            <Calendar calendarType="gregory" />
          </div>
          <div className="flex flex-col gap-y-3 bg-white p-3 shadow">
            <p className="font-semibold">Today&apos;s Tasks</p>
            {tasksDueToday}
          </div>
          <div className="flex flex-col gap-y-3 bg-white p-3 shadow">
            <p className="font-semibold">Upcoming Tasks</p>
            {upcomingTasks}
          </div>
          <div className="flex flex-col gap-y-3 bg-white p-3 shadow">
            <p className="font-semibold">Course Progress</p>
            {courseProgress}
          </div>
        </div>
      </section>
    );
  }
  return (
    <>
      <Head>
        <title>TaskSculpt | Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>{content}</Layout>
    </>
  );
}

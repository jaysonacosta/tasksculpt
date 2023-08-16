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

  let overview;

  if (courseIsSuccess && taskIsSuccess) {
    if (courseData.length === 0 && taskData.length === 0) {
      overview = (
        <div>
          <p>
            Nothing to see here. Add your first course and task to get started!
          </p>
        </div>
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
          <Button type="success">Add Task</Button>
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
          <div className="bg-white p-3 shadow">Todays tasks</div>
          <div className="bg-white p-3 shadow">Upcoming assignments</div>
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

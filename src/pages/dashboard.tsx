import Button from "@/components/Button/Button";
import Overview from "@/components/dashboard/Overview/Overview";
import CourseProgress from "@/components/dashboard/CourseProgress";
import TodaysTasks from "@/components/dashboard/TodaysTasks";
import UpcomingTasks from "@/components/dashboard/UpcomingTasks";
import Calendar from "@/components/dashboard/Calendar";
import Layout from "@/layout/Layout";
import { Routes } from "@/types/routes";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Dashboard() {
  const { status, data } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    void router.push(Routes.LOGIN);
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
          <Overview />
          <Calendar />
          <TodaysTasks />
          <UpcomingTasks />
          <CourseProgress />
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

import Layout from "@/layout/Layout";
import { Routes } from "@/types/routes";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

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
      <>
        <h1 className="text-2xl font-bold">Hi, {data.user.name}!</h1>
        <br />
        <section className="text-md grid gap-5 font-semibold md:grid-cols-3">
          <div className="bg-white p-3 shadow md:col-start-1 md:col-end-3">
            Overview
          </div>
          <div className="flex flex-col gap-y-3 bg-white p-3 shadow md:col-start-3 md:col-end-4">
            <p>Calendar</p>
            <Calendar calendarType="gregory" />
          </div>
          <div className="bg-white p-3 shadow">Todays tasks</div>
          <div className="bg-white p-3 shadow">Upcoming assignments</div>
        </section>
      </>
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

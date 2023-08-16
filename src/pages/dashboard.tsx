import { Routes } from "@/types/routes";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Dashboard() {
  const { status } = useSession();
  const router = useRouter();
  console.log(status);
  if (status === "unauthenticated") {
    void router.push(Routes.LOGIN);
  }

  return (
    <>
      <Head>
        <title>TaskSculpt | Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <button
          onClick={() => {
            void signOut();
          }}
        >
          sign out
        </button>
      </main>
    </>
  );
}

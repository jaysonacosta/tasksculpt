import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>TaskSculpt</title>
        <meta name="description" content="TaskSculpt login page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-gradient-to-r from-blue-200 to-cyan-200">
        <div className="container mx-auto grid min-h-screen grid-rows-3 md:grid-cols-2 md:grid-rows-1">
          <div className="grid place-content-center">
            <h1 className="text-6xl font-extrabold text-white drop-shadow-md">
              TaskSculpt
            </h1>
          </div>
          <div className="grid place-content-center">
            <div className="flex flex-col rounded bg-white p-10 items-center">
              <h2 className="text-3xl font-semibold">Welcome</h2>
              <p className="font-semibold text-gray-400">
                Log In to TaskSculpt
              </p>
              <br />
              <hr className="w-full"/>
              <br />
              <button className="rounded bg-green-400 p-4 font-bold text-white w-full">
                Log In
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

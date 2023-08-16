import Button from "@/components/Button/Button";
import Layout from "@/layout";
import { Routes } from "@/types/routes";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Course() {
  const { status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    void router.push(Routes.LOGIN);
  }

  const [courseName, setCourseName] = useState("");
  const [instructorName, setInstructorName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [daysOfWeek, setDaysOfWeek] = useState({
    sunday: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
  });
  const [color, setColor] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    console.log(courseName);
    console.log(instructorName);
    console.log(startDate);
    console.log(endDate);
    console.log(daysOfWeek);
    console.log(color);
    console.log(notes);
  };

  const weekdays = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  let content;

  if (status === "loading") {
    content = <h1>Loading...</h1>;
  } else if (status === "authenticated") {
    content = (
      <section className="flex flex-col gap-y-5">
        <h1 className="text-2xl font-bold">Create New Course</h1>
        <form onSubmit={handleSubmit} className="grid gap-5 lg:grid-cols-3">
          <div className="flex flex-col lg:col-start-1 lg:col-end-2">
            <label htmlFor="course-name" className=" text-gray-700">
              Course Name
            </label>
            <input
              required={true}
              type="text"
              name="course-name"
              className="rounded p-2 shadow"
              onChange={(evt) => {
                setCourseName(evt.target.value);
              }}
              value={courseName}
            />
          </div>
          <div className="flex flex-col lg:col-start-2 lg:col-end-3">
            <label htmlFor="instructor-name" className=" text-gray-700">
              Instructor Name
            </label>
            <input
              required={false}
              type="text"
              name="instructor-name"
              className="rounded p-2 shadow"
              onChange={(evt) => {
                setInstructorName(evt.target.value);
              }}
              value={instructorName}
            />
          </div>
          <div className="flex flex-col lg:col-start-1 lg:col-end-2">
            <label htmlFor="start-date" className=" text-gray-700">
              Start Date
            </label>
            <input
              required={false}
              type="date"
              name="start-date"
              className="rounded p-2 shadow"
              onChange={(evt) => {
                setStartDate(evt.target.value);
              }}
              value={startDate}
            />
          </div>
          <div className="flex flex-col lg:col-start-2 lg:col-end-3">
            <label htmlFor="end-date" className=" text-gray-700">
              End Date
            </label>
            <input
              required={false}
              type="date"
              name="end-date"
              className="rounded p-2 shadow"
              onChange={(evt) => {
                setEndDate(evt.target.value);
              }}
              value={endDate}
            />
          </div>
          <div className="flex flex-col lg:col-start-1 lg:col-end-2">
            <label htmlFor="days-of-week" className=" text-gray-700">
              Days of the Week
            </label>
            {weekdays.map((day) => {
              return (
                <div key={day} className="flex items-center gap-x-5 capitalize">
                  <input
                    required={false}
                    type="checkbox"
                    name="monday"
                    value={day}
                    onChange={(evt) => {
                      setDaysOfWeek((prev) => ({
                        ...prev,
                        [evt.target.value]: evt.target.checked,
                      }));
                    }}
                  />
                  {day}
                </div>
              );
            })}
          </div>
          <div className="flex flex-col lg:col-start-1 lg:col-end-2">
            <label htmlFor="color" className=" text-gray-700">
              Color
            </label>
            <input
              required={true}
              type="color"
              name="color"
              id="color-picker"
              className="rounded p-2 shadow"
              onChange={(evt) => {
                setColor(evt.target.value);
              }}
              value={color}
            />
          </div>
          <div className="flex flex-col lg:col-start-1 lg:col-end-2">
            <label htmlFor="notes" className=" text-gray-700">
              Notes
            </label>
            <textarea
              required={false}
              name="notes"
              className="rounded p-2 shadow"
              onChange={(evt) => {
                setNotes(evt.target.value);
              }}
              value={notes}
            />
          </div>

          <Button className="p-0 lg:col-start-1 lg:col-end-2" type="success">
            <input
              type="submit"
              value="Create"
              className="w-full cursor-pointer p-3"
            />
          </Button>
          <Button className="p-0 lg:col-start-2 lg:col-end-3" type="error">
            <input
              type="reset"
              value="Clear"
              className="w-full cursor-pointer p-3"
            />
          </Button>
        </form>
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

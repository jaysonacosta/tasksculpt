import Button from "@/components/Button/Button";
import Layout from "@/layout";
import { Routes } from "@/types/routes";
import { api } from "@/utils/api";
import { IconLoader } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Task() {
  const { status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    void router.push(Routes.LOGIN);
  }

  const task = api.task.create.useMutation();
  const {
    data: courseData,
    isLoading: courseIsLoading,
    isError: courseIsError,
  } = api.course.getAll.useQuery();

  const [courseId, setCourseId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [estimatedCompletionDate, setEstimatedCompletionDate] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [priority, setPriority] = useState(0);
  const [description, setDescription] = useState("");

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();

    task.mutate({
      courseId,
      dueDate: new Date(dueDate),
      estimatedCompletionDate: new Date(estimatedCompletionDate),
      status: taskStatus,
      priority,
      description: description.length > 0 ? description : undefined,
    });
  };

  let content;

  if (status === "loading" || courseIsLoading) {
    content = <h1>Loading...</h1>;
  } else if (courseIsError) {
    content = <h1>Something went wrong...</h1>;
  } else if (courseData.length === 0) {
    content = (
      <>
        <h1>Create New Task</h1>
        <p>You must create a course before you can create a task!</p>
      </>
    );
  } else if (status === "authenticated") {
    content = (
      <section className="flex flex-col gap-y-5">
        <h1 className="text-2xl font-bold">Create New Task</h1>
        {task.isLoading && (
          <IconLoader className="animate-spin" color="#4299e1" />
        )}
        <form onSubmit={handleSubmit} className="grid gap-5 lg:grid-cols-3">
          <div className="flex flex-col lg:col-start-1 lg:col-end-2">
            <label htmlFor="course-id" className=" text-gray-700">
              Course
            </label>
            <select
              required={true}
              name="course-id"
              className="rounded p-2 shadow"
              onChange={(evt) => {
                setCourseId(evt.target.value);
              }}
              value={courseId}
            >
              {courseData.map((course) => {
                return (
                  <option key={course.id} value={course.id}>
                    {course.courseName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col lg:col-start-1 lg:col-end-2">
            <label htmlFor="due-date" className=" text-gray-700">
              Due Date
            </label>
            <input
              required={true}
              type="date"
              name="due-date"
              className="rounded p-2 shadow"
              onChange={(evt) => {
                setDueDate(evt.target.value);
              }}
              value={dueDate}
            />
          </div>
          <div className="flex flex-col lg:col-start-2 lg:col-end-3">
            <label
              htmlFor="estimated-completion-date"
              className=" text-gray-700"
            >
              Estimated Completion Date
            </label>
            <input
              required={true}
              type="date"
              name="estimated-completion-date"
              className="rounded p-2 shadow"
              onChange={(evt) => {
                setEstimatedCompletionDate(evt.target.value);
              }}
              value={estimatedCompletionDate}
            />
          </div>
          <div className="flex flex-col lg:col-start-1 lg:col-end-2">
            <label htmlFor="status" className=" text-gray-700">
              Status
            </label>
            <select
              name="status"
              required={true}
              className="rounded p-2 shadow"
              onChange={(evt) => {
                setTaskStatus(evt.target.value);
              }}
              value={taskStatus}
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Canceled">Canceled</option>
            </select>
          </div>
          <div className="flex flex-col lg:col-start-2 lg:col-end-3">
            <label htmlFor="priority" className=" text-gray-700">
              Priority
            </label>
            <select
              name="priority"
              required={true}
              className="rounded p-2 shadow"
              onChange={(evt) => {
                setPriority(Number.parseInt(evt.target.value));
              }}
              value={priority}
            >
              <option value={0}>Normal</option>
              <option value={1}>Low</option>
              <option value={2}>Medium</option>
              <option value={3}>High</option>
              <option value={4}>Urgent</option>
            </select>
          </div>
          <div className="flex flex-col lg:col-start-1 lg:col-end-2">
            <label htmlFor="description" className=" text-gray-700">
              Description
            </label>
            <textarea
              required={false}
              name="description"
              className="rounded p-2 shadow"
              onChange={(evt) => {
                setDescription(evt.target.value);
              }}
              value={description}
            />
          </div>

          <Button className="p-0 lg:col-start-1 lg:col-end-2" type="success">
            <input
              type="submit"
              value="Create"
              className="w-full cursor-pointer p-3"
              disabled={task.isLoading}
            />
          </Button>
          <Button className="p-0 lg:col-start-2 lg:col-end-3" type="error">
            <input
              type="reset"
              value="Clear"
              className="w-full cursor-pointer p-3"
              disabled={task.isLoading}
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

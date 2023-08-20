import { createTRPCRouter } from "@/server/api/trpc";
import { taskRouter } from "./routers/taskRouter";
import { courseRouter } from "./routers/courseRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  task: taskRouter,
  course: courseRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

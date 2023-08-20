import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { createDate } from "@/utils/date";

export const taskRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.task.findMany({
      where: { userId: ctx.session.user.id },
    });
  }),
  getAllDueToday: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(10).nullish(),
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { limit, cursor } = input;
      const paginationLimit = limit ?? 5;

      const endOfDay = new Date(createDate().setHours(23, 59, 59, 999));
      const beginningOfDay = new Date(createDate().setHours(0, 0, 0, 0));

      const tasks = await ctx.prisma.task.findMany({
        // Take extra item at end used as the next cursor
        take: paginationLimit + 1,
        where: {
          userId: ctx.session.user.id,
          dueDate: {
            lte: endOfDay,
            gte: beginningOfDay,
          },
        },
        include: {
          course: true,
        },
        cursor: cursor ? { id: cursor } : undefined,
      });

      let nextCursor: typeof cursor | undefined;
      if (tasks.length > paginationLimit) {
        const nextItem = tasks.pop();
        nextCursor = nextItem?.id;
      }

      const taskCount = await ctx.prisma.task.count({
        where: {
          userId: ctx.session.user.id,
          dueDate: {
            lte: endOfDay,
            gte: beginningOfDay,
          },
        },
      });

      const pageCount = Math.ceil(taskCount / paginationLimit);

      return { tasks, nextCursor, pageCount };
    }),
  getAllUpcoming: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(10).nullish(),
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { limit, cursor } = input;
      const paginationLimit = limit ?? 5;

      const tomorrow = new Date(createDate().setHours(24, 0, 0, 0));

      const tasks = await ctx.prisma.task.findMany({
        // Take extra item at end used as the next cursor
        take: paginationLimit + 1,
        where: {
          userId: ctx.session.user.id,
          dueDate: {
            gte: tomorrow,
          },
        },
        include: { course: true },
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          dueDate: "asc",
        },
      });

      let nextCursor: typeof cursor | undefined;
      if (tasks.length > paginationLimit) {
        const nextItem = tasks.pop();
        nextCursor = nextItem?.id;
      }

      const taskCount = await ctx.prisma.task.count({
        where: {
          userId: ctx.session.user.id,
          dueDate: {
            gte: tomorrow,
          },
        },
      });

      const pageCount = Math.ceil(taskCount / paginationLimit);

      return { tasks, nextCursor, pageCount };
    }),
  create: protectedProcedure
    .input(
      z.object({
        courseId: z.string(),
        title: z.string(),
        dueDate: z.date(),
        estimatedCompletionDate: z.date(),
        status: z.string(),
        priority: z.number(),
        description: z.string().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.task.create({
        data: {
          courseId: input.courseId,
          title: input.title,
          dueDate: input.dueDate,
          estimatedCompletionDate: input.estimatedCompletionDate,
          actualCompletionDate: undefined,
          status: input.status,
          priority: input.priority,
          description: input.description,
          userId: ctx.session.user.id,
        },
      });
    }),
});

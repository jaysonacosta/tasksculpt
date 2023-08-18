import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { createDate } from "@/utils/date";

export const taskRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.task.findMany({
      where: { userId: ctx.session.user.id },
    });
  }),
  getAllDueToday: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.task.findMany({
      where: {
        userId: ctx.session.user.id,
        dueDate: {
          lte: new Date(createDate().setHours(23, 59, 59, 999)),
          gte: new Date(createDate().setHours(0, 0, 0, 0)),
        },
      },
      include: {
        course: true,
      },
    });
  }),
  getAllUpcoming: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.task.findMany({
      where: {
        userId: ctx.session.user.id,
        dueDate: {
          gte: new Date(createDate().setHours(24, 0, 0, 0)),
        },
      },
      include: { course: true },
    });
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

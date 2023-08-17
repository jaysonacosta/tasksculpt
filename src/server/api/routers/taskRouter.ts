import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

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
          lte: new Date(new Date().setUTCHours(23, 59, 59, 999)),
          gte: new Date(new Date().setUTCHours(0, 0, 0, 0)),
        },
      },
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

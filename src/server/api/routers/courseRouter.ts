import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const courseRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.course.findMany({
      where: { userId: ctx.session.user.id },
      include: {
        tasks: true,
      },
    });
  }),
  create: protectedProcedure
    .input(
      z.object({
        courseName: z.string(),
        instructorName: z.string().optional(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
        daysOfWeek: z.string().optional(),
        color: z.string(),
        notes: z.string().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.course.create({
        data: {
          courseName: input.courseName,
          instructorName: input.instructorName,
          startDate: input.startDate,
          endDate: input.endDate,
          daysOfWeek: input.daysOfWeek,
          colorCode: input.color,
          notes: input.notes,
          userId: ctx.session.user.id,
        },
      });
    }),
});

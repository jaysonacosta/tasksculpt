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
  getAllPaginated: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(10).nullish(),
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { limit, cursor } = input;
      const paginationLimit = limit ?? 5;

      const courses = await ctx.prisma.course.findMany({
        // Take extra item at end used as the next cursor
        take: paginationLimit + 1,
        where: { userId: ctx.session.user.id },
        include: { tasks: true },
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          tasks: {
            _count: "desc",
          },
        },
      });

      let nextCursor: typeof cursor | undefined;
      if (courses.length > paginationLimit) {
        const nextItem = courses.pop();
        nextCursor = nextItem?.id;
      }

      const courseCount = await ctx.prisma.course.count({
        where: {
          userId: ctx.session.user.id,
        },
      });

      const pageCount = Math.ceil(courseCount / paginationLimit);

      return { courses, nextCursor, pageCount };
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

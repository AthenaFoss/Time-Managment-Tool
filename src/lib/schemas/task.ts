import * as z from "zod"

export const TaskSchema = z.object({
  activity: z
    .string()
    .min(1, {
      message: "Activity is required",
    })
    .max(255, {
      message: "Activity must be less than 255 characters",
    }),
  priority: z
    .number()
    .min(1, {
      message: "Priority is required",
    })
    .min(1, {
      message: "Priority must be at least 1",
    })
    .max(10, {
      message: "Priority must be at most 10",
    }),
  urgent: z.boolean(),
  important: z.boolean(),
  timeUnder5Min: z.boolean(),
})

export type Task = z.infer<typeof TaskSchema>

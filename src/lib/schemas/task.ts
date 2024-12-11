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
  priority: z.enum(["urgent", "important", "normal"], {
    required_error: "Please select a priority level",
  }),
  timeUnder5Min: z.boolean(),
})

export type Task = z.infer<typeof TaskSchema>

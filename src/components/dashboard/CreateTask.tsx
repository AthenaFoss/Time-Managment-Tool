"use client"

import { z } from "zod"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { createTask } from "@/actions/createTask"
import { Checkbox } from "@/components/ui/checkbox"
import { Task, TaskSchema } from "@/lib/schemas/task"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function CreateTaskForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof TaskSchema>>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      activity: "",
      priority: 1,
      urgent: false,
      important: false,
      timeUnder5Min: false,
    },
  })

  const onSubmit = (data: Task) => {
    setIsSubmitting(true)

    createTask(data)
      .then((response) => {
        if (response.success) {
          toast({
            title: "Task created successfully!",
          })
        }
        if (response.error) {
          toast({
            title: "Task creation failed!",
            description: response.error,
            variant: "destructive",
          })
        }
      })
      .catch(() => {
        toast({
          title: "Task creation failed!",
          description: "An error occurred. Please try again.",
          variant: "destructive",
        })
      })
      .finally(() => {
        setIsSubmitting(false)
        form.reset()
      })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Task</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="activity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Activity</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter your activity"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Enter your priority"
                      disabled={isSubmitting}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <FormField
                  control={form.control}
                  name="urgent"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl className="flex items-center justify-center">
                        <Checkbox
                          id="urgent"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Label htmlFor="important">Urgent</Label>
              </div>
              <div className="flex items-center space-x-2">
                <FormField
                  control={form.control}
                  name="important"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl className="flex items-center justify-center">
                        <Checkbox
                          id="important"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Label htmlFor="important">Important</Label>
              </div>
              <div className="flex items-center space-x-2">
                <FormField
                  control={form.control}
                  name="timeUnder5Min"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl className="flex items-center justify-center">
                        <Checkbox
                          id="timeUnder5Min"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Label htmlFor="time">Takes under 5 minutes</Label>
              </div>
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Add Task"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

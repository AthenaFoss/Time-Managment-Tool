"use client"

import { Loader2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { Task, TaskSchema } from "@/lib/schemas/task"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState, useEffect } from "react"

interface CommonTaskFormProps {
  onSubmit: (task: Task) => void
  isSubmitting: boolean
  initialValues?: Task
}

export default function CommonTaskForm({
  onSubmit,
  isSubmitting,
  initialValues,
}: CommonTaskFormProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    activity: initialValues?.activity || "",
    isUrgent: false,
    isImportant: false,
    timeUnder5Min: initialValues?.timeUnder5Min || false,
  })

  const form = useForm<z.infer<typeof TaskSchema>>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      activity: initialValues?.activity || "",
      priority: initialValues?.priority || "normal",
      timeUnder5Min: initialValues?.timeUnder5Min || false,
    },
  })

  // Update priority based on urgency and importance
  useEffect(() => {
    let priority: "urgent" | "important" | "normal" = "normal"
    if (formData.isUrgent && formData.isImportant) {
      priority = "urgent"
    } else if (formData.isImportant) {
      priority = "important"
    }
    form.setValue("priority", priority)
  }, [formData.isUrgent, formData.isImportant, form])

  // Update form values when formData changes
  useEffect(() => {
    form.setValue("activity", formData.activity)
    form.setValue("timeUnder5Min", formData.timeUnder5Min)
  }, [formData, form])

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async () => {
    // Convert our form data to the expected Task format
    const taskData: Task = {
      activity: formData.activity,
      priority: form.getValues().priority,
      timeUnder5Min: formData.timeUnder5Min,
    }
    onSubmit(taskData)
    setStep(1) // Reset to first step after submission
    setFormData({
      activity: "",
      isUrgent: false,
      isImportant: false,
      timeUnder5Min: false,
    })
  }

  return (
    <div className="w-full">
      {/* Progress indicator */}
      <div className="w-full mb-6">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-primary h-3 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Step 1: Activity */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-medium mb-4">
              What task do you want to add?
            </h3>
            <Input
              value={formData.activity}
              onChange={(e) =>
                setFormData({ ...formData, activity: e.target.value })
              }
              placeholder="Enter your task activity"
              className="h-12 text-lg"
              disabled={isSubmitting}
            />
          </div>
          <Button
            className="w-full h-12 mt-6 text-base font-medium"
            onClick={handleNext}
            disabled={!formData.activity.trim()}
          >
            Next
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      )}

      {/* Step 2: Urgency */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-medium mb-6">Is this task urgent?</h3>
            <div className="flex justify-center gap-4">
              <Button
                variant={formData.isUrgent ? "default" : "outline"}
                className="w-32 h-12 text-lg"
                onClick={() => {
                  setFormData({ ...formData, isUrgent: true })
                  handleNext()
                }}
              >
                Yes
              </Button>
              <Button
                variant={!formData.isUrgent ? "default" : "outline"}
                className="w-32 h-12 text-lg"
                onClick={() => {
                  setFormData({ ...formData, isUrgent: false })
                  handleNext()
                }}
              >
                No
              </Button>
            </div>
          </div>
          <div className="flex justify-start">
            <Button
              variant="outline"
              className="h-12 text-base font-medium"
              onClick={handleBack}
            >
              Back
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Importance */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-medium mb-6">
              Is this task important?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                variant={formData.isImportant ? "default" : "outline"}
                className="w-32 h-12 text-lg"
                onClick={() => {
                  setFormData({ ...formData, isImportant: true })
                  handleNext()
                }}
              >
                Yes
              </Button>
              <Button
                variant={!formData.isImportant ? "default" : "outline"}
                className="w-32 h-12 text-lg"
                onClick={() => {
                  setFormData({ ...formData, isImportant: false })
                  handleNext()
                }}
              >
                No
              </Button>
            </div>
          </div>
          <div className="flex justify-start">
            <Button
              variant="outline"
              className="h-12 text-base font-medium"
              onClick={handleBack}
            >
              Back
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Time Duration */}
      {step === 4 && (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-medium mb-6">
              Can this task be completed in 5 minutes?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                variant={formData.timeUnder5Min ? "default" : "outline"}
                className="w-32 h-12 text-lg"
                onClick={() => {
                  setFormData({ ...formData, timeUnder5Min: true })
                  handleSubmit()
                }}
                disabled={isSubmitting}
              >
                Yes
              </Button>
              <Button
                variant={!formData.timeUnder5Min ? "default" : "outline"}
                className="w-32 h-12 text-lg"
                onClick={() => {
                  setFormData({ ...formData, timeUnder5Min: false })
                  handleSubmit()
                }}
                disabled={isSubmitting}
              >
                No
              </Button>
            </div>
          </div>
          <div className="flex justify-start">
            <Button
              variant="outline"
              className="h-12 text-base font-medium"
              onClick={handleBack}
            >
              Back
            </Button>
            {isSubmitting && (
              <div className="flex items-center justify-center ml-4">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="ml-2">Submitting...</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

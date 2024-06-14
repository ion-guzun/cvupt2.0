'use client'
import { TeacherSubmissionFeedbackFormSchema, teacherFeedbackInitialValues } from "@/lib/validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { TeacherFeedback } from "@/types"
import { feedbackSubmission } from "@/lib/actions/teacher.actions"
import { useRouter } from "next/navigation"

type TeacherSubmissionFeedbackFormProps = {
  isGraded?: boolean
  submissionId: string
}



const TeacherSubmissionFeedbackForm = ({submissionId, isGraded}: TeacherSubmissionFeedbackFormProps) => {
  const r = useRouter();
  const form = useForm<z.infer<typeof TeacherSubmissionFeedbackFormSchema>>({
    resolver: zodResolver(TeacherSubmissionFeedbackFormSchema),
    defaultValues: teacherFeedbackInitialValues
  })
 
  async function onSubmit(values: z.infer<typeof TeacherSubmissionFeedbackFormSchema>) {
    // console.log(values)
    const teacherFeedback: TeacherFeedback = {
      feedback: values.feedback,
      grade: values.grade
    }

    try {
      const feedbackedSubmission = await feedbackSubmission(submissionId, teacherFeedback);
      console.log(feedbackedSubmission);
      if(feedbackedSubmission) {
        r.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="feedback"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Give some feedback to the" {...field} disabled={isGraded}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="grade"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Grade the student" {...field} disabled={isGraded}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isGraded}>Submit feedback</Button>
      </form>
    </Form>
  )
}

export default TeacherSubmissionFeedbackForm
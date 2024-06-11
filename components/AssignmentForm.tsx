'use client'
import { assignmentFormSchema, assignmentInitialValues } from "@/lib/validator"
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
import { Textarea } from "./ui/textarea"
import { DatePicker } from "./DatePicker"
import { IAssignment } from "@/lib/database/models/assignment.model"
import { createAssignment } from "@/lib/actions/assignment.actions"
import { useRouter } from "next/navigation"

type AssignmentFormProps = {
    teacherRef: string
    courseRef: string
    type: 'create' | 'update'
}

const AssignmentForm = ({courseRef, teacherRef, type}: AssignmentFormProps) => {
    const r = useRouter();
    const form = useForm<z.infer<typeof assignmentFormSchema>>({
        resolver: zodResolver(assignmentFormSchema),
        defaultValues: assignmentInitialValues
    })

    const handleEndDateSelect = (date: Date | undefined) => {
        form.setValue("deadline", date!); 
    };

    async function onSubmit(values: z.infer<typeof assignmentFormSchema>) {
        const assignment: IAssignment = {
            createdBy: teacherRef,
            courseRef: courseRef,
            title: values.title,
            description: values.description,
            deadline: values.deadline,
            maxGrade: parseInt(values.maxGrade),
            createdAt: new Date() //this can be initiallized as defalt bc the model is handling this 
        }

        if(type === 'create') {
            try {
                const createdAssignment = await createAssignment(assignment);
                if(createdAssignment) {
                    form.reset();
                    r.push('/');
                } 
            } catch (error) {
                console.log(error);
            }
        }
    }
    
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Input assignment name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Input description of the course" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
            control={form.control}
            name="deadline"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <DatePicker onDateSelect={handleEndDateSelect} type="deadline" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
        />

        <FormField
          control={form.control}
          name="maxGrade"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input 
                    placeholder="Input assignment max grade" {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
    
  )
}

export default AssignmentForm
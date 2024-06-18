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
import Link from "next/link"

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
            createdAt: new Date()  
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Assignment</h2>
        
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input 
                  placeholder="Input assignment name" 
                  {...field} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" 
                />
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
                <Textarea 
                  placeholder="Input description of the assignment" 
                  {...field} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" 
                />
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
                    placeholder="Input assignment max grade" 
                    {...field} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className=" text-white font-bold py-2 px-4 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600">
          Submit
        </Button>
        <Link href='/'>
          <Button className="ml-4 bg-slate-500 hover:bg-gray-600">
            Back to dasboard
          </Button>
        </Link>
      </form>
    </Form>
  )
}

export default AssignmentForm;

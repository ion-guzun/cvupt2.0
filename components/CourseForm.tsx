'use client'
import { courseFormSchema, initialValues } from "@/lib/validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Dropdown } from "./Dropdown"

type CourseFormProps = {
  teacherRef: string
  type: 'create' | 'update'
}

const CourseForm = ({ teacherRef, type }: CourseFormProps) => {
  const form = useForm<z.infer<typeof courseFormSchema>>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: initialValues
  })

  const selectedFaculty = useWatch({ control: form.control, name: "forFaculty" });
  const selectedSpeciality = useWatch({ control: form.control, name: "forMajor" });

  function onSubmit(values: z.infer<typeof courseFormSchema>) {
    console.log(values)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white p-10 rounded shadow-md w-full max-w-lg space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Input course name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="forFaculty"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Dropdown 
                    onChangeHandler={field.onChange} 
                    value={field.value}
                    type="faculty"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="forMajor"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Dropdown 
                    onChangeHandler={field.onChange} 
                    value={field.value}
                    type="speciality"
                    disabled={!selectedFaculty}
                    selectedFaculty={selectedFaculty}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="forYear"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Dropdown 
                    onChangeHandler={field.onChange} 
                    value={field.value}
                    type="year"
                    disabled={!selectedSpeciality}
                    selectedSpeciality={selectedSpeciality}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="forSemester"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Dropdown 
                    onChangeHandler={field.onChange} 
                    value={field.value}
                    type="semester"
                    disabled={!selectedSpeciality}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default CourseForm

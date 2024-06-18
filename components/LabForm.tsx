'use client'
import { labFormSchema, labInitialValues } from "@/lib/validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PdfUploader } from "./file-uploaders/PdfUploader"
import { useState } from "react"
import { ILab } from "@/lib/database/models/lab.model"
import { createLab } from "@/lib/actions/lab.actions"
import { useRouter } from "next/navigation"
import { Textarea } from "./ui/textarea"
import Link from "next/link"

type LabFormProps = {
  teacherRef: string
  type: 'create' | 'update'
  courseId: string
}

export const LabForm = ({ teacherRef, type, courseId }: LabFormProps) => {
  const [labPdfUrls, setLabPdfUrls] = useState<string[]>([]);
  const r = useRouter();

  const form = useForm<z.infer<typeof labFormSchema>>({
    resolver: zodResolver(labFormSchema),
    defaultValues: labInitialValues
  });

  async function onSubmit(values: z.infer<typeof labFormSchema>) {
    console.log(values.description);
    const labData: ILab = {
      name: values.name,
      description: values.description,
      courseRef: courseId,
      teachers: [teacherRef],
      labPdfs: labPdfUrls
    }
    if (type === 'create') {
      try {
        const createdLab = await createLab(labData);
        if (createdLab) {
          form.reset();
          r.push('/');
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="relative p-6 bg-white shadow-md rounded-md">
      <Link href='/'>
        <Button className="absolute top-4 left-4 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
          Back to dashboard
        </Button>
      </Link>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">Create Lab</h2>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="Input lab name" {...field} />
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
                  <Textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="Input lab description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="labPdfUrls"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-gray-700">Upload Lab Materials (PDF)</FormLabel>
                <FormControl>
                  <PdfUploader setPdfUrls={setLabPdfUrls} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

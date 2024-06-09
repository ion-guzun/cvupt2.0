'use client'
import { labFormSchema, labInitialValues } from "@/lib/validator"
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
import { PdfUploader } from "./file-uploaders/PdfUploader"
import { useState } from "react"
import { ILab } from "@/lib/database/models/lab.model"
import { createLab } from "@/lib/actions/lab.actions"
import { useRouter } from "next/navigation"


type LabFormProps = {
    teacherRef: string
    type: 'create' | 'update'
    courseId: string
}

export const LabForm = ({teacherRef, type, courseId}: LabFormProps) => {
    const [labPdfUrls, setLabPdfUrls] = useState<string[]>([]); 
    const r = useRouter();

    const form = useForm<z.infer<typeof labFormSchema>>({
        resolver: zodResolver(labFormSchema),
        defaultValues: labInitialValues
    })

    async function onSubmit(values: z.infer<typeof labFormSchema>) {
        const labData: ILab = {
            name: values.name,
            courseRef: courseId,
            teachers: [teacherRef],
            labPdfs: labPdfUrls
        }
        if(type === 'create') {
            try {
                const createdLab = await createLab(labData);
                if(createdLab) {
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Input lab name" {...field} />
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
              <FormControl>
                <PdfUploader setPdfUrls={setLabPdfUrls}/>
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

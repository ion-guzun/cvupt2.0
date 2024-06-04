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
import { DatePicker } from "./DatePicker"
import { ImageUploader } from "./file-uploaders/ImageUploader"
import { useState } from "react"
import { useUploadThing } from "@/utils/uploadthing"
import { createCourse } from "@/lib/actions/course.actions"
import { CreateCourseParams, ICourse } from "@/lib/database/models/course.model"
import { useRouter } from "next/navigation"
import { PdfUploader } from "./file-uploaders/PdfUploader"

type CourseFormProps = {
  teacherRef: string
  type: 'create' | 'update'
}

const CourseForm = ({ teacherRef, type }: CourseFormProps) => {
  const r = useRouter();

  
  //----------------------------IMAGE UPLOADING STATE----------------------------
  const [files, setFiles] = useState<File[]>([]);
  const {startUpload} = useUploadThing('imageUploader');
  //----------------------------IMAGE UPLOADING STATE----------------------------


  //----------------------------PDF UPLAODING STATE-------------------------------

  const [pdfUrls, setPdfUrls] = useState<string[]>([]); 
  //this comes from the child component

  //----------------------------PDF UPLAODING STATE-------------------------------


  const form = useForm<z.infer<typeof courseFormSchema>>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: initialValues
  })

  const selectedFaculty = useWatch({ control: form.control, name: "forFaculty" });
  const selectedSpeciality = useWatch({ control: form.control, name: "forMajor" });

  const handleStartDateSelect = (date: Date | undefined) => {
    form.setValue("startDate", date!); 
  };

  const handleEndDateSelect = (date: Date | undefined) => {
    form.setValue("endDate", date!); 
  };

  async function onSubmit(values: z.infer<typeof courseFormSchema>) {
    //-----------------------IMAGE UPLOADING STUFF------------------------------
    let uploadedImageUrl = values.imageUrl;
    if(files.length > 0) {
      const uploadedImages = await startUpload(files);
      if(!uploadedImages) {
        return
      }
      uploadedImageUrl = uploadedImages[0].url;
      console.log(uploadedImageUrl);
    }
    //-----------------------IMAGE UPLOADING STUFF-------------------------------


    const newCourse: CreateCourseParams = {
      name: values.name,
      createdBy: teacherRef,
      forFaculty: values.forFaculty,
      forMajor: values.forMajor,
      forYear: parseInt(values.forYear),
      forSemester: parseInt(values.forSemester),
      photo: uploadedImageUrl,
      pdfs: pdfUrls,
      startDate: values.startDate,
      endDate: values.endDate
    }

    if(type === 'create') {
      try {
        const createdCourse: ICourse = await createCourse(newCourse);
        if(createdCourse) {
          form.reset();
          r.push('/');
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DatePicker onDateSelect={handleStartDateSelect} type="start" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DatePicker onDateSelect={handleEndDateSelect} type="end" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ImageUploader //forgotted to add uploadthing env's to vercel(
                      onFieldChange={field.onChange}
                      imageUrl={field.value}
                      setFiles={setFiles}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pdfUrls"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PdfUploader setPdfUrls={setPdfUrls}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default CourseForm

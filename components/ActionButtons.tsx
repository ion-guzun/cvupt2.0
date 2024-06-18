'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Corrected the import for useRouter
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteCourseById } from "@/lib/actions/course.actions";
import Link from "next/link";
import { ICourse } from '@/lib/database/models/course.model';
import { ILab } from '@/lib/database/models/lab.model';
import { IAssignment } from '@/lib/database/models/assignment.model';
import { IQuiz } from '@/lib/database/models/quiz.models';
import Image from 'next/image';

type ActionButtonsProps = {
    course: ICourse;
    courseLabs: ILab[];
    courseAssignments: IAssignment[];
    courseExams: IQuiz[];
};

const ActionButtons = ({ course, courseLabs, courseAssignments, courseExams }: ActionButtonsProps) => {
    const router = useRouter();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const handleDelete = async () => {
        const deletedCourse = await deleteCourseById(course._id);
        if (deletedCourse) {
            console.log('Course deleted successfully:', deletedCourse);
            router.push('/'); // Redirect to home or dashboard
        }
    };

    return (
        <div className="p-6 bg-white shadow-md rounded-lg">
            <div className="flex items-center justify-center space-x-3">
                <Image
                    src='/settings.svg'
                    alt='Settings'
                    width={40}
                    height={40}
                />
                <h1 className='text-xl font-semibold'>Available Course Actions</h1>
            </div>
            <h1 className='text-xs text-center my-4'>({course.name})</h1>
            <Alert variant="destructive" className="flex items-start p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
                <div className="flex-shrink-0">
                    <AlertCircle className="h-6 w-6" />
                </div>
                <div className="ml-3">
                    <AlertTitle className="font-semibold">Deleting this course will also delete the following data associated with the course!</AlertTitle>
                    <AlertDescription className="text-sm mt-2">
                        <ul className="list-disc pl-5 mt-1">
                            <li><strong>Course Materials: {course.pdfs?.length || 0} PDF(s)</strong></li>
                            <li><strong>Labs: {courseLabs.length} Lab(s)</strong></li>
                            <li><strong>Assignments: {courseAssignments.length} Assignment(s)</strong> and also their associated submissions</li>
                            <li><strong>Exams: {courseExams.length} Exam(s)</strong> and also their associated submissions</li>
                        </ul>
                    </AlertDescription>
                </div>
            </Alert>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button onClick={() => setIsDeleteDialogOpen(true)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-2 my-2">
                        Delete Course
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>The data is irreversible, are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the course and remove all related data.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                            onClick={handleDelete} 
                            className='bg-red-600 hover:bg-red-700'
                        >
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <div className="mt-4">
                <Alert className="flex items-start p-4 bg-blue-100 border-l-4 border-blue-500 text-blue-700">
                    <div className="flex-shrink-0">
                        <AlertCircle className="h-6 w-6 text-blue-500" />
                    </div>
                    <div className="ml-3">
                        <AlertTitle className="font-semibold">Edit Course Details</AlertTitle>
                        <AlertDescription className="text-sm mt-2">
                            Remember to save changes.
                        </AlertDescription>
                    </div>
                </Alert>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button onClick={() => setIsEditDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2 my-2">
                            Edit Course
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Edit Course Details</AlertDialogTitle>
                            <AlertDialogDescription>
                                Adjust the course information as needed. Ensure all data is correct before saving.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setIsEditDialogOpen(false)}>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                                onClick={() => console.log('Saving changes...')} // Placeholder for actual save function
                                className='bg-blue-600 hover:bg-blue-700'
                            >
                                Save Changes
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
            <Link href='/'>
                <Button className="mt-4 bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded block mx-auto">
                    Back to Dashboard
                </Button>
            </Link>
        </div>
    );
};

export default ActionButtons;

import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from './ui/button';
import Link from 'next/link';
import { utapi } from '@/server/uploadthing';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

type AssignmentCardProps = {
    assignmentObjectId?: string
    createdBy: string;
    title: string;
    description: string;
    deadline: Date;
    createdAt: Date;
};

const formatDate = (date: Date): string => {
    return new Date(date).toLocaleString();
};

const usePersistentState = <T,>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
    const [state, setState] = useState<T>(() => {
        const storedValue = localStorage.getItem(key);
        return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState];
};

export const AssignmentCard = ({ createdBy, title, description, deadline, createdAt, assignmentObjectId }: AssignmentCardProps) => {

    const [submitted, setSubmitted] = usePersistentState<boolean>(`submitted-${assignmentObjectId}`, false);
    const isTeacherEmail = useUser().user?.emailAddresses[0].emailAddress.endsWith('github@gmail.com');
    const isStudentEmail = useUser().user?.emailAddresses[0].emailAddress.endsWith('@student.upt.ro');
    
    const handleSubmission = () => {
        setSubmitted(true);
    };

    const handleLinkClick = (e: any) => {
        if (isStudentEmail && submitted) {
            e.preventDefault();
        }
    };
    
    return (
            <Card className="m-4 shadow-xl">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>Created by: {createdBy}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="break-words whitespace-pre-wrap">
                        {description}
                    </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <p>Deadline: {formatDate(deadline)}</p>
                    <Link href={isStudentEmail ? `/student/submit-within-assignment/${assignmentObjectId}` : `/teacher/view-submmits-within-assignment/${assignmentObjectId}`}
                      onClick={handleLinkClick}
                    >
                        <Button
                            onClick={isStudentEmail ? handleSubmission : undefined}
                            disabled={isStudentEmail && submitted}
                        >
                            {isStudentEmail ? (submitted ? 'Submitted' : 'Submit') : 'View Submits'}
                        </Button>
                    </Link>
                    <p className="text-right text-sm text-gray-500">
                        Created at: {formatDate(createdAt)}
                    </p>
                </CardFooter>
            </Card>
    );
};

export default AssignmentCard;

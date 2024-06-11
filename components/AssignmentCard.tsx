import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

type AssignmentCardProps = {
    createdBy: string;
    title: string;
    description: string;
    deadline: Date;
    createdAt: Date;
};

const formatDate = (date: Date): string => {
    return new Date(date).toLocaleString();
};

export const AssignmentCard = ({ createdBy, title, description, deadline, createdAt }: AssignmentCardProps) => {
    return (
        <Card className="m-4">
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
                <p className="text-right text-sm text-gray-500">
                    Created at: {formatDate(createdAt)}
                </p>
            </CardFooter>
        </Card>
    );
};

export default AssignmentCard;

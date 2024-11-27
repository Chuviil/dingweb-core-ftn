"use client"

import React from 'react';
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ClipboardCheck, Pencil, Trash2} from "lucide-react";
import {format} from "date-fns";
import {Activity} from "@/models/activity";
import {deleteActivity} from "@/controllers/activities.controller";

const ActivitiesTable = ({activities, eventId}: { activities: Activity[], eventId: string }) => {
    const formatDate = (date: Date) => {
        return format(new Date(date), 'MMM dd, yyyy HH:mm');
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Activities</h2>
                <Link
                    href={`/events/${eventId}/new`}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground h-10 px-4 py-2 hover:bg-primary/90"
                >
                    New Activity
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">Name</th>
                        <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">Description</th>
                        <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">Start Date</th>
                        <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">End Date</th>
                        <th className="text-right px-6 py-3 text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {activities.map((activity) => (
                        <tr
                            key={activity.id}
                            className="hover:bg-gray-50 transition-colors"
                        >
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                {activity.name}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                                {activity.description}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                                {formatDate(activity.start_date)}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                                {formatDate(activity.end_date)}
                            </td>
                            <td className="px-6 py-4 text-sm text-right">
                                <div className="flex justify-end gap-2">
                                    <Link
                                        href={`/events/${eventId}/edit/${activity.id}`}
                                    >
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-8 w-8"
                                        >
                                            <Pencil className="h-4 w-4"/>
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={async () => await deleteActivity(activity.id, eventId)}
                                    >
                                        <Trash2 className="h-4 w-4"/>
                                    </Button>
                                    <Link
                                        href={`/events/${eventId}/edit/${activity.id}`}
                                    >
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-8 w-8"
                                        >
                                            <ClipboardCheck className={"h-4 w-4"}/>
                                        </Button>
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {activities.length === 0 && (
                        <tr>
                            <td
                                colSpan={5}
                                className="px-6 py-8 text-center text-sm text-gray-500"
                            >
                                No activities found. Click &#34;New Activity&#34; to create one.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ActivitiesTable;
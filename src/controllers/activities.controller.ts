"use server";

import {z} from "zod";
import newActivityDto from "@/models/new_activity.dto";
import {redirect} from "next/navigation";
import {Activity} from "@/models/activity";

export async function createActivity(activity: z.infer<typeof newActivityDto>) {
    const {name, description, start_date, end_date, event_id} = activity;
    const createdActivity = await fetch(`${process.env.BACKEND_BASE_URL}/activities`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            description,
            start_date: new Date(start_date).toISOString(),
            end_date: new Date(end_date).toISOString(),
            event_id: parseInt(event_id)
        }),
    })

    console.log(await createdActivity.json())
    redirect(`/events/${event_id}`)
}

export async function getActivities(): Promise<Activity[]> {
    const activities = await fetch(`${process.env.BACKEND_BASE_URL}/activities`);
    const activitiesData = await activities.json() as Activity[];
    return activitiesData.map((activity: Activity) => ({
        ...activity,
        start_date: new Date(activity.start_date),
        end_date: new Date(activity.end_date),
    }));
}

export async function getActivitiesByEventId(id: string): Promise<Activity[]> {
    const activities = await fetch(`${process.env.BACKEND_BASE_URL}/events/${id}/activities`);
    const activitiesData = await activities.json() as Activity[];
    return activitiesData.map((activity: Activity) => ({
        ...activity,
        start_date: new Date(activity.start_date),
        end_date: new Date(activity.end_date),
    }));
}

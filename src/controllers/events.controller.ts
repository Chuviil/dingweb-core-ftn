"use server"

import {z} from "zod";
import newEventDto from "@/models/new_event.dto";
import {redirect} from "next/navigation";
import {Event} from "@/models/event";
import {revalidatePath} from "next/cache";

export async function createEvent(event: z.infer<typeof newEventDto>) : Promise<Event> {
    const {title, description, date} = event;
    const createdEvent = await fetch(`${process.env.BACKEND_BASE_URL}/events`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({title, description, start_date: date.from, end_date: date.to}),
    })

    console.log(await createdEvent.json())

    redirect("/events")
}

export async function getEvents() : Promise<Event[]>{
    const events = await fetch(`${process.env.BACKEND_BASE_URL}/events`);
    const eventsData = await events.json() as Event[];
    return eventsData.map((event: Event) => ({
        ...event,
        start_date: new Date(event.start_date),
        end_date: new Date(event.end_date),
    }));
}

export async function deleteEvent(id: number) {
    await fetch(`${process.env.BACKEND_BASE_URL}/events/${id}`, {
        method: "DELETE",
    })

    revalidatePath("/events")
}

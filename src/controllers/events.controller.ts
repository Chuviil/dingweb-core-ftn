"use server"

import {z} from "zod";
import newEventDto from "@/models/new_event.dto";
import {redirect} from "next/navigation";
import {Event} from "@/models/event";
import {revalidatePath} from "next/cache";
import {AnalyzeEventDto} from "@/models/analyze-event.dto";
import {AnalyzedEvent} from "@/models/analyzed-event";

export async function createEvent(event: z.infer<typeof newEventDto>): Promise<Event> {
    const createdEvent = await fetch(`${process.env.BACKEND_BASE_URL}/events`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newEventDto.parse(event)),
    })

    console.log(await createdEvent.json())

    redirect("/events")
}

export async function getEventSimilarity(event: AnalyzeEventDto): Promise<AnalyzedEvent | null> {
    const createdEvent = await fetch(`${process.env.BACKEND_BASE_URL}/events/similar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
    })

    const eventData = await createdEvent.json();

    if (!eventData.mostSimilarEvent) {
        return null;
    }

    return eventData;
}

export async function getEvents(): Promise<Event[]> {
    const events = await fetch(`${process.env.BACKEND_BASE_URL}/events`, {cache: "no-store"});
    const eventsData = await events.json() as Event[];
    return eventsData.map((event: Event) => ({
        ...event,
        date: new Date(event.date),
        createdAt: new Date(event.createdAt),
        updatedAt: new Date(event.updatedAt),
    }));
}

export async function deleteEvent(id: number) {
    await fetch(`${process.env.BACKEND_BASE_URL}/events/${id}`, {
        method: "DELETE",
    })

    revalidatePath("/events")
}

"use server"

import {z} from "zod";
import newEventDto from "@/models/new_event.dto";

export async function createEvent(event: z.infer<typeof newEventDto>) {
    const {title, description, date} = event;
    console.log({title, description, date})
}

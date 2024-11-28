import {z} from "zod";

const newEventDto = z.object({
    title: z.string().min(2).max(40),
    description: z.string().min(2).max(200),
    date: z.date().min(new Date()),
    location: z.string().min(2).max(40),
    locationLat: z.number(),
    locationLon: z.number(),
    tags: z.array(z.string()),
    organizerId: z.number()
})

export default newEventDto;

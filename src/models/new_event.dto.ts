import {z} from "zod";

const newEventDto = z.object({
    title: z.string().min(2).max(40),
    description: z.string().min(2).max(200),
    date: z.object({
            from: z.date(),
            to: z.date(),
        },
        {
            required_error: "Please select a date range",
        }
    ).refine((data) => data.from < data.to, {
        message: "From date must be before to date",
    })
})

export default newEventDto;

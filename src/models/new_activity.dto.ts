import { z } from 'zod';
import { isBefore, addMinutes } from 'date-fns';

const newActivityDto = z.object({
    event_id: z.string(),
    name: z.string().min(2).max(40),
    description: z.string().min(2).max(200),
    start_date: z.string(),
    end_date: z.string(),
}).superRefine((data, ctx) => {
    const { start_date, end_date } = data;

    // Check if the end date is at least 15 minutes after the start date
    if (isBefore(new Date(end_date), addMinutes(new Date(start_date), 15))) {
        ctx.addIssue({
            path: ['end_date'],
            message: 'End date must be at least 15 minutes after start date',
            code: z.ZodIssueCode.custom,
        });
    }
});

export default newActivityDto;
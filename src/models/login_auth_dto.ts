import {z} from 'zod';

const authLoginDto = z.object({
    username: z.string().min(2).max(40),
    password: z.string().min(2).max(40),
})

export default authLoginDto;
import {z} from 'zod'


export const usernameSchema = z.object({
    username: z.string()
    .min(6, 'Username must be atleast 6 charaters.')
    .max(14, "Username can be atmost 14 charaters.")
})
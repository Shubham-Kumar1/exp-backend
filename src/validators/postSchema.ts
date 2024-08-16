import {z} from 'zod'

export const postSchema = z.object({
    title: z.string().min(3),
    content: z.string().min(6),
    authorId: z.string().min(3),
});



// Export schema
export default postSchema;
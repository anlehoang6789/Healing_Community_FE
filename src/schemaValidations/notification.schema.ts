import { z } from "zod";


export const UnreadCountResponseSchema = z.object({
  id: z.string(),
  statusCode: z.number(),
  message: z.string(),
  success: z.boolean(),
  data: z.number(), 
  errors: z.array(z.any()), 
  timestamp: z.string(),
});


export type UnreadCountResponseType = z.infer<typeof UnreadCountResponseSchema>;
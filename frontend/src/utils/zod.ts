import { z } from "zod";

export const BookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  ISBN: z.number().int().positive("ISBN must be a positive integer"),
  pages: z.number().int().positive("Pages must be a positive integer"),
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot exceed 5"),
});

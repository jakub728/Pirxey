import { z } from "zod";
import { Schema, model } from "mongoose";

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

export const BookSearchQuerySchema = z.object({
  title: z.string().optional(),
  author: z.string().optional(),
});

export type BookInput = z.infer<typeof BookSchema>;

const mongooseBookSchema = new Schema<BookInput>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  ISBN: { type: Number, required: true },
  pages: { type: Number, required: true },
  rating: { type: Number, required: true },
});

export const BookModel = model<BookInput>("Book", mongooseBookSchema);

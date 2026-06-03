import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import { BookSchema, BookModel } from "../model/bookSchema.js";
import { validate } from "../middleware/validateZod.js";
import { z } from "zod";

const router = express.Router();

// http://localhost:3000/books//all
router.get("/all", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allBooks = await BookModel.find();

    res.status(200).json(allBooks);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// http://localhost:3000/books/add
router.post(
  "/add",
  validate(BookSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newBook = await BookModel.create(req.body);

      res.status(201).json(newBook);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
);

const SearchQuerySchema = z.object({
  title: z.string().min(1, "Search title cannot be empty"),
});

// http://localhost:3000/books/search/?title=...
router.get(
  "/search",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedQuery = await SearchQuerySchema.parseAsync(req.query);

      const books = await BookModel.find({
        title: { $regex: validatedQuery.title, $options: "i" },
      });

      if (books.length === 0) {
        res.status(404).json({ message: "No books found with this title" });
        return;
      }

      res.status(200).json({ books });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
);

export default router;

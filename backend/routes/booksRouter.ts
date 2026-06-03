import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import { BookSchema, BookModel } from "../model/bookSchema.js";
import { validate } from "../middleware/validateZod.js";
import { z } from "zod";

const router = express.Router();

router.get(
  "/all",
  async (err: any, req: Request, res: Response, next: NextFunction) => {
    try {
      const allBooks = await BookModel.find();

      res.status(200).json(allBooks);
    } catch (error) {
      console.error();
      next({ status: 400, message: err.message });
    }
  },
);

router.post(
  "/add",
  validate(BookSchema),
  async (err: any, req: Request, res: Response, next: NextFunction) => {
    try {
      const newBook = await BookModel.create(req.body);

      res.status(201).json(`Book ${newBook.title} was added`);
    } catch (error) {
      console.error();
      next({ status: 400, message: err.message });
    }
  },
);

const SearchQuerySchema = z.object({
  title: z.string().min(1, "Search title cannot be empty"),
});

router.get(
  "/search",
  async (err: any, req: Request, res: Response, next: NextFunction) => {
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

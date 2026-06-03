import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import { BookSchema, BookModel } from "../model/bookSchema.js";
import { validate } from "../middleware/validateZod.js";
import { BookSearchQuerySchema } from "../model/bookSchema.js";

const router = express.Router();

// http://localhost:3000/books//all
router.get("/all", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedQuery = await BookSearchQuerySchema.parseAsync(req.query);

    const queryFilter: any = {};

    if (validatedQuery.title) {
      queryFilter.title = { $regex: validatedQuery.title, $options: "i" };
    }

    if (validatedQuery.author) {
      queryFilter.author = { $regex: validatedQuery.author, $options: "i" };
    }

    const allBooks = await BookModel.find(queryFilter);

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

export default router;

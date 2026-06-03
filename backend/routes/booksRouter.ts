import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";

const router = express.Router();

router.get(
  "/all",
  async (err: any, req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      console.error();
      next({ status: 400, message: err.message });
    }
  },
);

router.post(
  "/add",
  async (err: any, req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      console.error();
      next({ status: 400, message: err.message });
    }
  },
);

router.get(
  "/search",
  async (err: any, req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      console.error();
      next({ status: 400, message: err.message });
    }
  },
);

export default router;

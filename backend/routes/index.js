import express from "express";
import csrf from "csurf";
import { setupUserController } from "../controllers/index.js";

const csrfProtection = csrf();

export const apiRouter = express.Router();
apiRouter.use(csrfProtection);

setupUserController(apiRouter);

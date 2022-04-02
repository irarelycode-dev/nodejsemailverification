import { Router } from "express";
import {
  authDefault,
  signUpuser,
  verifyUser,
} from "../handlers/auth.handler.js";

const router = Router();

router.route("/").get(authDefault);
router.route("/create-user").post(signUpuser);
router.route("/verify-user").post(verifyUser);

export { router as authRouter };

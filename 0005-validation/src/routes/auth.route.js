import { Router } from "express"
import { registerValidation } from "../validators/auth.validator.js";
import { register } from "../controller/auth.controller.js";

const router = Router();

/* post : /api/auth/register */
router.post("/register", registerValidation, register)

export default router;
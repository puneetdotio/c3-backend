import { body, validationResult} from "express-validator"

export const registerValidation = [
    body("email").exists().withMessage("Email is required").isEmail().withMessage("Invalid email address"),
    body("phone").exists().withMessage("Phone number is required").isMobilePhone("en-IN").withMessage("Invalid phone number"),
    body("password").exists().withMessage("Password is required").trim().isLength({ min: 6 }).withMessage("Password at least 6 characters long"),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Invalid request",
                errors: errors.array(),
            })
        }

        next();
    }
]
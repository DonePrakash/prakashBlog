import {Router} from "express"
import { registerUser, loginUser, logoutUser } from "../controllers/auth.controller.js"
import { upload } from "../middlewares/multer.middleware.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
)
router.route("/register").get(
    verifyJWT,
    asyncHandler((req, res) => {
        res.status(200).json({
            success: true,
            message: "User is logged in",
            user: req.user
        })
    })
)

router.route("/login").post(loginUser)

router.route("/logout").post(
    verifyJWT,
    logoutUser,
)

export default router
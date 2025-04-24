import { Router } from "express";
import { createPost, getAllPosts, getMyPosts, getPostById, updatePost, deletePost, addComment, } from "../controllers/post.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

// Apply authentication middleware to all post routes
// router.use(verifyJWT);

// Create a new post
router.route("/createPost").post(
    verifyJWT,
    upload.fields([
        {
            name: "image", // Example: Allow uploading an image for the post
            maxCount: 1,
        },
    ]),
    asyncHandler(createPost)
);


// Get all posts
router.route("/allPosts").get(verifyJWT,getAllPosts);

// get all posts by a specific user
router.route("/myPosts").get(verifyJWT, getMyPosts);

// Get a single post by ID
router.route("/singlePost/:id").get(getPostById);

// Update a post by ID
router.route("/updatePost/:id").patch(
    upload.fields([
        {
            name: "image", // Example: Allow updating the post's image
            maxCount: 1,
        },
    ]),
    asyncHandler(updatePost)
);

// Delete a post by ID
router.route("/deletePost/:id").delete(asyncHandler(deletePost));

// Add a comment to a post
router.route("/addComment/:id").post(asyncHandler(addComment));

export default router;
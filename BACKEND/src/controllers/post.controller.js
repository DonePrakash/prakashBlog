import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Post } from "../models/post.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// Create a new post
const createPost = asyncHandler(async(req,res) => {
    // Get fields from form-data (not req.body)
    console.log("Request body", req.body)
    console.log("Request files", req.files)
    const { title, content, tags, category } = req.body;

    // Validate required fields
    if(!title || !content || !category) {
        throw new ApiError(400, "Title, content and category are required");
    }

    // Get author from authenticated user
    const author = req.user?._id;
    if(!author){
        throw new ApiError(401, "Unauthorized: User not authenticated");
    }

    // Check image
    if (!req.files || !req.files.image) {
        throw new ApiError(400, "Image is required");
    }

    const imageLocalPath = req.files.image[0].path;
    const image = await uploadOnCloudinary(imageLocalPath);
    
    if (!image?.url) {
        throw new ApiError(500, "Failed to upload image");
    }

    // Create post
    const post = await Post.create({
        title,
        content,
        author,
        tags: tags ? tags.split(",").map(tag => tag.trim()) : [],
        category,
        image: image.url
    });
    console.log("post", post)

    if(!post){
        throw new ApiError(500, "Failed to create post");
    }

    const createdPost = await Post.findById(post._id).populate("author", "username");
    return res.status(201).json(
        new ApiResponse(201, createdPost, "Post created successfully")
    );
});

// Get all posts
const getAllPosts = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Default page 1
    const limit = parseInt(req.query.limit) || 8; // Default 8 posts per page (align with frontend)
    const skip = (page - 1) * limit;

    const posts = await Post.find()
        .populate("author", "username avatar")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    if (!posts || posts.length === 0) {
        throw new ApiError(404, "No posts found");
    }

    const totalPosts = await Post.countDocuments();
    const totalPages = Math.ceil(totalPosts / limit);

    return res.status(200).json(
        new ApiResponse(200, {
            posts,
            currentPage: page,
            totalPages,
            totalPosts,
        }, "Posts fetched successfully")
    );
});

const getMyPosts = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const posts = await Post.find({ author: userId }).populate("author", "username avatar");

    return res.status(200).json(
        new ApiResponse(200, posts, "User's posts fetched successfully")
    );
});

// Get a single post by id
const getPostById = asyncHandler(async(req,res) => {
    const postId =req.params.id;

    const post = await Post.findById(postId).populate("author", 'username avatar')
        
    if(!post){
        throw new ApiError(404, "Post not found")
    }

    return res.status(200).json(
        new ApiResponse(200, post, "Post fetched successfully")
    )
})

// Update a post by id
const updatePost = asyncHandler(async(req,res) => {
    const postId= req.params.id
    const {title, content, tags, category} = req.body

    // validation - check for required fields
    if(
        [title, content, category].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400, "Title content and category all three are required")
    }

    // check if the post exists
    const post = await Post.findById(postId)
    if(!post){
        throw new ApiError(404, "Post not found")
    }

    // Check if the authenticated user is the author of the post
    if (post.author.toString() !== req.user?._id.toString()){
        throw new ApiError(403, "Unauthorized: You are not the author of this post")
    }

    // update the post
    const updatedPost = await Post.findByIdAndUpdate(
        postId,
        {title, content,tags,category},
        {new: true}
    )

    return res.status(200).json(
        new ApiResponse(200, updatedPost, "Post updated successfully")
    )
})

// Delete a post by ID
const deletePost = asyncHandler(async (req, res) => {
    const postId = req.params.id;

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    // Check if the authenticated user is the author of the post
    if (post.author.toString() !== req.user?._id.toString()) {
        throw new ApiError(403, "Unauthorized: You are not the author of this post");
    }

    // Delete the post
    await Post.findByIdAndDelete(postId);

    return res.status(200).json(
        new ApiResponse(200, {}, "Post deleted successfully")
    );
});

// Add a comment to a post
const addComment = asyncHandler(async (req, res) => {
    const postId = req.params.id;
    const { text } = req.body;

    // Validation - check for required fields
    if (!text?.trim()) {
        throw new ApiError(400, "Comment text is required");
    }

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    // Add the comment
    post.comments.push({
        user: req.user?._id, // Assuming the authenticated user is adding the comment
        text,
    });

    const updatedPost = await post.save();

    return res.status(200).json(
        new ApiResponse(200, updatedPost, "Comment added successfully")
    );
});

export {
    createPost,
    getAllPosts,
    getMyPosts,
    getPostById,
    updatePost,
    deletePost,
    addComment,
};
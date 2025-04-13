document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id");
  
    // Step 2: Log the postId to ensure it's correct
    console.log("Fetched Post ID:", postId);
  
    if (!postId) {
      document.getElementById("post-title").textContent = "Post Not Found";
      return;
    }
  
    fetch(`https://blog-backend-6p1z.onrender.com/api/v1/posts/singlePost/${postId}`)
      .then(res => res.json())
      .then(result => {
        const post = result.data;
  
        // Ensure we have the correct post data
        console.log("Fetched Post Data:", post);
  
        // Set post details
        document.getElementById("post-title").textContent = post.title;
        document.getElementById("post-category").textContent = `Category: ${post.category}`;
        
        // Set the post image
        if (post.image) {
          document.getElementById("post-image").src = post.image;  // Make sure it's a valid image URL
        }
  
        document.getElementById("post-content").textContent = post.content;
        document.getElementById("post-tags").textContent = `Tags: ${post.tags.join(", ")}`;
  
        // Set author data
        if (post.author) {
          document.getElementById("author-avatar").src = post.author.avatar;  // Ensure the author avatar URL is correct
          document.getElementById("author-name").textContent = `By ${post.author.username}`;
        }
      })
      .catch(err => {
        console.error("Error fetching post:", err);
        document.getElementById("post-title").textContent = "Something went wrong";
      });
  });
  
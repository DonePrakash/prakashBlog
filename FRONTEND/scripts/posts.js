// Description: This script handles the creation and fetching of blog posts.
document.addEventListener("DOMContentLoaded", () => {
    const createPostForm = document.getElementById("createPostForm");
    const API_BASE_URL = "https://blog-backend-6p1z.onrender.com/api/v1/posts";

    /** 🟢 POST CREATION HANDLING **/
    if (createPostForm) {
        createPostForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            
            const token = localStorage.getItem("token");
            if (!token) {
              console.error("You must be logged in to create a post.");
              alert("You must be logged in to create a post!");
              window.location.href = "signIN_signUP.html";
              return;
            }

            const formData = new FormData(createPostForm);
            const imageFile = document.getElementById("image").files[0];
            if (imageFile) {
                formData.delete("image");
                formData.append("image", imageFile);
            }

            console.log("📝 Creating post with data:", Object.fromEntries(formData.entries()));
            console.log("🔑 Sending token:", token);

            try {
                const response = await fetch(`${API_BASE_URL}/createPost`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                    body: formData,
                });
                
                console.log("Response :", response);
                
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP Error ${response.status}: ${errorText}`);
                }

                console.log("✅ Post created successfully!");
                alert("Your post has been created!");
                window.location.href = "post.html";
            } catch (error) {
                console.error("❌ Error creating post:", error);
                alert("Error creating post. Please try again!");
            }
        });

    }

    /** 🟢 FETCH AND DISPLAY POSTS **/
    const postsContainer = document.getElementById("posts-container");
    const loadMoreBtn = document.getElementById("load-more-btn");

    let currentPage = 1;
    const limit = 8; // Fetch 8 posts per page

    const fetchPosts = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`${API_BASE_URL}/allPosts?page=${currentPage}&limit=${limit}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();
            console.log("📦 Fetched Data:", data);

            if (data.success && Array.isArray(data.data.posts)) {
                appendPosts(data.data.posts); // Pass only the posts array

                // Hide Load More if last page reached
                if (data.data.currentPage >= data.data.totalPages) {
                    loadMoreBtn.style.display = "none";
                } else {
                    loadMoreBtn.style.display = "block";
                }
            } else {
                postsContainer.innerHTML = "<p>No posts found.</p>";
            }
        } catch (err) {
            console.error("❌ Error fetching posts", err);
            postsContainer.innerHTML = "<p>Failed to load posts.</p>";
        }
    };

    const appendPosts = (posts) => {
        if (!Array.isArray(posts)) {
            console.error("❌ appendPosts called with invalid data:", posts);
            return;
        }

        posts.forEach((post) => {
            const card = document.createElement("div");
            card.className = "blog-card";

            const authorName = post.author?.username || "Unknown";
            const authorAvatar = post.author?.avatar || "./images/author.png";
            const createdAt = new Date(post.createdAt).toLocaleDateString();
            const tags = Array.isArray(post.tags) ? post.tags : (post.tags ? post.tags.split(",").map((tag) => tag.trim()) : []);

            const dateObj = new Date(createdAt);
            const formattedDate = dateObj.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            });
            

            const wordsPerMinute = 200;
            const wordCount = post.content.trim().split(/\s+/).length;
            const readTime = Math.ceil(wordCount / wordsPerMinute);

            card.innerHTML = `
                <div class="blog-card-banner">
                    <img 
                      src="${post.image || "./images/blog-1.png"}" 
                      alt="${post.title}" 
                      width="250" 
                      class="blog-banner-img"
                      style="width: 100%; height: 200px; object-fit: cover; object-position: center;">

                </div>
                <div class="blog-content-wrapper">
                    <button class="blog-topic text-tiny">${post.category || "General"}</button>
                    <h3><a href="view_post.html?id=${post._id}" class="h3">${post.title}</a></h3>
                    <p class="blog-text">
                        ${post.content.slice(0, 180)}...
                    </p>
                    <div class="wrapper-flex">
                        <div class="profile-wrapper">
                            <img 
                              src="${authorAvatar}" 
                              alt="${authorName}" 
                              width="50" 
                              height="50"
                              style="border-radius: 50%; object-fit: cover;">

                        </div>
                        <div class="wrapper">
                            <a href="#" class="h4">${authorName}</a>
                            <p class="text-sm">
                                <time datetime="${createdAt}">${formattedDate}</time>
                                <span class="separator"></span>
                                <ion-icon name="time-outline"></ion-icon>
                                <time datetime="PT${readTime}M">${readTime} min</time>
                            </p>
                        </div>
                    </div>
                </div>
            `;

            postsContainer.appendChild(card);
        });
    };

    // Clear posts container on initial load to prevent duplicates
    if (currentPage === 1) {
        postsContainer.innerHTML = "";
    }

    // // Fetch posts on page load
    // fetchPosts();

    // Load More button handler
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", () => {
            currentPage++;
            fetchPosts();
        });
    }
    

    /** 🟢 FETCH MY POSTS **/
    const fetchMyPosts = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
          alert("Please login to view your posts");
          window.location.href = "signIN_signUP.html";
          return;
      }
  
      try {
          const response = await fetch(`${API_BASE_URL}/myPosts`, {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          });
  
          const data = await response.json();
          console.log("🧍‍♂️ My Posts:", data);
  
          if (data.success && Array.isArray(data.data)) {
              postsContainer.innerHTML = ""; // Clear first
              appendPosts(data.data); // Show only user's posts
          } else {
              postsContainer.innerHTML = "<p>You haven't created any posts yet.</p>";
          }
      } catch (err) {
          console.error("❌ Error fetching user's posts", err);
          postsContainer.innerHTML = "<p>Failed to load your posts.</p>";
      }
    };
    

     /** 🟢 REST OF YOUR CODE GOES HERE **/

    const bodyId = document.body.id;

    if (bodyId === "home-page") {
      fetchPosts();
    }

    if (bodyId === "my-posts-page") {
      fetchMyPosts(); // Now it's safe!
    }

    console.log("post.js loaded successfully");

});

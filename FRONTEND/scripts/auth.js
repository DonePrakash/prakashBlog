document.addEventListener("DOMContentLoaded", () => {
    console.log("auth.js loaded successfully");

    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");

    // ✅ Update API Base URL with your deployed backend
    const API_BASE_URL = "https://blog-backend-6p1z.onrender.com/api/v1/users";

    /** 🟢 REGISTER FORM HANDLING **/
    if (registerForm) {
        registerForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("Form submission prevented.");

            try {
                const response = await fetch(`${API_BASE_URL}/register`, {
                    method: "POST",
                    body: new FormData(registerForm),
                    credentials: "include",
                    headers: {
                        "accept": "application/json"
                    },
                });

                console.log("Response:", response);
                const data = await response.json();
                console.log("Data:", data);

                if (!response.ok) {
                    console.log("Registration failed", response.statusText);
                    alert("Registration failed! Try again.");
                    return;
                }

                console.log("Registration successful!");
                alert("Registration successful!");

                // ✅ Redirect to deployed login page
                container.classList.remove("sign-up-mode");
            } catch (err) {
                console.error("Fetch error:", err);
                alert("Network error! Please try again.");
            }
        });
    }

    /** 🟢 LOGIN FORM HANDLING **/
    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            // Get email & password from input fields
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            console.log("Attempting login with:", { email, password });

            try {
                const response = await fetch(`${API_BASE_URL}/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();
                console.log("Login response:", data);

                if (response.ok) {
                    // Extract token safely
                    const token = data.data?.accessToken || data.accessToken;

                    if (token) {
                        localStorage.setItem("token", token);
                        alert("Login successful!");
                        console.log("Login successful!");

                        // ✅ Redirect to homepage
                        window.location.href = "index.html";
                    } else {
                        console.log("Login successful but no token received.");
                        alert("Login successful but something went wrong!");
                    }
                } else {
                    console.log(data.message || "Login failed.");
                    alert(data.message || "Invalid credentials!");
                }
            } catch (error) {
                console.error("Error during login:", error);
                alert("Error during login. Please try again.");
            }
        });
    }

    /** 🖼️ Show selected filenames for avatar & cover image inputs **/
    const avatarInput = document.getElementById("avatar");
    const coverInput = document.getElementById("coverImage");
    const avatarPlaceholder = document.getElementById("avatar-placeholder");
    const coverPlaceholder = document.getElementById("cover-placeholder");

    if (avatarInput && avatarPlaceholder) {
        avatarInput.addEventListener("change", () => {
            avatarPlaceholder.textContent = avatarInput.files[0]?.name || "Avatar";
        });
    }

    if (coverInput && coverPlaceholder) {
        coverInput.addEventListener("change", () => {
            coverPlaceholder.textContent = coverInput.files[0]?.name || "CoverImage(Optional)";
        });
    }


    const sign_in_btn = document.querySelector('#sign-in-btn');
    const sign_up_btn = document.querySelector('#sign-up-btn');
    const container = document.querySelector('.container');

    sign_up_btn.addEventListener('click', () => {
        container.classList.add('sign-up-mode');
    });

    sign_in_btn.addEventListener('click', () => {
        container.classList.remove('sign-up-mode');
    });

});

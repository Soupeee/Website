document.addEventListener("DOMContentLoaded", () => {
    const postsContainer = document.getElementById("postsContainer");
    const newPostForm = document.getElementById("newPostForm");
    const newPostContent = document.getElementById("newPostContent");

    // Retrieve logged-in user's data
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
    const currentUsername = loggedInUser.username || "Guest";
    const currentUserProfilePicture = loggedInUser.profilePicture || "default-avatar.png"; // Default profile picture

    // List of foul words to censor
    const foulWords = ["badword1", "badword2", "badword3"]; // Replace with actual words

    // Function to censor foul words in a string
    const censorContent = (content) => {
        const regex = new RegExp(`\\b(${foulWords.join("|")})\\b`, "gi");
        return content.replace(regex, "****");
    };

    // Load posts from localStorage
    const loadPosts = () => {
        const posts = JSON.parse(localStorage.getItem("posts")) || [];
        postsContainer.innerHTML = ""; // Clear container
        posts.forEach((post) => createPostElement(post, posts));
    };

    // Save posts to localStorage
    const savePosts = (posts) => {
        localStorage.setItem("posts", JSON.stringify(posts));
    };

    // Calculate how long ago a timestamp was
    const timeAgo = (timestamp) => {
        const now = Date.now();
        const diff = now - timestamp;

        if (diff < 60 * 1000) return "just now";
        if (diff < 60 * 60 * 1000) return `${Math.floor(diff / (60 * 1000))} minutes ago`;
        if (diff < 24 * 60 * 60 * 1000) return `${Math.floor(diff / (60 * 60 * 1000))} hours ago`;
        return `${Math.floor(diff / (24 * 60 * 60 * 1000))} days ago`;
    };

    // Create a post element and add it to the container
    const createPostElement = (post, posts) => {
        const postElement = document.createElement("div");
        postElement.className = "post";

        postElement.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                <img src="${post.profilePicture}" alt="Profile Picture" class="profile-pic">
                <div>
                    <strong>${post.username}</strong> - ${timeAgo(post.timestamp)}
                </div>
            </div>
            <p>${post.content}</p>
        `;

        // Add comments section
        const commentsContainer = document.createElement("div");
        commentsContainer.className = "comments";
        post.comments.forEach((comment) => {
            const commentElement = document.createElement("div");
            commentElement.className = "comment";

            commentElement.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                    <img src="${comment.profilePicture}" alt="Profile Picture" class="profile-pic">
                    <div>
                        <small><strong>${comment.username}</strong> - ${timeAgo(comment.timestamp)}</small>
                    </div>
                </div>
                <p>${comment.content}</p>
            `;

            commentsContainer.appendChild(commentElement);
        });

        postElement.appendChild(commentsContainer);

        // Add comment form
        const commentForm = document.createElement("form");
        commentForm.className = "comment-form";

        const commentInput = document.createElement("textarea");
        commentInput.placeholder = "Write a comment...";
        commentForm.appendChild(commentInput);

        const commentButton = document.createElement("button");
        commentButton.type = "submit";
        commentButton.textContent = "Comment";
        commentForm.appendChild(commentButton);

        commentForm.addEventListener("submit", (e) => {
            e.preventDefault();
            let commentText = commentInput.value.trim();
            if (commentText) {
                commentText = censorContent(commentText); // Censor foul words
                post.comments.push({
                    username: currentUsername,
                    profilePicture: currentUserProfilePicture,
                    content: commentText,
                    timestamp: Date.now(),
                });
                savePosts(posts);
                loadPosts();
            }
        });

        postElement.appendChild(commentForm);

        postsContainer.appendChild(postElement);
    };

    // Handle new post submission
    newPostForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let content = newPostContent.value.trim();
        if (content) {
            content = censorContent(content); // Censor foul words
            const posts = JSON.parse(localStorage.getItem("posts")) || [];
            posts.push({
                username: currentUsername,
                profilePicture: currentUserProfilePicture,
                content,
                timestamp: Date.now(),
                comments: [],
            });
            savePosts(posts);
            loadPosts();
            newPostContent.value = ""; // Clear input
        }
    });

    // Initial load
    loadPosts();
});
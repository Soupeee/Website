document.addEventListener("DOMContentLoaded", function() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const logoutButton = document.getElementById("logout-button");

    if (!isLoggedIn) {
        logoutButton.style.display = 'none'; // Hide logout button if not logged in
        alert("You must be logged in to access the community page.");
        window.location.href = "login.html"; // Redirect to login page
    } else {
        logoutButton.style.display = 'block'; // Show logout button if logged in
    }

    logoutButton.addEventListener("click", function() {
        localStorage.removeItem("isLoggedIn"); // Remove login status
        alert("You have been logged out."); // Optional: Alert the user
        window.location.href = "login.html"; // Redirect to login page
    });
});

document.getElementById("upload-post-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    const title = document.getElementById("post-title").value;
    const imageInput = document.getElementById("post-image");
    const description = document.getElementById("post-description").value;

    // Create a new post element
    const newPost = document.createElement("div");
    newPost.classList.add("column");

    // Create image element
    const img = document.createElement("img");
    img.src = URL.createObjectURL(imageInput.files[0]); // Create a URL for the uploaded image
    img.alt = title;

    // Create title element
    const postTitle = document.createElement("h3");
    postTitle.textContent = title;

    // Create description element
    const postDescription = document.createElement("p");
    postDescription.textContent = description;

// Create comments section
        const commentsSection = document.createElement("div");
        commentsSection.classList.add("comments-section");

        const commentsList = document.createElement("div");
        commentsList.classList.add("comments-list");
        commentsSection.appendChild(commentsList);

        const commentInput = document.createElement("textarea");
        commentInput.placeholder = "Add a comment...";
        commentsSection.appendChild(commentInput);

        const submitCommentButton = document.createElement("button");
        submitCommentButton.textContent = "Submit Comment";
        commentsSection.appendChild(submitCommentButton);

        // Add event listener for comment submission
        submitCommentButton.addEventListener("click", function() {
            const commentText = commentInput.value.trim();
            if (commentText) {
                const comment = document.createElement("p");
                comment.textContent = commentText;
                commentsList.appendChild(comment);
                commentInput.value = ''; // Clear the input
            } else {
                alert("Please enter a comment before submitting.");
            }
        });

        // Append elements to the new post
        newPost.appendChild(img);
        newPost.appendChild(postTitle);
        newPost.appendChild(postDescription);
        newPost.appendChild(commentsSection);

        // Append the new post to the posts container
        document.querySelector(".posts-container").appendChild(newPost);

        // Clear the form fields
        document.getElementById("upload-post-form").reset();
    });
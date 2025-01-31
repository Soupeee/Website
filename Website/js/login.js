// Simple simulation of login
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("login-form").addEventListener("submit", function(event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Mock credentials for testing
        if (username === "testuser" && password === "password123") {
            alert("Login successful!");
            localStorage.setItem("isLoggedIn", "true"); // Set login status in session storage
            location.href = "community.html"; // Redirect to community page
        } else {
            alert("Invalid username or password.");
        }
    });
});

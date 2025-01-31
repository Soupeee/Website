// script.js
// Example data (replace with data from your backend)
const posts = [
    {
      username: "JohnDoe",
      profilePic: "guest.jpeg",
      content: "This is an example post. Welcome to the community!"
    },
    {
      username: "JaneSmith",
      profilePic: "guest.jpeg",
      content: "Great post! Thanks for sharing."
    }
  ];
  
  const communityPage = document.querySelector('.community-page');
  
  // Function to create a post or comment element
  function createPostElement(post) {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
  
    const userInfo = document.createElement('div');
    userInfo.classList.add('user-info');
  
    const profilePic = document.createElement('img');
    profilePic.src = post.profilePic;
    profilePic.alt = "User  Profile Picture";
    profilePic.classList.add('profile-pic');
  
    const username = document.createElement('span');
    username.textContent = post.username;
    username.classList.add('username');
  
    const content = document.createElement('p');
    content.textContent = post.content;
    content.classList.add('post-content');
  
    userInfo.appendChild(profilePic);
    userInfo.appendChild(username);
    postElement.appendChild(userInfo);
    postElement.appendChild(content);
  
    return postElement;
  }
  
  // Render posts
  posts.forEach(post => {
    const postElement = createPostElement(post);
    communityPage.appendChild(postElement);
  });
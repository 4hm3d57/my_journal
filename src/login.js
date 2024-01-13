// login.js

document.addEventListener('DOMContentLoaded', function () {
  // Add any initialization code here
});

// Function to handle login form submission
function loginUser() {
  // Get form data
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Replace 'http://localhost:3000/api/login' with your actual API endpoint for handling login
  const endpoint = 'http://localhost:3000/login';


  // Create a login object
  const loginData = {
    username: username,
    password: password,
  };

  // Send a POST request to handle login
  fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Login successful:', data);
      // Optionally, you can redirect the user or perform other actions after successful login
    })
    .catch(error => console.error('Error during login:', error));
}


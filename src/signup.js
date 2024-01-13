// signup.js

document.addEventListener('DOMContentLoaded', function () {
  // Add any initialization code here
});

// Function to handle signup form submission
function signupUser() {
  // Get form data
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Replace 'http://localhost:3000/api/signup' with your actual API endpoint for handling signup
  const endpoint = 'http://localhost:3000/signup';

  // Create a signup object
  const signupData = {
    username: username,
    password: password,
  };

  // Send a POST request to handle signup
  fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(signupData),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Signup successful:', data);
      // Optionally, you can redirect the user or perform other actions after successful signup
    })
    .catch(error => console.error('Error during signup:', error));
}


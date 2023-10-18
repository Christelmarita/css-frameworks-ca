import { API_REGISTER_URL } from "../common/constant.mjs";
const registerForm = document.getElementById('register-form');

/**
 * Registers a user by sending a POST request to the API
 * 
 * @param {string} url 
 * @param {object} userData 
 * @returns {promise}
 * @example
 * // Example
 * async function registerUser(url, userData) {
    try {
      const postData = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      };
      const response = await fetch(url, postData);
  
      if (response.ok) {
        window.location.href = 'index.html';
      } else {
        const errorData = await response.json();
        console.error('Error response:', response.status, errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
 */

async function registerUser(url, userData) {
    try {
      const postData = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      };
      const response = await fetch(url, postData);
  
      if (response.ok) {
        window.location.href = 'index.html';
      } else {
        const errorData = await response.json();
        alert('Failed to register user');
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
/**
 * Event listener for the registration form submission. Prevents the default form submission,
 * collects user input data, and calls the registerUser function.
 * @param {Event}
 */

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  

    const userToRegister = {
        name,
        email,
        password,
    };
  
    await registerUser(API_REGISTER_URL, userToRegister);
});
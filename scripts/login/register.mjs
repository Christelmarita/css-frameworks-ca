import { API_REGISTER_URL } from "../common/constant.mjs";
const registerForm = document.getElementById('register-form');

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
        console.log('Error response:', response.status, errorData);
      }
    } catch (error) {
      console.log(error);
    }
  }
  

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
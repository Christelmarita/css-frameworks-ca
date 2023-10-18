import { API_LOGIN_URL } from "../common/constant.mjs";

const loginForm = document.getElementById('login-form');

async function loginUser(url, userData) {
    try {
        const postData = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        };
        const response = await fetch(url, postData);
        const json = await response.json();
        const accessToken = json.accessToken;
        localStorage.setItem('accessToken', accessToken);

        if (accessToken) {
          window.location.href = '../../feed/index.html';
        }
    } catch (error) {
        console.log(error);
    }
}

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    const userToLogin = {
      email,
      password,
    };
  
    await loginUser(API_LOGIN_URL, userToLogin);
});


import { API_LOGIN_URL } from "../common/constant.mjs";
import { errorMessageElement } from "../common/constant.mjs";

const loginForm = document.getElementById('login-form');

/**
 * Logs in a user by sending a POST request with user data to the API.
 * 
 * @param {string} url 
 * @param {object} userData 
 * @returns {promise}
 * @example
 * // Example
 * async function loginUser(url, userData) {
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
        } else {
          errorMessageElement.classList.remove('d-none');
          errorMessageElement.textContent = 'Login failed. Please check your email and password.';
        }
    } catch (error) {
      errorMessageElement.classList.remove('d-none');
      errorMessageElement.textContent = 'An error occurred. Please try again later.';
    }
}
 */
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
        } else {
          errorMessageElement.classList.remove('d-none');
          errorMessageElement.textContent = 'Login failed. Please check your email and password.';
        }
    } catch (error) {
      errorMessageElement.classList.remove('d-none');
      errorMessageElement.textContent = 'An error occurred. Please try again later.';
    }
}

/**
 * Event listener for the login form submission.
 * @param {Event}
 */

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const userToLogin = {
        email,
        password,
    };

    errorMessageElement.textContent = '';

    await loginUser(API_LOGIN_URL, userToLogin);
});

import { API_ALL_POSTS } from "../common/constant.mjs";
import { openEditModal } from "./edit-post.mjs";
import { confirmDelete } from "./delete-post.mjs";

const postContainer = document.querySelector("#post-container");
const searchInput = document.getElementById("search");
const searchButton = document.getElementById("search-button");
const postModal = document.getElementById("postModal");
const modalAuthor = document.getElementById("modalAuthor");
const modalBody = document.getElementById("modalBody");
const modalMedia = document.getElementById("modalMedia");
const closeModalButton = document.getElementById("closeModal");

let data = [];

/**
 * 
 * @param {string} url - Fetches list of posts
 * @returns {Promise<object[]>} - Promise results in array of posts if successfully fetched
 * @example
 * //Example
 * export async function getPosts(url) {
    try {
        const token = localStorage.getItem('accessToken');

        if (!token) {
            console.log('Access token is missing. Redirect to the login page.');
            return;
        }

        const getOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await fetch(API_ALL_POSTS, getOptions);

        if (response.ok) {
            data = await response.json();
            displayPosts(data);
        } else {
            alert('Failed to retrieve posts');
        }
    } catch (error) {
        alert('Failed to retrieve posts');
    }
}

getPosts(API_ALL_POSTS);
 */

export async function getPosts(url) {
    try {
        const token = localStorage.getItem('accessToken');

        if (!token) {
            return;
        }

        const getOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await fetch(API_ALL_POSTS, getOptions);

        if (response.ok) {
            data = await response.json();
            displayPosts(data);
        } else {
            alert('Failed to retrieve posts');
        }
    } catch (error) {
        console.log(error);
    }
}

getPosts(API_ALL_POSTS);

/**
 * 
 * @param {object} post - post object containing body, id, title, author etc
 * @returns {HTMLElement} - returns HTML containing the post
 * @example
 * //Example
 * function createPostHTML(post) {
    const { body, media, created, id, author } = post;

    const card = document.createElement("div");
    card.classList.add("card", "mb-4");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const cardHeader = document.createElement("div");
    cardHeader.classList.add("justify-content-between", "align-items-center", "d-flex");

    const userNameElement = document.createElement("h4");
    userNameElement.classList.add("card-title", "user-name");
    userNameElement.innerText = `@${author.name}`;

    cardHeader.append(userNameElement);
    cardHeader.append(likeButton);

    const cardText = document.createElement("p");
    cardText.classList.add("card-text", "my-3");
    cardText.innerText = body;

    cardBody.append(cardHeader);
    cardBody.append(cardText);
    card.append(cardBody);
    
    return card;
}
 */

function createPostHTML(post) {
    const { body, media, created, id, author } = post;

    const card = document.createElement("div");
    card.classList.add("card", "mb-4");
    card.addEventListener("click", () => {
        openPostModal(post);
    });

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const cardHeader = document.createElement("div");
    cardHeader.classList.add("justify-content-between", "align-items-center", "d-flex");

    const dateContainer = document.createElement("div");

    const userNameElement = document.createElement("h4");
    userNameElement.classList.add("card-title", "user-name");
    userNameElement.innerText = `@${author.name}`;

    const likeButton = document.createElement("button");
    likeButton.classList.add("btn", "btn-link", "like-button");
    likeButton.innerHTML = '<i class="far fa-heart"></i>';

    const postCreated = document.createElement("h6");
    postCreated.classList.add("card-text");
    const createdDate = new Date(created);
    const formattedDateTime = createdDate.toLocaleString('en-GB', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
    postCreated.innerText = formattedDateTime;

    cardHeader.append(userNameElement);
    cardHeader.append(likeButton);

    dateContainer.append(postCreated);

    const cardText = document.createElement("p");
    cardText.classList.add("card-text", "my-3");
    cardText.innerText = body;

    cardBody.append(cardHeader);
    cardBody.append(dateContainer);
    cardBody.append(cardText);

    const editButton = document.createElement("button");
    editButton.classList.add("btn", "btn-outline-secondary", "btn-block", "m-2");
    editButton.innerHTML = 'Edit';
    editButton.addEventListener("click", (event) => {
        event.stopPropagation(); 
        openEditModal(post);
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-outline-danger", "btn-block", "m-2");
    deleteButton.innerHTML = 'Delete';
    deleteButton.addEventListener("click", (event) => {
        event.stopPropagation();
        confirmDelete(post);
    });

    if (media) {
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("text-center", "post-image-container", "my-2");
        imageContainer.style.height = "400px";

        const imageElement = document.createElement("img");
        imageElement.classList.add("post-image", "img-fluid");
        imageElement.style.maxWidth = "100%";
        imageElement.style.maxHeight = "100%";
        imageElement.src = media;

        imageContainer.append(imageElement);
        cardBody.append(imageContainer);
    }

    cardBody.append(editButton);
    cardBody.append(deleteButton);
    card.append(cardBody);
    

    return card;
}

/**
 * 
 * @param {object[]} postsToDisplay - array of objects
 * @example
 * // Example
 * function displayPosts(postsToDisplay) {
    const fragment = document.createDocumentFragment();

    postsToDisplay.forEach((post) => {
        const postHTML = createPostHTML(post);
        fragment.append(postHTML);
    });

    postContainer.innerHTML = '';
    postContainer.append(fragment);
}
 */

function displayPosts(postsToDisplay) {
    const fragment = document.createDocumentFragment();

    postsToDisplay.forEach((post) => {
        const postHTML = createPostHTML(post);
        fragment.append(postHTML);
    });

    postContainer.innerHTML = '';
    postContainer.append(fragment);
}

/**
 * Filters and sorts posts
 */

async function filterPosts() {
    const filterNewest = document.getElementById("newest");
    const filterOldest = document.getElementById("oldest");

    filterNewest.addEventListener("click", (e) => {
        const postsAscending = data.sort(
            (a, b) => new Date(b.created) - new Date(a.created)
        );
        displayPosts(postsAscending);
    });

    filterOldest.addEventListener("click", (e) => {
        const postsDescending = data.sort(
            (a, b) => new Date(a.created) - new Date(b.created)
        );
        displayPosts(postsDescending);
    });
}

filterPosts();

searchButton.addEventListener("click", performSearch);

/**
 * Performs a search on posts based on user input and displays the filtered results
 */
 function performSearch(event) {
    event.preventDefault();
    const searchTerm = searchInput.value.trim().toLowerCase();

    if (searchTerm === "") {
        displayPosts(data);
    } else {
        const filteredPosts = data.filter(post => post.body && post.body.toLowerCase().includes(searchTerm));
        displayPosts(filteredPosts);
    }
}

searchButton.addEventListener("click", performSearch);

/**
 * 
 * @param {object} post - Post object to display in modal
 * @example 
 * //Example
 * function openPostModal(post) {
    modalAuthor.textContent = `${post.author.name}`;
    modalAuthor.classList.add("card-title", "user-name", "h4");
    modalBody.textContent = post.body;
    if (post.media) {
        modalMedia.src = post.media;
        modalMedia.style.display = "block";
        modalMedia.style.maxHeight = "50%";
        modalMedia.style.maxWidth = "50%";
        modalMedia.classList.add("post-image", "img-fluid");
        modalMedia.style.display = "block";
        modalMedia.style.margin = "0 auto";
    } else {
        modalMedia.style.display = "none";
    }
    postModal.style.display = "block";
}
 */
function openPostModal(post) {
    modalAuthor.textContent = `${post.author.name}`;
    modalAuthor.classList.add("card-title", "user-name", "h4");
    modalBody.textContent = post.body;
    if (post.media) {
        modalMedia.src = post.media;
        modalMedia.style.display = "block";
        modalMedia.style.maxHeight = "50%";
        modalMedia.style.maxWidth = "50%";
        modalMedia.classList.add("post-image", "img-fluid");
        modalMedia.style.display = "block";
        modalMedia.style.margin = "0 auto";
    } else {
        modalMedia.style.display = "none";
    }
    postModal.style.display = "block";
}

/**
 * Closes the modal when close button is clicked
 */
closeModalButton.addEventListener("click", () => {
    postModal.style.display = "none";
});

/**
 * Closes modal when clicking outside of modal
 */
window.addEventListener("click", (event) => {
    if (event.target === postModal) {
        postModal.style.display = "none";
    }
});
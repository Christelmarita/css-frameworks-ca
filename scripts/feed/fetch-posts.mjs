import { API_ALL_POSTS } from "../common/constant.mjs";
import { openEditModal } from "./edit-post.mjs";
import { confirmDelete } from "./delete-post.mjs";

const postContainer = document.querySelector("#post-container");
const searchInput = document.getElementById("search");
const searchButton = document.getElementById("search-button");

let data = [];

export async function getPosts(url) {
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
            console.log('Error response:', response.status, await response.json());
        }
    } catch (error) {
        console.log(error);
    }
}

getPosts(API_ALL_POSTS);

function createPostHTML(post) {
    const { body, media, created, id, author } = post;

    const card = document.createElement("div");
    card.classList.add("card", "mb-4");

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

    cardHeader.appendChild(userNameElement);
    cardHeader.appendChild(likeButton);

    dateContainer.appendChild(postCreated);

    const cardText = document.createElement("p");
    cardText.classList.add("card-text", "my-3");
    cardText.innerText = body;

    cardBody.appendChild(cardHeader);
    cardBody.appendChild(dateContainer);
    cardBody.appendChild(cardText);

    const editButton = document.createElement("button");
    editButton.classList.add("btn", "btn-outline-secondary", "btn-block", "my-2", "mr-2");
    editButton.innerHTML = 'Edit';
    editButton.addEventListener("click", () => openEditModal(post));

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-outline-danger", "btn-block", "m-2");
    deleteButton.innerHTML = 'Delete';
    deleteButton.addEventListener("click", () => confirmDelete(post));

    if (media) {
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("text-center", "post-image-container", "my-2");
        imageContainer.style.height = "400px";

        const imageElement = document.createElement("img");
        imageElement.classList.add("post-image", "img-fluid");
        imageElement.style.maxWidth = "100%";
        imageElement.style.maxHeight = "100%";
        imageElement.src = media;

        imageContainer.appendChild(imageElement);
        cardBody.appendChild(imageContainer);
    }

    cardBody.appendChild(editButton);
    cardBody.appendChild(deleteButton);
    card.appendChild(cardBody);
    

    return card;
}


function displayPosts(postsToDisplay) {
    const fragment = document.createDocumentFragment();

    postsToDisplay.forEach((post) => {
        const postHTML = createPostHTML(post);
        fragment.append(postHTML);
    });

    postContainer.innerHTML = '';
    postContainer.append(fragment);
}

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

function performSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();

    if (searchTerm === "") {
        displayPosts(data); 
    } else {
        const filteredPosts = data.filter(post => post.body.toLowerCase().includes(searchTerm));
        displayPosts(filteredPosts);
    }
}
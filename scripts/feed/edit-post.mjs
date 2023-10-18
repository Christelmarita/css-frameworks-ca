import { API_CREATE_POST } from "../common/constant.mjs";

/**
 * Opens a modal for editing a post, pre-filling it with the provided post's data.
 * 
 * @param {object} post - The post object to edit, containing properties like title, body, and media
 */
function openEditModal(post) {
    const modalOverlay = document.getElementById('modal-overlay');
    const modal = document.getElementById("editModal");
    const editTitle = modal.querySelector("#editTitle");
    const editBody = modal.querySelector("#editBody");
    const editMedia = modal.querySelector("#editMedia");
    const modalForm = modal.querySelector("#editForm");

    editTitle.value = post.title;
    editBody.value = post.body;
    editMedia.value = post.media;

    modal.style.display = "block";
    modalOverlay.style.display = "block";

    modalForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const editedPost = {
            title: editTitle.value,
            body: editBody.value,
            media: editMedia.value,
        };

        try {
            const token = localStorage.getItem('accessToken');

            if (!token) {
                return;
            }

            const putOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(editedPost),
            };

            const response = await fetch(`${API_CREATE_POST}/${post.id}`, putOptions);

            if (response.ok) {
                modal.style.display = "none";
                modalOverlay.style.display = "none";
                window.location.reload();
            } else {
                console.log('Error response:', response.status, await response.json());
            }
        } catch (error) {
            console.log(error);
        }
    });

    const closeModal = modal.querySelector("#closeModal");
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
        modalOverlay.style.display = "none";
    });

    modalOverlay.addEventListener("click", (event) => {
        if (event.target === modalOverlay) {
            modal.style.display = "none";
            modalOverlay.style.display = "none";
        }
    });
}

export { openEditModal };

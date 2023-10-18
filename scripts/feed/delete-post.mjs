import { API_CREATE_POST } from "../common/constant.mjs";

/**
 * Prompts the user for confirmation and deletes a post if confirmed
 * 
 * @param {object} post - The post object to delete.
 */
export function confirmDelete(post) {
    if (confirm('Do you really want to delete this post?')) {
        const token = localStorage.getItem('accessToken');

        if (!token) {
            return;
        }

        const deleteOptions = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        fetch(`${API_CREATE_POST}/${post.id}`, deleteOptions)
            .then((response) => {
                if (response.ok) {
                    window.location.reload();
                } else {
                    alert('Failed to delete the post');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('An error occurred while deleting the post');
            });
    }
}

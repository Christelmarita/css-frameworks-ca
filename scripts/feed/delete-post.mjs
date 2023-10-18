import { API_CREATE_POST } from "../common/constant.mjs";

export function confirmDelete(post) {
    if (confirm('Do you really want to delete this post?')) {
        const token = localStorage.getItem('accessToken');

        if (!token) {
            console.log('Access token is missing. Redirect to the login page.');
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
                    console.log('Error response:', response.status);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}
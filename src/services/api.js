const BASE_URL = 'https://cx2tiugwdj.execute-api.eu-north-1.amazonaws.com/prod'; // Uppdatera med korrekt stage

const apiFetch = async (url, options = {}) => {
    try {
        const response = await fetch(`${BASE_URL}${url}`, options); // Lägg till BASE_URL här

        if (!response.ok) {
            let errorMessage = 'Ett fel inträffade vid API-anropet.';
            try {
                const errorResponse = await response.json();
                errorMessage = errorResponse.message || errorMessage;
            } catch (jsonError) {
                console.error('Error parsing JSON error response:', jsonError);
            }
            throw new Error(errorMessage);
        }

        return await response.json();
    } catch (error) {
        console.error('API fetch error:', error);
        throw error;
    }
};

export const getMessages = async (sort = null) => {
    let url = '/messages';
    if (sort) {
        url += `?sort=${sort}`;
    }
    return apiFetch(url);
};

export const postMessage = async (message) => {
    return apiFetch('/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });
};

export const editMessage = async (id, updatedMessage) => {
    const url = `/messages/${id}`;
    return apiFetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMessage),
    });
};

export const getMessagesSorted = async () => {
    return getMessages('date');
};

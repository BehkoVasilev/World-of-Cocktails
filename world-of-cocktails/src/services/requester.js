const request = async (method, token, url, data) => {
    const options = {};
    if (method !== 'GET') {
        options.method = method;

        if (data) {
            options.headers = {
                'Content-Type': 'application/json',
            };

            options.body = JSON.stringify(data);
        }
    };

    if (token) {
        options.headers = {
            ...options.headers,
            'X-Authorization': token,
        }
    };

    try {
        const response = await fetch(url, options);

        if (response.status === 204) {
            return {}
        }

        if (response.status === 404) {
            return []
        }

        if (!response.ok) {
            const errorResponse = await response.json();
            throw errorResponse;
        }
        const result = await response.json();
        return result;
    } catch (error) {
        const message = error.message || 'Network error';
        throw (message);
    }
};

export const requestFactory = (token) => {
    if (!token) {
        const serializedAuth = localStorage.getItem('auth');

        if (serializedAuth) {
            const auth = JSON.parse(serializedAuth);
            token = auth.accessToken;
        }
    }

    return {
        get: request.bind(null, 'GET', token),
        post: request.bind(null, 'POST', token),
        put: request.bind(null, 'PUT', token),
        patch: request.bind(null, 'PATCH', token),
        delete: request.bind(null, 'DELETE', token),
    }
}
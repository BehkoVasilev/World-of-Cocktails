import { requestFactory } from './requester';

const baseUrl = "http://localhost:3030/data/cocktails";


export const cocktailServiceFactory = (token) => {
    const request = requestFactory(token);

    const getOne = async (id) => {
        const result = await request.get(`${baseUrl}/${id}`);

        return result
    }

    const updateOne = async (id, data) => request.put(`${baseUrl}/${id}`, data);

    const getAll = async () => {
        const response = await request.get(baseUrl);

        return Object.values(response);
    };
    const create = async (data) => {
        const result = await request.post(baseUrl, { ...data, likes: 0, likedUsers: [] });
        return result
    };

    const deleteCocktail = (id) => request.delete(`${baseUrl}/${id}`)

    return {
        updateOne,
        getOne,
        getAll,
        create,
        deleteCocktail
    }
};
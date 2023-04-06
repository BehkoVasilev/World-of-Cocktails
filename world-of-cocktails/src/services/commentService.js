import { requestFactory } from "./requester";

const baseUrl = "http://localhost:3030/data/comments";
const request = requestFactory();

export const getAll = async (cocktailId) => {
    const searchQuery = encodeURIComponent(`cocktailId="${cocktailId}"`);
    const relationQuery = encodeURIComponent(`author=_ownerId:users`);

    const result = await request.get(`${baseUrl}?where=${searchQuery}&load=${relationQuery}`);

    const comments = Object.values(result);
    return comments
}

export const create = async (cocktailId, comment) => {
    const result = await request.post(baseUrl, { cocktailId, comment });

    return result
}
import { requestFactory } from "./requester";

const baseUrl = "http://localhost:3030/data/likes";
const request = requestFactory();

export const getAll = async (cocktailId) => {
    const searchQuery = encodeURIComponent(`cocktailId="${cocktailId}"`);
    const result = await request.get(`${baseUrl}?where=${searchQuery}`);

    return result;
};

export const create = async (cocktailId) => {
    const result = await request.post(baseUrl, { cocktailId });
    
    return result;
};
import { createContext, useEffect, useState } from "react";
import { cocktailServiceFactory } from '../services/cocktailService';
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useContexts";

export const CocktailContext = createContext();

export const CocktailContextProvider = ({ children }) => {
    const [cocktails, setCocktails] = useState([]);
    const { token } = useAuthContext();

    const navigate = useNavigate();
    const cocktailService = cocktailServiceFactory(token);

    useEffect(() => {
        cocktailService.getAll()
            .then(result => {
                setCocktails(result)
            })
    }, [])

    const onCreateCocktailSubmit = async (data) => {

        const newCocktail = await cocktailService.create(data);

        setCocktails(state => [...state, newCocktail]);

        navigate('/catalog')
    }

    const onEditCocktailSubmit = async (data) => {
        const editCocktail = await cocktailService.updateOne(data._id, data);

        setCocktails(state => state.map(x => x._id === data._id ? editCocktail : x));

        navigate(`/catalog/${data._id}`)
    }

    const onDeleteClick = async (cocktailId) => {
        await cocktailService.deleteCocktail(cocktailId);

        const updatedCocktails = cocktails.filter(c => c._id !== cocktailId);
        setCocktails(updatedCocktails);

        navigate('/catalog')
    }

    return (
        <CocktailContext.Provider value={{ cocktails, onCreateCocktailSubmit, onEditCocktailSubmit, onDeleteClick }}>
            {children}
        </CocktailContext.Provider>
    )
}
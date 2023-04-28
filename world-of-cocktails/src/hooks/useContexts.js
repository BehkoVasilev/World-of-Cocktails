import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { CocktailContext } from "../contexts/CocktailContext"


export const useAuthContext = () => {
    return useContext(AuthContext)
}

export const useCocktailContext = () => {
    return useContext(CocktailContext)
}
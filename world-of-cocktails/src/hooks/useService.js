import { useAuthContext } from "./useContexts";

export const useService = (serviceFactory) => {
    const { token } = useAuthContext();

    const service = serviceFactory(token);

    return service
}
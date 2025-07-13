import { createContext, useContext } from "react";

export const AppContext = createContext();

export const AppProvider = ({children}) => {
    const value = {
        
    }
    return (<AppContext.Provider>{children}</AppContext.Provider>)
}

export const useAppContext = () => {
    return useContext(AppContext)
}
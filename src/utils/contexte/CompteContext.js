import { createContext, useState } from "react";

export const CompteContext = createContext();

export const CompteContextProvider = (props) => {
    const [isLogged, setIsLogged] = useState(false);

    return (
        <CompteContext.Provider value={{isLogged, setIsLogged}}>{props.children}</CompteContext.Provider>
    )
}
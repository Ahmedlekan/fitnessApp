import { createContext, ReactNode, useContext, useState, Dispatch, SetStateAction } from "react";

type ContextProviderProps = {
    children?: ReactNode
}

type StateContextType = {
    username: String,
    setUsername:(username:any) => void,
  };

const AuthContext = createContext<StateContextType>({} as StateContextType)

const AuthContextProvider = ({children}:ContextProviderProps)=>{
    const [username, setUsername] = useState<String>('')
    return(
        <AuthContext.Provider value={{username, setUsername}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider

export const useAuth = ()=> useContext(AuthContext)



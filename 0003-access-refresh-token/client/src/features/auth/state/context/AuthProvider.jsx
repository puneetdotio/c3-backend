import { useState } from "react";
import { createContext } from "react";

const AuthContext = createContext()

export function useAuthContext() {
    const context = useAuthContext(AuthContext)

    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider")

    }

    return context;
}

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [accessToken, setAccessToken] = useState(null)

    return (
        <AuthContext.Provider value={{user, setUser, accessToken, setAccessToken}}>
            {children}
        </AuthContext.Provider>
    )
}
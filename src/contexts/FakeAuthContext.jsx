import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();
const initialState = {
    user: null,
    isAuthenticated: false,
};

function reducer(state, action) {
    switch (action.type) {
        case "login":
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
            };
        case "logout":
            return {
                ...state,
                user: null,
                isAuthenticated: false,
            };
        default:
            throw new Error("Unknown Action");
    }
}

const FAKE_USER = {
    name: "DZ",
    email: "dszaru@gmail.com",
    password: "zaru#79",
    avatar: "https://i.pravatar.cc/150?img=9",
};

function AuthProvider({ children }) {
    const [{ user, isAuthenticated }, dispatch] = useReducer(
        reducer,
        initialState
    );
    function login(email, password) {
        if (email === FAKE_USER.email && password === FAKE_USER.password)
            dispatch({ type: "login", payload: FAKE_USER });
    }
    function logout() {
        dispatch({type: 'logout'});
    }
    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuthContext() {
    const context = useContext(AuthContext);
    if (context === undefined)
        throw new Error("AuthContext is used outside the AuthProvider");
    return context;
}

export { AuthProvider, useAuthContext };

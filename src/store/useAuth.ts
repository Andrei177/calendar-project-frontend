import { create } from "zustand";

interface AuthState{
    isAuth: boolean;
    setIsAuth: (val : boolean) => void
}

export const useAuth = create<AuthState>(set => (
    {
        isAuth: true, // не забыть заменить на false, так как в начале пользователю доступен только роут регистрации
        // а потом уже когда будет у пользователя будет токен он сможет пройти дальше
        setIsAuth: (val: boolean) => set({isAuth: val})
    }
))
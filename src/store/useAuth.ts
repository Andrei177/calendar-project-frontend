import { create } from "zustand";

interface AuthState{
    isAuth: boolean;
    setIsAuth: (val : boolean) => void
}

export const useAuth = create<AuthState>(set => (
    {
        isAuth: true,
        setIsAuth: (val: boolean) => set({isAuth: val})
    }
))
import { create } from "zustand";

interface LoginState{
    userName: string;
    setUserName: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
}

export const useLogin = create<LoginState>(set => (
    {
        userName: "",
        password: "",
        setUserName: (newUserName: string) => set({userName: newUserName}),
        setPassword: (newPassword: string) => set({password: newPassword})
    }
))
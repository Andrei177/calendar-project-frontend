import { create } from "zustand";

interface UserState{
    id: number;
    email: string;
    setUserName: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
}

export const useUser = create<UserState>(set => (
    {
        id: 0,
        email: "",
        password: "",
        setUserName: (newUserName: string) => set({email: newUserName}),
        setPassword: (newPassword: string) => set({password: newPassword}),
    }
))
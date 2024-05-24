import { create } from "zustand";

interface UserState{
    id: number;
    setId: (id: number) => void;
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
}

export const useUser = create<UserState>(set => (
    {
        id: 0,
        email: "",
        password: "",
        setId: (newId: number) => set({id: newId}),
        setEmail: (newUserName: string) => set({email: newUserName}),
        setPassword: (newPassword: string) => set({password: newPassword}),
    }
))
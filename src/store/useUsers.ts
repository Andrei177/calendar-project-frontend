import { create } from "zustand";
import { IUser } from "../models/IUser";

interface UsersState{
    users: IUser[],
    setUsers: (newUsers: IUser[]) => void
}

export const useUsers = create<UsersState>(set => ({
    users: [],
    setUsers: (newUsers) => set({users: newUsers})
}))
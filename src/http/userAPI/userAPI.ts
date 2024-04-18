import { IUser } from "../../models/IUser";
import { $host } from "../http";

export const registration = async (newUser: IUser) => {
    const {data} = await $host.post("/user/create", newUser);
    localStorage.setItem("token", data.token);
    return data.token;
}

export const login = async (user: IUser) => {
    const {data} = await $host.post("/user/login", user);
    localStorage.setItem("token", data.token);
    return data.token;
}

export const getAllUsers = async () => {
    const token = localStorage.getItem("token");
    const {data} = await $host.get("/user/all",{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    
    return data.users; //возвращает массив зарегистрированных пользователей
}
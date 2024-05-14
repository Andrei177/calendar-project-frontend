import { IUser } from "../../models/IUser";
import { $host } from "../http";

export const registration = async (newUser: IUser) => {
    const {data} = await $host.post("/user/create", newUser);
    localStorage.setItem("token", data.token);
    return data;
}

export const login = async (user: IUser) => {
    const {data} = await $host.post("/user/login", user);
    localStorage.setItem("token", data.token);
    return data;
}

export const getAllUsers = async () => {
    const token = localStorage.getItem("token");
    const {data} = await $host.get("/user/all",{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    
    return data; //возвращает массив зарегистрированных пользователей
}
export const recovery = async (email: string) => { //проверить работоспособность функции
    const {data} = await $host.post("/user/recovery",{email});
    return data;
}
import { IUser } from "../../models/IUser";
import { $host } from "../http";

export const getAllEvents = async () => {
    const token = localStorage.getItem("token");
    const {data} = await $host.get("/calendar", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return data;
}

type parametrsForAddEvent = {
    description: string,
    date: Date | undefined,
    author_id: number,
    invitedUsers: IUser[],
}

export const createEvent = async ({description, date, author_id, invitedUsers}: parametrsForAddEvent) => {
    const token = localStorage.getItem("token");
    const {data} = await $host.post("/calendar/create", {description, date, author_id, invitedUsers},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    return data;
}

export const getUsersByEvent = async (eventsIds: number[]) => {
    const {data} = await $host.post("/calendar/users", {eventsIds});

    return data;
}
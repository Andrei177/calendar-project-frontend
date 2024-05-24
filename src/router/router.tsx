import React from "react"
import Login from "../pages/Login"
import Event from "../pages/Event"
import DateInfo from "../components/DateInfo";

interface IRoute{
    path: string;
    element: React.ReactNode
}

export enum RoutesNames{
    LOGIN="/login",
    EVENT="/calendar",
    SOME_DATE="/calendar/:date"
}

export const publicRoutes:IRoute[] = [
    {path: RoutesNames.LOGIN, element: <Login/>},
]
export const privateRoutes:IRoute[] = [
    {path: RoutesNames.EVENT, element: <Event/>},
    {path: RoutesNames.SOME_DATE, element: <DateInfo/>}
]
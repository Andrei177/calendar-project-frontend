import React from "react"
import Login from "../pages/Login"
import Event from "../pages/Event"

interface IRoute{
    path: string;
    element: React.ReactNode
}

export enum RoutesNames{
    LOGIN="/login",
    EVENT="/"
}

export const publicRoutes:IRoute[] = [
    {path: RoutesNames.LOGIN, element: <Login/>},
]
export const privateRoutes:IRoute[] = [
    {path: RoutesNames.EVENT, element: <Event/>}
]
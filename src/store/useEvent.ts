import { create } from "zustand";
import { IEvent } from "../models/IEvent";

interface EventState{
    events: IEvent[],
    setEvents: (newEvents: IEvent[]) => void
}

export const useEvent = create<EventState>(set => ({
    events: [],
    setEvents: (newEvents: IEvent[]) => set({events: newEvents})
}))
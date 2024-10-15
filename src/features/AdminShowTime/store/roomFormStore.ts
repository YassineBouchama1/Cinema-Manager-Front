import { create } from 'zustand';
import { Room } from '@/types/room'; // Adjust the import path as necessary

interface RoomFormStore {
    currentRoom: Room | null;
    isUpdateMode: boolean;
    resetForm: () => void;
    setCurrentRoom: (room: Room) => void;
    setUpdateMode: (updateMode: boolean) => void;
}

export const useRoomFormStore = create<RoomFormStore>((set) => ({
    currentRoom: null,
    isUpdateMode: false,
    resetForm: () => set({ currentRoom: null, isUpdateMode: false }),
    setCurrentRoom: (room) => set({ currentRoom: room, isUpdateMode: true }),
    setUpdateMode: (updateMode) => set({ isUpdateMode: updateMode }),
}));
type ParkingSlotType = {
    id: string;
    slotNumber: number;
    isEmpty: boolean;
    carNumber: string;
    enterTime: null | number;
    exitTime: null | number;
}

export type {
    ParkingSlotType
}
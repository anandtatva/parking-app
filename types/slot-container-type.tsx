import { ParkingSlotType } from "./parking-slot-type";

export interface SlotContainerType {
    item: ParkingSlotType,
    index: number
    onRemoveCar: (index: number, item: ParkingSlotType) => void
}
import { ParkingSlotType } from "../../types/parking-slot-type";

const mockSlots: ParkingSlotType[] = [
    {
        id: '55bfe613-f4b1-4bbf-8ebf-f8a661b7519c',
        slotNumber: 1,
        isEmpty: true,
        carNumber: '',
        enterTime: null,
        exitTime: null
    },
    {
        id: '81075ab6-823e-44b3-8015-d034df652950',
        slotNumber: 2,
        isEmpty: true,
        carNumber: '',
        enterTime: null,
        exitTime: null
    }
]

const fullMockSlot: ParkingSlotType[] = [
    {
        id: '55bfe613-f4b1-4bbf-8ebf-f8a661b7519c',
        slotNumber: 1,
        isEmpty: false,
        carNumber: 'XZ 08 XZ 0000',
        enterTime: 1656554945,
        exitTime: null
    },
    {
        id: '81075ab6-823e-44b3-8015-d034df652950',
        slotNumber: 2,
        isEmpty: false,
        carNumber: 'XZ 08 XZ 0000',
        enterTime: 1656564945,
        exitTime: null
    }
]

export { mockSlots, fullMockSlot };
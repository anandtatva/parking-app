import { createSlice } from "@reduxjs/toolkit";
import { ParkingSlotType } from "../../types/parking-slot-type";

interface StateProps {
    parkingSlots: ParkingSlotType[];
}
const initialState: StateProps = {
    parkingSlots: []
}

const parkingSlotSlice = createSlice({
    name: "parking-slot",
    initialState,
    reducers: {
        setParkingSlot: (state, action) => {
            state.parkingSlots = action.payload;
        }
    }
})

export const { setParkingSlot } = parkingSlotSlice.actions;

export default parkingSlotSlice.reducer;
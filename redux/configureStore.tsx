import { persistReducer, persistStore } from "redux-persist";
import { combineReducers, createStore } from "redux";
import parkingSlotSlice from "./reducer/parking-slot-slice";
import AsyncStorage from "@react-native-async-storage/async-storage";


const persistConfig = {
    key: "parking-slot",
    storage: AsyncStorage
}

const rootReducers = combineReducers({
    parkingSlot: parkingSlotSlice
})

const slotPersistReducer = persistReducer(persistConfig, rootReducers);

const store = createStore(slotPersistReducer);

const persistor = persistStore(store)

export { store, persistor }
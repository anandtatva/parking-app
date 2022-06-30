import { render, waitFor, act, fireEvent, cleanup } from "@testing-library/react-native";
import CreateSlot from "../../screens/createSlot/createSlot";
import { Provider } from "react-redux";
import { store } from "../../redux/configureStore";
import { setParkingSlot } from "../../redux/reducer/parking-slot-slice";
import { mockSlots, fullMockSlot } from "../../screens/parkingSlot/mock-slots";
import * as Utils from "../../utils/utils";
import { Alert } from "react-native";
import { string } from "../../utils";
import { ParkingSlotType } from "../../types/parking-slot-type";

jest.mock("@react-navigation/native", () => {
    const actualNav = jest.requireActual("@react-navigation/native");
    return {
        ...actualNav,
        useFocusEffect: () => jest.fn(),
        useNavigation: () => ({
            navigate: jest.fn()
        }),
        useRoute: () => ({
            params: {}
        })
    }

})
const spyAlert = jest.spyOn(Alert, 'alert');

describe("Create Parking Slot", () => {
    afterEach(() => {
        jest.clearAllMocks();
        cleanup()
    })
    beforeEach(() => {
        store.dispatch(setParkingSlot([]))
    })
    it("renders correctly", () => {
        const navigation = {
            navigate: jest.fn()
        }
        const tree = render(
            <Provider store={store}>
                <CreateSlot navigation={navigation} />
            </Provider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })
    it("Vaild Number (5): User should be able to enter slot number", async () => {
        const navigation = {
            navigate: jest.fn()
        }
        const SLOT_NUMBER = "5";
        const { getByTestId } = render(
            <Provider store={store}>
                <CreateSlot navigation={navigation} />
            </Provider>
        )
        const slotNoInput = getByTestId("Slot-Number-Input");
        await waitFor(() => {
            fireEvent.changeText(slotNoInput, SLOT_NUMBER);
            expect(slotNoInput.props.value).toBe(SLOT_NUMBER)
        })
    })
    it("InVaild Number (a): User should not be able to enter slot number", async () => {
        const navigation = {
            navigate: jest.fn()
        }
        const SLOT_NUMBER = "a";
        const { getByTestId } = render(
            <Provider store={store}>
                <CreateSlot navigation={navigation} />
            </Provider>
        )
        const slotNoInput = getByTestId("Slot-Number-Input");
        await waitFor(() => {
            fireEvent.changeText(slotNoInput, SLOT_NUMBER);
            expect(slotNoInput.props.value).toBe("0")
        })
    })
    it("Create Slots: On press create slot button", async () => {
        const navigation = {
            navigate: jest.fn()
        }
        const SLOT_NUMBER = "5";
        const { getByTestId } = render(
            <Provider store={store}>
                <CreateSlot navigation={navigation} />
            </Provider>
        )
        const slotNoInput = getByTestId("Slot-Number-Input");
        const createSlotButton = getByTestId("Create-Slot-Button");
        await waitFor(() => {
            fireEvent.changeText(slotNoInput, SLOT_NUMBER);
        })
        fireEvent.press(createSlotButton)
        expect(store.getState().parkingSlot.parkingSlots.length).toBe(5)
    })
    it("Reset Slot: On press reset slot button", async () => {
        const navigation = {
            navigate: jest.fn()
        }
        const SLOT_NUMBER = "5";
        const { getByTestId } = render(
            <Provider store={store}>
                <CreateSlot navigation={navigation} />
            </Provider>
        )
        const slotNoInput = getByTestId("Slot-Number-Input");
        const createSlotButton = getByTestId("Create-Slot-Button");
        await waitFor(() => {
            fireEvent.changeText(slotNoInput, SLOT_NUMBER);
        })
        fireEvent.press(createSlotButton)
        expect(store.getState().parkingSlot.parkingSlots.length).toBe(5)
        const resetSlotButton = getByTestId("Reset-Slot-Button");
        fireEvent.press(resetSlotButton)
        expect(store.getState().parkingSlot.parkingSlots.length).toBe(0)
    })
    it("View Slot: On press view slot button", async () => {
        const navigation = {
            navigate: jest.fn()
        }
        const { getByTestId } = render(
            <Provider store={store}>
                <CreateSlot navigation={navigation} />
            </Provider>
        )
        await act(async () => {
            const viewSlotButton = getByTestId("View-Slot-Button");
            store.dispatch(setParkingSlot(mockSlots))
            expect(store.getState().parkingSlot.parkingSlots.length).toBe(2)
            fireEvent.press(viewSlotButton)
            expect(navigation.navigate).toHaveBeenCalledWith('ParkingSlotScreen');
        })
    })
    it("View Slot: On press view slot button", async () => {
        const navigation = {
            navigate: jest.fn()
        }
        const { getByTestId } = render(
            <Provider store={store}>
                <CreateSlot navigation={navigation} />
            </Provider>
        )
        await act(async () => {
            const viewSlotButton = getByTestId("View-Slot-Button");
            store.dispatch(setParkingSlot(mockSlots))
            expect(store.getState().parkingSlot.parkingSlots.length).toBe(2)
            fireEvent.press(viewSlotButton)
            expect(navigation.navigate).toHaveBeenCalledWith('ParkingSlotScreen');
        })
    })
    it("Add Car in slot: invalid car number -> show error", async () => {
        const navigation = {
            navigate: jest.fn()
        }
        const { getByTestId } = render(
            <Provider store={store}>
                <CreateSlot navigation={navigation} />
            </Provider>
        )
        await act(async () => {
            store.dispatch(setParkingSlot(mockSlots))
            expect(store.getState().parkingSlot.parkingSlots.length).toBe(2)
            const addCarInSlotButton = getByTestId("Add-Car-In-Slot-Button");
            const addCarInSlotInput = getByTestId("Add-Car-In-Slot-Input");
            const carNo = "XZ07ZX9890";
            await waitFor(() => {
                fireEvent.changeText(addCarInSlotInput, carNo)
            })
            expect(addCarInSlotInput.props.value).toBe(carNo)
            jest.spyOn(Utils, "validateCarNumber").mockReturnValue(false)
            fireEvent.press(addCarInSlotButton);
            expect(spyAlert.mock.calls[0][0]).toBe(string.validCarError)
        })
    })
    it("Add Car in slot: slot not available -> show error", async () => {
        const navigation = {
            navigate: jest.fn()
        }
        const { getByTestId } = render(
            <Provider store={store}>
                <CreateSlot navigation={navigation} />
            </Provider>
        )
        await act(async () => {
            store.dispatch(setParkingSlot(fullMockSlot))
            expect(store.getState().parkingSlot.parkingSlots.length).toBe(2)
            const addCarInSlotButton = getByTestId("Add-Car-In-Slot-Button");
            const addCarInSlotInput = getByTestId("Add-Car-In-Slot-Input");
            const carNo = "XZ 07 ZX 9890";
            await waitFor(() => {
                fireEvent.changeText(addCarInSlotInput, carNo)
                expect(addCarInSlotInput.props.value).toBe(carNo)
                jest.spyOn(Utils, "validateCarNumber").mockReturnValue(true)
                fireEvent.press(addCarInSlotButton);
                expect(spyAlert.mock.calls[0][0]).toBe(string.parkingFull)
            })

        })
    })
    it("Add Car in slot: valid car number -> success", async () => {
        const navigation = {
            navigate: jest.fn()
        }
        const { getByTestId } = render(
            <Provider store={store}>
                <CreateSlot navigation={navigation} />
            </Provider>
        )
        await act(async () => {
            store.dispatch(setParkingSlot(mockSlots))
            expect(store.getState().parkingSlot.parkingSlots.length).toBe(2)
            const addCarInSlotButton = getByTestId("Add-Car-In-Slot-Button");
            const addCarInSlotInput = getByTestId("Add-Car-In-Slot-Input");
            const carNo = "XZ 07 ZX 9890";
            await waitFor(() => {
                fireEvent.changeText(addCarInSlotInput, carNo)
                expect(addCarInSlotInput.props.value).toBe(carNo)
                jest.spyOn(Utils, "validateCarNumber").mockReturnValue(true)
                fireEvent.press(addCarInSlotButton);
                const bookedSlot = store.getState().parkingSlot.parkingSlots.filter(({ isEmpty }: ParkingSlotType) => !isEmpty)
                expect(bookedSlot.length).toBe(1)
            })

        })
    })
})
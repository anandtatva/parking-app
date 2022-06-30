import { render, waitFor, act, fireEvent, cleanup } from "@testing-library/react-native";
import ParkingSlots from "../../screens/parkingSlot/parkingSlot";
import { Provider } from "react-redux";
import { store } from "../../redux/configureStore";
import { setParkingSlot } from "../../redux/reducer/parking-slot-slice";
import { mockSlots, fullMockSlot } from "../../screens/parkingSlot/mock-slots";
import * as Utils from "../../utils/utils";
import { Alert } from "react-native";
import { string } from "../../utils";
import { ParkingSlotType } from "../../types/parking-slot-type";
import moment from "moment";

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

describe("View Parking Slot", () => {
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
                <ParkingSlots navigation={navigation} />
            </Provider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })
    it("Empty slot list message", async () => {
        store.dispatch(setParkingSlot([]))
        const navigation = {
            navigate: jest.fn()
        }
        const { getByTestId } = render(
            <Provider store={store}>
                <ParkingSlots navigation={navigation} />
            </Provider>
        )
        const emptySlots = getByTestId("Empty-Slots");
        expect(emptySlots.children[0]).toBe(string.emptySlot)
    })
    it("render slot list", async () => {
        store.dispatch(setParkingSlot(mockSlots))
        const navigation = {
            navigate: jest.fn()
        }
        const { getByTestId } = render(
            <Provider store={store}>
                <ParkingSlots navigation={navigation} />
            </Provider>
        )
        const slot = getByTestId("post-row-1");
        expect(slot).toBeDefined()
    })
    it("Remove Car: alert cancel", async () => {
        store.dispatch(setParkingSlot(fullMockSlot))
        const navigation = {
            navigate: jest.fn()
        }
        const { getByTestId } = render(
            <Provider store={store}>
                <ParkingSlots navigation={navigation} />
            </Provider>
        )
        const slotList = getByTestId("Slot-List");
        expect(slotList).toBeDefined()

        const toClick = getByTestId('post-row-0')
        fireEvent(toClick, 'onLongPress')

        expect(Alert.alert).toHaveBeenCalled();
        // @ts-ignore
        spyAlert.mock.calls[0][2][0].onPress();
    })
    it("Remove Car: alert ok", async () => {
        store.dispatch(setParkingSlot(fullMockSlot))
        const navigation = {
            navigate: jest.fn()
        }
        const { getByTestId } = render(
            <Provider store={store}>
                <ParkingSlots navigation={navigation} />
            </Provider>
        )
        await act(async () => {
            const slotList = getByTestId("Slot-List");
            expect(slotList).toBeDefined()

            const toClick = getByTestId('post-row-0')
            fireEvent(toClick, 'onLongPress')

            expect(Alert.alert).toHaveBeenCalled();
            // @ts-ignore
            spyAlert.mock.calls[0][2][1].onPress();
            const slotDetail: ParkingSlotType = { ...fullMockSlot[0], exitTime: moment().unix() }
            expect(navigation.navigate).toHaveBeenCalledWith("PaymentScreen", { slotDetail })
        })
    })
})
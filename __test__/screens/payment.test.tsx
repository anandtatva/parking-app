import { render, waitFor, act, fireEvent, cleanup } from "@testing-library/react-native";
import Payment from "../../screens/payment/payment";
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
        const slotDetail: ParkingSlotType = { ...fullMockSlot[0], exitTime: moment().unix() }

        const navigation = {
            navigate: jest.fn()
        }
        const tree = render(
            <Provider store={store}>
                <Payment route={{ params: slotDetail }} navigation={navigation} />
            </Provider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })
    it("Amount should be valid", async () => {
        const slotDetail: ParkingSlotType = {
            ...fullMockSlot[0],
            exitTime: moment().unix(),
            enterTime: moment().subtract(315, "minutes").unix(),
        }
        store.dispatch(setParkingSlot([]))
        const navigation = {
            navigate: jest.fn()
        }
        const { getByTestId } = render(
            <Provider store={store}>
                <Payment route={{ params: { slotDetail } }} navigation={navigation} />
            </Provider>
        )
        const totalAmount = getByTestId("Total-Amount");
        const totalTime = getByTestId("Total-Time");
        expect(totalAmount.children[0]).toBe("$50")
        expect(totalTime.children[0]).toBe("5 hours 15 minutes")
    })
    it("payment should be done", async () => {
        const slotDetail: ParkingSlotType = {
            ...fullMockSlot[0],
            exitTime: moment().unix(),
            enterTime: moment().subtract(315, "minutes").unix(),
        }
        store.dispatch(setParkingSlot([]))
        const navigation = {
            navigate: jest.fn(),
            reset: jest.fn()
        }
        const { getByTestId } = render(
            <Provider store={store}>
                <Payment route={{ params: { slotDetail } }} navigation={navigation} />
            </Provider>
        )
        const totalAmount = getByTestId("Total-Amount");
        const totalTime = getByTestId("Total-Time");
        expect(totalAmount.children[0]).toBe("$50")
        expect(totalTime.children[0]).toBe("5 hours 15 minutes")
        const payButton = getByTestId("Pay-Button");
        fireEvent.press(payButton)
        expect(navigation.reset).toHaveBeenCalledWith({ index: 0, routes: [{ name: "CreateSlotScreen" }] })

    })

})
import { cleanup, render, waitFor, fireEvent } from "@testing-library/react-native";
import Button, { ButtonProps } from "../../components/Button";

describe("Button Component", () => {
    it("render correctly", () => {
        const props: ButtonProps = { onPress: jest.fn(), name: "Submit" }
        const tree = render(<Button  {...props} />).toJSON();
        expect(tree).toMatchSnapshot()
    })
    it("Button Must be called on press", () => {
        const props: ButtonProps = {
            testID: "Submit-Button",
            onPress: jest.fn(),
            name: "Submit"
        }
        const { getByTestId } = render(<Button  {...props} />);
        const btn = getByTestId("Submit-Button");
        fireEvent.press(btn)
        expect(props.onPress).toHaveBeenCalled()
    })
})
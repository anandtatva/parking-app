import { msToTime, getDifferenceDate, getDifferenceDateString, validateCarNumber } from "../../utils";
import moment from "moment";

describe("Utils", () => {
    it("msToTime", () => {
        const time = msToTime(1656509305)
        expect(time).toBe("29/06/2022 18:58:25")
    })
    it("Validate Car Number with invalid Car number", () => {
        const isValid = validateCarNumber("1234567890")
        expect(isValid).toBeFalsy()
    })
    it("Validate Car Number with valid Car number", () => {
        const isValid = validateCarNumber("OO 90 VB 0909")
        expect(isValid).toBeTruthy()
    })
    it("getDifferenceDateString", () => {
        const now = moment().subtract(85, "minutes").unix()
        const date = getDifferenceDateString(now)
        expect(date).toBe("1 hours 25 minutes")
    })
    it("getDifferenceDate", () => {
        const inTime = moment().subtract(301, "minutes").unix()
        const { hour } = getDifferenceDate(inTime)
        expect(hour).toBe(6)
    })
})
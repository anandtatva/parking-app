import moment from "moment"
function validateCarNumber(carNumber: string) {
    const pattern = /[A-Z][A-Z] [0-9][0-9] [A-Z][A-Z] [0-9][0-9][0-9][0-9]$/i;
    const re = new RegExp(pattern);
    return re.test(carNumber)
}
function msToTime(time: number) {
    return moment(time * 1000).format("DD/MM/YYYY HH:mm:ss");

}
function getDifferenceDateString(startTime: number) {
    const { hour, minutes } = getDifferenceDate(startTime, true)
    if (hour && minutes)
        return `${hour} hours ${minutes} minutes`
    else if (hour) return `${hour} hour`
    else if (minutes) return `${minutes} minutes`
    else return `${hour} hours`
}
function getDifferenceDate(enterTime: number, status = false) {
    const totalMinutes = moment().diff(moment(enterTime * 1000), "minutes")
    if (!isNaN(totalMinutes) && totalMinutes) {
        const hours = Math.floor(totalMinutes / 60)
        const minutes = totalMinutes % 60;
        if (status)
            return { hour: hours, minutes }
        else
            return { hour: hours + (minutes > 0 && 1 || 0), minutes }
    } else return { hour: 1, minutes: 0 }

}
export {
    validateCarNumber,
    msToTime,
    getDifferenceDateString,
    getDifferenceDate
}
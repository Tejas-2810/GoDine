// format of date => yyyy-MM-dd
const dateStringToMillis = (date) => {
    const dateObj = new Date(date);
    return dateObj.getTime();
}

const millisToDateString = (millis) => {
    const dateObj = new Date(millis);
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = (dateObj.getDay()).toString().padStart(2, '0');

    // format of date string => yyyy-MM-dd
    return `${year}-${month}-${day}`
}

export default {dateStringToMillis, millisToDateString};
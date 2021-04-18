
// Just some helpful date formatting

const theNow = new Date();

const monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
const monthNamesAbbr = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

const weekdayNames = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday' ];
const weekdayNamesAbbr = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri' ];

function ordinalOf(date) {
    let suffix = '';
    if (date === 1 || date === 21 || date === 31) {
        suffix = 'st';
    } else if (date === 2 || date === 22) {
        suffix = 'nd'
    } else if (date === 3 || date === 23) {
        suffix = 'rd'
    } else {
        suffix = 'th'
    }

    return suffix;
}

module.exports = { theNow, monthNames, monthNamesAbbr, weekdayNames, weekdayNamesAbbr, ordinalOf };

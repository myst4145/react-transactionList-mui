function createDate() {
    const now = new Date().toISOString()
    return now.substring(0, now.lastIndexOf('.')).replace('T', ' ')
}

function toFullDate(date) {
    const now = new Date(date)
    const year = now.getFullYear()
    const month = countDate(now.getMonth() + 1)
    const dt = countDate(now.getDate())
    const hour = countDate(now.getHours())
    const minute = countDate(now.getMinutes())
    return `${year}-${month}-${dt} ${hour}:${minute}`
}

function countDate(dt) {
    return dt.toString().length == 2 ? dt : `0${dt}`
}


module.exports = { createDate, toFullDate }
const currentDate = new Date(Date.now())

const getCurrentAge = dob => {
    dob = new Date(Date.parse(dob))
    const dYear = currentDate.getUTCFullYear() - dob.getUTCFullYear()
    const dMonth = currentDate.getMonth() - dob.getMonth()
    const dDay = currentDate.getDay() - dob.getDay()
    return Math.round(dYear + (dMonth / 12) + (dDay/365))
}

export { getCurrentAge }
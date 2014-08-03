/**
 * Отсчет сколько прошло времени
 * @param time
 * @returns {string}
 */
function timeToLate (time) {
    var now, daystoCD, hourstoCD, minutestoCD;
    now = new Date();
    // days
    daystoCD = Math.floor((now.getTime() - time) /
        (1000 * 60 * 60 * 24));
    if (daystoCD > 0) {
        return daystoCD +
            ' дн. назад';
    }
    // hours
    hourstoCD = Math.floor((now.getTime() - time) /
        (1000 * 60 * 60));
    if (hourstoCD > 0) {
        return hourstoCD +
            ' час. назад';
    }
    // minutes
    minutestoCD = Math.floor((now.getTime() - time) /
        (1000 * 60));
    if (minutestoCD > 0) {
        return minutestoCD +
            ' мин. назад';
    }
    return '';
} // timeToLate..

export const readableTime = (intervalTime: number, text: boolean) => {
    const hours = Math.floor(intervalTime / 3600);
    const minutes = Math.floor((intervalTime % 3600) / 60);
    const seconds = Math.floor(intervalTime % 60);
    // if seconds is less than 10 append a zero because that's how humans read

    if (text) {
        return `${hours !== 0 ? `${hours} (hour) ` : ''}
        ${minutes} (mins) 
        ${seconds < 10 ? seconds + '0' : seconds} (secs)`
    }
    else
        return `${hours !== 0 ? `${hours}:` : ''}${minutes}:${seconds < 10 ? seconds + '0' : seconds}`
}

export const calculateWarmUpCoolDown = (warmUpCoolDownYardage: number) => {

    const warmUpYards = Math.floor(warmUpCoolDownYardage * .65 / 100) * 100

    const warmCool: { warmUp: number, coolDown: number, } = {
        warmUp: warmUpYards,
        coolDown: warmUpCoolDownYardage - warmUpYards
    };

    return warmCool;
}

export const intervalWithSpice = (intervalTime: number, spice: string) => {
    let newInterval

    switch (spice) {
        case 'mild':
            newInterval = intervalTime + 10
            break;
        case 'medium':
            newInterval = intervalTime + 5
            break;
        case 'spicy':
            newInterval = intervalTime - 5
            break;
        case 'xSpicy':
            newInterval = intervalTime - 10
            break;
        default:
            newInterval = intervalTime
    }
    return newInterval
}
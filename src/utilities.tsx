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

export const getDrills = (amount: number) => {

    let drills =
        ['Catch Up',
            'Closed Fist',
            'One Arm Free',
            'Fingertip Drag',
            'Heads up Freestyle',
            'Scull',
            '3 Second Glide Free',
            '3 Second Glide Breast',
            'Double Breast Kick',
            'Armpit touch',
            '3 - 4 underwaters off walls']

    /* Randomize array in-place using Durstenfeld shuffle algorithm */
    for (var i = drills.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = drills[i];
        drills[i] = drills[j];
        drills[j] = temp;
    }
    // Only bring the first amount that get randomnly pulled
    const slicedDrills = drills.slice(0, amount);

    return slicedDrills;
}

export const getBreathWorkPattern = (distance: number) => {
    // need to get the distance
    // generate the rounds
    // divide the distance by the round
    // some sort of pattern
    // and how many 
    return
}

export const calculateTime = (time: string | number, offset: number) => {
    const minutes = Math.floor((Number(time) / 60));
    const seconds = Number(time) - minutes * 60 + offset;
    const convertedTime = `${minutes}:${seconds}`

    return convertedTime;
}
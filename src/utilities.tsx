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
            '3/4 underwater kick']

    /* Randomize array in-place using Durstenfeld shuffle algorithm */
    for (var i = drills.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = drills[i];
        drills[i] = drills[j];
        drills[j] = temp;
    }

    return drills.slice(0, amount);
}

export const getBreathWorkPattern = () => {
    const breathingPattern = ['3', '5', '7', '9', '11', 'choice']
    const randomBreathingNumber = Math.floor(Math.random() * 6) + 2;

    for (var i = breathingPattern.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = breathingPattern[i];
        breathingPattern[i] = breathingPattern[j];
        breathingPattern[j] = temp;
    }

    return breathingPattern.slice(0, randomBreathingNumber);
}

export const calculateTime = (time: string | number, offset: number) => {
    const minutes = Math.floor((Number(time) / 60));
    const seconds = Number(time) - minutes * 60 + offset;
    const convertedTime = `${minutes}:${seconds}`

    return convertedTime;
}

export const warmUpCoolDownCalculations = (
    yardage: number,
    percentage: number,
    workoutType: string,
    interval: number) => {
    const warmUpCoolDownYardage = Math.floor(yardage * percentage / 100) * 100

    const warmUpYardage = Math.floor(warmUpCoolDownYardage * .65 / 100) * 100
    const coolDownYardage = warmUpCoolDownYardage - warmUpYardage
    const mainSetYardage = yardage - warmUpYardage - (warmUpCoolDownYardage - warmUpYardage)

    // different type workouts called here
    // switch to decide which one to call
    const mainSetDetails = distanceWorkoutDetails(mainSetYardage, interval)

    const warmCool: { mainSetYardage: number, warmUp: number, coolDown: number, mainSetDetails: any } = {
        mainSetYardage: mainSetYardage,
        warmUp: warmUpYardage,
        coolDown: coolDownYardage,
        mainSetDetails: mainSetDetails
    };

    return warmCool
}

const distanceWorkoutDetails = (mainSetYardage: number, interval: number) => {
    let maxDistance,
        rounds,
        totalDistance,
        random_boolean,
        intervalTime,
        errorMessage

    if (mainSetYardage !== 0) {
        let count: number = 1

        while (true) {
            random_boolean = Math.random() < 0.5; // make some sets have 50s
            maxDistance = ((Math.floor((Math.random() * 7) + 1) * 100))
            if (random_boolean) {
                maxDistance = maxDistance + 50
            }

            rounds = mainSetYardage / maxDistance

            count = count + 1
            if (rounds % 1 === 0 || count === 150) {
                if (count === 150) {
                    console.log('Something is wrong, fix it on your end.')
                    errorMessage = true
                    break;
                }
                errorMessage = false
                break;
            }
        }

        intervalTime = (maxDistance / 100) * (interval)
        totalDistance = maxDistance * rounds

        const mainSetDetails: {
            rounds: number, 
            mainSetYardage: number,
            maxDistance: number, 
            intervalTime: number,
            errorMessage: boolean,
            totalDistance: number
        } = {
            rounds: rounds,
            mainSetYardage: mainSetYardage,
            maxDistance: maxDistance,
            intervalTime: intervalTime,
            errorMessage: errorMessage,
            totalDistance: totalDistance
        };

        return mainSetDetails
    }
}
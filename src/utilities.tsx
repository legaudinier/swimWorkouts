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
    let mainSetDetails

    switch (workoutType) {
        case 'distance':
            mainSetDetails = distanceWorkoutDetails(mainSetYardage, interval)
            break;
        case 'sprint':
            mainSetDetails = sprintWorkoutDetails(mainSetYardage)
            break;
        case 'threshold':
            mainSetDetails = thresholdWorkoutDetails(mainSetYardage, interval)
            break;
        case 'easy':
            mainSetDetails = easyWorkoutDetails(mainSetYardage)
            break;
        default:
        // Code to execute if no cases match
    }
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

const sprintWorkoutDetails = (mainSetYardage: number) => {
    let sprintDistancePerRoundTotal,
        easyDistance,
        sprintRounds,
        rounds,
        sprintYardagePercentage,
        sprintYardage,
        easyYardage,
        sprintDistance,
        errorMessage

    if (mainSetYardage !== 0) {
        let count: number = 1

        while (true) {

            rounds = ((Math.floor((Math.random() * 10) + 5) * 1))
            sprintRounds = ((Math.floor((Math.random() * 6) + 1) * 1))

            sprintYardagePercentage = ((Math.floor((Math.random() * 3) + 5) / 10))
            sprintYardage = mainSetYardage * sprintYardagePercentage
            easyYardage = mainSetYardage - sprintYardage

            sprintDistancePerRoundTotal = sprintYardage / rounds
            sprintDistance = sprintDistancePerRoundTotal / sprintRounds
            easyDistance = easyYardage / rounds
            count = count + 1

            if ((sprintDistance % 50 === 0 && easyDistance % 50 === 0) || count === 150) {
                if (count === 150) {
                    console.log('Something is wrong, fix it on your end.')
                    errorMessage = true
                    break;
                }
                else { errorMessage = false }
                break;
            }
        }

        const mainSetDetails: {
            rounds: number,
            sprintRounds: number,
            sprintDistance: number,
            easyDistance: number,
            errorMessage: boolean,
        } = {
            rounds: rounds,
            sprintRounds: sprintRounds,
            sprintDistance: sprintDistance,
            easyDistance: easyDistance,
            errorMessage: errorMessage,
        };

        return mainSetDetails
    }
}

const thresholdWorkoutDetails = (mainSetYardage: number, interval: number) => {
    let maxDistance,
        rounds,
        random_boolean,
        intervalTime,
        errorMessage

    if (mainSetYardage !== 0) {
        let count: number = 1

        while (true) {
            random_boolean = Math.random() < 0.5; // make some sets have 50s
            maxDistance = ((Math.floor((Math.random() * 2) + 1) * 100))
            if (random_boolean) {
                maxDistance = maxDistance + 50
            }

            rounds = mainSetYardage / maxDistance
            count = count + 1
            intervalTime = (maxDistance / 100) * (interval)

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

        const mainSetDetails: {
            rounds: number,
            intervalTime: number,
            maxDistance: number,
            errorMessage: boolean,
        } = {
            rounds: rounds,
            maxDistance: maxDistance,
            intervalTime: intervalTime,
            errorMessage: errorMessage,
        };

        return mainSetDetails
    }
}

const easyWorkoutDetails = (mainSetYardage: number) => {
    let kickPercentage,
        kickDistance,
        kickRounds,
        pullPercentage,
        pullDistance,
        pullRounds,
        drillPercentage,
        drillDistance,
        drillRounds,
        drills,
        breathPercentage,
        breathDistance,
        breathRounds,
        breathWorkoutPattern,
        breathWorkPatternText,
        errorMessage


    if (mainSetYardage !== 0) {
        let count = 1
        let kickCount = 1
        let pullCount = 1
        let breathCount = 1
        let drillCount = 1

        while (true) {
            kickPercentage = ((Math.floor((Math.random() * 7) + 2)))
            pullPercentage = ((Math.floor((Math.random() * 7) + 2)))
            drillPercentage = ((Math.floor((Math.random() * 7) + 1)))
            breathPercentage = ((Math.floor((Math.random() * 7) + 1)))

            count = count + 1
            // make sure you get a little of each
            if (kickPercentage + pullPercentage + drillPercentage + breathPercentage === 10
                && breathPercentage > 0
                && kickPercentage % 50 === 0
                && pullPercentage % 50 === 0
                && drillPercentage % 50 === 0
                && breathPercentage % 50 === 0
                || count === 650) {
                break;
            }
        }

        kickDistance = kickPercentage * 100
        pullDistance = pullPercentage * 100
        drillDistance = drillPercentage * 100
        breathDistance = mainSetYardage - pullDistance - kickDistance - drillDistance

        while (true) {
            kickCount = kickCount + 1
            kickRounds = ((Math.floor((Math.random() * 9) + 1)))
            if ((kickCount === 650) || ((kickDistance / kickRounds) % 50 === 0)
                && ((kickDistance / kickRounds) % 1 === 0)
                && (kickRounds % 1 === 0)
                && (kickDistance % 50 == 0)) {
                break;
            }
        }

        while (true) {
            pullCount = pullCount + 1
            pullRounds = ((Math.floor((Math.random() * 9) + 1)))
            if (pullCount === 650 || ((pullDistance / pullRounds) % 50 === 0)
                && pullRounds % 1 === 0 && (pullDistance % 50 === 0)) {
                break;
            }

        }

        while (true) {
            drillCount = drillCount + 1
            drillRounds = ((Math.floor((Math.random() * 10) + 1)))
            // NOTE: there are currently 11 drills so we will pick for 11 to use

            drills = getDrills(drillRounds)
            if (drillCount === 650 || ((drillDistance / drillRounds) % 50 === 0)
                && drillRounds % 1 === 0 && drillDistance % 50 === 0) {
                break;
            }
        }

        while (true) {
            breathCount = breathCount + 1
            breathRounds = ((Math.floor((Math.random() * 10) + 1)))
            breathWorkoutPattern = getBreathWorkPattern()
            breathWorkPatternText = '[' + breathWorkoutPattern.join(", ") + ']'

            if (breathCount === 650 ||
                ((breathDistance / breathRounds) % 50 === 0) &&
                ((breathDistance / breathWorkoutPattern.length % 50 === 0)
                    && breathRounds % 1 === 0 && breathDistance % 50 === 0)) {
                break;
            }
        }

        if (kickCount === 650
            || pullCount === 650
            || breathCount === 650
            || drillCount === 650) {
            errorMessage = true
        }

        const mainSetDetails: {
            kickDistance: number,
            kickRounds: number,
            pullDistance: number,
            pullRounds: number,
            drillDistance: number,
            drillRounds: number,
            drills: string[],
            breathDistance: number,
            breathRounds: number,
            breathWorkoutPattern: string[],
            breathWorkPatternText: string,
            errorMessage?: boolean
        } = {
            kickDistance: kickDistance,
            kickRounds: kickRounds,
            pullDistance: pullDistance,
            pullRounds: pullRounds,
            drillDistance: drillDistance,
            drillRounds: drillRounds,
            drills: drills,
            breathDistance: breathDistance,
            breathRounds: breathRounds,
            breathWorkoutPattern: breathWorkoutPattern,
            breathWorkPatternText: breathWorkPatternText,
            errorMessage: errorMessage
        };

        return mainSetDetails
    }
}


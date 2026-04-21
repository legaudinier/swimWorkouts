export const easyWorkoutDetails = (mainSetYardage: number) => {
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

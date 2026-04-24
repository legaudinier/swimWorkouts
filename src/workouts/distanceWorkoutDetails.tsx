export const distanceWorkoutDetails = (mainSetYardage: number, interval: number) => {
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
            maxDistance = ((Math.floor((Math.random() * 8) + 1) * 100))
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

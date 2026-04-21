export const thresholdWorkoutDetails = (mainSetYardage: number, interval: number) => {
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
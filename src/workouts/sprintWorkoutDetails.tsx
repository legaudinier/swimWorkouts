export const sprintWorkoutDetails = (mainSetYardage: number) => {
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
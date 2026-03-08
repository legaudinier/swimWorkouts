
import Box from "@mui/material/Box";
import { readableTime, intervalWithSpice, calculateWarmUpCoolDown } from '../utilities'

export type SprintWorkoutType = {
    type: any
    yardage: any
    interval: any
}

const SprintWorkout = ({
    yardage, interval,
}: SprintWorkoutType) => {

    let sprintDistancePerRoundTotal,
        easyDistance,
        sprintRounds,
        rounds,
        totalDistance,
        wcYardage,
        sprintYardagePercentage,
        sprintYardage,
        easyYardage,
        sprintDistance

    const warmUpCoolDown = Math.floor(yardage * .5 / 100) * 100

    yardage = yardage - warmUpCoolDown

    if (yardage !== 0) {

        let think: string = ''
        let count: number = 1
        let intervalTime, activeYardagePercentage, sprintDistanceInterval

        while (true) {

            rounds = ((Math.floor((Math.random() * 10) + 5) * 1))
            sprintRounds = ((Math.floor((Math.random() * 6) + 1) * 1))

            sprintYardagePercentage = ((Math.floor((Math.random() * 3) + 5) / 10))
            activeYardagePercentage = 1 - sprintYardagePercentage
            sprintYardage = yardage * sprintYardagePercentage
            easyYardage = yardage - sprintYardage

            sprintDistancePerRoundTotal = sprintYardage / rounds
            sprintDistance = sprintDistancePerRoundTotal / sprintRounds
            easyDistance = easyYardage / rounds
            sprintDistanceInterval = sprintDistance / 100

            console.log('Thinking' + think)
            think = think + '.'
            count = count + 1

            if ((sprintDistance % 50 === 0 && easyDistance % 50 === 0) || count === 150) {
                if (count === 150){
                    console.log('Something is wrong, fix it on your end.')
                }
                break;
            }
        }

        intervalTime = intervalWithSpice(interval, spice)

        totalDistance = yardage

        wcYardage = calculateWarmUpCoolDown(warmUpCoolDown)

    }


    return (
        <div>
            <Box sx={{ marginTop: '20px', marginBottom: '20px' }}>*~~~* Sprint Work Out *~~~*</Box>
            <Box>Warm Up: {wcYardage?.warmUp}</Box>
            {/* <Box>Kick set?</Box> */}
            <Box sx={{ marginTop: '15px' }}>Main Set</Box>
            <Box sx={{ display: 'flex', paddingLeft: '40px' }}>
                <Box sx={{
                    paddingRight: '10px', display: 'flex',
                    alignItems: 'center'
                }}>{rounds} x</Box>
                <Box sx={{ paddingLeft: '10px', borderLeft: '1px solid' }}>

                    <Box>{sprintRounds} x {sprintDistance} on
                        Pace: {sprintDistance && readableTime(intervalWithSpice(interval * sprintDistance / 100, spice), false)}
                    </Box>
                    <Box>{easyDistance} easy</Box>
                </Box>
            </Box>
            <Box sx={{ paddingLeft: '40px', marginTop: '15px', marginBottom: '15px' }}>
                <Box>Main Set Distance: {totalDistance}</Box>
                <Box>Main Set Total Time: {sprintDistancePerRoundTotal && rounds !== undefined
                    && readableTime((((sprintDistancePerRoundTotal * rounds) / 100) * (intervalWithSpice(interval, spice))), true)}
                </Box>
            </Box>
            <Box>Cool Down: {wcYardage?.coolDown}</Box>
        </div >
    )
}

export default SprintWorkout


import { Box, Typography } from "@mui/material";
import { readableTime, calculateWarmUpCoolDown } from '../utilities'

export type SprintWorkoutType = {
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
        let count: number = 1

        while (true) {

            rounds = ((Math.floor((Math.random() * 10) + 5) * 1))
            sprintRounds = ((Math.floor((Math.random() * 6) + 1) * 1))

            sprintYardagePercentage = ((Math.floor((Math.random() * 3) + 5) / 10))
            sprintYardage = yardage * sprintYardagePercentage
            easyYardage = yardage - sprintYardage

            sprintDistancePerRoundTotal = sprintYardage / rounds
            sprintDistance = sprintDistancePerRoundTotal / sprintRounds
            easyDistance = easyYardage / rounds
            count = count + 1

            if ((sprintDistance % 50 === 0 && easyDistance % 50 === 0) || count === 150) {
                if (count === 150) {
                    console.log('Something is wrong, fix it on your end.')
                }
                break;
            }
        }

        totalDistance = yardage
        wcYardage = calculateWarmUpCoolDown(warmUpCoolDown)
    }


    return (
        <div>
            <Typography sx={{ marginTop: '20px', marginBottom: '20px' }}>Sprint Work Out</Typography>
            <Typography>Warm Up: {wcYardage?.warmUp}</Typography>
            {/* <Box>Kick set?</Box> */}
            <Typography sx={{ marginTop: '15px' }}>Main Set</Typography>
            <Box sx={{ display: 'flex', paddingLeft: '40px' }}>
                <Typography sx={{
                    paddingRight: '10px', display: 'flex',
                    alignItems: 'center'
                }}>{rounds} x</Typography>
                <Box sx={{ paddingLeft: '10px', borderLeft: '1px solid' }}>

                    <Typography>{sprintRounds} x {sprintDistance} on
                        Pace: {sprintDistance && readableTime((interval * sprintDistance / 100), false)}
                    </Typography>
                    <Typography>{easyDistance} easy</Typography>
                </Box>
            </Box>
            <Box sx={{ paddingLeft: '40px', marginTop: '15px', marginBottom: '15px' }}>
                <Typography>Main Set Distance: {totalDistance}</Typography>
                <Typography>Main Set Total Time: {sprintDistancePerRoundTotal && rounds !== undefined
                    && readableTime((((sprintDistancePerRoundTotal * rounds) / 100) * ((interval))), true)}
                </Typography>
            </Box>
            <Typography>Cool Down: {wcYardage?.coolDown}</Typography>
        </div >
    )
}

export default SprintWorkout

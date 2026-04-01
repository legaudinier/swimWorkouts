
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
        wcYardage,
        sprintYardagePercentage,
        sprintYardage,
        easyYardage,
        sprintDistance,
        errorMessage

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
                    errorMessage = true
                    break;
                }
                else { errorMessage = false }
                break;
            }
        }

        wcYardage = calculateWarmUpCoolDown(warmUpCoolDown)
    }


    return (
        <Box sx={{ paddingBottom: '20px' }}>
            <Typography sx={{
                marginBottom: '20px',
                textAlign: 'center',
                backgroundColor: '#7d34eb',
                color: 'white',
                borderRadius: '10px 10px 0 0',
                paddingTop: '10px',
                paddingBottom: '10px'
            }}>Sprint Work Out</Typography>
            {!errorMessage ? (<Box sx={{ paddingLeft: '20px' }}>
                <Typography>Warm Up: {wcYardage?.warmUp}</Typography>
                {/* <Box>Kick set?</Box> */}
                <Typography sx={{ marginTop: '15px' }}>Main Set: {yardage}</Typography>
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
                <Typography>Cool Down: {wcYardage?.coolDown}</Typography>
            </Box>) :
                <Typography sx={{ paddingLeft: '20px' }}>
                    The math is not working, please adjust your yardage
                </Typography>}
        </Box>
    )
}

export default SprintWorkout

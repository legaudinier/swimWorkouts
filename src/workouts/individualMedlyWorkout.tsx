
import { Box, Typography } from "@mui/material";
import { readableTime, calculateWarmUpCoolDown } from '../utilities'

export type IndividualMedleyWorkoutType = {
    yardage: any
    interval: any
}

const IndividualMedleyWorkout = ({
    yardage, interval,
}: IndividualMedleyWorkoutType) => {

    let maxDistance,
        rounds,
        totalDistance,
        random_boolean,
        intervalTime,
        wcYardage,
        errorMessage

    const warmUpCoolDown = Math.floor(yardage * .35 / 100) * 100

    yardage = yardage - warmUpCoolDown

    if (yardage !== 0) {
        let count: number = 1

        while (true) {
            random_boolean = Math.random() < 0.5; // make some sets have 50s
            maxDistance = ((Math.floor((Math.random() * 7) + 1) * 100))
            if (random_boolean) {
                maxDistance = maxDistance + 50
            }

            rounds = yardage / maxDistance

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
                paddingBottom: '10px',
            }}>
                I.M. Work Out
            </Typography>
            {!errorMessage ?
                <Box sx={{ paddingLeft: '20px' }}>
                    <Typography>Warm Up: {wcYardage?.warmUp}</Typography>
                    {/* <Box>Kick set?</Box> */}
                    <Typography sx={{ marginTop: '15px' }}>Main Set: {totalDistance} </Typography>
                    <Box sx={{ display: 'flex', paddingLeft: '40px', paddingTop: '10px', paddingBottom: '10px' }}>
                        <Typography sx={{
                            paddingRight: '10px', display: 'flex',
                            alignItems: 'center'
                        }}>{rounds} x</Typography>
                        <Box sx={{ paddingLeft: '10px', borderLeft: '1px solid' }}>
                            <Typography>{maxDistance} on the&nbsp;
                                {intervalTime !== undefined && readableTime(intervalTime, false)
                                }</Typography>
                            <Typography sx={{ fontStyle: 'italic', paddingLeft: '20px' }}>
                                Pace: {readableTime((interval), false)} per 100
                            </Typography>
                        </Box>
                    </Box>
                    <Typography>Cool Down: {wcYardage?.coolDown}</Typography>
                </Box> : <Typography sx={{ paddingLeft: '20px' }}>
                    The math is not working, please adjust your yardage
                </Typography>}
        </Box>
    )
}

export default IndividualMedleyWorkout

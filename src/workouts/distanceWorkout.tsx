
import Box from "@mui/material/Box";
import { readableTime, calculateWarmUpCoolDown } from '../utilities'

export type DistanceWorkoutType = {
    type: any
    yardage: any
    interval: any
}

const DistanceWorkout = ({
    yardage, interval,
}: DistanceWorkoutType) => {

    let maxDistance,
        rounds,
        totalDistance,
        random_boolean,
        intervalTime,
        wcYardage

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
                }
                break;
            }
        }

        intervalTime = (maxDistance / 100) * (interval)
        totalDistance = maxDistance * rounds

        wcYardage = calculateWarmUpCoolDown(warmUpCoolDown)

    }

    return (
        <div>
            <Box sx={{ marginTop: '20px', marginBottom: '20px' }}>*~~~* Distance Work Out *~~~*</Box>
            <Box>Warm Up: {wcYardage?.warmUp}</Box>
            {/* <Box>Kick set?</Box> */}
            <Box sx={{ marginTop: '15px' }}>Main Set</Box>
            <Box sx={{ display: 'flex', paddingLeft: '40px' }}>
                <Box sx={{
                    paddingRight: '10px', display: 'flex',
                    alignItems: 'center'
                }}>{rounds} x</Box>
                <Box sx={{ paddingLeft: '10px', borderLeft: '1px solid' }}>
                    <Box>{maxDistance} on the&nbsp;
                        {intervalTime !== undefined && readableTime(intervalTime, false)
                        }</Box>
                    <Box sx={{ fontStyle: 'italic', paddingLeft: '20px' }}>
                        Pace: {readableTime((interval), false)} per 100
                    </Box>
                </Box>
            </Box>
            <Box sx={{ paddingLeft: '40px', marginTop: '15px', marginBottom: '15px' }}>
                <Box>Main Set Distance: {totalDistance}</Box>
                <Box>Main Set Total Time: {maxDistance && rounds !== undefined
                    && readableTime((((maxDistance * rounds) / 100) * ((interval))), true)}
                </Box>
            </Box>
            <Box>Cool Down: {wcYardage?.coolDown}</Box>
        </div >
    )
}

export default DistanceWorkout

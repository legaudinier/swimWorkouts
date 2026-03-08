
import Box from "@mui/material/Box";
import { readableTime, calculateWarmUpCoolDown } from '../utilities'

export type EasyWorkoutType = {
    yardage: any
    interval: any
}

const EasyWorkout = ({
    yardage, interval,
}: EasyWorkoutType) => {

    let kickPercentage,
        remainderAfterKick,
        drillPercentage,
        remainderAfterDrill,
        breathPercentage,
        rounds,
        totalDistance,
        random_boolean,
        wcYardage

    const warmUpCoolDown = Math.floor(yardage * .35 / 100) * 100

    yardage = yardage - warmUpCoolDown
    // for easy mix of kick, drill, breathing
    // need to determine 
    // the kick percentage
    // drill percentage
    // breathing - rest is breathing

    if (yardage !== 0) {
        let count: number = 1

        while (true) {
            random_boolean = Math.random() < 0.5; // make some sets have 50s
            kickPercentage = ((Math.floor((Math.random() * 10) + 1)))
            remainderAfterKick = 10 - kickPercentage
            drillPercentage = ((Math.floor((Math.random() * remainderAfterKick))))
            breathPercentage = 10 - drillPercentage - remainderAfterKick

            // rounds = yardage / maxDistance

            count = count + 1
            // make sure you get a little of each
            if (kickPercentage >= 0 && drillPercentage >= 0 && breathPercentage >= 0 && count === 150) {
                if (count === 150) {
                    console.log('Something is wrong, fix it on your end.')
                }
                break;
            }
        }

        // intervalTime = (maxDistance / 100) * (interval)
        // totalDistance = maxDistance * rounds
        wcYardage = calculateWarmUpCoolDown(warmUpCoolDown)
        console.log('kickPercentage', kickPercentage)
        console.log('drillPercentage', drillPercentage)

        console.log('breathPercentage', breathPercentage)
    }

    return (
        <div>
            <Box sx={{ marginTop: '20px', marginBottom: '20px' }}>*~~~* Easy Work Out *~~~*</Box>
            <Box>Warm Up: {wcYardage?.warmUp}</Box>
            {/* <Box>Kick set?</Box> */}
            <Box sx={{ marginTop: '15px' }}>Main Set</Box>
            <Box sx={{ display: 'flex', paddingLeft: '40px' }}>
                <Box sx={{
                    paddingRight: '10px', display: 'flex',
                    alignItems: 'center'
                }}>{rounds} x</Box>
                <Box sx={{ paddingLeft: '10px', borderLeft: '1px solid' }}>
                    {/* <Box>{maxDistance} on the&nbsp;
                        {intervalTime !== undefined && readableTime(intervalTime, false)
                        }</Box> */}
                    <Box sx={{ fontStyle: 'italic', paddingLeft: '20px' }}>
                        Pace: {readableTime((interval), false)} per 100
                    </Box>
                </Box>
            </Box>
            <Box sx={{ paddingLeft: '40px', marginTop: '15px', marginBottom: '15px' }}>
                <Box>Main Set Distance: {totalDistance}</Box>
                {/* <Box>Main Set Total Time: {maxDistance && rounds !== undefined
                    && readableTime((((maxDistance * rounds) / 100) * ((interval))), true)}
                </Box> */}
            </Box>
            <Box>Cool Down: {wcYardage?.coolDown}</Box>
        </div >
    )
}

export default EasyWorkout

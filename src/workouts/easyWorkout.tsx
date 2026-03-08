
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
        drillPercentage,
        breathPercentage,
        rounds,
        totalDistance,
        random_boolean,
        intervalTime,
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
            kickPercentage = ((Math.floor((Math.random() * 5))))
            drillPercentage = ((Math.floor((Math.random() * 5))))
            breathPercentage = ((Math.floor((Math.random() * 5))))

            // 1. Generate two random cut points (indices) between 0 and targetSum.
            let cutPoint1 = Math.floor(Math.random() * (10 + 1));
            let cutPoint2 = Math.floor(Math.random() * (10 + 1));

            // 2. Sort the cut points to define three distinct ranges/bins.
            const cuts = [0, Math.min(cutPoint1, cutPoint2), Math.max(cutPoint1, cutPoint2), targetSum];

            // 3. Calculate the length of each bin, which are the three numbers.
            const num1 = cuts[1] - cuts[0];
            const num2 = cuts[2] - cuts[1];
            const num3 = cuts[3] - cuts[2];

            console.log('*******numbers:', num1, num2, num3)


            // rounds = yardage / maxDistance

            count = count + 1
            if (count === 150) {
                if (count === 150) {
                    console.log('Something is wrong, fix it on your end.')
                }
                break;
            }
        }

        // intervalTime = (maxDistance / 100) * (interval)
        // totalDistance = maxDistance * rounds
        wcYardage = calculateWarmUpCoolDown(warmUpCoolDown)
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

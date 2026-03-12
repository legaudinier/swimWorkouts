
import Box from "@mui/material/Box";
import { calculateWarmUpCoolDown } from '../utilities'

export type EasyWorkoutType = {
    yardage: any
    interval: any
}

const EasyWorkout = ({
    yardage,
}: EasyWorkoutType) => {

    let kickPercentage,
        kickDistance,
        kickRounds,
        pullPercentage,
        pullDistance,
        pullRounds,
        drillPercentage,
        drillDistance,
        breathPercentage,
        breathDistance,
        breathRounds,
        wcYardage

    const warmUpCoolDown = Math.floor(yardage * .35 / 100) * 100

    yardage = yardage - warmUpCoolDown
    // for easy mix of kick, drill, breathing
    // need to determine 
    // the kick percentage
    // pull
    // drill percentage
    // breathing - rest is breathing

    if (yardage !== 0) {
        let count: number = 1

        while (true) {
            kickPercentage = ((Math.floor((Math.random() * 7) + 2)))
            pullPercentage = ((Math.floor((Math.random() * 7) + 2)))
            drillPercentage = ((Math.floor((Math.random() * 7) + 1)))
            breathPercentage = ((Math.floor((Math.random() * 7) + 1)))

            count = count + 1
            // make sure you get a little of each
            if (kickPercentage + pullPercentage + drillPercentage + breathPercentage === 10
                && breathPercentage > 0
                && kickPercentage % 50 === 0
                && pullPercentage % 50 === 0
                && drillPercentage % 50 === 0
                && breathPercentage % 50 === 0
                || count === 650) {
                if (count === 650) {
                    console.log('Something is wrong, fix it on your end.')
                }
                break;
            }
        }

        kickDistance = kickPercentage * 100
        pullDistance = pullPercentage * 100
        drillDistance = drillPercentage * 100
        breathDistance = yardage - pullDistance - kickDistance - drillDistance

        let kickCount = 1
        let pullCount = 1
        let breathCount = 1

        while (true) {
            kickCount = kickCount + 1
            kickRounds = ((Math.floor((Math.random() * 9) + 1)))
            if (kickCount === 650 || ((kickDistance / kickRounds) % 50 === 0)) {
                console.log('Something is wrong, fix it on your end.')
                break;
            }
        }

        while (true) {
            pullCount = pullCount + 1
            pullRounds = ((Math.floor((Math.random() * 9) + 1)))
            if (pullCount === 650 || ((pullDistance / pullRounds) % 50 === 0)) {
                console.log('Something is wrong, fix it on your end.')
                break;
            }
        }

        while (true) {
            breathCount = breathCount + 1
            breathRounds = ((Math.floor((Math.random() * 6) + 2)))
            if (breathCount === 650 || ((breathDistance / breathRounds) % 50 === 0)) {
                console.log('Something is wrong, fix it on your end.')
                break;
            }
        }

        wcYardage = calculateWarmUpCoolDown(warmUpCoolDown)
    }

    // need to break up the drills
    // need to break up the breathing 

    return (
        <div>
            <Box sx={{ marginTop: '20px', marginBottom: '20px' }}>*~~~* Easy Work Out *~~~*</Box>
            <Box>Warm Up: {wcYardage?.warmUp}</Box>
            <Box sx={{ marginTop: '15px' }}>Main Set</Box>
            <Box sx={{ display: 'flex', paddingLeft: '40px' }}>
                <Box sx={{ paddingRight: '10px' }}>
                    <div>Kick</div>
                    <div>Pull</div>
                    <div>Drill</div>
                    <div>Breath</div>
                </Box>
                <Box sx={{ paddingLeft: '10px', borderLeft: '1px solid' }}>
                    <div>{kickRounds} x {kickDistance && kickRounds && kickDistance / kickRounds} ({kickDistance})</div>
                    <div>{pullRounds} x {pullDistance && pullRounds && pullDistance / pullRounds} ({pullDistance})</div>
                    <div>{drillDistance}</div>
                    <div>{breathRounds} x {breathDistance && breathRounds && breathDistance / breathRounds} ({breathDistance})</div>
                </Box>
            </Box>
            <Box sx={{ paddingLeft: '40px', marginTop: '15px', marginBottom: '15px' }}>
                <Box>Main Set Distance: {kickDistance
                    && pullDistance &&
                    drillDistance &&
                    breathDistance &&
                    kickDistance + pullDistance + drillDistance + breathDistance}</Box>
            </Box>
            <Box>Cool Down: {wcYardage?.coolDown}</Box>
        </div >
    )
}

export default EasyWorkout

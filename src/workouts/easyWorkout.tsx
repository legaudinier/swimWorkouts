
import { Box, Typography } from "@mui/material";
import { calculateWarmUpCoolDown, getDrills, getBreathWorkPattern } from '../utilities'

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
        drillRounds,
        drills,
        breathPercentage,
        breathDistance,
        breathRounds,
        breathWorkoutPattern,
        breathWorkPatternText,
        wcYardage,
        errorMessage

    const warmUpCoolDown = Math.floor(yardage * .35 / 100) * 100

    yardage = yardage - warmUpCoolDown

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
                    errorMessage = true
                    break;
                }
                else {
                    errorMessage = false
                    break;
                }
            }
        }

        kickDistance = kickPercentage * 100
        pullDistance = pullPercentage * 100
        drillDistance = drillPercentage * 100
        breathDistance = yardage - pullDistance - kickDistance - drillDistance

        let kickCount = 1
        let pullCount = 1
        let breathCount = 1
        let drillCount = 1

        while (true) {
            kickCount = kickCount + 1
            kickRounds = ((Math.floor((Math.random() * 9) + 1)))
            if (kickCount === 650 || ((kickDistance / kickRounds) % 50 === 0)
                || kickRounds % 1 === 0 || kickDistance % 50 == 0) {
                console.log('Something is wrong, fix it on your end.')
                errorMessage = true
                break;
            }
            else {
                errorMessage = false
                break;
            }
        }

        while (true) {
            pullCount = pullCount + 1
            pullRounds = ((Math.floor((Math.random() * 9) + 1)))
            if (pullCount === 650 || ((pullDistance / pullRounds) % 50 === 0)
                || pullRounds % 1 === 0 || (pullDistance % 50 == 0)) {
                console.log('Something is wrong, fix it on your end.')
                errorMessage = true
                break;
            }
            else {
                errorMessage = false
                break;
            }
        }

        while (true) {
            breathCount = breathCount + 1
            breathRounds = ((Math.floor((Math.random() * 6) + 2)))
            if (breathCount === 650 ||
                ((breathDistance / breathRounds) % 50 === 0) ||
                breathRounds % 1 === 0 || breathDistance % 50 == 0) {
                console.log('Something is wrong, fix it on your end.')
                errorMessage = true
                break;
            }
            else {
                errorMessage = false
                break;
            }
        }

        while (true) {
            drillCount = drillCount + 1
            drillRounds = ((Math.floor((Math.random() * 10) + 1)))
            // NOTE: there are currently 11 drills so we will pick for 11 to use

            drills = getDrills(drillRounds)
            if (drillCount === 650 || ((drillDistance / drillRounds) % 50 === 0)
                || drillRounds % 1 === 0 || drillDistance % 50 === 0) {
                console.log('Something is wrong, fix it on your end.')
                errorMessage = true
                break;
            }
            else {
                errorMessage = false
                break;
            }
        }

        while (true) {
            breathCount = breathCount + 1
            breathRounds = ((Math.floor((Math.random() * 10) + 1)))
            breathWorkoutPattern = getBreathWorkPattern()
            breathWorkPatternText = '[' + breathWorkoutPattern.join(", ") + ']'

            if (breathCount === 650 ||
                ((breathDistance / breathRounds) % 50 !== 0) ||
                (breathDistance / breathWorkoutPattern.length % 50 === 0) || breathRounds % 1 === 0 || breathDistance % 50 === 0) {
                console.log('Something is wrong, fix it on your end.')
                errorMessage = true
                break;
            }
            else {
                errorMessage = false
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
                paddingBottom: '10px',
            }}>Easy Work Out</Typography>
            {errorMessage ? (
                <Box sx={{ paddingLeft: '20px' }}>
                    <Typography>Warm Up: {wcYardage?.warmUp}</Typography>
                    <Typography sx={{ marginTop: '15px' }}>Main Set</Typography>
                    <Box sx={{ display: 'flex', paddingLeft: '40px' }}>
                        <Box sx={{ paddingRight: '10px' }}>
                            <Typography>Kick</Typography>
                            <Typography>Pull</Typography>
                            <Typography>Drill</Typography>
                            {drills?.map(
                                (drill: string, index: number) => {
                                    return (
                                        // fix the spacing
                                        <Box sx={{ height: '24px' }} key={`${drill.replace(/ /g, '')}
                                    ${index}`}>&nbsp;</Box>
                                    )
                                }
                            )}
                            <Typography>Breath</Typography>
                        </Box>
                        <Box sx={{ paddingLeft: '10px', borderLeft: '1px solid' }}>
                            {kickRounds !== 1 ?
                                <Typography>{kickRounds} x {kickDistance && kickRounds && kickDistance / kickRounds} ({kickDistance})</Typography>
                                : <Typography>{kickDistance}</Typography>}
                            {pullRounds !== 1 ?
                                <Typography>{pullRounds} x {pullDistance && pullRounds && pullDistance / pullRounds} ({pullDistance})</Typography>
                                : <Typography>{pullDistance}</Typography>}
                            {drillRounds !== 1 ?
                                <Typography>{drillRounds}  x {drillDistance && drillRounds && drillDistance / drillRounds}</Typography>
                                : <Typography>{drillDistance}</Typography>}
                            <Box sx={{ marginLeft: '20px' }}>
                                <Box component="ul" sx={{ marginTop: 0, marginBottom: 0 }}>
                                    {drills?.map(
                                        (drill: string, index: number) => {
                                            return (
                                                <Typography> <li key={`drill${index}`}>{drill}</li></Typography>
                                            )
                                        }
                                    )}
                                </Box>
                            </Box>
                            {breathRounds !== 1 ?
                                <Typography>{breathRounds} x {breathDistance && breathRounds && breathDistance / breathRounds} ({breathDistance})</Typography>
                                : <Typography>{breathDistance}</Typography>}
                            <Typography sx={{ marginLeft: '40px' }}>
                                {breathWorkPatternText} by 50s
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ paddingLeft: '40px', marginTop: '15px', marginBottom: '15px' }}>
                        <Typography>Main Set Distance: {kickDistance
                            && pullDistance &&
                            drillDistance &&
                            breathDistance &&
                            kickDistance + pullDistance + drillDistance + breathDistance}</Typography>
                    </Box>
                    <Typography>Cool Down: {wcYardage?.coolDown}</Typography>
                </Box>) : <Typography sx={{ paddingLeft: '20px' }}>
                The math is not working, please adjust your yardage
            </Typography>}
        </Box>
    )
}

export default EasyWorkout

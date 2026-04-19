
import { Box, Typography } from "@mui/material";

export type EasyWorkoutType = {
    workoutDetails?: any
}

const EasyWorkout = ({
    workoutDetails
}: EasyWorkoutType) => {

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
            {!workoutDetails.mainSetDetails.errorMessage ? (
                <Box sx={{ paddingLeft: '20px' }}>
                    <Typography>Warm Up: {workoutDetails?.warmUp}</Typography>
                    <Typography sx={{ marginTop: '15px' }}>Main Set</Typography>
                    <Box sx={{ display: 'flex', paddingLeft: '40px' }}>
                        <Box sx={{ paddingRight: '10px' }}>
                            <Typography>Kick</Typography>
                            <Typography>Pull</Typography>
                            <Typography>Drill</Typography>
                            {workoutDetails.mainSetDetails.drills?.map(
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
                            {workoutDetails.mainSetDetails.kickRounds !== 1 ?
                                <Typography>{workoutDetails.mainSetDetails.kickRounds} x {workoutDetails.mainSetDetails.kickDistance && workoutDetails.mainSetDetails.kickRounds && workoutDetails.mainSetDetails.kickDistance / workoutDetails.mainSetDetails.kickRounds} ({workoutDetails.mainSetDetails.kickDistance})</Typography>
                                : <Typography>{workoutDetails.mainSetDetails.kickDistance}</Typography>}
                            {workoutDetails.mainSetDetails.pullRounds !== 1 ?
                                <Typography>{workoutDetails.mainSetDetails.pullRounds} x {workoutDetails.mainSetDetails.pullDistance && workoutDetails.mainSetDetails.pullRounds && workoutDetails.mainSetDetails.pullDistance / workoutDetails.mainSetDetails.pullRounds} ({workoutDetails.mainSetDetails.pullDistance})</Typography>
                                : <Typography>{workoutDetails.mainSetDetails.pullDistance}</Typography>}
                            {workoutDetails.mainSetDetails.drillRounds !== 1 ?
                                <Typography>{workoutDetails.mainSetDetails.drillRounds}  x {workoutDetails.mainSetDetails.drillDistance && workoutDetails.mainSetDetails.drillRounds && workoutDetails.mainSetDetails.drillDistance / workoutDetails.mainSetDetails.drillRounds}</Typography>
                                : <Typography>{workoutDetails.mainSetDetails.drillDistance}</Typography>}
                            <Box sx={{ marginLeft: '20px' }}>
                                <Box component="ul" sx={{ marginTop: 0, marginBottom: 0 }}>
                                    {workoutDetails.mainSetDetails.drills?.map(
                                        (drill: string, index: number) => {
                                            return (
                                                <Typography> <li key={`drill${index}`}>{drill}</li></Typography>
                                            )
                                        }
                                    )}
                                </Box>
                            </Box>
                            {workoutDetails.mainSetDetails.breathRounds !== 1 ?
                                <Typography>{workoutDetails.mainSetDetails.breathRounds} x {workoutDetails.mainSetDetails.breathDistance && workoutDetails.mainSetDetails.breathRounds && workoutDetails.mainSetDetails.breathDistance / workoutDetails.mainSetDetails.breathRounds} ({workoutDetails.mainSetDetails.breathDistance})</Typography>
                                : <Typography>{workoutDetails.mainSetDetails.breathDistance}</Typography>}
                            <Typography sx={{ marginLeft: '40px' }}>
                                {workoutDetails.mainSetDetails.breathWorkPatternText} by 50s
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ paddingLeft: '40px', marginTop: '15px', marginBottom: '15px' }}>
                        <Typography>Main Set Distance: {workoutDetails.mainSetDetails.kickDistance
                            && workoutDetails.mainSetDetails.pullDistance &&
                            workoutDetails.mainSetDetails.drillDistance &&
                            workoutDetails.mainSetDetails.breathDistance &&
                            workoutDetails.mainSetDetails.kickDistance + workoutDetails.mainSetDetails.pullDistance + workoutDetails.mainSetDetails.drillDistance + workoutDetails.mainSetDetails.breathDistance}</Typography>
                    </Box>
                    <Typography>Cool Down: {workoutDetails?.coolDown}</Typography>
                </Box>) : <Typography sx={{ paddingLeft: '20px' }}>
                The math is not working, please adjust your yardage
            </Typography>}
        </Box>
    )
}

export default EasyWorkout

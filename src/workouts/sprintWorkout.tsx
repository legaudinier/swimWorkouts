
import { Box, Typography } from "@mui/material";
import { readableTime } from '../utilities'

export type SprintWorkoutType = {
    interval: any
    workoutDetails: any
}

const SprintWorkout = ({
    interval, workoutDetails
}: SprintWorkoutType) => {

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
            {!workoutDetails.mainSetDetails.errorMessage ? (<Box sx={{ paddingLeft: '20px' }}>
                <Typography>Warm Up: {workoutDetails?.warmUp}</Typography>
                {/* <Box>Kick set?</Box> */}
                <Typography sx={{ marginTop: '15px' }}>Main Set: {workoutDetails.mainSetYardage}</Typography>
                <Box sx={{ display: 'flex', paddingLeft: '40px' }}>
                    <Typography sx={{
                        paddingRight: '10px', display: 'flex',
                        alignItems: 'center'
                    }}>{workoutDetails.mainSetDetails.rounds} x</Typography>
                    <Box sx={{ paddingLeft: '10px', borderLeft: '1px solid' }}>

                        <Typography>{workoutDetails.mainSetDetails.sprintRounds} x {workoutDetails.mainSetDetails.sprintDistance} on
                            Pace: {workoutDetails.mainSetDetails.sprintDistance && readableTime((interval * workoutDetails.mainSetDetails.sprintDistance / 100), false)}
                        </Typography>
                        <Typography>{workoutDetails.mainSetDetails.easyDistance} easy</Typography>
                    </Box>
                </Box>
                <Typography>Cool Down: {workoutDetails?.coolDown}</Typography>
            </Box>) :
                <Typography sx={{ paddingLeft: '20px' }}>
                    The math is not working, please adjust your yardage
                </Typography>}
        </Box>
    )
}

export default SprintWorkout

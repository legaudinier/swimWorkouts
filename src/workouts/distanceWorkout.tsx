
import { Box, Typography } from "@mui/material";
import { readableTime } from '../utilities'

export type DistanceWorkoutType = {
    interval: any
    workoutDetails: any
    savedSwim?: boolean
}

const DistanceWorkout = ({ interval, workoutDetails, savedSwim }: DistanceWorkoutType) => {

    return (
        <Box sx={{ paddingBottom: '20px' }}>
            {!savedSwim ?
                <Typography sx={{
                    marginBottom: '20px',
                    textAlign: 'center',
                    backgroundColor: '#7d34eb',
                    color: 'white',
                    borderRadius: '10px 10px 0 0',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                }}>
                    Distance Work Out
                </Typography> :

                <Typography sx={{
                    marginBottom: '20px',
                    textAlign: 'center',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                }}>
                    Distance Work Out
                </Typography>}
            {!workoutDetails.mainSetDetails.errorMessage ?
                <Box sx={{ paddingLeft: '20px' }}>
                    <Typography>Warm Up: {workoutDetails?.warmUp}</Typography>
                    {/* <Box>Kick set?</Box> */}
                    <Typography sx={{ marginTop: '15px' }}>Main Set: {workoutDetails.mainSetDetails.totalDistance} </Typography>
                    <Box sx={{ display: 'flex', paddingLeft: '40px', paddingTop: '10px', paddingBottom: '10px' }}>
                        <Typography sx={{
                            paddingRight: '10px', display: 'flex',
                            alignItems: 'center'
                        }}>{workoutDetails.mainSetDetails.rounds} x</Typography>
                        <Box sx={{ paddingLeft: '10px', borderLeft: '1px solid' }}>
                            <Typography>{workoutDetails.mainSetDetails.maxDistance} on the&nbsp;
                                {workoutDetails.mainSetDetails.intervalTime !== undefined && readableTime(workoutDetails.mainSetDetails.intervalTime, false)
                                }</Typography>
                            <Typography sx={{ fontStyle: 'italic', paddingLeft: '20px' }}>
                                Pace: {readableTime((interval), false)} per 100
                            </Typography>
                        </Box>
                    </Box>
                    <Typography>Cool Down: {workoutDetails?.coolDown}</Typography>
                </Box> : <Typography sx={{ paddingLeft: '20px' }}>
                    The math is not working, please adjust your yardage
                </Typography>}
        </Box>
    )
}

export default DistanceWorkout

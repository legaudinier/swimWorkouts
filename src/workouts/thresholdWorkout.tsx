
import { Box, Typography } from "@mui/material";
import { readableTime } from '../utilities'

export type ThresholdWorkoutType = {
  yardage: any
  interval: any
  workoutDetails: any // fix this
}

const ThresholdWorkout = ({
  interval, workoutDetails
}: ThresholdWorkoutType) => {

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
      }}>Threshold Work Out</Typography>
      {!workoutDetails.mainSetDetails.errorMessage ? <Box sx={{ paddingLeft: '20px' }}>
        <Typography>Warm Up: {workoutDetails.warmUp}</Typography>
        {/* <Box>Kick set?</Box> */}
        <Typography sx={{ marginTop: '15px' }}>Main Set: {workoutDetails.mainSetYardage}</Typography>
        <Box sx={{ display: 'flex', paddingLeft: '40px' }}>
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
        <Box sx={{ paddingLeft: '40px', marginTop: '15px', marginBottom: '15px' }}>
        </Box>
        <Typography>Cool Down: {workoutDetails.coolDown}</Typography>
      </Box> : <Typography sx={{ paddingLeft: '20px' }}>
        The math is not working, please adjust your yardage
      </Typography>}
    </Box>
  )
}

export default ThresholdWorkout

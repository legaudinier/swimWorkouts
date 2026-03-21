
import { Box, Typography } from "@mui/material";
import { readableTime, calculateWarmUpCoolDown } from '../utilities'

export type ThresholdWorkoutType = {
  yardage: any
  interval: any
}

const ThresholdWorkout = ({
  yardage, interval,
}: ThresholdWorkoutType) => {

  let maxDistance,
    rounds,
    totalDistance,
    random_boolean,
    intervalTime,
    wcYardage

  const warmUpCoolDown = Math.floor(yardage * .5 / 100) * 100

  yardage = yardage - warmUpCoolDown

  if (yardage !== 0) {

    let count: number = 1

    while (true) {
      random_boolean = Math.random() < 0.5; // make some sets have 50s
      maxDistance = ((Math.floor((Math.random() * 2) + 1) * 100))
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
      <Typography sx={{ marginTop: '20px', marginBottom: '20px' }}>Threshold Work Out</Typography>
      <Typography>Warm Up: {wcYardage?.warmUp}</Typography>
      {/* <Box>Kick set?</Box> */}
      <Typography sx={{ marginTop: '15px' }}>Main Set</Typography>
      <Box sx={{ display: 'flex', paddingLeft: '40px' }}>
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
      <Box sx={{ paddingLeft: '40px', marginTop: '15px', marginBottom: '15px' }}>
        <Typography>Main Set Distance: {totalDistance}</Typography>
        <Typography>Main Set Total Time: {maxDistance && rounds !== undefined
          && readableTime((((maxDistance * rounds) / 100) * ((interval))), true)}
        </Typography>
      </Box>
      <Typography>Cool Down: {wcYardage?.coolDown}</Typography>
    </div >
  )
}

export default ThresholdWorkout

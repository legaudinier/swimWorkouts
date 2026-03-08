
import React from 'react'
import Box from "@mui/material/Box";
import { readableTime, calculateWarmUpCoolDown } from '../utilities'

export type ThresholdWorkoutType = {
  type: any
  yardage: any
  interval: any
}

const ThresholdWorkout = ({
  yardage, interval,
}: ThresholdWorkoutType) => {

  let sprintDistancePerRoundTotal,
    easyDistance,
    sprintRounds,
    rounds,
    totalDistance,
    wcYardage,
    sprintYardagePercentage,
    sprintYardage,
    easyYardage,
    activeYardagePercentage,
    sprintDistanceInterval

  const warmUpCoolDown = Math.floor(yardage * .4 / 100) * 100

  yardage = yardage - warmUpCoolDown

  if (yardage !== 0) {

    // More complicated sets?
    let think: string = ''
    let intervalTime

    while (true) {

      rounds = ((Math.floor((Math.random() * 10) + 5) * 1))

      sprintYardagePercentage = ((Math.floor((Math.random() * 3) + 5) / 10))
      activeYardagePercentage = 1 - sprintYardagePercentage
      sprintYardage = yardage * sprintYardagePercentage
      easyYardage = yardage - sprintYardage

      sprintDistancePerRoundTotal = sprintYardage / rounds
      easyDistance = easyYardage / rounds

      console.log('Thinking' + think)
      think = think + '.'

      // so we need to check that BOTH sprintDIstances 
      // and Easy distance are both whole numbers
      // and are both divisible by 50?
      if (easyDistance % 50 === 0) {
        break;
      }
    }
    totalDistance = yardage
    wcYardage = calculateWarmUpCoolDown(warmUpCoolDown)
  }

  return (
    <div>
      <Box sx={{ marginTop: '20px', marginBottom: '20px' }}>*~~~* Threshold Work Out *~~~*</Box>
      <Box>Warm Up: {wcYardage?.warmUp}</Box>
      {/* <Box>Kick set?</Box> */}
      <Box sx={{ marginTop: '15px' }}>Main Set</Box>
      <Box sx={{ display: 'flex', paddingLeft: '40px' }}>
        <Box sx={{
          paddingRight: '10px', display: 'flex',
          alignItems: 'center'
        }}></Box>
        its honestly just like hold a pace for a specific race
        so you have a pick the distance you are training for

        holding a Pace
        // literally like 10 x 100s on pace
        // or 
        small rest between
      // not a lot of rest // maybe 20 secs?
      // nothing too long 100 - 250 distance
      // heart rate? 85–90%

      </Box>
      <Box sx={{ paddingLeft: '40px', marginTop: '15px', marginBottom: '15px' }}>
        <Box>Main Set Distance: {totalDistance}</Box>
        <Box>Main Set Total Time: {sprintDistancePerRoundTotal && rounds !== undefined
          && readableTime((((sprintDistancePerRoundTotal * rounds) / 100) * ((interval))), true)}
        </Box>
      </Box>
      <Box>Cool Down: {wcYardage?.coolDown}</Box>
    </div >
  )
}

export default ThresholdWorkout

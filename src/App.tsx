import { useState, useEffect } from 'react'
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from '@mui/material/FormControl';
import Button from "@mui/material/Button";
import DistanceWorkout from './workouts/distanceWorkout';
import SprintWorkout from "./workouts/sprintWorkout";
import ThresholdWorkout from './workouts/thresholdWorkout';
import EasyWorkout from './workouts/easyWorkout';
import { Box, Typography } from "@mui/material";
import AnimatedPool from './animatedPool';
import ExportToExcel from './exportToExcel'
import { warmUpCoolDownCalculations } from './utilities'

function App() {
  const [workoutType, setWorkoutType] = useState("distance");
  const [yardage, setYardage] = useState(5000);
  const [interval, setInterval] = useState<any>(90);
  const [showWorkout, setShowWorkout] = useState(false)
  const [warmUpCoolDownTotals, setWarmUpCoolDownTotals] = useState({})

  const workoutTypeChange = (event: any) => {
    setWorkoutType(event.target.value);
  };

  const yardageChange = (event: any) => {
    setYardage(event.target.valueAsNumber);
  };

  const baseIntervalChange = (event: any) => {
    setInterval(event.target.valueAsNumber)
  };

  const decreaseYardage = () => {
    setYardage(yardage - 50)
  }

  const increaseYardage = () => {
    setYardage(yardage + 50)
  }

  const decreaseInterval = () => {
    setInterval(interval - 1)
  }

  const increaseInterval = () => {
    setInterval(interval + 1)
  }

  const generate = () => {
    /// we need to send the info on this click
    // ability to re-generate with all the same info
    setShowWorkout(true)
  }

  useEffect(() => {
    setShowWorkout(false)
  }, [workoutType, yardage, interval])

  // need to move up some of the calculations here
  // that way we can just filter it down and also use to excel

  useEffect(() => {
    let percentage

    if (workoutType === 'distance' || workoutType === 'easy') {
      percentage = .35
    }
    else {
      percentage = .5
    }
    setWarmUpCoolDownTotals(warmUpCoolDownCalculations(yardage, percentage))

  }, [workoutType, yardage])

  return (
    <Box sx={{
      '& .MuiOutlinedInput-root': {
        marginBottom: '10px'
      },

      '& .MuiFormGroup-root': {
        flexDirection: 'row',
        marginBottom: '20px'
      }
    }}>
      <Box sx={{
        textAlign: 'center',
        marginTop: '20px',
        marginBottom: '20px'
      }}>
      </Box>
      <Box>
        <Box sx={{
          marginLeft: '40px',
          marginRight: '40px',
          paddingBottom: '20px',
          borderTop: '1px solid #7d34eb',
          borderLeft: '1px solid #7d34eb',
          borderRight: '1px solid #7d34eb',
          borderBottom: '1px solid #7d34eb',
          borderRadius: '10px'
        }}>
          <Typography sx={{
            textAlign: 'center',
            backgroundColor: '#7d34eb',
            color: 'white',
            borderRadius: '10px 10px 0 0',
            paddingTop: '10px',
            paddingBottom: '10px',
          }}>Swim Workout Generator</Typography>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            paddingTop: '20px',
          }}>
            <Box sx={{ flexShrink: 1 }}>
              <FormControl sx={{ minWidth: '100%' }}>
                <Typography variant="caption">Workout Type </Typography>
                <Select
                  labelId="workoutType"
                  id="workoutType-select"
                  value={workoutType}
                  label="Type of Workout"
                  onChange={workoutTypeChange}
                  variant='outlined'
                >
                  <MenuItem value="distance">Distance</MenuItem>
                  <MenuItem value="sprint">Sprint</MenuItem>
                  <MenuItem value="threshold">Threshold/Pace</MenuItem>
                  <MenuItem value="easy">Easy</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Typography variant="caption">Yardage</Typography>
            <Box sx={{ display: 'flex', marginBottom: '10px' }}>
              <Button variant="outlined"
                sx={{
                  color: '#7d34eb',
                  width: '100%'

                }}
                onClick={() => decreaseYardage()}>-</Button>
              <Box sx={{
                '& #yardageInput': {
                  borderRadius: '4px',
                  height: '50px',
                  border: '.5px solid rgba(0, 0, 0, 0.23)',
                  fontSize: 'inherit',
                  textAlign: 'center',
                  width: '150px'
                },
              }}>
                <input
                  type="number"
                  id='yardageInput'
                  className="number-input__field"
                  value={yardage}
                  onChange={yardageChange}
                  inputMode="numeric"
                />
              </Box>
              <Button variant="outlined"
                sx={{
                  color: '#7d34eb',
                  width: '100%'

                }}
                onClick={() => increaseYardage()}>+</Button>
            </Box>
            <Box>
              <Typography variant="caption">Interval (seconds) / 100</Typography>
              <Box sx={{ display: 'flex', marginBottom: '10px' }}>
                <Button variant="outlined"
                  sx={{
                    color: '#7d34eb',
                    width: '100%'

                  }}
                  onClick={() => decreaseInterval()}>-</Button>
                <Box sx={{
                  '& #intervalInput': {
                    borderRadius: '4px',
                    height: '50px',
                    border: '.5px solid rgba(0, 0, 0, 0.23)',
                    fontSize: 'inherit',
                    textAlign: 'center',
                    width: '150px'
                  },
                }}>
                  <input
                    type="number"
                    id='intervalInput'
                    value={interval}
                    onChange={baseIntervalChange}
                    inputMode="numeric"
                  />
                </Box>
                <Button variant="outlined"
                  sx={{
                    color: '#7d34eb',
                    width: '100%'

                  }}
                  onClick={() => increaseInterval()}>+</Button>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{
          marginLeft: '40px',
          marginRight: '40px',
          marginTop: '20px'
        }}>
          <Button variant="outlined"
            sx={{
              color: '#7d34eb',
              width: '100%'

            }}
            onClick={() => generate()}>Generate</Button>
        </Box>

        <Box sx={{
          marginLeft: '40px',
          marginRight: '40px',
          marginTop: '20px',
          border: '1px solid #7d34eb',
          borderRadius: '10px',
          minHeight: '200px'
        }}>
          <div>
            {!showWorkout ? <></> :
              workoutType === 'distance' ? (
                <DistanceWorkout
                  yardage={yardage}
                  interval={interval}
                  warmUpCoolDownTotals={warmUpCoolDownTotals}
                />) :
                workoutType === 'easy' ? (
                  <EasyWorkout
                    yardage={yardage}
                    interval={interval}
                    warmUpCoolDownTotals={warmUpCoolDownTotals}

                  />) :
                  workoutType === 'sprint' ?
                    (<SprintWorkout
                      yardage={yardage}
                      interval={interval}
                      warmUpCoolDownTotals={warmUpCoolDownTotals}
                    />) : workoutType === 'threshold'
                    && (<ThresholdWorkout
                      yardage={yardage}
                      interval={interval}
                      warmUpCoolDownTotals={warmUpCoolDownTotals}
                    />)

            }
          </div>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', marginLeft: '40px', marginRight: '40px', marginTop: '20px' }}>
        <ExportToExcel workoutType={workoutType} interval={interval} totalYardage={warmUpCoolDownTotals} />
        {/* <Button variant="outlined"
          sx={{ width: '100%', color: '#7d34eb' }}
        >Email Workout</Button> */}
      </Box>
      <Box sx={{ marginTop: '20px' }}>
        <AnimatedPool />
      </Box>

    </Box >
  );
}

export default App

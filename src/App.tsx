import { useState, useEffect } from 'react'
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from '@mui/material/FormControl';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DistanceWorkout from './workouts/distanceWorkout';
import SprintWorkout from "./workouts/sprintWorkout";
import ThresholdWorkout from './workouts/thresholdWorkout';
import EasyWorkout from './workouts/easyWorkout';
import { Box, Typography } from "@mui/material";
import AnimatedPool from './animatedPool';

function App() {
  const [workoutType, setWorkoutType] = useState("distance");
  const [yardage, setYardage] = useState(5000);
  const [interval, setInterval] = useState<any>(90);
  const [showWorkout, setShowWorkout] = useState(false)

  const workoutTypeChange = (event: any) => {
    setWorkoutType(event.target.value);
  };

  const yardageChange = (event: any) => {
    setYardage(event.target.valueAsNumber);
  };

  const baseIntervalChange = (event: any) => {
    setInterval(event.target.valueAsNumber)
  };

  const generate = () => {
    /// we need to send the info on this click
    // ability to re-generate with all the same info
    setShowWorkout(true)
  }

  useEffect(() => {
    setShowWorkout(false)
  }, [workoutType, yardage, interval])

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
            paddingTop: '40px',
            width: '100%'
          }}>
            <Box>
              <FormControl sx={{ minWidth: '50%' }}>
                <InputLabel id="workoutType">workoutType</InputLabel>
                <Select
                  labelId="workoutType"
                  id="workoutType-select"
                  value={workoutType}
                  label="workoutType of Workout"
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
            <Box>
              <TextField
                id="outlined-basic"
                label="Yardage"
                variant="outlined"
                type="number"
                defaultValue={'3000'}
                onChange={yardageChange}
                sx={{ minWidth: '50%' }}
                InputProps={{
                  inputProps: {
                    max: 10000, min: 50, step: 50
                  }
                }}
              />
            </Box>
            <Box>
              <TextField
                label="Interval (seconds) / 100"
                variant="outlined"
                type="number"
                onChange={baseIntervalChange}
                defaultValue={90}
                sx={{ minWidth: '50%' }}
              />
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
                />) :
                workoutType === 'easy' ? (
                  <EasyWorkout
                    yardage={yardage}
                    interval={interval}
                  />) :
                  workoutType === 'sprint' ?
                    (<SprintWorkout
                      yardage={yardage}
                      interval={interval}
                    />) : workoutType === 'threshold'
                    && (<ThresholdWorkout
                      yardage={yardage}
                      interval={interval}
                    />)

            }
          </div>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', marginLeft: '40px', marginRight: '40px', marginTop: '20px' }}>
        <Button variant="outlined"
          sx={{ width: '100%', color: '#7d34eb' }}
        >Export to Excel</Button>
        <Button variant="outlined"
          sx={{ width: '100%', color: '#7d34eb' }}
        >Email Workout</Button>
      </Box>
      <Box sx={{ marginTop: '20px' }}>
        <AnimatedPool />
      </Box>

    </Box >
  );
}

export default App

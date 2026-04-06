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
import { PoolFloat } from './svgs/poolFloat'


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
        marginBottom: '40px'
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
            flexDirection: 'row',
            paddingTop: '40px'
          }}>
            <Box sx={{ flex: '0 1 200px' }}>
              <FormControl fullWidth>
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
              />
            </Box>
          </Box>
          <Box sx={{
            border: '2px solid blue', height: '80px',
            backgroundColor: '#90D5FF',
            marginLeft: '5px', marginRight: '5px'
          }}>
            <Box sx={{
              height: '33%', borderBottom: '2px dotted white',
              position: 'relative',
              '&::before': {
                content: '""', // top lane line
                position: 'absolute',
                top: '44%',
                left: '3%',
                width: '94%',
                height: '1px',
                backgroundColor: 'primary.main',
              },
            }}>
              {/* faster swimmer */}
              <Box sx={{
                width: '10px',
                height: '10px',
                position: 'relative',
                animationName: 'myAnimationFast',
                animationDuration: '6s',
                animationIterationCount: 'infinite',
                '@keyframes myAnimationFast': {
                  "0%": {
                    backgroundColor: 'blue; left:0%; top:7px',
                  },
                  "50%": {
                    backgroundColor: 'blue; left:98%; top:7px',
                  },
                  "100%": {
                    backgroundColor: 'blue; left:0px; top:7px',
                  }
                }
              }}></Box>
              <Box sx={{
                '&::before': {
                  content: '""', // left T line
                  position: 'absolute',
                  top: '29%',
                  left: '3%',
                  width: '95%',
                  height: '10px',
                  borderLeft: '1px solid #1976d2'
                },
              }}></Box>
              <Box sx={{
                '&::before': {
                  content: '""', // right T line
                  position: 'absolute',
                  top: '29%',
                  left: '97%',
                  width: '95%',
                  height: '10px',
                  borderLeft: '1px solid #1976d2'
                },
              }}></Box>
            </Box>
            <Box sx={{
              height: '33%', borderBottom: '2px dotted white',
              position: 'relative',
              '&::before': {
                content: '""', // main lane line middle
                position: 'absolute',
                top: '44%',
                left: '3%',
                width: '94%',
                height: '1px',
                backgroundColor: 'primary.main',
              },
            }} >
              {/* slower swimmer */}
              <Box sx={{
                width: '10px',
                height: '10px',
                position: 'relative',
                animationName: 'myAnimationSlow',
                animationDuration: '9s',
                animationIterationCount: 'infinite',
                '@keyframes myAnimationSlow': {
                  "0%": {
                    backgroundColor: 'green; left:0px; top:7px',
                  },
                  "50%": {
                    backgroundColor: 'green; left:98%; top:7px',
                  },
                  "100%": {
                    backgroundColor: 'green; left:0px; top:7px',
                  }
                }
              }}></Box>
              <Box sx={{
                '&::before': {
                  content: '""', // left t line
                  position: 'absolute',
                  top: '29%',
                  left: '3%',
                  width: '95%',
                  height: '10px',
                  borderLeft: '1px solid #1976d2'
                },
              }}></Box>
              <Box sx={{
                '&::before': {
                  content: "''",
                  position: 'absolute',
                  top: '29%',
                  left: '97%',
                  width: '95%',
                  height: '10px',
                  borderLeft: '1px solid #1976d2'
                },
              }}></Box>
            </Box>
            <Box sx={{
              height: '33%',
              borderBottom: '2px dotted white',
              position: 'relative',
              '&::before': {
                content: '""', // bottom floating swimmer
                position: 'absolute',
                top: '44%',
                left: '3%',
                width: '94%',
                height: '1px',
                backgroundColor: 'primary.main',
              },
            }} >
              {/* floater swimmer */}
              <Box sx={{
                width: '15px',
                height: '15px',
                // borderRadius: '50%',
                position: 'relative',
                animationName: 'myAnimationFloat',
                animationDuration: '30s',
                animationIterationCount: 'infinite',
                '@keyframes myAnimationFloat': {
                  "0%": {
                    backgroundColor: 'transparent; left:4%; top:0px',
                    transform: 'rotate(15deg)'
                  },
                  "10%": {
                    backgroundColor: 'transparent; left:25%; top:-5px',
                    transform: 'rotate(-10deg)'
                  },
                  "20%": {
                    backgroundColor: 'transparent; left:50%; top:-7px',
                    transform: 'rotate(25deg)'
                  },
                  "30%": {
                    backgroundColor: 'transparent; left:60%; top:-3px',
                    transform: 'rotate(-5deg)'
                  },
                  "40%": {
                    backgroundColor: 'transparent; left:70%; top:0px',
                    transform: 'rotate(12deg)'

                  },
                  "50%": {
                    backgroundColor: 'transparent; left: 95%; top:-3px',
                    transform: 'rotate(-12deg)'
                  },
                  "51%": {
                    transform: 'scaleX(-1)'
                  },
                  "60%": {
                    backgroundColor: 'transparent; left:80%; top:0px',
                    transform: 'scaleX(-1) rotate(15deg)',
                  },
                  "70%": {
                    backgroundColor: 'transparent; left:60%; top:-5px',
                    transform: 'scaleX(-1) rotate(-15deg)'
                  },
                  "80%": {
                    backgroundColor: 'transparent; left:50%; top:1px',
                    transform: ' scaleX(-1) rotate(10deg)'
                  },
                  "90%": {
                    backgroundColor: 'transparent; left:25%; top:-5px',
                    transform: ' scaleX(-1) rotate(-22deg)'
                  },
                  "100%": {
                    backgroundColor: 'transparent; left:0px; top:4px',
                    transform: 'scaleX(-1)'
                  }
                }
              }}>
                <PoolFloat />
              </Box>
              <Box sx={{
                '&::before': {
                  content: '""', // left t line
                  position: 'absolute',
                  top: '29%',
                  left: '3%',
                  width: '95%',
                  height: '10px',
                  borderLeft: '1px solid #1976d2'
                },
              }}></Box>
              <Box sx={{
                '&::before': {
                  content: '""', // right T line
                  position: 'absolute',
                  top: '29%',
                  left: '97%',
                  width: '95%',
                  height: '10px',
                  borderLeft: '1px solid #1976d2'
                },
              }}></Box>
            </Box>

          </Box>
          {/* lines at the bottom of the pool */}
          {/* blue at the end, add flags, white and red alternating */}
          {/* two swimmers, one fast, one slow, the fast one keeps going, 
          the slow one takes a break at walls and then goes after a while*/}
          {/* another one is just in a floaty */}
        </Box>
        {/* actually hook this up */}
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
    </Box >
  );
}

export default App

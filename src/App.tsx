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
  const [activeTab, setActiveTab] = useState('generate')
  const [workoutType, setWorkoutType] = useState("distance");
  const [yardage, setYardage] = useState(4000);
  const [interval, setInterval] = useState<any>(90);
  const [showWorkout, setShowWorkout] = useState(false)
  const [workoutDetails, setWorkoutDetails] = useState({}) // CREATE TYPES HERE
  const [generateText, setGenerateText] = useState('Generate')
  const [regenerate, setRegenerate] = useState(false)
  const [savedWorkouts, setSavedWorkouts] = useState<any>(); // THIS NEEDS A TYPE


  useEffect(() => {
    fetch("http://localhost:3001/api/workouts")
      .then((res) => res.json())
      .then((data) => setSavedWorkouts(data));
  }, []);

  const addItem = async () => {
    try {
      const res = await fetch('/api/addWorkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workoutType, yardage, interval, workoutDetails })
      })
      if (res.ok) {
        console.log('this worked')
      } else {
        const data = await res.json()
        alert(data.error || 'Failed to create tab')
      }
    } catch (err) {
      console.error('Failed to add tab:', err)
    }
  }

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
    // Re-generate with all the same info

    setGenerateText('Re-Generate')
    setRegenerate(!regenerate)
    setShowWorkout(true)
  }

  useEffect(() => {
    setShowWorkout(false)
    setGenerateText('Generate')
    setRegenerate(!regenerate)
  }, [workoutType, yardage, interval])

  useEffect(() => {
    let percentage

    if (workoutType === 'distance' || workoutType === 'easy') {
      percentage = .35
    }
    else {
      percentage = .5
    }
    setWorkoutDetails(warmUpCoolDownCalculations(yardage, percentage, workoutType, interval))

  }, [workoutType, yardage, regenerate])


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
      {activeTab === 'generate' ? (
        <Box>
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
              borderRadius: '10px',
            }}>
              <Box sx={{
                textAlign: 'center',
                backgroundColor: '#7d34eb',
                color: 'white',
                borderRadius: '10px 10px 0 0',
                paddingTop: '10px',
                paddingBottom: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingLeft: '10px',
                paddingRight: '10px'
              }}>
                <Typography>Swim Workout Generator
                </Typography>
                <Button variant="outlined"
                  sx={{
                    backgroundColor: 'white',
                    color: '#7d34eb',
                    width: '200px',
                    fontSize: '12px'
                  }}
                  onClick={() => setActiveTab('workouts')}>
                  Saved Workouts</Button>
              </Box>
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
                onClick={() => generate()}>{generateText}</Button>
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
                      interval={interval}
                      workoutDetails={workoutDetails}
                    />) :
                    workoutType === 'easy' ? (
                      <EasyWorkout
                        workoutDetails={workoutDetails}
                      />) :
                      workoutType === 'sprint' ?
                        (<SprintWorkout
                          interval={interval}
                          workoutDetails={workoutDetails}
                        />) : workoutType === 'threshold'
                        && (<ThresholdWorkout
                          yardage={yardage}
                          interval={interval}
                          workoutDetails={workoutDetails}
                        />)

                }
              </div>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', marginLeft: '40px', marginRight: '40px', marginTop: '20px' }}>
            <ExportToExcel workoutType={workoutType} interval={interval} workoutDetails={workoutDetails} disableButton={showWorkout} />
            <Button variant="outlined"
              sx={{ width: '100%', color: '#7d34eb' }}
              onClick={addItem}
            >Save Workout</Button>
          </Box>
        </Box>) : (
        <Box>
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
              borderRadius: '10px',
              height: '600px'
            }}>
              <Box sx={{
                textAlign: 'center',
                backgroundColor: '#7d34eb',
                color: 'white',
                borderRadius: '10px 10px 0 0',
                paddingTop: '10px',
                paddingBottom: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingLeft: '10px',
                paddingRight: '10px'
              }}>
                <Typography>Swim Workout Generator
                </Typography>
                <Button variant="outlined"
                  sx={{
                    backgroundColor: 'white',
                    color: '#7d34eb',
                    width: '200px',
                    fontSize: '12px'
                  }}
                  onClick={() => setActiveTab('generate')}>
                  Generate Workout</Button>
              </Box>
              {/* Saved workouts */}
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                paddingTop: '20px',
              }}>
                {savedWorkouts.message[0].yardage}

              </Box>
            </Box>
          </Box>
        </Box>)}


      <Box sx={{ marginTop: '20px' }}>
        <AnimatedPool />
      </Box>
    </Box >
  );
}

export default App

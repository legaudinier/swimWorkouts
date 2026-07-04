import { useState, useEffect } from 'react'
import Button from "@mui/material/Button";
import DistanceWorkout from './workouts/distanceWorkout';
import SprintWorkout from "./workouts/sprintWorkout";
import ThresholdWorkout from './workouts/thresholdWorkout';
import EasyWorkout from './workouts/easyWorkout';
import { Box, Typography } from "@mui/material";

type SavedWorkoutType = {
  // determine what these are
}

const SavedWorkout = ({ }: SavedWorkoutType) => {
  const [activeTab, setActiveTab] = useState('generate')
  const [savedWorkouts, setSavedWorkouts] = useState<any>({}); // THIS NEEDS A TYPE
  const [currentSavedSwim, setCurrentSavedSwim] = useState<number>(0)
  const [loading, setLoading] = useState(false)

  // clean this up
  useEffect(() => {
    fetch("http://localhost:3001/api/workouts")
      .then((res) => res.json())
      .then((data) => setSavedWorkouts(data))
  }, []);

  useEffect(() => {
    setLoading(true);
    console.log('this totally not working hahahah so fried right now', savedWorkouts)
  }, [savedWorkouts]);

  return (loading && savedWorkouts.length > 0 &&
    <Box sx={{
      '& .MuiOutlinedInput-root': {
        marginBottom: '10px'
      },

      '& .MuiFormGroup-root': {
        flexDirection: 'row',
        marginBottom: '20px'
      }
    }}>
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
            <Box sx={{
              paddingTop: '20px',
            }}>
              <Box sx={{ height: '490px' }}>
                {
                  savedWorkouts?.savedSwims[currentSavedSwim]?.type === 'distance' ? (
                    <DistanceWorkout
                      interval={savedWorkouts?.savedSwims[currentSavedSwim].interval}
                      workoutDetails={savedWorkouts?.savedSwims[currentSavedSwim]}
                      savedSwim={true}
                    />)
                    :
                    savedWorkouts?.savedSwims[currentSavedSwim].type === 'easy' ? (
                      <EasyWorkout
                        workoutDetails={savedWorkouts?.savedSwims[currentSavedSwim]}
                        savedSwim={true}

                      />) :
                      savedWorkouts?.savedSwims[currentSavedSwim].type === 'sprint' ?
                        (<SprintWorkout
                          interval={savedWorkouts?.savedSwims[currentSavedSwim].interval}
                          workoutDetails={savedWorkouts?.savedSwims[currentSavedSwim]}
                          savedSwim={true}

                        />) : savedWorkouts?.savedSwims[currentSavedSwim].type === 'threshold'
                        && (<ThresholdWorkout
                          yardage={savedWorkouts?.savedSwims[currentSavedSwim].yardage}
                          interval={savedWorkouts?.savedSwims[currentSavedSwim].interval}
                          workoutDetails={savedWorkouts?.savedSwims[currentSavedSwim]}
                          savedSwim={true}

                        />)

                }
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="outlined"
                  sx={{
                    backgroundColor: 'white',
                    color: '#7d34eb',
                    width: '200px',
                    fontSize: '12px'
                  }}
                  onClick={() => setCurrentSavedSwim(
                    currentSavedSwim !== 0 ?
                      currentSavedSwim - 1 : savedWorkouts?.savedSwims.length - 1
                  )}>
                  Past</Button>
                <Button variant="outlined"
                  sx={{
                    backgroundColor: 'white',
                    color: '#7d34eb',
                    width: '200px',
                    fontSize: '12px'
                  }}
                  onClick={() => setCurrentSavedSwim(
                    savedWorkouts?.savedSwims.length - 1 !== currentSavedSwim ?
                      currentSavedSwim + 1 : 0
                  )}>
                  Next</Button>
              </Box>

            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default SavedWorkout

import { useState, useEffect } from 'react'
import Button from "@mui/material/Button";
import DistanceWorkout from './workouts/distanceWorkout';
import SprintWorkout from "./workouts/sprintWorkout";
import ThresholdWorkout from './workouts/thresholdWorkout';
import EasyWorkout from './workouts/easyWorkout';
import { Box, Typography } from "@mui/material";

const SavedWorkout = () => {
  const [savedWorkouts, setSavedWorkouts] = useState<any>({}); // THIS NEEDS A TYPE
  const [currentSavedSwim, setCurrentSavedSwim] = useState<number>(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchSwims = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/workouts');
        const data = await response.json();

        setSavedWorkouts(data);
      } catch (err) {
      } finally {
        setLoading(true);
      }
    };

    fetchSwims();
  }, []);

  return (loading && savedWorkouts.length !== 0 &&
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
          <Box>
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

                        />)}
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
                <Box><Typography>Saved Workout #{currentSavedSwim + 1}</Typography></Box>
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

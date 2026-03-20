import { useState } from 'react'
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
import { Box } from "@mui/material";

function App() {
  const [type, setType] = useState("distance");
  const [yardage, setYardage] = useState(5000);
  const [interval, setInterval] = useState<any>(90);
  const [showWorkout, setShowWorkout] = useState(false)

  const typeChange = (event: any) => {
    setType(event.target.value);
  };

  const yardageChange = (event: any) => {
    setShowWorkout(false)
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
        <h1>Swim Workout Generator</h1>
      </Box>
      <Box>
        <Box sx={{
          marginLeft: '40px',
          marginRight: '40px',
          paddingTop: '40px',
          borderTop: '40px solid #7d34eb',
          borderLeft: '1px solid #7d34eb',
          borderRight: '1px solid #7d34eb',
          borderBottom: '1px solid #7d34eb',
          borderRadius: '10px'

        }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',

          }}>
            <Box>
              <FormControl fullWidth>
                <InputLabel id="type">Type</InputLabel>
                <Select
                  labelId="type"
                  id="type-select"
                  value={type}
                  label="Type of Workout"
                  onChange={typeChange}
                  variant='outlined'
                >
                  <MenuItem value="distance">Distance</MenuItem>
                  <MenuItem value="sprint">Sprint</MenuItem>
                  <MenuItem value="threshold">Threshold/Pace</MenuItem>
                  <MenuItem value="im">IM</MenuItem>
                  <MenuItem value="easy">Easy</MenuItem>
                  <MenuItem value="dealersChoice">Dealers Choice</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <div>
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
            </div>
            <div>
              <TextField
                label="Interval (seconds) / 100"
                variant="outlined"
                type="number"
                onChange={baseIntervalChange}
                defaultValue={90}
              />
            </div>
          </Box>
        </Box>
        {/* actually hook this up */}
        <Button variant="outlined"
          sx={{ color: '#7d34eb', 
            marginLeft: '40px', 
            marginRight: '40px', 
            marginTop: '20px' }}
          onClick={() => generate()}>Generate</Button>
        <Box sx={{
          marginLeft: '40px',
          marginRight: '40px',
          marginTop: '20px',
          border: '1px solid #7d34eb',
          borderRadius: '10px'
        }}>
          <div>
            <ul>
              {showWorkout &&
                type === 'distance' ? (
                <DistanceWorkout
                  yardage={yardage}
                  interval={interval}
                />) :
                type === 'easy' ? (
                  <EasyWorkout
                    yardage={yardage}
                    interval={interval}
                  />) :
                  type === 'sprint' ?
                    (<SprintWorkout
                      yardage={yardage}
                      interval={interval} // this is super messy // feed in sprint interval
                    />) : type === 'threshold' && (<ThresholdWorkout
                      yardage={yardage}
                      interval={interval} // this is super messy // feed in sprint interval
                    />)

              }
            </ul>
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

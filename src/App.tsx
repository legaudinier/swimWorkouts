import { useState } from 'react'
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
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
      '& .MuiFormControl-root': {
        width: '300px'
      },

      '& .MuiOutlinedInput-root': {
        width: '300px',
        marginBottom: '20px'
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
      <Box sx={{
        display: 'flex',
        flexDirection: 'row'
      }}>
        <Box sx={{
          marginLeft: '40px',
          width: '50%'
        }}>
          <div>
            <InputLabel>Workout Type</InputLabel>
            <Select
              labelId="type"
              value={type}
              label="Type of Workout"
              onChange={typeChange}
            >
              <MenuItem value="distance">Distance</MenuItem>
              <MenuItem value="sprint">Sprint</MenuItem>
              <MenuItem value="threshold">Threshold/Pace</MenuItem>
              <MenuItem value="im">IM</MenuItem>
              <MenuItem value="easy">Easy</MenuItem>
              <MenuItem value="dealersChoice">Dealers Choice</MenuItem>
            </Select>
          </div>
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
            />
          </div>
          {/* this button currently doesn't work hahahah */}
          <Button variant="outlined" onClick={() => generate()}>Generate</Button>
        </Box>
        <Box sx={{ width: '50%' }}>
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
    </Box >
  );
}

export default App

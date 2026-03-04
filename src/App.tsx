import { useState } from 'react'
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import DistanceWorkout from './workouts/distanceWorkout';
import SprintWorkout from "./workouts/sprintWorkout";
import {Box} from "@mui/material";

function App() {
  const [type, setType] = useState("distance");
  const [spice, setSpice] = useState("mild");
  const [yardage, setYardage] = useState(5000);
  const [interval, setInterval] = useState<any>(90);
  const [easyInterval, setEasyInterval] = useState<any>(0);
  const [mediumInterval, setMediumInterval] = useState<any>(0);
  const [hardInterval, setHardInterval] = useState<any>(0);
  const [sprintInterval, setSprintInterval] = useState<any>(0);
  const [showWorkout, setShowWorkout] = useState(false)

  const calculateTime = (time: string | number, offset: number) => {
    const minutes = Math.floor((Number(time) / 60));
    const seconds = Number(time) - minutes * 60 + offset;
    const convertedTime = `${minutes}:${seconds}`

    return convertedTime;
  }

  const typeChange = (event: any) => {
    setType(event.target.value);
  };

  const spiceChange = (event: any) => {
    setSpice(event.target.value);
  };

  const yardageChange = (event: any) => {
    setShowWorkout(false)
    setYardage(event.target.valueAsNumber);
  };

  const baseIntervalChange = (event: any) => {

    setInterval(event.target.valueAsNumber)
    setMediumInterval(calculateTime(event.target.valueAsNumber, 5))
    setHardInterval(calculateTime(event.target.valueAsNumber, -5))
    setSprintInterval(calculateTime(event.target.valueAsNumber, -10));
    setEasyInterval(calculateTime(event.target.valueAsNumber, 10));
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
        <Box>Swim Workout Generator</Box>
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
              <MenuItem value="threshold">Threshold</MenuItem>
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
              onChange={yardageChange}
              InputProps={{
                inputProps: {
                  max: 10000, min: 50, step: 50
                }
              }}
            />
          </div>
          <div>
            <InputLabel>Pool Size</InputLabel>
            <RadioGroup defaultValue="LCM" name="radio-buttons-group">
              <FormControlLabel value="lc" control={<Radio />} label="LCM" />
              <FormControlLabel value="sc" control={<Radio />} label="SCY" />
              <FormControlLabel value="scm" control={<Radio />} label="SCM" />
            </RadioGroup>
          </div>
          <div>
            <TextField
              label="Base Interval (seconds) / 100"
              variant="outlined"
              type="number"
              onChange={baseIntervalChange}
            />
          </div>
          <div>
            <InputLabel>Spice Level</InputLabel>
            <Select
              labelId="spice"
              value={spice}
              label="Spice Level"
              onChange={spiceChange}
            >
              <MenuItem value="mild">Mild</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="spicy">Spicy</MenuItem>
              <MenuItem value="xSpicy">Extra Spicy</MenuItem>
            </Select>
          </div>
          <Button variant="outlined" onClick={() => generate()}>Generate</Button>
        </Box>
        <Box sx={{ width: '50%' }}>
          <Box>Your Workout</Box>
          <div>
            <ul>
              <li>Intervals</li>
              <ul>
                <li>Easy: {easyInterval}</li>
                <li>Medium: {mediumInterval}</li>
                <li>Hard: {hardInterval}</li>
                <li>Sprint: {sprintInterval}</li>
              </ul>
              {showWorkout &&
                type === 'distance' ? (
                <DistanceWorkout
                  spice={spice}
                  type={type}
                  yardage={yardage}
                  interval={interval}
                />) :
                type === 'sprint' &&
                (<SprintWorkout
                  spice={spice}
                  type={type}
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

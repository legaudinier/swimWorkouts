import express from "express";
import cors from "cors";
import { existsSync } from 'fs'
import XLSX from 'xlsx'

const app = express();
const PORT = 3001;

const FILE_PATH = './savedSwims.xlsx'

app.use(cors());
app.use(express.json());

app.get("/api/workouts", (req, res) => {
  if (!existsSync(FILE_PATH)) {
    app.listen(console.log(`exist sync got fired`));
    return []
  }
  const workbook = XLSX.readFile(FILE_PATH)
  const sheet = workbook.Sheets[workbook.SheetNames[0]]
  if (!sheet) return []

  const rows = XLSX.utils.sheet_to_json(sheet)
  const rowsData = rows.map((row) => ({
    id: row.id,
    type: row.type,
    yardage: row.yardage,
    interval: row.interval,
    warmUp: row.warmUp,
    coolDown: row.coolDown,
    mainSetDetails: {
      rounds: row.rounds,
      mainSetYardage: row.mainSetYardage,
      maxDistance: row.maxDistance,
      intervalTime: row.intervalTime,
      errorMessage: false,
      totalDistance: row.totalDistance,
      sprintRounds: row.sprintRounds,
      sprintDistance: row.sprintDistance,
      easyDistance: row.easyDistance,
      kickDistance: row.kickDistance,
      kickRounds: row.kickRounds,
      pullDistance: row.pullDistance,
      pullRounds: row.pullRounds,
      drillDistance: row.drillDistance,
      drillRounds: row.drillRounds,
      drills: row.drills,
      breathDistance: row.breathDistance,
      breathRounds: row.breathRounds,
      breathWorkoutPattern: row.breathWorkoutPattern,
      breathWorkPatternText: row.breathWorkPatternText
    },
    workoutDetails: row.workoutDetails,
    createdAt: row.createdAt
  }))

  res.json({ savedSwims: rowsData });
});

function readSwims() {
  if (!existsSync(FILE_PATH)) {
    app.listen(console.log(`exist sync got fired`))
    return []
  }
  const workbook = XLSX.readFile(FILE_PATH)
  const sheet = workbook.Sheets[workbook.SheetNames[0]]
  if (!sheet) return []
  const rows = XLSX.utils.sheet_to_json(sheet)
  return rows.map((row) => ({
    id: row.id,
    type: row.type,
    yardage: row.yardage,
    interval: row.interval,
    mainSetYardage: row.mainSetYardage,
    warmUp: row.warmUp,
    coolDown: row.coolDown,
    rounds: row.rounds,
    maxDistance: row.maxDistance,
    intervalTime: row.intervalTime,
    totalDistance: row.totalDistance,
    workoutDetails: row.workoutDetails,
    sprintRounds: row.sprintRounds,
    sprintDistance: row.sprintDistance,
    easyDistance: row.easyDistance,
    kickDistance: row.kickDistance,
    kickRounds: row.kickRounds,
    pullDistance: row.pullDistance,
    pullRounds: row.pullRounds,
    drillDistance: row.drillDistance,
    drillRounds: row.drillRounds,
    drills: row.drills,
    breathDistance: row.breathDistance,
    breathRounds: row.breathRounds,
    breathWorkoutPattern: row.breathWorkoutPattern,
    breathWorkPatternText: row.breathWorkPatternText,
    createdAt: row.createdAt
  }))
}

app.post('/api/addWorkout', (req, res) => {
  const workoutType = req.body.workoutType;
  const yardage = req.body.yardage;
  const interval = req.body.interval;
  const mainSetYardage = req.body.workoutDetails.mainSetYardage;
  const warmUp = req.body.workoutDetails.warmUp;
  const coolDown = req.body.workoutDetails.coolDown;
  const rounds = req.body.workoutDetails.mainSetDetails.rounds;

  const maxDistance = req.body.workoutDetails.mainSetDetails.maxDistance;
  const intervalTime = req.body.workoutDetails.mainSetDetails.intervalTime;
  const totalDistance = req.body.workoutDetails.mainSetDetails.totalDistance;

  const sprintRounds = req.body.workoutDetails.mainSetDetails.sprintRounds;
  const sprintDistance = req.body.workoutDetails.mainSetDetails.sprintDistance;
  const easyDistance = req.body.workoutDetails.mainSetDetails.easyDistance;
  const kickDistance =  req.body.workoutDetails.mainSetDetails.kickDistance;
  const kickRounds = req.body.workoutDetails.mainSetDetails.kickRounds;
  const pullDistance =  req.body.workoutDetails.mainSetDetails.pullDistance;
  const pullRounds = req.body.workoutDetails.mainSetDetails.pullRounds;
  const drillDistance = req.body.workoutDetails.mainSetDetails.drillDistance;
  const drillRounds = req.body.workoutDetails.mainSetDetails.drillRounds;
  const drills = req.body.workoutDetails.mainSetDetails.drills;
  const breathDistance = req.body.workoutDetails.mainSetDetails.breathDistance;
  const breathRounds = req.body.workoutDetails.mainSetDetails.breathRounds;
  const breathWorkoutPattern = req.body.workoutDetails.mainSetDetails.breathWorkoutPattern;
  const breathWorkPatternText = req.body.workoutDetails.mainSetDetails.breathWorkPatternText;

  try {
    const swimArray = readSwims()

    const newSwim = {
      id: Date.now(),
      type: workoutType,
      yardage: yardage,
      interval: interval,
      mainSetYardage: mainSetYardage,
      warmUp: warmUp,
      coolDown: coolDown,
      rounds: rounds,
      maxDistance: maxDistance,
      intervalTime: intervalTime,
      totalDistance: totalDistance,
      sprintRounds: sprintRounds,
      sprintDistance: sprintDistance,
      easyDistance: easyDistance,
      kickDistance: kickDistance,
      kickRounds: kickRounds,
      pullDistance: pullDistance,
      pullRounds: pullRounds,
      drillDistance: drillDistance,
      drillRounds: drillRounds,
      drills: drills,
      breathDistance: breathDistance,
      breathRounds: breathRounds,
      breathWorkoutPattern: breathWorkoutPattern,
      breathWorkPatternText: breathWorkPatternText
    }

    swimArray.push(newSwim)

    const worksheet = XLSX.utils.json_to_sheet(swimArray)
    const workbook = XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(workbook, worksheet, 'todos')
    XLSX.writeFile(workbook, FILE_PATH)

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
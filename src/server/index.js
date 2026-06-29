import express from "express";
import cors from "cors";
import { existsSync } from 'fs'
import XLSX from 'xlsx'

const app = express();
const PORT = 3001;

const FILE_PATH = './savedSwims.xlsx'

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "Hello from Express backend!" });
});

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
      totalDistance: row.totalDistance
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

  app.listen(console.log(req.body));

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
      totalDistance: totalDistance
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
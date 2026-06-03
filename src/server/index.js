import express from "express";
import cors from "cors";
import { existsSync } from 'fs'
import XLSX from 'xlsx'

const app = express();
const PORT = 3001;

const FILE_PATH = './todos.xlsx'

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
    workoutDetails: row.workoutDetails,
    createdAt: row.createdAt
  }))

  res.json({ message: rowsData });
});

function readTodos() {
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
    workoutDetails: row.workoutDetails
  }))
}

app.post('/api/addWorkout', (req, res) => {
  const workoutType = req.body.workoutType;
  const yardage = req.body.yardage;

  app.listen(console.log(req.body));

  try {
    const todosArray = readTodos()
    // const todosArray = [].concat(todos)
    const newTodo = { id: Date.now(), type: workoutType, yardage: yardage }

    todosArray.push(newTodo)
    // app.listen(console.log(todosArray));

    // res.status(201).json(todosArray)

    const worksheet = XLSX.utils.json_to_sheet(todosArray)
    const workbook = XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(workbook, worksheet, 'todos')
    XLSX.writeFile(workbook, FILE_PATH)

    // const wb = XLSX.readFile(EXCEL_PATH);
    // if (wb.SheetNames.includes(name)) {
    //   return res.status(400).json({ error: 'A tab with this name already exists' });
    // }
    // const ws = XLSX.utils.aoa_to_sheet([['ID', 'Text', 'Notes', 'Completed', 'CreatedAt', 'CompletedAt', 'Order', 'Type']]);
    // XLSX.utils.book_append_sheet(wb, ws, name);
    // XLSX.writeFile(wb, EXCEL_PATH);
    res.json({ success: true, todosArray, workbook, FILE_PATH });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add item to a sheet
// app.post('/api/items/:sheet', (req, res) => {
//   const sheetName = decodeURIComponent(req.params.sheet);
//   const sheets = getSheetNames();
//   if (!sheets.includes(sheetName)) {
//     return res.status(400).json({ error: 'Invalid sheet name' });
//   }
//   try {
//     const items = readSheet(sheetName);
//     const now = new Date();
//     const createdAt = now.toLocaleString('en-US', {
//       month: '2-digit', day: '2-digit', year: 'numeric',
//       hour: '2-digit', minute: '2-digit', hour12: true
//     });
//     const newItem = {
//       id: Date.now().toString(),
//       text: String(req.body.text || '').substring(0, 1000),
//       notes: String(req.body.notes || '').substring(0, 5000),
//       completed: false,
//       createdAt,
//       completedAt: '',
//       type: String(req.body.type || ''),cl
//       format: String(req.body.format || 'todo')
//     };
//     items.push(newItem);
//     writeSheet(sheetName, items);
//     res.json(newItem);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
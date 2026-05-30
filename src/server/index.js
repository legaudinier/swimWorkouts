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

// make your own get
// needs to read the spreadsheet
// return the spreadsheet
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
    totalYardage: row.totalYardage,
    warmUp: row.warmUp,
    mainSet: row.mainSet,
    coolDown: row.coolDown
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
  return workbook
  if (!sheet) return []
  const rows = XLSX.utils.sheet_to_json(sheet)
  return rows.map((row) => ({
    id: row.id
  }))
}

function writeTodos(todos) {
  const worksheet = XLSX.utils.json_to_sheet(todos)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Todos')
  XLSX.writeFile(workbook, FILE_PATH)
}

// GET all todos
app.get('/api/todos', (_req, res) => {
  const todos = readTodos()
  // res.json(todos)
  res.json({ message: "Hello from Express backend! To dos again" });

})

// POST a new todo
app.post('/api/addWorkout', (req, res) => {
  const { label } = req.body
  app.listen(PORT, () => console.log('this worked and hit the post'));
  const todos = readTodos()
  const newTodo = { id: Date.now() }
  todos.push(newTodo)
  writeTodos(todos)
  res.status(201).json(newTodo)
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
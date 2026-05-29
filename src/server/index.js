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

function readTodos() {
  if (!existsSync(FILE_PATH)) {
    return []
  }
  const workbook = XLSX.readFile(FILE_PATH)

  const sheet = workbook.Sheets[workbook.SheetNames[0]]
  if (!sheet) return []
  const rows = XLSX.utils.sheet_to_json(sheet)
  return rows.map((row) => ({
    id: row.id,
    label: row.label,
    done: row.done === true || row.done === 'true',
  }))
}

function writeTodos(todos) {
  const worksheet = XLSX.utils.json_to_sheet(todos)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Todos')
  XLSX.writeFile(workbook, FILE_PATH)
}

// GET all todos
app.get('/api/getWorkouts', (_req, res) => {
  const todos = readTodos()


  res.json(todos)
})

// POST a new todo
app.post('/api/todos', (req, res) => {
  const { label } = req.body
  if (!label || typeof label !== 'string' || !label.trim()) {
    return res.status(400).json({ error: 'label is required' })
  }
  const todos = readTodos()
  const newTodo = { id: Date.now(), label: label.trim(), done: false }
  todos.push(newTodo)
  writeTodos(todos)
  res.status(201).json(newTodo)
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require('express');
const cors = require('cors');
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const EXCEL_PATH = path.join(__dirname, '..', 'PodLeaderOrganization.xlsx');

const SHEETS = ['Swim'];

function ensureWorkbook() {
  if (!fs.existsSync(EXCEL_PATH)) {
    const wb = XLSX.utils.book_new();
    SHEETS.forEach(name => {
      const ws = XLSX.utils.aoa_to_sheet([['ID', 'Type', 'Yardage', 'Interval', 'WorkoutDetails', 'CreatedAt']]);
      XLSX.utils.book_append_sheet(wb, ws, name);
    });
    XLSX.writeFile(wb, EXCEL_PATH);
  } else {
    const wb = XLSX.readFile(EXCEL_PATH);
    let added = false;
    SHEETS.forEach(name => {
      if (!wb.Sheets[name]) {
        const ws = XLSX.utils.aoa_to_sheet([['ID', 'Type', 'Yardage', 'Interval', 'WorkoutDetails', 'CreatedAt']]);
        XLSX.utils.book_append_sheet(wb, ws, name);
        added = true;
      }
    });
    if (added) XLSX.writeFile(wb, EXCEL_PATH);
  }
}

function readSheet(sheetName) {
  ensureWorkbook();
  const wb = XLSX.readFile(EXCEL_PATH);
  const ws = wb.Sheets[sheetName];
  if (!ws) return [];
  const rows = XLSX.utils.sheet_to_json(ws);
  return rows.map((r, i) => ({
    id: String(r.ID || ''),
    type: String(r.Type || ''),
    yardage: String(r.Yardage || ''),
    interval: String(r.Interval || ''),
    workoutdetails: String(r.WorkoutDetails || ''),
    createdAt: String(r.CreatedAt || '')
  }));
}

function writeSheet(sheetName, items) {
  ensureWorkbook();
  const wb = XLSX.readFile(EXCEL_PATH);
  const data = [['ID', 'Type', 'Yardage', 'Interval', 'WorkoutDetails', 'CreatedAt']];
  items.forEach(item => {
    data.push([item.id, item.type, item.yardage, item.interval, item.workoutdetails, item.createdAt]);
  });
  const ws = XLSX.utils.aoa_to_sheet(data);
  wb.Sheets[sheetName] = ws;
  XLSX.writeFile(wb, EXCEL_PATH);
}

// GET items for a sheet
app.get('/api/:sheet', (req, res) => {
  const sheetName = decodeURIComponent(req.params.sheet);
  if (!SHEETS.includes(sheetName)) {
    return res.status(400).json({ error: 'Invalid sheet name' });
  }
  try {
    const items = readSheet(sheetName);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add item to a sheet
app.post('/api/items/:sheet', (req, res) => {
  const sheetName = decodeURIComponent(req.params.sheet);
  if (!SHEETS.includes(sheetName)) {
    return res.status(400).json({ error: 'Invalid sheet name' });
  }
  try {
    const items = readSheet(sheetName);
    const now = new Date();
    const createdAt = now.toLocaleString('en-US', {
      month: '2-digit', day: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit', hour12: true
    });
    const newItem = {
      id: Date.now().toString(),
      type: String(req.body.text || '').substring(0, 1000),
      yardage: String(req.body.notes || '').substring(0, 5000),
      interval: false,
      workoutdetails,
      createdAt: createdAt
    };
    items.push(newItem);
    writeSheet(sheetName, items);
    res.json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Excel file: ${EXCEL_PATH}`);
});

import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import Button from "@mui/material/Button";

export type ExcelExportType = {
  workoutType: any
  interval: any
  totalYardage: any
}

// total yardage
// interval
// warm up
// main set
// cool down 

const ExportToExcel = ({ workoutType, interval, totalYardage }: ExcelExportType) => {
  const RunExcelJSExport = () => {

    let wb = new ExcelJS.Workbook();
    let workbookName = "Swim Workout.xlsx";
    let worksheetName = `${workoutType} Workout - ${new Date().toISOString().slice(0, 10)}`;

    let ws = wb.addWorksheet(worksheetName,
      {
        properties: {
          tabColor: { argb: 'FFFF0000' }
        }
      }
    );

    ws.getCell('A1').value = `Workout Type: ${workoutType}`;
    ws.getCell('A2').value =
      `Total Yardage: ${totalYardage.warmUp + totalYardage.mainSetYardage + totalYardage.coolDown}`;
    ws.getCell('A3').value = `Base Interval: ${interval}`; // convert this to readable time


    ws.getCell('A5').value = `Warm up: ${totalYardage.warmUp}`;

    ws.getCell('A7').value = `Main set: ${totalYardage.mainSetYardage}`;

    ws.getCell('A9').value = `Warm down: ${totalYardage.coolDown}`;


    wb.xlsx.writeBuffer()
      .then(function (buffer) {
        saveAs(
          new Blob([buffer], { type: "application/octet-stream" }),
          workbookName
        );
      });
  }

  return (
    <Button variant="outlined"
      sx={{ width: '100%', color: '#7d34eb' }} onClick={() => RunExcelJSExport()}>
      Export To Excel</Button>
  );
};

export default ExportToExcel;
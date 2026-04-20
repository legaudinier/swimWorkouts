import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import Button from "@mui/material/Button";
import { readableTime } from './utilities';

export type ExcelExportType = {
  workoutType: any
  interval: any
  workoutDetails: any
}

// total yardage
// interval
// warm up
// main set
// cool down 

const ExportToExcel = ({ workoutType, interval, workoutDetails }: ExcelExportType) => {
  const RunExcelJSExport = () => {

    let wb = new ExcelJS.Workbook();
    let workbookName = "Swim Workout.xlsx";
    let worksheetName = `${workoutType} Workout - ${new Date().toISOString().slice(0, 10)}`;
    const capitalizedWorkoutType = workoutType.charAt(0).toUpperCase() + workoutType.slice(1)

    let ws = wb.addWorksheet(worksheetName);

    ws.getCell('A1').value = `Workout Type: ${capitalizedWorkoutType}`;
    ws.getCell('A3').value =
      `Total Yardage: ${workoutDetails.warmUp + workoutDetails.mainSetYardage + workoutDetails.coolDown}`;

    ws.getCell('A5').value = `Warm up: ${workoutDetails.warmUp}`;

    ws.getCell('A7').value = `Main set: ${workoutDetails.mainSetYardage}`;
    if (workoutType === 'distance') {
      ws.getCell('B8').value =
        ` ${workoutDetails.mainSetDetails.rounds} x ${workoutDetails.mainSetDetails.maxDistance} on the ${readableTime(workoutDetails.mainSetDetails.intervalTime, false)}`;
      ws.getCell('B9').value = `Pace: ${readableTime((interval), false)} per 100`;
    }

    ws.getCell('A11').value = `Warm down: ${workoutDetails.coolDown}`;

    //  text-transform: capitalize;
    // STYLING

    ws.getCell('A1').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '7d34eb' }
    };

    ws.mergeCells('A1:E1');
    ws.mergeCells('A3:E3');
    ws.mergeCells('A5:E5');
    ws.mergeCells('A7:E7');
    ws.mergeCells('B8:E8');
    ws.mergeCells('B9:E9');
    ws.mergeCells('A11:E11');


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
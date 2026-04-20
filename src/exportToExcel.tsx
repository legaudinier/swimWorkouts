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
    const capitalizedWorkoutType = workoutType.charAt(0).toUpperCase() + workoutType.slice(1)

    let ws = wb.addWorksheet(`${workoutType} Workout - ${new Date().toISOString().slice(0, 10)}`, { views: [{ showGridLines: false }] });

    ws.getCell('A1').value = `${capitalizedWorkoutType} Workout`;
    ws.getCell('A3').value =
      `Total Yardage: ${workoutDetails.warmUp + workoutDetails.mainSetYardage + workoutDetails.coolDown}`;

    ws.getCell('A5').value = `Warm up: ${workoutDetails.warmUp}`;

    ws.getCell('A7').value = `Main set: ${workoutDetails.mainSetYardage}`;
    if (workoutType === 'distance') {
      ws.getCell('B8').value =
        ` ${workoutDetails.mainSetDetails.rounds} x ${workoutDetails.mainSetDetails.maxDistance} on the ${readableTime(workoutDetails.mainSetDetails.intervalTime, false)}`;
      ws.getCell('B9').value = `Pace: ${readableTime((interval), false)} per 100`;
    }
    else if (workoutType === 'sprint') {

      ws.getCell('A8').value = `${workoutDetails.mainSetDetails.rounds} x `;
      ws.getCell('C8').value =
        ` ${workoutDetails.mainSetDetails.sprintRounds} x ${workoutDetails.mainSetDetails.sprintDistance} on the ${readableTime((interval * workoutDetails.mainSetDetails.sprintDistance / 100), false)}`;
      ws.getCell('C9').value = `${workoutDetails.mainSetDetails.easyDistance} easy`;
      ws.mergeCells('A8:A9');

      ws.getCell('A8').alignment = {
        vertical: 'middle', horizontal: 'center'
      };

      ws.getCell('A8').border = {
        right: { style: 'thin' }
      };

    }

    ws.getCell('A11').value = `Warm down: ${workoutDetails.coolDown}`;

    // STYLING

    ws.getCell('A1').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '7d34eb' }
    };

    ws.getCell('A1').font = {
      family: 2,
      size: 14,
      bold: true
    };

    ws.getCell('A1').alignment = {
      vertical: 'middle', horizontal: 'center'
    };


    ws.mergeCells('A1:E1');



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
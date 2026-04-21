import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import Button from "@mui/material/Button";
import { readableTime } from './utilities';

export type ExcelExportType = {
  workoutType: any
  interval: any
  workoutDetails: any
  disableButton: boolean
}

const ExportToExcel = ({ workoutType, interval, workoutDetails, disableButton }: ExcelExportType) => {
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

    // DISTANCE || THRESHOLD
    if (workoutType === 'distance' || workoutType === 'threshold') {
      ws.getCell('B8').value =
        ` ${workoutDetails.mainSetDetails.rounds} x ${workoutDetails.mainSetDetails.maxDistance} on the ${readableTime(workoutDetails.mainSetDetails.intervalTime, false)}`;
      ws.getCell('B9').value = `Pace: ${readableTime((interval), false)} per 100`;
      ws.getCell('A11').value = `Warm down: ${workoutDetails.coolDown}`;

    }
    // SPRINT 
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
      ws.getCell('A11').value = `Warm down: ${workoutDetails.coolDown}`;

    }
    // EASY
    else if (workoutType === 'easy') {

      ws.getCell('B8').value = `Kick`;
      ws.getCell('C8').value =
        ` ${workoutDetails.mainSetDetails.kickRounds} x ${workoutDetails.mainSetDetails.kickDistance}`;

      ws.getCell('B9').value = `Pull`;
      ws.getCell('C9').value =
        ` ${workoutDetails.mainSetDetails.pullRounds} x ${workoutDetails.mainSetDetails.pullDistance}`;

      ws.getCell('B10').value = `Drill`;
      ws.getCell('C10').value =
        ` ${workoutDetails.mainSetDetails.drillRounds} x ${workoutDetails.mainSetDetails.drillDistance}`;

      ws.getCell('D11').value = `${(workoutDetails.mainSetDetails.drills.join("\r\n"))}`;

      ws.getCell('C11').alignment = { wrapText: true };


      ws.getCell('B12').value = `Breath`;
      ws.getCell('C12').value =
        ` ${workoutDetails.mainSetDetails.breathRounds} x ${workoutDetails.mainSetDetails.breathDistance}`;

      ws.getCell('D13').value =
        ` ${workoutDetails.mainSetDetails.breathWorkPatternText} by 50s`;


      ws.getCell('B8').border = {
        right: { style: 'thin' }
      };
      ws.getCell('B9').border = {
        right: { style: 'thin' }
      };
      ws.getCell('B10').border = {
        right: { style: 'thin' }
      };
      ws.getCell('B11').border = {
        right: { style: 'thin' }
      };
      ws.getCell('B12').border = {
        right: { style: 'thin' }
      };

      ws.getCell('A14').value = `Warm down: ${workoutDetails.coolDown}`;

    }

    // General Styling

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
  console.log('disableButton', disableButton)

  return (
    <Button variant="outlined" disabled={!disableButton}
      sx={{ width: '100%', color: '#7d34eb' }} onClick={() => RunExcelJSExport()}>
      Export To Excel</Button>
  );
};

export default ExportToExcel;
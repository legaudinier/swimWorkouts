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
    let data = [
      {
        'salesman-name': "Jim Smith",
        sales: 12345,
      }
    ];


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

    ws.columns = [
      {
        key: "salesman-name",
        header: "Salesman-Name",
        width: 20
      },
    ];

    ws.addRows(data);

    ws.getCell('A1').value = `Workout Type: ${workoutType}`;
    ws.getCell('A2').value = `Total Yardage: ${totalYardage}`;
    ws.getCell('A3').value = `Base Interval: ${interval}`; // convert this to readable time


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
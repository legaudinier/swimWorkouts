import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import Button from "@mui/material/Button";


const ExportToExcel = () => {
  const RunExcelJSExport = () => {
    let data = [
      {
        'salesman-name': "Jim Smith",
        sales: 12345,
        uri: "https://www.google.com",
        'met target': true,
        status: "Employee",
        dob: new Date(Date.UTC(1950, 0, 1, 0, 0, 0)),
        level: 1.1,
        comments:
          ""
      }
    ];


    let wb = new ExcelJS.Workbook();
    let workbookName = "Swim Workout.xlsx";
    let worksheetName = "Swim Workout Worksheet";
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
      {
        key: "sales",
        header: "Sales",
        width: 15,
        style: { numFmt: '"£"#,##0.00;[Red]-"£"#,##0.00' }
      },
      {
        key: "uri",
        header: "URI",
        width: 30,
        outlineLevel: 1,
        hidden: false
      },
      {
        key: "met target",
        header: "Met Target?",
        width: 12,
        style: {
          alignment: { horizontal: "center" },
          font: { color: { argb: "008000" } }
        }
      },
      {
        key: "status",
        header: "Status"
      },
      {
        key: "dob",
        header: "Date of Birth",
        width: 12,
        style: { numFmt: "dd/mm/yyyy" }
      },
      {
        key: "level",
        header: "Level",
        width: 5,
        style: { numFmt: "0.0" }
      },
      {
        key: "comments",
        header: "Comments",
        width: 30,
        style: { alignment: { wrapText: true }, numFmt: '@' },
        outlineLevel: 1,
        hidden: false
      },
      {
        key: "dob_linked",
        header: "Date of Birth (Linked and Formatted)",
        width: 35,
        style: { numFmt: "dddd, MMMM dd, yyyy" },
        outlineLevel: 2,
        hidden: false
      },

    ];

    ws.getRow(1).font = { bold: true };
    ws.getCell("B1").alignment = { horizontal: "right" };
    ws.getCell('F1').alignment = { textRotation: 90 };

    ws.addRows(data);

    ws.getCell("C2").value = {
      text: "www.google.com",
      hyperlink: "http://www.google.com",
      tooltip: "Click to go to google.com"
    };
    ws.getCell("C2").font = {
      color: { argb: "0000FF" },
      underline: true
    };

    let totCell = "B" + (data.length + 2);
    let totFormula = "SUM(B2:B" + (data.length + 1) + ")";
    ws.getCell(totCell).value = { formula: totFormula };
    ws.getCell(totCell).border = {
      top: { style: "thin" },
      bottom: { style: "double" }
    };

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
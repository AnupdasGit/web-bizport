import { Button } from "@chakra-ui/react";
import { FiDownload } from "react-icons/fi";
import ExcelJS from "exceljs/dist/exceljs.min.js";

export default function ExportExcelButton({ rows, columns, fileName }) {
  const exportRows = async () => {
    const data = rows.map((row) =>
      columns.reduce((result, column) => {
        result[column.key] = column.exportValue
          ? column.exportValue(row)
          : (row[column.key] ?? "");
        return result;
      }, {}),
    );
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Messages");
    worksheet.columns = columns.map((column) => ({
      header: column.label,
      key: column.key,
      width: 22,
    }));
    worksheet.addRows(data);

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${fileName}.xlsx`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Button
      leftIcon={<FiDownload />}
      variant="outline"
      onClick={exportRows}
      isDisabled={rows.length === 0}
    >
      Export to Excel
    </Button>
  );
}

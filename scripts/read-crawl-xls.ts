import * as XLSX from 'xlsx';

const workbook = XLSX.readFile('/home/marvin/Downloads/pages_www.cutiepawspedia.com_2025-12-16_19-40-22.xls');
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(sheet) as Record<string, unknown>[];

console.log(`Total rows: ${data.length}`);
console.log(`\nColumns: ${Object.keys(data[0] || {}).join(', ')}`);
console.log(`\n=== All Data ===\n`);

// Show all data
data.forEach((row, i) => {
  console.log(`${i + 1}. ${row['Address'] || row['URL'] || row['address'] || JSON.stringify(row)}`);
});

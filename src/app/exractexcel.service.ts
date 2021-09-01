import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { File } from '@ionic-native/file/ngx';
const EXCEL_TYPE =
'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExractexcelService {

  constructor(private file: File) { }
  
  public exportAsExcelFile(json:any [], excelFileName: string):void {
    const worksheet:XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log('worksheet',worksheet);
    const workbook: XLSX.WorkBook = { Sheets: {'data': worksheet},
    SheetNames: ['data']};
    const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx',
  type: 'array'});
  this.saveAsExcelFile(excelBuffer, excelFileName);

  }

  // private saveAsExcelFile(buffer: any, fileName: string): void{
  //   const data: Blob = new Blob([buffer],{
  //     type: EXCEL_TYPE
  //   });
  //   FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  // }
  
//   private saveAsExcelFile(buffer: any, fileName: string): void {
//     const blob = new Blob([buffer._body],
//         { type: 'application/vnd.ms-excel' });
//     // const file = new File([blob], 'report.xlsx',
//     //     { type: 'application/vnd.ms-excel' });
//     const file = this.file.documentsDirectory;

//     FileSaver.saveAs(file);
// }

private saveAsExcelFile(buffer: any, fileName: string): void {
  // const data: Blob = new Blob([buffer],{
  //       type: EXCEL_TYPE
  //     });
//   const file = new File([blob], 'report.xlsx',
//  { type: 'application/vnd.ms-excel' });
   //Determine a native file path to save to
  const path = this.file.documentsDirectory + '/Download/'; 
  let filename = 'report.xlsx';
  this.file.writeFile(path,filename,file).then((entry) => {
    alert("download completed");
  }, (error) => {
    alert("Download Failed.");
  }).catch(err=>{
    alert("Download Failed catch.");
    alert(err.message);

  });
}
}

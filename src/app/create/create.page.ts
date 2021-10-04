import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { ExractexcelService} from '../exractexcel.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})

export class CreatePage implements OnInit {

  startDateVal: string = "";
  startTimeVal: string = "";
  endTimeVal: string = "";
  departurePointVal: string = "";
  arrivalPointVal: string = "";
  avespeedVal:string = "";
  fuelVal:string = "";
  weatherVal:string = "";
  windVal:string = "";
  commentVal:string = "";
  crewnumberVal:string = "";
  loggedbyVal:string = "";

  //data: data to be extracted as xlsx and to be saved on a a mobile 
  // but the actual data (is to obtained from a crud.service)
  //that I wish to save as xlsx  on a device

   
  data:any = [{
    eid: 'A1',
    ename: 'Angular',
    esal: 5333
  }];

   

  constructor(
   public crud: CrudService, public extractxlsx: ExractexcelService
  ) {
    this.crud.databaseConn(); 
  }

  ngOnInit() { }

  ionViewDidEnter() {  
    this.crud.getAllVessels()
  }
   
  createVessel(){
    this.crud.addItem(this.startDateVal, this.startTimeVal, this.endTimeVal,this.departurePointVal,this.arrivalPointVal, this.avespeedVal, this.fuelVal, this.weatherVal, this.windVal,  this.commentVal, this.crewnumberVal, this.loggedbyVal);
  }
   
  remove(vessel) {
    this.crud.deleteVessel(vessel);
  }
  
exportAsXLSX():void {
  this.extractxlsx.exportAsExcelFile(this.data, 'sample');
}
  
}
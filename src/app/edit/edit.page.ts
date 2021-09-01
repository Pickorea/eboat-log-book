import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { ActivatedRoute, Router } from "@angular/router";
import { IonDatetime } from '@ionic/angular';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})

export class EditPage implements OnInit {
  id: any;
  startDateVal: string = "";
  startTimeVal: string = "";
  endTimeVal: string = "";
  departurePointVal: string = "";
  arrivalPointVal: string = "";
  avespeedVal:string = "";
  fuelVal:string = "";
  weatherVal:string = "";

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private crud: CrudService
  ) { 
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.crud.getVessel(this.id).then((res) => {
      this.startDateVal = res['startDate'];
      this.startTimeVal = res['startTime']; 
      this.endTimeVal = res['endTime']; 
      this.departurePointVal = res['departurePoint']; 
      this.arrivalPointVal = res['arrivalPoint']; 
      this.avespeedVal = res['avespeed'];
      this.fuelVal = res['fuel'];
      this.weatherVal = res['weather'];
    })
  }

  ngOnInit() { }

  onUpdate() {
     this.crud.updateVessel(this.id,  this.startDateVal, this.endTimeVal, this.startTimeVal, this.departurePointVal, this.arrivalPointVal, this.avespeedVal, this.fuelVal, this.weatherVal).then(() => {
        this.router.navigate(['/create']);
     })
  }

}
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreatePageRoutingModule } from './create-routing.module';
import { CreatePage } from './create.page';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatePageRoutingModule,
    HttpClientModule,
    NgxDatatableModule
  ],
  declarations: [CreatePage]
  // schemas: [
  //   CUSTOM_ELEMENTS_SCHEMA
  // ]
})

export class CreatePageModule {}




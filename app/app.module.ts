import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DxDataGridModule, DxSelectBoxModule, DxValidatorModule, DxValidationGroupModule } from 'devextreme-angular';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, DxSelectBoxModule, DxValidatorModule, DxValidationGroupModule ],
  declarations: [ AppComponent, HelloComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }



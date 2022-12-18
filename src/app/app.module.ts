import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { SortedNumbers } from './app.component';

@NgModule({
  declarations: [
    SortedNumbers
  ],
  imports: [
    ReactiveFormsModule, BrowserModule, HttpClientModule, FormsModule
  ],
  providers: [],
  bootstrap: [SortedNumbers]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { StoreModule } from '@ngrx/store';
import { exerciseReducer } from './reducers/exercise.reducer';
import { workoutReducer } from './reducers/workoutsettings.reducer';

import { ExerciselistComponent } from './exerciselist/exerciselist.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule } from '@angular/forms';
import { TimerComponent } from './timer/timer.component';
import { HeaderComponent } from './header/header.component';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    ExerciselistComponent,
    TimerComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({exercisesCollection: exerciseReducer, workoutSettings: workoutReducer}),
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

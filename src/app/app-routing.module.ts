import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerComponent } from './timer/timer.component';
import { ExerciselistComponent } from './exerciselist/exerciselist.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'timer', component: TimerComponent },
  { path: 'exercises', component: ExerciselistComponent },
  { path: '**', component: ExerciselistComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

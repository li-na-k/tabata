import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { Exercise } from '../models/exercise.model';
import { selectAllExercises, selectWorkoutDuration, selectWorkoutExerciseNumber, selectWorkoutExercises } from '../selectors/exercise.selectors';
import { selectBreakDuration, selectExerciseDuration } from '../selectors/workoutsettings.selectors';
import { selectFilteredExercises } from '../selectors/exercise.selectors';
import { Observable } from 'rxjs';
import {addExerciseToWorkout} from 'src/app/actions/exercise.actions';
import {removeExerciseFromWorkout} from 'src/app/actions/exercise.actions';
import { changeBreakDuration } from '../actions/workout.actions';
import { changeExerciseDuration } from '../actions/workout.actions';
import { changeExercisePosition } from 'src/app/actions/exercise.actions';
import { FormControl } from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {CdkDragDrop} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-exerciselist',
  templateUrl: './exerciselist.component.html',
  styleUrls: ['./exerciselist.component.css']
})
export class ExerciselistComponent implements OnInit {

  public allExercises$ : Observable<Exercise[]> = this.store.select(selectAllExercises);
  public exercisesOfWorkout$ : Observable<Exercise[]> = this.store.select(selectWorkoutExercises);
  public breakduration$ : Observable<number> = this.store.select(selectBreakDuration);
  public exerciseduration$ : Observable<number> = this.store.select(selectExerciseDuration);
  public filteredExercises$ : Observable<Exercise[]> = this.store.select(selectFilteredExercises(""));
  public exerciseNumber$ : Observable<number> = this.store.select(selectWorkoutExerciseNumber);
  public selectWorkoutDuration$ : Observable<number> = this.store.select(selectWorkoutDuration)
  breakduration = 20;
  exerciseduration = 50;
  disableScrollDown = false;
  //public filteredOptions: Observable<Exercise[]> = new Observable();
  //myControl = new FormControl();

  constructor(private store: Store<AppState>) { } 

  ngOnInit(): void {
    console.log("all exercises", this.allExercises$)
  }

  ngAfterViewChecked() {
    this.scrollBottom()
  }

  addToWorkout(id : number){
    this.store.dispatch(addExerciseToWorkout({id}))
    this.disableScrollDown = false;
  }

  removeFromWorkout(pos : number){
    this.store.dispatch(removeExerciseFromWorkout({pos}))
  }

  drop(event: CdkDragDrop<Exercise[]>) {
    var old_pos : number = event.previousIndex;
    var new_pos : number = event.currentIndex;
    this.store.dispatch(changeExercisePosition({old_pos, new_pos}))
  }

  onScroll() {
    if(!this.disableScrollDown){
      this.disableScrollDown = true;
      console.log("disabled?", this.disableScrollDown)
    }
  }

  scrollBottom(){
    if (this.disableScrollDown) {
      return
    }
    else{
      var window = document.getElementsByClassName("selection")[0];
      window.scrollTop = window.scrollHeight;
    }
  }

  filter(value: string): void {
    this.filteredExercises$ = this.store.select(selectFilteredExercises(value));
  }


  changeBreakDuration(duration : number){
    this.store.dispatch(changeBreakDuration({duration}))
  }

  changeExerciseDuration(duration : number){
    this.store.dispatch(changeExerciseDuration({duration}))
  }

}

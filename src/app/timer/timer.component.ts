import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { Exercise } from '../models/exercise.model';
import { selectWorkoutExercises } from '../selectors/exercise.selectors';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { selectBreakDuration } from '../selectors/workoutsettings.selectors';
import { selectExerciseDuration } from '../selectors/workoutsettings.selectors';
import { HttpClient } from '@angular/common/http';
import { ExerciselistComponent } from '../exerciselist/exerciselist.component';


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy{

  currentExercise : Exercise =  {name: "Situp", instruction: "Lie down on your back, keep your knees bent, and your back and feet flat on the mat. Slowly lift your torso and sit up. Return to the starting position by rolling down one vertebra at a time.", id: 0};
  interval : any;
  public exercisesOfWorkout$ : Observable<Exercise[]> = this.store.select(selectWorkoutExercises);
  break : boolean = true;
  workoutStarted : boolean = false;
  workoutDone : boolean = false;
  workoutRunning : boolean = false;
  public breakduration$ : Observable<number> = this.store.select(selectBreakDuration);
  public exerciseduration$ : Observable<number> = this.store.select(selectExerciseDuration);
  timeLeft : number = 5;
  exNumber : number = 0;
  destroyed : Subject<void> = new Subject();
  subscriptions : Subscription = new Subscription();

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
    this.subscriptions.unsubscribe();
  }

  startTimer() {
    var audio = new Audio(window.location.origin + "/assets/bling.mp3");
    var audio_success = new Audio(window.location.origin + "/assets/success.mp3");

    //resetting
    this.workoutStarted = true;
    this.workoutRunning = true;
    this.workoutDone = false;
    this.exerciseduration$.pipe(takeUntil(this.destroyed)).subscribe(d => this.timeLeft = d)
    clearInterval(this.interval)
    this.exNumber = 0;

    /* so kann man auch subscription managen: 
    this.subscriptions.add(... Observable) 
    -> siehe ngOnDestroy */
    this.exercisesOfWorkout$.pipe(takeUntil(this.destroyed)).subscribe(d => 
    {
      this.currentExercise = d[0]
      this.interval = setInterval(() => {
        if(this.workoutRunning){
          if(this.timeLeft > 0) { //count down
            this.timeLeft--;
          }
          else if(this.exNumber+1 < d.length){ //when zero and not yet all exercises done
            if(this.break == true){ //break
              this.currentExercise = {name: "Break", id: -1};
              this.breakduration$.pipe(takeUntil(this.destroyed)).subscribe(d => this.timeLeft = d); //wirklich immer so subscriben?
              this.break = false;
            }
            else{ //next exercise
              ++this.exNumber;
              this.currentExercise = d[this.exNumber]
              this.exerciseduration$.subscribe(d => this.timeLeft = d);
              this.break = true;
            }
          }
          else{ //workout done
            this.workoutDone = true;
            this.workoutStarted = false;
            this.workoutRunning = false;
            audio_success.play();
            clearInterval(this.interval);
          }
          if(this.timeLeft == 3 || this.timeLeft == 2 || this.timeLeft == 1){
            audio.play();
          }
          if(this.timeLeft == 0 && !this.workoutDone){
            audio.play();
          }
        }
      },1000)
    })
  }


  pauseTimer(){
    this.workoutRunning = false;
  }

  continueTimer(){
    this.workoutRunning = true;
  }

  resetTimer(){
    this.startTimer()
    this.pauseTimer()
  }

  skipExercise(){
    this.timeLeft = 0;
    this.break = false;
  }


}

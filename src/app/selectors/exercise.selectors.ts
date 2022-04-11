import { createSelector, createFeatureSelector, resultMemoize } from '@ngrx/store';
import { AppState } from '../app.state';
import { Exercise } from '../models/exercise.model';
import { ExercisesState } from '../reducers/exercise.reducer';
import { selectBreakDuration } from './workoutsettings.selectors';

export const selectEx = (state: AppState) => state.exercisesCollection //aber mit counter, ganzer sub-state so wie im reducer
export const selectExercises = createFeatureSelector<Exercise[]>('exercisesCollection'); //so gehts auch (aber wieder ganzer sub-state mit counter)


export const selectAllExercises = createSelector( //Nur exercises array aus sub-state -- Version 1
    selectEx, (state: ExercisesState) => state.exercises
);

export const selectAllExercises2 = createSelector( // -- Version 2
    selectEx,
    d => d.exercises
);

export const selectWorkoutExercises = createSelector(
    selectEx, (state: ExercisesState) =>
        { 
        //console.log("workout ids",state.workout)
        var result : Exercise[] = [];
        state.workout.forEach(workout_id => {
            var element = state.exercises.find(d => d.id == workout_id)
            element?(result.push(element)):console.log("error, not found")
        })
        return result;
        }
);

export const selectWorkoutExerciseNumber = createSelector(
    selectEx, (state: ExercisesState) =>
        { 
        return state.workout.length;
        }
);

/*export const selectWorkoutDuration = (state: AppState) => {
    const exerciseduration = selectWorkoutDuration(state as any);
    const numberExercises = selectWorkoutExerciseNumber(state as any);
    const breakduration = selectBreakDuration(state as any);
    const duration : number = exerciseduration*numberExercises + breakduration*(numberExercises-1);
    return duration;
}*/

export const selectWorkoutDuration = (state: AppState) => {
    const exerciseduration = state.workoutSettings.exerciseduration
    const breakduration = state.workoutSettings.breakduration
    const numberExercises = state.exercisesCollection.workout.length
    const totalDuration : number = exerciseduration*numberExercises + breakduration*(numberExercises-1);
    return totalDuration*1000; //milliseconds
}

export const selectFilteredExercises = (filter : string) =>
    createSelector(
        selectEx, (state: ExercisesState) =>
        {
            var result : Exercise[] = [];
            state.exercises.forEach(item => {
                if(item.name.toLowerCase().includes(filter.toLowerCase())){
                    result.push(item)
                }
            })
            return result;
        }
)
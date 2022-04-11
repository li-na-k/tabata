import { createReducer, on } from '@ngrx/store';
import { changeBreakDuration } from '../actions/workout.actions';
import { changeExerciseDuration } from '../actions/workout.actions';

export interface WorkoutSettingState {
    breakduration : number;
    exerciseduration : number;

}

export const initialState :  WorkoutSettingState = {
    breakduration: 10,
    exerciseduration: 50
}

export const workoutReducer = createReducer(
    initialState,
    on(changeBreakDuration, (state, {duration}) => ({
        ...state,
        breakduration: duration
    })),
    on(changeExerciseDuration, (state, {duration}) => ({
        ...state,
        exerciseduration: duration
    }))
)
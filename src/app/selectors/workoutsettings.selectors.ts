import { createSelector} from '@ngrx/store';
import { AppState } from '../app.state';
import { WorkoutSettingState } from '../reducers/workoutsettings.reducer';

//export const selectWorkoutSettings = (state: AppState) => state.workoutSettings 
export const selectWorkoutSettings = (state: any) => {console.log("state", state);
    return state.hasOwnProperty('workoutSettings') ? state.workoutSettings : '';}

export const selectExerciseDuration = createSelector( 
    selectWorkoutSettings, (state: WorkoutSettingState) => state.exerciseduration
);

export const selectBreakDuration = createSelector( 
    selectWorkoutSettings, (state: WorkoutSettingState) => state.breakduration
);


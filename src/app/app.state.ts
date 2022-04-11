import { ExercisesState } from "./reducers/exercise.reducer";
import { WorkoutSettingState } from "./reducers/workoutsettings.reducer";

export interface AppState {
    exercisesCollection: ExercisesState;
    workoutSettings: WorkoutSettingState;
}
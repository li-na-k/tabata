import { createAction, props } from '@ngrx/store';
import { Exercise } from 'src/app/models/exercise.model';

export const createExercise = createAction(
    '[Exercise List] Create Exercise',
    props<{name: string, instruction?: string}>()
);

export const addExerciseToWorkout = createAction(
    '[Workout List] add Exercise to Workout',
    props<{id: number}>()
);

export const removeExerciseFromWorkout = createAction(
    '[Workout List] remove Exercise from Workout',
    props<{pos: number}>()
);

export const changeExercisePosition = createAction(
    '[Workout List] change Exercise position',
    props<{old_pos: number, new_pos : number}>()
);



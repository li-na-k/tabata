import { createAction, props } from '@ngrx/store';

export const changeBreakDuration = createAction(
    '[Workout List] change break duration',
    props<{duration: number}>()
);

export const changeExerciseDuration = createAction(
    '[Workout List] change exercise duration',
    props<{duration: number}>()
);
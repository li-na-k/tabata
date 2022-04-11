import { createReducer, on } from '@ngrx/store';
import { Exercise } from 'src/app/models/exercise.model';
import { changeExercisePosition, createExercise } from 'src/app/actions/exercise.actions';
import {addExerciseToWorkout} from 'src/app/actions/exercise.actions';
import { removeExerciseFromWorkout } from 'src/app/actions/exercise.actions';


export interface ExercisesState {
    exercises: Exercise [];
    idCounter: number;
    workout: number[];
}

export const initialState :  ExercisesState = {
    exercises : [{name: "Situp", instruction: "Lie down on your back, keep your knees bent, and your back and feet flat on the mat. Slowly lift your torso and sit up. Return to the starting position by rolling down one vertebra at a time.", id: 0},
    {name: "Liegestütze", instruction: "Halte deinen ganzen Körper unter Spannung (vor allem den Rumpf und die Gesäßmuskulatur). Dein Körper sollte während der Übungsausführung immer eine gerade Linie bilden.", id: 1},
    {name: "Plank", instruction: "Begin in the plank position, face down with your forearms and toes on the floor. Engage your abdominal muscles, drawing your navel toward your spine. Hold this position", id: 2}, 
    {name: "Squats", instruction: "Stand up with your feet shoulder-width apart.Bend your knees, press your hips back and stop the movement once the hip joint is slightly lower than the knees. Press your heels into the floor to return to the initial position.", id: 3}],
    idCounter: 3,
    workout: [0,1],
}

export const exerciseReducer = createReducer(
    initialState,
    on(createExercise, (state, {name, instruction}) => {
        return{
        ...state,
        exercises: [...state.exercises, {id: initialState.idCounter, name: name, instruction: instruction}],
        idCounter: state.idCounter+1
    }}),
    on(addExerciseToWorkout, (state, {id}) => ({
        ...state,
        workout: state.workout.concat(id) //[...state.workout, id]
    })),
    on(removeExerciseFromWorkout, (state, {pos}) => ({
        ...state,
        workout: [
            ...state.workout.slice(0, pos),
            ...state.workout.slice(pos + 1)
        ],
    })),
    on(changeExercisePosition, (state, {old_pos, new_pos}) => {
        var el = state.workout[old_pos]
        const newArray = [...state.workout];
        newArray.splice(old_pos, 1); //remove
        newArray.splice(new_pos, 0, el); //insert
        return{
        ...state,
        workout: newArray,
    }}),
)
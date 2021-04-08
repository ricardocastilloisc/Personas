import { ActionReducerMap } from '@ngrx/store';
import { PersonaReducer, State } from './redux/personas.reducer';


export interface AppState {
   personas: State,
}

export const appReducers: ActionReducerMap<AppState> = {
   personas: PersonaReducer,
}

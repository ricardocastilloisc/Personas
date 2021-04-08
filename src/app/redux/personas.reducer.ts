import { Action, createReducer, on } from '@ngrx/store';

import { Persona } from '../models/persona.model';
import { crearPersona, setPersona } from './personas.actions';

export interface State {
  personas: Persona[];
}

export const estadoInicial: State = {
  personas: [],
};

const _PersonaReducer = createReducer(
  estadoInicial,
  on(crearPersona, (state, { persona }) => ({
    ...state,
    personas: [...state.personas, persona],
  })),
  on(setPersona, (state, { pesonas }) => ({ ...state, persona: pesonas }))
);

export let PersonaReducer = (state, action) => {
  return _PersonaReducer(state, action);
};

import { createAction, props } from '@ngrx/store';
import { Persona } from '../models/persona.model';


export const setPersona = createAction(
  '[Personas] SetPersonas',
  props<{personas:Persona[]}>()
);

export const crearPersona = createAction('[Personas] CrearPersona', props<{persona:Persona}>());

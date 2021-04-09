import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Persona } from '../models/persona.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reduce';
import { setPersona, crearPersona } from '../redux/personas.actions';

@Injectable({
  providedIn: 'root',
})
export class PersonasService {
  PesonasSub: Subscription;
  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.getPersonas();
  }

  getPersonas = () => {
    if (localStorage.getItem('personas')) {
      this.store.dispatch(
        setPersona({ personas: JSON.parse(localStorage.getItem('personas')) })
      );
    } else {
      this.PesonasSub = this.http
        .get('https://randomuser.me/api/?results=2')
        .pipe(
          map(({ results }: any) => {
            results.map((e) => {
              e.genero = e.gender == 'male' ? 'masculino' : 'femenino';
              e.nombre = e.name.first + ' ' + e.name.last;
              e.edad = e.dob.age;
              e.img = e.picture.thumbnail;
            });
            return results;
          })
        )
        .subscribe((res: any[]) => {
          let arrayPersonas: Persona[] = [];
          res.forEach(({ genero, nombre, edad, img }) =>
            arrayPersonas.push(new Persona(genero, nombre, edad, img))
          );
          this.store.dispatch(setPersona({ personas: arrayPersonas }));
          localStorage.setItem('personas', JSON.stringify(arrayPersonas));
        });
      setTimeout(() => {
        this.PesonasSub.unsubscribe();
      }, 10000);
    }
  };

  addPersonas = (persona: Persona) => {
    let arrayTemporalPersona = JSON.parse(localStorage.getItem('personas'));
    arrayTemporalPersona.push(persona);

    localStorage.setItem('personas', JSON.stringify(arrayTemporalPersona));

    this.store.dispatch(crearPersona({ persona: persona }));
  };
}

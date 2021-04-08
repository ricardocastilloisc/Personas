import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.reduce';
import { Persona } from '../../models/persona.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  ListaPersona$:Observable<Persona[]>
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.ListaPersona$ =  this.store.select('personas').pipe(map(({personas})=> personas));
  }
}

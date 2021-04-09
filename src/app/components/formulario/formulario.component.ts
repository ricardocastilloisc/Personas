import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonasService } from '../../services/personas.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent implements OnInit {
  personaForm: FormGroup;

  constructor(
    private personasService: PersonasService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.personaForm = this.fb.group({
      genero: ['masculino', Validators.required],
      nombre: ['', Validators.required],
      edad: ['', Validators.required],
      img: [''],
    });
  }

  agregar = () => {
    if (this.personaForm.invalid) {
      return;
    }
    this.personasService.addPersonas(this.personaForm.value);
    this.personaForm.reset();
  };
}

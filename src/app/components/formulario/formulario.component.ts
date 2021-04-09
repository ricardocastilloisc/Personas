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
  imageError: String;
  imgBase64Path;
  constructor(
    private personasService: PersonasService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.personaForm = this.fb.group({
      genero: ['masculino', Validators.required],
      nombre: ['', Validators.required],
      edad: ['', Validators.required],
    });
  }

  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
        this.imageError =
          'Maximo tamaño permitido es ' + max_size / 1000 + 'Mb';
        return false;
      }

      if (!allowed_types.includes(fileInput.target.files[0].type)) {
        this.imageError = 'Solo imagenes permitidas de tipo ( JPG | PNG )';
        return false;
      }
      /*
        if (!_.includes(allowed_types, fileInput.target.files[0].type)) {

        }*/
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          if (img_height > max_height && img_width > max_width) {
            this.imageError =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.imgBase64Path =  imgBase64Path
          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
  agregar = () => {
    if (this.personaForm.invalid) {
      return;
    }
    this.personasService.addPersonas({...this.personaForm.value, img: this.imgBase64Path});
    this.personaForm.reset();
  };
}

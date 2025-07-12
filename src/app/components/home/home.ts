// src/app/home.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule
  ],
})
export class HomeComponent {
  form: FormGroup;
  today: string = new Date().toISOString().split('T')[0];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      placa: ['', [Validators.required, Validators.pattern(/^[A-Z]{3}\d{4}$/)]],
      fecha: ['', Validators.required],
      hora: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const { placa, fecha, hora } = this.form.value;
    const now = new Date();
    const selected = new Date(`${fecha}T${hora}`);

    if (selected < now) {
      alert('La fecha y hora no pueden ser anteriores a la actual.');
      return;
    }

    // TEMP: Solo mostrar datos en consola por ahora
    console.log('Datos listos para enviar:', { placa, fecha, hora });

    // Aquí luego llamaremos al servicio
    // this.validadorService.validar(...)

    // Navegación simulada
    this.router.navigate(['/resultado'], {
      state: {
        data: {
          mensaje: `Simulación: El carro ${placa} puede circular el ${fecha} a las ${hora}`
        }
      }
    });
  }
}

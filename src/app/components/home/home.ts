import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

import { ValidadorService, ValidacionResponse } from '../../../services/validador.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
})
export class HomeComponent {
  form: FormGroup;
  today: string = new Date().toISOString().split('T')[0]; 
  todayDate: Date = new Date();
  horas: string[] = [];         
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private validadorService: ValidadorService
  ) {
    this.form = this.fb.group({
      placa: ['', [Validators.required, Validators.pattern(/^[A-Z]{3}\d{4}$/)]],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
    });

    this.generarHoras();
  }

  generarHoras(): void {
  const horas: string[] = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m++) {
      const hh = h.toString().padStart(2, '0');
      const mm = m.toString().padStart(2, '0');
      horas.push(`${hh}:${mm}`);
    }
  }
  this.horas = horas;
}


  onSubmit(): void {
  if (this.form.invalid) return;

  const { placa, fecha, hora } = this.form.value;

  const fechaStr = new Date(fecha).toISOString().split('T')[0];
  const now = new Date();
  const selected = new Date(`${fechaStr}T${hora}`);

  if (selected < now) {
    alert('La fecha y hora no pueden ser anteriores a la actual.');
    return;
  }

  this.validadorService.validar({ placa, fecha: fechaStr, hora }).subscribe({
    next: (respuesta: ValidacionResponse) => {
      this.router.navigate(['/resultado'], {
        state: { data: respuesta }
      });
    },
    error: (err) => {
      alert('Error al comunicarse con el servidor.');
      console.error(err);
    }
  });
}

}

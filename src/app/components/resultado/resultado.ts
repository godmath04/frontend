import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-resultado',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
  templateUrl: './resultado.html',
  styleUrl: './resultado.css',
})
export class ResultadoComponent {
  mensaje: string = '';

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as { data: { mensaje: string } };

    if (state?.data?.mensaje) {
      this.mensaje = state.data.mensaje;
    } else {
      this.router.navigate(['/']); // Volver si no hay datos
    }
  }
}

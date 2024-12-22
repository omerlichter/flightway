import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  standalone: true,
  imports: [RouterModule, ConfirmDialogModule],
  providers: [ConfirmationService],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor() {
    document.addEventListener('drop', (event) => {
      event.preventDefault();
      event.stopPropagation();
    });

    document.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.stopPropagation();
    });

    document.addEventListener('dragenter', (event) => {
      return false;
    });

    document.addEventListener('dragleave', (event) => {
      return false;
    });
  }
}

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
export class AppComponent {}

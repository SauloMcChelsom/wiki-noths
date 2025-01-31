import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.layout.html',
  styleUrls: ['./auth.layout.scss'],
  standalone: true,
  imports: [RouterModule],
})
export class AuthLayout {}

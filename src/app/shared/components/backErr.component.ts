import { Component, Input, OnInit } from '@angular/core';
import { BackendErrorsInterface } from '../types/backendErrors.inteface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-backend-error',
  templateUrl: './backErr.comoponent.html',
  standalone: true,
  imports: [CommonModule],
})
export class BEErrorComponent implements OnInit {
  @Input() backErrors: BackendErrorsInterface = {};

  errorMessages: string[] = [];

  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backErrors).map((name) => {
      const messages = this.backErrors[name].join(' ');
      return `${name} ${messages}`;
    });
  }
}

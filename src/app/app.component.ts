import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SidenavComponent } from './pages/task-list/components/sidenav/sidenav.component';
import { HeaderComponent } from './pages/task-list/components/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterOutlet, MatSnackBarModule, SidenavComponent, HeaderComponent],
})
export class AppComponent{

}

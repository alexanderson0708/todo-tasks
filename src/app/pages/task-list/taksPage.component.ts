import { Component } from '@angular/core';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { TitleService } from '../../shared/services/title.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [RouterOutlet, MatSnackBarModule, SidenavComponent, HeaderComponent],
  templateUrl: './taskPage.component.html',
  styleUrl: './taskPage.component.css',
})
export class TaskListComponent {
  constructor(
    private titleService: TitleService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const title =
          this.activatedRoute.firstChild?.snapshot.data['title'] ||
          'Главная страница';
        this.titleService.updateTitle(title);
      });
  }
}

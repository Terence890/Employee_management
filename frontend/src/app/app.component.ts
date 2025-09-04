import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterModule, LayoutComponent, HeaderComponent],
  template: `
    <app-header></app-header>
    <app-layout></app-layout>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}

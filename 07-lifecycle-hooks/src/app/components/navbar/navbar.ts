import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styles: `
    .navbar {
      width: 100%;
      display: flex;
      background-color: #333;
      color: white;
      padding: 1rem;
      gap: 20px;
    }
    .navbar a {
      color: white;
      margin-right: 1rem;
      text-decoration: none;
    }
    .navbar a:hover {
      text-decoration: underline;
    }
    .active {
      font-weight: bold;
      text-decoration: underline;
    }
  `,
})
export class Navbar {}

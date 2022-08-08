import { NbMenuItem, NbSidebarService } from '@nebular/theme';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FazendaService } from './service/fazenda.service';
import { Fazenda } from './model/Fazenda';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Curso-Angular-REST';
  isCollapsed = false;

  items: NbMenuItem[] = [
    {
      title: 'Home',
      icon: 'home-outline',
      link: '/home',
    },

    {
      title: 'Cadastros',
      icon: 'grid-outline',
      children: [
        {
          title: 'Fazendas',
          icon: 'globe-2-outline',
          link: '/fazendaList',
        },
        {
          title: 'Culturas',
          icon: 'loader-outline',
          link: '/culturaList',
        },
        {
          title: 'Gotejador',
          icon: 'eye-off-2-outline',
          link: '/gotejadorList',
        },
        {
          title: 'Outorga',
          icon: 'sun-outline',
          link: '/outorgaList',
        },
      ],
    },

    {
      title: 'Dados Diários',
      icon: 'grid-outline',
      children: [
        {
          title: 'Clima',
          icon: 'thermometer-outline',
          link: '/climaList',
        },
        {
          title: 'Irrigação',
          icon: 'droplet-outline',
          link: '/irrigacaoList',
        },
        {
          title: 'Precipitação',
          icon: 'umbrella-outline',
          link: '/precipitacaoList',
        },
      ],
    },

    {
      title: 'Parcelas',
      target: '_blank',
      icon: 'pie-chart-outline',
      link: '/parcelaList',
    },
  ];

  constructor(
    private router: Router,
    private sidebarService: NbSidebarService
  ) {}

  ngOnInit() {
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['login']);
    } else {
      this.router.navigate(['home']);
      let idUsuario: Number = +JSON.parse(localStorage.getItem('idUsuario'));
    }
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }

  toggleNavbar() {
    this.isCollapsed = !this.isCollapsed;
  }

  public sair() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  public esconderBarrar() {
    if (
      localStorage.getItem('token') !== null &&
      localStorage.getItem('token').toString().trim() !== null
    ) {
      return false;
    } else {
      return true;
    }
  }
}

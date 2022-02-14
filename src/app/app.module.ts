import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule, } from '@angular/forms'
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component'; /*Requisi��es Ajax*/
import { RouterModule, Routes } from '@angular/router'
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { LoginComponent } from './login/login.component';
import { UsuarioComponent } from './componente/usuario/usuario/usuario.component';
import { HttpInterceptorModule } from './service/header-interceptor';
import { UsuarioAddComponent } from './componente/usuario/usuario-add/usuario-add.component';
import { GuardiaoGuard } from './service/guardiao.guard';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NgxPaginationModule} from 'ngx-pagination';
import { FazendaComponent } from './componente/fazenda/fazenda/fazenda.component'; 
import { FazendaAddComponent } from './componente/fazenda/fazenda-add/fazenda-add.component';
import { CulturaComponent } from './componente/cultura/cultura.component';
import { CulturaAddComponent } from './componente/cultura/cultura-add/cultura-add.component';
import { GotejadorComponent } from './componente/equipamentos/gotejador/gotejador/gotejador.component';
import { GotejadorAddComponent } from './componente/equipamentos/gotejador/gotejador-add/gotejador-add.component';


export const appRouters: Routes = [

  { path: 'home', component: HomeComponent, canActivate: [GuardiaoGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },

  { path: 'userList', component: UsuarioComponent, canActivate: [GuardiaoGuard] },
  { path: 'usuarioAdd', component : UsuarioAddComponent, canActivate: [GuardiaoGuard]},
  { path: 'usuarioAdd/:id', component : UsuarioAddComponent, canActivate: [GuardiaoGuard]},

  { path: 'fazendaList', component : FazendaComponent, canActivate: [GuardiaoGuard]},
  { path: 'fazendaAdd', component : FazendaAddComponent, canActivate: [GuardiaoGuard]},

  { path: 'culturaList', component : CulturaComponent, canActivate: [GuardiaoGuard]},
  { path: 'culturaAdd', component : CulturaAddComponent, canActivate: [GuardiaoGuard]},
  { path: 'culturaAdd/:id', component : CulturaAddComponent, canActivate: [GuardiaoGuard]},

  { path: 'gotejadorList', component : GotejadorComponent, canActivate: [GuardiaoGuard]}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(appRouters);

export const optionMask: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UsuarioComponent,
    UsuarioAddComponent,
    FazendaComponent,
    FazendaAddComponent,
    CulturaComponent,
    CulturaAddComponent,
    GotejadorComponent,
    GotejadorAddComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routes,
    HttpInterceptorModule,
    NgxMaskModule.forRoot(optionMask),
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

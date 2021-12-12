import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { AutologinGuard } from './guards/autologin.guard';
import { QRCodeComponent } from './qr-code/qr-code.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canLoad: [AutologinGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canLoad: [AutologinGuard]
  },
  {
    path: 'homescreen', // username
    loadChildren: () => import('./homescreen/homescreen.module').then(m => m.HomescreenModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'qr-code/:uuid/:attendance_code',
    component: QRCodeComponent,
  },
  {
    path: 'certificate',
    loadChildren: () => import('./certificate/certificate.module').then(m => m.CertificateModule),
    canLoad: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CompilerComponent } from './components/compiler/compiler.component'; 
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'compiler', component:CompilerComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

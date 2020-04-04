import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'add-employee',
    loadChildren: () => import('./pages/add-employee/add-employee.module').then( m => m.AddEmployeePageModule)
  },
  {
    path: 'update-employee',
    loadChildren: () => import('./pages/update-employee/update-employee.module').then( m => m.UpdateEmployeePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

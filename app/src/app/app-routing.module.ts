import { AuthGuard } from './views/auth/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './views/error/not-found-page/not-found-page.component';
import { NewQuestionComponent } from './views/pages/new-question/new-question.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./views/pages/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'leaderboard',
        loadChildren: () =>
          import('./views/pages/leaderboard/leaderboard.module').then(
            (m) => m.LeaderboardModule
          ),
      },
      {
        path: 'add',
        component: NewQuestionComponent,
      },
    ],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./views/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'page-not-found',
    component: NotFoundPageComponent,
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const components = [NewQuestionComponent, NotFoundPageComponent]

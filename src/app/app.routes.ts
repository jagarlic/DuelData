import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { EventComponent } from './elements/event/event.component';
import { PasteventsComponent } from './elements/pastevents/pastevents.component';
import { FormatStatsComponent } from './elements/format-stats/format-stats.component';
import { AuthGuard } from './services/auth-guard.service';

const appRoutes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'home',
        canActivate: [AuthGuard],
        component: PasteventsComponent
    },
    {
        path: 'event',
        canActivate: [AuthGuard],
        component: EventComponent
    },
    {
        path: 'formatStats',
        canActivate: [AuthGuard],
        component: FormatStatsComponent
    }
    // {
    //     path: 'home',
    //     component: HomeComponent
    // }
];

export const AppRoutes = RouterModule.forRoot(appRoutes);
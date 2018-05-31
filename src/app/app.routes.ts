import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { EventComponent } from './elements/event/event.component';
import { PasteventsComponent } from './elements/pastevents/pastevents.component';

const appRoutes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'home',
        // canActivate: [AuthGuard],
        component: HomeComponent
    },
    {
        path: 'event',
        // canActivate: [AuthGuard],
        component: EventComponent
    }, 
    {
        path: 'pastevents',
        component: PasteventsComponent
    }
];

export const AppRoutes = RouterModule.forRoot(appRoutes);
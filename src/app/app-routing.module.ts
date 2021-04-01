import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './backend-examples/user/user.component';
import { ComponentExamplesComponent } from './component-examples/component-examples.component';
import { CounterComponent } from './counter/counter.component';
import { IntroComponent } from './intro/intro.component';
import { HelloWorldComponent } from './hello-world/hello-world.component';

const routes: Routes = [
  { path: 'backend', component: UserComponent },
  { path: 'component', component: ComponentExamplesComponent },
  { path: 'counter', component: CounterComponent },
  { path: 'intro', component: IntroComponent },
  { path: 'hello', component: HelloWorldComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

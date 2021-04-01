import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './backend-examples/user/user.component';
import { LoadingComponent } from './backend-examples/loading/loading.component';
import { SenderComponent } from './component-examples/sender/sender.component';
import { ReceiverAComponent } from './component-examples/receiver-a/receiver-a.component';
import { ReceiverBComponent } from './component-examples/receiver-b/receiver-b.component';
import { ComponentExamplesComponent } from './component-examples/component-examples.component';
import { CounterComponent } from './counter/counter.component';
import { IntroComponent } from './intro/intro.component';
import { HelloWorldComponent } from './hello-world/hello-world.component';
import { ButtonComponent } from './button/button.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoadingComponent,
    SenderComponent,
    ReceiverAComponent,
    ReceiverBComponent,
    ComponentExamplesComponent,
    CounterComponent,
    IntroComponent,
    HelloWorldComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

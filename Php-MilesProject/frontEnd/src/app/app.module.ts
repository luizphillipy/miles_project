import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TravelersComponent } from './travelers/travelers.component';
import { TravelerComponent } from './traveler/traveler.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { EditTravelerPageComponent } from './edit-traveler-page/edit-traveler-page.component';
import { LoyaltyProgramsComponent } from './loyalty-programs/loyalty-programs.component';
import { EditLoyaltyProgramPageComponent } from './edit-loyalty-program-page/edit-loyalty-program-page.component';
import { CreateLoyaltyProgramPageComponent } from './create-loyalty-program-page/create-loyalty-program-page.component';
import { LoyaltyProgramPageComponent } from './loyalty-program-page/loyalty-program-page.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TravelersComponent,
    TravelerComponent,
    NavigationComponent,
    FooterComponent,
    RegistrationPageComponent,
    EditTravelerPageComponent,
    LoyaltyProgramsComponent,
    EditLoyaltyProgramPageComponent,
    CreateLoyaltyProgramPageComponent,
    LoyaltyProgramPageComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,ReactiveFormsModule,FormsModule,RouterModule.forRoot([
      {
        path:"",
        component: HomeComponent
      },
      {
        path:"register",
        component: RegistrationPageComponent
      },
      {
        path:"travelers",
        component:TravelersComponent
      },
      {
        path:"traveler/:travelerId",
        component:TravelerComponent
      },
      {
        path:"traveler/:travelerId/edit",
        component:EditTravelerPageComponent
      },
      {
        path:"traveler/:travelerId/loyaltyprograms",
        component:CreateLoyaltyProgramPageComponent
      },
      {
        path:"traveler/:travelerId/loyaltyprograms/:loyaltyprogramId",
        component:LoyaltyProgramPageComponent
      },
      {
        path:"traveler/:travelerId/loyaltyprograms/:loyaltyprogramId/edit",
        component:EditLoyaltyProgramPageComponent
      }
     
     
     
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

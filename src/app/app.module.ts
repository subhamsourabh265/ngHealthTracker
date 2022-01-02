import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './app-common/material/material.module';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { HeaderComponent } from './app-common/navigation/header/header.component';
import { SidenavComponent } from './app-common/navigation/sidenav/sidenav.component';
import { environment } from 'src/environments/environment';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { StoreModule } from '@ngrx/store';
import { reducers } from './app.reducer';
import { FooterComponent } from './app-common/navigation/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    StoreModule.forRoot(reducers),
  ],
  providers: [
    {
      provide:LOCALE_ID,
      useValue:"en-US"
      }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

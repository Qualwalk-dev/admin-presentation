import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {ToastModule} from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MessageService} from 'primeng/api';
import { LoginService } from './services/login.service';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { CourseComponent } from './components/course/course.component';
import { TabViewModule } from 'primeng/tabview';
import { EnquiryComponent } from './components/enquiry/enquiry.component';
import {TableModule} from 'primeng/table';
import { TokenInterceptor } from './common/token-interceptor';
import { EnquiryService } from './services/enquiry.service';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import {ToolbarModule} from 'primeng/toolbar';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { CombosComponent } from './components/combos/combos.component';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {CalendarModule} from 'primeng/calendar';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ConfirmationService} from 'primeng/api';
import { JobsComponent } from './components/jobs/jobs.component';
import { LoggedInUsersGuard } from './services/logged-in-users-guard.service';
import { JobApplicationsComponent } from './components/job-applications/job-applications.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminHomeComponent,
    CourseComponent,
    EnquiryComponent,
    CombosComponent,
    JobsComponent,
    JobApplicationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    HttpClientModule,
    ToastModule,
    ReactiveFormsModule,
    MessagesModule,
    MessageModule,
    BrowserAnimationsModule,
    TabViewModule,
    TableModule,
    ProgressSpinnerModule,
    FormsModule,
    DropdownModule,
    DialogModule,
    ToolbarModule,
    InputNumberModule,
    InputTextareaModule,
    AutoCompleteModule,
    CalendarModule,
    ConfirmPopupModule
  ],
  providers: [
    MessageService, 
    LoginService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi:true},
    EnquiryService,
    ConfirmationService,
    LoggedInUsersGuard
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

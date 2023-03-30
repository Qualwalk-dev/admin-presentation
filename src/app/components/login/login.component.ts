import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Identity } from 'src/app/models/identity';
import { LoginService } from 'src/app/services/login.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, private loginService: LoginService, private router:Router, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  login() {
    let identity:Identity = new Identity({
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value
    })

    this.loginService.getToken(identity).subscribe({
      next: (res) => {
        setTimeout(
          () => {
            this.messageService.add({severity:'success', summary: 'Logged in', detail: 'Login success'}),
            1000
          }
        )        
        this.router.navigate(['admin-home'])
      },
      error: (e) => {
        console.log('error => ', e)
        setTimeout(
          () => {
            this.messageService.add({severity:'error', summary: 'Logon failed', detail: 'Unable to login'}),
            1000
          }
        )  
        
      }

    })

  }

}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  submitted = false;
  showPassword = false;
  errorMessage = '';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.initLoginForm();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  get accessToFormFields() {
    return this.loginForm.controls;
  }

  private initLoginForm() {
    this.loginForm = this.formBuilder.group({
      id: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      const { id, password } = this.loginForm.value;
      this.dataService.login(id, password).subscribe({
        next: (data) => {
          this.dataService.changeData(data);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.errorMessage = 'Invalid ID or password';
          this.loginForm.reset();
        },
      });
    } else {
      this.errorMessage = 'Please fill in the fields';
    }
  }
}

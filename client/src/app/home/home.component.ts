import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProfileComponent } from '../profile/profile.component';
import { ClasscardComponent } from '../classcard/classcard.component';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Courses } from '../../models/models';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [
    NavbarComponent,
    ProfileComponent,
    ClasscardComponent,
    CommonModule,
  ],
})
export class HomeComponent implements AfterViewInit {
  courses: any;
  total = 0;
  average = 0;
  passed = 0;
  constructor(private dataService: DataService, private http: HttpClient) {}

  ngAfterViewInit() {
    this.total = 0;
    this.average = 0;
    this.fetchCourses(1);
  }

  calculate() {
    this.total = 0;
    this.passed = 0;
    this.courses.forEach((course: Courses) => {
      const credit_temp = parseInt(course.credits, 10);
      const grade_temp = parseFloat(course.grade);
      if (!isNaN(credit_temp) && !isNaN(grade_temp)) {
        this.total += credit_temp;
        this.average += grade_temp * credit_temp;
        if (grade_temp > 0) {
          this.passed += credit_temp;
        }
      }
    });
    if (this.total > 0) {
      this.average = parseFloat((this.average / this.total).toFixed(2));
    }
  }

  fetchCourses(selectedOption: number) {
    this.http
      .get<{ courses: Courses[] }>(
        `http://localhost:3000/fetch-courses?selectedOption=${selectedOption}`
      )
      .subscribe(
        (data) => {
          console.log(data);
          this.dataService.changeCourse(data);
          this.courses = data;
          this.calculate();
        },
        (error) => {
          console.log(error);
        }
      );
  }
}

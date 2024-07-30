import { CommonModule } from '@angular/common';
import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataService } from '../../services/data.service';
import { FACULTY_MAPPING } from './faculty.mapping';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements AfterViewInit {
  title: any;
  icon: any;
  faculty = '';
  major = '';
  constructor(
    private elementRef: ElementRef,
    private dataService: DataService
  ) {}
  ngOnInit() {
    this.dataService.currentData.subscribe((profile) => {
      this.major = profile.major;
    });
    this.major = this.major.toLowerCase().replace(/\s+/g, '');
    this.assignFaculty();
  }
  ngAfterViewInit() {
    setTimeout(() => {
      const activeButton = this.elementRef.nativeElement
        .querySelector('button.active')
        .textContent.split(' ');
      this.title = activeButton[1];
      this.icon = activeButton[3];
    }, 0);
  }
  assignFaculty() {
    this.faculty = FACULTY_MAPPING[this.major] || 'jinan-logo';
  }
  navtoggle() {
    this.elementRef.nativeElement
      .querySelector('.side-bar')
      .classList.toggle('open');
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  @Input() total?: number;
  @Input() average?: number;
  @Input() passed?: number;
  @Output() semesterChange = new EventEmitter<number>();
  profile: any;

  constructor(private dataService: DataService, public router: Router) {}

  ngOnInit() {
    this.dataService.currentData.subscribe((profile) => {
      this.profile = profile;
    });
  }

  onSemesterChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedOption = target.value ? +target.value + 1 : 1;
    this.semesterChange.emit(selectedOption);
  }
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-classcard',
  standalone: true,
  imports: [],
  templateUrl: './classcard.component.html',
  styleUrl: './classcard.component.css'
})
export class ClasscardComponent {
  @Input() course: any;
}

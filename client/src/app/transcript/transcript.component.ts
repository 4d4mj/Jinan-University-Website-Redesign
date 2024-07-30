import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { TranscriptcardComponent } from '../transcriptcard/transcriptcard.component';
import { DataService } from '../../services/data.service';
import { Transcript } from '../../models/models';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-transcript',
  standalone: true,
  templateUrl: './transcript.component.html',
  styleUrl: './transcript.component.css',
  imports: [NavbarComponent, TranscriptcardComponent],
})
export class TranscriptComponent implements OnInit {
  transcript: any;

  constructor(private dataService: DataService, private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<{ courses: Transcript }>(
        `http://localhost:3000/fetch-transcript`
      )
      .subscribe(
        (data) => {
          console.log(data);
          this.dataService.changeTranscript(data);
          this.transcript = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }
}

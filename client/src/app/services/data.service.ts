import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private profileSource = new BehaviorSubject<any>(null);
  currentData = this.profileSource.asObservable();

  private courseSource = new BehaviorSubject<any>(null);
  currentCourse = this.courseSource.asObservable();

  private transcriptSource = new BehaviorSubject<any>(null);
  currentTranscript = this.transcriptSource.asObservable();

  constructor(private http: HttpClient) {
    const storedProfile = sessionStorage.getItem('profile');
    if (storedProfile) {
      this.profileSource.next(JSON.parse(storedProfile));
    }

    const storedCourses = sessionStorage.getItem('courses');
    if (storedCourses) {
      this.courseSource.next(JSON.parse(storedCourses));
    }

    const storedTranscript = sessionStorage.getItem('transcript');
    if (storedTranscript) {
      this.courseSource.next(JSON.parse(storedTranscript));
    }
  }

  login(username: string, password: string): Observable<any> {
    const body = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.post(`${environment.apiUrl}/login`, body.toString()).pipe(
      tap((response: any) => {
        // If login is successful, store the user's profile or token in session storage
        if (response.success) {
          this.changeData(response.profile);
        }
      })
    );
  }

  isLoggedIn(): boolean {
    const storedProfile = sessionStorage.getItem('profile');
    return !!storedProfile;
  }

  changeData(profile: any) {
    sessionStorage.setItem('profile', JSON.stringify(profile));
    this.profileSource.next(profile);
  }

  changeCourse(courses: any) {
    sessionStorage.setItem('courses', JSON.stringify(courses));
    this.courseSource.next(courses);
  }

  changeTranscript(transcript: any) {
    sessionStorage.setItem('transcript', JSON.stringify(transcript));
    this.courseSource.next(transcript);
  }
}

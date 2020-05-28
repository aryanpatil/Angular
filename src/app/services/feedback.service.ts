import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from '../shared/feedback';
import { map , catchError} from 'rxjs/operators';
import { HttpModule} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  getFeedback(): Observable<Feedback> {
    return this.http.get<Feedback[]>(baseURL + 'feedback/').pipe(map(feedbacks => feedbacks[feedbacks.length - 1]))
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  submitFeedback(feedback: Feedback): Observable<Feedback> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<Feedback>(baseURL + 'feedback/' , feedback, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }
}

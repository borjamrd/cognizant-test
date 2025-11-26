import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Candidate } from '@cognizant-test/interfaces';
import { tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  private _candidates = signal<Candidate[]>([]);
  private http = inject(HttpClient);

  public candidates = this._candidates.asReadonly();

  uploadCandidate(name: string, surname: string, file: File) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('surname', surname);
    formData.append('file', file);

    return this.http.post<Candidate>(`${environment.apiUrl}/candidate`, formData).pipe(
      tap((newCandidate) => {
        this._candidates.update((current) => [...current, newCandidate]);
      })
    );
  }
}

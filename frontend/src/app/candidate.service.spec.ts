import { provideHttpClient } from '@angular/common/http';
import {
    HttpTestingController,
    provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Candidate } from '@cognizant-test/interfaces';
import { environment } from '../environments/environment';
import { CandidateService } from './candidate.service';
describe('CandidateService', () => {
  let service: CandidateService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CandidateService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(CandidateService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with an empty list of candidates', () => {
    expect(service.candidates()).toEqual([]);
  });

  it('should upload a candidate and update the signal state', () => {
    const mockFile = new File(['dummy content'], 'test.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const mockResponse: Candidate = {
      name: 'John',
      surname: 'Doe',
      seniority: 'senior',
      years: 5,
      availability: true,
    };

    service.uploadCandidate('John', 'Doe', mockFile).subscribe();

    const req = httpMock.expectOne(`${environment.apiUrl}/candidate`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body.get('name')).toBe('John');
    expect(req.request.body.get('surname')).toBe('Doe');

    req.flush(mockResponse);

    expect(service.candidates().length).toBe(1);
    expect(service.candidates()[0]).toEqual(mockResponse);
  });
});

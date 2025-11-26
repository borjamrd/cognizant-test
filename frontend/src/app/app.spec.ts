import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { CandidateService } from './candidate.service';
import { signal } from '@angular/core';
import { of } from 'rxjs';
import { vi } from 'vitest';

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let candidateServiceMock: any;

  beforeEach(async () => {
    candidateServiceMock = {
      candidates: signal([]),
      uploadCandidate: vi.fn().mockReturnValue(of({})),
    };

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        { provide: CandidateService, useValue: candidateServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.candidateForm.valid).toBeFalsy();
  });

  it('form should be valid when fields are filled and file is selected', () => {
    component.candidateForm.patchValue({
      name: 'Jane',
      surname: 'Doe',
    });

    const mockFile = new File([''], 'test.xlsx');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const event = { target: { files: [mockFile] } } as any;

    component.onFileSelected(event);

    expect(component.candidateForm.valid).toBeTruthy();
    expect(component.selectedFile).toBe(mockFile);
  });

  it('should call service.uploadCandidate when submitting valid form', () => {
    component.candidateForm.patchValue({ name: 'Jane', surname: 'Doe' });
    const mockFile = new File([''], 'test.xlsx');
    component.selectedFile = mockFile;
    component.candidateForm.patchValue({ file: mockFile });

    component.submit();

    expect(candidateServiceMock.uploadCandidate).toHaveBeenCalledWith(
      'Jane',
      'Doe',
      mockFile
    );
  });

  it('should NOT call service if form is invalid', () => {
    component.submit();
    expect(candidateServiceMock.uploadCandidate).not.toHaveBeenCalled();
  });
});
